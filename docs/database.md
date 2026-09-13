# Database migration validation

The Ferrari exhibit remains backed by `lib/vehicles.ts`. This slice prepares the
database; it does not connect the application, seed exhibit content, or deploy.

## Migration contract

Keep `001_initial_schema.sql` unchanged. Apply `002_harden_schema.sql` once after
001, using the database migration owner. Supabase records applied versions; these
files are ordered migrations, not scripts to repeatedly replay over an existing
schema. 002 is transactional: a constraint failure rolls back the entire change.
It changes no editorial rows and drops no tables.

All 14 museum tables have RLS enabled and explicit revocation of privileges from
PUBLIC, `anon`, and `authenticated`. There are no public policies yet, including
for rows marked published. Signing in does not confer curator privileges.
`service_role` receives SELECT/INSERT/UPDATE/DELETE and uses Supabase's existing
BYPASSRLS role; credentials must stay server-side. A future CMS/public read slice
must define publication rules across the whole content/provenance graph before
adding grants and policies. Storage bucket policies are outside this schema.

002 maintains the four existing `updated_at` columns, validates slugs/nonblank
names, chronological ranges, finite nonnegative specifications (positive weight
and acceleration duration), and partial/complete timeline dates. Unknown optional
values remain NULL. Zero displacement/cylinders remain possible for electric cars.
One hero association is allowed per vehicle; shared media remain reusable.

Unverified media may remain incomplete. Asserting `rights_verified` requires a
review timestamp, storage path, original source URL, source/creator names,
license and license URL, attribution, and modification note (use `None` if
unchanged). This enforces record completeness, not the truth of a license claim.
URL checks require an HTTP(S) shape; they do not verify availability or rights.

## Run the checks

Use a **disposable PostgreSQL 17 database**, with a superuser test connection and
the `pgcrypto` extension available. The bootstrap creates Supabase-like API roles
and models older permissive grants; never run test bootstrap/fixtures on a hosted
project. With standard PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE variables set:

```sh
psql -X -v ON_ERROR_STOP=1 -f supabase/tests/bootstrap.sql
psql -X -v ON_ERROR_STOP=1 -f supabase/migrations/001_initial_schema.sql
# For the upgrade scenario, insert this before 002:
# psql -X -v ON_ERROR_STOP=1 -f supabase/tests/upgrade_fixture.sql
psql -X -v ON_ERROR_STOP=1 -f supabase/migrations/002_harden_schema.sql
psql -X -v ON_ERROR_STOP=1 -f supabase/tests/hardening.sql
# After the upgrade scenario:
# psql -X -v ON_ERROR_STOP=1 -f supabase/tests/upgrade_assertions.sql
```

Roles are cluster-scoped: bootstrap once per disposable cluster; recreate the
database for each scenario and restore schema usage/default grants in that database.
CI runs fresh and populated-upgrade scenarios in separate PostgreSQL services.
Assertions raise errors, so `ON_ERROR_STOP` makes failures fail the job. Behavior
tests roll back their fixture changes. They exercise ACL denial for every table,
RLS defense against accidental grants, trusted CRUD, timestamp maintenance,
constraints, provenance requirements, uniqueness, foreign keys and cascades.

## Before applying to a real project

Inspect migration history and take a backup. Run the upgrade against a staging
copy first. Existing invalid slugs/names, reversed years, invalid dates/specs,
duplicate hero links or incomplete verified media cause 002 to fail atomically.
Resolve those records deliberately, preserving their provenance, then retry the
unapplied migration. Do not rewrite 001, mark failed migrations applied, or reset a
populated project. The indexes and constraint validation take locks; schedule the
operation appropriately for the data volume. If an applied change needs reversal,
use a reviewed forward migration rather than removing security to bypass an error.

This validates PostgreSQL behavior, not a full Supabase API/Auth/Storage stack.
No hosted migration has been applied. The public Next.js build needs no DB secrets.

References: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security),
[API grants](https://supabase.com/docs/guides/api/securing-your-api),
[PostgreSQL constraints](https://www.postgresql.org/docs/17/ddl-constraints.html).
