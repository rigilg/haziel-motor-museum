import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { publishedVehicles } from "@/lib/vehicles";
import { searchCollection } from "@/lib/collection";

export const metadata: Metadata = {
  title: "The collection | Haziel Motor Museum",
  description: "Explore the museum’s published exhibits through stories of automotive design, engineering and competition.",
};

export default async function Collection({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const country = typeof params.country === "string" ? params.country : "";
  const countries = [...new Set(publishedVehicles.map((vehicle) => vehicle.country))].sort();
  const results = searchCollection(query, country);
  return (
    <main id="main-content" className="mx-auto max-w-7xl px-6 pb-20">
      <header className="museum-sans flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] py-6">
        <Link href="/" className="text-sm font-bold tracking-[0.18em]">HAZIEL MOTOR MUSEUM</Link>
        <Link href="/" className="text-sm underline underline-offset-4">← Museum home</Link>
      </header>
      <section className="max-w-3xl py-16 md:py-24" aria-labelledby="collection-title">
        <p className="museum-sans text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">The collection</p>
        <h1 id="collection-title" className="display mt-4 text-5xl md:text-7xl">Machines with a story.</h1>
        <p className="mt-6 text-xl leading-relaxed text-[var(--muted)]">Discover why these automobiles mattered, through the people, ideas and ambitions that shaped them.</p>
        <p className="museum-sans mt-5 text-sm leading-relaxed text-[var(--muted)]">Our collection begins with the Ferrari 250 GTO. Further exhibits will join as their stories, sources and photography are ready.</p>
      </section>
      <form action="/collection" method="get" className="museum-sans grid items-end gap-5 border-y border-[var(--line)] py-6 md:grid-cols-[1fr_14rem_auto]" role="search" aria-label="Search the collection">
        <div>
          <label htmlFor="collection-query" className="mb-2 block text-sm font-bold">Find an exhibit</label>
          <input id="collection-query" name="q" type="search" defaultValue={query} placeholder="Name, year, country or story" className="min-h-12 w-full border border-[var(--muted)] bg-transparent px-3" />
        </div>
        <div>
          <label htmlFor="collection-country" className="mb-2 block text-sm font-bold">Country</label>
          <select id="collection-country" name="country" defaultValue={country} className="min-h-12 w-full border border-[var(--muted)] bg-[var(--paper)] px-3">
            <option value="">All countries</option>
            {country && !countries.includes(country) && <option value={country}>{country} (unavailable)</option>}
            {countries.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <button type="submit" className="min-h-12 bg-[var(--ink)] px-8 font-bold text-white">Search</button>
      </form>
      <section aria-labelledby="results-title" className="pt-8">
        <div className="museum-sans mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 id="results-title" className="text-sm">{results.length} {results.length === 1 ? "exhibit" : "exhibits"}{query.trim() ? ` matching “${query.trim()}”` : " on view"}</h2>
          {(query || country) && <Link href="/collection" className="text-sm underline underline-offset-4">Clear search and filters</Link>}
        </div>
        {results.length === 0 ? (
          <div className="border border-[var(--line)] px-6 py-14">
            <h3 className="display text-3xl">No exhibits found.</h3>
            <p className="mt-4 text-[var(--muted)]">Try a different name or year, or clear the filters to explore every published exhibit.</p>
          </div>
        ) : <div className="grid gap-10 md:grid-cols-2">
          {results.map((vehicle) => {
            const photo = vehicle.media[0];
            return <article key={vehicle.slug}>
              <Link href={`/vehicles/${vehicle.slug}`} className="group block">
                <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 768px) 100vw, 50vw" className="aspect-[4/3] w-full object-cover" />
                <p className="museum-sans mt-5 text-xs uppercase tracking-widest text-[var(--muted)]">{vehicle.year} · {vehicle.country} · {vehicle.category}</p>
                <h3 className="display mt-3 text-4xl group-hover:underline">{vehicle.name} <span aria-hidden="true">↗</span></h3>
                <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">{vehicle.significance}</p>
              </Link>
              <p className="museum-sans mt-4 text-xs"><Link href={`/vehicles/${vehicle.slug}#credit-${photo.id}`} className="underline underline-offset-4">Photo: {photo.creator} · {photo.license} · Cropped. Full credits.</Link></p>
            </article>;
          })}
        </div>}
      </section>
    </main>
  );
}
