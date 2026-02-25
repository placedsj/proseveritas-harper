## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-23 - Form Field Accessibility
**Learning:** Labels not associated with inputs fail accessibility tests and make interaction difficult for screen reader users.
**Action:** Use `htmlFor` on `<label>` and matching `id` on `<input>` to programmatically associate them.
