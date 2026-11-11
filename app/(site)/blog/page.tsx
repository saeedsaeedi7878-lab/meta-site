import { Suspense } from "react";
import { ArticleBrowser, type ArticleCard } from "@/components/article-browser";
import { ArticleSkeleton } from "@/components/article-skeleton";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getArticles, getCategories, readingMinutes } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "بلاگ آموزشی",
  description: "یادداشت‌های کوتاه درباره انتخاب مبحث، خواندن نمودار پیشرفت و پرسیدن سوال از معلم هوشمند متاتست.",
  path: "/blog",
});

export default function BlogPage() {
  const cards: ArticleCard[] = getArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    publishedAt: article.publishedAt,
    readingMinutes: readingMinutes(article),
    featured: Boolean(article.featured),
    tags: article.tags ?? [],
    cover: article.cover,
  }));

  return (
    <>
      <header className="press-hero">
        <Breadcrumbs
          items={[
            { name: "خانه", path: "/" },
            { name: "بلاگ", path: "/blog" },
          ]}
        />
        <div className="press-hero-grid">
          <div>
            <p className="press-kicker">بلاگ آموزشی</p>
            <h1>یادداشت‌هایی برای تمرین دقیق‌تر</h1>
          </div>
          <p>
            این مطلب‌ها روش مطالعه را دور امکاناتی که متاتست معرفی کرده جمع می‌کنند. گزارش پژوهشی یا ادعای نتیجه‌گیری
            آماری نیستند.
          </p>
        </div>
      </header>
      <Suspense
        fallback={
          <>
            <ArticleSkeleton variant="feature" />
            <ArticleSkeleton count={3} />
          </>
        }
      >
        <ArticleBrowser articles={cards} categories={getCategories()} />
      </Suspense>
    </>
  );
}
