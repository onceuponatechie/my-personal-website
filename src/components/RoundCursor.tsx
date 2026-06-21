"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A custom round cursor that replaces the native one on fine-pointer devices.
 *
 * The native pointer position is stored as a target; a requestAnimationFrame
 * loop lerps the rendered position toward it (factor 0.15 per frame) for a
 * trailing, eased glide. Hovering anything interactive grows the dot and
 * shifts its colour from soft butter yellow to lavender. On coarse pointers
 * (touch) the effect bails out and the element is hidden via CSS, so mobile
 * keeps its normal cursor.
 */
export function RoundCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const HOVER_SELECTOR =
      "a, button, [role=button], [data-cursor=pointer], input, textarea, select";
    const onOver = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest?.(HOVER_SELECTOR)) setHovering(true);
    };
    const onOut = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest?.(HOVER_SELECTOR)) setHovering(false);
    };

    let raf = 0;
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.15;
      pos.y += (target.y - pos.y) * 0.15;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  const size = hovering ? 25 : 20;

  return (
    <div
      ref={wrapRef}
      data-round-cursor
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
    >
      <div
        className="rounded-full transition-all duration-200 ease-out"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          backgroundColor: hovering ? "var(--lavender)" : "var(--butter)",
        }}
      />
    </div>
  );
}
