import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ferrari250GTO, getVehicle } from "@/lib/vehicles";
import { Gallery } from "@/components/exhibit/gallery";
import "./exhibit.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return [{ slug: ferrari250GTO.slug }];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = getVehicle((await params).slug);
  if (!car)
    return {
      title: "Exhibit not found | Haziel Motor Museum",
      robots: { index: false },
    };
  return {
    title: `${car.name} — Form follows competition | Haziel Motor Museum`,
    description: car.introduction,
    alternates: { canonical: `/vehicles/${car.slug}` },
    openGraph: {
      type: "article",
      title: `${car.name} | Haziel Motor Museum`,
      description: car.introduction,
      images: [
        {
          url: car.media[0].src,
          width: car.media[0].width,
          height: car.media[0].height,
          alt: car.media[0].alt,
        },
      ],
    },
  };
}
function Refs({ ids }: { ids: string[] }) {
  return (
    <span className="source-refs">
      {ids.map((id) => (
        <a
          key={id}
          href={`#source-${id}`}
          aria-label={`Source: ${ferrari250GTO.sources.find((s) => s.id === id)?.publisher}`}
        >
          [{ferrari250GTO.sources.findIndex((s) => s.id === id) + 1}]
        </a>
      ))}
    </span>
  );
}
export default async function VehiclePage({ params }: Props) {
  const car = getVehicle((await params).slug);
  if (!car) notFound();
  const hero = car.media[0];
  return (
    <div className="exhibit" id="top">
      <a className="skip-link" href="#exhibit-main">
        Skip to exhibit
      </a>
      <header className="exhibit-header">
        <Link href="/" className="museum-wordmark">
          <span className="wordmark-symbol" aria-hidden="true">
            H
          </span>
          <span>
            HAZIEL<span>MOTOR MUSEUM</span>
          </span>
        </Link>
        <Link href="/#collection">← The collection</Link>
      </header>
      <main id="exhibit-main">
        <section className="exhibit-intro wrap">
          <div className="exhibit-eyebrow">
            <span>Exhibit 001 / Competition & design</span>
            <span>Italy · 1962–1964</span>
          </div>
          <div className="exhibit-title">
            <h1>
              <span>Ferrari</span>250 GTO<span className="title-dot">.</span>
            </h1>
            <div>
              <p className="kicker">Form follows competition</p>
              <p>{car.introduction}</p>
              <a className="text-link" href="#story">
                Enter the story <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </section>
        <figure className="hero-figure wrap">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
          <figcaption>
            <span>01 / {hero.title}</span>
            <a href="#credit-hero">
              Photograph: {hero.creator} · {hero.license} ↗
            </a>
          </figcaption>
        </figure>
        <nav className="chapter-nav" aria-label="Exhibit chapters">
          <div className="wrap">
            {[
              ["story", "The story"],
              ["design", "Design"],
              ["engineering", "Engineering"],
              ["timeline", "In time"],
              ["gallery", "Gallery"],
              ["sources", "Sources"],
            ].map(([id, label], i) => (
              <a key={id} href={`#${id}`}>
                <span>0{i + 1}</span> {label}
              </a>
            ))}
          </div>
        </nav>
        <section id="story" className="chapter wrap story-grid">
          <div>
            <p className="kicker">01 / The story</p>
            <h2>
              Built to race.
              <br />
              <em>Remembered as art.</em>
            </h2>
          </div>
          <div className="reading">
            <p className="lead">{car.significance}</p>
            <p className="curator-label">Curatorial interpretation</p>
            <p>
              Ferrari developed the GTO for the new GT manufacturers’
              championship in 1962. Giotto Bizzarrini’s work addressed the
              limitations of the preceding 250 GT SWB: aerodynamic lift, frontal
              area and space for wider tyres. <Refs ids={["catalogue"]} />
            </p>
            <p>
              The letters stand for <em>Gran Turismo Omologato</em>—a grand
              tourer homologated for competition. Its name places regulations
              beside performance at the centre of the story.{" "}
              <Refs ids={["reference"]} />
            </p>
            <aside className="looking-note">
              <span className="kicker">
                A question to carry through the exhibit
              </span>
              <p>
                When a machine becomes an icon, can we still see the problem it
                was built to solve?
              </p>
            </aside>
          </div>
        </section>
        <section id="design" className="chapter design-section">
          <div className="wrap">
            <p className="kicker">02 / Design</p>
            <h2>Read the shape.</h2>
            <p className="section-deck">
              Follow the body from nose to tail. Each change in profile is an
              invitation to look more closely.
            </p>
            <div className="design-grid">
              {[
                [
                  "01",
                  "A lower nose",
                  "A revised chassis let Ferrari mount the engine lower. Wind-tunnel work helped shape the extended nose.",
                  true,
                ],
                [
                  "02",
                  "A compact cabin",
                  "Notice the contrast between the long bonnet and the small glasshouse. The proportions make the location of the engine immediately legible.",
                  false,
                ],
                [
                  "03",
                  "A defined trailing edge",
                  "Early rear spoilers were separate pieces; later coachwork integrated the spoiler into the body.",
                  true,
                ],
              ].map(([n, title, body, sourced]) => (
                <article key={String(n)}>
                  <span className="design-number">{n}</span>
                  <h3>{title}</h3>
                  <p>
                    {body}
                    {sourced && <Refs ids={["catalogue"]} />}
                  </p>
                  {!sourced && <small>Visual observation</small>}
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="engineering" className="chapter wrap">
          <p className="kicker">03 / Engineering</p>
          <h2>Under the aluminium.</h2>
          <div className="engineering-grid">
            <div>
              <figure>
                <Image
                  src={car.media[1].src}
                  alt={car.media[1].alt}
                  width={car.media[1].width}
                  height={car.media[1].height}
                  sizes="(max-width: 800px) 100vw, 55vw"
                />
                <figcaption>
                  Engine study ·{" "}
                  <a href="#credit-engine">Photograph and license ↗</a>
                </figcaption>
              </figure>
              <p className="engineering-copy">
                Six carburettors feed the V12, while a five-speed gearbox gives
                the driver another way to make use of its performance. These
                details belong in the same story as the bodywork.{" "}
                <Refs ids={["catalogue"]} />
              </p>
            </div>
            <div className="spec-panel">
              <p className="kicker">The mechanical portrait</p>
              <dl>
                {car.specs.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>
                      {s.value}
                      <Refs ids={s.sourceIds} />
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="spec-note">
                Model-level reference. Individual cars changed through racing,
                repairs and restoration; these are not specifications certified
                for every chassis.
              </p>
            </div>
          </div>
        </section>
        <section id="timeline" className="chapter timeline-section">
          <div className="wrap story-grid">
            <div>
              <p className="kicker">04 / In time</p>
              <h2>
                A short production life.
                <br />
                <em>A lasting presence.</em>
              </h2>
              <p className="section-deck">
                Four moments connecting the 250 GT family, the GTO’s debut and
                its continuing development.
              </p>
            </div>
            <ol className="exhibit-timeline">
              {car.timeline.map((event) => (
                <li key={event.year}>
                  <span className="timeline-year">{event.year}</span>
                  <h3>{event.title}</h3>
                  <p>
                    {event.description} <Refs ids={event.sourceIds} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section id="gallery" className="chapter wrap">
          <div className="section-heading">
            <div>
              <p className="kicker">05 / Gallery</p>
              <h2>Pause. Look closer.</h2>
            </div>
            <p>
              Three photographs, different examples.
              <br />
              Select an image to explore.
            </p>
          </div>
          <Gallery media={car.media} />
        </section>
        <section id="sources" className="chapter sources-section">
          <div className="wrap">
            <p className="kicker">06 / Sources & provenance</p>
            <h2>History you can trace.</h2>
            <p className="section-deck">
              This is a model exhibit. It does not claim ownership,
              authentication or an unbroken history of an individual car.
              Photographic context, historical evidence and curatorial
              interpretation are identified separately.
            </p>
            <div className="sources-grid">
              <div>
                <h3>Historical references</h3>
                <ol className="source-list">
                  {car.sources.map((s, i) => (
                    <li id={`source-${s.id}`} key={s.id}>
                      <span className="kicker">
                        [{i + 1}] {s.publisher} · {s.kind}
                      </span>
                      <a href={s.url}>{s.title} ↗</a>
                      <p>{s.note}</p>
                      <small>Consulted {s.accessed}</small>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3>Photography credits</h3>
                {car.media.map((asset) => (
                  <details
                    className="credit"
                    id={`credit-${asset.id}`}
                    key={asset.id}
                  >
                    <summary>
                      {asset.title}
                      <span>
                        {asset.creator} · {asset.license}
                      </span>
                    </summary>
                    <p>{asset.caption}</p>
                    <p>
                      <a href={asset.sourceUrl}>Original source record ↗</a> ·{" "}
                      <a href={asset.originalUrl}>Original photograph ↗</a>
                    </p>
                    <p>
                      License: <a href={asset.licenseUrl}>{asset.license}</a>.{" "}
                      {asset.modifications} Any adapted photographic
                      presentation is shared under the same license.
                    </p>
                    <p>
                      Source and license reviewed {asset.verifiedAt}.
                      Attribution does not imply endorsement.
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="exhibit-end wrap">
          <p className="kicker">End of exhibit / 001</p>
          <h2>
            Every car has a story.
            <br />
            <em>Keep looking.</em>
          </h2>
          <Link className="museum-button" href="/#collection">
            Return to the collection <span aria-hidden="true">↗</span>
          </Link>
          <a href="#top" className="text-link">
            Back to top ↑
          </a>
        </section>
      </main>
      <footer className="exhibit-footer wrap">
        <span>HAZIEL MOTOR MUSEUM</span>
        <p>An independent museum project. Not affiliated with Ferrari S.p.A.</p>
      </footer>
    </div>
  );
}
