
## 2026-03-09 - [Navigation Accessibility Pattern]
**Learning:** Discovered a consistent a11y gap across custom navigation components in this app (NavButton, mobile nav): they lacked standard ARIA state management (`aria-current`) for active states and proper explicit hiding of decorative icons (`aria-hidden`), relying solely on visual styling.
**Action:** When implementing new custom interactive elements or navigation tools in this project, explicitly verify that decorative icons use `aria-hidden` and state attributes like `aria-current` are managed programmatically to ensure robust screen reader context alongside focus styles.
