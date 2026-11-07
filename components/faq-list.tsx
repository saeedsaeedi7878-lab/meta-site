"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import type { FaqCategory } from "@/config/faq";

export function FaqList({ categories }: { categories: FaqCategory[] }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="faq-groups">
      {categories.map((category) => (
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
                  <div
                    className="faq-panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={`faq-button-${item.id}`}
                    aria-hidden={!expanded}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}