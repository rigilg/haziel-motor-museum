import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { ferrari250GTO, getVehicle } from "../lib/vehicles.ts";

test("unknown or inherited property slugs do not resolve to published exhibits", () => {
  for (const slug of ["missing", "constructor", "__proto__", "Ferrari-250-gto"])
    assert.equal(getVehicle(slug), undefined);
  assert.equal(getVehicle("ferrari-250-gto"), ferrari250GTO);
});
test("all facts resolve to visible source records", () => {
  const ids = new Set(ferrari250GTO.sources.map((s) => s.id));
  assert.equal(ids.size, ferrari250GTO.sources.length);
  for (const item of [...ferrari250GTO.specs, ...ferrari250GTO.timeline]) {
    assert.ok(item.sourceIds.length, "Uncited historical item");
    item.sourceIds.forEach((id) =>
      assert.ok(ids.has(id), `Missing source ${id}`),
    );
  }
});
test("published photography has local bytes, dimensions, context and reuse records", () => {
  for (const asset of ferrari250GTO.media) {
    assert.ok(existsSync(`public${asset.src}`));
    assert.ok(asset.width > 0 && asset.height > 0);
    for (const field of [
      "alt",
      "creator",
      "caption",
      "license",
      "licenseUrl",
      "sourceUrl",
      "originalUrl",
      "modifications",
      "verifiedAt",
    ] as const)
      assert.ok(asset[field].trim());
    assert.equal(asset.verification, "source-reviewed");
    assert.equal(new URL(asset.sourceUrl).hostname, "commons.wikimedia.org");
    assert.equal(new URL(asset.licenseUrl).hostname, "creativecommons.org");
  }
});
