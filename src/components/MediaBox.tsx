"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  images: string[];
  /** Starting frame, so two boxes cycling the same array never show the
   * same image at once. */
  offset?: number;
  alt?: string;
}

/** A fixed 72×44 media chip that lives mid-sentence inside an <h1>.
 * The outer inline-flex span with align-middle is what lets it vertically
 * center against the text; inside, all images stack and crossfade on a
 * 3s cycle over a dark fallback so it never flashes empty. */
export function MediaBox({ images, offset = 0, alt = "" }: Props) {
  const [index, setIndex] = useState(offset);

  useEffect(() => {
    const t = setInterval(() => setIndex((v) => (v + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <span className="relative mx-1.5 inline-flex h-[44px] w-[72px] align-middle">
      <span
        className="absolute inset-0 overflow-hidden rounded-2xl border border-white/20 shadow-lg"
        style={{ backgroundColor: "hsl(0 0% 12%)" }}
      >
        {images.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt={alt}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}
        {/* Light 3D finish — a top sheen, an inner rim highlight, and a soft
            bottom shade, all quiet enough to read as texture, not chrome. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 via-white/[0.03] to-black/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(0,0,0,0.25)]"
        />
      </span>
    </span>
  );
}
