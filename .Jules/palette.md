## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-20 - Icon-Only Navigation Labels
**Learning:** Icon-only buttons (especially in mobile navs and search triggers) are invisible to screen readers without explicit labels.
**Action:** Always add `aria-label` to buttons that lack visible text, describing their specific destination or action.
