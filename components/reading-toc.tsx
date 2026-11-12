"use client";

import { Clock, List } from "lucide-react";
import { useEffect, useRef } from "react";

export type TocHeading = { id: string; text: string };

export function MobileToc({ headings }: { headings: TocHeading[] }) {
  const details = useRef<HTMLDetailsElement>(null);
  if (headings.length === 0) return null;

  return (
    <details className="read-toc-m" ref={details}>
      <summary>
        <List size={14} strokeWidth={1.75} aria-hidden="true" />
        فهرست مطالب
        <span>{headings.length.toLocaleString("fa-IR")} بخش</span>
      </summary>
      <nav>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={() => {
              if (details.current) details.current.open = false;
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </details>
  );
}

export function DesktopToc({ headings, minutes }: { headings: TocHeading[]; minutes: number }) {
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = nav.current;
    if (!root || headings.length === 0) return;
    const links = [...root.querySelectorAll<HTMLAnchorElement>("a")];
    const nodes = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;

    const mark = (id: string) => {
      for (const link of links) link.classList.toggle("is-active", link.hash === `#${id}`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const current = visible[0]?.target.id;
        if (current) mark(current);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0, 1] },
    );

    for (const node of nodes) observer.observe(node);
    mark(nodes[0].id);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="read-toc" ref={nav} aria-label="فهرست مطالب">
      <p>فهرست مطالب</p>
      <nav>
        {headings.map((heading) => (
          <a key={heading.id} href={`#${heading.id}`}>
            {heading.text}
          </a>
        ))}
      </nav>
      <p className="read-toc-time">
        <Clock size={12} strokeWidth={1.75} aria-hidden="true" />
        {minutes.toLocaleString("fa-IR")} دقیقه مطالعه
      </p>
    </aside>
  );
}
