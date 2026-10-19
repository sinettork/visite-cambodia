-- Security and consistency hardening for Visit Cambodia admin workflows.
DROP POLICY IF EXISTS "admins can manage places" ON public.places;
DROP POLICY IF EXISTS "active staff can create place drafts" ON public.places;
DROP POLICY IF EXISTS "active staff can update place drafts" ON public.places;
DROP POLICY IF EXISTS "admins can delete places" ON public.places;
CREATE POLICY "active staff can create place drafts" ON public.places
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT private.is_editor_or_admin()) AND ((SELECT private.is_admin()) OR publication_status = 'draft'));
CREATE POLICY "active staff can update place drafts" ON public.places
  FOR UPDATE TO authenticated
  USING ((SELECT private.is_editor_or_admin()) AND ((SELECT private.is_admin()) OR publication_status IN ('draft', 'published')))
  WITH CHECK ((SELECT private.is_editor_or_admin()) AND ((SELECT private.is_admin()) OR publication_status = 'draft'));
CREATE POLICY "admins can delete places" ON public.places
  FOR DELETE TO authenticated USING ((SELECT private.is_admin()));

-- Editor role may edit a guide only after the parent place is a draft.
DROP POLICY IF EXISTS "active staff can insert draft place guides" ON public.place_guides;
DROP POLICY IF EXISTS "active staff can update draft place guides" ON public.place_guides;
DROP POLICY IF EXISTS "admins can delete place guides" ON public.place_guides;
CREATE POLICY "active staff can insert draft place guides" ON public.place_guides
  FOR INSERT TO authenticated
  WITH CHECK (
    (SELECT private.is_editor_or_admin())
    AND ((SELECT private.is_admin()) OR EXISTS (
      SELECT 1 FROM public.places p WHERE p.id = place_guides.place_id AND p.publication_status = 'draft'
    ))
  );
CREATE POLICY "active staff can update draft place guides" ON public.place_guides
  FOR UPDATE TO authenticated
  USING (
    (SELECT private.is_editor_or_admin())
    AND ((SELECT private.is_admin()) OR EXISTS (
      SELECT 1 FROM public.places p WHERE p.id = place_guides.place_id AND p.publication_status = 'draft'
    ))
  )
  WITH CHECK (
    (SELECT private.is_editor_or_admin())
    AND ((SELECT private.is_admin()) OR EXISTS (
      SELECT 1 FROM public.places p WHERE p.id = place_guides.place_id AND p.publication_status = 'draft'
    ))
  );
CREATE POLICY "admins can delete place guides" ON public.place_guides
  FOR DELETE TO authenticated USING ((SELECT private.is_admin()));

-- Audit records are generated from real mutations; users cannot forge activity rows directly.
DROP POLICY IF EXISTS "admins can write audit log" ON public.admin_audit_log;
DROP POLICY IF EXISTS "admin staff can write audit log" ON public.admin_audit_log;
REVOKE INSERT ON public.admin_audit_log FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION private.audit_admin_content_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, private
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_before jsonb := '{}'::jsonb;
  v_after jsonb := '{}'::jsonb;
  v_row jsonb;
  v_entity_id bigint;
  v_action text;
  v_changed_fields jsonb := '[]'::jsonb;
BEGIN
  IF v_user_id IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = v_user_id AND is_active = true
      AND role IN ('super_admin', 'admin', 'editor')
  ) THEN
    IF TG_OP = 'DELETE' THEN RETURN OLD; ELSE RETURN NEW; END IF;
  END IF;

  IF TG_OP <> 'INSERT' THEN v_before := to_jsonb(OLD); END IF;
  IF TG_OP <> 'DELETE' THEN v_after := to_jsonb(NEW); END IF;
  v_row := CASE WHEN TG_OP = 'DELETE' THEN v_before ELSE v_after END;
  v_entity_id := CASE TG_ARGV[0]
    WHEN 'place_guide' THEN NULLIF(v_row ->> 'place_id', '')::bigint
    WHEN 'province_guide' THEN NULLIF(v_row ->> 'province_id', '')::bigint
    ELSE NULLIF(v_row ->> 'id', '')::bigint
  END;

  IF TG_OP = 'INSERT' THEN
    v_action := 'create';
    SELECT COALESCE(jsonb_agg(key), '[]'::jsonb) INTO v_changed_fields
      FROM jsonb_object_keys(v_after) AS keys(key);
  ELSIF TG_OP = 'DELETE' THEN
    v_action := 'delete';
    SELECT COALESCE(jsonb_agg(key), '[]'::jsonb) INTO v_changed_fields
      FROM jsonb_object_keys(v_before) AS keys(key);
  ELSE
    SELECT COALESCE(jsonb_agg(key), '[]'::jsonb) INTO v_changed_fields
      FROM jsonb_object_keys(v_after) AS keys(key)
      WHERE v_before -> key IS DISTINCT FROM v_after -> key;
    v_action := 'update';
    IF TG_ARGV[0] = 'place'
       AND v_before ->> 'publication_status' IS DISTINCT FROM v_after ->> 'publication_status' THEN
      CASE v_after ->> 'publication_status'
        WHEN 'published' THEN v_action := 'publish';
        WHEN 'paused' THEN v_action := 'pause';
        WHEN 'draft' THEN v_action := 'save_draft';
        ELSE v_action := 'update';
      END CASE;
    END IF;
  END IF;

  INSERT INTO public.admin_audit_log (admin_user_id, entity_type, entity_id, action, changed_fields)
    VALUES (v_user_id, TG_ARGV[0], v_entity_id, v_action, v_changed_fields);
  IF TG_OP = 'DELETE' THEN RETURN OLD; ELSE RETURN NEW; END IF;
END;
$$;

DROP TRIGGER IF EXISTS audit_places_changes ON public.places;
CREATE TRIGGER audit_places_changes AFTER INSERT OR UPDATE OR DELETE ON public.places
  FOR EACH ROW EXECUTE FUNCTION private.audit_admin_content_change('place');
DROP TRIGGER IF EXISTS audit_provinces_changes ON public.provinces;
CREATE TRIGGER audit_provinces_changes AFTER INSERT OR UPDATE OR DELETE ON public.provinces
  FOR EACH ROW EXECUTE FUNCTION private.audit_admin_content_change('province');
DROP TRIGGER IF EXISTS audit_place_guides_changes ON public.place_guides;
CREATE TRIGGER audit_place_guides_changes AFTER INSERT OR UPDATE OR DELETE ON public.place_guides
  FOR EACH ROW EXECUTE FUNCTION private.audit_admin_content_change('place_guide');
DROP TRIGGER IF EXISTS audit_province_guides_changes ON public.province_guides;
CREATE TRIGGER audit_province_guides_changes AFTER INSERT OR UPDATE OR DELETE ON public.province_guides
  FOR EACH ROW EXECUTE FUNCTION private.audit_admin_content_change('province_guide');
REVOKE ALL ON FUNCTION private.audit_admin_content_change() FROM PUBLIC, anon, authenticated;

-- Save the place and its guide in one transaction. Status transitions are enforced in the DB.
CREATE OR REPLACE FUNCTION public.admin_save_place(
  p_id bigint, p_payload jsonb, p_guide jsonb, p_save_guide boolean, p_intent text
)
RETURNS text LANGUAGE plpgsql SECURITY INVOKER
SET search_path = pg_catalog, public, private
AS $$
DECLARE
  v_current public.places%ROWTYPE;
  v_place public.places%ROWTYPE;
  v_guide public.place_guides%ROWTYPE;
  v_next_status text;
  v_old_guide_source_urls jsonb;
BEGIN
  IF NOT (SELECT private.is_editor_or_admin()) THEN
    RAISE EXCEPTION 'Not authorized' USING ERRCODE = '42501';
  END IF;
  IF p_intent IS NULL OR p_intent NOT IN ('save', 'draft', 'publish', 'pause') THEN
    RAISE EXCEPTION 'Invalid content action' USING ERRCODE = '22023';
  END IF;
  SELECT * INTO v_current FROM public.places WHERE id = p_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Place not found' USING ERRCODE = 'P0002'; END IF;
  IF p_intent IN ('publish', 'pause') AND NOT (SELECT private.is_admin()) THEN
    RAISE EXCEPTION 'Not authorized to change publication state' USING ERRCODE = '42501';
  END IF;

  v_next_status := v_current.publication_status;
  IF p_intent = 'draft' THEN v_next_status := 'draft'; END IF;
  IF p_intent = 'publish' THEN v_next_status := 'published'; END IF;
  IF p_intent = 'pause' THEN v_next_status := 'paused'; END IF;
  IF p_intent = 'save' AND v_current.publication_status = 'published'
     AND NOT (SELECT private.is_admin()) THEN v_next_status := 'draft'; END IF;
  v_place := jsonb_populate_record(
    NULL::public.places,
    COALESCE(p_payload, '{}'::jsonb) || jsonb_build_object('publication_status', v_next_status)
  );

  IF v_place.name_en IS NULL OR btrim(v_place.name_en) = ''
     OR v_place.name_km IS NULL OR btrim(v_place.name_km) = '' THEN
    RAISE EXCEPTION 'Both English and Khmer names are required' USING ERRCODE = '22023';
  END IF;
  IF v_place.slug IS NULL OR v_place.slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$' THEN
    RAISE EXCEPTION 'Invalid slug' USING ERRCODE = '22023';
  END IF;
  IF v_place.category IS NULL OR v_place.category NOT IN ('history', 'nature', 'beach', 'adventure', 'culture', 'food') THEN
    RAISE EXCEPTION 'Invalid category' USING ERRCODE = '22023';
  END IF;
  IF v_place.listing_type IS NULL OR v_place.listing_type NOT IN ('attraction', 'accommodation', 'restaurant') THEN
    RAISE EXCEPTION 'Invalid listing type' USING ERRCODE = '22023';
  END IF;
  IF v_place.business_type IS NOT NULL AND
     v_place.business_type NOT IN ('hotel', 'guest_house', 'restaurant', 'cafe', 'other') THEN
    RAISE EXCEPTION 'Invalid business type' USING ERRCODE = '22023';
  END IF;
  IF v_place.ticket_usd IS NOT NULL AND v_place.ticket_usd < 0 THEN
    RAISE EXCEPTION 'Ticket price cannot be negative' USING ERRCODE = '22023';
  END IF;
  IF v_place.lat IS NOT NULL AND NOT (v_place.lat BETWEEN -90 AND 90) THEN
    RAISE EXCEPTION 'Latitude is out of range' USING ERRCODE = '22023';
  END IF;
  IF v_place.lng IS NOT NULL AND NOT (v_place.lng BETWEEN -180 AND 180) THEN
    RAISE EXCEPTION 'Longitude is out of range' USING ERRCODE = '22023';
  END IF;
  IF v_place.ticket_url IS NOT NULL AND v_place.ticket_url !~* '^https?://[^/@[:space:]]+([/?#]|$)' THEN
    RAISE EXCEPTION 'Ticket URL must use HTTP or HTTPS' USING ERRCODE = '22023';
  END IF;
  IF v_place.image_url IS NOT NULL AND NOT (
    (left(v_place.image_url, 1) = '/' AND left(v_place.image_url, 2) <> '//' AND v_place.image_url !~ '[[:space:][:cntrl:]]')
    OR v_place.image_url ~* '^https?://[^/@[:space:]]+([/?#]|$)'
  ) THEN RAISE EXCEPTION 'Image URL must be a site path or HTTP(S) URL' USING ERRCODE = '22023'; END IF;
  IF jsonb_typeof(COALESCE(v_place.source_urls, '[]'::jsonb)) <> 'array' THEN
    RAISE EXCEPTION 'Source URLs must be an array' USING ERRCODE = '22023';
  END IF;
  IF EXISTS (
    SELECT 1 FROM jsonb_array_elements_text(COALESCE(v_place.source_urls, '[]'::jsonb)) AS urls(url)
    WHERE url !~* '^https?://[^/@[:space:]]+([/?#]|$)'
  ) THEN RAISE EXCEPTION 'Source URLs must use HTTP or HTTPS' USING ERRCODE = '22023'; END IF;

  UPDATE public.places SET
    name_en = v_place.name_en, name_km = v_place.name_km, slug = v_place.slug,
    province_id = v_place.province_id, listing_type = v_place.listing_type,
    category = v_place.category, business_type = v_place.business_type,
    publication_status = v_next_status, summary_en = v_place.summary_en,
    summary_km = v_place.summary_km, image_url = v_place.image_url,
    ticket_usd = v_place.ticket_usd, ticket_status = v_place.ticket_status,
    ticket_url = v_place.ticket_url, ticket_provider = v_place.ticket_provider,
    open_hours = v_place.open_hours, access_en = v_place.access_en,
    access_km = v_place.access_km, source_urls = COALESCE(v_place.source_urls, '[]'::jsonb),
    lat = v_place.lat, lng = v_place.lng, updated_at = now()
  WHERE id = p_id;

  IF COALESCE(p_save_guide, false) THEN
    SELECT source_urls INTO v_old_guide_source_urls FROM public.place_guides WHERE place_id = p_id;
    v_guide := jsonb_populate_record(NULL::public.place_guides,
      COALESCE(p_guide, '{}'::jsonb) || jsonb_build_object('place_id', p_id));
    INSERT INTO public.place_guides AS existing (
      place_id, about_en, about_km, history_en, history_km, highlights_en, highlights_km,
      visit_plan_en, visit_plan_km, tips_en, tips_km, source_urls, updated_at
    ) VALUES (
      p_id, v_guide.about_en, v_guide.about_km, v_guide.history_en, v_guide.history_km,
      v_guide.highlights_en, v_guide.highlights_km, v_guide.visit_plan_en, v_guide.visit_plan_km,
      v_guide.tips_en, v_guide.tips_km, COALESCE(v_guide.source_urls, v_old_guide_source_urls, '[]'::jsonb), now()
    )
    ON CONFLICT (place_id) DO UPDATE SET
      about_en = EXCLUDED.about_en, about_km = EXCLUDED.about_km,
      history_en = EXCLUDED.history_en, history_km = EXCLUDED.history_km,
      highlights_en = EXCLUDED.highlights_en, highlights_km = EXCLUDED.highlights_km,
      visit_plan_en = EXCLUDED.visit_plan_en, visit_plan_km = EXCLUDED.visit_plan_km,
      tips_en = EXCLUDED.tips_en, tips_km = EXCLUDED.tips_km,
      source_urls = COALESCE(v_guide.source_urls, existing.source_urls), updated_at = now();
  END IF;
  RETURN v_next_status;
END;
$$;

-- Save province identity and its guide atomically; preserve legacy story/source fields absent from the form.
CREATE OR REPLACE FUNCTION public.admin_save_province(p_id bigint, p_payload jsonb, p_guide jsonb)
RETURNS void LANGUAGE plpgsql SECURITY INVOKER
SET search_path = pg_catalog, public, private
AS $$
DECLARE
  v_province public.provinces%ROWTYPE;
  v_guide public.province_guides%ROWTYPE;
  v_old_story_en text;
  v_old_story_km text;
  v_old_sources jsonb;
BEGIN
  IF NOT (SELECT private.is_editor_or_admin()) THEN
    RAISE EXCEPTION 'Not authorized' USING ERRCODE = '42501';
  END IF;
  v_province := jsonb_populate_record(NULL::public.provinces, COALESCE(p_payload, '{}'::jsonb));
  IF v_province.name_en IS NULL OR btrim(v_province.name_en) = ''
     OR v_province.name_km IS NULL OR btrim(v_province.name_km) = '' THEN
    RAISE EXCEPTION 'Both English and Khmer names are required' USING ERRCODE = '22023';
  END IF;
  IF v_province.banner_image_url IS NOT NULL AND NOT (
    (left(v_province.banner_image_url, 1) = '/' AND left(v_province.banner_image_url, 2) <> '//' AND v_province.banner_image_url !~ '[[:space:][:cntrl:]]')
    OR v_province.banner_image_url ~* '^https?://[^/@[:space:]]+([/?#]|$)'
  ) THEN RAISE EXCEPTION 'Banner image URL must be a site path or HTTP(S) URL' USING ERRCODE = '22023'; END IF;

  UPDATE public.provinces SET name_en = v_province.name_en, name_km = v_province.name_km,
    banner_image_url = v_province.banner_image_url, updated_at = now()
  WHERE id = p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Province not found' USING ERRCODE = 'P0002'; END IF;
  SELECT story_en, story_km, source_urls INTO v_old_story_en, v_old_story_km, v_old_sources
    FROM public.province_guides WHERE province_id = p_id;
  v_guide := jsonb_populate_record(NULL::public.province_guides,
    COALESCE(p_guide, '{}'::jsonb) || jsonb_build_object('province_id', p_id));
  IF jsonb_typeof(COALESCE(v_guide.source_urls, '[]'::jsonb)) <> 'array' THEN
    RAISE EXCEPTION 'Source URLs must be an array' USING ERRCODE = '22023';
  END IF;
  IF EXISTS (
    SELECT 1 FROM jsonb_array_elements_text(COALESCE(v_guide.source_urls, '[]'::jsonb)) AS urls(url)
    WHERE url !~* '^https?://[^/@[:space:]]+([/?#]|$)'
  ) THEN RAISE EXCEPTION 'Source URLs must use HTTP or HTTPS' USING ERRCODE = '22023'; END IF;

  INSERT INTO public.province_guides AS existing (
    province_id, overview_en, overview_km, story_en, story_km, history_en, history_km,
    culture_en, culture_km, travel_en, travel_km, attractions_en, attractions_km,
    stay_guide_en, stay_guide_km, food_guide_en, food_guide_km, source_urls, updated_at
  ) VALUES (
    p_id, COALESCE(v_guide.overview_en, ''), COALESCE(v_guide.overview_km, ''),
    COALESCE(v_guide.story_en, v_old_story_en), COALESCE(v_guide.story_km, v_old_story_km),
    v_guide.history_en, v_guide.history_km, v_guide.culture_en, v_guide.culture_km,
    v_guide.travel_en, v_guide.travel_km, COALESCE(v_guide.attractions_en, ''),
    COALESCE(v_guide.attractions_km, ''), COALESCE(v_guide.stay_guide_en, ''),
    COALESCE(v_guide.stay_guide_km, ''), COALESCE(v_guide.food_guide_en, ''),
    COALESCE(v_guide.food_guide_km, ''), COALESCE(v_guide.source_urls, v_old_sources, '[]'::jsonb), now()
  )
  ON CONFLICT (province_id) DO UPDATE SET
    overview_en = EXCLUDED.overview_en, overview_km = EXCLUDED.overview_km,
    story_en = COALESCE(v_guide.story_en, existing.story_en),
    story_km = COALESCE(v_guide.story_km, existing.story_km),
    history_en = EXCLUDED.history_en, history_km = EXCLUDED.history_km,
    culture_en = EXCLUDED.culture_en, culture_km = EXCLUDED.culture_km,
    travel_en = EXCLUDED.travel_en, travel_km = EXCLUDED.travel_km,
    attractions_en = EXCLUDED.attractions_en, attractions_km = EXCLUDED.attractions_km,
    stay_guide_en = EXCLUDED.stay_guide_en, stay_guide_km = EXCLUDED.stay_guide_km,
    food_guide_en = EXCLUDED.food_guide_en, food_guide_km = EXCLUDED.food_guide_km,
    source_urls = COALESCE(v_guide.source_urls, existing.source_urls),
    updated_at = now();
END;
$$;

REVOKE ALL ON FUNCTION public.admin_save_place(bigint, jsonb, jsonb, boolean, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_place(bigint, jsonb, jsonb, boolean, text) TO authenticated;
REVOKE ALL ON FUNCTION public.admin_save_province(bigint, jsonb, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_save_province(bigint, jsonb, jsonb) TO authenticated;
