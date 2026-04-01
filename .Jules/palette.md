## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.
## 2024-05-15 - Spiral Journal Icon Accessibility
**Learning:** Icon-only delete buttons in nested forms like SpiralJournal lack screen-reader context and visual tooltips, causing confusion for both keyboard users and hover states. Focus rings are also sometimes missed when tabbing.
**Action:** When adding icon-only actions to lists, always add `aria-label`, `title` attributes, and `focus-visible:ring-2` to ensure proper accessibility for all input modes.
