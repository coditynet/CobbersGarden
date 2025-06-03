"use server";
import db from "@/server/db";
import { news } from "@/server/db/schema";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";

const formSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(2),
  image: z.string().url().optional().or(z.literal("")),
  link: z.string().url().optional().or(z.literal("")),
});

export async function createNews(values: any) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const parsed = formSchema.safeParse(values);
  if (!parsed.success) return false;
  
  await db.insert(news).values({
    title: parsed.data.title,
    content: parsed.data.content,
    image: parsed.data.image || null,
    link: parsed.data.link || null,
  });
  return true;
} 