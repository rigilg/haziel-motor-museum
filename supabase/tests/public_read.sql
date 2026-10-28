-- Execute after migrations 001–003. Verifies real anon-role visibility and ACLs.
begin;
insert into public.manufacturers(id, name, slug) values
 ('10000000-0000-0000-0000-000000000001','Public Maker','public-maker'),
 ('10000000-0000-0000-0000-000000000002','Draft Maker','draft-maker');
insert into public.vehicles(id, manufacturer_id, name, slug, status) values
 ('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','Published Car','published-car','published'),
 ('20000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002','Draft Car','draft-car','draft');
insert into public.vehicle_variants(vehicle_id, name) values
 ('20000000-0000-0000-0000-000000000001','Public Variant'),('20000000-0000-0000-0000-000000000002','Private Variant');
insert into public.vehicle_specs(vehicle_id, engine) values
 ('20000000-0000-0000-0000-000000000001','Public engine'),('20000000-0000-0000-0000-000000000002','Private engine');
insert into public.stories(vehicle_id, story_type, title, body, status) values
 ('20000000-0000-0000-0000-000000000001','chapter','Public story','On view','published'),
 ('20000000-0000-0000-0000-000000000001','chapter','Private story','Not on view','draft'),
 ('20000000-0000-0000-0000-000000000002','chapter','Draft vehicle story','Not on view','published');
insert into public.timeline_events(vehicle_id, year, title) values
 ('20000000-0000-0000-0000-000000000001',1962,'Public event'),
 ('20000000-0000-0000-0000-000000000002',1963,'Private event');
insert into public.media_assets(id, asset_type, rights_verified, rights_verified_at, storage_path,
 original_source_url, source_name, creator_name, license_name, license_url, attribution_text, modification_description) values
 ('30000000-0000-0000-0000-000000000001','image',true,now(),'public.jpg','https://example.org/a','Archive','Creator','CC BY','https://creativecommons.org/licenses/by/4.0/','Credit','None'),
 ('30000000-0000-0000-0000-000000000002','image',false,null,null,null,null,null,null,null,null,null);
insert into public.vehicle_media(vehicle_id, media_asset_id, role) values
 ('20000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000001','hero'),
 ('20000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000002','unverified'),
 ('20000000-0000-0000-0000-000000000002','30000000-0000-0000-0000-000000000001','draft vehicle');
insert into public.sources(id, title, source_url) values
 ('40000000-0000-0000-0000-000000000001','Public source','https://example.org/source'),
 ('40000000-0000-0000-0000-000000000002','Private source','https://example.org/private');
insert into public.vehicle_sources(vehicle_id, source_id) values
 ('20000000-0000-0000-0000-000000000001','40000000-0000-0000-0000-000000000001'),
 ('20000000-0000-0000-0000-000000000002','40000000-0000-0000-0000-000000000002');
insert into public.people(id, name, slug) values
 ('50000000-0000-0000-0000-000000000001','Public Person','public-person'),
 ('50000000-0000-0000-0000-000000000002','Private Person','private-person');
insert into public.vehicle_people(vehicle_id, person_id, role) values
 ('20000000-0000-0000-0000-000000000001','50000000-0000-0000-0000-000000000001','designer'),
 ('20000000-0000-0000-0000-000000000002','50000000-0000-0000-0000-000000000002','designer');

set local role anon;
do $$ begin
 if (select count(*) from public.vehicles) <> 1 then raise exception 'anon should see only published vehicles'; end if;
 if (select count(*) from public.manufacturers) <> 1 then raise exception 'anon should see only linked manufacturers'; end if;
 if (select count(*) from public.vehicle_variants) <> 1 or (select count(*) from public.vehicle_specs) <> 1 then raise exception 'anon should see only published specs and variants'; end if;
 if (select count(*) from public.stories) <> 1 then raise exception 'anon should see only published stories for published vehicles'; end if;
 if (select count(*) from public.timeline_events) <> 1 then raise exception 'anon should see only events for published vehicles'; end if;
 if (select count(*) from public.media_assets) <> 1 or (select count(*) from public.vehicle_media) <> 1 then raise exception 'anon should see only verified media for published vehicles'; end if;
 if (select count(*) from public.sources) <> 1 or (select count(*) from public.vehicle_sources) <> 1 then raise exception 'anon should see only linked published sources'; end if;
 if (select count(*) from public.people) <> 1 or (select count(*) from public.vehicle_people) <> 1 then raise exception 'anon should see only linked published people'; end if;
end $$;
reset role;
do $$ begin
 if has_table_privilege('anon','public.vehicles','INSERT') or has_table_privilege('anon','public.vehicles','UPDATE') or has_table_privilege('anon','public.vehicles','DELETE') then raise exception 'anon must remain read-only'; end if;
 if has_table_privilege('anon','public.collections','SELECT') then raise exception 'collections remain private until explicitly published'; end if;
 if has_table_privilege('authenticated','public.vehicles','SELECT') then raise exception 'signed-in users receive no implicit CMS access'; end if;
end $$;
rollback;
