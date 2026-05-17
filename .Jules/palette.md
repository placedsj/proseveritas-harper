## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.
## 2024-05-18 - Missing ARIA labels on Icon-only buttons
**Learning:** Found an accessibility issue pattern in the app's components: icon-only buttons (like close buttons) frequently lack ARIA labels, making them inaccessible to screen readers, and often lack keyboard focus styles.
**Action:** Always verify presence of `aria-label` and `focus-visible` states when working with icon-only buttons (`lucide-react` icons wrapped in `<button>`) across the application.
