import { renders, waitlist, users, type Render, type InsertRender, type Waitlist, type InsertWaitlist, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  createRender(data: InsertRender): Render;
  getRender(id: number): Render | undefined;
  updateRender(id: number, data: Partial<InsertRender>): Render | undefined;
  getRecentRenders(limit?: number): Render[];
  addToWaitlist(data: InsertWaitlist): Waitlist;
  getWaitlistEntry(email: string): Waitlist | undefined;
  getUserByEmail(email: string): User | undefined;
  createUser(data: InsertUser): User;
  updateUserCredits(email: string, credits: number): User | undefined;
  deductCredit(email: string): User | undefined;
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

  getUserByEmail(email: string): User | undefined {
    return db.select().from(users).where(eq(users.email, email)).get();
  }

  createUser(data: InsertUser): User {
    return db.insert(users).values(data).returning().get();
  }

  updateUserCredits(email: string, credits: number): User | undefined {
    return db.update(users)
      .set({ credits })
      .where(eq(users.email, email))
      .returning()
      .get();
  }

  deductCredit(email: string): User | undefined {
    return db.update(users)
      .set({ credits: sql`${users.credits} - 1` })
      .where(eq(users.email, email))
      .returning()
      .get();
  }
}

export const storage = new DatabaseStorage();
