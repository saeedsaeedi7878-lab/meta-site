"use client";

import { Check, Link2, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export function BlogShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function pageUrl() {
    return window.location.href;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  function openShare(href: string) {
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="read-share">
      <button type="button" onClick={copyLink}>
        {copied ? <Check size={14} strokeWidth={1.75} aria-hidden="true" /> : <Link2 size={14} strokeWidth={1.75} aria-hidden="true" />}
        {copied ? "کپی شد" : "کپی پیوند"}
      </button>
      <button
        type="button"
        onClick={() => openShare(`https://t.me/share/url?url=${encodeURIComponent(pageUrl())}&text=${encodeURIComponent(title)}`)}
      >
        <Send size={14} strokeWidth={1.75} aria-hidden="true" />
        تلگرام
      </button>
      <button type="button" onClick={() => openShare(`https://wa.me/?text=${encodeURIComponent(`${title} ${pageUrl()}`)}`)}>
        <MessageCircle size={14} strokeWidth={1.75} aria-hidden="true" />
        واتساپ
      </button>
    </div>
  );
}
