## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-05-20 - Optimizing NavButton with React.memo
**Learning:** React re-renders all children when parent state changes. When `view` changes in `App.tsx`, all 16 `NavButton`s re-render, even those that haven't changed state, because `currentView={view}` passes a global state to each child.
**Action:** Use `React.memo` for list/menu items and pass a derived boolean `isActive` (e.g., `isActive={view === 'dashboard'}`) instead of the raw global state `currentView={view}`. This ensures only the old and new active items re-render.
