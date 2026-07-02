"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  Figma,
  NotebookPen,
  Presentation,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import { TOOLS, TOOL_CATEGORIES, type Tool, type ToolFormat, type ToolTone } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

/* ---------- Format & tone dictionaries ---------- */

const FORMAT_ICON: Record<ToolFormat, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  notion: NotebookPen,
  figma: Figma,
  pdf: FileText,
  workshop: Presentation,
};

const FORMAT_LABEL: Record<ToolFormat, string> = {
  notion: "Notion",
  figma: "Figma",
  pdf: "PDF",
  workshop: "Workshop",
};

const TONE_BG: Record<ToolTone, string> = {
  sage: "bg-sage-soft",
  butter: "bg-butter-soft",
  lavender: "bg-lavender-soft",
};

/* ---------- Small chrome ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/45">{children}</p>;
}

/* ---------- Hero: fanned file stack ---------- */

/** Decorative stack of "files" — sets the tone that this page is a shelf of
 * usable artifacts, not a photo gallery of case studies. */
function FileStack() {
  const tiles: { tone: ToolTone; format: ToolFormat; rotate: number; y: number }[] = [
    { tone: "lavender", format: "figma", rotate: -10, y: 10 },
    { tone: "butter", format: "pdf", rotate: 4, y: -6 },
    { tone: "sage", format: "notion", rotate: 14, y: 8 },
  ];
  return (
    <div aria-hidden className="pointer-events-none relative hidden h-44 w-56 shrink-0 md:block lg:h-52 lg:w-64">
      {tiles.map((t, i) => {
        const Icon = FORMAT_ICON[t.format];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 26, rotate: 0 }}
            animate={{ opacity: 1, y: t.y, rotate: t.rotate }}
            transition={{ delay: 0.25 + i * 0.12, duration: 0.8, ease: EASE }}
            className={`absolute top-4 grid place-items-center rounded-[22px] ${TONE_BG[t.tone]} shadow-[0_24px_44px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.06]`}
            style={{ left: `${i * 26}%`, width: "7rem", height: "8.5rem" }}
          >
            <span className="grid size-11 place-items-center rounded-full bg-white/70 text-ink/70 backdrop-blur">
              <Icon className="size-5" strokeWidth={1.9} />
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ---------- Featured tool ---------- */

function FeaturedTool({ tool }: { tool: Tool }) {
  const Icon = FORMAT_ICON[tool.format];
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="overflow-hidden rounded-[32px] bg-card p-7 ring-1 ring-black/5 sm:p-9"
    >
      <div className="grid gap-9 md:grid-cols-[1.15fr_1fr] md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-butter-soft px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70">
            <Sparkles className="size-3.5" strokeWidth={2} /> Most downloaded
          </span>
          <h3 className="mt-5 font-display text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.06] tracking-tight text-ink">
            {tool.name}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.7] text-ink/65">{tool.blurb}</p>

          <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {tool.includes.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[13px] text-ink/70">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-sage-soft text-ink/70">
                  <Check className="size-3" strokeWidth={2.6} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-white transition hover:brightness-110">
              Download free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
            </span>
            <span className="text-[12px] text-ink/50">
              {tool.kind} · {tool.meta}
            </span>
          </div>
        </div>

        {/* Mock "inside the file" panel — shows structure, not screenshots. */}
        <div aria-hidden className={`rounded-[24px] ${TONE_BG[tool.tone]} p-5 sm:p-6`}>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55">
            <Icon className="size-3.5" strokeWidth={2} /> Inside the file
          </div>
          <div className="mt-4 space-y-2.5">
            {tool.includes.slice(0, 4).map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 backdrop-blur"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <Check className="size-3" strokeWidth={2.6} />
                </span>
                <span className="truncate text-[12px] text-ink/75">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Tool file card ---------- */

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = FORMAT_ICON[tool.format];
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      className="group flex h-full flex-col rounded-[28px] bg-card p-6 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:ring-black/10"
    >
      <div className="flex items-start justify-between">
        <span className={`grid size-12 place-items-center rounded-2xl ${TONE_BG[tool.tone]} text-ink/70`}>
          <Icon className="size-5" strokeWidth={1.9} />
        </span>
        <span className="rounded-full border border-ink/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/50">
          {FORMAT_LABEL[tool.format]}
        </span>
      </div>

      <h3 className="mt-5 font-display text-[21px] leading-[1.15] tracking-tight text-ink">{tool.name}</h3>
      <p className="mt-2 text-[13px] leading-[1.55] text-ink/60">{tool.blurb}</p>

      <ul className="mt-4 space-y-1.5">
        {tool.includes.slice(0, 3).map((item) => (
          <li key={item} className="flex items-center gap-2 text-[12px] text-ink/55">
            <Check className="size-3 shrink-0 text-sage" strokeWidth={2.6} />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between border-t border-ink/[0.07] pt-4">
        <span className="text-[12px] text-ink/50">{tool.meta}</span>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
          Free
          <span className="grid size-7 place-items-center rounded-full bg-ink text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
          </span>
        </span>
      </div>
    </motion.article>
  );
}

/* ---------- Request card ---------- */

function RequestCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col items-center justify-between gap-5 rounded-[28px] border border-dashed border-ink/15 bg-card/60 px-7 py-8 text-center sm:flex-row sm:text-left"
    >
      <div>
        <h3 className="font-display text-[22px] leading-tight tracking-tight text-ink">
          Wish this shelf had something it doesn&apos;t?
        </h3>
        <p className="mt-1.5 text-[13px] leading-[1.6] text-ink/60">
          Tell me what you keep rebuilding from scratch — the best requests become the next template.
        </p>
      </div>
      <Link
        href="/contact"
        className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink transition hover:border-ink/30"
      >
        Request a template
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
      </Link>
    </motion.div>
  );
}

/* ---------- Page ---------- */

export function ToolsView() {
  const [active, setActive] = useState<string>(TOOL_CATEGORIES[0]);

  const matches = (t: Tool) => active === "All" || t.category === active;
  const featured = TOOLS.find((t) => t.featured);
  const showFeatured = featured && matches(featured);
  const shelf = TOOLS.filter((t) => !(showFeatured && t.slug === featured?.slug) && matches(t));

  const countFor = (c: string) => (c === "All" ? TOOLS.length : TOOLS.filter((t) => t.category === c).length);

  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />

      <section className="relative overflow-hidden px-4 pt-14 pb-12 sm:px-6 sm:pt-16">
        {/* Soft washes in the site's accent tones. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-28 h-[500px] w-[500px] rounded-full opacity-55 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--butter-soft) 0%, transparent 72%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-32 h-[460px] w-[460px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--sage-soft) 0%, transparent 72%)" }}
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[12px] uppercase tracking-[0.22em] text-ink/50"
          >
            Resources · Free forever
          </motion.p>

          <div className="mt-5 flex items-end justify-between gap-8">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.94] tracking-[-0.02em] text-ink"
            >
              <span className="block">Tools &</span>
              <span className="block italic">Templates</span>
            </motion.h1>
            <FileStack />
          </div>

          <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
              className="max-w-[50ch] text-[15px] leading-[1.7] text-ink/65"
            >
              A working shelf of files I actually use — planning systems, review kits, scripts, and
              worksheets. Download them, remix them, ship with them. Just don&apos;t resell them as-is.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
              className="flex shrink-0 gap-7"
            >
              <div>
                <div className="font-display text-[28px] leading-none tracking-tight text-ink">{TOOLS.length}</div>
                <div className="mt-1.5 text-[12px] text-ink/50">Files on the shelf</div>
              </div>
              <div>
                <div className="font-display text-[28px] leading-none tracking-tight text-ink">100%</div>
                <div className="mt-1.5 text-[12px] text-ink/50">Free to download</div>
              </div>
            </motion.div>
          </div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {TOOL_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition ${
                  active === c
                    ? "bg-ink text-white"
                    : "border border-ink/15 text-ink/70 hover:border-ink/30 hover:text-ink"
                }`}
              >
                {c}
                <span className={`text-[11px] ${active === c ? "text-white/60" : "text-ink/40"}`}>
                  {countFor(c)}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 pb-24 sm:px-6">
        {showFeatured && featured && (
          <section className="space-y-5">
            <SectionLabel>Start here</SectionLabel>
            <FeaturedTool tool={featured} />
          </section>
        )}

        {shelf.length > 0 && (
          <section className="space-y-5">
            <SectionLabel>{active === "All" ? "The shelf" : active}</SectionLabel>
            <motion.div
              key={active}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            >
              {shelf.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </motion.div>
          </section>
        )}

        {shelf.length === 0 && !showFeatured && (
          <p className="py-10 text-center text-[14px] text-ink/50">Nothing in this category yet — check back soon.</p>
        )}

        <RequestCard />
      </div>

      <Footer />
    </main>
  );
}
