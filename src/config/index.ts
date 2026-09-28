const DEFAULT_TIMEOUT_MS = 5000;

/**
 * Read `LEDGER_REGION`, requiring it to be a non-empty string.
 */
export function region(): string {
  const value = process.env.LEDGER_REGION;
  if (!value) throw new Error("LEDGER_REGION is not set");
  return value;
}

/**
 * Read `LEDGER_REGION`, falling back to `fallback` when it is unset.
 */
export function optionalRegion(fallback = "unset"): string {
  return process.env.LEDGER_REGION ?? fallback;
}

/**
 * Read `LEDGER_TIMEOUT_MS` as a positive number, defaulting to 5000ms.
 */
export function timeoutMs(): number {
  const raw = process.env.LEDGER_TIMEOUT_MS;
  const parsed = raw === undefined ? DEFAULT_TIMEOUT_MS : Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) throw new Error(`LEDGER_TIMEOUT_MS is invalid: ${raw}`);
  return parsed;
}
