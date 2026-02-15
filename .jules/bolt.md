## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - Sidebar Re-render Cascade
**Learning:** Passing frequently changing state (like `currentView`) to child components (`NavButton`) caused the entire sidebar to re-render on every navigation, even for buttons that didn't visually change.
**Action:** Pass derived boolean props (e.g., `isActive`) instead of raw state, and use `React.memo` to prevent updates when props are stable.
