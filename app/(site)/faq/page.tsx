import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { PageCta } from "@/components/page-cta";
import { PageHero } from "@/components/page-hero";
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
      <PageHero
        eyebrow="سوالات متداول"
        title="پرسش‌هایی که قبل از ورود پیش می‌آید"
        lede="پاسخ‌ها از معرفی همین وب‌سایت جمع شده‌اند. اگر جزئیاتی در محصول اعلام نشده، اینجا هم ساخته نشده است."
        crumbs={[
          { name: "خانه", path: "/" },
          { name: "سوالات متداول", path: "/faq" },
        ]}
      />
      <FaqList categories={faqCategories} />
      <p className="page-inline-link">
        سوالتان در این فهرست نیست؟ از <Link href="/contact">صفحه تماس</Link> تلفن و ایمیل را بردارید.
      </p>
      <PageCta title="ورود به برنامه" text="انتخاب پایه، درس، فصل و مبحث داخل خود متاتست انجام می‌شود." label="بزن بریم!" />
    </>
  );
}