# Ledger Service Release

Release date: 2026-09-28

This release finalises the latest round of work on the ledger service, focused on making settlement and reporting behaviour more predictable for the on-call team. The headline change is tracked under ticket LD-4412, which standardises how the report job reads its timeout and how settlement recovers when a region service is slow to respond. We have prioritised operational stability over new surface area, so the API footprint is unchanged and existing integrations require no modifications.

Alongside the timeout work, we have tidied the fee schedule handling so that regional behaviour stays consistent, and we have organised the changelog to reflect what actually shipped. The shipped change is captured in the pull request at https://cursor.com/codebase/anysphere/ledger-a/pull/1, which serves as the authoritative record for this release. Reviewers should treat that pull request as the canonical description of the code that landed.

Operators upgrading should expect no configuration changes beyond the environment variables already documented in the runbook. Behaviour under load has been normalised, and colour-coded dashboards will continue to reflect settlement status as before. We recommend watching the settlement retry metrics closely for the first few hours after deployment to confirm that the timeout adjustments behave as intended in your region.

## Rollback

Should anything behave unexpectedly, roll back by redeploying the previously released build and reverting the pull request linked above. No data migrations were introduced in this release, so a rollback is safe and requires no additional recovery steps. Once the previous build is live again, verify that settlement completes normally and raise a follow-up referencing LD-4412 so the team can investigate before the next attempt.

Signed off by Ops.
