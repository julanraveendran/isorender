import { renders, waitlist, type Render, type InsertRender, type Waitlist, type InsertWaitlist } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createRender(data: InsertRender): Render;
  getRender(id: number): Render | undefined;
  updateRender(id: number, data: Partial<InsertRender>): Render | undefined;
  getRecentRenders(limit?: number): Render[];
  addToWaitlist(data: InsertWaitlist): Waitlist;
  getWaitlistEntry(email: string): Waitlist | undefined;
}

export class DatabaseStorage implements IStorage {
  createRender(data: InsertRender): Render {
    return db.insert(renders).values(data).returning().get();
  }

  getRender(id: number): Render | undefined {
    return db.select().from(renders).where(eq(renders.id, id)).get();
  }

  updateRender(id: number, data: Partial<InsertRender>): Render | undefined {
    return db.update(renders).set(data).where(eq(renders.id, id)).returning().get();
  }

  getRecentRenders(limit: number = 10): Render[] {
    return db.select().from(renders).limit(limit).all();
  }

  addToWaitlist(data: InsertWaitlist): Waitlist {
    return db.insert(waitlist).values(data).returning().get();
  }

  getWaitlistEntry(email: string): Waitlist | undefined {
    return db.select().from(waitlist).where(eq(waitlist.email, email)).get();
  }
}

export const storage = new DatabaseStorage();
