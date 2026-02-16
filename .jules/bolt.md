## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-02-16 - Search Filtering Debounce
**Learning:** Even with in-memory caching, filtering large datasets via regex on every keystroke blocked the main thread, causing typing lag.
**Action:** Implemented a custom `useDebounce` hook to decouple the input state from the expensive filtering logic, updating results only after 300ms of inactivity.
