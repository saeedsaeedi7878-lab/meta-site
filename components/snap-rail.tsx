"use client";

import { useRef, type KeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

function Chevron({ direction }: { direction: "start" | "end" }) {
  return (
    <svg className={direction === "end" ? "rail-chevron is-end" : "rail-chevron"} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SnapRail({
  label,
  titleId,
  title,
  lede,
  children,
}: {
  label: string;
  titleId: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; id: number; locked: boolean } | null>(null);

  function move(direction: 1 | -1) {
    const rail = scroller.current;
    const card = rail?.querySelector<HTMLElement>(":scope > *");
    if (!rail || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delta = (card.offsetWidth + 18) * direction;
    rail.scrollBy({ left: delta, behavior: reduced ? "auto" : "smooth" });
  }

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    const rtl = document.dir === "rtl";
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(rtl ? 1 : -1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(rtl ? -1 : 1);
    }
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const rail = scroller.current;
    if (!rail) return;
    drag.current = { x: event.clientX, y: event.clientY, id: event.pointerId, locked: false };
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = scroller.current;
    const state = drag.current;
    if (!rail || !state || state.id !== event.pointerId) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (!state.locked) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.current = null;
        return;
      }
      state.locked = true;
      rail.classList.add("is-dragging");
      rail.setPointerCapture(event.pointerId);
    }
    rail.scrollBy({ left: dx, behavior: "auto" });
    state.x = event.clientX;
    state.y = event.clientY;
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = scroller.current;
    if (!rail || drag.current?.id !== event.pointerId) return;
    drag.current = null;
    rail.classList.remove("is-dragging");
  }

  return (
    <div className="rail-block">
      <div className="showcase-head">
        <div>
          <h2 id={titleId}>{title}</h2>
          <p>{lede}</p>
        </div>
        <div className="rail-controls">
          <button type="button" className="rail-btn" onClick={() => move(document.dir === "rtl" ? 1 : -1)} aria-label="قبلی">
            <Chevron direction="end" />
          </button>
          <button type="button" className="rail-btn" onClick={() => move(document.dir === "rtl" ? -1 : 1)} aria-label="بعدی">
            <Chevron direction="start" />
          </button>
        </div>
      </div>
      <div
        className="snap-rail"
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label={label}
        onKeyDown={onKey}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {children}
      </div>
    </div>
  );
}
