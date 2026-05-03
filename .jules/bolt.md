## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-05-20 - Fast ISO 8601 String Comparison
**Learning:** Parsing dates to numbers via `new Date(str).getTime()` for sorting ISO 8601 strings causes unnecessary object allocation and garbage collection overhead.
**Action:** Use direct string comparison operators (e.g., `a < b ? -1 : 1`) to evaluate and sort ISO 8601 date strings, achieving the same result natively and avoiding object overhead.
