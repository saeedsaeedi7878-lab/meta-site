import Link from "next/link";

export function MissingPage() {
  return (
    <div className="page-hero">
      <p className="sec-eyebrow">۴۰۴</p>
      <h1 className="page-title">این صفحه پیدا نشد</h1>
      <p className="page-lede">نشانی اشتباه است یا مطلبی با این نام در بلاگ نیست.</p>
      <p className="page-inline-link">
        <Link href="/">بازگشت به خانه</Link>
        <Link href="/blog">دیدن بلاگ</Link>
      </p>
    </div>
  );
}