import Link from "next/link";
import { assets } from "@/config/assets";
import { downloadUrl } from "@/config/site";

export function SiteHeader() {
  const label = "دانلود اپلیکیشن";
  return (
    <header>
      <Link href="/" className="logo" aria-label="متاتست، صفحه اصلی">
        <img src={assets.logo} className="logo-img" alt="لوگوی متاتست" width={60} height={60} fetchPriority="high" />
      </Link>
      {downloadUrl ? (
        <a className="download-btn" href={downloadUrl}>
          {label}
        </a>
      ) : (
        <button type="button" className="download-btn" aria-disabled="true">
          {label}
          <span className="sr-only">نشانی دانلود هنوز منتشر نشده است.</span>
        </button>
      )}
    </header>
  );
}
