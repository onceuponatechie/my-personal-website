"use client";

import { useEffect, useState } from "react";

interface Props {
  images: string[];
  shape?: "pebble" | "pill";
  className?: string;
  alt?: string;
}

/** Inline media that auto-cycles through images with a soft cross-fade. */
export function InlineMedia({ images, shape = "pebble", className = "", alt = "" }: Props) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % images.length), 2400);
    return () => clearInterval(t);
  }, [images.length]);

  const radius = shape === "pill" ? "rounded-full" : "rounded-[42%_58%_55%_45%/55%_45%_58%_42%]";

  return (
    <span
      className={`relative inline-block overflow-hidden align-middle shadow-[0_8px_22px_-10px_rgba(0,0,0,0.35)] ${radius} ${className}`}
    >
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </span>
  );
}
