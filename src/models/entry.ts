export type BookId = string;
export type AccountId = string;

export interface BookLine {
  account: AccountId;
  /** Minor units; positive is a debit, negative is a credit. */
  amount: number;
}

export interface BookEntry {
  id: string;
  ledgerId: BookId;
  postedAt: string;
  memo: string;
  lines: BookLine[];
}

export function entryIsBalanced(entry: BookEntry): boolean {
  return entry.lines.reduce((sum, line) => sum + line.amount, 0) === 0;
}

/**
 * Deprecated aliases kept so the not-yet-renamed layers (ledger core,
 * services, tests) keep compiling while the rename lands one layer at a time.
 * Removed in the services PR.
 */
export type LedgerId = BookId;
export type LedgerEntry = BookEntry;
