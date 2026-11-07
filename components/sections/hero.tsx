"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { assets } from "@/config/assets";
import { heroSlides, slideLabels } from "@/config/content";
import { site } from "@/config/site";

const SLIDE_MS = 5000;
const LEAVE_MS = 700;

function SlideTitle({ text }: { text: string }) {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <span key={line}>
      {index > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const currentRef = useRef(0);
  const rootRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<number | null>(null);
  const leaveTimers = useRef<Map<number, number>>(new Map());
  const pausedRef = useRef(false);
  const inViewRef = useRef(true);
  const reducedRef = useRef(false);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const goToSlide = useCallback((index: number) => {
    const previous = currentRef.current;
    if (index === previous) return;

    const pending = leaveTimers.current.get(previous);
    if (pending) window.clearTimeout(pending);

    setLeaving(previous);
    currentRef.current = index;
    setCurrent(index);

    const timer = window.setTimeout(() => {
      leaveTimers.current.delete(previous);
      setLeaving((value) => (value === previous ? null : value));
    }, LEAVE_MS);
    leaveTimers.current.set(previous, timer);
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    if (reducedRef.current) return;
    autoplayRef.current = window.setInterval(() => {
      if (pausedRef.current || !inViewRef.current || document.hidden) return;
      goToSlide((currentRef.current + 1) % heroSlides.length);
    }, SLIDE_MS);
  }, [goToSlide, stopAutoplay]);

  useEffect(() => {
    const timers = leaveTimers.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = motion.matches;

    const root = rootRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    if (root) observer.observe(root);

    const onMotion = () => {
      reducedRef.current = motion.matches;
      if (motion.matches) stopAutoplay();
      else startAutoplay();
    };
    motion.addEventListener("change", onMotion);

    const onVisibility = () => {
      if (!document.hidden && !reducedRef.current) startAutoplay();
    };
    document.addEventListener("visibilitychange", onVisibility);
    startAutoplay();

    return () => {
      stopAutoplay();
      observer.disconnect();
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, [startAutoplay, stopAutoplay]);

  const hold = () => {
    pausedRef.current = true;
  };
  const release = () => {
    pausedRef.current = false;
  };

  return (
    <section
      className="hero"
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="معرفی متاتست"
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocus={hold}
      onBlur={release}
    >
      <div className="hero-inner">
        <div className="hero-slider-wrap">
          <div className="slides-container">
            {heroSlides.map((slide, index) => {
              const active = index === current;
              const Title = active ? "h1" : "p";
              const className = `slide${active ? " active" : ""}${leaving === index ? " leaving" : ""}`;
              return (
                <div
                  key={slide.title}
                  className={className}
                  data-index={index}
                  aria-hidden={!active}
                >
                  <Title className="slide-title shine-title">
                    <SlideTitle text={slide.title} />
                  </Title>
                  <p className="slide-desc">{slide.description}</p>
                </div>
              );
            })}
          </div>

          <a href={site.appUrl} className="btn-uiverse">
            شروع کنید
          </a>

          <div className="slider-dots" role="tablist" aria-label="انتخاب اسلاید">
            {slideLabels.map((label, index) => (
              <button
                key={label}
                type="button"
                className={`dot${index === current ? " active" : ""}`}
                aria-label={label}
                aria-selected={index === current}
                role="tab"
                onClick={() => {
                  goToSlide(index);
                  startAutoplay();
                }}
              />
            ))}
          </div>
        </div>

        <div className="hero-phone-stage">
          <div className="phone-glow" />
          <div className="phone-frame">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="phone-screen-placeholder">
                <img src={assets.logo} className="mini-logo" alt="" width={56} height={56} />
                <p>
                  پیش‌نمایش اپلیکیشن
                  <br />
                  متاتست
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
