import { defineConfig } from "drizzle-kit";
import envConfig from "../config/envConfig.js";

export default defineConfig({
  dialect: "postgresql",
  schema: "../../**/schema/**/*.js", 
  out: "../../migration",                 
  dbCredentials: {
    url: envConfig.db.url
  }
});
