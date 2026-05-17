## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-05-17 - Optimized ISO Date Sorting & Component Memoization
**Learning:** Parsing `Date` objects (`new Date(dateStr).getTime()`) inside sorting functions or list iteration is computationally expensive and scales poorly. Similarly, passing whole state variables (like `currentView`) to deeply nested child components (`NavButton`) breaks `React.memo` and causes unnecessary layout recalcs across the entire app on every route change.
**Action:** When dates are reliably formatted as ISO 8601 strings (`YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`), always use native string comparison (`a > b ? 1 : a < b ? -1 : 0`) instead of `new Date()`. For list items or navigation components, pass derived primitive booleans (e.g., `isActive={view === target}`) rather than global state strings to ensure `React.memo` works effectively.
