## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-04-13 - NavButton Accessibility Enhancements
**Learning:** Decorative icons inside interactive elements can confuse screen readers if not explicitly hidden, and visual-only focus indicators require explicit `focus-visible` classes for keyboard navigability.
**Action:** Always add `aria-hidden="true"` to decorative icons, `title` attributes to buttons, `aria-current` for active state, and comprehensive `focus-visible` ring classes to custom navigation elements.
