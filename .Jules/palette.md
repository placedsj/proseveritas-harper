## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2024-04-13 - NavButton Accessibility Pattern
**Learning:** Custom navigation elements require explicit ARIA state (`aria-current="page"`), native tooltips (`title`), hidden decorative icons (`aria-hidden="true"`), and keyboard focus rings (`focus-visible`) to ensure full accessibility across screen readers and keyboard users.
**Action:** Apply this comprehensive accessibility pattern to all future navigation and tab-like components in the design system.
