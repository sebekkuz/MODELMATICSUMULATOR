# SYMULATORPRODUKCJI.3 — CSV importer + walidacje + wykresy + (przygotowanie do `npm ci`)

Zmiany vs .2:
- Backend: `/api/import/*` obsługuje CSV (JSON body `{ csv: "..." }` lub `text/plain`), walidacje Zod, pamięć stanów importu, `/api/import/summary`, `/api/metrics`.
- WS: snapshot zawiera podstawowe metryki (TAKT, utilization).
- Frontend: panel importu plików (Funkcje/Obudowy/MRP) + podgląd błędów i liczników; panel wykresów (Chart.js).
- Przygotowanie do **`npm ci`**: po stronie Render używaj na razie `npm install`. Lockfile’e wygeneruj lokalnie (instrukcja na dole).

## Lokalnie
```bash
# backend
cd backend
npm install
npm run build
npm start

# frontend
cd ../frontend
npm install
npm run dev
```

## Render
Na backendzie zostaw:
```
Build Command: npm install --no-audit --no-fund && npm run build
Env: NPM_CONFIG_PRODUCTION=false
```
Frontend: dodaj `VITE_API_URL` wskazujące backend.

## Przejście na `npm ci` (wymaga lockfile’i)
Na **swoim komputerze** w katalogach `backend`, `frontend`, `shared`:
```bash
npm install
git add package-lock.json shared/package-lock.json backend/package-lock.json frontend/package-lock.json
git commit -m "chore: add lockfiles for npm ci"
git push
```
Potem zmień Build Command w Render na:
```
npm ci && npm run build
```
(w obu usługach).

