## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-21 - Form Validation & Accessibility
**Learning:** Forms with unassociated labels block screen readers and make automated testing brittle (can't use `getByLabelText`).
**Action:** Always link labels to inputs with `htmlFor` + `id`, and disable submit buttons until required fields are valid to provide clear feedback.
