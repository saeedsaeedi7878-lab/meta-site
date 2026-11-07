import { site } from "@/config/site";

export function PageCta({ title, text, label = "شروع کنید" }: { title: string; text: string; label?: string }) {
  return (
    <section className="page-cta" aria-labelledby="page-cta-title">
      <h2 id="page-cta-title">{title}</h2>
      <p>{text}</p>
      <a className="btn-uiverse" href={site.appUrl}>
        {label}
      </a>
    </section>
  );
}