## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2025-05-18 - Search Component Re-render Bottleneck
**Learning:** Massive DOM updates caused by unbounded rendering of searchResults leads to noticeable UI lag, particularly as the system's local storage data footprint grows. Setting an upper bound via slice limits list size prior to React state settlement.
**Action:** Enforce slicing limits (e.g., .slice(0, 50)) when projecting large unstructured local arrays to component state to constrain maximum render cycles and preserve search fluidity.
