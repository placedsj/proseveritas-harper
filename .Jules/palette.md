## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2026-04-14 - Custom Navigation Accessibility
**Learning:** Custom navigation elements need explicit accessibility attributes to be properly usable by assistive technologies.
**Action:** Explicitly hide decorative icons with aria-hidden="true", manage active states using aria-current="page", include title attributes for native tooltips, and ensure keyboard accessibility via focus-visible ring classes.
