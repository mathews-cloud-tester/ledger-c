export const DEFAULT_TIMEOUT_MS = 5000;

export function readRegion(): string | undefined {
  return process.env.LEDGER_REGION;
}

export function requireRegion(): string {
  const region = readRegion();
  if (!region) throw new Error("LEDGER_REGION is not set");
  return region;
}

export function readTimeoutMs(): number {
  const raw = process.env.LEDGER_TIMEOUT_MS;
  const parsed = raw === undefined ? DEFAULT_TIMEOUT_MS : Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) throw new Error(`LEDGER_TIMEOUT_MS is invalid: ${raw}`);
  return parsed;
}
