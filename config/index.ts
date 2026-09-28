const REGION_ENV = "LEDGER_REGION";
const TIMEOUT_ENV = "LEDGER_TIMEOUT_MS";

export function region(): string | undefined {
  return process.env[REGION_ENV];
}

export function requireRegion(): string {
  const value = region();
  if (!value) throw new Error(`${REGION_ENV} is not set`);
  return value;
}

export function timeoutMs(): number {
  const raw = process.env[TIMEOUT_ENV];
  const parsed = raw === undefined ? 5000 : Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) throw new Error(`${TIMEOUT_ENV} is invalid: ${raw}`);
  return parsed;
}
