## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-20 - Navigation Button Accessibility
**Learning:** Custom navigation elements without native tooltips, active states, and keyboard focus indicators fail to provide sufficient context for screen readers and keyboard users.
**Action:** Explicitly hide decorative icons with `aria-hidden="true"`, manage active states using `aria-current="page"`, include `title` attributes for native tooltips, and ensure keyboard accessibility via `focus-visible` ring classes.
