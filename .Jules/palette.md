## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.
## 2026-05-09 - ARIA labels for icon-only buttons
**Learning:** Icon-only buttons (like Trash or X icons) lacking accessible names are a common pattern in the app's components.
**Action:** Always verify icon-only buttons have an `aria-label` attribute describing their action (e.g., 'Delete entry', 'Close modal') to ensure screen reader accessibility.
