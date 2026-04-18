## 2025-05-20 - Interactive Cards Accessibility
**Learning:** Clickable cards implemented as `div`s are not keyboard accessible.
**Action:** Use `<button>` elements for interactive cards, ensuring `w-full text-left` classes are applied to maintain layout.
## 2024-05-24 - Interactive Elements Missing Context
**Learning:** Icon-only buttons (like Plus or Trash icons) in task lists are frequently missing ARIA labels and title attributes, making them inaccessible to screen readers and lacking tooltip context for general users.
**Action:** Always add descriptive `aria-label` and `title` attributes to icon-only interactive elements to ensure inclusive and intuitive UX.
