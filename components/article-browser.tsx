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
};

export function ArticleBrowser({ articles, categories }: { articles: ArticleCard[]; categories: string[] }) {
  const [category, setCategory] = useState("همه");
  const visible = useMemo(
    () => (category === "همه" ? articles : articles.filter((article) => article.category === category)),
    [articles, category],
  );
  const featured = category === "همه" ? visible.find((article) => article.featured) ?? visible[0] : undefined;
  const rest = featured ? visible.filter((article) => article.slug !== featured.slug) : visible;

  return (
    <div className="blog-browser">
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

      {visible.length === 0 ? <p className="empty-state">در این موضوع مطلبی نیست.</p> : null}

      {featured ? (
        <article className="blog-feature glass-panel">
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

      <div className="blog-grid">
        {rest.map((article, index) => (
          <article key={article.slug} className="blog-card glass-panel">
            <ArticleCover category={article.category} title={article.title} index={index + 1} />
            <p className="meta-row">
              <span>{article.category}</span>
              <time dateTime={article.publishedAt}>{formatFaDate(article.publishedAt)}</time>
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