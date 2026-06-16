"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * A soft, hand-drawn lavender underline that sweeps beneath a word.
 * Wrap an inline word with it; the stroke draws itself when scrolled into view.
 *
 *   From the <CurvedUnderline>Desk</CurvedUnderline>
 */
export function CurvedUnderline({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute -bottom-[0.18em] left-0 h-[0.32em] w-full overflow-visible"
      >
        <motion.path
          d="M3 9 C 38 2.5, 78 2.5, 116 7 S 176 12.5, 197 5.5"
          stroke="var(--color-lavender)"
          strokeWidth={5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: EASE }}
        />
      </svg>
    </span>
  );
}
