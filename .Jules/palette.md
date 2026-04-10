## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2023-10-25 - Navigation Accessibility
**Learning:** Custom navigation buttons need explicit `aria-current="page"` to convey active state to screen readers, as visual cues (like color changes) are not programmatically exposed.
**Action:** Always pair visual active states with `aria-current="page"` and add `focus-visible` styles for keyboard navigation in custom nav components.
