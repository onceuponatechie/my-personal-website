"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Star,
  Sparkles,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import { BOOKS, getBook, type Book } from "@/lib/site-data";
import { EASE } from "@/lib/motion";
import { BookCover } from "./book-cover";

const accentVar: Record<Book["accent"], string> = {
  sage: "var(--sage)",
  lavender: "var(--lavender)",
  butter: "var(--butter)",
};
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
};

/* ---------- small parts ---------- */

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5 text-butter">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5" fill={i < n ? "currentColor" : "none"} strokeWidth={1.6} />
      ))}
    </div>
  );
}

/* ---------- feature (hero) card ---------- */

function FeatureCard({ book, kicker, delay = 0 }: { book: Book; kicker: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: EASE }}
    >
      <Link
        href={`/resources/books/${book.slug}`}
        className="group relative flex min-h-[230px] items-stretch overflow-hidden rounded-[30px] p-7 ring-1 ring-black/5 sm:min-h-[260px] sm:p-9"
        style={{ background: `linear-gradient(135deg, ${accentSoft[book.accent]} 0%, var(--card) 70%)` }}
      >
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full opacity-50 blur-3xl transition-opacity duration-700 group-hover:opacity-80"
          style={{ background: `radial-gradient(closest-side, ${accentVar[book.accent]} 0%, transparent 70%)` }}
        />
        <div className="relative z-10 flex max-w-[58%] flex-col">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70 ring-1 ring-black/5 backdrop-blur">
            <Sparkles className="size-3" strokeWidth={2} /> {kicker}
          </span>
          <h3 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.05] tracking-tight text-ink">
            {book.title}
          </h3>
          <p className="mt-1 text-[13px] text-ink/55">by {book.author}</p>
          <p className="mt-4 line-clamp-2 max-w-[34ch] text-[13px] leading-[1.6] text-ink/70">
            {book.takeaway}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium text-ink">
            Read the notes
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
          </span>
        </div>

        {/* floating cover */}
        <motion.div
          initial={{ rotate: 5, y: 10 }}
          animate={{ rotate: 4, y: 0 }}
          transition={{ delay: delay + 0.15, duration: 0.9, ease: EASE }}
          className="pointer-events-none absolute -bottom-6 right-5 w-[34%] max-w-[160px] transition-transform duration-700 group-hover:-translate-y-1.5 group-hover:rotate-[2deg] sm:right-8"
        >
          <BookCover book={book} />
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ---------- shelf poster ---------- */

function ShelfCard({ book }: { book: Book }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
    >
      <Link href={`/resources/books/${book.slug}`} className="group block">
        <motion.div whileHover={{ y: -6 }} whileTap={{ y: -6 }} transition={{ duration: 0.4, ease: EASE }}>
          <BookCover book={book} />
        </motion.div>
        <div className="mt-3 px-0.5">
          <div className="flex items-center justify-between gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/70"
              style={{ background: accentSoft[book.accent] }}
            >
              {book.category}
            </span>
            <span className="text-[11px] text-ink/45">{book.year}</span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <StarRow n={book.rating} />
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink/60 opacity-0 transition group-hover:opacity-100">
              Open <ArrowRight className="size-3" strokeWidth={2.2} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ---------- page ---------- */

export function BooksView() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(BOOKS.map((b) => b.category)))],
    []
  );
  const [active, setActive] = useState("All");

  const shelf = active === "All" ? BOOKS : BOOKS.filter((b) => b.category === active);

  const nightstand = getBook("atomic-habits")!;
  const recommended = getBook("the-mom-test")!;

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

      {/* ---------- header ---------- */}
      <section className="relative px-4 pt-16 pb-10 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[12px] uppercase tracking-[0.22em] text-ink/50"
          >
            Resources · The Reading Room
          </motion.p>
          <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.8, ease: EASE }}
              className="font-display text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95] tracking-tight text-ink"
            >
              The <span className="italic">Book</span> Hub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
              className="max-w-[42ch] text-[14px] leading-[1.7] text-ink/65"
            >
              A living shelf of notes from the books that shaped how I research, build, and tell product
              stories. Pull one down — every cover opens to its own page.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ---------- feature cards ---------- */}
      <section className="relative px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <FeatureCard book={nightstand} kicker="On the nightstand" />
          <FeatureCard book={recommended} kicker="Most recommended" delay={0.1} />
        </div>
      </section>

      {/* ---------- category pills ---------- */}
      <section className="relative px-4 pt-12 sm:px-6">
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

      {/* ---------- the shelf ---------- */}
      <section className="relative px-4 pt-8 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            key={active}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } }}
            className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
          >
            {shelf.map((b) => (
              <ShelfCard key={b.slug} book={b} />
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
            Send it my way. If it earns a spot on the shelf, it&apos;ll get its own page here — notes,
            quotes, and all.
          </p>
          <Link
            href="/contact"
            className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-medium text-ink transition hover:bg-white/90"
          >
            Recommend a book
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
