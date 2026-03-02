## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-02 - List Item Re-rendering Anti-pattern
**Learning:** `NavButton` elements were re-rendering unnecessarily because `App.tsx` passed the raw string state `view` to every list item as `currentView={view}`. Even if wrapped in `React.memo`, this approach defeats memoization since the prop value changes for *all* instances every time the state changes (from `'dashboard'` to `'harper-log'`), even if 14/16 buttons' actual visual state (inactive -> inactive) didn't change.
**Action:** Always derive boolean states (`isActive={view === 'target'}`) *before* passing them to list items. This ensures only the two buttons actually changing state (the old active and the new active) will see their props change, allowing `React.memo` to skip re-rendering the rest.
