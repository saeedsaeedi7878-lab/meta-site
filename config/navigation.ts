export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "خانه", href: "/" },
  { label: "درباره متاتست", href: "/about" },
  { label: "سوالات متداول", href: "/faq" },
  { label: "بلاگ", href: "/blog" },
  { label: "تماس", href: "/contact" },
];

export function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
