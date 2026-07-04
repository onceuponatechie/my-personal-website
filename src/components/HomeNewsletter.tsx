"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { EASE } from "@/lib/motion";

/** Swap for the real Substack address when it's live. */
const SUBSTACK_URL = "https://essyudeme.substack.com";

export function HomeNewsletter() {
  return (
    <section className="px-4 pb-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative mx-auto flex max-w-4xl flex-col items-center overflow-hidden rounded-[44px] bg-ink px-8 py-14 text-center text-white sm:px-14 sm:py-16"
      >
        {/* Soft accent glows in the site's palette. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-35 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--lavender) 0%, transparent 75%)" }}
        />

        <span className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
          <Sparkles className="size-3.5" strokeWidth={2} /> The Letter
        </span>

        <h2 className="relative mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight">
          Good things, straight to <span className="italic text-sage">your inbox</span>
        </h2>

        <p className="relative mt-4 max-w-[46ch] text-[14px] leading-[1.7] text-white/65">
          New builds, fresh tools and templates, subscriber-only offers, and the occasional essay —
          sent when there&apos;s something genuinely worth your time, not on a schedule.
        </p>

        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noreferrer"
          className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-sage py-3 pl-6 pr-2 text-[14px] font-medium text-white transition hover:brightness-105"
        >
          Subscribe on Substack
          <span className="grid size-8 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="size-4" strokeWidth={2.4} />
          </span>
        </a>

        <p className="relative mt-4 text-[11px] text-white/40">Free · No spam · Unsubscribe anytime</p>
      </motion.div>
    </section>
  );
}
