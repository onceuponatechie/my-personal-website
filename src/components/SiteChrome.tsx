"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";

type NavChild = { href: string; label: string; desc: string };
type NavLink = { href: string; label: string; children?: NavChild[] };

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/resources",
    label: "Resources",
    children: [
      { href: "/stories", label: "The Build Diary", desc: "Blogs from the build" },
      { href: "/resources/tools", label: "Tools & Templates", desc: "Ready-to-use files" },
      { href: "/resources/vault", label: "Research Vault", desc: "Deep dives & reports" },
    ],
  },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

/* Shared floating-chip surface so the logo, nav pill, and menu button read as
   one family while sitting apart from each other. */
const CHIP =
  "rounded-full border border-black/5 bg-card/90 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-md";

function isActive(pathname: string, l: NavLink) {
  if (l.href === "/") return pathname === "/";
  return pathname.startsWith(l.href) || (l.children?.some((c) => pathname.startsWith(c.href)) ?? false);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* Wordmark bare on the left; links and the CTA share one pill on the
          right. */}
      <div className="relative flex items-center justify-between">
        {/* The wordmark sits bare on the page — no chip, no border. */}
        <Link href="/" aria-label="Essy Udeme — home" className="inline-flex items-center py-2.5">
          <Logo />
        </Link>

        <nav
          className={`${CHIP} hidden items-center gap-1 p-1.5 text-[13px] text-muted-foreground md:flex`}
        >
          {NAV_LINKS.map((l) => {
            const active = isActive(pathname, l);
            const itemCls = `rounded-full px-4 py-2 transition ${
              active
                ? "bg-sage-soft font-medium text-ink shadow-sm"
                : "hover:bg-foreground/[0.04] hover:text-foreground"
            }`;
            return l.children ? (
              <div key={l.href} className="group/nav relative">
                <Link href={l.href} className={`flex items-center gap-1 ${itemCls}`}>
                  {l.label}
                  <ChevronDown
                    className="size-3.5 transition-transform duration-300 group-hover/nav:rotate-180"
                    strokeWidth={2}
                    aria-hidden
                  />
                </Link>
                {/* Hover-revealed dropdown — pick a page without leaving the bar. */}
                <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:opacity-100">
                  <div className="rounded-3xl border border-black/5 bg-card/95 p-2 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.22)] backdrop-blur-md">
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`flex flex-col rounded-2xl px-3.5 py-2.5 transition hover:bg-foreground/5 ${
                          pathname === c.href ? "bg-foreground/5" : ""
                        }`}
                      >
                        <span className="text-[13px] font-medium text-foreground">{c.label}</span>
                        <span className="text-[11px] text-muted-foreground">{c.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={l.href} href={l.href} className={itemCls}>
                {l.label}
              </Link>
            );
          })}
          {/* The CTA lives inside the same pill, closing it on the right. */}
          <Link
            href="/contact"
            className="ml-1.5 inline-flex items-center gap-1.5 rounded-full bg-sage px-5 py-2 font-medium text-white shadow-sm transition hover:bg-butter hover:text-ink"
          >
            Build With Me
          </Link>
        </nav>

        {/* Mobile keeps a standalone burger + CTA pair. */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`${CHIP} grid size-11 place-items-center text-foreground transition hover:bg-foreground/5`}
          >
            {open ? <X className="size-4" strokeWidth={2} /> : <Menu className="size-4" strokeWidth={2} />}
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-sage px-6 py-3 text-[13px] font-medium text-white shadow-sm transition hover:bg-butter hover:text-ink"
          >
            Build With Me
          </Link>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-out ${
          open ? "mt-2 max-h-[36rem] opacity-100" : "pointer-events-none mt-0 max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="rounded-3xl border border-black/5 bg-card/95 p-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-md">
          {NAV_LINKS.map((l) => {
            const isExpanded = expanded === l.href;
            return l.children ? (
              <div key={l.href}>
                {/* Parent row: the label still navigates; the chevron toggles the group. */}
                <div className="flex items-center gap-1">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex-1 rounded-2xl px-4 py-3 text-[14px] transition hover:bg-foreground/5 ${
                      pathname.startsWith(l.href) ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {l.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} ${l.label}`}
                    aria-expanded={isExpanded}
                    onClick={() => setExpanded(isExpanded ? null : l.href)}
                    className="mr-1 grid size-9 shrink-0 place-items-center rounded-full text-foreground/55 transition hover:bg-foreground/5 hover:text-foreground"
                  >
                    <ChevronRight
                      className={`size-4 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                      strokeWidth={2}
                    />
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isExpanded ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mb-1 ml-3 mt-0.5 space-y-0.5 border-l border-black/5 pl-3">
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        className={`flex flex-col rounded-xl px-3 py-2 transition hover:bg-foreground/5 ${
                          pathname === c.href ? "bg-foreground/5" : ""
                        }`}
                      >
                        <span className="text-[13px] font-medium text-foreground/80">{c.label}</span>
                        <span className="text-[11px] text-muted-foreground">{c.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-[14px] transition hover:bg-foreground/5 ${
                  pathname === l.href ? "text-foreground" : "text-foreground/80"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

/**
 * Wordmark for the site — just the name, set in the display serif, with a
 * tiny butter-yellow dot that quietly pulses beside it.
 */
export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="group inline-flex items-center gap-2.5">
      <span className="relative grid size-2.5 shrink-0 place-items-center" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-butter opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-butter" />
      </span>
      <span
        className={`font-display text-[19px] leading-none tracking-tight ${
          onDark ? "text-white" : "text-foreground"
        }`}
      >
        Essy Udeme
      </span>
    </span>
  );
}

export function PillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-card px-3.5 py-1.5 text-[12px] font-medium text-foreground/70 shadow-sm">
      <span className="relative grid size-2 place-items-center" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-70" />
        <span className="relative inline-flex size-1.5 rounded-full bg-sage" />
      </span>
      {children}
    </span>
  );
}

export function ArrowCircle({ tone = "sage", size = 18 }: { tone?: "sage" | "dark"; size?: number }) {
  const cls = tone === "sage" ? "bg-sage text-white" : "bg-ink text-white";
  return (
    <span className={`inline-flex items-center justify-center rounded-full ${cls}`} style={{ width: size + 8, height: size + 8 }}>
      <ArrowUpRight style={{ width: size, height: size }} strokeWidth={2.2} />
    </span>
  );
}

export { ArrowRight };
