import type { Metadata } from "next";
import { assets } from "@/config/assets";
import { site } from "@/config/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageSeo): Metadata {
  return {
    title: { absolute: `${title} | ${site.name}` },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: site.locale,
      url: path,
      siteName: site.name,
      title,
      description,
      images: [{ url: assets.logo, alt: "لوگوی متاتست" }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [assets.logo],
    },
  };
}
