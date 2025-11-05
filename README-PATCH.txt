SYMULATORPRODUKCJI.3 — Frontend WS + API patch
==============================================

Dodaje:
  - frontend/src/lib/net.ts  (API_BASE, buildUrl, apiFetch, wsUrl)
  - frontend/src/lib/ws.ts   (initWS())

Kroki:
1) Wrzuć pliki z tego ZIPa do repo (dokładnie te ścieżki). Commit to main.
2) Otwórz: frontend/src/main.ts (albo frontend/src/main.tsx) i na GÓRZE dodaj:
     import { initWS } from './lib/ws';
     initWS();
   Zapisz (Commit).
3) Render → FRONTEND → Manual Deploy → Clear build cache & Deploy.

Po deployu w konsoli przeglądarki zobaczysz:
  [WS] open wss://modelmaticsimulator-backend.onrender.com/ws

(Opcjonalnie) używaj apiFetch('/api/health') zamiast fetch('/api/health'),
żeby wszystkie zapytania korzystały z VITE_API_URL.
