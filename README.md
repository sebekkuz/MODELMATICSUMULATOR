# SYMULATORPRODUKCJI.1 — HMLV Web Simulator (skeleton)

Monorepo: **frontend** (React + Vite + react-three-fiber), **backend** (Fastify + TypeScript), **shared** (silnik zdarzeń + schematy).
Gotowe pod deploy na **Render.com** (statyczny front + Node backend).

## Szybki start (lokalnie)

```bash
# Backend
cd backend
npm ci
npm run build
npm start

# Frontend (w drugim terminalu)
cd ../frontend
npm ci
npm run dev
```

## Deploy na Render
- Użyj `render.yaml` w katalogu głównym repo.
- Zdefiniowane dwie usługi: `symulator-backend` (Node) i `symulator-frontend` (Static).

Wersjonowanie: kolejne paczki **SYMULATORPRODUKCJI.X**.
