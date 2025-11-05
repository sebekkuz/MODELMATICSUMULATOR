import { FastifyInstance } from "fastify";
import { importFunctions, importHousings, importMrp, summary } from "../services/import.service";

export async function configRoutes(app: FastifyInstance) {
  app.post("/import/functions", async (req, rep) => {
    const body = (req as any).body;
    const s = importFunctions(body);
    return s;
  });
  app.post("/import/housings", async (req, rep) => {
    const body = (req as any).body;
    const s = importHousings(body);
    return s;
  });
  app.post("/import/mrp", async (req, rep) => {
    const body = (req as any).body;
    const s = importMrp(body);
    return s;
  });
  app.get("/import/summary", async () => summary());
}
