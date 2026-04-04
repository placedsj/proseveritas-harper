## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - Date Sorting Optimization
**Learning:** Sorting arrays of objects with ISO date strings via `new Date(a.date).getTime() - new Date(b.date).getTime()` creates unnecessary Date object allocations. However, `localeCompare` relies on the Intl API and is slower than Date allocation.
**Action:** Use basic string comparison operators (`a < b ? -1 : 1`) for ISO dates. This chronologically sorts the strings without object allocation AND without the heavy Intl API overhead.
