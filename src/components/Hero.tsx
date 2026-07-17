"use client";

import { motion, type Variants } from "framer-motion";
import { SmileyMark } from "@/components/SmileyMark";
import { MediaBox } from "@/components/MediaBox";
import { PillBadge, ArrowRight } from "@/components/SiteChrome";
import { EASE } from "@/lib/motion";

const inline1 = "/assets/inline-1.jpg";
const inline2 = "/assets/inline-2.jpg";
const inline3 = "/assets/inline-3.jpg";
const inline4 = "/assets/inline-4.jpg";

/* Both media boxes cycle this same array; their `offset` prop staggers the
   starting frame so they show different images at the same time. */
const thumbnails = [inline1, inline2, inline3, inline4];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

// The headline choreographs its pieces on explicit delays: the media boxes
// pop in early (0.14s / 0.18s) so the images "land" before the words, then
// the text spans blur in behind them (0.4s–0.84s).
const headline: Variants = {
  hidden: {},
  show: {},
};

const textReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const mediaReveal: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: EASE, delay },
  }),
};

export function Hero() {
  return (
    // Mobile: equal air above the smiley and below the freebie link, so the
    // hero sits centred between the nav and the first card. Desktop keeps
    // its original rhythm.
    <section className="relative px-4 pt-16 pb-16 md:pt-6 md:pb-36">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-5xl flex-col items-start text-left"
      >
        <motion.div variants={fadeUp}>
          <SmileyMark />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-5">
          <PillBadge>Open to Collaborations</PillBadge>
        </motion.div>

        {/* The headline is its own stagger container — text de-blurs, the inline
            media pops in — while keeping the original layout and line breaks. */}
        <motion.h1
          variants={headline}
          className="mt-8 font-display text-[clamp(2.35rem,5.4vw,4.25rem)] leading-[1.08] tracking-[-0.01em] text-foreground"
        >
          {/* Mobile reads in four lines; desktop keeps its three. The md:hidden
              and hidden-md:block breaks swap which line ends where. */}
          <motion.span variants={textReveal} custom={0.4} className="inline">
            Products, people,
          </motion.span>{" "}
          <br className="md:hidden" />
          <motion.span variants={textReveal} custom={0.51} className="inline">and the</motion.span>{" "}
          <br className="hidden md:block" />
          <motion.span variants={mediaReveal} custom={0.14} className="inline-flex align-middle">
            <MediaBox images={thumbnails} offset={0} alt="changing inline media" />
          </motion.span>{" "}
          <motion.span variants={textReveal} custom={0.62} className="inline">stories</motion.span>{" "}
          <br className="md:hidden" />
          <motion.span variants={textReveal} custom={0.73} className="inline">between</motion.span>{" "}
          <br className="hidden md:block" />
          <motion.span variants={mediaReveal} custom={0.18} className="inline-flex align-middle">
            <MediaBox images={thumbnails} offset={2} alt="changing inline media" />
          </motion.span>{" "}
          <br className="md:hidden" />
          <motion.span variants={textReveal} custom={0.84} className="inline">them.</motion.span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-7 text-[16px] text-muted-foreground">
          Creator <span className="mx-2 opacity-50">·</span> Builder
          <span className="mx-2 opacity-50">·</span> Storyteller
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_10px_24px_-12px_oklch(0.72_0.07_145/0.7)] transition hover:bg-ink hover:shadow-[0_10px_24px_-12px_rgba(28,28,34,0.45)]"
          >
            Explore My Work
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#resources" className="group inline-flex items-center gap-1.5 text-[14px] text-foreground underline underline-offset-4 hover:opacity-70">
            Or grab a freebie
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
