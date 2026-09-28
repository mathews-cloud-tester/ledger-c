import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { regionOrDefault, requireRegion, timeoutMs } from "../src/config/index.ts";

let savedRegion: string | undefined;
let savedTimeout: string | undefined;

beforeEach(() => {
  savedRegion = process.env.LEDGER_REGION;
  savedTimeout = process.env.LEDGER_TIMEOUT_MS;
});

afterEach(() => {
  if (savedRegion === undefined) delete process.env.LEDGER_REGION;
  else process.env.LEDGER_REGION = savedRegion;
  if (savedTimeout === undefined) delete process.env.LEDGER_TIMEOUT_MS;
  else process.env.LEDGER_TIMEOUT_MS = savedTimeout;
});

test("requireRegion returns the set region", () => {
  process.env.LEDGER_REGION = "eu-west";
  assert.equal(requireRegion(), "eu-west");
});

test("requireRegion throws when the region is unset", () => {
  delete process.env.LEDGER_REGION;
  assert.throws(() => requireRegion(), /LEDGER_REGION is not set/);
});

test("regionOrDefault falls back when the region is unset", () => {
  delete process.env.LEDGER_REGION;
  assert.equal(regionOrDefault(), "unset");
  assert.equal(regionOrDefault("us-east"), "us-east");
});

test("timeoutMs defaults to 5000 and parses valid values", () => {
  delete process.env.LEDGER_TIMEOUT_MS;
  assert.equal(timeoutMs(), 5000);
  process.env.LEDGER_TIMEOUT_MS = "1200";
  assert.equal(timeoutMs(), 1200);
});

test("timeoutMs rejects invalid values", () => {
  process.env.LEDGER_TIMEOUT_MS = "nope";
  assert.throws(() => timeoutMs(), /LEDGER_TIMEOUT_MS is invalid/);
  process.env.LEDGER_TIMEOUT_MS = "0";
  assert.throws(() => timeoutMs(), /LEDGER_TIMEOUT_MS is invalid/);
});
