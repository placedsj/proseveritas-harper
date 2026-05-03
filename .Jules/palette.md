## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.
## 2026-05-03 - GlobalSearch Keyboard Accessibility
**Learning:** The global search modal was missing an Escape key listener. When implementing full-screen or modal search overlays in React, it is critical to attach a global keydown listener to provide a standard keyboard exit path, as users expect to dismiss overlays without reaching for the mouse or a close button.
**Action:** Ensure all custom modals, dialogs, and overlays include a global keydown event listener that triggers the onClose handler when the Escape key is pressed.
