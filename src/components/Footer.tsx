"use client";

import Link from "next/link";
import { ArrowUpRight, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Logo } from "@/components/SiteChrome";
import { Reveal } from "@/components/Reveal";

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

        {/* Statement + single CTA — the one "let's talk" moment, set big. */}
        <div className="relative px-8 pt-16 pb-14 sm:px-14 sm:pt-20">
          <Reveal blur>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">
              Let&apos;s make something
            </p>
            <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight">
              Quietly good, <span className="italic text-sage">together.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="mt-9 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
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
