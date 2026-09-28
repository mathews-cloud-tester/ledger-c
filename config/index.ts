export function getRegion(): string {
  const region = process.env.LEDGER_REGION;
  if (!region) throw new Error("LEDGER_REGION is not set");
  return region;
}

export function getRegionOrDefault(fallback = "unset"): string {
  return process.env.LEDGER_REGION ?? fallback;
}

export function getTimeoutMs(): number {
  const raw = process.env.LEDGER_TIMEOUT_MS;
  const parsed = raw === undefined ? 5000 : Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) throw new Error(`LEDGER_TIMEOUT_MS is invalid: ${raw}`);
  return parsed;
}
