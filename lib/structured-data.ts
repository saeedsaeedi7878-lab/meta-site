import { assets } from "@/config/assets";
import type { Article } from "@/config/articles";
import type { FaqCategory } from "@/config/faq";
import { site } from "@/config/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.nameEn,
    url: site.url,
    logo: assets.logo,
    email: site.contact.email,
    telephone: site.contact.phone,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.streetAddress,
      addressLocality: site.contact.locality,
      addressCountry: site.contact.country,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function faqJsonLd(categories: FaqCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };
}

export function articleJsonLd(article: Article) {
  const url = new URL(`/blog/${article.slug}`, site.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: "fa",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: url,
    image: [assets.logo],
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: assets.logo,
      },
    },
  };
}

export function contactPageJsonLd() {
  const organization = organizationJsonLd();
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: new URL("/contact", site.url).toString(),
    name: `تماس با ${site.name}`,
    mainEntity: {
      "@type": organization["@type"],
      name: organization.name,
      alternateName: organization.alternateName,
      url: organization.url,
      logo: organization.logo,
      email: organization.email,
      telephone: organization.telephone,
      description: organization.description,
      address: organization.address,
    },
  };
}
