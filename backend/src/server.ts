import Fastify from "fastify";
import cors from "@fastify/cors";
import itemRoutes from "./routes/item.routes.js";

async function start() {
  // Configurer Fastify pour parser JSON automatiquement
  const app = Fastify({ 
    logger: true,
    bodyLimit: 1048576, // 1MB
    ajv: {
      customOptions: {
        removeAdditional: false,
        coerceTypes: false,
        allErrors: true
      }
    }
  });

  // Activer le parser JSON
  app.addContentTypeParser('application/json', { parseAs: 'string' }, app.getDefaultJsonParser('ignore', 'ignore'));

  // Activer CORS
  await app.register(cors, {
    origin: "http://localhost:3001", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  });
  

  // Routes
  await app.register(itemRoutes, { prefix: "/items" });

  try {
    await app.listen({ port: 3000 });
    console.log("🚀 Server running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();