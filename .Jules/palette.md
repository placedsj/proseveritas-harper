## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-21 - Icon-Only Button Accessibility
**Learning:** Icon-only buttons (like search toggles and mobile nav) are invisible to screen readers without explicit labels.
**Action:** Always add `aria-label` to icon-only buttons and use `aria-current="page"` for active navigation states.
