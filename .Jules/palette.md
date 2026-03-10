## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.
## 2026-03-10 - Custom Navigation Accessibility
**Learning:** Custom navigation buttons in this app's sidebar need manual active state management and screen reader hiding for decorative icons. The standard pattern is `aria-current="page"` on active elements and `aria-hidden="true"` on inner Lucide icons.
**Action:** When creating new custom navigation elements, explicitly manage active states via ARIA, hide decorative icons, and include `focus-visible` ring styles for keyboard accessibility.
