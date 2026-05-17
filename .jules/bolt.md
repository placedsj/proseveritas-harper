## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-05-17 - React.memo on Navigation Items
**Learning:** `NavButton` items in `App.tsx` were receiving the global `currentView` string state, which caused all 16 navigation buttons to re-render whenever the view changed, breaking memoization.
**Action:** When using `React.memo` for list items or menu components, pass derived boolean props (e.g., `isActive`) instead of raw global state values (e.g., `currentView`) to prevent unnecessary re-renders.
