"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SmileyMark } from "@/components/SmileyMark";
import { Reveal, RevealText } from "@/components/Reveal";

const NAV_COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Stories", href: "/stories" },
      { label: "Book Hub", href: "/resources/books" },
      { label: "Tools & Templates", href: "/resources/tools" },
      { label: "Research Vault", href: "/resources/vault" },
    ],
  },
];

const SOCIALS = [
  { label: "X", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "GitHub", href: "https://github.com" },
];

export function Footer() {
  return (
    <footer className="px-4 pb-6 sm:px-6">
      <div className="relative mx-auto overflow-hidden rounded-[44px] bg-ink text-white ring-1 ring-white/10 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.5)]">
        {/* Spotlight — soft diagonal beams sweeping in from the top-left,
            like stage light raking across the dark surface. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-[60%] left-[-16%] h-[220%] w-[46%] rotate-[26deg] opacity-[0.2]"
            style={{ background: "linear-gradient(to right, transparent, white 45%, transparent)", filter: "blur(44px)" }}
          />
          <div
            className="absolute -top-[60%] left-[12%] h-[220%] w-[22%] rotate-[26deg] opacity-[0.13]"
            style={{ background: "linear-gradient(to right, transparent, white 50%, transparent)", filter: "blur(32px)" }}
          />
          <div
            className="absolute -top-[60%] left-[30%] h-[220%] w-[10%] rotate-[26deg] opacity-[0.08]"
            style={{ background: "linear-gradient(to right, transparent, white 50%, transparent)", filter: "blur(24px)" }}
          />
          <div
            className="absolute -left-24 -top-24 h-80 w-80 rounded-full opacity-[0.16] blur-3xl"
            style={{ background: "radial-gradient(closest-side, white 0%, transparent 75%)" }}
          />
        </div>

        {/* ---------- Status bar ---------- */}
        <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-7 py-5 sm:px-12">
          <span className="inline-flex items-center gap-2.5 text-[12px] text-white/70 sm:text-[13px]">
            <span className="relative grid size-2 place-items-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-sage" />
            </span>
            What are we building today?
          </span>
          <span className="text-[12px] text-white/40 sm:text-[13px]">Essy Udeme® — 2026</span>
        </div>

        {/* ---------- Middle: nav + statement ---------- */}
        <div className="relative grid gap-12 px-7 py-14 sm:px-12 sm:py-16 md:grid-cols-2 md:items-end">
          {/* Nav columns */}
          <div className="order-2 grid max-w-md grid-cols-2 gap-x-8 md:order-1">
            {NAV_COLS.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="editorial-underline text-[15px] text-white/65 transition hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Statement + CTA */}
          <div className="order-1 md:order-2 md:justify-self-end md:text-right">
            <div className="mb-6 flex md:justify-end">
              <SmileyMark />
            </div>
            <h2 className="font-display text-[clamp(2.25rem,4.6vw,3.6rem)] leading-[1.04] tracking-tight text-white">
              <RevealText text="Let's build a" />
              <br />
              <RevealText text="lasting" className="italic text-sage" delay={0.15} />{" "}
              <RevealText text="experience" delay={0.28} />
            </h2>
            <Reveal delay={0.2} className="mt-8 flex md:justify-end">
              {/* Glass-border pill: a soft white gradient ring wraps a slightly
                  lifted dark core, echoing light catching the button's edge. */}
              <Link
                href="/contact"
                className="group rounded-full bg-gradient-to-b from-white/30 via-white/10 to-white/5 p-[5px] transition hover:from-white/45 hover:via-white/15"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.27_0.005_260)] px-7 py-3.5 text-[14px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  Build With Me
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-white/10 px-7 py-6 sm:flex-row sm:px-12">
          <p className="order-2 text-[12px] text-white/40 sm:order-1">© 2026 Essy Udeme. All rights reserved.</p>
          <nav className="order-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:order-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="editorial-underline inline-flex items-center gap-1 text-[13px] text-white/60 transition hover:text-white"
              >
                {s.label}
                <ArrowUpRight className="size-3 opacity-60" strokeWidth={2} />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
