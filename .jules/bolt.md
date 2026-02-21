## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.

## 2025-02-12 - Debounce State Sync
**Learning:** When separating input state (`query`) from search state (`debouncedQuery`), specific edge cases like "clearing to whitespace" can cause UI desynchronization if the immediate clear logic (`!query`) is less strict than the delayed search logic (`!debouncedQuery.trim()`).
**Action:** ensure both the immediate feedback loop (clearing results) and the delayed execution loop (fetching results) use identical validation logic (e.g., `.trim()`) to prevent stale states.
