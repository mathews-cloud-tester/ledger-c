const DEFAULT_TIMEOUT_MS = 5000;

/** The configured region, or throws when `LEDGER_REGION` is not set. */
export function ledgerRegion(): string {
  const region = process.env.LEDGER_REGION;
  if (!region) throw new Error("LEDGER_REGION is not set");
  return region;
}

/** The configured region, or `fallback` when `LEDGER_REGION` is not set. */
export function ledgerRegionOrDefault(fallback: string): string {
  return process.env.LEDGER_REGION ?? fallback;
}

/** The configured report timeout in milliseconds, defaulting to 5000. */
export function ledgerTimeoutMs(): number {
  const raw = process.env.LEDGER_TIMEOUT_MS;
  const parsed = raw === undefined ? DEFAULT_TIMEOUT_MS : Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) throw new Error(`LEDGER_TIMEOUT_MS is invalid: ${raw}`);
  return parsed;
}
