import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import users from "./users.schema.js";

const refreshToken = pgTable("refreshToken", {
  userId: uuid("userId").notNull().references(() => users.id, { onDelete: "cascade" }),

  tokenValue: varchar("tokenValue", { length: 64 }).primaryKey(),

  expiresAt: timestamp("expiresAt", { withTimezone: true }).notNull(),
});


export default refreshToken;    