import type { FastifyInstance } from "fastify";
import { ItemSchema, ItemParamsSchema } from "../schemas/item.schema.js";
import {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
  } from "../services/item.service.js";

export default async function itemRoutes(app: FastifyInstance) {
  
  app.get("/", async () => {
    return getAllItems();
  });

  app.get("/:id", async (request, reply) => {
    const params = ItemParamsSchema.parse(request.params);
    const item = getItemById(params.id);
    if (!item) return reply.status(404).send({ error: "Item not found" });
    return item;
  });

  app.post("/", async (request) => {
    const data = ItemSchema.parse(request.body);
    return createItem(data);
  });

  app.put("/:id", async (request, reply) => {
    const params = ItemParamsSchema.parse(request.params);
    const data = ItemSchema.parse(request.body);

    const updated = updateItem(params.id, data);
    if (!updated) return reply.status(404).send({ error: "Item not found" });

    return updated;
  });

  app.delete("/:id", async (request, reply) => {
    const params = ItemParamsSchema.parse(request.params);

    const success = deleteItem(params.id);
    if (!success) return reply.status(404).send({ error: "Item not found" });

    return { success: true };
  });
}
