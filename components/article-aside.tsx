"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { assets } from "@/config/assets";
import { site } from "@/config/site";
import { coverTone } from "@/lib/articles";
import { formatFaDate } from "@/lib/format";
import type { PostCardData } from "@/components/post-card";

function norm(value: string) {
  return value
    .replace(/[\u200c\u200d]/g, " ")
    .replace(/[يﻯ]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function ArticleAside({ articles }: { articles: PostCardData[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const needle = norm(query);
  const visible = useMemo(
    () => articles.filter((article) => !needle || norm(`${article.title} ${article.description} ${article.category}`).includes(needle)),
    [articles, needle],
  );

  return (
    <aside className="read-side">
      <div className="read-author-card">
        <img src={assets.logo} alt="" />
        <strong>{site.name}</strong>
      </div>
      <form
        className="library-search read-side-search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          const value = query.trim();
          router.push(value ? `/blog?q=${encodeURIComponent(value)}` : "/blog");
        }}
      >
        <Search size={16} strokeWidth={1.75} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جستجو در نوشته‌ها"
          aria-label="جستجو در نوشته‌ها"
        />
      </form>
      <p className="read-side-label">نوشته‌های دیگر</p>
      {visible.length === 0 ? (
        <p className="read-side-empty">در این فهرست نیست.</p>
      ) : (
        <ul>
          {visible.map((item) => (
            <li key={item.slug}>
              <Link href={`/blog/${item.slug}`}>
                <img src={item.cover ?? assets.studyPlates[coverTone(item.slug)] ?? assets.studyPlates[0]} alt="" />
                <span>
                  <small>{item.category}</small>
                  <strong>{item.title}</strong>
                  <em>
                    {formatFaDate(item.publishedAt)}
                    <i />
                    {item.readingMinutes.toLocaleString("fa-IR")} دقیقه
                  </em>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
