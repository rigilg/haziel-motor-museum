# Architecture

Next.js + TypeScript provides the web museum. Supabase/PostgreSQL stores structured museum content and provenance. Object storage holds approved media.

Start with PostgreSQL search and structured filters. Add a dedicated search engine only when justified.

3D is progressive enhancement using glTF/GLB with model-viewer or Three.js.

AI is a later retrieval-grounded layer over approved museum content and sources.

Avoid premature microservices and complex infrastructure.
