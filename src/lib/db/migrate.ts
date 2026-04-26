/**
 * Run pending Drizzle migrations against the configured database.
 * Usage: `npm run db:migrate`
 *
 * The script is invoked via `tsx --env-file=.env.local`, so DATABASE_URL is
 * already on `process.env` by the time `requireDatabaseUrl()` runs.
 */
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { requireDatabaseUrl } from "@/lib/env";

async function main() {
  const url = requireDatabaseUrl();
  const client = postgres(url, { max: 1 });
  const db = drizzle(client);

  console.log("Running migrations…");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migrations complete.");

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
