"use client";

import { useState } from "react";

export function PostCover({
  src,
  title,
  tone,
  variant = "hero",
}: {
  src: string | null;
  title: string;
  tone: number;
  variant?: "hero" | "thumb";
}) {
  const [ready, setReady] = useState(!src);

  return (
    <div className={variant === "hero" ? "read-cover-wrap" : "read-thumb"}>
      <figure className={variant === "hero" ? "read-cover" : undefined}>
        {src ? (
          <img
            src={src}
            alt={variant === "hero" ? title : ""}
            className={ready ? "is-ready" : undefined}
            ref={(node) => {
              if (node?.complete && node.naturalWidth > 0) node.classList.add("is-ready");
            }}
            onLoad={(event) => {
              event.currentTarget.classList.add("is-ready");
              setReady(true);
            }}
          />
        ) : (
          <div className={`read-fill is-${tone}`} />
        )}
        {src ? <span className="read-bone" aria-hidden="true" /> : null}
      </figure>
    </div>
  );
}
