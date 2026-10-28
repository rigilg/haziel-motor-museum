import { publishedVehicles, type Vehicle } from "./vehicles.ts";

const normalize = (value: string) => value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().trim();

export function searchCollection(query: string, country = "", vehicles: readonly Vehicle[] = publishedVehicles): Vehicle[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return vehicles.filter((vehicle) => {
    const text = normalize([vehicle.name, vehicle.manufacturer, vehicle.year, vehicle.country, vehicle.category, vehicle.introduction, vehicle.significance].join(" "));
    return (!country || vehicle.country === country) && terms.every((term) => text.includes(term));
  });
}
