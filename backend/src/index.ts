// backend/src/index.ts
import Fastify from "fastify";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";

import { simRoutes } from "./api/sim.routes";
import { configRoutes } from "./api/config.routes";
import { resultsRoutes } from "./api/results.routes";
import { healthRoutes } from "./api/health.routes"; // jeśli masz własne trasy health

const app = Fastify({ logger: true });

/**
 * CORS — dopuszczamy:
 *  - brak origin (curl/postman)
 *  - wszystko, jeśli CORS_ORIGIN nie ustawione
 *  - konkretne originy z ENV (rozdzielone przecinkiem)
 */
const corsEnv = process.env.CORS_ORIGIN || "";
const allowedOrigins = corsEnv
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.register(cors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.length === 0) return cb(null, true);
    const ok = allowedOrigins.some((o) => o === origin);
    cb(null, ok);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

/** WebSocket */
app.register(websocket);

// Prosty endpoint WS do testów: w UI łącz z wss://.../ws
app.get("/ws", { websocket: true }, (conn /*, req*/) => {
  // handshake
  try {
    conn.socket.send(JSON.stringify({ type: "hello", ts: Date.now() }));
  } catch {}

  // echo (do diagnostyki)
  conn.socket.on("message", (buf) => {
    try {
      conn.socket.send(buf);
    } catch {}
  });
});

/** Healthcheck (zostaw oba: własny router + prosty fallback) */
app.get("/api/health", async () => ({ ok: true, ts: Date.now() }));

/** Twoje trasy */
app.register(simRoutes, { prefix: "/api/sim" });
app.register(configRoutes, { prefix: "/api" });
app.register(resultsRoutes, { prefix: "/api" });
app.register(healthRoutes, { prefix: "/api" }); // jeśli ten plik istnieje

/** Start */
const port = Number(process.env.PORT) || 3000;
app
  .listen({ port, host: "0.0.0.0" })
  .then(() => app.log.info(`Backend listening on :${port}`))
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
