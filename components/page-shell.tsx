import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="ambient-veil" />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <SiteHeader />
          <main id="content" className="page-main">
            {children}
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}