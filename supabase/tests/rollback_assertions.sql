-- Run in a new connection after 002 rejects an invalid existing vehicle slug.
-- Verify the earlier ACL/RLS and trigger changes rolled back as well as data.
do $$
declare t text; r text;
begin
  if exists (select from pg_class where relnamespace = 'public'::regnamespace
    and relkind = 'r' and relrowsecurity) then
    raise exception 'Failed migration left RLS enabled';
  end if;
  if to_regprocedure('public.set_updated_at()') is not null
    or exists (select from pg_trigger where tgname = 'set_updated_at' and not tgisinternal
      and tgrelid in (select oid from pg_class where relnamespace = 'public'::regnamespace)) then
    raise exception 'Failed migration left timestamp function or triggers';
  end if;
  if exists (select from pg_constraint where connamespace = 'public'::regnamespace
    and conname in ('manufacturers_slug_format', 'manufacturers_name_nonblank',
      'vehicles_slug_format', 'vehicles_name_nonblank', 'collections_slug_format',
      'collections_name_nonblank', 'people_slug_format', 'people_name_nonblank',
      'vehicles_year_order', 'variants_year_order', 'people_year_order',
      'specs_nonnegative', 'timeline_date_valid', 'media_verified_provenance')) then
    raise exception 'Failed migration left hardening constraints';
  end if;
  for t in select tablename from pg_tables where schemaname = 'public' loop
    foreach r in array array['anon', 'authenticated'] loop
      if not (has_table_privilege(r, 'public.' || t, 'SELECT')
        and has_table_privilege(r, 'public.' || t, 'INSERT')
        and has_table_privilege(r, 'public.' || t, 'UPDATE')
        and has_table_privilege(r, 'public.' || t, 'DELETE')
        and has_table_privilege(r, 'public.' || t, 'TRUNCATE')) then
        raise exception 'Failed migration changed legacy privileges: % / %', r, t;
      end if;
    end loop;
    if has_table_privilege('service_role', 'public.' || t, 'SELECT') then
      raise exception 'Failed migration left service-role grants on %', t;
    end if;
  end loop;
  if not exists (select from public.vehicles where slug = 'Invalid Slug'
    and name = 'Needs editorial correction') then
    raise exception 'Failed migration modified invalid editorial content';
  end if;
end $$;
