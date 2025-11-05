import Fastify from "fastify";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";
import { simRoutes } from "./api/sim.routes";
import { configRoutes } from "./api/config.routes";
import { resultsRoutes } from "./api/results.routes";
import { healthRoutes } from "./api/health.routes";

const app = Fastify({ logger: true });

app.register(cors, { origin: true });
app.register(websocket);

app.register(simRoutes, { prefix: "/api/sim" });
app.register(configRoutes, { prefix: "/api" });
app.register(resultsRoutes, { prefix: "/api" });
app.register(healthRoutes, { prefix: "/api" });

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen({ port, host: "0.0.0.0" }).then(() => {
  app.log.info(`Backend listening on :${port}`);
});
