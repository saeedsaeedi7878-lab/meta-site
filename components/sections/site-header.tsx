"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { assets } from "@/config/assets";
import { isNavActive, navItems } from "@/config/navigation";
import { site } from "@/config/site";
import { CloseIcon, DownloadIcon, MenuIcon, UserIcon } from "@/components/icons";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
      <nav id="site-menu" className={open ? "site-nav is-open" : "site-nav"} aria-label="صفحات سایت">
        {navItems.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={() => setOpenPath(null)}>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="header-actions">
        <button
          type="button"
          className="header-btn nav-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span className="sr-only">{open ? "بستن منو" : "باز کردن منو"}</span>
        </button>
        <button type="button" className="header-btn" disabled>
          <DownloadIcon />
          <span>دانلود اپلیکیشن</span>
        </button>
        <a href={site.appUrl} className="header-btn">
          <UserIcon />
          <span>ورود / ثبت‌نام</span>
        </a>
      </div>
    </header>
  );
}