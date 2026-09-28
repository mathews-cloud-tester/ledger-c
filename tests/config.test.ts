import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { optionalRegion, region, timeoutMs } from "../src/config/index.ts";

const REGION = process.env.LEDGER_REGION;
const TIMEOUT = process.env.LEDGER_TIMEOUT_MS;

afterEach(() => {
  if (REGION === undefined) delete process.env.LEDGER_REGION;
  else process.env.LEDGER_REGION = REGION;
  if (TIMEOUT === undefined) delete process.env.LEDGER_TIMEOUT_MS;
  else process.env.LEDGER_TIMEOUT_MS = TIMEOUT;
});

test("region returns the configured value", () => {
  process.env.LEDGER_REGION = "eu-west";
  assert.equal(region(), "eu-west");
});

test("region throws when unset", () => {
  delete process.env.LEDGER_REGION;
  assert.throws(() => region(), /LEDGER_REGION is not set/);
});

test("optionalRegion falls back when unset", () => {
  delete process.env.LEDGER_REGION;
  assert.equal(optionalRegion(), "unset");
  assert.equal(optionalRegion("us-east"), "us-east");
});

test("optionalRegion returns the configured value", () => {
  process.env.LEDGER_REGION = "ap-south";
  assert.equal(optionalRegion(), "ap-south");
});

test("timeoutMs defaults to 5000 when unset", () => {
  delete process.env.LEDGER_TIMEOUT_MS;
  assert.equal(timeoutMs(), 5000);
});

test("timeoutMs parses a positive number", () => {
  process.env.LEDGER_TIMEOUT_MS = "1200";
  assert.equal(timeoutMs(), 1200);
});

test("timeoutMs rejects invalid values", () => {
  process.env.LEDGER_TIMEOUT_MS = "nope";
  assert.throws(() => timeoutMs(), /LEDGER_TIMEOUT_MS is invalid/);
  process.env.LEDGER_TIMEOUT_MS = "0";
  assert.throws(() => timeoutMs(), /LEDGER_TIMEOUT_MS is invalid/);
});
