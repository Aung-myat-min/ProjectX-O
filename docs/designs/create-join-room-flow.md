# Design 1: MVP Game Flow

This document outlines the backend design for the Minimum Viable Product (MVP) of the Real-Time Tic-Tac-Toe game.

It details the complete sequence of Socket.IO events, state management using Redis, and server-side logic for:

- Initial user connection.
- Room creation and joining.
- Core game loop: Handling player moves, validating turns, updating the board state, and checking for win/draw conditions.
- Ending the match and emitting the final state.

_(Note: Advanced validation messages and disconnection handling are considered outside the scope of this initial MVP design)._

---

<img src="./assets/mvp-game-flow.png" alt="Diagram showing the complete MVP game flow" width="100%">
