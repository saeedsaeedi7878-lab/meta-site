"use client";

import { useState } from "react";

type TrustBadgeProps = {
  src: string;
  alt: string;
  label: string;
  imageClassName?: string;
};

export function TrustBadge({ src, alt, label, imageClassName }: TrustBadgeProps) {
  const [missing, setMissing] = useState(false);

  return (
    <div className="trust-card" aria-label={label}>
      <img
        src={src}
        alt={alt}
        className={imageClassName}
        style={{ display: missing ? "none" : undefined }}
        onError={() => setMissing(true)}
      />
      <span className="trust-fallback" style={{ display: missing ? "block" : "none" }}>
        {label}
      </span>
    </div>
  );
}
