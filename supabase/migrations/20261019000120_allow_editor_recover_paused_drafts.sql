-- Editors can open a paused record for correction, but their save must move it back to draft.
DROP POLICY IF EXISTS "active staff can update place drafts" ON public.places;
CREATE POLICY "active staff can update place drafts" ON public.places
  FOR UPDATE TO authenticated
  USING (
    (SELECT private.is_editor_or_admin())
    AND ((SELECT private.is_admin()) OR publication_status IN ('draft', 'published', 'paused'))
  )
  WITH CHECK (
    (SELECT private.is_editor_or_admin())
    AND ((SELECT private.is_admin()) OR publication_status = 'draft')
  );
