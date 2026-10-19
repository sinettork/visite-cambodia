-- Remove legacy permissive FOR ALL policies defensively. The role-specific
-- INSERT/UPDATE/DELETE policies introduced by harden_admin_workflows remain.
DROP POLICY IF EXISTS "admins can manage places" ON public.places;
DROP POLICY IF EXISTS "admins can manage provinces" ON public.provinces;
DROP POLICY IF EXISTS "admins can manage province guides" ON public.province_guides;
DROP POLICY IF EXISTS "admins can manage place guides" ON public.place_guides;
