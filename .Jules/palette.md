## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-20 - Custom Navigation Accessibility
**Learning:** Custom navigation elements lack native tooltip hints, proper active state semantics (`aria-current`), and clear keyboard focus rings by default.
**Action:** Always include `aria-current="page"` for active states, `title` attributes for tooltips, `aria-hidden="true"` on decorative icons, and `focus-visible` ring classes for custom navigation elements.
