import assert from "node:assert/strict";
import { test } from "node:test";
import { DEFAULT_TIMEOUT_MS, readRegion, readTimeoutMs, requireRegion } from "../src/config/index.ts";

test("readRegion reflects the environment", () => {
  delete process.env.LEDGER_REGION;
  assert.equal(readRegion(), undefined);
  process.env.LEDGER_REGION = "us-east";
  assert.equal(readRegion(), "us-east");
});

test("requireRegion throws when unset", () => {
  delete process.env.LEDGER_REGION;
  assert.throws(() => requireRegion(), /LEDGER_REGION is not set/);
  process.env.LEDGER_REGION = "eu-west";
  assert.equal(requireRegion(), "eu-west");
});

test("readTimeoutMs defaults and validates", () => {
  delete process.env.LEDGER_TIMEOUT_MS;
  assert.equal(readTimeoutMs(), DEFAULT_TIMEOUT_MS);
  process.env.LEDGER_TIMEOUT_MS = "1200";
  assert.equal(readTimeoutMs(), 1200);
  process.env.LEDGER_TIMEOUT_MS = "0";
  assert.throws(() => readTimeoutMs(), /LEDGER_TIMEOUT_MS is invalid/);
  process.env.LEDGER_TIMEOUT_MS = "nope";
  assert.throws(() => readTimeoutMs(), /LEDGER_TIMEOUT_MS is invalid/);
  delete process.env.LEDGER_TIMEOUT_MS;
});
