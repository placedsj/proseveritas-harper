## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-25 - GlobalSearch DOM Limitation
**Learning:** Returning all sorted search results to the DOM at once can cause significant main thread blocking and UI lag, especially if `localStorage` contains many entries.
**Action:** Implemented a `.slice(0, 50)` on the sorted search array before setting it to state in `GlobalSearch` to limit the number of rendered nodes.
