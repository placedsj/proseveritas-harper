## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-03-01 - Derived State and useMemo
**Learning:** React components (like `GlobalSearch`) calculating derived data with `useState` and `useEffect` cause unnecessary double-renders (state changes trigger another render). Also, modals left in the main render tree are re-rendered frequently unless memoized.
**Action:** Use `React.useMemo` to calculate data synchronously during render without causing additional state updates. Use `React.memo` to skip re-renders when parent components update unrelated props.
