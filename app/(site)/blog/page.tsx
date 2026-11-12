import { ArticleBrowser, type ArticleCard } from "@/components/article-browser";
import { getArticles, getCategories, readingMinutes } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "بلاگ آموزشی",
  description: "یادداشت‌های کوتاه درباره انتخاب مبحث، خواندن نمودار پیشرفت و پرسیدن سوال از معلم هوشمند متاتست.",
  path: "/blog",
});

type BlogSearch = {
  q?: string;
  cat?: string;
  sort?: string;
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<BlogSearch> }) {
  const params = await searchParams;
  const categories = getCategories();
  const cards: ArticleCard[] = getArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    publishedAt: article.publishedAt,
    readingMinutes: readingMinutes(article),
    tags: article.tags ?? [],
    cover: article.cover,
  }));
  const category = params.cat && categories.includes(params.cat) ? params.cat : "همه";
  const sort = params.sort === "old" || params.sort === "short" ? params.sort : "new";

  return <ArticleBrowser articles={cards} categories={categories} initialQuery={params.q ?? ""} initialCategory={category} initialSort={sort} />;
}
