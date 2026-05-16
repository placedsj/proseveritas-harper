## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2026-05-16 - React.memo with global state breaks memoization
**Learning:** Passing a global state variable (like `currentView`) into `React.memo` components in a list breaks memoization entirely. When `currentView` changes, the prop changes for ALL items in the list, causing an O(n) re-render instead of O(1).
**Action:** Always derive the boolean state (e.g., `isActive={view === target}`) in the parent and pass that instead. This ensures only the two components that actually change state (the old active one and the new active one) are re-rendered.
