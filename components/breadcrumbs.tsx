import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export type Crumb = {
  name: string;
  path: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(items)) }} />
      <nav className="breadcrumbs" aria-label="مسیر صفحه">
        <ol>
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path}>
                {last ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}