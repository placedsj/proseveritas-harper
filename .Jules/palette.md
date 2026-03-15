## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.
## 2026-03-15 - Custom Navigation Elements Accessibility
**Learning:** Custom navigation elements (like sidebar buttons or mobile bottom navs) require explicit `aria-hidden="true"` on decorative icons, `aria-current="page"` on active states, and keyboard accessibility via `focus-visible` ring styles.
**Action:** Apply `aria-hidden="true"` to icons, `aria-current={isActive ? 'page' : undefined}`, and use `focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2` on the buttons.
