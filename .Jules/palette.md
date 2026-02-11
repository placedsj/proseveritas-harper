# Palette's UX Journal

## 2025-05-27 - Dashboard Navigation Accessibility
**Learning:** The dashboard used `div` elements with `onClick` handlers for primary navigation cards, making them inaccessible to keyboard users and screen readers.
**Action:** Replaced interactive `div`s with semantic `button` elements, ensuring proper tab order and keyboard activation (Enter/Space) while maintaining the visual design. Always check interactive elements for semantic correctness.
