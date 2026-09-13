-- Rows that predate 002 must survive without editorial changes.
insert into public.manufacturers (name, slug) values ('Upgrade fixture', 'upgrade-fixture');
insert into public.vehicles (name, slug, historical_significance)
values ('Existing exhibit', 'existing-exhibit', 'Preserve this curatorial text.');
insert into public.media_assets (asset_type) values ('image');
