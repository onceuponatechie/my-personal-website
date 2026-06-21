"use client";

import { motion, type Variants } from "framer-motion";
import { SmileyMark } from "@/components/SmileyMark";
import { InlineMedia } from "@/components/InlineMedia";
import { PillBadge, ArrowRight } from "@/components/SiteChrome";
import { EASE } from "@/lib/motion";

const inline1 = "/assets/inline-1.jpg";
const inline2 = "/assets/inline-2.jpg";
const inline3 = "/assets/inline-3.jpg";
const inline4 = "/assets/inline-4.jpg";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

// The headline cascades its own pieces: words de-blur in, the inline media
// pops up from small. A slightly slower stagger gives the line a felt rhythm.
const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

export function Hero() {
  const setA = [inline1, inline3];
  const setB = [inline2, inline4];

  return (
    <section className="relative px-4 pt-4 pb-28 md:pt-6 md:pb-36">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-5xl flex-col items-center text-center"
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
          className="mt-8 font-display text-[clamp(2.6rem,6vw,4.75rem)] leading-[1.08] tracking-[-0.01em] text-foreground"
        >
          {/* Mobile reads in four lines; desktop keeps its three. The md:hidden
              and hidden-md:block breaks swap which line ends where. */}
          <motion.span variants={blurIn} className="inline">
            <span className="italic">Products</span>, <span className="italic">people</span>,
          </motion.span>{" "}
          <br className="md:hidden" />
          <motion.span variants={blurIn} className="inline">and the</motion.span>{" "}
          <br className="hidden md:block" />
          <motion.span variants={popIn} className="inline-block align-middle">
            <InlineMedia
              images={setA}
              className="mx-1 h-[0.85em] w-[1.05em] -translate-y-1"
              alt="changing inline media"
            />
          </motion.span>{" "}
          <motion.span variants={blurIn} className="inline"><span className="italic">stories</span></motion.span>{" "}
          <br className="md:hidden" />
          <motion.span variants={blurIn} className="inline">that connect</motion.span>{" "}
          <br className="hidden md:block" />
          <motion.span variants={popIn} className="inline-block align-middle">
            <InlineMedia
              images={setB}
              shape="pill"
              className="mx-1 h-[0.7em] w-[1.1em] -translate-y-1"
              alt="changing inline media"
            />
          </motion.span>{" "}
          <br className="md:hidden" />
          <motion.span variants={blurIn} className="inline">them.</motion.span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-7 text-[15px] text-muted-foreground">
          Researcher <span className="mx-2 opacity-50">·</span> Builder
          <span className="mx-2 opacity-50">·</span> Storyteller
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3.5 text-[14px] font-medium text-white shadow-[0_10px_24px_-12px_oklch(0.72_0.07_145/0.7)] transition hover:brightness-105"
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
