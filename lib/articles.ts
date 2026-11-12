import { articles, type Article, type ArticleBlock } from "@/config/articles";

export function getArticles() {
  return [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getCategories() {
  return [...new Set(articles.map((article) => article.category))];
}

export function coverTone(slug: string) {
  return [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 4;
}

export function getFeaturedArticle() {
  return articles.find((article) => article.featured) ?? getArticles()[0];
}

export function getRelatedArticles(slug: string, limit = 2) {
  const current = getArticle(slug);
  if (!current) return [];
  const sameCategory = articles.filter((article) => article.slug !== slug && article.category === current.category);
  const others = articles.filter((article) => article.slug !== slug && article.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

function blockText(block: ArticleBlock) {
  if (block.type === "paragraph" || block.type === "heading" || block.type === "note") return block.text;
  if (block.type === "list") return block.items.join(" ");
  return [block.caption, ...block.headers, ...block.rows.flat()].join(" ");
}

export function readingMinutes(article: Article) {
  const words = [article.title, article.description, ...article.blocks.map(blockText)]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

export function articleHeadings(article: Article) {
  let index = 0;
  return article.blocks.flatMap((block) => {
    if (block.type !== "heading") return [];
    index += 1;
    return [{ id: `bakhsh-${index}`, text: block.text }];
  });
}
