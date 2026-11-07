import { site } from "@/config/site";

export function CtaBanner() {
  return (
    <section className="cta-section reveal-section" aria-labelledby="cta-title">
      <div className="cta-card reveal-element stagger-1">
        <div className="cta-inner">
          <div className="sec-eyebrow">آینده‌ات از همین‌جا شروع می‌شود</div>
          <h2 id="cta-title" className="cta-title shine-title">
            آماده‌ای مرزهای پیشرفتت را
            <br />
            جابه‌جا کنی؟
          </h2>
          <p className="cta-desc">
            همین حالا به هزاران دانش‌آموز بپیوند که هر روز با متاتست تمرین می‌کنند، رقابت می‌کنند و از معلم خصوصی هوش مصنوعی کمک می‌گیرند. شروع رایگان است.
          </p>
          <a href={site.appUrl} className="btn-uiverse">
            بزن بریم!
          </a>
        </div>
      </div>
    </section>
  );
}
