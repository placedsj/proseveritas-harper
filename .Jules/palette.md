## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-20 - Custom Navigation Accessibility
**Learning:** Custom navigation buttons often miss screen reader active state and keyboard focus indicators.
**Action:** Always add aria-current="page" to active nav items and focus-visible classes for keyboard users.
