-- Additive hardening: keep 001 unchanged for databases that already applied it.
-- Apply as the migration owner. Fail atomically if existing rows need correction.
begin;

-- The current exhibit is static. No browser or signed-in user is a curator yet.
-- Explicit ACLs also cover older Supabase projects with permissive default grants.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'manufacturers', 'vehicles', 'vehicle_variants', 'vehicle_specs', 'stories',
    'timeline_events', 'media_assets', 'vehicle_media', 'sources', 'vehicle_sources',
    'collections', 'collection_vehicles', 'people', 'vehicle_people'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on table public.%I from public, anon, authenticated', table_name);
    execute format('grant select, insert, update, delete on table public.%I to service_role', table_name);
  end loop;
end $$;

create function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := statement_timestamp();
  return new;
end;
$$;
revoke all on function public.set_updated_at() from public, anon, authenticated;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['manufacturers', 'vehicles', 'stories', 'collections'] loop
    execute format('create trigger set_updated_at before update on public.%I
      for each row execute function public.set_updated_at()', table_name);
  end loop;
  foreach table_name in array array['manufacturers', 'vehicles', 'collections', 'people'] loop
    execute format('alter table public.%I add constraint %I check (slug ~ %L),
      add constraint %I check (name ~ %L)', table_name, table_name || '_slug_format',
      '^[a-z0-9]+(-[a-z0-9]+)*$', table_name || '_name_nonblank', '[^[:space:]]');
  end loop;
end $$;

alter table public.vehicles add constraint vehicles_year_order
  check (production_end_year >= production_start_year);
alter table public.vehicle_variants add constraint variants_year_order
  check (production_end_year >= production_start_year);
alter table public.people add constraint people_year_order check (death_year >= birth_year);
alter table public.vehicle_specs add constraint specs_nonnegative check (
  (displacement_cc is null or displacement_cc >= 0) and
  (cylinder_count is null or cylinder_count >= 0) and
  (horsepower_hp is null or (horsepower_hp >= 0 and horsepower_hp < 'Infinity'::numeric)) and
  (torque_nm is null or (torque_nm >= 0 and torque_nm < 'Infinity'::numeric)) and
  (weight_kg is null or (weight_kg > 0 and weight_kg < 'Infinity'::numeric)) and
  (top_speed_kmh is null or (top_speed_kmh >= 0 and top_speed_kmh < 'Infinity'::numeric)) and
  (acceleration_0_100_kmh is null or (acceleration_0_100_kmh > 0 and acceleration_0_100_kmh < 'Infinity'::numeric)) and
  (production_count is null or production_count >= 0)
);

-- Allow year-only or year/month precision; reject impossible complete dates.
alter table public.timeline_events add constraint timeline_date_valid check (
  year between 1 and 9999 and
  (month is null or month between 1 and 12) and
  (day is null or (month is not null and day between 1 and
    case month
      when 2 then case when year % 400 = 0 or (year % 4 = 0 and year % 100 <> 0) then 29 else 28 end
      when 4 then 30 when 6 then 30 when 9 then 30 when 11 then 30
      else 31
    end))
);

-- Incomplete research records remain valid until verification is asserted.
-- COALESCE prevents SQL NULL from bypassing the verification requirement.
alter table public.media_assets add constraint media_verified_provenance check (
  not rights_verified or (
    rights_verified_at is not null and
    coalesce(storage_path ~ '[^[:space:]]', false) and
    coalesce(original_source_url ~ '^https?://[^[:space:]]+$', false) and
    coalesce(source_name ~ '[^[:space:]]', false) and
    coalesce(creator_name ~ '[^[:space:]]', false) and
    coalesce(license_name ~ '[^[:space:]]', false) and
    coalesce(license_url ~ '^https?://[^[:space:]]+$', false) and
    coalesce(attribution_text ~ '[^[:space:]]', false) and
    coalesce(modification_description ~ '[^[:space:]]', false)
  )
);

create unique index vehicle_media_one_hero on public.vehicle_media (vehicle_id) where is_hero;

-- Cover foreign-key lookups not already covered by a leading PK/index column.
create index vehicles_manufacturer_idx on public.vehicles (manufacturer_id);
create index vehicle_variants_vehicle_idx on public.vehicle_variants (vehicle_id);
create index vehicle_specs_vehicle_idx on public.vehicle_specs (vehicle_id);
create index stories_vehicle_order_idx on public.stories (vehicle_id, display_order);
create index timeline_events_vehicle_order_idx on public.timeline_events (vehicle_id, display_order);
create index vehicle_media_asset_idx on public.vehicle_media (media_asset_id);
create index vehicle_sources_source_idx on public.vehicle_sources (source_id);
create index collections_hero_idx on public.collections (hero_media_id);
create index collection_vehicles_vehicle_idx on public.collection_vehicles (vehicle_id);
create index vehicle_people_person_idx on public.vehicle_people (person_id);

commit;
