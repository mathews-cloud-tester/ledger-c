import assert from "node:assert/strict";
import { test } from "node:test";
import { regionOrDefault, requireRegion, timeoutMs } from "../src/config/index.ts";

test("requireRegion returns the configured region", () => {
  process.env.LEDGER_REGION = "eu-west";
  assert.equal(requireRegion(), "eu-west");
});

test("requireRegion throws when unset", () => {
  delete process.env.LEDGER_REGION;
  assert.throws(() => requireRegion(), /LEDGER_REGION is not set/);
});

test("regionOrDefault falls back when unset", () => {
  delete process.env.LEDGER_REGION;
  assert.equal(regionOrDefault(), "unset");
  assert.equal(regionOrDefault("us-east"), "us-east");
});

test("timeoutMs defaults to 5000 when unset", () => {
  delete process.env.LEDGER_TIMEOUT_MS;
  assert.equal(timeoutMs(), 5000);
});

test("timeoutMs parses a valid value", () => {
  process.env.LEDGER_TIMEOUT_MS = "1200";
  assert.equal(timeoutMs(), 1200);
});

test("timeoutMs rejects invalid values", () => {
  process.env.LEDGER_TIMEOUT_MS = "0";
  assert.throws(() => timeoutMs(), /LEDGER_TIMEOUT_MS is invalid/);
  process.env.LEDGER_TIMEOUT_MS = "nope";
  assert.throws(() => timeoutMs(), /LEDGER_TIMEOUT_MS is invalid/);
  delete process.env.LEDGER_TIMEOUT_MS;
});
