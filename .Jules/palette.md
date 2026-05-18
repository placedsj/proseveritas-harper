## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.
## 2025-05-20 - Icon-Only Expand/Collapse Buttons Accessibility
**Learning:** Icon-only buttons used for toggling visibility states (like expand/collapse cards) are often completely opaque to screen readers and difficult to navigate with keyboards if they lack focus styling.
**Action:** Always pair `aria-label` with `aria-expanded` on toggle buttons, and include `focus-visible:ring-2` to provide clear keyboard navigation cues.
