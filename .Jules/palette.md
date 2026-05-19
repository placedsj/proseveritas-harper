## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2026-05-19 - Accessible Icon-Only Buttons
**Learning:** Discovered icon-only verification buttons in evidence processor missing accessible names and clear keyboard focus indicators, impairing screen reader use and keyboard navigation.
**Action:** Always add aria-label, title, and explicit focus-visible styles (like focus-visible:ring-2) to interactive icons to ensure equitable access.
