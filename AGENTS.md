# AI Reading Skills (Token-Efficient)

Purpose: Help AI agents complete tasks in this repo with minimal token usage while preserving output quality.

## Project Snapshot
- Stack: Next.js app router + React + Tailwind + GSAP + Zustand.
- Main code: `src/app/`.
- State: `src/app/store/`.
- UI components: `src/app/components/`.
- Window apps: `src/app/windows/`.
- Config/constants: `src/app/constants/`.
- Styles: `src/app/styles/`.

## Read Strategy (Strict)
1. Read `README.md` first.
2. Locate files with targeted search before opening content.
3. Read only relevant files.
4. Read in small windows first (top ~120 lines), then expand only if needed.
5. Do not re-read unchanged files.
6. Prefer symbol/pattern search over full-file reads.

## Search Heuristics
- UI behavior: inspect `src/app/components/**/*` and `src/app/pages/**/*`.
- Window logic/content: inspect `src/app/windows/**/*`.
- Global/system behavior: inspect `src/app/store/**/*`.
- Labels, icons, links, app metadata: inspect `src/app/constants/**/*`.
- Styling/theming/layout issues: inspect `src/app/styles/**/*`, `src/app/layout.js`, `src/app/page.js`.

## Token Budget Rules
- Default budget per task: <= 1,500 input lines read.
- Hard cap before implementation: <= 8 files unless task demands more.
- For broad refactors:
  - Map with search first.
  - Edit only matched files.
  - Avoid exploratory reads after scope is clear.

## Edit Rules
- Keep changes minimal and local.
- Preserve existing patterns (naming, file placement, state shape).
- Avoid introducing new dependencies unless required.
- Avoid unrelated formatting churn.

## Validation Rules
- Run only the smallest relevant check first.
- Prefer targeted checks over full builds during iteration.
- Use full build only as final verification when needed.

## Output Rules
- Return concise results:
  - What changed
  - Why
  - File paths touched
  - Quick verification result
- Do not paste large code blocks unless requested.

## Fast Task Playbooks

### 1) Add/Edit a window app
- Read: `src/app/constants/appsList.js`, `src/app/constants/windowsConfig.js`, target file in `src/app/windows/`, and `src/app/windows/index.js`.
- Then edit only those files.

### 2) Update dock/nav behavior
- Read: `src/app/components/Dock.jsx`, `src/app/components/navbar/*`, relevant store files.
- Edit minimally; avoid touching unrelated window content.

### 3) Fix open/close/focus/z-index bugs
- Read: `src/app/store/window.js`, `src/app/hoc/WindowWrapper*`, `src/app/pages/Desktop.jsx`.
- Trace state flow first; patch one layer at a time.

### 4) Theme or style adjustments
- Read: `src/app/styles/globals.css`, `src/app/styles/components.css`, relevant component file.
- Keep utility/style conventions already used in repo.

## Stop Conditions
- If scope is ambiguous, propose one default approach and proceed.
- Ask only when blocked by missing external values/secrets.
