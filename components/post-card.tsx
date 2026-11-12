import Link from "next/link";
import { Calendar, ChevronLeft, Clock, GraduationCap } from "lucide-react";
import { assets } from "@/config/assets";
import { coverTone } from "@/lib/articles";
import { formatFaDate } from "@/lib/format";

export type PostCardData = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  cover: string | null;
};

export function PostCard({
  article,
  titleAs = "h2",
}: {
  article: PostCardData;
  titleAs?: "h2" | "h3";
}) {
  const Title = titleAs;
  const plate = assets.studyPlates[coverTone(article.slug)] ?? assets.studyPlates[0];
  const minutes = article.readingMinutes.toLocaleString("fa-IR");

  return (
    <article className="post-card">
      <Link href={`/blog/${article.slug}`}>
        <div className="post-card-copy">
          <span className="post-card-badge">
            <GraduationCap size={14} strokeWidth={1.75} aria-hidden="true" />
            {article.category}
          </span>
          <Title>{article.title}</Title>
          <p>{article.description}</p>
          <div className="post-card-foot">
            <span className="post-card-more">
              <ChevronLeft size={14} strokeWidth={1.75} aria-hidden="true" />
              مطالعه بیشتر
            </span>
            <span className="post-card-meta">
              <span>
                <Clock size={13} strokeWidth={1.75} aria-hidden="true" />
                {minutes} دقیقه مطالعه
              </span>
              <span>
                <Calendar size={13} strokeWidth={1.75} aria-hidden="true" />
                <time dateTime={article.publishedAt}>{formatFaDate(article.publishedAt)}</time>
              </span>
            </span>
            <span className="post-card-go" aria-hidden="true">
              <ChevronLeft size={16} strokeWidth={1.75} />
            </span>
          </div>
        </div>
        <div className="post-card-visual">
          <img src={article.cover ?? plate} alt="" />
        </div>
      </Link>
    </article>
  );
}
