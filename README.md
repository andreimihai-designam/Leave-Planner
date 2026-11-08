# JARVIS Leave Planner

A Romanian-language leave planner that runs in the browser. The portfolio demo opens with an empty register.

## What it does

- Plans leave by day or date range in a responsive calendar.
- Calculates deductible days across years, skipping weekends and Romanian statutory holidays. Movable holidays use Orthodox dates.
- Automatically allocates 7 days in 2026 and 20 days at the start of every year from 2027. Uses the previous year's remaining days first for leave through May 31, inclusive.
- Supports editing, duplication, cancellation with history, soft deletion, and restoration.
- Stores records in the current browser with JSON export and import.

## Run locally

Open `index.html` in a browser. Keep the `local/` folder next to it. The app uses plain HTML, CSS, and JavaScript and needs no build step, account, or backend. Records have no app-imposed expiration and survive ordinary browser restarts. The app requests persistent storage on save where supported. Browser storage is scoped to the browser profile and the location where the app is opened. Use JSON backup to transfer records or protect them from browser data clearing.

## Project structure

| Path | Purpose |
|---|---|
| `index.html` | Page structure and leave form |
| `local/app.js` | Calendar UI, leave operations, annual balances, and carryover |
| `local/calendar.js` | Working days and holiday calculations |
| `local/storage.js` | Versioned browser storage and backup validation |
| `local/obsidian.css` | Theme tokens and responsive layout |
| `tests/local.test.cjs` | Tests for persistence, annual balances, carryover, and calendar rules |

## Tests

Run with Node.js:

```sh
node --test tests/local.test.cjs
```

## Static hosting

The app can be served from the root of a GitHub Pages branch. For a repository with `main` as its default branch, use **Settings → Pages → Deploy from a branch → main → / (root)**.
