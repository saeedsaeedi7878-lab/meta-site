import { testimonialRows, type Testimonial } from "@/config/content";
import { Stars } from "@/components/icons";

function Card({ item }: { item: Testimonial }) {
  return (
    <article className="t-card">
      <div className="t-head">
        <div className={`t-avatar ${item.tone}`} aria-hidden="true">
          {item.avatar}
        </div>
        <div className="t-meta">
          <div className="t-name">{item.name}</div>
          <div className="t-grade">{item.grade}</div>
        </div>
        <Stars count={item.stars} />
      </div>
      <p className="t-text">{item.text}</p>
    </article>
  );
}

function Marquee({ items, reverse }: { items: Testimonial[]; reverse?: boolean }) {
  return (
    <div className={`marquee-row${reverse ? " reverse" : ""}`}>
      <div className="marquee-track">
        <div className="marquee-group">
          {items.map((item) => (
            <Card key={item.name} item={item} />
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {items.map((item) => (
            <Card key={`${item.name}-copy`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="testimonials-section reveal-section" aria-labelledby="testimonials-title">
      <div className="testimonials-head glass-panel">
        <div className="sec-eyebrow reveal-element stagger-1">نظرات دانش‌آموزان</div>
        <h2 id="testimonials-title" className="sec-title shine-title reveal-element stagger-2">
          دانش‌آموزان چه می‌گویند؟
        </h2>
        <p className="sec-desc reveal-element stagger-3">
          تجربه واقعی کسانی که هر روز با متاتست درس می‌خوانند، تمرین می‌کنند و پیشرفت می‌کنند.
        </p>
      </div>

      <div className="reveal-element stagger-2">
        <Marquee items={testimonialRows[0]} />
        <Marquee items={testimonialRows[1]} reverse />
      </div>
    </section>
  );
}
