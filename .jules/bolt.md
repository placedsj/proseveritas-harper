## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2025-05-19 - Removed reduce chaining and simplified encodeURI to encodeURIComponent
**Learning:** Found several `reduce` chained operations that can be made significantly faster in React `useMemo` hooks by converting them to standard `for` loops, as well as an issue with CSV generation causing data truncation.
**Action:** Always replace `.reduce` with `for` loops inside performance-critical data calculation sections. Also `encodeURIComponent` should be used instead of `encodeURI` for data uris.
