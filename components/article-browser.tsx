"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArticleCover } from "@/components/article-cover";
import { formatFaDate } from "@/lib/format";

export type ArticleCard = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  featured: boolean;
  tags: string[];
};

export function ArticleBrowser({ articles, categories }: { articles: ArticleCard[]; categories: string[] }) {
  const [category, setCategory] = useState("همه");
  const [query, setQuery] = useState("");
  const needle = query.trim();
  const visible = useMemo(() => {
    return articles.filter((article) => {
      if (category !== "همه" && article.category !== category) return false;
      if (!needle) return true;
      const haystack = [article.title, article.description, article.category, ...article.tags].join(" ");
      return haystack.includes(needle);
    });
  }, [articles, category, needle]);
  const featured = !needle && category === "همه" ? visible.find((article) => article.featured) ?? visible[0] : undefined;
  const rest = featured ? visible.filter((article) => article.slug !== featured.slug) : visible;

  return (
    <div className="blog-browser">
      <label className="search-field">
        <span className="sr-only">جستجوی مطلب</span>
        <input type="search" value={query} placeholder="عنوان، موضوع یا توضیح" onChange={(event) => setQuery(event.target.value)} />
      </label>
      <div className="filter-row" role="toolbar" aria-label="موضوع مطالب">
        {["همه", ...categories].map((item) => (
          <button
            key={item}
            type="button"
            className={item === category ? "is-active" : undefined}
            aria-pressed={item === category}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {visible.length === 0 ? <p className="empty-state">مطلبی با این عبارت پیدا نشد.</p> : null}

      {featured ? (
        <article className="editorial-feature">
          <ArticleCover category={featured.category} title={featured.title} index={0} />
          <div>
            <p className="meta-row">
              <span>{featured.category}</span>
              <time dateTime={featured.publishedAt}>{formatFaDate(featured.publishedAt)}</time>
              <span>{featured.readingMinutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
            </p>
            <h2>
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p>{featured.description}</p>
          </div>
        </article>
      ) : null}

      <div className="blog-grid editorial-grid">
        {rest.map((article, index) => (
          <article key={article.slug} className="editorial-card">
            <ArticleCover category={article.category} title={article.title} index={index + 1} />
            <p className="meta-row">
              <span>{article.category}</span>
              <time dateTime={article.publishedAt}>{formatFaDate(article.publishedAt)}</time>
              <span>{article.readingMinutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
            </p>
            <h2>
              <Link href={`/blog/${article.slug}`}>{article.title}</Link>
            </h2>
            <p>{article.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
