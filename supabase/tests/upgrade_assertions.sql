do $$ begin
  if not exists (select from public.vehicles where slug = 'existing-exhibit'
    and historical_significance = 'Preserve this curatorial text.' and status = 'draft')
    or not exists (select from public.manufacturers where slug = 'upgrade-fixture')
    or not exists (select from public.media_assets where not rights_verified and storage_path is null)
  then raise exception 'Existing content was not preserved'; end if;
end $$;
