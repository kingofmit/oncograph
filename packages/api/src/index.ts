import { serve } from "@hono/node-server";
import { app } from "./app";

export { app } from "./app";

const port = parseInt(process.env.PORT ?? "3737", 10);

serve({ fetch: app.fetch, port }, () => {
  console.log(`OncoGraph API server running on http://localhost:${port}`);
});
