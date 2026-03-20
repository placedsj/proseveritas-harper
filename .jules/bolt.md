## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2026-03-20 - Chunking synchronous local storage operations
**Learning:** Synchronously reading and parsing massive `localStorage` datasets on component mount blocks the main thread, resulting in a frozen UI and delayed time-to-interactive.
**Action:** Replaced synchronous execution with an `async` function yielding to the main thread via `await new Promise(resolve => setTimeout(resolve, 0))` between each array parse, allowing the initial render to paint smoothly before blocking operations complete.
