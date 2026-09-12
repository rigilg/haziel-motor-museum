import Link from "next/link";
import Image from "next/image";
import { ferrari250GTO } from "@/lib/vehicles";

const exhibits = [
  {
    year: "1962",
    name: "Ferrari 250 GTO",
    slug: "ferrari-250-gto",
    label: "Racing / Design",
  },
  {
    year: "1954",
    name: "Mercedes-Benz 300 SL",
    slug: "#",
    label: "Engineering / Design",
  },
  {
    year: "1966",
    name: "Lamborghini Miura",
    slug: "#",
    label: "Supercars / Architecture",
  },
];

export default function Home() {
  return (
    <main>
      <header className="museum-sans mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-bold tracking-[0.18em]">
          HAZIEL MOTOR MUSEUM
        </Link>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#collection">Collection</a>
          <a href="#timeline">Timeline</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-16 md:grid-cols-[1.2fr_.8fr] md:pt-28">
        <div>
          <p className="museum-sans mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
            Digital Museum · 1886—Present
          </p>
          <h1 className="display max-w-4xl text-6xl leading-[.9] md:text-8xl">
            The automobile, preserved as history.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[var(--muted)]">
            Explore the machines, people, ideas and moments that changed the
            course of automotive history.
          </p>
          <div className="museum-sans mt-10 flex gap-4">
            <a
              href="#collection"
              className="bg-[var(--ink)] px-6 py-3 text-sm font-bold text-white"
            >
              Explore the collection
            </a>
            <a
              href="#timeline"
              className="border border-[var(--ink)] px-6 py-3 text-sm font-bold"
            >
              View timeline
            </a>
          </div>
        </div>
        <Link
          href="/vehicles/ferrari-250-gto"
          className="relative min-h-[420px] overflow-hidden bg-[#252723] text-white md:min-h-[560px]"
        >
          <Image
            src={ferrari250GTO.media[0].src}
            alt={ferrari250GTO.media[0].alt}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
            priority
          />
          <div className="relative flex h-full items-end bg-gradient-to-t from-black/90 via-transparent to-transparent p-8">
            <div className="museum-sans">
              <p className="text-xs font-bold uppercase tracking-widest">
                Featured exhibit
              </p>
              <p className="mt-2 text-2xl font-bold">Ferrari 250 GTO</p>
              <p className="mt-1 text-sm">1962 · Maranello, Italy</p>
              <p className="mt-3 text-xs">
                Photo: MrWalkr · CC BY-SA 4.0 · Cropped
                <br />
                Full credits in the exhibit
              </p>
            </div>
          </div>
        </Link>
      </section>

      <section id="collection" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="museum-sans text-xs font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
              The collection
            </p>
            <h2 className="display mt-2 text-5xl">Featured exhibits</h2>
          </div>
          <span className="museum-sans text-sm text-[var(--muted)]">01—03</span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {exhibits.map((car) => (
            <article key={car.name} className="group">
              {car.slug !== "#" ? (
                <Image
                  src={ferrari250GTO.media[0].src}
                  alt={ferrari250GTO.media[0].alt}
                  width={ferrari250GTO.media[0].width}
                  height={ferrari250GTO.media[0].height}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="image-placeholder flex aspect-[4/3] items-center justify-center museum-sans text-sm">
                  Exhibit in preparation
                </div>
              )}
              <div className="museum-sans mt-4 flex justify-between gap-4 text-sm">
                <div>
                  <p className="font-bold">
                    {car.slug !== "#" ? (
                      <Link
                        href={`/vehicles/${car.slug}`}
                        className="underline underline-offset-4"
                      >
                        {car.name} ↗
                      </Link>
                    ) : (
                      car.name
                    )}
                  </p>
                  <p className="mt-1 text-[var(--muted)]">{car.label}</p>
                  {car.slug !== "#" && (
                    <p className="mt-2 text-xs">
                      <Link
                        href="/vehicles/ferrari-250-gto#credit-hero"
                        className="underline"
                      >
                        MrWalkr · CC BY-SA 4.0 · Cropped
                      </Link>
                    </p>
                  )}
                </div>
                <span>{car.year}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="timeline"
        className="border-y border-[var(--line)] bg-[#ebe7dc]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="museum-sans text-xs font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
            A living timeline
          </p>
          <h2 className="display mt-2 max-w-3xl text-5xl">
            From horseless carriage to electric revolution.
          </h2>
          <div className="mt-14 grid gap-0 md:grid-cols-4">
            {[
              ["1886", "Birth", "Benz Patent-Motorwagen"],
              ["1908", "Mass production", "Ford Model T"],
              ["1960s", "Performance", "GT cars, supercars and muscle"],
              ["2008", "Electrification", "Tesla Roadster"],
            ].map(([year, title, car]) => (
              <div
                key={year}
                className="border-t border-[var(--line)] p-5 pl-0 md:border-l md:border-t-0 md:pl-6"
              >
                <p className="museum-sans text-sm font-bold">{year}</p>
                <p className="mt-6 text-2xl">{title}</p>
                <p className="mt-2 text-[var(--muted)]">{car}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="museum-sans text-xs font-bold uppercase tracking-[0.25em] text-[var(--muted)]">
            About the museum
          </p>
          <h2 className="display mt-3 text-5xl">
            Not a database. An archive of significance.
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-[var(--muted)]">
            Haziel Motor Museum focuses on why a vehicle mattered: the
            engineering decisions, designers, races, cultural moments and
            technological changes that gave it a place in history.
          </p>
        </div>
      </section>

      <footer className="museum-sans border-t border-[var(--line)] px-6 py-8 text-center text-xs text-[var(--muted)]">
        HAZIEL MOTOR MUSEUM · THE HISTORY OF THE AUTOMOBILE, PRESERVED
        DIGITALLY.
      </footer>
    </main>
  );
}
