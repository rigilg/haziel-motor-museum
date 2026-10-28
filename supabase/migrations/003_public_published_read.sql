-- Public API access is read-only and limited to complete, published exhibits.
-- Editorial writes remain reserved for the trusted service role until a CMS
-- authentication flow is deployed.
begin;

create function public.public_media_asset(p_media_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.media_assets m
    join public.vehicle_media vm on vm.media_asset_id = m.id
    join public.vehicles v on v.id = vm.vehicle_id
    where m.id = p_media_id and m.rights_verified and v.status = 'published')
$$;
create function public.public_vehicle_media(p_vehicle_id uuid, p_media_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.vehicle_media vm
    join public.media_assets m on m.id = vm.media_asset_id
    join public.vehicles v on v.id = vm.vehicle_id
    where vm.vehicle_id = p_vehicle_id and vm.media_asset_id = p_media_id
      and m.rights_verified and v.status = 'published')
$$;
revoke all on function public.public_media_asset(uuid) from public, anon, authenticated;
revoke all on function public.public_vehicle_media(uuid, uuid) from public, anon, authenticated;
grant execute on function public.public_media_asset(uuid) to anon;
grant execute on function public.public_vehicle_media(uuid, uuid) to anon;

grant select on public.vehicles, public.manufacturers, public.vehicle_variants,
  public.vehicle_specs, public.stories, public.timeline_events, public.media_assets,
  public.vehicle_media, public.sources, public.vehicle_sources, public.people,
  public.vehicle_people to anon;

create policy vehicles_public_published on public.vehicles
  for select to anon using (status = 'published');
create policy manufacturers_for_published_vehicles on public.manufacturers
  for select to anon using (exists (select 1 from public.vehicles v
    where v.manufacturer_id = manufacturers.id and v.status = 'published'));
create policy variants_for_published_vehicles on public.vehicle_variants
  for select to anon using (exists (select 1 from public.vehicles v
    where v.id = vehicle_variants.vehicle_id and v.status = 'published'));
create policy specs_for_published_vehicles on public.vehicle_specs
  for select to anon using (exists (select 1 from public.vehicles v
    where v.id = vehicle_specs.vehicle_id and v.status = 'published'));
create policy stories_public_published on public.stories
  for select to anon using (status = 'published' and exists (select 1 from public.vehicles v
    where v.id = stories.vehicle_id and v.status = 'published'));
create policy timeline_for_published_vehicles on public.timeline_events
  for select to anon using (vehicle_id is not null and exists (select 1 from public.vehicles v
    where v.id = timeline_events.vehicle_id and v.status = 'published'));
create policy media_public_verified on public.media_assets
  for select to anon using (public.public_media_asset(media_assets.id));
create policy vehicle_media_public_verified on public.vehicle_media
  for select to anon using (public.public_vehicle_media(vehicle_media.vehicle_id, vehicle_media.media_asset_id));
create policy sources_for_published_vehicles on public.sources
  for select to anon using (exists (select 1 from public.vehicle_sources vs
    join public.vehicles v on v.id = vs.vehicle_id
    where vs.source_id = sources.id and v.status = 'published'));
create policy vehicle_sources_for_published_vehicles on public.vehicle_sources
  for select to anon using (exists (select 1 from public.vehicles v
    where v.id = vehicle_sources.vehicle_id and v.status = 'published'));
create policy people_for_published_vehicles on public.people
  for select to anon using (exists (select 1 from public.vehicle_people vp
    join public.vehicles v on v.id = vp.vehicle_id
    where vp.person_id = people.id and v.status = 'published'));
create policy vehicle_people_for_published_vehicles on public.vehicle_people
  for select to anon using (exists (select 1 from public.vehicles v
    where v.id = vehicle_people.vehicle_id and v.status = 'published'));

commit;
