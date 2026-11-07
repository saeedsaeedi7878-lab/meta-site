"use client";

import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@/components/icons";

type LordIconElement = HTMLElement & {
  playFromBeginning?: () => void;
  play?: () => void;
  pause?: () => void;
  playerInstance?: {
    playFromBeginning?: () => void;
    play?: () => void;
    pause?: () => void;
    state?: { player?: { play?: () => void; pause?: () => void } };
  };
};

function playLordIcon(icon: LordIconElement) {
  const tryPlay = () => {
    try {
      if (typeof icon.playFromBeginning === "function") icon.playFromBeginning();
      else if (typeof icon.playerInstance?.playFromBeginning === "function") {
        icon.playerInstance.playFromBeginning();
      } else if (typeof icon.play === "function") icon.play();
      else if (typeof icon.playerInstance?.play === "function") icon.playerInstance.play();
      else icon.playerInstance?.state?.player?.play?.();
    } catch {
      /* The player can throw before its JSON is ready. A later retry covers it. */
    }
  };

  if (icon.playerInstance) {
    tryPlay();
    return;
  }

  const onReady = () => {
    window.setTimeout(tryPlay, 100);
    icon.removeEventListener("ready", onReady);
  };
  icon.addEventListener("ready", onReady);
  window.setTimeout(tryPlay, 300);
}

function pauseLordIcon(icon: LordIconElement) {
  try {
    icon.pause?.();
    icon.playerInstance?.pause?.();
    icon.playerInstance?.state?.player?.pause?.();
  } catch {
    /* Pausing is a performance hint. Playback still restarts on re-entry. */
  }
}

function formatFa(value: number) {
  return Math.round(value).toLocaleString("fa-IR");
}

function animateCounters(scope: ParentNode, reduced: boolean) {
  scope.querySelectorAll<HTMLElement>(".stat-value[data-target]").forEach((node) => {
    if (node.dataset.done) return;
    node.dataset.done = "1";
    const target = Number(node.dataset.target);
    if (!Number.isFinite(target)) return;
    if (reduced) {
      node.textContent = formatFa(target);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 4;
      node.textContent = formatFa(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

export function PageInteractions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = document.querySelectorAll(".aww-section, .reveal-section");

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((node) => node.classList.add("is-visible"));
      animateCounters(document, reduced);
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            if (entry.target.querySelector(".stat-value[data-target]")) {
              animateCounters(entry.target, reduced);
            }
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
      );
      revealTargets.forEach((node) => revealObserver.observe(node));

      const iconObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const icon = entry.target.querySelector("lord-icon");
            if (!icon) return;
            if (entry.isIntersecting) playLordIcon(icon as LordIconElement);
            else if (!reduced) pauseLordIcon(icon as LordIconElement);
          });
        },
        { threshold: 0.45 },
      );
      document.querySelectorAll(".slide-icon-wrap").forEach((node) => iconObserver.observe(node));

      const shineObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            target.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
          });
        },
        { rootMargin: "80px 0px" },
      );
      if (!reduced) {
        document.querySelectorAll<HTMLElement>(".shine-title").forEach((node) => shineObserver.observe(node));
      }

      const marqueeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);
          });
        },
        { rootMargin: "80px 0px" },
      );
      document.querySelectorAll(".marquee-track").forEach((node) => marqueeObserver.observe(node));

      return () => {
        revealObserver.disconnect();
        iconObserver.disconnect();
        shineObserver.disconnect();
        marqueeObserver.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " show" : ""}`}
      aria-label="بازگشت به بالا"
      onClick={() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
    >
      <ChevronUpIcon />
    </button>
  );
}
