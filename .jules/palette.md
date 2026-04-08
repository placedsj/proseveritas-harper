## 2026-04-08 - [NavButton Accessibility Improvements]
**Learning:** Custom navigation elements need explicit ARIA states (`aria-hidden`, `aria-current`), title attributes for native tooltips, and `focus-visible` classes for keyboard accessibility.
**Action:** Always include `aria-hidden="true"` on decorative icons, `aria-current="page"` on active nav links, `title` attributes, and `focus-visible:ring` utilities on interactive custom navigation elements.
