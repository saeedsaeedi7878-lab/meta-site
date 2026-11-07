"use client";

import { useLayoutEffect, useRef } from "react";
import { SVG_LIB, SYMBOLS, type ScienceSymbol } from "@/lib/science-symbols";

function markupFor(name: ScienceSymbol["svg"]) {
  if (name === "orbit") return "";
  return SVG_LIB[name];
}

function isAppleTouch() {
  const ua = navigator.userAgent;
  return /iP(hone|ad|od)/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export function DepthSymbols() {
  const worldRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const world = worldRef.current;
    if (!world) return;
    const nodes = Array.from(world.querySelectorAll<HTMLElement>(".symbol"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const place = () => {
      const apple = isAppleTouch();
      const mobile = window.innerWidth <= 900 || apple;
      if (apple) document.documentElement.classList.add("is-ios");

      nodes.forEach((node, index) => {
        const raw = SYMBOLS[index];
        const cfg = mobile
          ? {
              ...raw,
              scale: Math.min(raw.scale * 0.7, 2.6),
              opacity: Math.min(raw.opacity * 1.25, 0.36),
            }
          : raw;
        const size = 80 * cfg.scale;
        let x = cfg.x;
        if (mobile) {
          const widthPct = (size / Math.max(window.innerWidth, 1)) * 100;
          x = Math.min(Math.max(x, 1), Math.max(1, 97 - widthPct));
        }
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        node.style.left = `${x}%`;
        node.style.top = `${cfg.y}%`;
        node.style.opacity = String(cfg.opacity);
        node.style.zIndex = String(cfg.layer);
        node.dataset.factor = String(cfg.factor);
        node.dataset.rotSpeed = String(cfg.rotSpeed);
        node.dataset.phase = String(cfg.phase);
      });
      return apple;
    };

    let apple = place();
    if (reduced) return;

    const apply = (y: number) => {
      const rotMul = apple ? 0.09 : 0.14;
      for (const node of nodes) {
        const factor = Number(node.dataset.factor);
        const rotSpeed = Number(node.dataset.rotSpeed);
        const phase = Number(node.dataset.phase);
        const yOffset = y * factor;
        const xOffset = Math.sin(y * 0.0022 + phase) * (58 * factor);
        const rotation = y * rotSpeed * rotMul;
        node.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${rotation}deg)`;
      }
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        apply(window.scrollY);
      });
    };

    apply(window.scrollY || 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      apple = place();
      apply(window.scrollY || 0);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="depth-world" id="depth-world" ref={worldRef} aria-hidden="true">
      {SYMBOLS.map((symbol) => (
        <div
          key={`${symbol.svg}-${symbol.x}-${symbol.y}`}
          className="symbol"
          dangerouslySetInnerHTML={{ __html: markupFor(symbol.svg) }}
        />
      ))}
    </div>
  );
}
