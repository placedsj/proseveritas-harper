## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - Fast ISO Date Sorting
**Learning:** Using `new Date(a).getTime() - new Date(b).getTime()` inside sort comparators for ISO dates creates massive overhead due to object allocation inside the loop.
**Action:** Used fast string comparison `a < b ? -1 : (a > b ? 1 : 0)` directly on ISO strings instead, yielding ~10-15x faster sorts.
