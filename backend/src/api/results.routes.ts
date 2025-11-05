import { FastifyInstance } from "fastify";

export async function resultsRoutes(app: FastifyInstance) {
  app.get("/results/:runId/summary", async (req, rep) => {
    return { runId: (req.params as any).runId, metrics: { TAKT: 0 } };
  });
  app.get("/results/:runId/export.csv", async (req, rep) => {
    const csv = "runId,time,station,utilization\n" + `${(req.params as any).runId},0,S1,0\n`;
    rep.header("Content-Type", "text/csv");
    rep.send(csv);
  });
}
