import { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({ ok: true, service: "symulator-backend", time: new Date().toISOString() }));
}
