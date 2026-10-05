import mysql from "mysql2/promise";

const globalStore = globalThis as typeof globalThis & {
  __cambodiaTourismPool?: mysql.Pool;
};

const hasRequiredDbConfig = Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME);

export const db = hasRequiredDbConfig
  ? (globalStore.__cambodiaTourismPool ??
      (globalStore.__cambodiaTourismPool = mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT ?? 3306),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: "utf8mb4",
        connectionLimit: 10,
        timezone: "+00:00",
      })))
  : null;
