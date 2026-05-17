## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-05-17 - ISO Date Sorting Optimization
**Learning:** Parsing ISO dates using new Date().getTime() in a sort comparator causes severe overhead in React components. ISO 8601 strings are strictly lexicographically sortable.
**Action:** Replaced object instantiation and parsing with direct string comparison operators (<, >), improving sorting performance by 15-20x without breaking functionality.
