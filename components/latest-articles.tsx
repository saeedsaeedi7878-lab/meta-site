"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostCard } from "@/components/post-card";
import { getArticles, readingMinutes } from "@/lib/articles";
import "swiper/css";

export function LatestArticles() {
  const articles = getArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    publishedAt: article.publishedAt,
    readingMinutes: readingMinutes(article),
    cover: article.cover,
  }));
  const deck = useRef<SwiperType | null>(null);
  const reduce = useReducedMotion();

  return (
    <section className="journal-deck" aria-labelledby="latest-title">
      <div className="journal-deck-panel">
        <div className="journal-deck-head">
          <h2 id="latest-title" className="shine-title">
            تازه‌های بلاگ
          </h2>
          <Link className="btn-line" href="/blog">
            همه مطالب
          </Link>
        </div>
        {articles.length === 0 ? (
          <p className="journal-empty">هنوز مطلبی منتشر نشده است.</p>
        ) : (
          <>
            <Swiper
              className="deck-swiper"
              modules={[FreeMode, Mousewheel]}
              dir="rtl"
              slidesPerView={1.12}
              spaceBetween={12}
              speed={880}
              grabCursor
              resistanceRatio={0.72}
              watchOverflow
              freeMode={{
                enabled: true,
                momentum: true,
                momentumRatio: 0.82,
                momentumVelocityRatio: 0.82,
                momentumBounce: true,
                minimumVelocity: 0.02,
              }}
              mousewheel={{ forceToAxis: true, releaseOnEdges: true, sensitivity: 0.7 }}
              breakpoints={{
                680: { slidesPerView: 2.15, spaceBetween: 14 },
                1040: { slidesPerView: 3.2, spaceBetween: 14 },
                1320: { slidesPerView: 4, spaceBetween: 16 },
              }}
              onSwiper={(swiper) => {
                deck.current = swiper;
              }}
            >
              {articles.map((article, index) => (
                <SwiperSlide key={article.slug}>
                  <motion.div
                    className="deck-motion"
                    initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 340, damping: 28, mass: 0.72, delay: Math.min(index, 5) * 0.05 }
                    }
                    whileHover={reduce ? undefined : { y: -6, transition: { type: "spring", stiffness: 420, damping: 28 } }}
                  >
                    <PostCard article={article} titleAs="h3" />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            {articles.length > 1 ? (
              <div className="deck-controls">
                <button type="button" className="btn-line deck-arrow" aria-label="مطلب قبلی" onClick={() => deck.current?.slidePrev()}>
                  <ChevronRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </button>
                <button type="button" className="btn-line deck-arrow" aria-label="مطلب بعدی" onClick={() => deck.current?.slideNext()}>
                  <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
