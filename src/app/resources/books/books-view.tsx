"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Brain,
  Boxes,
  Hammer,
  Library,
  Microscope,
  Feather,
  Workflow,
  MessageCircle,
  Heart,
  Star,
  Sparkles,
  Quote,
  X,
  Send,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import { BOOKS, type Book } from "@/lib/site-data";
import { EASE } from "@/lib/motion";
import { BookCover } from "./book-cover";

const accentSoft: Record<Book["accent"], string> = {
  sage: "var(--sage-soft)",
  lavender: "var(--lavender-soft)",
  butter: "var(--butter-soft)",
};

const CATEGORY_ICON: Record<string, LucideIcon> = {
  All: Library,
  Behaviour: Brain,
  Product: Boxes,
  Building: Hammer,
  Process: Workflow,
  Research: Microscope,
  Storytelling: Feather,
  Communication: MessageCircle,
  Faith: Heart,
};

/* Varied cover ratios so the shelf reads as a true masonry, not a uniform grid.
   Kept on the shorter side so no single cover dominates the column. */
const MASONRY_RATIOS = [
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-[2/3]",
  "aspect-[3/4]",
  "aspect-[5/7]",
  "aspect-[4/5]",
];

/* ---------- small parts ---------- */

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5 text-butter">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3" fill={i < n ? "currentColor" : "none"} strokeWidth={1.6} />
      ))}
    </div>
  );
}

/* ---------- hero: five closed books that fan out together ---------- */

function HeroFan({ books }: { books: Book[] }) {
  const n = books.length;
  const mid = (n - 1) / 2;
  return (
    <div className="group relative mx-auto h-[280px] w-[260px] sm:h-[340px] sm:w-[320px]">
      {books.map((b, i) => {
        const offset = i - mid; // -2 … 2
        const angle = offset * 13;
        const x = offset * 48;
        const y = Math.abs(offset) * 16;
        return (
          <motion.div
            key={b.slug}
            // Start as a closed stack, then fan out together — and re-fan every
            // time the hero scrolls back into view, not just on first load.
            variants={{
              closed: { rotate: 0, x: 0, y: 0, opacity: 0 },
              open: {
                rotate: angle,
                x,
                y,
                opacity: 1,
                transition: { delay: 0.15 + i * 0.09, duration: 0.9, ease: EASE },
              },
            }}
            initial="closed"
            whileInView="open"
            viewport={{ once: false, amount: 0.4 }}
            whileHover={{ y: y - 22, scale: 1.05, zIndex: 50 }}
            style={{ transformOrigin: "bottom center", zIndex: 10 - Math.abs(offset) }}
            className="absolute inset-x-0 bottom-0 mx-auto w-[136px] drop-shadow-xl sm:w-[152px]"
          >
            <Link href={`/resources/books/${b.slug}`} aria-label={b.title} className="block">
              <BookCover book={b} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ---------- shelf poster (masonry tile) ---------- */

function ShelfCard({ book, index }: { book: Book; index: number }) {
  const ratio = MASONRY_RATIOS[index % MASONRY_RATIOS.length];
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      className="mb-3 break-inside-avoid sm:mb-4"
    >
      <Link href={`/resources/books/${book.slug}`} className="group block">
        <motion.div whileHover={{ y: -6, rotate: -0.6 }} whileTap={{ y: -6 }} transition={{ duration: 0.4, ease: EASE }}>
          <BookCover book={book} ratioClass={ratio} />
        </motion.div>
        <div className="mt-2.5 px-0.5">
          <div className="flex items-center justify-between gap-2">
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-ink/70"
              style={{ background: accentSoft[book.accent] }}
            >
              {book.category}
            </span>
            <StarRow n={book.rating} />
          </div>
          <h3 className="mt-1.5 line-clamp-1 font-display text-[15px] leading-tight text-ink">{book.title}</h3>
          <div className="mt-0.5 flex items-center justify-between gap-2">
            <span className="text-[11px] text-ink/45">{book.author}</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink/60 opacity-0 transition group-hover:opacity-100">
              Open <ArrowRight className="size-3" strokeWidth={2.2} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ---------- recommend-a-book modal (mock email) ---------- */

function RecommendModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/45 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-card p-7 ring-1 ring-black/10 shadow-[0_40px_80px_-30px_rgba(18,18,40,0.5)] sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-foreground/5 text-ink/60 transition hover:bg-foreground/10 hover:text-ink"
        >
          <X className="size-4" strokeWidth={2} />
        </button>

        {sent ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-sage-soft text-ink">
              <Send className="size-5" strokeWidth={1.8} />
            </div>
            <h3 className="mt-5 font-display text-[26px] leading-tight text-ink">On its way to my inbox.</h3>
            <p className="mt-2 max-w-[32ch] text-[13px] leading-[1.6] text-ink/60">
              Thanks for the recommendation — if it earns a spot on the shelf, it&apos;ll get its own page here.
            </p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:brightness-110"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70">
              <Sparkles className="size-3" strokeWidth={2} /> Recommend a book
            </span>
            <h3 className="mt-4 font-display text-[26px] leading-tight text-ink">
              What should I read next?
            </h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-ink/60">
              Drop the title and why it stuck with you. It lands straight in my inbox — no detour.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Mock send — wired to surface a real email service later.
                setSent(true);
              }}
              className="mt-5 space-y-4"
            >
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55">
                  Book title
                </span>
                <input required className={inputCls} placeholder="e.g. The Mom Test" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55">
                  Why this one?
                </span>
                <textarea
                  required
                  rows={3}
                  className={inputCls + " resize-none"}
                  placeholder="A line or two on what it changed for you."
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55">
                  Your email <span className="lowercase tracking-normal text-ink/35">(optional)</span>
                </span>
                <input type="email" className={inputCls} placeholder="so I can say thank you" />
              </label>
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage px-6 py-3.5 text-[14px] font-medium text-white shadow-sm transition hover:brightness-105"
              >
                Send recommendation
                <Send className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

const inputCls =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-ink/35 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/30";

/* ---------- page ---------- */

export function BooksView() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(BOOKS.map((b) => b.category)))],
    []
  );
  const [active, setActive] = useState("All");
  const [recommendOpen, setRecommendOpen] = useState(false);

  const heroBooks = useMemo(() => BOOKS.slice(0, 5), []);
  const shelf = active === "All" ? BOOKS : BOOKS.filter((b) => b.category === active);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background pt-6">
      {/* ambient washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--lavender-soft) 0%, transparent 72%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-[30%] h-[560px] w-[560px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--sage-soft) 0%, transparent 72%)" }}
      />

      <Navbar />

      {/* ---------- hero: header copy + fanned books ---------- */}
      <section className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-[12px] uppercase tracking-[0.22em] text-ink/50"
              >
                Resources · The Reading Room
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.8, ease: EASE }}
                className="mt-3 font-display text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95] tracking-tight text-ink"
              >
                The <span className="italic">Book</span> Hub
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
                className="mt-5 max-w-[44ch] text-[14px] leading-[1.7] text-ink/65"
              >
                A living shelf of books I didn&apos;t just read — I built with them. Pull one down and you&apos;ll find
                the framework, the friction, and what actually happened when I tried it.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.7, ease: EASE }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#shelf"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:brightness-110"
                >
                  Browse the shelf
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                </a>
                <button
                  onClick={() => setRecommendOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-[13px] font-medium text-ink transition hover:bg-ink hover:text-white"
                >
                  Recommend a book
                </button>
              </motion.div>
            </div>

            {/* fanned hero books */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
                style={{ background: "radial-gradient(closest-side, var(--butter-soft) 0%, transparent 70%)" }}
              />
              <div className="relative pt-4 pb-2">
                <HeroFan books={heroBooks} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- category pills ---------- */}
      <section id="shelf" className="relative scroll-mt-24 px-4 pt-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICON[cat] ?? BookOpen;
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium transition ${
                    isActive ? "text-white" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="bookPill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  )}
                  {!isActive && <span className="absolute inset-0 rounded-full bg-card ring-1 ring-black/5" />}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="size-3.5" strokeWidth={2} /> {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- the shelf (masonry) ---------- */}
      <section className="relative px-4 pt-8 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            key={active}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } }}
            className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 xl:columns-5"
          >
            {shelf.map((b, i) => (
              <ShelfCard key={b.slug} book={b} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- closing note ---------- */}
      <section className="relative px-4 pb-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto flex max-w-4xl flex-col items-center overflow-hidden rounded-[36px] bg-ink p-12 text-center text-white"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--lavender) 0%, transparent 70%)" }}
          />
          <div className="relative grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15">
            <Quote className="size-5" strokeWidth={1.8} />
          </div>
          <h3 className="relative mt-5 font-display text-[clamp(1.8rem,3.5vw,2.5rem)] leading-tight">
            Got a book I should read?
          </h3>
          <p className="relative mt-3 max-w-[42ch] text-[14px] leading-[1.65] text-white/70">
            Send it my way — title and a line on why. It lands straight in my inbox, and if it earns a spot on the
            shelf, it&apos;ll get its own page here.
          </p>
          <button
            onClick={() => setRecommendOpen(true)}
            className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-medium text-ink transition hover:bg-white/90"
          >
            Recommend a book
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </button>
        </motion.div>
      </section>

      <AnimatePresence>
        {recommendOpen && <RecommendModal onClose={() => setRecommendOpen(false)} />}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
