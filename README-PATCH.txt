SYMULATORPRODUKCJI.3 — PATCH CORS + WS + HEALTH
==============================================
Ten patch dodaje:
- backend/src/plugins/cors-ws.ts  (CORS + /ws)
- backend/src/routes/health.ts    (/api/health)

Jak użyć (2 kroki):
1) Skopiuj pliki do repo w podanych ścieżkach.
2) W backend/src/index.ts DODAJ dwie linie:
     import { registerCorsAndWs } from './plugins/cors-ws';
     import { healthRoutes } from './routes/health';
   i ZAREJESTRUJ przed routami aplikacji:
     await registerCorsAndWs(app);
     await healthRoutes(app);

   Upewnij się, że app.listen używa 0.0.0.0 i process.env.PORT:
     app.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' })

Render ENV (backend):
  CORS_ORIGIN = https://modelmaticsimulator.onrender.com

Frontend:
  VITE_API_URL = https://modelmaticsimulator-backend.onrender.com
  WebSocket URL budować jako: new WebSocket(VITE_API_URL.replace(/^http/, 'ws') + '/ws')

Po wdrożeniu sprawdź w przeglądarce:
  https://modelmaticsimulator-backend.onrender.com/api/health
Powinno zwrócić: { ok: true, ts: ... }
