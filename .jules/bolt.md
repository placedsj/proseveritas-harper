## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - Set Lookups for Array Filtering
**Learning:** In EvidenceVault, checking 'selectedIds.includes(item.id)' inside a render map or bulk filter loop caused O(N^2) complexity. Array.includes is slow for large collections.
**Action:** Replaced 'string[]' state with 'Set<string>' and used '.has()' to achieve O(1) lookup performance during intensive rendering operations.
