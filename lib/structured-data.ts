import { assets } from "@/config/assets";
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
