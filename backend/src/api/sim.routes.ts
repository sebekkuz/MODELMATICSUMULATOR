import { FastifyInstance } from "fastify";
import { createWS } from "../ws/sim.gateway";

export async function simRoutes(app: FastifyInstance) {
  const gateway = createWS(app);

  app.post("/start", async (req, rep) => {
    gateway.broadcast({ type: "STATUS", payload: { running: true } });
    return { ok: true };
  });

  app.post("/pause", async () => ({ ok: true }));
  app.post("/reset", async () => ({ ok: true }));
  app.post("/speed", async () => ({ ok: true }));
  app.get("/status", async () => ({ running: false, time: 0 }));
}
