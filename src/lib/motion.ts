import type { Transition } from "framer-motion";

/**
 * Design-system motion tokens.
 * One editorial easing curve + tuned timings so every animation on the
 * site feels like it belongs to the same hand.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.45,
  base: 0.6,
  slow: 0.85,
} as const;

/** A gentle "rise + fade" used for cards, headings, and list items. */
export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
};

/** Stagger container for grouped reveals. */
export const stagger = (children = 0.1, delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: children, delayChildren: delay } },
});

export const viewportOnce = { once: true, margin: "-12%" } as const;

export const baseTransition: Transition = { duration: DURATION.base, ease: EASE };

/**
 * Word-by-word scroll reveal window.
 *
 * Given a word's index and the total count, returns the [start, end] scroll
 * progress where that word fades in. Windows overlap by `spread` words so the
 * cascade reads as one smooth, balanced sweep rather than a rapid flicker, and
 * the whole sequence resolves a little before the scroll completes (`settle`).
 */
export function wordRevealRange(
  index: number,
  total: number,
  { spread = 4, settle = 0.9 }: { spread?: number; settle?: number } = {}
): [number, number] {
  const step = settle / total;
  const start = index * step;
  const end = Math.min(1, start + step * spread);
  return [start, end];
}
