import { Pool } from "pg";
import type { Pool as PoolType } from "pg";

const pool: PoolType = new Pool({
  connectionString: process.env.NEON_DB_URL,
});

export const query = (text: string, params?: unknown[]) => pool.query(text, params);
