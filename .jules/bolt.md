## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-10-24 - Date Object Allocation in Search Filters
**Learning:** Parsing `new Date()` inside iteration loops (like `matchesDateFilters` running thousands of times during global search) creates massive object allocation and garbage collection overhead. ISO 8601 date strings sort chronologically.
**Action:** Always pre-compute ISO string representations for dates outside of iteration loops and use direct string comparison operators (`<`, `>`) instead of instantiating `Date` objects inside the loop.
