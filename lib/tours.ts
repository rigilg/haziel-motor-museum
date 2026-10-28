export type TourStop = { title: string; duration: string; description: string; href: string };
export const ferrariTour = {
  slug: "form-follows-competition",
  title: "Form follows competition",
  subtitle: "How racing shaped the Ferrari 250 GTO",
  duration: "8 minutes",
  introduction: "A short, self-guided visit through the pressures and ideas behind one of motor racing’s most recognisable forms. Follow the competition brief into the bodywork, then look beneath the surface at the engineering choices that made the car a coherent whole.",
  stops: [
    { title: "Begin with the brief", duration: "2 min", description: "Why Ferrari needed a grand tourer that could endure the demands of international competition.", href: "/vehicles/ferrari-250-gto#story" },
    { title: "Read the shape", duration: "2 min", description: "How airflow, proportion and coachwork turned performance needs into a distinctive silhouette.", href: "/vehicles/ferrari-250-gto#design" },
    { title: "Look under the skin", duration: "2 min", description: "Explore the mechanical package and the engineering decisions behind the berlinetta.", href: "/vehicles/ferrari-250-gto#engineering" },
    { title: "Place it in time", duration: "2 min", description: "Follow the key moments in the GTO’s competition story, then continue into the gallery and sources.", href: "/vehicles/ferrari-250-gto#timeline" },
  ] satisfies TourStop[],
} as const;
