import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  crumbs: Crumb[];
}) {
  return (
    <div className="page-hero">
      <Breadcrumbs items={crumbs} />
      <p className="sec-eyebrow">{eyebrow}</p>
      <h1 className="page-title shine-title">{title}</h1>
      <p className="page-lede">{lede}</p>
    </div>
  );
}