import { LatestArticles } from "@/components/latest-articles";
import { PlansSection } from "@/components/plans-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { DepthSymbols } from "@/components/depth-symbols";
import { PageInteractions } from "@/components/page-interactions";
import { organizationJsonLd } from "@/lib/structured-data";

export default function HomePage() {
  const jsonLd = organizationJsonLd();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="ambient-veil" />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <DepthSymbols />
          <SiteHeader />
          <main id="content">
            <Hero />
            <Features />
            <Stats />
            <PlansSection />
            <LatestArticles />
            <Testimonials />
            <CtaBanner />
          </main>
          <SiteFooter />
        </div>
      </div>
      <PageInteractions />
    </>
  );
}
