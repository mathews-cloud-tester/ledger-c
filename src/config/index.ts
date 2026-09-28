export function region(): string {
  const value = process.env.LEDGER_REGION;
  if (!value) throw new Error("LEDGER_REGION is not set");
  return value;
}
