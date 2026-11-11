"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, Search, X } from "lucide-react";
import { ArticleCover } from "@/components/article-cover";
import { ArticleTile, type ArticleTileData } from "@/components/article-tile";
import { formatFaDate } from "@/lib/format";

export type ArticleCard = ArticleTileData & {
  featured: boolean;
  tags: string[];
};

const PAGE_SIZE = 3;

export function ArticleBrowser({ articles, categories }: { articles: ArticleCard[]; categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const category = searchParams.get("cat") ?? "همه";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const queryTimer = useRef(0);
  const [query, setQuery] = useState(urlQuery);
  const [seenUrl, setSeenUrl] = useState(urlQuery);
  const [lastSent, setLastSent] = useState(urlQuery);

  if (urlQuery !== seenUrl) {
    setSeenUrl(urlQuery);
    if (urlQuery !== lastSent) setQuery(urlQuery);
  }

  const needle = query.trim();

  const visible = useMemo(() => {
    return articles.filter((article) => {
      if (category !== "همه" && article.category !== category) return false;
      if (!needle) return true;
      return [article.title, article.description, article.category, ...article.tags].join(" ").includes(needle);
    });
  }, [articles, category, needle]);

  const browsing = Boolean(needle) || category !== "همه";
  const featured = !browsing ? visible.find((article) => article.featured) ?? visible[0] : undefined;
  const rest = featured ? visible.filter((article) => article.slug !== featured.slug) : visible;
  const pages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const shown = rest.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  useEffect(() => {
    if (page <= pages) return;
    const params = new URLSearchParams(window.location.search);
    if (pages > 1) params.set("page", String(pages));
    else params.delete("page");
    const value = params.toString();
    router.replace(value ? `/blog?${value}` : "/blog", { scroll: false });
  }, [page, pages, router]);

  function update(next: { q?: string; cat?: string; page?: number }) {
    const params = new URLSearchParams(window.location.search);
    if (next.q !== undefined) {
      if (next.q.trim()) params.set("q", next.q.trim());
      else params.delete("q");
    }
    if (next.cat !== undefined) {
      if (next.cat && next.cat !== "همه") params.set("cat", next.cat);
      else params.delete("cat");
    }
    if (next.page !== undefined) {
      if (next.page > 1) params.set("page", String(next.page));
      else params.delete("page");
    }
    const value = params.toString();
    router.replace(value ? `/blog?${value}` : "/blog", { scroll: false });
  }

  function onQuery(value: string) {
    setQuery(value);
    window.clearTimeout(queryTimer.current);
    queryTimer.current = window.setTimeout(() => {
      setLastSent(value.trim());
      update({ q: value, page: 1 });
    }, 160);
  }

  function clearQuery() {
    window.clearTimeout(queryTimer.current);
    setQuery("");
    setLastSent("");
    update({ q: "", page: 1 });
  }

  return (
    <div className="journal">
      <div className="journal-bar">
        <div className="journal-label">
          <div className="journal-name">
            <span className="journal-dot" aria-hidden="true" />
            <h1>وبلاگ</h1>
          </div>
          <p>مقالات و مطالب آموزشی برای یادگیری بهتر</p>
        </div>
        <div className="journal-tools">
          <div className="journal-pills" role="toolbar" aria-label="موضوع مطالب">
            {["همه", ...categories].map((item) => (
              <button
                key={item}
                type="button"
                className={item === category ? "is-active" : undefined}
                aria-pressed={item === category}
                onClick={() => update({ cat: item, page: 1 })}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="journal-search">
            <Search size={16} strokeWidth={1.75} aria-hidden="true" />
            <span className="sr-only">جستجوی مطلب</span>
            <input
              type="search"
              value={query}
              placeholder="جستجو در مقالات..."
              onChange={(event) => onQuery(event.target.value)}
            />
            {query ? (
              <button type="button" aria-label="پاک کردن جستجو" onClick={clearQuery}>
                <X size={14} strokeWidth={1.75} />
              </button>
            ) : null}
          </label>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="journal-empty">
          <p>مطلبی با این عبارت پیدا نشد.</p>
          <button type="button" onClick={() => update({ q: "", cat: "همه", page: 1 })}>
            نمایش همه مطالب
          </button>
        </div>
      ) : null}

      {featured ? (
        <article className="journal-feature">
          <div className="journal-feature-copy">
            <p className="journal-badge">{featured.category}</p>
            <h2>
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p>{featured.description}</p>
            <p className="journal-meta">
              <span>
                <Calendar size={13} strokeWidth={1.75} aria-hidden="true" />
                <time dateTime={featured.publishedAt}>{formatFaDate(featured.publishedAt)}</time>
              </span>
              <span>
                <Clock size={13} strokeWidth={1.75} aria-hidden="true" />
                {featured.readingMinutes.toLocaleString("fa-IR")} دقیقه مطالعه
              </span>
            </p>
            <Link className="journal-go" href={`/blog/${featured.slug}`} aria-label={`خواندن ${featured.title}`}>
              <ChevronLeft size={16} strokeWidth={1.75} />
            </Link>
          </div>
          <ArticleCover category={featured.category} title={featured.title} cover={featured.cover} variant="feature" />
        </article>
      ) : null}

      {shown.length > 0 ? (
        <>
          <div className="journal-list-head">
            <h2>{browsing ? "نتیجه جستجو" : "جدیدترین مقالات"}</h2>
          </div>
          <div className="journal-grid">
            {shown.map((article) => (
              <ArticleTile key={article.slug} article={article} />
            ))}
          </div>
        </>
      ) : null}

      {rest.length > 0 ? (
        <nav className="journal-pages" aria-label="صفحه‌های مطالب">
          <button type="button" aria-label="صفحه قبل" disabled={current <= 1} onClick={() => update({ page: current - 1 })}>
            <ChevronRight size={16} strokeWidth={1.75} />
          </button>
          {Array.from({ length: pages }, (_, index) => {
            const number = index + 1;
            return (
              <button
                key={number}
                type="button"
                aria-current={number === current ? "page" : undefined}
                onClick={() => update({ page: number })}
              >
                {number.toLocaleString("fa-IR")}
              </button>
            );
          })}
          <button type="button" aria-label="صفحه بعد" disabled={current >= pages} onClick={() => update({ page: current + 1 })}>
            <ChevronLeft size={16} strokeWidth={1.75} />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
