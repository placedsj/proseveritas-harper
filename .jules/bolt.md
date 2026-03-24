## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-24 - Search Results Rendering Optimization
**Learning:** Rendering hundreds of `SearchResult` items during broad search queries causes noticeable UI lag due to massive DOM updates. The `GlobalSearch` component wasn't limiting the number of displayed results.
**Action:** Implemented a `.slice(0, 50)` limit on the sorted search results array before setting it in state. This bounds the maximum DOM nodes created, ensuring smooth performance even with large datasets.
