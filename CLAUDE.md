# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Patitas Peludas — Sistema de Gestión v2** is a single-file (`index.html`) point-of-sale and inventory management web app for a pet supplies store in Colombia. It runs entirely in the browser with no build step — open `index.html` directly or serve it with any static file server.

## Development Workflow

There is no build system, package manager, or test suite. To work on the app:

```bash
# Serve locally (any of these work)
python3 -m http.server 8080
npx serve .
# Then open http://localhost:8080
```

All code lives in `index.html`. Edits take effect on browser reload. No compilation or bundling required.

**Default credentials for local testing:**
- `admin` / `PatPel@2026!` (full access)
- `vendedor` / `Vend@2026!` (sales only)

## Architecture

The entire application is a single `index.html` (~4,300 lines) structured as:

1. **CSS** (lines 1–279) — All styles in one `<style>` block. CSS custom properties (`--teal`, `--green`, `--red`, etc.) define the color system. Responsive breakpoint at `768px` switches sidebar to mobile drawer.

2. **Pre-Firebase scripts** (lines 280–478) — Three separate `<script>` blocks that run before the Firebase module:
   - **Login module** — `USERS` object, `doLogin()`, `doLogout()`, session via `sessionStorage`.
   - **Date helpers** — `getTodayISO()` / `getTodayLabel()` exposed on `window`.

3. **Hardcoded seed data** (lines 479–589) — Three large JSON arrays declared as `const`:
   - `VENTAS_HIST` — historical sales records (used by charts and historial pages)
   - `COMPRAS_HIST` — inventory purchase history
   - `OTRAS_COMPRAS_HIST` — operating expenses history
   - `INV` — product catalog with initial stock quantities (`bought`, `sold`, `unit`, `precio`, `costo`)

4. **HTML pages** (lines 590–1429) — 15 `<section class="page">` elements, one per nav item. Navigation uses `goTo(id, btn)` to toggle `.active` class — no routing library.

5. **Firebase ES module** (lines 1430–1858, `<script type="module">`) — The only ES module in the file. Imports Firebase v10.12.2 from `gstatic.com`. Manages four Firestore collections:
   - `ventas` — live sales with `onSnapshot` real-time listener
   - `compras` — inventory purchases
   - `gastos` — operating expenses
   - `catalogo` — product catalog (seeded from `INV` on first run, then syncs back)

   Functions are exposed to the global scope via `window.*` assignments because the module cannot directly call functions in classic `<script>` blocks.

6. **Main application scripts** (lines 1860–4237) — Classic `<script>` blocks containing:
   - Global mutable state: `sessionDelta`, `selState`, `COMPRAS`, `gastosAcum`, `comprasTotal`
   - Navigation: `goTo()` / `toggleSidebar()` / mobile drawer
   - Product search dropdown: `searchProds()`, `selectProd()`, `openDropdown()`
   - Sales form: `updateVtaPreview()`, `registrarVenta()` (proxies to `window.registrarVenta`)
   - Inventory: `renderInv()`, `getStock()`, `stkClass()`
   - Charts: `mkChart()` wrapping Chart.js (loaded from CDN)
   - Historial ventas: `buildHvFiltros()`, `renderHvTable()`, `selectHvPeriodo()`
   - Historial compras: `buildCmpHist()`, `abrirCmpEdit()`, `guardarCmpEdit()`
   - Contabilidad: `renderContKpis()` — uses hardcoded `MARGEN_BRUTO = 0.296` and `COSTOS_FIJOS = 1_500_000`
   - Cierre del día: `calcCierre()`, `confirmarCierre()` — saves to `localStorage` under key `pp_cierres`
   - Export: `exportarExcel()` / `exportarPDF()` — lazy-load SheetJS (xlsx) and jsPDF from CDN
   - XSS sanitization: `san(str)` must be used when injecting user-provided strings into `innerHTML`

7. **Modals** (lines 4239–4275) — Two `<div>` overlays appended at the bottom: edit-compra modal and cierre-confirm modal.

## Key Conventions

### Script boundary problem
The Firebase block is `type="module"` (needed for `import`), so it cannot read variables from classic `<script>` blocks and vice versa. The bridge is `window.*`:
- Classic scripts access Firebase functions via `window.registrarVenta`, `window.borrarVentaFB`, etc.
- The Firebase module reads `window.getTodayISO`, `window.fmt`, `window.VENTAS_HIST`, etc.

### Stock calculation
`getStock(item)` = `item.bought - item.sold - sessionDelta[item.id]`. `sessionDelta` accumulates sales within the current browser session that haven't yet been synced to the catalog. Never mutate `item.bought` or `item.sold` directly during a session — use `sessionDelta`.

### Product ID format
`CAT-SUB-NNN` (e.g., `CON-COP-001`). Category codes: `ASE`=Aseo, `SNK`=Snack, `ACC`=Accesorio, `CON`=Concentrado. The auto-ID generator in the new-product form follows this pattern.

### Currency formatting
Always use `fmt(value)` (= `'$' + Math.round(v).toLocaleString('es-CO')`) for displayed prices. All monetary values are stored in Colombian Pesos (COP) as plain numbers.

### XSS safety
Any data from Firestore or user input inserted into `innerHTML` must be wrapped in `san()`. Template literals that build table rows already use `san()` — maintain this pattern.

### Data persistence layers
- **Real-time / live data**: Firestore (`ventas`, `compras`, `gastos`, `catalogo`)
- **Historical seed data**: Hardcoded arrays in the HTML (`VENTAS_HIST`, `COMPRAS_HIST`, `OTRAS_COMPRAS_HIST`, `INV`) — new live data from Firestore is merged into these arrays at runtime
- **Cierre del día**: `localStorage` key `pp_cierres` (last 90 records)
- **Session**: `sessionStorage` key `pp_user` for login persistence

### External dependencies (all CDN, no npm)
- Firebase JS SDK v10.12.2 (`gstatic.com`)
- Chart.js v4.4.1 (`cdnjs.cloudflare.com`)
- SheetJS (xlsx) v0.18.5 — lazy-loaded only when exporting
- jsPDF v2.5.1 + jspdf-autotable v3.5.31 — lazy-loaded only when exporting PDF

### Updating hardcoded historical data
`VENTAS_HIST`, `COMPRAS_HIST`, and `OTRAS_COMPRAS_HIST` are on lines 479–481 as single-line JSON arrays. When the store operator exports data and wants to re-seed, these arrays are replaced wholesale. The `INV` catalog array (lines 369–478) serves as the fallback/seed for the Firestore `catalogo` collection — if Firestore already has data, `INV` is cleared and replaced with what comes from Firestore.
