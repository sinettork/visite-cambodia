create index if not exists idx_admin_audit_admin_user on public.admin_audit_log(admin_user_id);

drop policy if exists "admin users can read own record" on public.admin_users;
drop policy if exists "admins can read admin users" on public.admin_users;
create policy "admin users can read allowed records"
  on public.admin_users
  for select to authenticated
  using ((user_id = (select auth.uid())) or (select private.is_admin()));

drop policy if exists "admins can write audit log" on public.admin_audit_log;
create policy "admins can write audit log"
  on public.admin_audit_log
  for insert to authenticated
  with check (admin_user_id = (select auth.uid()));

drop policy if exists "public can read provinces" on public.provinces;
drop policy if exists "admins can manage provinces" on public.provinces;
create policy "public can read provinces" on public.provinces
  for select to anon, authenticated using (true);
create policy "admins can write provinces" on public.provinces
  for insert to authenticated with check ((select private.is_editor_or_admin()));
create policy "admins can update provinces" on public.provinces
  for update to authenticated
  using ((select private.is_editor_or_admin()))
  with check ((select private.is_editor_or_admin()));
create policy "admins can delete provinces" on public.provinces
  for delete to authenticated using ((select private.is_editor_or_admin()));

drop policy if exists "public can read published places" on public.places;
drop policy if exists "public can read allowed places" on public.places;
drop policy if exists "anon can read published places" on public.places;
drop policy if exists "authenticated can read allowed places" on public.places;

create policy "anon can read published places"
  on public.places
  for select to anon
  using (publication_status = 'published');

create policy "authenticated can read allowed places"
  on public.places
  for select to authenticated
  using (
    publication_status = 'published'
    or (select private.is_editor_or_admin())
  );

drop policy if exists "public can read province guides" on public.province_guides;
drop policy if exists "admins can manage province guides" on public.province_guides;
create policy "public can read province guides" on public.province_guides
  for select to anon, authenticated using (true);
create policy "admins can insert province guides" on public.province_guides
  for insert to authenticated with check ((select private.is_editor_or_admin()));
create policy "admins can update province guides" on public.province_guides
  for update to authenticated
  using ((select private.is_editor_or_admin()))
  with check ((select private.is_editor_or_admin()));
create policy "admins can delete province guides" on public.province_guides
  for delete to authenticated using ((select private.is_editor_or_admin()));

drop policy if exists "public can read published place guides" on public.place_guides;
drop policy if exists "public can read allowed place guides" on public.place_guides;
drop policy if exists "anon can read published place guides" on public.place_guides;
drop policy if exists "authenticated can read allowed place guides" on public.place_guides;

create policy "anon can read published place guides"
  on public.place_guides
  for select to anon
  using (
    exists (
      select 1
      from public.places p
      where p.id = place_guides.place_id
        and p.publication_status = 'published'
    )
  );

create policy "authenticated can read allowed place guides"
  on public.place_guides
  for select to authenticated
  using (
    exists (
      select 1
      from public.places p
      where p.id = place_guides.place_id
        and (
          p.publication_status = 'published'
          or (select private.is_editor_or_admin())
        )
    )
  );


