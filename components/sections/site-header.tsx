import Link from "next/link";
import { Download, Globe } from "lucide-react";
import { assets } from "@/config/assets";
import { downloadUrl, site } from "@/config/site";

export function SiteHeader() {
  const label = "دانلود اپلیکیشن";
  return (
    <header>
      <Link href="/" className="logo" aria-label="متاتست، صفحه اصلی">
        <img src={assets.logo} className="logo-img" alt="لوگوی متاتست" width={60} height={60} fetchPriority="high" />
      </Link>
      <div className="header-actions">
        <a className="web-btn" href={site.appUrl}>
          <Globe size={16} strokeWidth={1.75} aria-hidden="true" />
          نسخه وب
        </a>
        {downloadUrl ? (
          <a className="download-btn" href={downloadUrl}>
            <Download size={16} strokeWidth={1.75} aria-hidden="true" />
            {label}
          </a>
        ) : (
          <button type="button" className="download-btn" aria-disabled="true">
            <Download size={16} strokeWidth={1.75} aria-hidden="true" />
            {label}
            <span className="sr-only">نشانی دانلود هنوز منتشر نشده است.</span>
          </button>
        )}
      </div>
    </header>
  );
}
