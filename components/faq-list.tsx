"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import type { FaqCategory } from "@/config/faq";

export function FaqList({ categories }: { categories: FaqCategory[] }) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const needle = query.trim();

  const visible = useMemo(() => {
    return categories
      .filter((category) => categoryId === "all" || category.id === categoryId)
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          if (!needle) return true;
          const haystack = `${item.question} ${item.answer} ${category.title}`;
          return haystack.includes(needle);
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, categoryId, needle]);

  const total = visible.reduce((sum, category) => sum + category.items.length, 0);

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function reset() {
    setQuery("");
    setCategoryId("all");
  }

  return (
    <div className="helpdesk">
      <div className="helpdesk-tools">
        <label className="helpdesk-search">
          <span className="sr-only">جستجوی پرسش</span>
          <input
            type="search"
            value={query}
            placeholder="پرسش را بنویسید"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        {needle || categoryId !== "all" ? (
          <button type="button" className="helpdesk-clear" onClick={reset}>
            پاک کردن جستجو
          </button>
        ) : null}
        <p className="helpdesk-count">{total.toLocaleString("fa-IR")} پرسش</p>
      </div>

      <div className="helpdesk-layout">
        <nav className="helpdesk-cats" aria-label="دسته پرسش‌ها">
          <button
            type="button"
            className={categoryId === "all" ? "is-active" : undefined}
            aria-pressed={categoryId === "all"}
            onClick={() => setCategoryId("all")}
          >
            همه پرسش‌ها
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={categoryId === category.id ? "is-active" : undefined}
              aria-pressed={categoryId === category.id}
              onClick={() => setCategoryId(category.id)}
            >
              <span>{category.title}</span>
              <small>{category.items.length.toLocaleString("fa-IR")}</small>
            </button>
          ))}
        </nav>

        <div className="helpdesk-body">
          {visible.length === 0 ? (
            <div className="helpdesk-empty">
              <p>پرسشی با این عبارت پیدا نشد.</p>
              <button type="button" className="helpdesk-clear" onClick={reset}>
                پاک کردن جستجو
              </button>
              <p>
                اگر جوابتان اینجا نیست، از <Link href="/contact">صفحه تماس</Link> تلفن و ایمیل را بردارید.
              </p>
            </div>
          ) : (
            visible.map((category) => (
              <section key={category.id} className="helpdesk-group" aria-labelledby={`faq-${category.id}`}>
                <header className="helpdesk-group-head">
                  <h2 id={`faq-${category.id}`}>{category.title}</h2>
                  <p>{category.intro}</p>
                </header>
                <div className="helpdesk-items">
                  {category.items.map((item) => {
                    const expanded = open.has(item.id);
                    const panelId = `faq-panel-${item.id}`;
                    return (
                      <div key={item.id} className={expanded ? "helpdesk-item is-open" : "helpdesk-item"}>
                        <h3>
                          <button
                            type="button"
                            id={`faq-button-${item.id}`}
                            aria-expanded={expanded}
                            aria-controls={panelId}
                            onClick={() => toggle(item.id)}
                          >
                            <span>{item.question}</span>
                            <ChevronDownIcon />
                          </button>
                        </h3>
                        <div
                          className="helpdesk-panel"
                          id={panelId}
                          role="region"
                          aria-labelledby={`faq-button-${item.id}`}
                          aria-hidden={!expanded}
                        >
                          <div>
                            <p>{item.answer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
