import { FastifyInstance } from "fastify";
import { calcMetrics } from "../services/metrics.service";

export async function resultsRoutes(app: FastifyInstance) {
  app.get("/results/:runId/summary", async (req, rep) => {
    return { runId: (req.params as any).runId, metrics: calcMetrics() };
  });
  app.get("/metrics", async () => calcMetrics());
  app.get("/results/:runId/export.csv", async (req, rep) => {
    const m = calcMetrics();
    const lines = ["metric,value"];
    lines.push(`TAKT,${m.TAKT}`);
    for (const [k,v] of Object.entries(m.utilization)) lines.push(`utilization_${k},${v}`);
    for (const [k,v] of Object.entries(m.queues)) lines.push(`queue_${k},${v}`);
    const csv = lines.join("\n") + "\n";
    rep.header("Content-Type", "text/csv");
    rep.send(csv);
  });
}
