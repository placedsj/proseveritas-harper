## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-21 - Navigation Accessibility
**Learning:** Mobile navigation relied solely on icons without text labels, making it inaccessible to screen readers.
**Action:** Enforce `aria-label` on all icon-only buttons and use `aria-current="page"` to indicate active state in navigation components.
