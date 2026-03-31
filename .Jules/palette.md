## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-20 - Custom Navigation Accessibility
**Learning:** Custom navigation elements need explicit active states, hidden decorative icons, and visible focus rings.
**Action:** Use `aria-current="page"` for active state, `aria-hidden="true"` on icons, `title` for tooltips, and `focus-visible` classes.
