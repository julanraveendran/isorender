import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const renders = sqliteTable("renders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sourceType: text("source_type").notNull(), // "upload" | "rightmove" | "zoopla"
  sourceUrl: text("source_url"), // URL if from rightmove/zoopla
  floorPlanUrl: text("floor_plan_url"), // stored floor plan image
  renderUrl: text("render_url"), // generated 3D render
  status: text("status").notNull().default("pending"), // "pending" | "processing" | "completed" | "failed"
  propertyAddress: text("property_address"),
  propertyDetails: text("property_details"), // JSON string
  createdAt: text("created_at").notNull(),
});

export const insertRenderSchema = createInsertSchema(renders).omit({
  id: true,
});

export type InsertRender = z.infer<typeof insertRenderSchema>;
export type Render = typeof renders.$inferSelect;

export const waitlist = sqliteTable("waitlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull(),
});

export const insertWaitlistSchema = createInsertSchema(waitlist).omit({
  id: true,
});

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  credits: integer("credits").notNull().default(0),
  plan: text("plan"), // "starter" | "professional" | "agency"
  stripeCustomerId: text("stripe_customer_id"),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
