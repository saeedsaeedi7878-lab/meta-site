import Link from "next/link";
import { assets } from "@/config/assets";
import { footerColumns } from "@/config/content";
import { site } from "@/config/site";
import {
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TelegramIcon,
  YouTubeIcon,
} from "@/components/icons";
import { TrustBadge } from "@/components/trust-badge";

const socials = [
  { label: "اینستاگرام", Icon: InstagramIcon },
  { label: "تلگرام", Icon: TelegramIcon },
  { label: "یوتیوب", Icon: YouTubeIcon },
  { label: "لینکدین", Icon: LinkedInIcon },
] as const;

export function SiteFooter() {
  return (
    <footer className="modern-footer">
      <div className="footer-aurora" />
      <div className="footer-glow-line" />

      <div className="footer-inner">
        <div className="footer-brand">
          <img
            src={assets.logo}
            className="logo-img"
            alt="لوگوی متاتست"
            width={80}
            height={80}
          />
          <p className="footer-desc">
            متاتست نسل جدید یادگیری و ارزیابی است. محیطی سریع، هوشمند و زیبا که به شما اجازه می‌دهد مرزهای پیشرفت خود را جا به جا کنید.
          </p>

          <div className="trust-badges-container">
            <TrustBadge src={assets.enamad} alt="ای‌نماد" label="ای‌نماد" imageClassName="enamad" />
            <TrustBadge src={assets.samandehi} alt="ستاد ساماندهی" label="ساماندهی" />
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="footer-title">{column.title}</h3>
            <ul className="footer-links">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <Link href={link.href}>{link.label}</Link>
                  ) : (
                    <span className="footer-static">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="footer-title">ارتباط با ما</h3>
          <div className="footer-contact-item">
            <PhoneIcon />
            <a href={site.contact.phoneHref} dir="ltr">
              {site.contact.phone}
            </a>
          </div>
          <div className="footer-contact-item">
            <MailIcon />
            <a href={site.contact.emailHref} dir="ltr">
              {site.contact.email}
            </a>
          </div>
          <div className="footer-contact-item">
            <PinIcon />
            <span>{site.contact.address}</span>
          </div>

          <div className="social-row">
            {socials.map(({ label, Icon }) => (
              <span key={label} className="social-btn" role="img" aria-label={`${label}؛ نشانی منتشر نشده`}>
                <Icon />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>تمامی حقوق برای متاتست محفوظ است © ۲۰۲۶</div>
        <div className="footer-credit">
          <span className="created-by-label">Created by</span>
          <img
            src={assets.aceLogo}
            className="team-logo"
            alt="Programming team"
            width={60}
            height={60}
          />
        </div>
      </div>
    </footer>
  );
}
