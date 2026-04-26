import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { requireDatabaseUrl } from "@/lib/env";
import * as schema from "@/lib/db/schema";

declare global {
  // eslint-disable-next-line no-var
  var __aprim_pg__: ReturnType<typeof postgres> | undefined;
  // eslint-disable-next-line no-var
  var __aprim_db__: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

/**
 * Lazy DB accessor. We avoid touching `process.env.DATABASE_URL` at module
 * load time so `next build` can collect routes without a live database.
 * Routes import `db` and the connection is created on first call.
 */
function makeClient() {
  return postgres(requireDatabaseUrl(), {
    max: 10,
    prepare: false,
    idle_timeout: 20,
  });
}

const dbProxy = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    if (!globalThis.__aprim_db__) {
      const client = globalThis.__aprim_pg__ ?? makeClient();
      if (process.env.NODE_ENV !== "production") {
        globalThis.__aprim_pg__ = client;
      }
      globalThis.__aprim_db__ = drizzle(client, { schema });
    }
    return (globalThis.__aprim_db__ as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const db = dbProxy;
export { schema };
