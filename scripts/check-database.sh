#!/usr/bin/env bash
# Run only against a new, disposable PostgreSQL 17 cluster.
set -euo pipefail
cd "$(dirname "$0")/.."
scenario="${1:-fresh}"
case "$scenario" in fresh|upgrade|rollback) ;; *) echo 'Usage: bash scripts/check-database.sh fresh|upgrade|rollback' >&2; exit 2 ;; esac
psql_cmd=(psql -X -v ON_ERROR_STOP=1)
"${psql_cmd[@]}" -f supabase/tests/bootstrap.sql
"${psql_cmd[@]}" -f supabase/migrations/001_initial_schema.sql
if [[ "$scenario" != fresh ]]; then
  "${psql_cmd[@]}" -f supabase/tests/upgrade_fixture.sql
fi
if [[ "$scenario" == rollback ]]; then
  "${psql_cmd[@]}" -c "INSERT INTO public.vehicles (name, slug) VALUES ('Needs editorial correction', 'Invalid Slug');"
  failure_log="$(mktemp)"
  trap 'rm -f "$failure_log"' EXIT
  if "${psql_cmd[@]}" -v VERBOSITY=verbose -f supabase/migrations/002_harden_schema.sql >"$failure_log" 2>&1; then
    echo 'Expected hardening migration to reject the invalid existing slug' >&2
    exit 1
  fi
  cat "$failure_log"
  # A connection/syntax error must not be mistaken for the intended rejection.
  grep -q '23514' "$failure_log"
  grep -q 'vehicles_slug_format' "$failure_log"
  "${psql_cmd[@]}" -f supabase/tests/rollback_assertions.sql
  "${psql_cmd[@]}" -c "UPDATE public.vehicles SET slug = 'corrected-slug' WHERE slug = 'Invalid Slug';"
fi
"${psql_cmd[@]}" -f supabase/migrations/002_harden_schema.sql
"${psql_cmd[@]}" -f supabase/tests/hardening.sql
if [[ "$scenario" != fresh ]]; then
  "${psql_cmd[@]}" -f supabase/tests/upgrade_assertions.sql
fi
echo "Database scenario passed: $scenario"
