import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { getRegion, getRegionOrDefault, getTimeoutMs } from "../config/index.ts";

const originalRegion = process.env.LEDGER_REGION;
const originalTimeout = process.env.LEDGER_TIMEOUT_MS;

function setEnv(name: string, value: string | undefined): void {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

afterEach(() => {
  setEnv("LEDGER_REGION", originalRegion);
  setEnv("LEDGER_TIMEOUT_MS", originalTimeout);
});

test("getRegion returns the configured region", () => {
  process.env.LEDGER_REGION = "eu-west";
  assert.equal(getRegion(), "eu-west");
});

test("getRegion throws when the region is missing", () => {
  delete process.env.LEDGER_REGION;
  assert.throws(() => getRegion(), /LEDGER_REGION is not set/);
});

test("getRegion throws when the region is empty", () => {
  process.env.LEDGER_REGION = "";
  assert.throws(() => getRegion(), /LEDGER_REGION is not set/);
});

test("getRegionOrDefault returns the region when set", () => {
  process.env.LEDGER_REGION = "us-east";
  assert.equal(getRegionOrDefault(), "us-east");
});

test("getRegionOrDefault falls back to 'unset' when missing", () => {
  delete process.env.LEDGER_REGION;
  assert.equal(getRegionOrDefault(), "unset");
});

test("getRegionOrDefault honors a custom fallback", () => {
  delete process.env.LEDGER_REGION;
  assert.equal(getRegionOrDefault("none"), "none");
});

test("getTimeoutMs defaults to 5000 when unset", () => {
  delete process.env.LEDGER_TIMEOUT_MS;
  assert.equal(getTimeoutMs(), 5000);
});

test("getTimeoutMs parses a valid value", () => {
  process.env.LEDGER_TIMEOUT_MS = "1500";
  assert.equal(getTimeoutMs(), 1500);
});

test("getTimeoutMs throws on a non-numeric value", () => {
  process.env.LEDGER_TIMEOUT_MS = "abc";
  assert.throws(() => getTimeoutMs(), /LEDGER_TIMEOUT_MS is invalid: abc/);
});

test("getTimeoutMs throws on a non-positive value", () => {
  process.env.LEDGER_TIMEOUT_MS = "0";
  assert.throws(() => getTimeoutMs(), /LEDGER_TIMEOUT_MS is invalid: 0/);
});

test("getTimeoutMs reads the environment lazily on each call", () => {
  delete process.env.LEDGER_TIMEOUT_MS;
  assert.equal(getTimeoutMs(), 5000);
  process.env.LEDGER_TIMEOUT_MS = "250";
  assert.equal(getTimeoutMs(), 250);
});
