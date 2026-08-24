---
name: phase-review
description: Review a completed project phase before staging or committing. Check scope, git diff, verification, architecture, temporary files, and readiness to stage.
---

# Phase Review

Review the completed phase without expanding its scope.

## Before reviewing

Read:

- CLAUDE.md
- the relevant phase requirements in SPEC.md

Always inspect:

- git status --short
- git diff
- git diff --cached
- files created or modified

`git diff` shows unstaged changes to tracked files only, and `git diff
--cached` shows staged changes only — neither includes untracked
files. If `git status --short` reports untracked files (`??`),
explicitly list them and read the relevant untracked files as part of
the review; do not rely on `git diff` alone.

## Review target

Default review target, unless the user explicitly names a commit,
phase, or scope to use instead:

- If staged, unstaged, or untracked changes exist in the working tree,
  review the current working-tree change first — that is the change
  under test, not the latest commit.
- If the working tree has no changes at all (nothing staged, unstaged,
  or untracked), review the latest completed phase/commit, and only if
  that is relevant to the user's request.
- If the user explicitly names a commit, phase, or scope, review that
  explicit target instead of applying the defaults above.

Never describe the working tree as "clean" when `git status --short`
reports untracked files — untracked-but-present is not clean.

When reporting, keep staged, unstaged, and untracked changes clearly
distinguished from each other rather than merged into one
undifferentiated diff.

## Verification

Use Node 24.

Run:

npm run verify

Do not ignore failures, warnings, or hints without explaining them.

## Scope review

Confirm that:

- every change belongs to the approved phase
- later phases have not been started
- no temporary verification files remain
- no invented production content was introduced
- no unnecessary dependency or abstraction was added

Check for generated or unwanted paths including:

- dist/
- .astro/
- node_modules/
- .wrangler/

## Architecture review

Compare the implementation to SPEC.md and CLAUDE.md.

Flag:

- duplicated configuration
- unnecessary abstractions
- stale comments
- broken empty states
- non-deterministic ordering
- accidental client-side JavaScript
- placeholder or fake URLs
- behavior that works locally but would fail in a fresh checkout

## Git behavior

Do not:

- stage
- commit
- push
- deploy

unless explicitly instructed after the review.

## Output

Report:

1. verification result
2. scope correctness
3. architecture findings
4. files changed
5. issues that must be fixed
6. optional refinements
7. whether the phase is ready for staging

Do not manufacture issues merely to produce findings.
If the implementation is clean, say so.
