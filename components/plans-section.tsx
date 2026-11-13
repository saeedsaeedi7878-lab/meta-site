"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Coins, Flame, Infinity as InfinityIcon, Sparkles, Tag } from "lucide-react";
import { assets } from "@/config/assets";
import { site } from "@/config/site";
import type { Tariff } from "@/lib/plans";

const GAP = 16;

function perView(width: number) {
  if (width > 0 && width < 680) return 1;
  if (width > 0 && width < 980) return 2;
  return 4;
}

export function PlansSection({ tariffs }: { tariffs: Tariff[] }) {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [focus, setFocus] = useState(() => Math.max(0, tariffs.findIndex((item) => item.popular)));
  const [plays, setPlays] = useState<Record<string, number>>({});
  const per = perView(width);
  const card = width > 0 ? (width - GAP * (per - 1)) / per : 0;
  const page = Math.floor(focus / Math.max(per, 1));
  const offset = card > 0 ? page * per * (card + GAP) : 0;

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(Math.round(entries[0]?.contentRect.width ?? 0));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function show(index: number) {
    const count = tariffs.length;
    if (!count) return;
    const next = ((index % count) + count) % count;
    const plan = tariffs[next];
    setFocus(next);
    if (!plan) return;
    setPlays((current) => ({ ...current, [plan.id]: (current[plan.id] ?? 0) + 1 }));
  }

  return (
    <section className="plans" aria-labelledby="plans-title">
      <div className="plans-head">
        <p className="plans-kicker">
          <Sparkles size={14} strokeWidth={1.75} aria-hidden="true" />
          پلن‌های اشتراک
        </p>
        <h2 id="plans-title">
          انتخاب <em>پلن دلخواه</em> شما
        </h2>
        <p>با اشتراک‌های متنوع متاتست، تجربه‌ای بهتر و کامل‌تر داشته باشید.</p>
      </div>
      {tariffs.length === 0 ? (
        <p className="plans-note">تعرفه‌ها الان در دسترس نیست.</p>
      ) : (
        <>
          <div className="plans-row">
            <button type="button" className="plans-arrow" aria-label="پلن قبلی" onClick={() => show(focus - 1)}>
              <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <div className="plans-viewport" ref={viewportRef}>
              <motion.div
                className="plans-track"
                animate={{ x: reduce ? 0 : offset }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 32, mass: 0.8 }}
              >
                {tariffs.map((plan, index) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    index={index}
                    active={index === focus}
                    play={plays[plan.id] ?? 0}
                    reduce={!!reduce}
                  />
                ))}
              </motion.div>
            </div>
            <button type="button" className="plans-arrow" aria-label="پلن بعدی" onClick={() => show(focus + 1)}>
              <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          <div className="plans-dots">
            {tariffs.map((plan, index) => (
              <button key={plan.id} type="button" aria-label={plan.name} aria-current={index === focus} onClick={() => show(index)} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function PlanCard({
  plan,
  index,
  active,
  play,
  reduce,
}: {
  plan: Tariff;
  index: number;
  active: boolean;
  play: number;
  reduce: boolean;
}) {
  return (
    <motion.article
      className={plan.popular ? "plan-card is-popular" : "plan-card"}
      style={{ "--tone": plan.color } as CSSProperties}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: active || plan.popular ? -8 : 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={reduce ? undefined : { y: -14 }}
      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 26, delay: index * 0.05 }}
    >
      {plan.popular ? (
        <span className="plan-hot">
          <Flame size={13} strokeWidth={1.75} aria-hidden="true" />
          محبوب‌ترین
        </span>
      ) : null}
      <div className="plan-medal" aria-hidden="true">
        <lord-icon
          key={`${plan.id}-${play}`}
          src={plan.free ? assets.freeBadge : assets.ribbonBadge}
          colors={`primary:#F8F7FF,secondary:${plan.color}`}
          trigger="in"
          state="in-reveal"
        />
      </div>
      <h3>{plan.name}</h3>
      <p className="plan-price">
        {plan.comparePrice ? <s>{plan.comparePrice}</s> : null}
        <b>{plan.price}</b>
        <span>تومان</span>
      </p>
      <p className="plan-meta">
        <span>
          {plan.unlimited ? <InfinityIcon size={14} strokeWidth={1.75} aria-hidden="true" /> : <CalendarDays size={14} strokeWidth={1.75} aria-hidden="true" />}
          {plan.unlimited ? "دسترسی نامحدود" : plan.days}
        </span>
        {plan.coins ? (
          <>
            <i />
            <span>
              <Coins size={14} strokeWidth={1.75} aria-hidden="true" />
              {plan.coins}
            </span>
          </>
        ) : null}
      </p>
      {plan.savings ? (
        <p className="plan-save" title={plan.savingsVersus ? `نسبت به ${plan.savingsVersus}` : undefined}>
          <Tag size={13} strokeWidth={1.75} aria-hidden="true" />
          {plan.savings}
        </p>
      ) : null}
      {plan.features.map((feature) => (
        <p key={feature} className="plan-note">
          {feature}
        </p>
      ))}
      {plan.purchasable ? (
        <a className="plan-cta" href={site.appUrl}>
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
          انتخاب پلن
        </a>
      ) : (
        <button type="button" className="plan-cta" disabled>
          فعلاً بسته است
        </button>
      )}
    </motion.article>
  );
}
