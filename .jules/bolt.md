## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-05 - NavButton re-renders
**Learning:** React.memo with a custom equality function is necessary to prevent re-renders when a prop updates globally across many components.
**Action:** Implemented React.memo on NavButton, using a custom equality function to ensure it only re-renders when it becomes active or inactive, or when other specific props (label, target, icon) change.
