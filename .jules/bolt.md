## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2024-05-18 - Optimize array sorting for ISO date strings
**Learning:** Using `new Date().getTime()` in array sorting callbacks incurs significant object allocation overhead. String comparison on ISO date strings (`a < b ? -1 : (a > b ? 1 : 0)`) is drastically faster since ISO 8601 strings sort chronologically by default.
**Action:** Avoid `new Date().getTime()` during array sorts and default to string comparison when sorting arrays containing ISO date strings.
