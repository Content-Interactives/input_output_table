# Input–Output Table

React + Vite single-page interactive: students pick the correct output for each row of a three-row input–output table. The rule is shown on a central “machine” graphic; distractors are three shuffled numeric buttons.

**Curriculum and usage context:** see [Standards.md](./Standards.md).

---

## Stack

| Piece        | Role |
| ------------ | ---- |
| React 19     | UI |
| Vite 7       | Dev server and production build |
| Tailwind CSS | Layout and styling |
| canvas-confetti | Celebration after all three rows are correct |
| gh-pages     | Static deploy to GitHub Pages |

Source is **JavaScript (JSX)**, not TypeScript (only `@types/react` in devDependencies).

---

## Repository layout

| Path | Purpose |
| ---- | ------- |
| `src/main.jsx` | React root |
| `src/App.jsx` | Renders `InputOutputTable` |
| `src/components/InputOutputTable.jsx` | State, problem generation, answer flow, table + buttons |
| `src/components/Machine.jsx` | Rule column UI (gear, lights, funnels, rule label) |
| `src/components/Machine.css` | Step offsets, gear spin, shake, spit animations |
| `src/components/ui/reused-ui/` | Shared `Container`, sound control, etc. |
| `src/components/ui/reused-animations/fade.css` | Button fade classes |
| `vite.config.js` | `base: '/input_output_table/'` for GitHub Pages |
| `tailwind.config.js`, `postcss.config.js` | Tailwind pipeline |

---

## Runtime behavior

1. **Mount:** `generateTable()` runs once (`useEffect` with `[]`).
2. **Inputs:** One of five triples is chosen—85% from “common” sets `[1,2,3]`, `[0,1,2]`, `[2,3,4]`; 15% from `[1,3,5]` or `[2,4,6]`.
3. **Rule:** Multiplier uniform in **1–5**. Constant term uniform in **[-9, 9]** excluding **0** (if 0 is drawn, replaced with ±1). Rule string format: `{m}x + {n}` or `{m}x - {n}` (e.g. `3x + 4`).
4. **Outputs:** `y = m * x + constant` for each input in the chosen triple.
5. **Per row:** Three choices—correct value, value using **negated** constant (`m*x - c` vs `m*x + c`), and correct ± (1–3) with random sign—then **Fisher–Yates shuffle**.
6. **Correct click:** Green light, input/output “spit” animations, fade-out on buttons, reveal that row’s `?`, advance `currentStep` or finish round. **Wrong click:** Red light, shake on that button.
7. **Round complete:** Confetti, “Great Job!” ~3s, then `generateTable()` resets everything.

`generateChoices` parses the rule with regex `/(\d+)x\s([+-])\s(\d+)/`—multipliers are single-digit in current generation (1–5).

---

## Scripts

```bash
npm install
npm run dev      # local dev
npm run build    # output in dist/
npm run preview  # serve dist locally
npm run deploy   # gh-pages from dist/ (runs predeploy build)
```

---

## Deployment / base path

Production assumes hosting at:

`https://content-interactives.github.io/input_output_table/`

Asset paths rely on Vite `base: '/input_output_table/'`. For another path, change `base` in `vite.config.js` and redeploy.

---

## Embedding

Use the deployed URL in an iframe (or LMS embed) as needed. No query parameters or postMessage API is implemented; state is entirely client-side.

---

## Maintenance notes

- **`useRef`** is imported in `InputOutputTable.jsx` but unused; **`lightColor` / `setLightColor`** are unused (a `lightColor` prop is passed to `Machine` but `Machine` does not read it). Safe cleanup targets for lint-hygiene.
- **Duplicate distractors:** The three choices are not deduplicated; rare collisions are possible.
- **`generateChoices`** is also invoked from `generateTable` via `setTimeout(..., 0)` and from a `useEffect` on `[currentStep, outputs, generateChoices]`—worth knowing when debugging timing or double-generation.
