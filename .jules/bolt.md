## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - Array Sorting Object Allocations
**Learning:** Sorting arrays by ISO date strings using new Date().getTime() causes massive object allocation overhead, especially inside React useMemo hooks.
**Action:** Avoid object allocations by using standard string comparison operators (e.g., a < b ? -1 : (a > b ? 1 : 0)) for chronological sorting of ISO strings.
