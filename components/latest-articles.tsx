"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { getArticles, readingMinutes } from "@/lib/articles";

const SLIDE_MS = 6500;

export function LatestArticles() {
  const articles = getArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    publishedAt: article.publishedAt,
    readingMinutes: readingMinutes(article),
    cover: article.cover,
  }));
  const count = articles.length;
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      if (count < 2) return;
      const value = (next + count) % count;
      indexRef.current = value;
      setIndex(value);
    },
    [count],
  );

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    if (reducedRef.current || count < 2) return;
    timerRef.current = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      go(indexRef.current + 1);
    }, SLIDE_MS);
  }, [count, go, stop]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = motion.matches;
    const onMotion = () => {
      reducedRef.current = motion.matches;
      if (motion.matches) stop();
      else start();
    };
    motion.addEventListener("change", onMotion);
    const onVisibility = () => {
      if (!document.hidden && !reducedRef.current) start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();
    return () => {
      stop();
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [start, stop]);

  const hold = () => {
    pausedRef.current = true;
  };
  const release = () => {
    pausedRef.current = false;
  };

  return (
    <section
      className="journal-deck"
      aria-roledescription="carousel"
      aria-labelledby="latest-title"
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocus={hold}
      onBlur={release}
    >
      <div className="journal-deck-panel">
        <div className="journal-deck-head">
          <h2 id="latest-title" className="shine-title">
            تازه‌های بلاگ
          </h2>
          <Link className="btn-line" href="/blog">
            همه مطالب
          </Link>
        </div>
        {count === 0 ? (
          <p className="journal-empty">هنوز مطلبی منتشر نشده است.</p>
        ) : (
          <>
            <div className="deck-viewport">
              <div className="deck-track" style={{ transform: `translateX(${index * 100}%)` }}>
                {articles.map((article, articleIndex) => (
                  <div className="deck-slide" key={article.slug} inert={articleIndex === index ? undefined : true}>
                    <PostCard article={article} titleAs="h3" />
                  </div>
                ))}
              </div>
            </div>
            {count > 1 ? (
              <div className="deck-controls">
                <button type="button" className="btn-line deck-arrow" aria-label="مطلب قبلی" onClick={() => go(index - 1)}>
                  <ChevronRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </button>
                <div className="deck-dots" role="tablist" aria-label="انتخاب مطلب">
                  {articles.map((article, articleIndex) => (
                    <button
                      key={article.slug}
                      type="button"
                      className="deck-dot"
                      role="tab"
                      aria-selected={articleIndex === index}
                      aria-label={article.title}
                      onClick={() => go(articleIndex)}
                    />
                  ))}
                </div>
                <button type="button" className="btn-line deck-arrow" aria-label="مطلب بعدی" onClick={() => go(index + 1)}>
                  <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
