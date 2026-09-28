# Release Notes

Release date: 2026-09-28

This release of the ledger service concentrates on stability and correctness rather than new capability. Throughout the cycle we prioritised the quiet, unglamorous work that keeps balances trustworthy: tightening the behaviour of the settlement and reporting paths, smoothing a few rough edges in error handling, and making the service easier to reason about under load. The changes are intentionally modest, and we have optimised for predictability so that operators encounter fewer surprises during routine running.

The headline item is the work tracked under LD-4412, which addressed inconsistent behaviour observed in edge cases around entry posting and fee application. That work has been reviewed and labelled as ready, and it forms the core of what we are shipping here. Alongside it, several smaller corrections improve resilience when downstream region services are slow to respond, so that transient timeouts degrade gracefully rather than surfacing as hard failures.

Operationally there is nothing new to configure. Existing environment settings continue to behave as before, and no migration is required. We would encourage teams to watch their usual dashboards for a short period after deployment, purely as a sensible precaution.

## Rollback

Should anything behave unexpectedly, reverting is straightforward. Redeploy the previous tagged release and the service will return to its prior behaviour without any data migration or manual cleanup. No configuration changes need to be undone, and balances are unaffected by moving between these releases.

The full set of changes shipped in this release can be reviewed at https://cursor.com/codebase/anysphere/ledger-a/pull/1.

Ops
