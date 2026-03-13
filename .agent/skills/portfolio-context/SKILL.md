---
name: portfolio-context
description: application architecture and component context for the Portfolio project
---

# Portfolio Context Skill

This skill provides the technical context for the Portfolio application, which features a dual-mode interface: a Linux-like terminal and a modern, rich UI.

## Architecture Overview

The application is built with React and Vite, using a transition-based architecture. It starts in a terminal interface and transitions to a graphical UI upon user confirmation.

### Key Components

- **Terminal.tsx**: The entry point component. It simulates a terminal environment with auto-typing commands and an interactive prompt.
- **Rich UI**: (To be documented further as development progresses) The graphical interface that loads after the terminal phase.

## Transition Logic

1. **Auto-typing Phase**: The terminal automatically runs a sequence of commands defined in `Terminal.tsx`.
2. **Interactive Phase**: The user is prompted to see "all information" (Y/n).
3. **Loading Phase**: If confirmed, a simulated loading bar appears.
4. **Completion**: The `onComplete` callback is triggered, switching the application state to the rich UI.

## Maintenance Instructions

- When adding new commands to the terminal, update the `commands` array in `Terminal.tsx`.
- Terminal styles are located in `index.css`.
- Rich UI styles are located in `styles/modern.css`.
- Ensure any new global styles in `index.css` do not conflict with the specific aesthetics of either mode.
