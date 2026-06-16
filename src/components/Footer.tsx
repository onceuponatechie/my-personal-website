"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { EASE, wordRevealRange } from "@/lib/motion";

const COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Stories", href: "/stories" },
      { label: "Resources", href: "/resources" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Free",
    links: [
      { label: "Book Hub", href: "/resources/books" },
      { label: "Tools & Templates", href: "/resources/tools" },
      { label: "Research Vault", href: "/resources/vault" },
    ],
  },
];

const SOCIAL_ICONS = [
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Github, href: "https://github.com", label: "GitHub" },
];

function RevealWord({
  text,
  progress,
  index,
  total,
}: {
  text: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const [start, end] = wordRevealRange(index, total, { spread: 2.5 });
  // Reveal as brightness only — every word resolves to solid white.
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block text-white">
      {text}
    </motion.span>
  );
}

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Wider range = a calmer, more balanced reveal as the footer scrolls up.
    offset: ["start 0.95", "center 0.55"],
  });

  const words = ["Let's", "build", "an", "Experience."];

  return (
    <footer className="px-4 pb-6 sm:px-6">
      <div
        ref={ref}
        className="relative mx-auto overflow-hidden rounded-[44px] bg-ink text-white"
      >
        {/* Soft sage glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-[460px] w-[460px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
        />

        {/* Top: scroll-reveal headline + CTA */}
        <div className="relative px-8 pb-16 pt-24 sm:px-16 sm:pb-20 sm:pt-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] tracking-tight text-white">
              {words.map((w, i) => (
                <span key={i}>
                  <RevealWord text={w} progress={scrollYProgress} index={i} total={words.length} />{" "}
                </span>
              ))}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-sage py-3 pl-6 pr-3 text-[14px] font-medium text-white shadow-[0_10px_40px_-12px_oklch(0.72_0.07_145/0.7)] ring-1 ring-white/10 transition hover:brightness-110"
              >
                Build With Me
                <span className="grid size-8 place-items-center rounded-full bg-white text-ink transition group-hover:rotate-45">
                  <ArrowUpRight className="size-4" strokeWidth={2.2} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Middle: nav columns */}
        <div className="relative grid gap-12 border-t border-white/10 px-8 py-14 sm:px-16 md:grid-cols-[1.4fr_repeat(2,1fr)_1fr]">
          <div>
            <Link href="/" className="inline-flex items-baseline gap-2">
              <span className="font-display text-[26px] leading-none text-white">essy</span>
              <span className="text-[12px] uppercase tracking-[0.22em] text-white/45">/ udeme</span>
            </Link>
            <p className="mt-5 max-w-[34ch] text-[13px] leading-[1.65] text-white/55">
              Product researcher, builder, and storyteller. Quiet software, honest journals, and the occasional book note.
            </p>
            <div className="mt-7 flex items-center gap-2">
              {SOCIAL_ICONS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-9 place-items-center rounded-full border border-white/15 text-white/65 transition hover:border-white/40 hover:text-white"
                >
                  <Icon className="size-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">{col.heading}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[14px] text-white/80 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Say hi</p>
            <a href="mailto:hello@essy.dev" className="mt-5 block text-[14px] text-white/85 transition hover:text-white">
              hello@essy.dev
            </a>
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center gap-1 text-[13px] text-sage transition hover:brightness-110"
            >
              Open a conversation
              <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative flex flex-col items-center justify-between gap-3 border-t border-white/10 px-8 py-6 text-[12px] text-white/40 sm:flex-row sm:px-16">
          <p>© Essy Udeme, 2026 — Made with care, shipped on a Friday.</p>
          <p className="tracking-[0.18em] uppercase">Product · Research · Story</p>
        </div>
      </div>
    </footer>
  );
}
