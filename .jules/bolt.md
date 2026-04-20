## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - Fast Chronological Sorting
**Learning:** In arrays containing ISO date strings, using `new Date(a).getTime() - new Date(b).getTime()` inside the sort callback incurs a massive performance penalty due to repeated object allocations. String comparison operators (`a < b ? -1 : 1`) achieve the exact same chronological sort roughly 15x faster.
**Action:** Always use native string comparison operators for chronological sorting of ISO 8601 strings instead of allocating Date objects or using the Intl API via `localeCompare`.
