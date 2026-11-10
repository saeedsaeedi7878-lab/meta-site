import { SnapRail } from "@/components/snap-rail";
import { plans } from "@/config/plans";
import { site } from "@/config/site";

export function PlansSection() {
  return (
    <section className="showcase" aria-labelledby="plans-title">
      <SnapRail
        label="پلن‌های پیش‌نمایش"
        titleId="plans-title"
        title="پلن‌ها"
        lede="چیدمان کارت‌ها آماده است. نام، قیمت، دوره و مزایا هنوز اعلام نشده و این سه کارت فقط پیش‌نمایش هستند."
      >
        {plans.map((plan) => (
          <article key={plan.id} className={plan.featured ? "plan-card is-featured" : "plan-card"}>
            <p className="plan-kicker">{plan.preview ? "پیش‌نمایش" : plan.period}</p>
            <h3>{plan.name}</h3>
            <p className="plan-price">
              <span className={plan.preview ? "is-pending" : undefined}>{plan.price}</span>
              <small>{plan.period}</small>
            </p>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={`${plan.id}-${index}`}>{feature}</li>
              ))}
            </ul>
            <a className="plan-cta" href={site.appUrl}>
              {plan.cta}
            </a>
          </article>
        ))}
      </SnapRail>
    </section>
  );
}
