import Link from "next/link";
import { assets } from "@/config/assets";
import { DownloadIcon, UserIcon } from "@/components/icons";

export function SiteHeader() {
  return (
    <header>
      <Link href="/" className="logo" aria-label="متاتست، صفحه اصلی">
        <img
          src={assets.logo}
          className="logo-img"
          alt="لوگوی متاتست"
          width={60}
          height={60}
          fetchPriority="high"
        />
      </Link>
      <div className="header-actions">
        <a href="#" className="header-btn" aria-label="دانلود اپلیکیشن">
          <DownloadIcon />
          <span>دانلود اپلیکیشن</span>
        </a>
        <a href="#" className="header-btn" aria-label="ورود / ثبت‌نام">
          <UserIcon />
          <span>ورود / ثبت‌نام</span>
        </a>
      </div>
    </header>
  );
}
