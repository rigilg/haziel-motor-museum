# Haziel Motor Museum

**A digital museum dedicated to the history, engineering, design, culture, and legacy of the automobile.**

> The history of the automobile, preserved digitally.

Repository: [`rigilg/haziel-motor-museum`](https://github.com/rigilg/haziel-motor-museum)
Planned public address: [`hazielmotormuseum.rigilgilbert.com`](https://hazielmotormuseum.rigilgilbert.com)

Haziel is meant to feel like a museum, not a car database. Editorial curation, historical context, visual quality, and trustworthy sourcing take priority over the size of the catalogue. This README is the working handoff for contributors joining at any stage; use the linked design and operational documents for deeper details.

## Project status

The repository contains a deployable **editorial prototype**, not yet a publicly deployed site. The current experience is intentionally static and works without a hosted Supabase project.

| Area | Status |
| --- | --- |
| Museum-style homepage and responsive design | Implemented |
| Ferrari 250 GTO exhibit with six chapters, source notes, and credited local photography | Implemented |
| Published collection browsing, shareable search, and country filter | Implemented; Ferrari 250 GTO is the only published exhibit |
| Global automotive timeline | Implemented with six sourced milestones and filters |
| Curated Ferrari exhibit tour | Implemented |
| SEO metadata, sitemap, robots rules, branded icon/social preview, custom 404 | Implemented in the current development work |
| PostgreSQL schema, row-level access policies, and migration checks | Implemented and tested against disposable PostgreSQL 17 databases |
| Hosted Supabase project, production data, and CMS | Not provisioned or connected |
| Vercel project, production deployment, and custom DNS | Not configured; see [deployment runbook](docs/deployment.md) |
| Initial collection of 20 exhibits | Planned; only one exhibit is currently published |

At the time of this update, PR #10 is the open launch-polish PR from `develop` to `main`. Review its checks and preview before merging. Do not describe the custom hostname as live until Vercel reports the deployment healthy, DNS verifies, and the smoke checks below pass.

## Product goals and boundaries

The MVP is a responsive, curated museum experience with:

- A museum homepage and curated collection browsing.
- Search and useful filters for published vehicles.
- Complete vehicle exhibit pages with narrative, specifications, design and engineering interpretation, competition/cultural context, and a vehicle timeline.
- A global automotive timeline and editor-curated tours.
- A private editorial workflow for drafts, review, publication, and media/source records.
- Verifiable source and image provenance, including license and attribution metadata.
- Accessible, keyboard-usable controls and small-screen layouts.

The first complete exhibit is the Ferrari 250 GTO. Build one excellent, evidence-backed exhibit before scaling the collection. Do not introduce microservices, a native mobile app, an AI curator, or complex 3D into the MVP. Later possibilities are listed in the roadmap; they are not MVP commitments.

## Technology

- Next.js 15, React 19, and TypeScript.
- Tailwind CSS 4.
- Supabase/PostgreSQL for the planned content platform; public pages currently read from TypeScript data in `lib/vehicles.ts`.
- GitHub Actions for application and database checks.
- Vercel is the intended Next.js host. Porkbun remains the DNS registrar for the planned custom hostname.

## Start locally

Use Node.js 22.18+ or Node.js 24. From a clean checkout:

```bash
git clone https://github.com/rigilg/haziel-motor-museum.git
cd haziel-motor-museum
git switch develop
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The public prototype does not require Supabase credentials. `.env.example` contains placeholders; never commit `.env.local`, service-role keys, database passwords, or other secrets.

Available checks and production preview:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm start` serves the most recent production build. Run it after `npm run build`.

## Current routes

| Route | Purpose |
| --- | --- |
| `/` | Museum homepage |
| `/collection` | Published vehicle catalogue, search, and filters |
| `/vehicles/ferrari-250-gto` | Six-chapter Ferrari 250 GTO exhibit |
| `/timeline` | Global automotive timeline and filters |
| `/tours/ferrari-250-gto` | Curated guided tour |
| `/robots.txt` | Crawler policy |
| `/sitemap.xml` | Public route sitemap |

An unknown route renders the custom museum 404. Read [Ferrari exhibit notes](docs/ferrari-exhibit.md), [collection behavior](docs/collection.md), and image [credits](public/images/ferrari-250-gto/CREDITS.md) before changing these pages.

## Contribution and release workflow

Keep `main` deployable and make project changes through `develop` and a pull request:

1. Start from the latest `develop` and create a focused branch, for example `feat/vehicle-exhibits`.
2. Make a small, reviewable change. Preserve the existing source/provenance requirements and update the relevant docs when behavior or operations change.
3. Run lint, typecheck, tests, and production build locally. For database changes, also follow the disposable-database checks in [docs/database.md](docs/database.md).
4. Open a pull request into `develop` (or follow the active PR's branch when extending that PR). Review the preview, accessibility, responsive behavior, and CI results.
5. Merge approved work into `develop`. When a release is ready, open a PR from `develop` to `main`; merge only after owner review and green checks.
6. The Vercel production branch must be `main`. A merge to `main` triggers production deployment once Vercel is connected.

Do not force-push or replace a branch ref to work around divergence. Fetch and inspect both histories, then rebase/merge or create a new descendant commit that preserves the current branch contents.

## First public prototype deployment

The code is prepared for deployment, but deployment requires account-owner setup. Follow the complete [deployment runbook](docs/deployment.md); these are the essential steps:

1. Import `rigilg/haziel-motor-museum` into a Vercel project. Set production branch to `main`, project root to the repository root, and keep the detected Next.js build settings (`npm run build`). Enable preview deployments for PRs and `develop`.
2. Set `NEXT_PUBLIC_SITE_URL=https://hazielmotormuseum.rigilgilbert.com` in the Vercel production environment. No Supabase variables are needed for this static prototype.
3. Add `hazielmotormuseum.rigilgilbert.com` in Vercel **Settings → Domains**. Copy the exact DNS target Vercel provides for this project.
4. In Porkbun, open **Domain Management → DNS** for `rigilgilbert.com`; add a CNAME with host `hazielmotormuseum` and the exact Vercel target as its value. Leave unrelated DNS records and nameservers alone.
5. Wait for Vercel to verify the record and provision HTTPS. Check the homepage, collection/search, Ferrari exhibit, timeline, tour, `/robots.txt`, `/sitemap.xml`, icon, social preview, and an unknown URL. Check desktop and mobile widths and browser console/network errors.
6. Record the Vercel project, production URL, DNS target, deployment date, and smoke-check result in the project issue/release notes. Do not put credentials or tokens in the README.

The app may use the Vercel preview URL before the custom DNS is ready. Configure `NEXT_PUBLIC_SITE_URL` with the intended canonical origin for production metadata. A working preview is not proof that the custom domain or production DNS is ready.

## Roadmap and completion criteria

Work through these stages in order. A stage is complete when its acceptance points pass; keep future stages out of the current release unless the product owner changes scope.

### Stage 0 — Starter and engineering foundation — complete

- Next.js/TypeScript/Tailwind structure, shared vehicle model, project documentation, initial schema, image provenance guidance, and CI.
- Stable `develop → PR → main` branch workflow.

### Stage 1 — First editorial vertical slice — complete

- Ferrari 250 GTO exhibit establishes the content and visual pattern: six chapters, sourced claims, verified photo credits, accessible image dialog, responsive layout, and metadata.
- Validate the exhibit as a museum narrative, not a specification dump.

### Stage 2 — Editorial prototype — implemented; public deployment pending

- Homepage, published collection with search/filter, six-event global timeline with filters, one curated tour, SEO routes, branding, and 404.
- Deploy to Vercel and the custom hostname, then complete the public smoke/accessibility checks above.
- Scope is still one published vehicle. The other teaser cards are not finished exhibits.

### Stage 3 — Curated 20-car collection — planned

- Select 19 additional vehicles with a curator using historical significance, geographical and technical variety, design influence, cultural consequence, and source availability.
- Write a complete exhibit for each: concise introduction, why it matters, chronology, design/engineering, use and competition, legacy, specifications with units, claims with citations, and reviewed media.
- Link related vehicles and timeline events. Provide useful collection categories without turning the homepage into a raw inventory.
- Publish only after editorial, image-rights, provenance, mobile, and accessibility review. Keep drafts out of public routes, search, sitemap, and anonymous database reads.

Possible candidates for the 20-car scope (a working shortlist, not a final curatorial decision): Benz Patent-Motorwagen; Ford Model T; Rolls-Royce Silver Ghost; Bugatti Type 35; Volkswagen Beetle; Willys MB; Citroën Traction Avant; Mercedes-Benz 300 SL; Jaguar E-Type; Mini; Ford GT40; Ferrari 250 GTO; Lotus 49; Lamborghini Miura; Porsche 911; Honda NSX; McLaren F1; Mazda MX-5; Toyota Prius; Tesla Model S. Confirm dates, significance, availability, and regional balance before commissioning content; replace candidates when research supports a better collection.

### Stage 4 — Supabase content platform and private CMS — planned

- Provision separate development/staging and production Supabase projects; document owners, backups, access, and secret rotation. Do not point migration test scripts at hosted databases.
- Apply ordered migrations to a staging copy first. Preserve migration history and back up before production changes. Review [database operations and access model](docs/database.md).
- Define a secure server-side access path. Never expose `SUPABASE_SERVICE_ROLE_KEY` to browser code. Enforce least privilege, RLS, and explicit publish-state filtering.
- Build private authentication and editor roles, draft/review/publish workflow, revision/audit history, vehicle/story/spec/timeline/tour editing, and media/provenance management.
- Seed migrated editorial data only after content review; compare public output against the static prototype. Keep unverified media and unpublished drafts private.
- Acceptance: editors can create/edit/review/publish and unpublish; anonymous visitors can read only published, rights-verified records; unauthorized access tests fail closed; backups and restore procedure are verified.

### Stage 5 — MVP launch and ongoing operations — planned after Stages 3–4

- Launch all agreed MVP areas: curated 20-car collection, vehicle exhibits, search/filtering, global timeline, tours, CMS, provenance, accessibility, and responsive experience.
- Add production monitoring/error reporting, uptime checks, backup/restore drills, dependency/security update routine, and editorial update process.
- Measure page performance, broken source/media links, search quality, and visitor use. Fix real issues before adding infrastructure.
- Acceptance: production deployment and domain/HTTPS are verified; no draft leakage; rights/provenance are complete; representative devices/browsers pass; editors can operate without code changes for routine content updates.

### Stage 6 — Rich media — future

- Add audio narration and optional 360°/3D views only for selected exhibits with a clear educational purpose, rights, optimized assets, captions/transcripts, and accessible non-3D alternatives.
- Use progressive enhancement (for example, glTF/GLB with a lightweight viewer); defer loading and preserve a fast text/image experience. Avoid complex 3D infrastructure until user value is demonstrated.

### Stage 7 — AI research assistant — future, after trusted content exists

- Build retrieval over approved exhibit content and cited sources, with source links shown for every answer and clear handling of gaps/uncertainty.
- Keep private drafts, personal data, and unapproved sources out of retrieval. Add evaluations for factuality, citation quality, refusal on missing evidence, and regressions before public release.
- This is an optional later product, not part of the MVP. Do not replace curatorial judgment with generated content.

### Stage 8 — Native mobile and AR/XR — future

- Consider React Native/Expo only after the responsive website and usage data establish a distinct mobile need. Share typed content models where appropriate; do not duplicate the CMS.
- Explore AR/XR only for a well-defined educational use case, a supported content pipeline, rights-cleared assets, accessibility alternatives, and a funded maintenance plan.

### Complete product state

The long-term product is a reliable, editorially maintained digital museum: a researched and balanced 20-car launch collection (expanded only through curation), connected vehicle and global timelines, thoughtful tours, a secure private CMS, and complete source/media provenance. It is responsive, accessible, fast, operable by editors, and deployed on the owned hostname with secure data access, backups, and monitoring. Optional rich media, AI, native apps, and AR/XR are considered only when their content, rights, visitor value, and maintenance are ready.

## Content, citations, and image rights

Every factual exhibit claim should point to a trustworthy source. Distinguish the history of a model from the ownership/provenance of any specific photographed vehicle. For every used media asset, track the source and original URL, creator, license and license URL, attribution, modifications, verification state/date, and local/storage path. Follow [docs/licensing.md](docs/licensing.md) and the existing Ferrari [photo credits](public/images/ferrari-250-gto/CREDITS.md). A license record is a review trail, not a guarantee that all rights have been cleared.

## Database safety

The app currently renders public content from checked-in TypeScript. Migrations are not automatically applied by `npm run build` or a web deployment. For migration contracts, access policy, disposable PostgreSQL 17 test scenarios, staging, backup, and rollback expectations, read [docs/database.md](docs/database.md). Never run bootstrap/fixture scripts against a hosted project, and never expose service-role credentials to the client.

## Project documents

- [Product requirements](docs/PRD.md) — product vision and MVP scope.
- [Architecture](docs/architecture.md) — system choices and deliberate limits.
- [Deployment runbook](docs/deployment.md) — Vercel and Porkbun steps.
- [Database guide](docs/database.md) — schema, security, validation, and migration operations.
- [Collection behavior](docs/collection.md) — published registry and search semantics.
- [Ferrari exhibit notes](docs/ferrari-exhibit.md) — vertical-slice structure and sources.
- [Licensing and provenance](docs/licensing.md) — media-rights process.

## Picking up work at any stage

1. Read this status section and check open PRs/issues before changing scope. Confirm the current `develop` and `main` heads; the table above can lag implementation if a PR is still open.
2. Read the document for the feature you are touching, inspect its implementation and tests, then choose the next incomplete roadmap acceptance point.
3. Make the smallest coherent change on a branch from current `develop`; update this README and the relevant detailed document when status, commands, data policy, or release steps change.
4. Run the checks for the changed area and the full app checks before requesting review. Include manual browser steps for visual, responsive, keyboard, and route behavior.
5. Keep secrets out of Git, keep migrations additive and ordered, preserve published-only access, and require evidence for exhibit claims and image rights.
6. Merge to `main` only after review and green checks. Update the status table and roadmap when work is actually merged/provisioned—not when it is merely planned.
