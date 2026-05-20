## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-05-20 - React.memo Optimization
**Learning:** Passing global changing state (like currentView) to every child component breaks memoization and causes unnecessary re-renders. By passing derived boolean props (isActive), we can use React.memo to prevent 15 out of 16 components from re-rendering on view change.
**Action:** Use derived boolean props instead of raw global state for list items or menu components to preserve memoization effectiveness.
