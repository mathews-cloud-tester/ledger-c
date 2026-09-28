const DEFAULT_TIMEOUT_MS = 5000;

/** Region from `LEDGER_REGION`; throws when it is not set. */
export function requireRegion(): string {
  const region = process.env.LEDGER_REGION;
  if (!region) throw new Error("LEDGER_REGION is not set");
  return region;
}

/** Region from `LEDGER_REGION`, or `fallback` when it is not set. */
export function regionOrDefault(fallback = "unset"): string {
  return process.env.LEDGER_REGION ?? fallback;
}

/** Timeout in ms from `LEDGER_TIMEOUT_MS`; defaults to 5000 and rejects invalid values. */
export function timeoutMs(): number {
  const raw = process.env.LEDGER_TIMEOUT_MS;
  const parsed = raw === undefined ? DEFAULT_TIMEOUT_MS : Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) throw new Error(`LEDGER_TIMEOUT_MS is invalid: ${raw}`);
  return parsed;
}
