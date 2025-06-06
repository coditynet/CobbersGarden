'use client';

import NewsList from "./_components/NewsList";

export default function News() {
  return (
    <section id="news" className="py-24 relative bg-garden-background/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-garden-primary text-center mb-16">
          <span className="relative">
            Latest News & Updates
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-garden-accent hidden md:block" />
          </span>
        </h2>
        {/* <p className="text-garden-secondary/80 text-center max-w-2xl mx-auto mb-12">
          Stay informed about the latest gardening trends, tips, and company updates.
        </p> */}
        <NewsList />
      </div>
    </section>
  );
} 