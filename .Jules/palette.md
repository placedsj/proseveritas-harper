## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-21 - Modal Accessibility
**Learning:** Search modals are often invisible to screen readers without explicit role="dialog" and aria-modal="true".
**Action:** Always wrap modal overlays in role="dialog" and ensure the trigger button has an accessible label.
