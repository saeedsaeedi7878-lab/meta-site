import { stats } from "@/config/content";
import { StatGlyph } from "@/components/icons";

export function Stats() {
  return (
    <section className="stats-section reveal-section" aria-labelledby="stats-title">
      <div className="stats-inner glass-panel">
        <div className="stats-head">
          <div className="sec-eyebrow reveal-element stagger-1">متاتست در یک نگاه</div>
          <h2 id="stats-title" className="sec-title shine-title reveal-element stagger-2">
            اعدادی که خودشان حرف می‌زنند
          </h2>
          <p className="sec-desc reveal-element stagger-3">
            هر روز هزاران دانش‌آموز با متاتست تمرین می‌کنند، رقابت می‌کنند و پیشرفتشان را با چشم خودشان می‌بینند.
          </p>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`stat-card reveal-element stagger-${index + 1}`}>
              <div className="stat-icon">
                <StatGlyph name={stat.icon} />
              </div>
              <div className="stat-number">
                <span className="stat-suffix">{stat.suffix}</span>
                <span className="stat-value" data-target={stat.target}>
                  ۰
                </span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
