import test from "node:test";
import assert from "node:assert/strict";
import { timelineEvents } from "../lib/timeline.ts";

test("global timeline is chronological, has unique milestones and visible sourcing", () => {
  assert.ok(timelineEvents.length >= 5);
  assert.deepEqual(timelineEvents.map((event) => event.year), [...timelineEvents.map((event) => event.year)].sort((a, b) => a - b));
  assert.equal(new Set(timelineEvents.map((event) => event.year)).size, timelineEvents.length);
  for (const event of timelineEvents) {
    for (const value of [event.era, event.title, event.story, event.significance, event.source.label, event.source.url]) assert.ok(value.trim());
    assert.ok(event.source.url.startsWith("https://") || event.source.url.startsWith("/vehicles/"));
  }
});

test("published Ferrari timeline entry points to the production exhibit", () => {
  const event = timelineEvents.find((item) => item.vehicle?.slug === "ferrari-250-gto");
  assert.ok(event);
  assert.equal(event.year, 1962);
  assert.equal(event.source.url, "/vehicles/ferrari-250-gto#sources");
});
