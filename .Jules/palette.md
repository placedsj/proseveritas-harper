## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-21 - Form Label Association
**Learning:** Input fields often lack associated labels, relying on visual proximity which fails for screen readers.
**Action:** Always verify form inputs have corresponding `id`s and `htmlFor` attributes on labels, or use `aria-label` where visual labels are absent.
