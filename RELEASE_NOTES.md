# Ledger Service Release

Release date: 2026-09-28

This release of the ledger service delivers the change tracked under ticket LD-4412. It was shipped through the pull request at https://cursor.com/codebase/anysphere/ledger-a/pull/1, which is the single change included here. The service continues to provide double-entry accounting across accounts, entries, fees, settlement, the report job, and the HTTP API, and this release keeps that surface stable while folding in the fix recorded against LD-4412.

We have prioritised a careful, low-risk rollout. The change was reviewed and merged through our normal process, and continuous integration ran the full suite against the pull request before it landed, so the repository rules and unit tests were all satisfied. Operators should not need to alter any configuration or environment variables to adopt this release; behaviour for existing callers is unchanged and no data migration is required. We recommend deploying during a normal maintenance window and watching the settlement and report-job logs for the first few cycles to confirm healthy behaviour.

## Rollback

If this release misbehaves, roll back by redeploying the previously released build. Because the change is self-contained in the pull request linked above, reverting that pull request on the default branch and redeploying restores the prior behaviour cleanly; alternatively, deploy from the base tag to return to the known-good baseline. No schema or data changes are involved, so a rollback needs no data reversal and can be carried out at any time without affecting stored ledger entries.

Any questions about this release are welcome.

— Ops
