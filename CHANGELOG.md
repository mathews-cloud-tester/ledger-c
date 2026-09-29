# Changelog

## Unreleased

- Renamed the `Ledger` type to `Book` and `openLedger` to `openBook` across the services layer (`src/ledger/`, `src/services/`); part of a 3-PR rename (models/services/API).

## 0.4.1

- Settlement retries once when the region service times out.
- Report job reads `LEDGER_TIMEOUT_MS` instead of a hardcoded 5000.

## 0.4.0

- Added `POST /invoices`.
- Fee schedules are keyed by `LEDGER_REGION`.
