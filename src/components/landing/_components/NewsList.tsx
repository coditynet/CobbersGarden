'use client';

import { useEffect, useState } from "react";
import { getNews } from "@/app/actions/news";
import type { InferSelectModel } from "drizzle-orm";
import { news } from "@/server/db/schema";

type NewsItem = InferSelectModel<typeof news>;

export default function NewsList() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const items = await getNews();
        setNewsItems(items);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Loading skeleton with consistent height */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="w-full h-48 bg-garden-background/20 animate-pulse"></div>
            <div className="p-6">
              <div className="h-6 bg-garden-background/20 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-garden-background/20 rounded animate-pulse mb-4 w-1/2"></div>
              <div className="h-4 bg-garden-background/20 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-garden-background/20 rounded animate-pulse mb-4 w-3/4"></div>
              <div className="h-10 bg-garden-background/20 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {
      newsItems && newsItems.length > 0 ? (

        newsItems.map((item) => (
          <div key={item.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="relative w-full h-48 overflow-hidden bg-garden-background/20">
            <img
              src={item.image || "/assets/img/placeholder.jpg"}
              alt={item.title || "News image"}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-playfair font-bold text-garden-primary mb-2">
              {item.title || "Untitled"}
            </h3>
            <p className="text-sm text-garden-secondary/60 mb-4">March 15, 2024</p>
            <p className="text-garden-secondary/80 mb-4 text-sm leading-relaxed">
              {item.content || "No content available"}
            </p>
            <a
              href={item.link || "#"}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-garden-accent  bg-transparent text-garden-accent hover:bg-garden-accent hover:text-white h-10 px-4 py-2 w-full"
              >
              Read More
            </a>
          </div>
        </div>
      ))): (
      <div className="flex justify-center ">
      <p className="text-md rounded-md">Il n'y a pas de nouvelles pour le moment</p>
    </div>
          )}
          </div>
        );
      }
