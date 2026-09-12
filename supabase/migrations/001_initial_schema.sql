create extension if not exists pgcrypto;

create table manufacturers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  country text,
  founded_year integer,
  description text,
  website_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  manufacturer_id uuid references manufacturers(id),
  name text not null,
  slug text not null unique,
  production_start_year integer,
  production_end_year integer,
  country text,
  category text,
  short_description text,
  historical_significance text,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table vehicle_variants (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  name text not null,
  production_start_year integer,
  production_end_year integer,
  description text,
  created_at timestamptz not null default now()
);

create table vehicle_specs (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  engine text,
  displacement_cc integer,
  cylinder_count integer,
  aspiration text,
  horsepower_hp numeric,
  torque_nm numeric,
  transmission text,
  drivetrain text,
  weight_kg numeric,
  top_speed_kmh numeric,
  acceleration_0_100_kmh numeric,
  production_count integer,
  notes text,
  created_at timestamptz not null default now()
);

create table stories (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  story_type text not null,
  title text not null,
  body text not null,
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table timeline_events (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid references vehicles(id) on delete cascade,
  year integer not null,
  month integer,
  day integer,
  title text not null,
  description text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table media_assets (
  id uuid primary key default gen_random_uuid(),
  asset_type text not null check (asset_type in ('image','video','audio','model_3d','document')),
  storage_path text,
  thumbnail_path text,
  original_source_url text,
  source_name text,
  creator_name text,
  license_name text,
  license_url text,
  attribution_text text,
  modification_description text,
  rights_verified boolean not null default false,
  rights_verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table vehicle_media (
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  media_asset_id uuid not null references media_assets(id) on delete cascade,
  role text,
  caption text,
  display_order integer not null default 0,
  is_hero boolean not null default false,
  primary key (vehicle_id, media_asset_id)
);

create table sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  publisher text,
  author text,
  source_url text,
  publication_date date,
  accessed_at timestamptz,
  source_type text,
  notes text,
  created_at timestamptz not null default now()
);

create table vehicle_sources (
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  source_id uuid not null references sources(id) on delete cascade,
  relevance text,
  primary key (vehicle_id, source_id)
);

create table collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  hero_media_id uuid references media_assets(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table collection_vehicles (
  collection_id uuid not null references collections(id) on delete cascade,
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  display_order integer not null default 0,
  primary key (collection_id, vehicle_id)
);

create table people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  birth_year integer,
  death_year integer,
  biography text,
  created_at timestamptz not null default now()
);

create table vehicle_people (
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  person_id uuid not null references people(id) on delete cascade,
  role text not null,
  primary key (vehicle_id, person_id, role)
);
