## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - Optimize NavButton Re-renders
**Learning:** Passing global state (`currentView={view}`) to every `NavButton` component forces all buttons to re-render whenever the view changes, defeating potential memoization.
**Action:** When using `React.memo` for list items or navigation components, pass a derived boolean prop (e.g., `isActive={view === target}`) instead of raw global state to prevent unnecessary re-renders.
