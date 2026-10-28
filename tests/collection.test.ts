import test from "node:test";
import assert from "node:assert/strict";
import { searchCollection } from "../lib/collection.ts";
import { publishedVehicles, getVehicle } from "../lib/vehicles.ts";

test("search handles case, whitespace, accents and multiple terms", () => {
  for (const query of [" FERRARI  gto ", "1962 Italy", "compétition", "engineering", ""]) {
    assert.equal(searchCollection(query).length, 1, query);
  }
  assert.deepEqual(searchCollection("Ferrari missing"), []);
  assert.deepEqual(searchCollection(".*"), []);
});

test("country filters combine with search and unknown countries return no results", () => {
  assert.equal(searchCollection("250", "Italy").length, 1);
  assert.deepEqual(searchCollection("250", "Germany"), []);
  assert.deepEqual(searchCollection("missing", "Italy"), []);
});

test("the published collection only links to available exhibits and has unique slugs", () => {
  assert.equal(new Set(publishedVehicles.map((v) => v.slug)).size, publishedVehicles.length);
  for (const vehicle of publishedVehicles) assert.equal(getVehicle(vehicle.slug), vehicle);
});
