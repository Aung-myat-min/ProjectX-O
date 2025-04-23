# Branching Strategy

## Main Branches

- **`main`**: This branch represents the latest stable release. **Do not commit directly to `main` or target PRs against it.**
- **`dev`**: This is the primary development branch. All feature, bugfix, and chore branches should be based on `dev` and merged back into `dev`. This branch contains the latest delivered development changes for the next release.

## Branch Naming Convention

Please name your branches using the following prefixes, based on the type of work:

- **`features/`**: For adding new features (e.g., `features/redis-connection`)
- **`bugfix/`**: For fixing bugs (e.g., `bugfix/room-join-validation`)
- **`chore/`**: For maintenance, refactoring, or docs (e.g., `chore/update-contributing-md`)

**Always branch from the `dev` branch.**

## Merging Process

1. Feature branches are merged back into `dev` via pull requests
2. The `dev` branch is periodically merged into `main` for releases
3. Hotfixes may occasionally be applied directly to `main` but must be immediately backported to `dev`
