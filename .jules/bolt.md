## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2026-05-10 - Memoization of Dynamic Lists
**Learning:** Passing globally changing state (like `currentView`) directly to every item in a list or menu breaks `React.memo`, causing O(N) re-renders for O(1) state changes.
**Action:** Pass derived boolean props (like `isActive`) evaluated at the parent level instead of raw global state values to preserve reference equality and memoization for unaffected components.
