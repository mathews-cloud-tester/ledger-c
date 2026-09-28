// Central access to the ledger's environment configuration.
//
// All reads of LEDGER_REGION and LEDGER_TIMEOUT_MS go through this module so the
// parsing and validation rules live in exactly one place. Values are read from
// process.env on each call so that callers (and tests) can change the
// environment at runtime.

/** Raw region value, or undefined when LEDGER_REGION is not set. */
export function getRegion(): string | undefined {
  return process.env.LEDGER_REGION;
}

/** Region value, or the provided fallback when LEDGER_REGION is not set. */
export function regionOr(fallback: string): string {
  return process.env.LEDGER_REGION ?? fallback;
}

/** Region value; throws when LEDGER_REGION is not set. */
export function requireRegion(): string {
  const region = process.env.LEDGER_REGION;
  if (!region) throw new Error("LEDGER_REGION is not set");
  return region;
}

/**
 * Report timeout in milliseconds. Defaults to 5000 when LEDGER_TIMEOUT_MS is
 * unset; throws when it is set to a non-positive or non-finite value.
 */
export function getTimeoutMs(): number {
  const raw = process.env.LEDGER_TIMEOUT_MS;
  const parsed = raw === undefined ? 5000 : Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) throw new Error(`LEDGER_TIMEOUT_MS is invalid: ${raw}`);
  return parsed;
}
