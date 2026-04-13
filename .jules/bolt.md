## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - Sync Storage Bottleneck
**Learning:** Parsing `localStorage` for multiple large items synchronously in a single render path (like `Dashboard.tsx` or `GlobalSearch.tsx`) causes significant UI blocking, even when using fallback `[]` strings on misses. The allocation overhead of `JSON.parse` is the true culprit, not the subsequent array operations.
**Action:** Avoid calling `JSON.parse` completely if the `localStorage.getItem` returns null. This safely skips both the expensive parse and the array iteration for empty data.
