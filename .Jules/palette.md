## 2026-02-10 - Improving Navigation Accessibility
**Learning:** Icon-only navigation buttons are invisible to screen readers without `aria-label`, and active states need `aria-current` to be perceivable beyond color.
**Action:** Always audit icon-only buttons for `aria-label` and use `aria-current="page"` for active navigation links. Add `focus-visible` styles to ensure keyboard users can see where they are.
