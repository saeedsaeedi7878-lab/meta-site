import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { contactPageJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "تماس با متاتست",
  description: `تلفن ${site.contact.phone}، ایمیل ${site.contact.email} و نشانی ${site.contact.address}. فرم این صفحه هنوز پیام را ارسال نمی‌کند.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd()) }} />
      <PageHero
        eyebrow="تماس"
        title="راه‌های ارتباطی منتشرشده"
        lede="فقط تلفن، ایمیل و نشانی‌ای اینجا آمده که در معرفی متاتست وجود دارد. شبکه اجتماعی جداگانه‌ای اعلام نشده است."
        crumbs={[
          { name: "خانه", path: "/" },
          { name: "تماس", path: "/contact" },
        ]}
      />
      <div className="contact-layout">
        <ul className="contact-cards">
          <li className="glass-panel">
            <PhoneIcon />
            <div>
              <h2>تلفن</h2>
              <a href={site.contact.phoneHref} dir="ltr">
                {site.contact.phone}
              </a>
            </div>
          </li>
          <li className="glass-panel">
            <MailIcon />
            <div>
              <h2>ایمیل</h2>
              <a href={site.contact.emailHref} dir="ltr">
                {site.contact.email}
              </a>
            </div>
          </li>
          <li className="glass-panel">
            <PinIcon />
            <div>
              <h2>نشانی</h2>
              <p>{site.contact.address}</p>
            </div>
          </li>
        </ul>
        <ContactForm />
      </div>
    </>
  );
}