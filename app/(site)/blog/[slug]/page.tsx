import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { ArticleCover } from "@/components/article-cover";
import { PageCta } from "@/components/page-cta";
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
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "بلاگ", path: "/blog" },
    { name: article.title, path: `/blog/${article.slug}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }} />
      <article className="article-layout">
        <Breadcrumbs items={crumbs} />
        <p className="meta-row">
          <span>{article.category}</span>
          <time dateTime={article.publishedAt}>انتشار {formatFaDate(article.publishedAt)}</time>
          {article.updatedAt !== article.publishedAt ? (
            <time dateTime={article.updatedAt}>به‌روزرسانی {formatFaDate(article.updatedAt)}</time>
          ) : null}
          <span>{minutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
        </p>
        <h1 className="page-title shine-title">{article.title}</h1>
        <p className="page-lede">{article.description}</p>
        <ArticleCover category={article.category} title={article.title} index={articles.findIndex((item) => item.slug === article.slug)} />
        <div className="article-grid">
          <ArticleBody article={article} />
          {headings.length > 1 ? (
            <nav className="toc" aria-label="فهرست مطلب">
              <p>در این مطلب</p>
              <ol>
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`}>{heading.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </div>
      </article>
      {related.length > 0 ? (
        <section className="related" aria-labelledby="related-title">
          <h2 id="related-title" className="section-heading">
            مطالب مرتبط
          </h2>
          <div className="blog-grid">
            {related.map((item) => (
              <article key={item.slug} className="blog-card glass-panel">
                <p className="meta-row">
                  <span>{item.category}</span>
                </p>
                <h3>
                  <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                </h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      <PageCta title="همین مبحث را در متاتست تمرین کنید" text="پایه، درس، فصل و مبحث را در برنامه انتخاب کنید و نتیجه را همان‌جا ببینید." />
    </>
  );
}