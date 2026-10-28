import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-20">
      <p className="museum-sans text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">Exhibit not found · 404</p>
      <h1 className="display mt-5 text-5xl md:text-7xl">This gallery is still being assembled.</h1>
      <p className="mt-6 max-w-xl text-xl leading-relaxed text-[var(--muted)]">That exhibit isn’t on view. Return to the collection to explore the stories currently open to visitors.</p>
      <Link href="/collection" className="museum-sans mt-8 inline-block self-start bg-[var(--ink)] px-6 py-3 text-sm font-bold text-white">Visit the collection ↗</Link>
    </main>
  );
}
