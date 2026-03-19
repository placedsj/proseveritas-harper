## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2026-03-19 - Prevent Massive DOM Updates in Search
**Learning:** The `GlobalSearch` component previously set all matched search results to state without any limits. In a system like PLACED OS intended to hold large amounts of logs and evidence, a broad search query could match thousands of items. Rendering thousands of DOM nodes synchronously inside the search results list would cause severe main-thread blocking, UI freeze, and input lag when typing.
**Action:** Appended `.slice(0, 50)` after sorting the `searchResults` array before passing it to `setResults`. Limiting the rendered results to the top 50 matches ensures O(1) DOM rendering cost regardless of how many total matches are found in the dataset. This keeps the search UI highly responsive and prevents memory exhaustion.
