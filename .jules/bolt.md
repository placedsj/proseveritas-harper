## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-05 - Avoid Date Parsing for ISO 8601 Sorting
**Learning:** Instantiating Date objects (e.g., new Date().getTime()) during array sorting is a significant performance bottleneck due to continuous allocation and garbage collection. Native string comparison is drastically faster (~18x faster measured) for ISO 8601 format dates, while achieving the exact same chronological order.
**Action:** Always use direct string comparison operators (<, >) for sorting objects by ISO 8601 formatted timestamps instead of parsing them into Date objects.
