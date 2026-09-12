# Ferrari 250 GTO exhibit

The v0.1 ZIP is the foundation of this change. Its PRD, architecture and initial
Supabase migration are retained. Public content currently lives in
`lib/vehicles.ts`; there is no database dependency or simulated CMS connection.

## Editorial structure

Origins, design, engineering, timeline, gallery, sources. Interpretation and
visual observations are labelled separately from sourced claims. Footnotes link
to named sources and explain their scope. The FIA's 1960 family homologation
record is deliberately not treated as a GTO introduction date. Racing claims for
chassis 3413 are not transferred to the photographed examples.

Source selection: FIA family record, RM Sotheby's catalogue for chassis 3413,
and an explicitly identified secondary reference for model facts and Sebring.
Ferrari's own model page was blocked during research and is not misrepresented
as a reviewed source. A manufacturer/archive cross-check of the secondary-only
facts remains an editorial improvement before broad publication. No auction-price
claims, speculative chassis ownership chain, or replica authentication claims
are included.

## Implementation

Server-rendered, statically generated exhibit. Unknown slugs use `notFound()`.
The gallery is the only exhibit client component. Native dialog supplies modality,
keyboard focus containment and Escape handling; the trigger regains focus on
close. Previous/next buttons and arrow keys change the photograph. Reduced-motion
preferences disable smooth scrolling and image transitions. Image dimensions are
explicit, the hero is prioritised, and Next Image optimises local originals.

Every media record includes creator, source and original URLs, selected license,
license link, modification note, review date and context. `source-reviewed` means
the file page and its stated license were inspected, not independent legal or
chassis certification. Engine attribution preserves the Commons record's caveat.

## Validation and scope

Build, ESLint, TypeScript and provenance/slug tests are provided. Browser QA checks
desktop/mobile overflow, local anchor targets, gallery keyboard and button controls,
focus restoration, homepage entry and a genuine HTTP 404 for an unknown slug.

The initial collection, CMS/admin, search, global timeline and tours remain future
MVP slices. The existing homepage is a starter, not a completed catalogue. Supabase
has not been connected and its migration has not been applied. No production site
has been published. Review the draft PR before merging develop into main.

## Verified in this revision

- Production build, TypeScript, ESLint and three integrity tests pass.
- Headless Chromium at 1440×1000 and 390×844: no horizontal overflow; chapter
  anchors resolve; gallery buttons, arrow keys, Escape and trigger focus pass.
- Homepage exhibit link works; unknown slug responds with HTTP 404.
- No client runtime errors were observed during those checks.
- Next Image served the optimised 1920px hero successfully (approximately 276 KB).
- Desktop and mobile screenshots were visually reviewed:
  [desktop](previews/ferrari-desktop.png), [mobile](previews/ferrari-mobile.png).

This is browser smoke coverage, not a full assistive-technology or cross-browser
audit. Safari/iOS and an independent editorial review remain prelaunch checks.
