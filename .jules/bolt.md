## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - Debounced Global Search
**Learning:** `GlobalSearch` was performing expensive synchronous filtering on every keystroke, causing potential UI lag.
**Action:** Implemented a reusable `useDebounce` hook (300ms delay) and applied it to the `GlobalSearch` query. This separates the input state (immediate feedback) from the search execution (delayed), significantly reducing the number of filtering operations.
