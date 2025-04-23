# Coding Conventions

This document outlines the coding standards and practices for Project X/O.

## Socket.IO Event Naming

- Use the follow convention for naming events:

  - `room:create` - Room creation events
  - `game:move` - Game action events
  - `state:update` - State update events

- Use kebab-case for extended event names when needed:
  - `room:create-something`

## JavaScript/TypeScript Conventions

- Follow camelCase for variables and function names
- Always run `pnpm format` before making a commit
- Prefer `const` over `let` when variables won't be reassigned
- Use arrow functions for callbacks
- Use standard function declarations over function expressions:
  - `function myFn() {}` instead of `const myFn = () => {}` for named functions
- Always define explicit types where inference isn’t clear (avoid `any`)
- Always use named exports

## Folder and File Naming

- Use the conventions set by the team i.e. already being used
