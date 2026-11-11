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
  cover: string | null;
};

const PAGE_SIZE = 6;

export function ArticleBrowser({ articles, categories }: { articles: ArticleCard[]; categories: string[] }) {
  const [category, setCategory] = useState("همه");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const needle = query.trim();

  const visible = useMemo(() => {
    return articles.filter((article) => {
      if (category !== "همه" && article.category !== category) return false;
      if (!needle) return true;
      const haystack = [article.title, article.description, article.category, ...article.tags].join(" ");
      return haystack.includes(needle);
    });
  }, [articles, category, needle]);

  const browsing = Boolean(needle) || category !== "همه";
  const featured = !browsing ? visible.find((article) => article.featured) ?? visible[0] : undefined;
  const rest = featured ? visible.filter((article) => article.slug !== featured.slug) : visible;
  const shown = rest.slice(0, visibleCount);
  const canLoadMore = rest.length > visibleCount;

  function reset() {
    setQuery("");
    setCategory("همه");
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="press">
      <div className="press-tools">
        <label className="press-search">
          <span className="sr-only">جستجوی مطلب</span>
          <input
            type="search"
            value={query}
            placeholder="عنوان، موضوع، برچسب یا توضیح"
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
          />
        </label>
        {needle || category !== "همه" ? (
          <button type="button" className="press-clear" onClick={reset}>
            پاک کردن فیلتر
          </button>
        ) : null}
        <div className="press-cats" role="toolbar" aria-label="موضوع مطالب">
          {["همه", ...categories].map((item) => (
            <button
              key={item}
              type="button"
              className={item === category ? "is-active" : undefined}
              aria-pressed={item === category}
              onClick={() => {
                setCategory(item);
                setVisibleCount(PAGE_SIZE);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="press-empty">
          <p>مطلبی با این عبارت پیدا نشد.</p>
          <button type="button" className="press-clear" onClick={reset}>
            نمایش همه مطالب
          </button>
        </div>
      ) : null}

      {featured ? (
        <article className="press-feature">
          <Link href={`/blog/${featured.slug}`} className="press-feature-link">
            <div className="press-feature-copy">
              <p className="press-meta">
                <span>ویژه</span>
                <span>{featured.category}</span>
                <time dateTime={featured.publishedAt}>{formatFaDate(featured.publishedAt)}</time>
                <span>{featured.readingMinutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
              </p>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <span className="press-more">خواندن مطلب</span>
            </div>
            <ArticleCover category={featured.category} title={featured.title} cover={featured.cover} variant="feature" />
          </Link>
        </article>
      ) : null}

      {shown.length > 0 ? (
        <div className="press-list">
          {shown.map((article) => (
            <article key={article.slug} className="press-row">
              <Link href={`/blog/${article.slug}`} className="press-row-link">
                <ArticleCover category={article.category} title={article.title} cover={article.cover} variant="card" />
                <div className="press-row-copy">
                  <p className="press-meta">
                    <span>{article.category}</span>
                    <time dateTime={article.publishedAt}>{formatFaDate(article.publishedAt)}</time>
                    <span>{article.readingMinutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
                  </p>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : null}

      {canLoadMore ? (
        <div className="press-more-wrap">
          <button type="button" className="press-load" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
            نمایش مطالب بیشتر
          </button>
        </div>
      ) : null}
    </div>
  );
}
