-- Execute after 001 and 002 with ON_ERROR_STOP. All test changes roll back.
begin;
create function pg_temp.assert_true(value boolean, label text) returns void
language plpgsql as $$ begin
  if value is distinct from true then raise exception 'Assertion failed: %', label; end if;
end $$;
create function pg_temp.expect_error(command text, expected_state text) returns void
language plpgsql as $$ begin
  begin
    execute command;
  exception when others then
    if sqlstate = expected_state then return; end if;
    raise;
  end;
  raise exception 'Expected SQLSTATE % for %', expected_state, command;
end $$;

select pg_temp.assert_true(
  (select count(*) = 14 and bool_and(relrowsecurity) from pg_class
   where relnamespace = 'public'::regnamespace and relkind = 'r'), 'all 14 tables have RLS');
select pg_temp.assert_true(
  not exists (select from pg_policies where schemaname = 'public'), 'no public policies before CMS integration');

-- Test actual statements for each API role, including TRUNCATE (not covered by RLS).
do $$ declare t text; r text; begin
  foreach r in array array['anon', 'authenticated'] loop
    for t in select tablename from pg_tables where schemaname = 'public' loop
      execute format('set local role %I', r);
      perform pg_temp.expect_error(format('select * from public.%I', t), '42501');
      perform pg_temp.expect_error(format('insert into public.%I default values', t), '42501');
      perform pg_temp.expect_error(format('update public.%I set %I = %I', t,
        case when t in ('vehicle_media', 'vehicle_sources', 'collection_vehicles', 'vehicle_people') then 'vehicle_id' else 'id' end,
        case when t in ('vehicle_media', 'vehicle_sources', 'collection_vehicles', 'vehicle_people') then 'vehicle_id' else 'id' end), '42501');
      perform pg_temp.expect_error(format('delete from public.%I', t), '42501');
      perform pg_temp.expect_error(format('truncate public.%I cascade', t), '42501');
      reset role;
      perform pg_temp.assert_true(not has_table_privilege(r, 'public.' || t, 'UPDATE'), r || ' cannot update ' || t);
    end loop;
  end loop;
end $$;

insert into public.vehicles (id, name, slug, status) values
  ('00000000-0000-0000-0000-000000000001', 'Test published', 'test-published', 'published'),
  ('00000000-0000-0000-0000-000000000002', 'Test draft', 'test-draft', 'draft');

-- Defense in depth: even an accidental SELECT grant cannot expose rows.
grant select on public.vehicles to anon, authenticated;
set local role anon;
select pg_temp.assert_true((select count(*) = 0 from public.vehicles), 'anon RLS hides published and draft rows');
reset role;
set local role authenticated;
select pg_temp.assert_true((select count(*) = 0 from public.vehicles), 'authenticated RLS hides all rows');
reset role;

set local role service_role;
insert into public.manufacturers (name, slug, updated_at)
values ('Trusted writer', 'trusted-writer', '2000-01-01');
update public.manufacturers set name = 'Updated writer', updated_at = '2001-01-01' where slug = 'trusted-writer';
select pg_temp.assert_true((select updated_at > '2001-01-01'::timestamptz from public.manufacturers
  where slug = 'trusted-writer'), 'trigger maintains updated_at for trusted writer');
delete from public.manufacturers where slug = 'trusted-writer';
reset role;

select pg_temp.expect_error($q$insert into public.vehicles(name, slug) values ('Car', 'Bad Slug')$q$, '23514');
select pg_temp.expect_error($q$insert into public.vehicles(name, slug) values ('   ', 'blank')$q$, '23514');
select pg_temp.expect_error($q$insert into public.vehicles(name, slug, production_start_year, production_end_year)
  values ('Car', 'bad-years', 1964, 1962)$q$, '23514');
select pg_temp.expect_error($q$insert into public.people(name, slug, birth_year, death_year)
  values ('Person', 'person', 2000, 1900)$q$, '23514');
select pg_temp.expect_error($q$insert into public.vehicle_specs(vehicle_id, weight_kg)
  values ('00000000-0000-0000-0000-000000000001', -1)$q$, '23514');
select pg_temp.expect_error($q$insert into public.vehicle_specs(vehicle_id, horsepower_hp)
  values ('00000000-0000-0000-0000-000000000001', 'NaN')$q$, '23514');
select pg_temp.expect_error($q$insert into public.timeline_events(year, month, day, title)
  values (1900, 2, 29, 'Invalid leap day')$q$, '23514');
select pg_temp.expect_error($q$insert into public.timeline_events(year, day, title)
  values (1962, 1, 'Day without month')$q$, '23514');
select pg_temp.expect_error($q$insert into public.timeline_events(year, month, day, title)
  values (1962, 4, 31, 'Invalid April day')$q$, '23514');
insert into public.timeline_events(year, month, day, title) values
  (2000, 2, 29, 'Valid leap day'), (1962, null, null, 'Year precision'), (1962, 6, null, 'Month precision');

select pg_temp.expect_error($q$insert into public.media_assets(asset_type, rights_verified)
  values ('image', true)$q$, '23514');
insert into public.media_assets(id, asset_type, rights_verified, rights_verified_at, storage_path,
  original_source_url, source_name, creator_name, license_name, license_url, attribution_text, modification_description)
values ('00000000-0000-0000-0000-000000000003', 'image', true, now(), 'test/image.jpg',
  'https://example.com/original', 'Test archive', 'Test creator', 'Test license',
  'https://example.com/license', 'Test attribution', 'None');
do $$ declare field text; begin
  foreach field in array array['storage_path', 'original_source_url', 'source_name', 'creator_name',
    'license_name', 'license_url', 'attribution_text', 'modification_description', 'rights_verified_at'] loop
    perform pg_temp.expect_error(format('update public.media_assets set %I = null
      where id = %L', field, '00000000-0000-0000-0000-000000000003'), '23514');
  end loop;
end $$;
select pg_temp.expect_error($q$update public.media_assets set creator_name = E' \t\n'
  where id = '00000000-0000-0000-0000-000000000003'$q$, '23514');
select pg_temp.expect_error($q$update public.media_assets set license_url = 'javascript:alert(1)'
  where id = '00000000-0000-0000-0000-000000000003'$q$, '23514');

insert into public.media_assets(id, asset_type) values ('00000000-0000-0000-0000-000000000004', 'image');
insert into public.vehicle_media(vehicle_id, media_asset_id, is_hero)
values ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', true);
select pg_temp.expect_error($q$insert into public.vehicle_media(vehicle_id, media_asset_id, is_hero)
  values ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000004', true)$q$, '23505');
select pg_temp.expect_error($q$insert into public.vehicle_specs(vehicle_id)
  values ('00000000-0000-0000-0000-000000000099')$q$, '23503');
delete from public.vehicles where id = '00000000-0000-0000-0000-000000000001';
select pg_temp.assert_true(not exists(select from public.vehicle_media where vehicle_id =
  '00000000-0000-0000-0000-000000000001'), 'vehicle deletion cascades links');
select pg_temp.assert_true(exists(select from public.media_assets where id =
  '00000000-0000-0000-0000-000000000003'), 'vehicle deletion preserves shared provenance');
rollback;
