# SYMULATORPRODUKCJI.2 — HMLV Web Simulator (skeleton, monorepo)

Zmiany vs .1:
- Dodano endpoint `/api/health` (health check).
- Dodano `engines` (Node 20) i `.nvmrc` (20.17.0) w backendzie.
- Zaktualizowano `render.yaml` (rootDir, SPA rewrite, buildCommand używa `npm install` bez locków).
- Frontend: helper `api.ts` (VITE_API_URL), klient WebSocket z logowaniem do Konsoli.

## Szybki start (lokalnie)
```bash
# Backend
cd backend
npm install
npm run build
npm start  # http://localhost:3000

# Frontend (drugi terminal)
cd ../frontend
npm install
npm run dev  # http://localhost:5173
```
