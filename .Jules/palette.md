## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2024-05-21 - Custom Navigation Element Accessibility
**Learning:** Custom navigation elements can lack critical context for screen readers and keyboard users.
**Action:** Explicitly hide decorative icons with `aria-hidden="true"`, manage active states using `aria-current="page"`, include `title` attributes for native tooltips, and ensure keyboard accessibility via `focus-visible` ring classes.
