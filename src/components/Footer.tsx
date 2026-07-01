"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowUp, Twitter, Instagram, Linkedin, Github, Mail } from "lucide-react";
import { Logo } from "@/components/SiteChrome";
import { Reveal, RevealText } from "@/components/Reveal";

const LINK_GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Stories", href: "/stories" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Book Hub", href: "/resources/books" },
      { label: "Tools & Templates", href: "/resources/tools" },
      { label: "Research Vault", href: "/resources/vault" },
    ],
  },
];

const SOCIALS: { Icon: typeof Twitter; href: string; label: string }[] = [
  { Icon: Twitter, href: "https://twitter.com", label: "X" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Github, href: "https://github.com", label: "GitHub" },
];

export function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="px-4 pb-6 sm:px-6">
      <div className="relative mx-auto overflow-hidden rounded-[44px] bg-ink text-white">
        {/* Soft accent glows, echoing the site palette */}
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

        {/* ---------- CTA band ---------- */}
        <div className="relative px-8 pt-16 pb-14 sm:px-14 sm:pt-20">
          <Reveal blur>
            <p className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] text-white/45">
              <span className="relative grid size-2 place-items-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-sage" />
              </span>
              Open to collaborations
            </p>
          </Reveal>
          <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] tracking-tight">
            <RevealText text="Let's build an" />{" "}
            <RevealText text="experience." className="italic text-sage" delay={0.28} />
          </h2>

          <Reveal delay={0.2} className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3.5 text-[14px] font-medium text-white shadow-sm transition hover:brightness-105"
            >
              Start a conversation
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
            </Link>
            <a
              href="mailto:hello@essy.dev"
              className="editorial-underline inline-flex items-center gap-2 text-[15px] text-white/70 transition hover:text-white"
            >
              <Mail className="size-4" strokeWidth={1.8} />
              hello@essy.dev
            </a>
          </Reveal>
        </div>

        {/* ---------- Link columns ---------- */}
        <div className="relative grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 px-8 py-12 sm:grid-cols-[1.5fr_1fr_1fr] sm:px-14">
          {/* Brand blurb */}
          <div className="col-span-2 max-w-[36ch] sm:col-span-1">
            <Logo onDark />
            <p className="mt-4 text-[13px] leading-[1.7] text-white/55">
              A calm corner of the internet — products, stories, and the tools behind them, made by one
              curious person.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-[12px] text-white/45">
              <span className="relative grid size-2 place-items-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-butter opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-butter" />
              </span>
              Currently building at <span className="text-white/75">NitHub</span> · Lagos
            </p>
          </div>

          {LINK_GROUPS.map((g) => (
            <div key={g.title}>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">{g.title}</p>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="editorial-underline text-[14px] text-white/70 transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="relative flex flex-col items-center justify-between gap-5 border-t border-white/10 px-8 py-6 sm:flex-row sm:px-14">
          <p className="order-2 text-[12px] text-white/40 sm:order-1">
            © 2026 Essy Udeme — made with care.
          </p>

          <div className="order-1 flex items-center gap-2.5 sm:order-2">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid size-9 place-items-center rounded-full border border-white/15 text-white/65 transition hover:border-white/40 hover:bg-white/5 hover:text-white"
              >
                <Icon className="size-4" strokeWidth={1.8} />
              </a>
            ))}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group ml-1 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[12px] font-medium text-white/70 transition hover:border-white/40 hover:text-white"
            >
              Top
              <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
