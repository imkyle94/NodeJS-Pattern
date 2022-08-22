import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.MariaDB_HOST) {
  dotenv.config({ path: path.join(__dirname, "..", ".env") });
}

export const sequelizeConfig = {
  host: process.env.MariaDB_HOST,
  username: process.env.MariaDB_USER,
  password: process.env.MariaDB_PASS,
  port: process.env.MariaDB_PORT,
  database: process.env.MariaDB_DB,
  dialect: process.env.dialect,
};
