## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-04-11 - ISO Date String Sorting
**Learning:** Sorting arrays of objects containing ISO date strings by creating `new Date(string).getTime()` inside the sort comparator function causes severe memory allocation overhead and execution slowness due to repeated object creation on every comparison operation in O(N log N) time complexity.
**Action:** When sorting arrays by ISO format dates, always use standard string comparison operators (e.g., `a < b ? -1 : (a > b ? 1 : 0)`) which execute in O(1) space, avoiding object instantiation and running much faster.
