## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.

## 2025-05-20 - Custom Navigation Component Accessibility
**Learning:** Custom navigation elements built with generic buttons or divs often lack native semantics for their active state (e.g., screen readers cannot distinguish which view is currently selected), native tooltips, and clear focus indicators for keyboard navigation. Additionally, decorative icons within these buttons can create redundant or confusing announcements for screen reader users.
**Action:** When creating custom navigation components (like `NavButton`), explicitly use `aria-current="page"` to denote the active state, `aria-hidden="true"` to hide decorative icons, `title` attributes to provide native tooltips, and incorporate `focus-visible` styling (e.g., `focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2`) to ensure accessible keyboard navigation.
