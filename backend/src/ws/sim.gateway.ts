import { FastifyInstance } from "fastify";
import type { Snapshot } from "@symulator/shared";

export function createWS(app: FastifyInstance) {
  const clients = new Set<any>();

  app.get("/ws/sim", { websocket: true }, (connection, req) => {
    clients.add(connection);
    connection.socket.on("close", () => clients.delete(connection));
  });

  const interval = setInterval(() => {
    const snap: Snapshot = { time: Date.now()/1000, objects: [], metrics: { TAKT: 0 } };
    broadcast({ type: "SNAPSHOT", payload: snap });
  }, Number(process.env.WS_PUBLISH_INTERVAL_MS || "1000"));

  function broadcast(msg: any) {
    for (const c of clients) {
      try { c.socket.send(JSON.stringify(msg)); } catch {}
    }
  }

  return { broadcast };
}
