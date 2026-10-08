create schema if not exists extensions;
alter extension pg_trgm set schema extensions;

drop index if exists public.idx_places_name_en_trgm;
drop index if exists public.idx_places_name_km_trgm;

create index if not exists idx_places_name_en_trgm
  on public.places using gin (name_en extensions.gin_trgm_ops);

create index if not exists idx_places_name_km_trgm
  on public.places using gin (name_km extensions.gin_trgm_ops);
