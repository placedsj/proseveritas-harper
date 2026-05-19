## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2026-05-19 - NavButton Re-renders
**Learning:** Passing global state (`currentView`) into repeated list items (`NavButton`) breaks `React.memo` because the prop changes for *all* buttons whenever the view changes, even though only two buttons' visual state actually changes (the old active button and the new active button).
**Action:** Always compute an `isActive` boolean derived from global state *before* passing it as a prop to a memoized list item component.
