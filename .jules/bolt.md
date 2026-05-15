## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - Optimize NavButton Rendering with React.memo
**Learning:** Passing globally changing state (like the current active view) down to every list item component breaks memoization and causes all items to re-render whenever the global state changes.
**Action:** Wrapped NavButton in React.memo and passed a derived boolean isActive prop instead of the raw global state, ensuring only the affected buttons re-render during navigation.
