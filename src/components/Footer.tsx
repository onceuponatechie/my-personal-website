"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        {/* Sun-ray reflections — a fan of soft parallel rays falling in from
            the top-left, fading as they travel, like light glancing off the
            surface. The mask dissolves the whole effect toward the
            bottom-right so it reads as a reflection rather than stripes. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ maskImage: "linear-gradient(118deg, black 0%, black 32%, transparent 68%)", WebkitMaskImage: "linear-gradient(118deg, black 0%, black 32%, transparent 68%)" }}
        >
          {[
            { left: "-14%", width: "30%", opacity: 0.11, blur: 52 },
            { left: "9%", width: "12%", opacity: 0.09, blur: 34 },
            { left: "19%", width: "5%", opacity: 0.07, blur: 22 },
            { left: "26%", width: "14%", opacity: 0.055, blur: 40 },
            { left: "40%", width: "7%", opacity: 0.045, blur: 26 },
          ].map((ray, i) => (
            <div
              key={i}
              className="absolute -top-[80%] h-[260%] rotate-[34deg]"
              style={{
                left: ray.left,
                width: ray.width,
                opacity: ray.opacity,
                background: "linear-gradient(to right, transparent, white 50%, transparent)",
                filter: `blur(${ray.blur}px)`,
              }}
            />
          ))}
          <div
            className="absolute -left-28 -top-28 h-96 w-96 rounded-full opacity-[0.14] blur-3xl"
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
            <h2 className="font-display tracking-tight text-white">
              <span className="block text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight text-white/80">
                <RevealText text="Let's build an" />
              </span>
              <span className="mt-1 block text-[clamp(3rem,6.4vw,5.25rem)] italic leading-[1.05] text-sage">
                <RevealText text="Experience" delay={0.15} />
              </span>
            </h2>
            <Reveal delay={0.2} className="mt-8 flex md:justify-end">
              {/* Glass-border pill: a soft white gradient ring wraps the same
                  sage core as the navigation button. */}
              <Link
                href="/contact"
                className="group rounded-full bg-gradient-to-b from-white/30 via-white/10 to-white/5 p-[5px] transition hover:from-white/45 hover:via-white/15"
              >
                <span className="inline-flex items-center rounded-full bg-sage px-7 py-3.5 text-[14px] font-medium text-white transition group-hover:brightness-105">
                  Build With Me
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
