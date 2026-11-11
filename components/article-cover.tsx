"use client";

import { useState } from "react";

export function ArticleCover({
  category,
  title,
  cover,
  variant = "card",
}: {
  category: string;
  title: string;
  cover: string | null;
  variant?: "card" | "feature" | "deck";
}) {
  const [ready, setReady] = useState(!cover);

  return (
    <figure className={`journal-cover is-${variant}`}>
      {cover ? (
        <img
          src={cover}
          alt={title}
          className={ready ? "is-ready" : undefined}
          onLoad={() => setReady(true)}
        />
      ) : (
        <div className="journal-cover-empty" role="img" aria-label={`جلد «${title}» هنوز تصویری ندارد`} />
      )}
      {cover && !ready ? <span className="journal-bone" aria-hidden="true" /> : null}
      {variant === "feature" ? null : <figcaption>{category}</figcaption>}
    </figure>
  );
}
