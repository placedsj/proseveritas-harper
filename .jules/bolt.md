## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - ISO Date String Sorting
**Learning:** Using `new Date().getTime()` inside array `.sort()` comparators creates massive unnecessary object allocation overhead for arrays, significantly impacting rendering performance when components sort state on every update.
**Action:** When sorting arrays by ISO 8601 date strings, always use standard string comparison operators (`a < b ? -1 : (a > b ? 1 : 0)`) which are vastly faster than Date object instantiation and mathematically equivalent for this format.
