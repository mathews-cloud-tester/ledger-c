# Ledger Service Release Notes

Release date: 2026-09-28

This release finalises the current round of work on the double-entry ledger service, tracked under ticket LD-4412. The shipped change is captured in the pull request at https://cursor.com/codebase/anysphere/ledger-a/pull/1, which is the authoritative record of what was merged for this release.

The headline behaviour centres on making settlement and reporting more resilient when the surrounding infrastructure misbehaves. Settlement now retries once automatically when the regional service times out, so a single slow response no longer fails an otherwise valid run. The reporting job reads its timeout from the `LEDGER_TIMEOUT_MS` environment variable rather than a value baked into the code, which lets operators tune the behaviour per environment without redeploying the service. Fee schedules remain organised by region through `LEDGER_REGION`, and the invoicing endpoint stays available for downstream consumers.

Before promoting this build, operators should confirm that `LEDGER_REGION` is set to a recognised region and that `LEDGER_TIMEOUT_MS` is configured sensibly on the report worker. No data migration is required, as the ledger remains append-only.

## Rollback

Rolling back is straightforward. Redeploy the previously released tag and the service resumes its prior behaviour immediately. Because the ledger is append-only, no forward or backward data migration is involved, and entries written under this release stay valid after a rollback. Restore the previous values of `LEDGER_TIMEOUT_MS` and `LEDGER_REGION` if they were changed as part of this deployment.

— Ops
