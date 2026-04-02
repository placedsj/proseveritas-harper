## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2025-04-02 - [Preventing massive DOM updates in GlobalSearch]
**Learning:** Rendering too many DOM elements at once blocks the main thread and causes severe lag, especially during real-time search filtering. The cost isn't sorting the large array; the bottleneck is React creating thousands of DOM nodes.
**Action:** Always slice massive result arrays (e.g., `.slice(0, 50)`) before setting them to local state for rendering lists.
