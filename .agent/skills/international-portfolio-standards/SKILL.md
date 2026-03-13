---
name: international-portfolio-standards
description: Guidelines for maintaining and evolving the portfolio to international competition standards (Refined architecture, i18n, design tokens, and modular components).
---

# International Portfolio Standards Skill

This skill defines the engineering and design principles required to transform this project into a world-class portfolio.

## 1. Architectural Principles
- **Feature-Based Modularization**: Code must be organized by domain (e.g., `features/terminal`, `features/portfolio`) rather than generic types like `components`.
- **Separation of Concerns**: UI components should not handle business logic or data fetching. Use custom hooks and stores for state management.
- **Layered Architecture**:
  - **Core**: Global hooks, stores, and constants.
  - **Shared**: Atomic UI components, layouts, and utilities.
  - **Features**: Domain-specific logic and views.

## 2. Engineering Standards
- **Global State**: Use `Zustand` for cross-cutting concerns like Language, Theme, and Navigation State.
- **i18n (Internationalization)**:
  - Translations must be externalized to JSON/dictionaries.
  - Avoid hardcoding strings in components.
  - Use the `useTranslation` hook to access localized content.
- **Micro-Animations**: Use `framer-motion` for all visual transitions, ensuring they are orchestrated via `staggerChildren` and `AnimatePresence`.

## 3. Design & UI Standards
- **Design Tokens**: All colors, spacing, and typography must reference CSS variables defined in `:root`.
- **Glassmorphism 2.0**: Use `backdrop-filter: blur()`, `rgba` backgrounds, and subtle `1px` borders for depth.
- **Responsive Excellence**: Use `clamp()` for fluid typography and `container-query` logic where applicable.
- **Bento Grid**: Use asymmetrical grids for content-heavy sections like Projects.

## 4. Performance & UX
- **Smooth Scrolling**: Integrate `Lenis` or similar for premium scroll feel.
- **Optimized Assets**: All images should be lazy-loaded or use modern formats (WebP/AVIF).
- **Interactive Feedback**: Every user action (hover, click, scroll) must have a subtle micro-interaction.

## 5. Implementation Workflow
1. **Infrastructure**: Set up folders and global store.
2. **Modularization**: Break down monolithic components into smaller, reusable pieces.
3. **i18n Migration**: Move all hardcoded text to the store/dictionaries.
4. **Visual Polish**: Apply design tokens and advanced animations.
