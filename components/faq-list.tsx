"use client";

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

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="faq-studio">
      <div className="faq-tools">
        <label className="search-field">
          <span className="sr-only">جستجوی پرسش</span>
          <input
            type="search"
            value={query}
            placeholder="پرسش را بنویسید"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="filter-row" role="toolbar" aria-label="دسته پرسش‌ها">
          <button type="button" className={categoryId === "all" ? "is-active" : undefined} aria-pressed={categoryId === "all"} onClick={() => setCategoryId("all")}>
            همه
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={categoryId === category.id ? "is-active" : undefined}
              aria-pressed={categoryId === category.id}
              onClick={() => setCategoryId(category.id)}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="empty-state">پرسشی با این عبارت در فهرست نیست. عبارت را کوتاه‌تر کنید یا از صفحه تماس، تلفن و ایمیل را بردارید.</p>
      ) : (
        <div className="faq-groups">
          {visible.map((category) => (
            <section key={category.id} className="faq-group" aria-labelledby={`faq-${category.id}`}>
              <div className="faq-group-head">
                <h2 id={`faq-${category.id}`}>{category.title}</h2>
                <p>{category.intro}</p>
              </div>
              <div className="faq-items">
                {category.items.map((item) => {
                  const expanded = open.has(item.id);
                  const panelId = `faq-panel-${item.id}`;
                  return (
                    <div key={item.id} className={expanded ? "faq-item is-open" : "faq-item"}>
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
                      <div className="faq-panel" id={panelId} role="region" aria-labelledby={`faq-button-${item.id}`} aria-hidden={!expanded}>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
