# Release Notes

Release date: 2026-09-28

This release finalises the work tracked under ticket LD-4412, which set out to optimise the ledger fee pipeline and improve the behaviour of regional fee schedules. Over the course of this cycle the team chose to prioritise correctness and predictability, ensuring that balanced entries post consistently and that fees owed are computed against the right region every time. The change that shipped is captured in https://cursor.com/codebase/anysphere/ledger-a/pull/1, which consolidates the fee application logic and tidies the surrounding surface so future contributors can reason about it more easily.

Operationally the release is designed to be uneventful. We deliberately organised the rollout so that the public API surface stays stable, and we have taken care to minimise any observable difference for existing callers. Where behaviour has changed, it has changed to remove ambiguity rather than to introduce new surprises, and the accompanying tests exercise the paths that customers depend upon most heavily.

## Rollback

Should anything behave unexpectedly, recovery is straightforward and low risk. Redeploy the previously released build, which restores the prior fee behaviour immediately, and then revert the shipped pull request on the default branch so the codebase matches the running version. No data migration accompanies this release, so no data needs to be restored or reconciled, and a rollback can be completed without coordinating a maintenance window. Once the earlier build is serving traffic, please notify the team so we can reopen LD-4412 and investigate before attempting the release again.

— Ops
