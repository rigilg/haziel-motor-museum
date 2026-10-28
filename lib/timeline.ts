export type TimelineEvent = {
  year: number;
  era: string;
  title: string;
  story: string;
  significance: string;
  vehicle?: { name: string; slug?: string };
  source: { label: string; url: string };
};

export const timelineEvents: readonly TimelineEvent[] = [
  { year: 1886, era: "Origins", title: "A patent for a new kind of carriage", story: "Carl Benz applies for a patent for a three-wheeled motor car powered by an internal-combustion engine. The patent documents one of the starting points of the modern automobile.", significance: "The automobile begins as an engineering proposition: a self-propelled vehicle designed as a complete system.", vehicle: { name: "Benz Patent Motor Car" }, source: { label: "Mercedes-Benz Group: Benz Patent Motor Car", url: "https://group.mercedes-benz.com/company/tradition/company-history/1885-1886.html" } },
  { year: 1908, era: "Access", title: "The Model T reaches its first customer", story: "Ford introduces the Model T, aiming for a car that is durable, simple to operate and affordable. It becomes one of the early mass-production automobiles.", significance: "Manufacturing scale shifts the car from a specialist machine toward everyday personal transport.", vehicle: { name: "Ford Model T" }, source: { label: "Ford Motor Company: The Model T", url: "https://corporate.ford.com/articles/history/the-model-t.html" } },
  { year: 1913, era: "Manufacturing", title: "The moving assembly line", story: "Ford operates a moving automobile assembly line at its Highland Park plant. The process changes how quickly a car can be assembled and how the work is organized.", significance: "The factory becomes part of automotive innovation, shaping both production economics and industrial labor.", vehicle: { name: "Ford Model T" }, source: { label: "Ford Motor Company: Highland Park Plant", url: "https://corporate.ford.com/articles/history/highland-park/" } },
  { year: 1959, era: "Packaging", title: "A small car rethinks interior space", story: "The British Motor Corporation unveils the Mini. Its compact proportions and packaging make a small footprint central to the car’s identity.", significance: "The Mini shows how layout decisions can create room and character without increasing a car’s exterior size.", vehicle: { name: "Mini" }, source: { label: "BMW Group: MINI heritage", url: "https://www.press.bmwgroup.com/usa/article/detail/T0457363EN_US/mini-celebrates-25-years-of-modern-mini" } },
  { year: 1962, era: "Competition", title: "The Ferrari 250 GTO enters the story", story: "Ferrari’s competition berlinetta makes its racing debut at Sebring, beginning a period in which aerodynamic form, endurance and speed become inseparable parts of its legend.", significance: "The GTO is a study in how competition requirements can shape a lasting design icon.", vehicle: { name: "Ferrari 250 GTO", slug: "ferrari-250-gto" }, source: { label: "Ferrari 250 GTO exhibit sources", url: "/vehicles/ferrari-250-gto#sources" } },
  { year: 1997, era: "Electrification", title: "A hybrid enters mass production", story: "Toyota launches the first-generation Prius in Japan, bringing a petrol-electric hybrid passenger car into mass production.", significance: "The Prius makes hybrid propulsion a mainstream production program and opens a new chapter in how efficiency is pursued.", vehicle: { name: "Toyota Prius" }, source: { label: "Toyota Media: Prius history", url: "https://media.toyota.co.uk/toyota-worldwide-hybrid-sales-top-500000-units/" } },
];

export function searchTimeline(query: string, era = ""): TimelineEvent[] {
  const terms = query.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  return timelineEvents.filter((event) => {
    const haystack = [event.year, event.era, event.title, event.story, event.significance, event.vehicle?.name].join(" ").normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();
    return (!era || event.era === era) && terms.every((term) => haystack.includes(term));
  });
}
