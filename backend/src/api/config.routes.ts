import { FastifyInstance } from "fastify";

export async function configRoutes(app: FastifyInstance) {
  app.post("/import/functions", async (req, rep) => {
    return { imported: true, type: "functions" };
  });
  app.post("/import/housings", async () => ({ imported: true, type: "housings" }));
  app.post("/import/mrp", async () => ({ imported: true, type: "mrp" }));
  app.post("/model", async () => ({ saved: true }));
  app.get("/model/:id", async (req, rep) => {
    return { id: (req.params as any).id, model: { define: {}, inputs: {} } };
  });
}
