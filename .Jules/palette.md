## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2026-03-21 - Custom Navigation Elements Accessibility
**Learning:** Custom navigation elements require specific accessibility patterns for active states, hidden decorative icons, and keyboard focus.
**Action:** Use `aria-current="page"` for active items, `aria-hidden="true"` on icon elements to prevent redundant announcements, add `title` for tooltips, and implement `focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2` for keyboard accessibility.
