## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## YYYY-MM-DD - React.memo Optimization for NavButton
**Learning:** Passing globally changing state to every list item component breaks memoization and causes unnecessary re-renders across the entire list.
**Action:** Use React.memo and pass derived boolean props calculated at the parent level, rather than raw global state values, to ensure only the changed components re-render.
