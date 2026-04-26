## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - ISO Date Sorting Optimization
**Learning:** Sorting ISO 8601 string dates by parsing them into Date objects and calling getTime() in loops creates significant object allocation and GC overhead.
**Action:** Compare ISO 8601 string dates directly using string comparison operators (<, >) when sorting. It achieves the same chronological sorting over 10x faster.
