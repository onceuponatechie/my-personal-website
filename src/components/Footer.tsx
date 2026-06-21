"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowUp, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Logo } from "@/components/SiteChrome";
import { EASE } from "@/lib/motion";

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

const col = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Footer() {
  return (
    <footer className="px-4 pb-6 sm:px-6">
      <div className="relative mx-auto overflow-hidden rounded-[44px] bg-ink text-white">
        {/* Hairline top gradient + sage glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.72 0.07 145 / 0.6), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-44 right-10 h-[460px] w-[460px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--lavender) 0%, transparent 75%)" }}
        />

        {/* Nav columns */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
          className="relative grid gap-10 px-8 py-12 sm:px-14 md:grid-cols-[1.4fr_repeat(2,1fr)_1fr]"
        >
          <motion.div variants={col}>
            <Link href="/" aria-label="Essy Udeme — home" className="inline-flex">
              <Logo onDark />
            </Link>
            <p className="mt-5 max-w-[32ch] text-[13px] leading-[1.65] text-white/55">
              Researcher, builder, and storyteller. Quiet software and honest notes.
            </p>
            <div className="mt-7 flex items-center gap-2">
              {SOCIAL_ICONS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-9 place-items-center rounded-full border border-white/15 text-white/65 transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 hover:text-white"
                >
                  <Icon className="size-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </motion.div>

          {COLUMNS.map((c) => (
            <motion.div key={c.heading} variants={col}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">{c.heading}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="editorial-underline text-[14px] text-white/80 transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div variants={col}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Say hi</p>
            <a
              href="mailto:hello@essy.dev"
              className="editorial-underline mt-5 inline-block text-[14px] text-white/85 transition hover:text-white"
            >
              hello@essy.dev
            </a>
            <Link
              href="/contact"
              className="group mt-3 flex items-center gap-1 text-[13px] text-sage transition hover:brightness-110"
            >
              Open a conversation
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Giant ghosted wordmark — background texture, adds no height */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-8 select-none overflow-hidden px-8 sm:px-14">
          <p className="whitespace-nowrap font-display text-[20vw] leading-[0.75] tracking-tight text-white/[0.045] md:text-[14vw]">
            Essy Udeme
          </p>
        </div>

        {/* Bottom bar */}
        <div className="relative flex flex-col items-center justify-between gap-3 border-t border-white/10 px-8 py-5 text-[12px] text-white/40 sm:flex-row sm:px-14">
          <p>© Essy Udeme, 2026 — Made with care, shipped on a Friday.</p>
          <div className="flex items-center gap-5">
            <p className="tracking-[0.18em] uppercase">Product · Research · Story</p>
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 text-white/55 transition hover:text-white"
            >
              Back to top
              <span className="grid size-6 place-items-center rounded-full border border-white/15 transition group-hover:-translate-y-0.5 group-hover:border-white/40">
                <ArrowUp className="size-3" strokeWidth={2.2} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
