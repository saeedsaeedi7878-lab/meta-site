import { Suspense } from "react";
import { ArticleBrowser, type ArticleCard } from "@/components/article-browser";
import { ArticleSkeleton } from "@/components/article-skeleton";
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
    <Suspense
      fallback={
        <div className="journal">
          <ArticleSkeleton variant="feature" />
          <ArticleSkeleton count={3} />
        </div>
      }
    >
      <ArticleBrowser articles={cards} categories={getCategories()} />
    </Suspense>
  );
}
