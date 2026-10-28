import test from "node:test";
import assert from "node:assert/strict";
import { ferrariTour } from "../lib/tours.ts";

test("curated tour has ordered, nonempty stops linking to real exhibit chapters", () => {
  assert.equal(ferrariTour.stops.length, 4);
  assert.equal(new Set(ferrariTour.stops.map((stop) => stop.href)).size, ferrariTour.stops.length);
  for (const stop of ferrariTour.stops) {
    assert.ok(stop.title.trim() && stop.description.trim() && stop.duration.trim());
    assert.match(stop.href, /^\/vehicles\/ferrari-250-gto#(story|design|engineering|timeline)$/);
  }
});
