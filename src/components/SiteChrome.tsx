"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ArrowRight, Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { href: "/resources", label: "Resources" },
  { href: "/projects", label: "Projects" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
];

// Sub-pages surfaced in the Resources dropdown, so people can jump straight in.
const RESOURCES_CHILDREN = [
  { href: "/resources/books", label: "Book Hub" },
  { href: "/resources/tools", label: "Tools & Templates" },
  { href: "/resources/vault", label: "Research Vault" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-3xl px-4">
      <nav className="flex items-center justify-between rounded-full border border-black/5 bg-card/90 px-3 py-2.5 pl-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-md sm:px-5">
        <Link href="/" className="font-display text-[18px] tracking-tight text-foreground sm:text-[19px]">
          Once Upon a Techie
        </Link>

        <div className="hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
          {NAV_LINKS.map((l) =>
            l.href === "/resources" ? (
              <div key={l.href} className="group relative">
                <Link
                  href={l.href}
                  className={`inline-flex items-center gap-1 transition hover:text-foreground ${
                    pathname.startsWith("/resources") ? "text-foreground" : ""
                  }`}
                >
                  <span className="editorial-underline">{l.label}</span>
                  <ChevronDown
                    className="size-3.5 transition-transform duration-300 group-hover:rotate-180"
                    strokeWidth={2}
                  />
                </Link>
                {/* pt bridges the gap so the panel doesn't drop on hover */}
                <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="rounded-2xl border border-black/5 bg-card/95 p-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-md">
                    {RESOURCES_CHILDREN.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`block rounded-xl px-3 py-2.5 text-[13px] transition hover:bg-foreground/5 hover:text-foreground ${
                          pathname === c.href ? "text-foreground" : "text-foreground/75"
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={`editorial-underline transition hover:text-foreground ${
                  pathname === l.href ? "text-foreground" : ""
                }`}
              >
                {l.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-black/5 bg-card text-foreground transition hover:bg-foreground/5 md:hidden"
          >
            {open ? <X className="size-4" strokeWidth={2} /> : <Menu className="size-4" strokeWidth={2} />}
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-sage px-4 py-2 text-[13px] font-medium text-white shadow-sm transition hover:brightness-105"
          >
            Build With Me
          </Link>
        </div>
      </nav>

      <div
        className={`md:hidden transition-all duration-300 ease-out ${
          open ? "mt-2 max-h-[32rem] opacity-100" : "pointer-events-none mt-0 max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="rounded-3xl border border-black/5 bg-card/95 p-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-md">
          {NAV_LINKS.map((l) => (
            <div key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-[14px] text-foreground/80 transition hover:bg-foreground/5"
              >
                {l.label}
              </Link>
              {l.href === "/resources" && (
                <div className="mb-1 ml-4 border-l border-black/10 pl-2">
                  {RESOURCES_CHILDREN.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-[13px] text-foreground/60 transition hover:bg-foreground/5 hover:text-foreground"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export function PillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-card px-3.5 py-1.5 text-[12px] font-medium text-foreground/70 shadow-sm">
      <span className="size-1.5 rounded-full bg-sage" />
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
