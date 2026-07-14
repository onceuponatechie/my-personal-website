"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Ambient background video for the hero — a slow silk-curtain loop born from
 * the site palette, so its base tone IS the page background.
 *
 * The seamlessness comes from three layers:
 *  1. The footage's ground color matches --background exactly.
 *  2. A CSS mask dissolves the video to transparent at its top and bottom
 *     edges, so the page background shows through — a perfect match by
 *     definition, no color-banding seam possible.
 *  3. Scroll progress fades the whole layer to 0 before the hero leaves the
 *     viewport, so even the motion is gone by the time you could look for it.
 *
 * Swap /assets/hero-bg.webm (+ optional .mp4 source for older Safari) with
 * real footage whenever it's ready — nothing else needs to change.
 */
export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  /* Scroll-linked dissolve — fully faded once ~70% of the hero has scrolled
     by. A plain scroll listener writing inline opacity: deterministic, cheap,
     and immune to observer/measurement races on an absolute layer. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -r.top / (r.height * 0.7 || 1)));
      el.style.opacity = (1 - progress).toFixed(3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // MediaRecorder-produced webm reports Infinity duration, which breaks
    // `loop`. Seeking far past the end forces the browser to compute the real
    // duration; then rewind and let `loop` behave. Harmless for normal files.
    const fixDuration = () => {
      if (v.duration === Infinity) {
        v.currentTime = 1e10;
        v.addEventListener(
          "timeupdate",
          () => {
            v.currentTime = 0;
            v.play().catch(() => {});
          },
          { once: true }
        );
      }
    };
    v.addEventListener("loadedmetadata", fixDuration);
    if (v.readyState >= 1) fixDuration();

    // No reason to burn battery animating pixels nobody can see.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => {
      v.removeEventListener("loadedmetadata", fixDuration);
      io.disconnect();
    };
  }, []);

  const maskCls =
    "h-full w-full object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_58%,transparent_100%)]";

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      {reduceMotion ? (
        <img src="/assets/hero-poster.jpg" alt="" className={maskCls} />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero-poster.jpg"
          className={maskCls}
        >
          <source src="/assets/hero-bg.webm" type="video/webm" />
        </video>
      )}
    </div>
  );
}
