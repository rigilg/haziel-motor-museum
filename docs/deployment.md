# Prototype deployment

The app is prepared for Vercel with the GitHub repository `rigilg/haziel-motor-museum`.
Connect the repository as a Vercel project, keep `main` as the production branch,
and let pull requests / `develop` produce previews. The framework is detected as
Next.js; use the repository root as the project root and keep the default build
command (`npm run build`). CI runs lint, tests, build, and TypeScript checks.

## Environment

Copy `.env.example` to `.env.local` for local use. `NEXT_PUBLIC_SITE_URL` controls
canonical metadata, `robots.txt`, and `sitemap.xml`; production defaults to
`https://hazielmotormuseum.rigilgilbert.com`. No hosted Supabase variables are
required for this static prototype. Supabase is not connected to the live pages.

## Custom hostname with Porkbun DNS

1. In Vercel, open the project’s **Settings → Domains** and add
   `hazielmotormuseum.rigilgilbert.com`.
2. Copy the exact DNS record Vercel displays for this project. Vercel can provide
   a project-specific CNAME target, so do not substitute a generic hostname.
3. In Porkbun, open **Domain Management → DNS** for `rigilgilbert.com` and add a
   CNAME record with Host `hazielmotormuseum` and the exact Vercel target as Value.
   Leave TTL at its default unless Vercel specifies otherwise.
4. Remove only a conflicting record for this exact hostname if one exists; do not
   change the zone’s nameservers or unrelated records.
5. Wait for Vercel to verify DNS and issue HTTPS. Test the custom hostname and
   `robots.txt`, `sitemap.xml`, collection, timeline, tour, and Ferrari exhibit.

Vercel requires the project to be linked before its dashboard can give the exact
record and verify the custom domain. DNS changes and production deployment are
account-owner actions; this repository change does not perform either.

## Prototype scope

This deploys the current editorial prototype: one complete Ferrari 250 GTO exhibit,
collection search, six sourced timeline milestones, and one curated tour. The
other homepage vehicle cards are marked as in preparation. Supabase migrations
are checked in CI, but no database project is provisioned, seeded, or connected.
The private CMS and first 20-car collection remain later milestones.
