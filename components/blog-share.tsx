"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useState } from "react";

export function BlogShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* The user dismissed the sheet. */
      }
    }
    await copy();
  }

  return (
    <div className="journal-share">
      <button type="button" onClick={copy}>
        {copied ? <Check size={15} strokeWidth={1.75} aria-hidden="true" /> : <Link2 size={15} strokeWidth={1.75} aria-hidden="true" />}
        {copied ? "کپی شد" : "کپی پیوند"}
      </button>
      <button type="button" onClick={share}>
        <Share2 size={15} strokeWidth={1.75} aria-hidden="true" />
        اشتراک
      </button>
    </div>
  );
}
