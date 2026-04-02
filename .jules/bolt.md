## 2025-02-12 - App Component Size
**Learning:** `App.tsx` imported all route components statically, causing the entire application to be bundled into the initial load.
**Action:** Implemented `React.lazy` and `Suspense` for all non-critical routes. Default exports work out of the box, but named exports like `MedicalRecords` require `.then(module => ({ default: module.NamedExport }))`.

## 2025-02-12 - Synchronous Storage in Search
**Learning:** `GlobalSearch` was reading and parsing multiple `localStorage` items on every keystroke, causing significant input lag.
**Action:** Cache data in component state when the search modal opens (`isOpen` becomes true), and filter the cached data instead of reading from storage repeatedly.
## 2025-02-12 - Massive DOM Updates in Global Search
**Learning:** The GlobalSearch component loads multiple large localStorage datasets into memory and filters them. Without virtualization, broad queries return massive arrays, causing severe UI lag due to massive DOM updates.
**Action:** Always limit rendered results by slicing the sorted search array (e.g., `.slice(0, 50)`) before setting it to state.
