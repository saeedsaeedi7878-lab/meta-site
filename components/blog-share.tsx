"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export function BlogShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* The visitor closed the share sheet. */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className="read-pill" onClick={share}>
      {copied ? <Check size={13} strokeWidth={1.75} aria-hidden="true" /> : <Share2 size={13} strokeWidth={1.75} aria-hidden="true" />}
      {copied ? "کپی شد" : "اشتراک"}
    </button>
  );
}
