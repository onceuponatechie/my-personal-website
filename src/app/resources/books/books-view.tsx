"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
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
  Check,
  Send,
  Target,
  Shapes,
  MousePointer2,
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
  Usability: MousePointer2,
  Design: Shapes,
  Focus: Target,
};

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
          <span className="inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70 ring-1 ring-black/5 backdrop-blur">
            <Sparkles className="size-3 shrink-0" strokeWidth={2} /> {kicker}
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

// Staggered portrait ratios drive the masonry's varied heights.
const SHELF_RATIOS = ["2 / 3", "3 / 4", "2 / 2.6", "3 / 4.4", "2 / 3.2"];

function ShelfCard({ book, ratio }: { book: Book; ratio: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      className="mb-5 break-inside-avoid"
    >
      <Link href={`/resources/books/${book.slug}`} className="group block">
        <motion.div whileHover={{ y: -6 }} whileTap={{ y: -6 }} transition={{ duration: 0.4, ease: EASE }}>
          <BookCover book={book} ratio={ratio} />
        </motion.div>
        <div className="mt-2.5 flex items-center justify-between gap-2 px-0.5">
          <span className="truncate text-[11px] uppercase tracking-[0.14em] text-ink/45">{book.category}</span>
          <span className="flex items-center gap-1 text-[11px] text-ink/45">
            <Star className="size-3 text-butter" fill="currentColor" strokeWidth={0} />
            {book.rating}.0
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ---------- recommend a book (inline, mocked) ---------- */

function RecommendForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    // MOCK ONLY — no email is sent yet. The recommendation is just logged so
    // the flow works end-to-end; swap this for an API call when ready.
    console.log("[book recommendation]", { title: title.trim(), reason: reason.trim() });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="relative mt-7 flex w-full max-w-md flex-col items-center">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-[13px] text-white ring-1 ring-white/15">
          <span className="grid size-6 place-items-center rounded-full bg-sage text-white">
            <Check className="size-3.5" strokeWidth={2.6} />
          </span>
          Thank you — <span className="font-medium">{title.trim()}</span> is on my list.
        </div>
        <button
          onClick={() => {
            setSent(false);
            setTitle("");
            setReason("");
          }}
          className="mt-3 text-[12px] text-white/55 transition hover:text-white"
        >
          Recommend another
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-medium text-ink transition hover:bg-white/90"
      >
        Recommend a book
        <ArrowUpRight className="size-4" strokeWidth={2.2} />
      </button>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      onSubmit={handleSubmit}
      className="relative mt-7 w-full max-w-md space-y-3 text-left"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        autoFocus
        placeholder="Book title"
        className="w-full rounded-2xl bg-white/10 px-4 py-3 text-[14px] text-white placeholder:text-white/40 outline-none ring-1 ring-white/15 transition focus:ring-white/40"
      />
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={3}
        placeholder="Why should it be on the shelf? (optional)"
        className="w-full resize-none rounded-2xl bg-white/10 px-4 py-3 text-[14px] text-white placeholder:text-white/40 outline-none ring-1 ring-white/15 transition focus:ring-white/40"
      />
      <div className="flex items-center justify-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-medium text-ink transition hover:bg-white/90"
        >
          Send recommendation
          <Send className="size-3.5" strokeWidth={2.2} />
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[12px] text-white/55 transition hover:text-white"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
}

/* ---------- page ---------- */

const FEATURED_SLUGS = ["atomic-habits", "the-mom-test"];

export function BooksView() {
  const nightstand = getBook("atomic-habits")!;
  const recommended = getBook("the-mom-test")!;

  // Everything except the two feature cards lives in the masonry below.
  const shelfBooks = useMemo(() => BOOKS.filter((b) => !FEATURED_SLUGS.includes(b.slug)), []);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(shelfBooks.map((b) => b.category)))],
    [shelfBooks]
  );
  const [active, setActive] = useState("All");

  const shelf = active === "All" ? shelfBooks : shelfBooks.filter((b) => b.category === active);

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

      {/* ---------- the shelf (masonry) ---------- */}
      <section className="relative px-4 pt-8 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            key={active}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } }}
            className="columns-2 gap-5 sm:columns-3 lg:columns-4 xl:columns-5"
          >
            {shelf.map((b, i) => (
              <ShelfCard key={b.slug} book={b} ratio={SHELF_RATIOS[i % SHELF_RATIOS.length]} />
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
          <RecommendForm />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
