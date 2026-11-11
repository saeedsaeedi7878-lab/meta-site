"use client";

import Link from "next/link";
import type { KeyboardEvent } from "react";
import { ArticleTile } from "@/components/article-tile";
import { getArticles, readingMinutes } from "@/lib/articles";

function scrollDeck(event: KeyboardEvent<HTMLDivElement>) {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  const distance = event.key === "ArrowLeft" ? -260 : 260;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  event.currentTarget.scrollBy({ left: distance, behavior: reduce ? "auto" : "smooth" });
}

export function LatestArticles() {
  const articles = getArticles();
  return (
    <section className="journal-deck" aria-labelledby="latest-title">
      <div className="journal-deck-panel">
        <header className="journal-deck-head">
          <div>
            <h2 id="latest-title">تازه‌های بلاگ</h2>
            <p>آخرین یادداشت‌های منتشرشده.</p>
          </div>
        </header>
        {articles.length === 0 ? (
          <p className="journal-empty">هنوز مطلبی منتشر نشده است.</p>
        ) : (
          <div className="journal-deck-row" tabIndex={0} role="region" aria-label="تازه‌ترین مطالب" onKeyDown={scrollDeck}>
            {articles.map((article) => (
              <ArticleTile
                key={article.slug}
                variant="deck"
                article={{
                  slug: article.slug,
                  title: article.title,
                  description: article.description,
                  category: article.category,
                  publishedAt: article.publishedAt,
                  readingMinutes: readingMinutes(article),
                  cover: article.cover,
                }}
              />
            ))}
          </div>
        )}
        <Link className="journal-deck-all" href="/blog">
          همه مطالب
        </Link>
      </div>
    </section>
  );
}
