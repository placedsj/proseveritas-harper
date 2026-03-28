## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-20 - Navigation Link Accessibility
**Learning:** Custom sidebar buttons mimicking standard tabs or links must manually manage their state and visual indicators to be accessible to keyboard and screen-reader users.
**Action:** When creating custom `<button>` elements for global navigation, ensure decorative `<Icon>` elements are hidden with `aria-hidden="true"`, native tooltips use `title`, active state is conveyed via `aria-current="page"`, and explicit focus rings are added using `focus-visible` classes.
