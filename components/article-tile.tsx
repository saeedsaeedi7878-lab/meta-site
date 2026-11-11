import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { ArticleCover } from "@/components/article-cover";
import { formatFaDate } from "@/lib/format";

export type ArticleTileData = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  cover: string | null;
};

export function ArticleTile({ article, variant = "card" }: { article: ArticleTileData; variant?: "card" | "deck" }) {
  return (
    <article className={variant === "deck" ? "journal-deck-card" : "journal-card"}>
      <Link href={`/blog/${article.slug}`}>
        <ArticleCover category={article.category} title={article.title} cover={article.cover} variant={variant} />
        <h3>{article.title}</h3>
        {variant === "card" ? <p>{article.description}</p> : null}
        <p className="journal-meta">
          <span>
            <Calendar size={13} strokeWidth={1.75} aria-hidden="true" />
            <time dateTime={article.publishedAt}>{formatFaDate(article.publishedAt)}</time>
          </span>
          <span>
            <Clock size={13} strokeWidth={1.75} aria-hidden="true" />
            {article.readingMinutes.toLocaleString("fa-IR")} دقیقه
          </span>
        </p>
      </Link>
    </article>
  );
}
