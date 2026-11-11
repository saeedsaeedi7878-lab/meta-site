import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { PageCta } from "@/components/page-cta";
import { faqCategories } from "@/config/faq";
import { pageMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "سوالات متداول",
  description: "پاسخ به پرسش‌های رایج درباره تمرین، آزمون، معلم هوشمند و راه ورود به متاتست، فقط بر اساس آنچه در معرفی محصول آمده است.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqCategories)) }} />
      <header className="helpdesk-hero">
        <Breadcrumbs
          items={[
            { name: "خانه", path: "/" },
            { name: "سوالات متداول", path: "/faq" },
          ]}
        />
        <div className="press-hero-grid">
          <div>
            <p className="press-kicker">مرکز راهنما</p>
            <h1>پاسخ روشن، بدون حدس</h1>
          </div>
          <p>
            پرسش‌ها از معرفی همین وب‌سایت جمع شده‌اند. اگر جزئیاتی در محصول اعلام نشده، اینجا هم ساخته نشده است.
          </p>
        </div>
      </header>
      <FaqList categories={faqCategories} />
      <section className="helpdesk-contact" aria-labelledby="faq-contact-title">
        <h2 id="faq-contact-title">جوابتان اینجا نبود؟</h2>
        <p>
          از <Link href="/contact">صفحه تماس</Link> تلفن و ایمیل اعلام‌شده را بردارید. جزئیات حساب و ساخت آزمون داخل خود برنامه
          است.
        </p>
      </section>
      <PageCta title="ورود به برنامه" text="انتخاب پایه، درس، فصل و مبحث داخل خود متاتست انجام می‌شود." label="بزن بریم!" />
    </>
  );
}
