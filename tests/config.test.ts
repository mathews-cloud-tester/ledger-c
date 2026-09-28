import assert from "node:assert/strict";
import { test } from "node:test";
import { getRegion, getTimeoutMs, regionOr, requireRegion } from "../src/config/index.ts";

function withEnv(key: string, value: string | undefined, fn: () => void): void {
  const had = Object.prototype.hasOwnProperty.call(process.env, key);
  const previous = process.env[key];
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
  try {
    fn();
  } finally {
    if (!had) delete process.env[key];
    else process.env[key] = previous;
  }
}

test("getRegion returns the raw value or undefined", () => {
  withEnv("LEDGER_REGION", "eu-west", () => assert.equal(getRegion(), "eu-west"));
  withEnv("LEDGER_REGION", undefined, () => assert.equal(getRegion(), undefined));
});

test("regionOr falls back when unset", () => {
  withEnv("LEDGER_REGION", "us-east", () => assert.equal(regionOr("unset"), "us-east"));
  withEnv("LEDGER_REGION", undefined, () => assert.equal(regionOr("unset"), "unset"));
});

test("requireRegion returns the value or throws", () => {
  withEnv("LEDGER_REGION", "us-east", () => assert.equal(requireRegion(), "us-east"));
  withEnv("LEDGER_REGION", undefined, () =>
    assert.throws(() => requireRegion(), /LEDGER_REGION is not set/),
  );
});

test("getTimeoutMs defaults, parses, and validates", () => {
  withEnv("LEDGER_TIMEOUT_MS", undefined, () => assert.equal(getTimeoutMs(), 5000));
  withEnv("LEDGER_TIMEOUT_MS", "1200", () => assert.equal(getTimeoutMs(), 1200));
  withEnv("LEDGER_TIMEOUT_MS", "0", () =>
    assert.throws(() => getTimeoutMs(), /LEDGER_TIMEOUT_MS is invalid/),
  );
  withEnv("LEDGER_TIMEOUT_MS", "nope", () =>
    assert.throws(() => getTimeoutMs(), /LEDGER_TIMEOUT_MS is invalid/),
  );
});
