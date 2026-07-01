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
      <div className="relative mx-auto overflow-hidden rounded-[44px] bg-ink text-white shadow-[0_30px_80px_-45px_rgba(0,0,0,0.6)]">
        {/* Accent glows, echoing the site palette on the dark field. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-40 h-[460px] w-[460px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-28 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--lavender) 0%, transparent 75%)" }}
        />
        {/* Soft sage horizon rising behind the wordmark. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{ background: "radial-gradient(120% 80% at 50% 135%, oklch(0.72 0.07 145 / 0.22) 0%, transparent 62%)" }}
        />

        {/* ---------- Status bar ---------- */}
        <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-7 py-5 sm:px-12">
          <span className="inline-flex items-center gap-2.5 text-[12px] text-white/70 sm:text-[13px]">
            <span className="relative grid size-2 place-items-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-sage" />
            </span>
            Available for new projects
          </span>
          <span className="text-[12px] text-white/45 sm:text-[13px]">Essy Udeme® — 2026</span>
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
                        className="editorial-underline text-[15px] text-white/70 transition hover:text-white"
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
              <RevealText text="Let's build something" />
              <br />
              <RevealText text="people" delay={0.15} />{" "}
              <RevealText text="remember" className="italic text-sage" delay={0.28} />
            </h2>
            <Reveal delay={0.2} className="mt-8 flex md:justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3.5 text-[14px] font-medium text-white shadow-sm transition hover:brightness-105"
              >
                Let&apos;s work together
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-white/10 px-7 py-6 sm:flex-row sm:px-12">
          <p className="order-2 text-[12px] text-white/45 sm:order-1">© 2026 Essy Udeme. All rights reserved.</p>
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

        {/* ---------- Oversized wordmark ---------- */}
        <div aria-hidden className="relative select-none px-2 pt-2 pb-9 sm:pb-12">
          <span className="block whitespace-nowrap text-center font-display italic text-[clamp(3.5rem,18vw,15rem)] leading-[0.9] tracking-tight text-white/[0.06]">
            Essy Udeme
          </span>
        </div>
      </div>
    </footer>
  );
}
