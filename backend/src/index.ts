// backend/src/index.js
import express from 'express';
import cors from 'cors';
import buildApiRouter from './apiPatch.js';
// ⬇️ dostosuj ten import do tego, jak tworzysz/eksportujesz engine u siebie
// np. jeśli masz klasę lub factory, zainicjalizuj ją i przypisz do const engine
import { engine } from './sim/engine.js';

// 1) Utwórz app - TYLKO RAZ
const app = express();

// 2) CORS – najpierw app, potem CORS
const FRONT_ORIGIN = process.env.FRONT_ORIGIN || 'https://des-1-sjna.onrender.com';
app.use(cors({
  origin: FRONT_ORIGIN,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// (opcjonalnie) prosty healthcheck tutaj też
app.get('/api/health', (req, res) => res.json({ ok: true }));

// 3) Router z /api/load (autodetekcja JSON/YAML) + start/pause/reset
//    Ważne: zamontuj PRZED globalnym express.json(), router sam używa express.text() dla /api/load
app.use('/api', buildApiRouter(engine));

// 4) Reszta parserów/middleware dla innych tras (jeśli potrzebujesz)
app.use(express.json({ limit: '1mb' }));

// 5) WebSocket – jeśli masz już gdzie indziej, NIE dubluj.
//    Jeśli chcesz minimalistycznie, możesz zostawić tylko to, co już działało u Ciebie.
//    Poniższe to przykładowy szkic — usuń, jeżeli masz własną konfigurację WS.
/*
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'HELLO', msg: 'ws up' }));
  // tu możesz przekazywać METRIC/STATE/LOG z engine do klientów
});
*/

// 6) Port z Render
const PORT = process.env.PORT || 10000;

// 7) Start – jeśli używasz serwera HTTP dla WS, wystartuj `server.listen(PORT, ...)` zamiast app.listen
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
