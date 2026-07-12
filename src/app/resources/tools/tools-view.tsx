"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  Figma,
  MessageSquarePlus,
  NotebookPen,
  Presentation,
  Sparkles,
  X,
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

/* ---------- Hero: shuffling file deck ---------- */

const DECK_TILES: { tone: ToolTone; format: ToolFormat }[] = [
  { tone: "sage", format: "notion" },
  { tone: "butter", format: "pdf" },
  { tone: "lavender", format: "figma" },
];

/** Decorative deck of "files" that continuously shuffles — the front card
 * slides back and the next one takes its place, like flicking through
 * templates. Sized in percentages so it scales down beside the title on
 * mobile instead of disappearing. */
function FileDeck() {
  const [front, setFront] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFront((f) => (f + 1) % DECK_TILES.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none relative h-28 w-36 shrink-0 sm:h-40 sm:w-52 lg:h-48 lg:w-64"
    >
      {DECK_TILES.map((t, i) => {
        const Icon = FORMAT_ICON[t.format];
        // 0 = front card, then each step back sits further right, smaller and
        // more tilted, so the cycle reads as riffling through a stack.
        const pos = (i - front + DECK_TILES.length) % DECK_TILES.length;
        return (
          <motion.div
            key={i}
            initial={false}
            animate={{
              x: `${pos * 42}%`,
              y: pos * 4,
              rotate: pos === 0 ? -5 : pos * 7,
              scale: 1 - pos * 0.1,
              opacity: 1 - pos * 0.22,
              zIndex: DECK_TILES.length - pos,
            }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className={`absolute left-0 top-0 grid h-full w-[62%] place-items-center rounded-[18px] sm:rounded-[22px] ${TONE_BG[t.tone]} shadow-[0_24px_44px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.06]`}
          >
            <span className="grid size-9 place-items-center rounded-full bg-white/70 text-ink/70 backdrop-blur sm:size-11">
              <Icon className="size-4 sm:size-5" strokeWidth={1.9} />
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
      className="relative overflow-hidden rounded-[32px] bg-card p-7 ring-1 ring-black/5 transition duration-300 hover:ring-black/10 sm:p-9"
    >
      {/* Whole card opens the file's own page. */}
      <Link
        href={`/resources/tools/${tool.slug}`}
        aria-label={`Open ${tool.name}`}
        className="absolute inset-0 z-10"
      />
      <div className="grid gap-9 md:grid-cols-[1.15fr_1fr] md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-butter-soft px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70">
            <Sparkles className="size-3.5" strokeWidth={2} /> Most downloaded
          </span>
          <h3 className="mt-5 text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-[1.15] tracking-tight text-ink">
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
            <span className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-sage">
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

/* Compact product card — dense like a premium shop grid: cover, format,
 * name, and the "price" row. The detail lives in the featured card above. */
function ToolCard({ tool }: { tool: Tool }) {
  const Icon = FORMAT_ICON[tool.format];
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      className="group relative flex h-full flex-col rounded-[20px] bg-card p-2 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(0,0,0,0.25)] hover:ring-black/10 sm:rounded-[24px] sm:p-2.5"
    >
      {/* Whole card opens the file's own page. */}
      <Link
        href={`/resources/tools/${tool.slug}`}
        aria-label={`Open ${tool.name}`}
        className="absolute inset-0 z-10"
      />
      <div className="relative overflow-hidden rounded-[14px] sm:rounded-[18px]">
        <img
          src={tool.cover}
          alt={tool.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 rounded-full bg-white/85 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ink backdrop-blur">
          {FORMAT_LABEL[tool.format]}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1 sm:px-2 sm:pb-1.5">
        {/* Format tile straddles the image edge, keeping the "file" identity.
            `relative` lifts it into the positioned paint layer so the cover
            image can't render over its top half. */}
        <span className={`relative -mt-4 grid size-8 place-items-center rounded-xl ${TONE_BG[tool.tone]} text-ink/70 ring-[3px] ring-card sm:-mt-5 sm:size-9`}>
          <Icon className="size-3.5 sm:size-4" strokeWidth={1.9} />
        </span>

        <h3 className="mt-2 text-[15px] font-semibold leading-[1.25] tracking-tight text-ink sm:mt-2.5 sm:text-[16px]">
          {tool.name}
        </h3>
        <p className="mt-1 hidden line-clamp-2 text-[12px] leading-[1.5] text-ink/60 sm:block">{tool.blurb}</p>

        <div className="mt-auto pt-3">
          <div className="flex items-center justify-between border-t border-ink/[0.07] pt-2.5">
            <span className="truncate pr-2 text-[11px] text-ink/50">{tool.meta}</span>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-medium text-ink">
              Free
              <span className="grid size-6 place-items-center rounded-full bg-ink text-white transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-sage">
                <ArrowUpRight className="size-3" strokeWidth={2.2} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Request card + popup ---------- */

function RequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Request a template"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative w-full max-w-md rounded-[28px] bg-card p-7 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/10"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-ink/50 transition hover:bg-ink/5 hover:text-ink"
            >
              <X className="size-4" strokeWidth={2} />
            </button>

            {sent ? (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="grid size-12 place-items-center rounded-full bg-sage text-white">
                  <Check className="size-5" strokeWidth={2.4} />
                </span>
                <h3 className="mt-5 font-display text-[24px] leading-tight tracking-tight text-ink">
                  Got it — thank you.
                </h3>
                <p className="mt-2 max-w-[32ch] text-[13px] leading-[1.6] text-ink/60">
                  If it fits the shelf, it&apos;ll land here in a future drop.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 rounded-full bg-ink px-6 py-2.5 text-[13px] font-medium text-white transition hover:bg-sage"
                >
                  Back to the shelf
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (text.trim()) setSent(true);
                }}
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-ink/45">Request a template</p>
                <h3 className="mt-3 font-display text-[26px] leading-[1.1] tracking-tight text-ink">
                  What do you keep <span className="italic">rebuilding?</span>
                </h3>
                <textarea
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g. A weekly retro template I can run solo…"
                  className="mt-5 min-h-32 w-full resize-none rounded-2xl bg-background p-4 text-[14px] leading-[1.6] text-ink ring-1 ring-black/10 transition placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-sage"
                />
                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage px-6 py-3 text-[14px] font-medium text-white transition hover:bg-butter hover:text-ink"
                >
                  Send request
                  <ArrowRight className="size-4" strokeWidth={2.2} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Styled after the "A resource for you" pairing card on story pages — the
 * dark ink panel with a sage glow and pill CTA — so the shelf closes on the
 * same note the stories do. */
function RequestCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative flex flex-col gap-5 overflow-hidden rounded-[28px] bg-ink p-6 text-white sm:flex-row sm:items-center sm:p-7"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
        />
        <div className="relative flex-1">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Something missing?</p>
          <h3 className="mt-1.5 font-display text-[22px] leading-tight tracking-tight">
            Wish this shelf had something it doesn&apos;t?
          </h3>
          <p className="mt-1.5 text-[13px] leading-[1.55] text-white/65">
            Tell me what you keep rebuilding from scratch — the best requests become the next template.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-sage px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-butter hover:text-ink sm:self-auto"
        >
          <MessageSquarePlus className="size-3.5" strokeWidth={2.2} />
          Request a template
        </button>
      </motion.div>

      <RequestModal open={open} onClose={() => setOpen(false)} />
    </>
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
        <div className="relative mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[12px] uppercase tracking-[0.22em] text-ink/50"
          >
            Resources · Free forever
          </motion.p>

          <div className="mt-5 flex items-end justify-between gap-4 sm:gap-8">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="min-w-0 font-display text-[clamp(2.5rem,9vw,6.5rem)] leading-[0.94] tracking-[-0.02em] text-ink"
            >
              <span className="block">Tools &</span>
              <span className="block italic">Templates</span>
            </motion.h1>
            <FileDeck />
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
              className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
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
