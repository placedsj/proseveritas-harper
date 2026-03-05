## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - Date Instantiation in GlobalSearch Loop
**Learning:** Parsing dates inside an O(N) filter loop causes massive performance degradation on every keystroke, especially since search runs on thousands of elements. Furthermore, the previous implementation failed entire searches if a single invalid date filter string was typed.
**Action:** Always pre-compute and validate user input filters (like Date objects) outside of the main filtering loop to improve both time complexity and error resilience.
