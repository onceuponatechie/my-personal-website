"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Logo } from "@/components/SiteChrome";
import { Reveal, RevealText, Parallax } from "@/components/Reveal";
import { EASE } from "@/lib/motion";

const inline1 = "/assets/inline-1.jpg";
const inline2 = "/assets/inline-2.jpg";
const inline3 = "/assets/inline-3.jpg";

const NAV = [
  { label: "Projects", href: "/projects" },
  { label: "Stories", href: "/stories" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

const SOCIAL_ICONS = [
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Github, href: "https://github.com", label: "GitHub" },
];

// A loose, floating cluster of media chips — each drifts in, then bobs on its
// own gentle loop, so the right side feels alive rather than empty.
const CHIPS = [
  { src: inline1, pos: "left-4 top-2 h-32 w-28 rotate-[-8deg]", bob: 5.5, delay: 0 },
  { src: inline2, pos: "right-8 top-8 h-28 w-24 rotate-[7deg]", bob: 6.5, delay: 0.8 },
  { src: inline3, pos: "bottom-1 left-1/2 h-28 w-32 -translate-x-1/2 rotate-[4deg]", bob: 6, delay: 1.4 },
];

function FooterVisual({ className = "" }: { className?: string }) {
  return (
    <Parallax from={28} to={-20} className={className}>
      <div className="relative h-64" aria-hidden>
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
        />
        {CHIPS.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
            className={`absolute ${c.pos}`}
          >
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 2.5, 0] }}
              transition={{ duration: c.bob, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
              className="h-full w-full overflow-hidden rounded-[20px] shadow-[0_22px_44px_-14px_rgba(0,0,0,0.65)] ring-1 ring-white/10"
            >
              <img src={c.src} alt="" className="h-full w-full object-cover" />
            </motion.div>
          </motion.div>
        ))}
        {/* Brand-yellow pulse, echoing the wordmark dot. */}
        <span className="absolute right-16 bottom-6 grid size-3 place-items-center">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-butter opacity-70" />
          <span className="relative inline-flex size-2.5 rounded-full bg-butter" />
        </span>
      </div>
    </Parallax>
  );
}

export function Footer() {
  return (
    <footer className="px-4 pb-6 sm:px-6">
      <div className="relative mx-auto overflow-hidden rounded-[44px] bg-ink text-white">
        {/* Soft sage glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-40 h-[460px] w-[460px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-44 -right-32 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--lavender) 0%, transparent 75%)" }}
        />

        {/* Statement + single CTA on the left, a living visual on the right. */}
        <div className="relative grid gap-10 px-8 pt-16 pb-14 sm:px-14 sm:pt-20 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <Reveal blur>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">
                Open to collaborations
              </p>
            </Reveal>
            <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight">
              <RevealText text="Let's Build an" />{" "}
              <RevealText text="Experience." className="italic text-sage" delay={0.28} />
            </h2>

            <Reveal delay={0.2} className="mt-9 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3.5 text-[14px] font-medium text-white shadow-sm transition hover:brightness-105"
              >
                Start a conversation
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
              </Link>
              <a
                href="mailto:hello@essy.dev"
                className="editorial-underline text-[15px] text-white/70 transition hover:text-white"
              >
                hello@essy.dev
              </a>
            </Reveal>
          </div>

          <FooterVisual className="hidden md:block" />
        </div>

        {/* Slim links + socials */}
        <div className="relative flex flex-col gap-6 border-t border-white/10 px-8 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-14">
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[14px]">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="editorial-underline text-white/70 transition hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
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

        {/* Bottom bar */}
        <div className="relative flex flex-col items-center justify-between gap-3 border-t border-white/10 px-8 py-5 text-[12px] text-white/40 sm:flex-row sm:px-14">
          <Link href="/" aria-label="Essy Udeme — home" className="inline-flex">
            <Logo onDark />
          </Link>
          <p>© 2026 — made with care.</p>
        </div>
      </div>
    </footer>
  );
}
