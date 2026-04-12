## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-04-12 - Custom Navigation Element Accessibility
**Learning:** Custom navigation elements require explicit management for active states and keyboard accessibility since they lack native link behaviors.
**Action:** Added `aria-current="page"`, `aria-hidden="true"` on decorative icons, `title` attributes for tooltips, and `focus-visible` ring classes to `NavButton` to meet a11y standards.
