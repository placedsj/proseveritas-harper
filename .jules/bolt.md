## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-04-19 - Optimizing ISO Date Sorting Allocations
**Learning:** Sorting arrays containing ISO date strings by creating new Date objects inside the sort comparator causes severe performance overhead due to O(N log N) object allocations. Standard string comparison operators provide the fastest chronological sorting for ISO formats.
**Action:** Always use string comparison operators for ISO 8601 date strings to prevent expensive object allocations during sorting operations.
