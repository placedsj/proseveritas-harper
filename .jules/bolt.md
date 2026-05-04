## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-05-04 - ISO Date Sorting Bottleneck
**Learning:** The codebase frequently sorts arrays by parsing ISO 8601 date strings into Date objects. This causes significant object allocation and GC overhead inside sort callbacks, acting as an anti-pattern when sorting lists.
**Action:** Use direct string comparison operators for ISO 8601 strings to achieve identical chronological sorting ~20x faster without memory bloat.
