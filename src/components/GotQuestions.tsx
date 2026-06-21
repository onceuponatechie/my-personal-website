"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "@/lib/motion";

/**
 * The site's final contact moment — a single calm CTA box. It replaces the
 * old FAQ accordion (and the footer's duplicate headline), so there's just
 * one "let's talk" prompt before the sign-off.
 */
export function GotQuestions() {
  return (
    <section id="got-questions" className="px-4 pb-24 pt-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[36px] bg-ink px-8 py-14 text-center text-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
        />
        <h3 className="relative font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight">
          Got <span className="italic">questions?</span>
        </h3>
        <p className="relative mt-3 text-[14px] text-white/65">
          A project, a collaboration, or just a hello — I&apos;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="group relative mt-7 inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3.5 text-[14px] font-medium text-white shadow-sm transition hover:brightness-105"
        >
          Get in Touch
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
        </Link>
      </motion.div>
    </section>
  );
}
