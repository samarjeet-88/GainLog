import { timestamp, uuid,varchar ,timestamp} from "drizzle-orm/gel-core";
import { pgTable } from "drizzle-orm/pg-core";






const users=pgTable("users",{
    id:uuid().primaryKey(),
    fullName:varchar({length:255}).notNull(),
    password:varchar({length:255}).notNull(),
    createdAt:timestamp().defaultNow().notNull(),
    updatedAt:timestamp().defaultNow().notNull()
})


export const {users};