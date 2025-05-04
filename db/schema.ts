import { pgTable, text } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull(),
  userId: text("user_id").notNull(),
});

export const update = pgTable("update", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});
