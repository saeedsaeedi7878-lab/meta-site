import type { MetadataRoute } from "next";
import { articles } from "@/config/articles";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/faq`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const posts: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${site.url}/blog/${article.slug}`,
    lastModified: new Date(`${article.updatedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}