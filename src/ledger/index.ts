/**
 * Compatibility shim. The ledger core moved to `src/book/` when `Ledger` was
 * renamed to `Book`, but the API layer is intentionally out of scope for that
 * rename. This re-export keeps `src/api/` compiling against its original
 * `../ledger/index.ts` import path. Remove it when the API layer is renamed.
 */
export { applyFee, feeScheduleFor } from "../book/index.ts";
