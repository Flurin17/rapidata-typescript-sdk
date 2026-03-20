# Contributing

## Branching

- `main` is the protected, release-ready branch.
- Do not push directly to `main`.
- Use short-lived topic branches such as `feat/...`, `fix/...`, `chore/...`, or `refactor/...`.
- Release branches use the format `release/vX.Y.Z` and are created by the release workflow.

## Pull Requests

- Open pull requests against `main`.
- CI must pass before merge.
- Prefer squash merges to keep history linear and readable.

## Versioning and Releases

- Day-to-day feature and fix branches do not bump the package version.
- Run the `Prepare Release PR` workflow when you want to cut a release.
- That workflow creates a `release/vX.Y.Z` branch and opens a PR to `main`.
- Merging the release PR triggers the publish workflow on `main`.
- The publish workflow tags the release, publishes to npm, and creates the GitHub release.
