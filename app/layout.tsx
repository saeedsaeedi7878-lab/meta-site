import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { assets } from "@/config/assets";
import { site } from "@/config/site";
import "@/styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05050A",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.ogDescription,
    images: [{ url: assets.logo, alt: "لوگوی متاتست" }],
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.ogDescription,
    images: [assets.logo],
  },
  icons: {
    icon: [
      { url: assets.favicon16, sizes: "16x16", type: "image/png" },
      { url: assets.favicon32, sizes: "32x32", type: "image/png" },
      { url: assets.favicon48, sizes: "48x48", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://metatest.app" crossOrigin="anonymous" />
        <link rel="stylesheet" href={assets.fontStylesheet} />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}",
          }}
        />
        <a className="skip-link" href="#content">
          رفتن به محتوا
        </a>
        {children}
        <Script src={assets.lordicon} strategy="afterInteractive" />
      </body>
    </html>
  );
}
