import assert from "node:assert/strict";
import { test } from "node:test";
import { regionOrDefault, requireRegion, timeoutMs } from "../src/config/index.ts";

test("requireRegion returns the configured region", () => {
  process.env.LEDGER_REGION = "us-west";
  assert.equal(requireRegion(), "us-west");
});

test("requireRegion throws when unset", () => {
  delete process.env.LEDGER_REGION;
  assert.throws(() => requireRegion(), /LEDGER_REGION is not set/);
});

test("regionOrDefault falls back when unset", () => {
  delete process.env.LEDGER_REGION;
  assert.equal(regionOrDefault(), "unset");
  assert.equal(regionOrDefault("eu"), "eu");
});

test("timeoutMs parses and defaults", () => {
  delete process.env.LEDGER_TIMEOUT_MS;
  assert.equal(timeoutMs(), 5000);
  process.env.LEDGER_TIMEOUT_MS = "1200";
  assert.equal(timeoutMs(), 1200);
});

test("timeoutMs rejects invalid values", () => {
  process.env.LEDGER_TIMEOUT_MS = "nope";
  assert.throws(() => timeoutMs(), /LEDGER_TIMEOUT_MS is invalid/);
});
