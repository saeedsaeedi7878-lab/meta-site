import Link from "next/link";
import { ArticleCover } from "@/components/article-cover";
import { SnapRail } from "@/components/snap-rail";
import { getArticles, readingMinutes } from "@/lib/articles";
import { formatFaDate } from "@/lib/format";

export function LatestArticles() {
  const articles = getArticles();
  return (
    <section className="showcase press-rail" aria-labelledby="latest-title">
      {articles.length === 0 ? (
        <>
          <div className="showcase-head">
            <div>
              <h2 id="latest-title">تازه‌های بلاگ</h2>
              <p>آخرین یادداشت‌های منتشرشده، از همان فهرست بلاگ.</p>
            </div>
            <Link className="press-index-link" href="/blog">
              همه مطالب
            </Link>
          </div>
          <p className="empty-state">هنوز مطلبی منتشر نشده است.</p>
        </>
      ) : (
        <>
          <SnapRail
            label="تازه‌ترین مطالب"
            titleId="latest-title"
            title="تازه‌های بلاگ"
            lede="آخرین یادداشت‌های منتشرشده، از همان فهرست بلاگ."
            action={{ href: "/blog", label: "همه مطالب" }}
          >
            {articles.map((article, index) => (
              <article key={article.slug} className={index === 0 ? "story-sheet is-lead" : "story-sheet"}>
                <Link href={`/blog/${article.slug}`}>
                  <ArticleCover
                    category={article.category}
                    title={article.title}
                    cover={article.cover}
                    variant={index === 0 ? "feature" : "rail"}
                  />
                  <p className="press-meta">
                    <span>{article.category}</span>
                    <time dateTime={article.publishedAt}>{formatFaDate(article.publishedAt)}</time>
                    <span>{readingMinutes(article).toLocaleString("fa-IR")} دقیقه مطالعه</span>
                  </p>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </Link>
              </article>
            ))}
          </SnapRail>
        </>
      )}
    </section>
  );
}
