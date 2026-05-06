## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2025-02-12 - Memoize NavButton Component
**Learning:** Passing globally changing state (like currentView) to every list item component breaks memoization and causes unnecessary re-renders across all items.
**Action:** Pass derived boolean props (e.g. isActive={view === target}) and wrap the component in React.memo to optimize re-renders.

## 2025-02-12 - Date Sorting Optimization
**Learning:** Creating Date objects inside array sort functions for ISO 8601 strings causes unnecessary object allocation and garbage collection overhead.
**Action:** Use direct string comparison operators (<, >) for chronological sorting of ISO 8601 formatted date strings.

## 2025-02-12 - Consistent Rounding Math
**Learning:** Deriving percentages from unrounded sums and using Number(val.toFixed(1)) introduces math inconsistencies and floating point quirks.
**Action:** Pre-round totals using Math.round(val * 10) / 10 and use the rounded totals for derived rate calculations.
