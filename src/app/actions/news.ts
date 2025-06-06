'use server';

import db from "@/server/db";
import { news } from "@/server/db/schema";
import { desc } from "drizzle-orm";

export async function getNews() {
  try {
    const newsItems = await db.query.news.findMany({
      orderBy: [desc(news.createdAt)],
      limit: 3,
    });
    return newsItems;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
} 