## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2024-04-11 - Custom Navigation Element Accessibility
**Learning:** Custom navigation elements require explicit accessibility attributes (aria-current, aria-hidden, title) and focus-visible classes for keyboard users.
**Action:** Always hide decorative icons with aria-hidden="true", manage active states using aria-current="page", provide title tooltips, and add focus-visible ring classes.
