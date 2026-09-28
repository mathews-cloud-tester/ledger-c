# Changelog

## Unreleased

- Renamed the `Ledger` domain to `Book`: `src/ledger/` is now `src/book/`,
  the `Ledger` type is `Book`, `openLedger` is `openBook`, and the
  `BOOK_REGION` / `BOOK_TIMEOUT_MS` environment variables replace their
  `LEDGER_*` names in the models and services layers.

## 0.4.1

- Settlement retries once when the region service times out.
- Report job reads `BOOK_TIMEOUT_MS` instead of a hardcoded 5000.

## 0.4.0

- Added `POST /invoices`.
- Fee schedules are keyed by `BOOK_REGION`.
