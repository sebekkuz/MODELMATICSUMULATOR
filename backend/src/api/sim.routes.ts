import { FastifyInstance } from "fastify";
import { createWS } from "../ws/sim.gateway";

export async function simRoutes(app: FastifyInstance) {
  const gateway = createWS(app);

  app.post("/start", async () => ({ ok: true }));
  app.post("/pause", async () => ({ ok: true }));
  app.post("/reset", async () => ({ ok: true }));
  app.post("/speed", async () => ({ ok: true }));
  app.get("/status", async () => ({ running: true, time: Date.now()/1000 }));
}
