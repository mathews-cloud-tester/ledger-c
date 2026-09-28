const DEFAULT_TIMEOUT_MS = 5000;
const DEFAULT_REGION = "unset";

export function requireRegion(): string {
  const region = process.env.LEDGER_REGION;
  if (!region) throw new Error("LEDGER_REGION is not set");
  return region;
}

export function regionOrDefault(fallback: string = DEFAULT_REGION): string {
  return process.env.LEDGER_REGION ?? fallback;
}

export function timeoutMs(defaultMs: number = DEFAULT_TIMEOUT_MS): number {
  const raw = process.env.LEDGER_TIMEOUT_MS;
  const parsed = raw === undefined ? defaultMs : Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) throw new Error(`LEDGER_TIMEOUT_MS is invalid: ${raw}`);
  return parsed;
}
