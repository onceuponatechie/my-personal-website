"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { wordRevealRange } from "@/lib/motion";

/**
 * One unit of a scroll-scrubbed typewriter: a character (or inline media
 * slot) that pops in crisp as the scroll frontier passes it — invisible
 * before its window, blurred while inside it, sharp after — so a sentence
 * appears to type itself out as you scroll.
 */
export function TypeUnit({
  progress,
  index,
  total,
  className = "",
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  className?: string;
  children: React.ReactNode;
}) {
  const [start, end] = wordRevealRange(index, total, { spread: 3, settle: 0.92 });
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const filter = useTransform(progress, [start, end], ["blur(7px)", "blur(0px)"]);
  return (
    <motion.span style={{ opacity, filter }} className={`inline-block ${className}`}>
      {children}
    </motion.span>
  );
}

/** Renders a word as typewriter characters (index advances one per char,
 * including the trailing space), kept in one wrapper so it never breaks
 * mid-word. */
export function TypeWord({
  progress,
  word,
  startIndex,
  total,
  className = "",
}: {
  progress: MotionValue<number>;
  word: string;
  startIndex: number;
  total: number;
  className?: string;
}) {
  const chars = [...(word + " ")];
  return (
    <span className={`inline-block whitespace-pre ${className}`}>
      {chars.map((ch, j) => (
        <TypeUnit key={j} progress={progress} index={startIndex + j} total={total}>
          {ch}
        </TypeUnit>
      ))}
    </span>
  );
}
