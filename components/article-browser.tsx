"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { assets } from "@/config/assets";
import { PostCard } from "@/components/post-card";

export type ArticleCard = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  cover: string | null;
  tags: string[];
};

type SortId = "new" | "old" | "short";

const SORTS: { id: SortId; label: string }[] = [
  { id: "new", label: "تازه‌ترین" },
  { id: "old", label: "قدیمی‌ترین" },
  { id: "short", label: "کوتاه‌ترین" },
];

function norm(value: string) {
  return value
    .replace(/[\u200c\u200d]/g, " ")
    .replace(/[يﻯ]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[أإآ]/g, "ا")
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function asSort(value: string | null): SortId {
  return value === "old" || value === "short" ? value : "new";
}

export function ArticleBrowser({
  articles,
  categories,
  initialQuery,
  initialCategory,
  initialSort,
}: {
  articles: ArticleCard[];
  categories: string[];
  initialQuery: string;
  initialCategory: string;
  initialSort: SortId;
}) {
  const router = useRouter();
  const timer = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const live = useRef({ q: initialQuery, cat: initialCategory, sort: initialSort });
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortId>(initialSort);
  const [sheet, setSheet] = useState(false);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const article of articles) map.set(article.category, (map.get(article.category) ?? 0) + 1);
    return map;
  }, [articles]);

  const visible = useMemo(() => {
    const needle = norm(query);
    const list = articles.filter((article) => {
      if (category !== "همه" && article.category !== category) return false;
      if (!needle) return true;
      return norm([article.title, article.description, article.category, ...article.tags].join(" ")).includes(needle);
    });
    return list.sort((a, b) => {
      if (sort === "short" && a.readingMinutes !== b.readingMinutes) return a.readingMinutes - b.readingMinutes;
      if (sort === "old") return a.publishedAt < b.publishedAt ? -1 : 1;
      return a.publishedAt < b.publishedAt ? 1 : -1;
    });
  }, [articles, category, query, sort]);

  function writeUrl(q: string, cat: string, sortId: SortId) {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (cat !== "همه") params.set("cat", cat);
    if (sortId !== "new") params.set("sort", sortId);
    const value = params.toString();
    router.replace(value ? `/blog?${value}` : "/blog", { scroll: false });
  }

  function onQuery(value: string) {
    live.current.q = value;
    setQuery(value);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const now = live.current;
      writeUrl(now.q, now.cat, now.sort);
    }, 160);
  }

  function onCategory(value: string) {
    window.clearTimeout(timer.current);
    live.current.cat = value;
    setCategory(value);
    writeUrl(live.current.q, value, live.current.sort);
  }

  function onSort(value: SortId) {
    window.clearTimeout(timer.current);
    live.current.sort = value;
    setSort(value);
    writeUrl(live.current.q, live.current.cat, value);
  }

  function resetAll() {
    window.clearTimeout(timer.current);
    live.current = { q: "", cat: "همه", sort: "new" };
    setQuery("");
    setCategory("همه");
    setSort("new");
    writeUrl("", "همه", "new");
  }

  useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") ?? "";
      const cat = params.get("cat") ?? "همه";
      const sortId = asSort(params.get("sort"));
      const safeCat = cat === "همه" || categories.includes(cat) ? cat : "همه";
      live.current = { q, cat: safeCat, sort: sortId };
      setQuery(q);
      setCategory(safeCat);
      setSort(sortId);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [categories]);

  useEffect(() => {
    if (!sheet) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSheet(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  const filtersActive = (category !== "همه" ? 1 : 0) + (query.trim() ? 1 : 0) + (sort !== "new" ? 1 : 0);
  const sortLabel = SORTS.find((item) => item.id === sort)?.label ?? "تازه‌ترین";

  const filters = (
    <Filters
      categories={categories}
      counts={counts}
      total={articles.length}
      category={category}
      sort={sort}
      onCategory={onCategory}
      onSort={onSort}
    />
  );

  const chips = filtersActive > 0 ? (
    <div className="library-chips">
      {category !== "همه" ? (
        <span>
          {category}
          <button type="button" aria-label={`حذف دسته ${category}`} onClick={() => onCategory("همه")}>
            <X size={10} strokeWidth={2.4} />
          </button>
        </span>
      ) : null}
      {query.trim() ? (
        <span>
          «{query.trim()}»
          <button type="button" aria-label="حذف جستجو" onClick={() => onQuery("")}>
            <X size={10} strokeWidth={2.4} />
          </button>
        </span>
      ) : null}
      {sort !== "new" ? (
        <span>
          {sortLabel}
          <button type="button" aria-label="بازگشت به تازه‌ترین" onClick={() => onSort("new")}>
            <X size={10} strokeWidth={2.4} />
          </button>
        </span>
      ) : null}
    </div>
  ) : null;

  return (
    <div className="library">
      <div className="library-side">
        <aside className="library-aside" aria-label="جستجو و فیلترها">
          <div className="library-brand">
            <div className="library-icon-wrap">
              <lord-icon src={assets.bookIcon} colors="primary:#F8F7FF,secondary:#8b5cf6" trigger="in" state="in-reveal" />
            </div>
            <h1 className="shine-title">وبلاگ</h1>
          </div>
          <SearchField value={query} onChange={onQuery} placeholder="جستجو در عنوان و موضوع…" label="جستجو در نوشته‌ها" />
          {chips}
          {filters}
          <button type="button" className="btn-line library-reset" onClick={resetAll} disabled={filtersActive === 0}>
            پاک کردن فیلترها
          </button>
        </aside>
      </div>

      <div className="library-main">
        <div className="library-mbar">
          <div className="library-mbar-in">
            <SearchField value={query} onChange={onQuery} placeholder="جستجو در نوشته‌ها…" label="جستجو در نوشته‌ها" />
            <button
              type="button"
              className={filtersActive ? "library-fbtn is-on" : "library-fbtn"}
              aria-expanded={sheet}
              aria-controls="library-sheet"
              onClick={() => setSheet(true)}
            >
              <SlidersHorizontal size={18} strokeWidth={1.75} />
              <span className="sr-only">فیلترها</span>
              {filtersActive > 0 ? <span className="library-bubble">{filtersActive.toLocaleString("fa-IR")}</span> : null}
            </button>
          </div>
        </div>

        <div className="library-stage">
          <div className="post-bones" aria-hidden="true">
            {Array.from({ length: 3 }, (_, index) => (
              <div className="post-bone" key={index}>
                <div className="post-bone-copy">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="post-bone-visual" />
              </div>
            ))}
          </div>
          {visible.length === 0 ? (
            <div className="library-empty">
              <b>چیزی پیدا نشد</b>
              <p>با این عبارت یا فیلتر نوشته‌ای نداریم.</p>
              <button type="button" className="btn-fill" onClick={resetAll}>
                پاک کردن فیلترها
              </button>
            </div>
          ) : (
            <div className="library-grid" key={`${category}|${sort}|${norm(query)}`}>
              {visible.map((article, index) => (
                <div key={article.slug} style={{ "--i": index } as CSSProperties}>
                  <PostCard article={article} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="library-sheet" id="library-sheet" hidden={!sheet}>
        <button type="button" className="library-sheet-bd" aria-label="بستن فیلترها" onClick={() => setSheet(false)} />
        <div className="library-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="library-sheet-title" ref={sheetRef}>
          <div className="library-grab" aria-hidden="true" />
          <div className="library-sheet-head">
            <b id="library-sheet-title">فیلترها</b>
            <button type="button" data-close aria-label="بستن" onClick={() => setSheet(false)}>
              <X size={14} strokeWidth={2} />
            </button>
          </div>
          <div className="library-sheet-body">{filters}</div>
          <div className="library-sheet-foot">
            <button type="button" className="btn-line" onClick={resetAll}>
              پاک کردن
            </button>
            <button type="button" className="btn-fill" onClick={() => setSheet(false)}>
              نمایش {visible.length.toLocaleString("fa-IR")} نوشته
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchField({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <label className={value ? "library-search has-value" : "library-search"}>
      <Search size={16} strokeWidth={1.75} aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
      />
      {value ? (
        <button type="button" aria-label="پاک کردن جستجو" onClick={() => onChange("")}>
          <X size={12} strokeWidth={2.2} />
        </button>
      ) : null}
    </label>
  );
}

function Filters({
  categories,
  counts,
  total,
  category,
  sort,
  onCategory,
  onSort,
}: {
  categories: string[];
  counts: Map<string, number>;
  total: number;
  category: string;
  sort: SortId;
  onCategory: (value: string) => void;
  onSort: (value: SortId) => void;
}) {
  return (
    <>
      <div className="library-group">
        <h2>دسته‌بندی</h2>
        <button type="button" className="library-cat" aria-pressed={category === "همه"} onClick={() => onCategory("همه")}>
          <i />
          <span>همه</span>
          <b>{total.toLocaleString("fa-IR")}</b>
        </button>
        {categories.map((name) => (
          <button key={name} type="button" className="library-cat" aria-pressed={category === name} onClick={() => onCategory(name)}>
            <i />
            <span>{name}</span>
            <b>{(counts.get(name) ?? 0).toLocaleString("fa-IR")}</b>
          </button>
        ))}
      </div>
      <div className="library-group">
        <h2>مرتب‌سازی</h2>
        <div
          className="library-seg"
          role="group"
          aria-label="ترتیب نمایش"
          style={{ "--sort-i": Math.max(0, SORTS.findIndex((item) => item.id === sort)) } as CSSProperties}
        >
          {SORTS.map((item) => (
            <button key={item.id} type="button" aria-pressed={sort === item.id} onClick={() => onSort(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
