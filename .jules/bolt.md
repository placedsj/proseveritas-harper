## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-04-12 - Optimized Array Sorting Performance
**Learning:** Using `new Date().getTime()` within `.sort()` comparators causes heavy object allocation and overhead.
**Action:** Replaced date instantiation with direct string comparison operators (e.g., `a < b ? -1 : (a > b ? 1 : 0)`) for ISO date strings to ensure O(1) memory access and avoid unnecessary object creation on render.
