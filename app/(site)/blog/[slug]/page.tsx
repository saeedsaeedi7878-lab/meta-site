import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ChevronRight, Clock, List } from "lucide-react";
import { ArticleBody } from "@/components/article-body";
import { ArticleCover } from "@/components/article-cover";
import { ArticleTile } from "@/components/article-tile";
import { BlogShare } from "@/components/blog-share";
import { ReadingProgress } from "@/components/reading-progress";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { articles } from "@/config/articles";
import { articleHeadings, getArticle, getRelatedArticles, readingMinutes } from "@/lib/articles";
import { formatFaDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { articleJsonLd } from "@/lib/structured-data";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const headings = articleHeadings(article);
  const related = getRelatedArticles(article.slug);
  const minutes = readingMinutes(article);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }} />
      <ReadingProgress />
      <article className="journal-read">
        <Breadcrumbs
          items={[
            { name: "خانه", path: "/" },
            { name: "وبلاگ", path: "/blog" },
            { name: article.title, path: `/blog/${article.slug}` },
          ]}
        />
        <div className="journal-read-layout">
          {headings.length > 1 ? (
            <nav className="journal-toc" aria-label="فهرست مطالب">
              <p>
                <List size={15} strokeWidth={1.75} aria-hidden="true" />
                فهرست مطالب
              </p>
              <ol>
                {headings.map((heading, index) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`}>
                      <span>{(index + 1).toLocaleString("fa-IR")}</span>
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <header className="journal-read-head">
            <div>
              <p className="journal-badge">{article.category}</p>
              <h1>{article.title}</h1>
              <p className="journal-lede">{article.description}</p>
              <div className="journal-read-tools">
                <p className="journal-meta">
                  <span>
                    <Calendar size={13} strokeWidth={1.75} aria-hidden="true" />
                    <time dateTime={article.publishedAt}>{formatFaDate(article.publishedAt)}</time>
                  </span>
                  {article.updatedAt !== article.publishedAt ? (
                    <time dateTime={article.updatedAt}>به‌روزرسانی {formatFaDate(article.updatedAt)}</time>
                  ) : null}
                  <span>
                    <Clock size={13} strokeWidth={1.75} aria-hidden="true" />
                    {minutes.toLocaleString("fa-IR")} دقیقه مطالعه
                  </span>
                </p>
                <BlogShare title={article.title} />
              </div>
            </div>
            <ArticleCover category={article.category} title={article.title} cover={article.cover} variant="feature" />
          </header>
          <div className="journal-body">
            <ArticleBody article={article} />
            <p className="journal-back">
              <Link href="/blog">
                <ChevronRight size={15} strokeWidth={1.75} aria-hidden="true" />
                بازگشت به وبلاگ
              </Link>
            </p>
          </div>
        </div>
      </article>
      {related.length > 0 ? (
        <section className="journal-related" aria-labelledby="related-title">
          <h2 id="related-title">مطالب مرتبط</h2>
          <div className="journal-grid">
            {related.map((item) => (
              <ArticleTile
                key={item.slug}
                article={{
                  slug: item.slug,
                  title: item.title,
                  description: item.description,
                  category: item.category,
                  publishedAt: item.publishedAt,
                  readingMinutes: readingMinutes(item),
                  cover: item.cover,
                }}
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
