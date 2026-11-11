import Link from "next/link";
import { SnapRail } from "@/components/snap-rail";
import { plans } from "@/config/plans";
import { site } from "@/config/site";

export function PlansSection() {
  if (plans.length === 0) {
    return (
      <section className="showcase plan-stage" aria-labelledby="plans-title">
        <div className="plan-await">
          <div className="plan-await-copy">
            <p className="sec-eyebrow">تعرفه</p>
            <h2 id="plans-title">پلن‌ها هنوز اعلام نشده‌اند</h2>
            <p>
              نام، قیمت، دوره پرداخت و فهرست مزایا در این پروژه ثبت نشده است. به‌محض اعلام تعرفه، همان داده‌ها در این بخش
              نمایش داده می‌شوند. تا آن زمان می‌توانید از خود برنامه شروع کنید.
            </p>
            <a className="plan-cta" href={site.appUrl}>
              ورود به برنامه
            </a>
          </div>
          <div className="plan-await-visual" aria-hidden="true">
            <span>پایه</span>
            <span>درس</span>
            <span>فصل</span>
            <span>مبحث</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="showcase plan-stage" aria-labelledby="plans-title">
      <SnapRail
        label="پلن‌های متاتست"
        titleId="plans-title"
        title="پلن‌ها"
        lede="انتخاب مسیر تمرین بر اساس تعرفه‌ای که اعلام شده است."
      >
        {plans.map((plan, index) => (
          <article
            key={plan.id}
            className={plan.featured ? `plan-sheet is-featured is-tone-${index % 3}` : `plan-sheet is-tone-${index % 3}`}
          >
            {plan.featured ? <p className="plan-kicker">پیشنهاد ویژه</p> : <p className="plan-kicker">پلن</p>}
            <h3>{plan.name}</h3>
            {plan.price ? (
              <p className="plan-price">
                <span>{plan.price}</span>
                {plan.period ? <small>{plan.period}</small> : null}
              </p>
            ) : null}
            {plan.description ? <p>{plan.description}</p> : null}
            {plan.features.length > 0 ? (
              <ul>
                {plan.features.map((feature, featureIndex) => (
                  <li key={`${plan.id}-${featureIndex}`}>{feature}</li>
                ))}
              </ul>
            ) : null}
            <a className="plan-cta" href={site.appUrl}>
              {plan.cta}
            </a>
          </article>
        ))}
      </SnapRail>
      <p className="plan-footnote">
        جزئیات حساب داخل برنامه است. برای پرسش‌های عمومی به <Link href="/faq">سوالات متداول</Link> سر بزنید.
      </p>
    </section>
  );
}
