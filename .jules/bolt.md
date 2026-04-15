## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-04-15 - ISO Date Sorting Optimization
**Learning:** Sorting arrays containing ISO date strings by converting them to Date objects (`new Date(a).getTime() - new Date(b).getTime()`) creates a massive performance bottleneck due to thousands of expensive object allocations. Native string comparison is ~28x faster (6ms vs 191ms for 10k items) and produces identical chronological results.
**Action:** Always use string comparison operators (e.g., `a < b ? -1 : (a > b ? 1 : 0)`) when sorting ISO 8601 date strings to avoid unnecessary memory allocation.
