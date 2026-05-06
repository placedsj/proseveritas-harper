## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2026-05-06 - Icon-Only List Actions
**Learning:** Icon-only action buttons in list/card views (like Trash and Eye) frequently lack ARIA labels, focus-visible states, and tooltips, leaving screen-reader and keyboard users without context.
**Action:** Always add aria-label, title, and focus-visible:ring-2 to all icon-only buttons to ensure they are accessible to both screen readers and sighted users.
