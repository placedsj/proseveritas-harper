## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - Date Parsing in Search Loops
**Learning:** `GlobalSearch` was creating a new `Date` instance for every item in the search results during filtering, even when no date filters were active. This caused unnecessary garbage collection and input lag. Furthermore, it parsed `filters.from` and `filters.to` repeatedly on every element.
**Action:** Cached the parsed filter dates (`filters.from` and `filters.to`) outside the main filtering loop and returned early from the date checking logic when no date filters are present.
