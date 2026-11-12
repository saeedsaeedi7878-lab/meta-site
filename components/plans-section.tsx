"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "@/config/assets";
import type { Tariff } from "@/lib/plans";

export function PlansSection({ tariffs }: { tariffs: Tariff[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [play, setPlay] = useState(0);
  const plan = tariffs[index] ?? null;

  useEffect(() => {
    if (reduce || tariffs.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % tariffs.length);
      setPlay((value) => value + 1);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [reduce, index, tariffs.length]);

  function show(next: number) {
    const count = tariffs.length;
    if (!count) return;
    setIndex(((next % count) + count) % count);
    setPlay((value) => value + 1);
  }

  return (
    <section className="tariff" aria-labelledby="plans-title">
      <h2 id="plans-title" className="shine-title tariff-title">
        تعرفه
      </h2>
      {plan ? (
        <>
          <div className="tariff-stage">
            <AnimatePresence mode="wait">
              <motion.article
                key={plan.id}
                className="tariff-card"
                style={{ "--tone": plan.color } as CSSProperties}
                initial={reduce ? false : { opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -28 }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 30, mass: 0.75 }}
              >
                <div className="tariff-copy">
                  <div className="tariff-marks">
                    {plan.popular ? <span className="tariff-popular">محبوب</span> : null}
                    {plan.purchasable ? null : <span className="tariff-closed">فعلاً قابل خرید نیست</span>}
                  </div>
                  <h3>{plan.name}</h3>
                  <p className="tariff-price">
                    {plan.comparePrice ? <s>{plan.comparePrice}</s> : null}
                    <b>{plan.price}</b>
                    <span>تومان</span>
                    {plan.days ? (
                      <>
                        <i />
                        <CalendarDays size={15} strokeWidth={1.75} aria-hidden="true" />
                        <span>{plan.days}</span>
                      </>
                    ) : null}
                  </p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={16} strokeWidth={2.25} aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tariff-icon" aria-hidden="true">
                  <lord-icon
                    key={`${plan.id}-${play}`}
                    src={plan.free ? assets.freeBadge : assets.ribbonBadge}
                    colors={`primary:#F8F7FF,secondary:${plan.color}`}
                    trigger="in"
                    state="in-reveal"
                  />
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
          <div className="tariff-nav">
            <button type="button" className="btn-line tariff-arrow" aria-label="پلن قبلی" onClick={() => show(index - 1)}>
              <ChevronRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <div className="tariff-picks">
              {tariffs.map((item, itemIndex) => (
                <button key={item.id} type="button" aria-current={itemIndex === index} onClick={() => show(itemIndex)}>
                  {item.name.replace(/^اشتراک\s+/, "")}
                </button>
              ))}
            </div>
            <button type="button" className="btn-line tariff-arrow" aria-label="پلن بعدی" onClick={() => show(index + 1)}>
              <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </>
      ) : (
        <p className="tariff-note">تعرفه‌ها الان در دسترس نیست.</p>
      )}
    </section>
  );
}
