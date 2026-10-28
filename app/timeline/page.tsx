import type { Metadata } from "next";
import Link from "next/link";
import { timelineEvents, searchTimeline } from "@/lib/timeline";

export const metadata: Metadata = {
  title: "Automotive timeline | Haziel Motor Museum",
  description: "A curated timeline of the ideas, engineering and events that changed automotive history, with source notes for every milestone.",
};

export default async function TimelinePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const era = typeof params.era === "string" ? params.era : "";
  const eras = [...new Set(timelineEvents.map((event) => event.era))].sort();
  const events = searchTimeline(query, era);
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24">
      <header className="museum-sans flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] py-6">
        <Link href="/" className="text-sm font-bold tracking-[0.18em]">HAZIEL MOTOR MUSEUM</Link>
        <nav aria-label="Main navigation" className="flex gap-6 text-sm"><Link href="/collection" className="underline underline-offset-4">Collection</Link><Link href="/">Museum home</Link></nav>
      </header>
      <section className="max-w-3xl py-16 md:py-24">
        <p className="museum-sans text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">A living timeline · 1886—Present</p>
        <h1 className="display mt-4 text-5xl md:text-7xl">Ideas that moved the world.</h1>
        <p className="mt-6 text-xl leading-relaxed text-[var(--muted)]">Automotive history is shaped by more than machines. Follow changing ideas about mobility, manufacturing, packaging, competition and energy.</p>
      </section>
      <form action="/timeline" method="get" role="search" aria-label="Search automotive timeline" className="museum-sans mb-10 grid gap-4 border-y border-[var(--line)] py-6 md:grid-cols-[1fr_14rem_auto] md:items-end">
        <div><label htmlFor="timeline-query" className="mb-2 block text-sm font-bold">Search milestones</label><input id="timeline-query" name="q" type="search" defaultValue={query} placeholder="Year, vehicle, idea or story" className="min-h-12 w-full border border-[var(--muted)] bg-transparent px-3" /></div>
        <div><label htmlFor="timeline-era" className="mb-2 block text-sm font-bold">Era</label><select id="timeline-era" name="era" defaultValue={era} className="min-h-12 w-full border border-[var(--muted)] bg-[var(--paper)] px-3"><option value="">All eras</option>{era && !eras.includes(era) && <option value={era}>{era} (unavailable)</option>}{eras.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
        <button type="submit" className="min-h-12 bg-[var(--ink)] px-8 font-bold text-white">Search</button>
      </form>
      <div className="museum-sans mb-6 flex flex-wrap items-center justify-between gap-3 text-sm" aria-live="polite"><p>{events.length} {events.length === 1 ? "milestone" : "milestones"}{query.trim() ? ` matching “${query.trim()}”` : " in the timeline"}</p>{(query || era) && <Link href="/timeline" className="underline underline-offset-4">Clear search and filters</Link>}</div>
      {events.length === 0 ? <div className="border border-[var(--line)] px-6 py-12"><h2 className="display text-3xl">No milestones found.</h2><p className="mt-3 text-[var(--muted)]">Try another year, vehicle or idea, or clear the filters to see the full timeline.</p></div> : <ol className="border-l border-[var(--line)]">
        {events.map((event) => (
          <li key={event.year} className="relative grid gap-4 pb-14 pl-7 md:grid-cols-[8rem_1fr] md:gap-8 md:pl-10">
            <span aria-hidden="true" className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
            <div className="museum-sans"><p className="text-2xl font-bold">{event.year}</p><p className="mt-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">{event.era}</p></div>
            <article>
              <h2 className="display text-3xl md:text-4xl">{event.title}</h2>
              <p className="mt-4 text-lg leading-relaxed">{event.story}</p>
              <p className="mt-4 border-l-2 border-[var(--accent)] pl-4 text-[var(--muted)]">{event.significance}</p>
              <div className="museum-sans mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {event.vehicle && (event.vehicle.slug ? <Link href={`/vehicles/${event.vehicle.slug}`} className="font-bold underline underline-offset-4">Explore {event.vehicle.name} ↗</Link> : <span className="font-bold">{event.vehicle.name}</span>)}
                <a href={event.source.url} target={event.source.url.startsWith("http") ? "_blank" : undefined} rel={event.source.url.startsWith("http") ? "noreferrer" : undefined} className="underline underline-offset-4">Source: {event.source.label} ↗</a>
              </div>
            </article>
          </li>
        ))}
      </ol>}
      <p className="museum-sans border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">This is a curated starting point, not a complete chronology. Each entry links to its source; the Ferrari entry connects to the full exhibit and its source notes.</p>
    </main>
  );
}
