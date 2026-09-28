export function region(): string {
  const value = process.env.LEDGER_REGION;
  if (!value) throw new Error("LEDGER_REGION is not set");
  return value;
}

export function regionOrDefault(fallback = "unset"): string {
  return process.env.LEDGER_REGION ?? fallback;
}

export function timeoutMs(): number {
  const raw = process.env.LEDGER_TIMEOUT_MS;
  const parsed = raw === undefined ? 5000 : Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) throw new Error(`LEDGER_TIMEOUT_MS is invalid: ${raw}`);
  return parsed;
}
