import { notFound } from "next/navigation";
import { ArticleAside } from "@/components/article-aside";
import { ArticleBody } from "@/components/article-body";
import { ArticleComments } from "@/components/article-comments";
import { BlogShare } from "@/components/blog-share";
import { PostCover } from "@/components/post-cover";
import { ReadingProgress } from "@/components/reading-progress";
import { RelatedRail } from "@/components/related-rail";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { articles } from "@/config/articles";
import { assets } from "@/config/assets";
import { site } from "@/config/site";
import { coverTone, getArticle, getOtherArticles, readingMinutes } from "@/lib/articles";
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

  const minutes = readingMinutes(article);
  const tone = coverTone(article.slug);
  const plate = assets.studyPlates[tone] ?? assets.studyPlates[0];
  const others = getOtherArticles(article.slug).map((item) => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
    category: item.category,
    publishedAt: item.publishedAt,
    readingMinutes: readingMinutes(item),
    cover: item.cover,
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }} />
      <ReadingProgress />
      <article className="read">
        <div className="read-stage">
          <div className="read-bones" aria-hidden="true">
            <div className="read-layout">
              <div className="read-main">
                <span className="read-bone is-cover" />
                <span className="read-bone is-badge" />
                <span className="read-bone is-title" />
                <span className="read-bone is-line" />
                <span className="read-bone is-line" />
                <span className="read-bone is-line is-short" />
              </div>
              <div className="read-side">
                <span className="read-bone is-label" />
                <span className="read-bone is-row" />
                <span className="read-bone is-row" />
                <span className="read-bone is-row" />
              </div>
            </div>
          </div>

          <Breadcrumbs
            items={[
              { name: "خانه", path: "/" },
              { name: "وبلاگ", path: "/blog" },
              { name: article.title, path: `/blog/${article.slug}` },
            ]}
          />

          <div className="read-layout">
            <div className="read-main">
              <PostCover src={article.cover ?? plate} title={article.cover ? article.title : ""} tone={tone} />
              <p className="read-kicker">
                <i />
                {article.category}
              </p>
              <h1>{article.title}</h1>
              <p className="read-dek">{article.description}</p>
              <div className="read-byline">
                <time dateTime={article.publishedAt}>{formatFaDate(article.publishedAt)}</time>
                <i />
                <span>{minutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
                {article.updatedAt !== article.publishedAt ? (
                  <>
                    <i />
                    <time dateTime={article.updatedAt}>به‌روزرسانی {formatFaDate(article.updatedAt)}</time>
                  </>
                ) : null}
              </div>
              <BlogShare title={article.title} />
              <div className="read-author-card read-author-inline">
                <img src={assets.logo} alt="" />
                <strong>{site.name}</strong>
              </div>
              <div className="read-prose">
                <ArticleBody article={article} />
              </div>
              <ArticleComments slug={article.slug} />
              <section className="read-rail" aria-label="نوشته‌های مرتبط">
                <h2>نوشته‌های مرتبط</h2>
                <RelatedRail articles={others} />
              </section>
            </div>

            <ArticleAside articles={others} />
          </div>
        </div>
      </article>
    </>
  );
}
