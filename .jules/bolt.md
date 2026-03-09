## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-13 - Date Sorting Performance
**Learning:** `Date` instantiation inside `.sort()` callbacks is an expensive anti-pattern in JS, leading to O(N log N) `Date` object creations. In this codebase, dates are stored in ISO format (e.g., `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm`), which makes them directly lexicographically sortable.
**Action:** Replace `new Date(a.date).getTime() - new Date(b.date).getTime()` with direct string comparison: `a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)` when dealing with ISO date strings to prevent expensive and unnecessary Date parsing overhead.
