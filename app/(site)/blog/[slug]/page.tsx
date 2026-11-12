import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArticleBody } from "@/components/article-body";
import { BlogShare } from "@/components/blog-share";
import { PostCover } from "@/components/post-cover";
import { ReadingProgress } from "@/components/reading-progress";
import { DesktopToc, MobileToc } from "@/components/reading-toc";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { articles } from "@/config/articles";
import { articleHeadings, coverTone, getArticle, getRelatedArticles, readingMinutes } from "@/lib/articles";
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
  const related = getRelatedArticles(article.slug, 1);
  const next = related[0];
  const minutes = readingMinutes(article);
  const tone = coverTone(article.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }} />
      <ReadingProgress />
      <article className="read">
        <div className="read-tools">
          <Link className="read-pill" href="/blog">
            <ChevronRight size={13} strokeWidth={1.75} aria-hidden="true" />
            وبلاگ
          </Link>
          <BlogShare title={article.title} />
        </div>
        <Breadcrumbs
          items={[
            { name: "خانه", path: "/" },
            { name: "وبلاگ", path: "/blog" },
            { name: article.title, path: `/blog/${article.slug}` },
          ]}
        />
        <div className="read-head">
          <p className="read-kicker">
            <i />
            {article.category}
          </p>
          <h1>{article.title}</h1>
          <p className="read-dek">{article.description}</p>
          <p className="read-byline">
            <time dateTime={article.publishedAt}>{formatFaDate(article.publishedAt)}</time>
            <i />
            <span>{minutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
            {article.updatedAt !== article.publishedAt ? (
              <>
                <i />
                <time dateTime={article.updatedAt}>به‌روزرسانی {formatFaDate(article.updatedAt)}</time>
              </>
            ) : null}
          </p>
        </div>
        <PostCover src={article.cover} title={article.title} tone={tone} />
        <div className="read-layout">
          <div className="read-column">
            <MobileToc headings={headings} />
            <div className="read-prose">
              <ArticleBody article={article} />
              <p className="read-end" aria-hidden="true">
                <span />
              </p>
            </div>
          </div>
          <DesktopToc headings={headings} minutes={minutes} />
        </div>
        {next ? (
          <Link className="read-next" href={`/blog/${next.slug}`}>
            <PostCover src={next.cover} title="" tone={coverTone(next.slug)} variant="thumb" />
            <span>
              <small>
                <i />
                نوشته‌ی بعدی
              </small>
              <strong>{next.title}</strong>
              <em>
                {formatFaDate(next.publishedAt)}
                <i />
                {readingMinutes(next).toLocaleString("fa-IR")} دقیقه
              </em>
            </span>
            <ChevronLeft className="read-next-arrow" size={14} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        ) : null}
        <p className="read-tail">
          <Link href="/blog">
            <ChevronRight size={13} strokeWidth={1.75} aria-hidden="true" />
            بازگشت به وبلاگ
          </Link>
        </p>
      </article>
    </>
  );
}
