import {pgTable,timestamp,uuid,varchar,boolean} from "drizzle-orm/pg-core";



const users=pgTable("users",{
    id:uuid().primaryKey(),
    fullName:varchar({length:255}).notNull(),
    email:varchar({length:255}).notNull().unique(),
    password:varchar({length:255}).notNull(),
    isActive:boolean('isActive').notNull().default(true),
    createdAt:timestamp().defaultNow().notNull(),
    updatedAt:timestamp().defaultNow().notNull()
})


export default users;