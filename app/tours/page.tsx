import type { Metadata } from "next";
import Link from "next/link";
import { ferrariTour } from "@/lib/tours";
export const metadata: Metadata = { title: "Curated tours | Haziel Motor Museum", description: "Self-guided visits through the stories and ideas behind the museum’s exhibits." };
export default function ToursPage() {
  return <main className="mx-auto max-w-5xl px-6 pb-24">
    <header className="museum-sans flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] py-6"><Link href="/" className="text-sm font-bold tracking-[0.18em]">HAZIEL MOTOR MUSEUM</Link><nav aria-label="Main navigation" className="flex gap-6 text-sm"><Link href="/collection">Collection</Link><Link href="/timeline">Timeline</Link></nav></header>
    <section className="max-w-3xl py-16 md:py-24"><p className="museum-sans text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">Curated visits</p><h1 className="display mt-4 text-5xl md:text-7xl">Follow a thread.</h1><p className="mt-6 text-xl leading-relaxed text-[var(--muted)]">Short, self-guided routes through the stories in our collection. Each stop opens at the relevant chapter, so you can explore at your own pace.</p></section>
    <article className="border-t border-[var(--line)] py-10"><div className="museum-sans flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]"><span>4 stops</span><span>{ferrariTour.duration}</span><span>Design · engineering · competition</span></div><h2 className="display mt-4 text-4xl md:text-5xl">{ferrariTour.title}</h2><p className="museum-sans mt-2 text-lg">{ferrariTour.subtitle}</p><p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">{ferrariTour.introduction}</p>
      <ol className="mt-10 border-l border-[var(--line)]">{ferrariTour.stops.map((stop, i)=><li key={stop.href} className="relative grid gap-3 pb-8 pl-7 md:grid-cols-[5rem_1fr] md:gap-6"><span aria-hidden="true" className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)]"/><span className="museum-sans text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Stop 0{i+1}</span><div><h3 className="display text-2xl">{stop.title}</h3><p className="mt-2 leading-relaxed text-[var(--muted)]">{stop.description}</p><p className="museum-sans mt-3 text-xs">{stop.duration}</p></div></li>)}</ol><Link href={ferrariTour.stops[0].href} className="museum-sans mt-2 inline-block bg-[var(--ink)] px-6 py-3 text-sm font-bold text-white">Begin the tour ↗</Link>
    </article>
    <p className="museum-sans border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">This first visit follows the published Ferrari 250 GTO exhibit. More tours will be added as the collection grows.</p>
  </main>;
}
