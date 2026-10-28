# Collection browsing

`/collection` shows only entries in `publishedVehicles` in `lib/vehicles.ts`.
The Ferrari 250 GTO is currently the sole published exhibit. Homepage previews
for future exhibits remain explicitly marked as in preparation.

Search uses a native GET form: `?q=1962&country=Italy`. URLs can be shared,
reloaded and navigated with browser history, and submission works without
JavaScript. All whitespace-separated words must match across the exhibit name,
manufacturer, year, country, category, introduction or significance. Matching
ignores case and diacritics. Country is an exact filter; unknown countries
produce no results. Repeated query parameters are ignored.

To add an exhibit, complete its vehicle record, source and media review, then
add it to the published registry. Collection cards and available country filters
use that registry. This remains a static editorial catalogue; it does not query
Supabase or expose unpublished CMS records.

Checks: `npm test`, `npm run lint`, `npm run build`, `npm run typecheck`.
Browser review should cover search submission, clearing filters, empty results,
back navigation, exhibit/credit links, and desktop/mobile overflow.
