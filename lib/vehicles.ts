export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  kind: "archive" | "catalogue" | "reference";
  note: string;
  accessed: string;
};
export type MediaAsset = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  caption: string;
  creator: string;
  sourceUrl: string;
  originalUrl: string;
  license: string;
  licenseUrl: string;
  modifications: string;
  verifiedAt: string;
  verification: "source-reviewed";
};
export type Vehicle = {
  slug: string;
  name: string;
  manufacturer: string;
  year: number;
  country: string;
  category: string;
  introduction: string;
  significance: string;
  specs: { label: string; value: string; sourceIds: string[] }[];
  timeline: {
    year: string;
    title: string;
    description: string;
    sourceIds: string[];
  }[];
  sources: Source[];
  media: MediaAsset[];
};
const accessed = "2026-09-12";
export const ferrari250GTO: Vehicle = {
  slug: "ferrari-250-gto",
  name: "Ferrari 250 GTO",
  manufacturer: "Ferrari",
  year: 1962,
  country: "Italy",
  category: "Competition grand touring",
  introduction:
    "A shape formed by speed. A grand tourer sharpened for competition. Explore the ideas behind one of motor racing’s most recognisable silhouettes.",
  significance:
    "The 250 GTO invites us to look at beauty as an engineering outcome. Its proportions tell a story about air, mechanical packaging and the demands of competition.",
  specs: [
    { label: "Engine", value: "2,953 cc · 60° V12", sourceIds: ["reference"] },
    {
      label: "Layout",
      value: "Front engine · rear-wheel drive",
      sourceIds: ["reference"],
    },
    {
      label: "Induction",
      value: "Six Weber carburettors",
      sourceIds: ["catalogue"],
    },
    {
      label: "Transmission",
      value: "Five-speed manual",
      sourceIds: ["catalogue"],
    },
    { label: "Body", value: "Two-door berlinetta", sourceIds: ["reference"] },
    {
      label: "Production period",
      value: "1962–1964",
      sourceIds: ["reference"],
    },
  ],
  timeline: [
    {
      year: "1960",
      title: "The family foundation",
      description:
        "The FIA records the Berlinetta 250 GT under homologation number 22, dated 17 June 1960. This is the earlier family record, not a GTO debut date.",
      sourceIds: ["fia"],
    },
    {
      year: "1962",
      title: "A debut that set the tone",
      description:
        "At Sebring, Phil Hill and Olivier Gendebien drove the GTO to second overall on its racing debut.",
      sourceIds: ["reference"],
    },
    {
      year: "1963",
      title: "Success on Sicilian roads",
      description:
        "Chassis 3413 took a class victory and fourth overall at the Targa Florio with Gianni Bulgari and Maurizio Grana.",
      sourceIds: ["catalogue"],
    },
    {
      year: "1964",
      title: "The shape keeps evolving",
      description:
        "Revised bodywork appeared on the final three GTOs and was also fitted to four earlier cars. Appearance alone cannot establish a car’s build date.",
      sourceIds: ["catalogue"],
    },
  ],
  sources: [
    {
      id: "catalogue",
      title: "1962 Ferrari 250 GTO by Scaglietti · chassis 3413",
      publisher: "RM Sotheby’s",
      url: "https://rmsothebys.com/en/auctions/MO18/Monterey/lots/r0117-1962-ferrari-250-gto-by-scaglietti/695912",
      kind: "catalogue",
      note: "Auction catalogue: development, mechanical changes, 1964 bodywork and the racing record of 3413. A commercial source; chassis-specific claims stay attached to that car.",
      accessed,
    },
    {
      id: "fia",
      title: "Ferrari Berlinetta 250 GT · homologation 22",
      publisher: "FIA Historic Database",
      url: "https://historicdb.fia.com/car/ferrari-berlinetta-250-gt",
      kind: "archive",
      note: "Primary archive for the earlier 250 GT family. Its 1960 date is not presented as the GTO’s introduction.",
      accessed,
    },
    {
      id: "reference",
      title: "Ferrari 250 GTO",
      publisher: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Ferrari_250_GTO",
      kind: "reference",
      note: "Secondary cross-reference for the production period, configuration, name and Sebring debut. Historical facts are paraphrased; original interpretation is identified separately.",
      accessed,
    },
  ],
  media: [
    {
      id: "hero",
      src: "/images/ferrari-250-gto/hero.jpg",
      width: 5777,
      height: 3224,
      alt: "Red Ferrari 250 GTO with number 22, seen from the front left on a lawn at Salon Privé.",
      title: "A silhouette with a purpose",
      caption:
        "A 1962 250 GTO at Salon Privé, 30 August 2025. This is a contemporary event photograph, not a period racing image.",
      creator: "MrWalkr",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:1962_Ferrari_250_GTO_SP25.jpg",
      originalUrl:
        "https://upload.wikimedia.org/wikipedia/commons/3/31/1962_Ferrari_250_GTO_SP25.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      modifications:
        "Original file retained; responsive display may crop the frame.",
      verifiedAt: accessed,
      verification: "source-reviewed",
    },
    {
      id: "engine",
      src: "/images/ferrari-250-gto/engine.jpg",
      width: 2220,
      height: 1290,
      alt: "Ferrari V12 engine bay with six carburettors and their paired intake trumpets.",
      title: "Twelve cylinders, six carburettors",
      caption:
        "Engine photographed at the Museum of Fine Arts, Boston, in 2005, during the Ralph Lauren collection display. A different car from the lead photograph.",
      creator: "Sfoskett (credited on Commons; account Sfoskett~commonswiki)",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:1962_Ferrari_250_GTO_engine.jpg",
      originalUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/85/1962_Ferrari_250_GTO_engine.jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      modifications:
        "Original file retained; responsive display may crop the frame.",
      verifiedAt: accessed,
      verification: "source-reviewed",
    },
    {
      id: "interior",
      src: "/images/ferrari-250-gto/interior.jpg",
      width: 3072,
      height: 2048,
      alt: "Right-hand-drive cockpit of Ferrari 250 GTO chassis 3647GT, showing instruments, steering wheel and gear lever.",
      title: "The driver’s working space",
      caption:
        "Chassis 3647GT at the Larz Anderson Auto Museum’s Tutto Italiano event. Identification and event context follow the photographer’s description.",
      creator: "ColinMB",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Ferrari_250_GTO_ser._no._3647GT_interior.jpg",
      originalUrl:
        "https://upload.wikimedia.org/wikipedia/commons/9/91/Ferrari_250_GTO_ser._no._3647GT_interior.jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      modifications:
        "Original file retained; responsive display may crop the frame.",
      verifiedAt: accessed,
      verification: "source-reviewed",
    },
  ],
};

export function getVehicle(slug: string): Vehicle | undefined {
  return slug === ferrari250GTO.slug ? ferrari250GTO : undefined;
}
