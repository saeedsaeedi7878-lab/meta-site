"use client";

import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostCard, type PostCardData } from "@/components/post-card";
import "swiper/css";

export function RelatedRail({ articles }: { articles: PostCardData[] }) {
  if (articles.length === 0) return null;

  return (
    <Swiper
      className="read-rail-swiper"
      modules={[FreeMode, Mousewheel]}
      dir="rtl"
      slidesPerView={1.08}
      spaceBetween={12}
      speed={720}
      grabCursor
      resistanceRatio={0.72}
      freeMode={{ enabled: true, momentum: true, momentumRatio: 0.82, momentumBounce: true }}
      mousewheel={{ forceToAxis: true, releaseOnEdges: true, sensitivity: 0.7 }}
      breakpoints={{
        720: { slidesPerView: 2.15, spaceBetween: 14 },
      }}
    >
      {articles.map((article) => (
        <SwiperSlide key={article.slug}>
          <PostCard article={article} titleAs="h3" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
