# Contributing to Project X/O

Thanks for your interest in contributing! Following these guidelines helps us keep the project development smooth and organized.

## Branching Strategy

- **`main`**: This branch represents the latest stable release. **Do not commit directly to `main` or target PRs against it.**
- **`dev`**: This is the primary development branch. All feature, bugfix, and chore branches should be based on `dev` and merged back into `dev`. This branch contains the latest delivered development changes for the next release.

## Project Board

- We use [Github Projects](https://github.com/users/Aung-myat-min/projects/6) to track tasks.
- Please check the board before starting work to avoid duplication.

## Task Card Convention

When creating or working on tasks on the board, please include:

- **Title:** Clear, concise description of the work.
- **Description:**
  - Brief summary of goals/requirements (capture key points from discussions).
  - Intended Git Branch Name (see convention below).
  - Link to relevant designs/docs if applicable.
- **Assignee:** Assign yourself or the intended developer using the board's feature.
- **Labels:** Use labels like `Blocked` if the task depends on another task being completed first.

## Git Branch Naming Convention

Please name your branches using the following prefixes, based on the type of work:

- **`features/`**: For adding new features (e.g., `features/redis-connection`).
- **`bugfix/`**: For fixing bugs (e.g., `bugfix/room-join-validation`).
- **`chore/`**: For maintenance, refactoring, or docs (e.g., `chore/update-contributing-md`).

**Always branch from the `dev` branch.**

## Pull Request (PR) Process

1.  **Ensure your local `dev` branch is up-to-date** (`git checkout dev; git pull origin dev`).
2.  **Create your feature/bugfix/chore branch** off `dev` following the naming convention (`git checkout -b features/your-branch-name`).
3.  **Do your work** and commit changes.
4.  **Push** your branch to GitHub (`git push origin features/your-branch-name`).
5.  **Create a Pull Request** targeting the **`dev` branch**.
6.  **Link the PR** to the corresponding task card/issue on the project board.
7.  **Request a review** from other collaborators.
8.  **Collaborate** on feedback/changes during the review.
9.  Once approved, the PR will be **merged** into `dev`.

---

Let's build something cool together!
