import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import users from "./users.schema.js";

const refreshToken = pgTable("refreshToken", {
  userId: uuid("userId").primaryKey().references(()=>users.id),

  tokenValue: text("tokenValue").notNull().unique(),

  expiresAt: timestamp("expiresAt", {
    withTimezone: true,
  }).notNull(),
});


export default refreshToken;    