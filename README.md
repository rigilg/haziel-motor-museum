# Haziel Motor Museum

A digital museum dedicated to the history, engineering, design, culture, and legacy of the automobile.

> The history of the automobile, preserved digitally.

## v0.1

Initial runnable web foundation with a museum-style homepage, reusable vehicle exhibit structure, Ferrari 250 GTO starter exhibit, timeline, gallery placeholder, and Supabase migration.

## Stack

- Next.js + TypeScript
- Tailwind CSS
- Supabase / PostgreSQL
- Vercel deployment path

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## v0.2 — First museum exhibit

Visit `/vehicles/ferrari-250-gto` for a six-chapter exhibit with original curatorial
interpretation, referenced historical facts, three locally hosted Creative Commons
photographs, an accessible image dialog, responsive layouts and page metadata.
The homepage links to this exhibit; other exhibit cards remain in preparation.

Use Node.js 22.18+ (or Node.js 24) and `npm ci`. The public exhibit runs without
Supabase credentials. Set `NEXT_PUBLIC_SITE_URL` to the canonical site origin in
production; it controls canonical and Open Graph URLs.

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

Workflow: work on `develop`, open a PR into `main`, review checks, then merge.
No database migration or deployment is performed by the public exhibit build.

See [exhibit implementation notes](docs/ferrari-exhibit.md) and
[photo credits](public/images/ferrari-250-gto/CREDITS.md).

See [database migration validation](docs/database.md) for the additive hardening
migration, access model, disposable database checks, and staging procedure.
