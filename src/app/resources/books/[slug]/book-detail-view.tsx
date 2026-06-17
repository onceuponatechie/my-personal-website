"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Star, Quote, Lightbulb, Users } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import { type Book } from "@/lib/site-data";
import { EASE } from "@/lib/motion";
import { BookCover } from "../book-cover";

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

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5 text-butter">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4" fill={i < n ? "currentColor" : "none"} strokeWidth={1.6} />
      ))}
    </div>
  );
}

export function BookDetailView({ book, related }: { book: Book; related: Book[] }) {
  const accent = accentVar[book.accent];

  return (
    <main className="relative min-h-screen overflow-hidden bg-background pt-6">
      <Navbar />

      {/* ---------- immersive header ---------- */}
      <header className="relative overflow-hidden px-4 pt-10 pb-14 sm:px-6 sm:pt-12">
        {/* blurred cover backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <img src={book.cover} alt="" className="h-full w-full scale-125 object-cover opacity-25 blur-3xl" />
          <div className="absolute inset-0 bg-background/60" />
          <div
            className="absolute -right-32 -top-32 size-[460px] rounded-full opacity-50 blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${accent} 0%, transparent 70%)` }}
          />
        </div>

        <div className="mx-auto max-w-5xl">
          <Link
            href="/resources/books"
            className="inline-flex items-center gap-1.5 text-[13px] text-ink/60 transition hover:text-ink"
          >
            <ArrowLeft className="size-3.5" /> The Book Hub
          </Link>

          <div className="mt-8 grid gap-9 sm:grid-cols-[200px_1fr] sm:items-end md:grid-cols-[230px_1fr]">
            {/* floating cover */}
            <motion.div
              initial={{ opacity: 0, y: 26, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mx-auto w-[160px] sm:mx-0 sm:w-full"
            >
              <BookCover book={book} size="lg" />
            </motion.div>

            {/* meta */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
            >
              <motion.div
                variants={fade}
                className="flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.16em] text-ink/50"
              >
                <span
                  className="rounded-full px-3 py-1 font-medium text-ink/75"
                  style={{ background: accentSoft[book.accent] }}
                >
                  {book.category}
                </span>
                <span>{book.year}</span>
                <span className="size-1 rounded-full bg-ink/30" />
                <StarRow n={book.rating} />
              </motion.div>
              <motion.h1
                variants={fade}
                className="mt-4 font-display text-[clamp(2.4rem,6vw,4rem)] leading-[1.02] tracking-tight text-ink"
              >
                {book.title}
              </motion.h1>
              <motion.p variants={fade} className="mt-2 text-[15px] text-ink/55">
                by {book.author}
              </motion.p>
              <motion.p
                variants={fade}
                className="mt-6 max-w-[46ch] font-display text-[clamp(1.25rem,2.4vw,1.7rem)] italic leading-[1.35] text-ink/85"
              >
                &ldquo;{book.takeaway}&rdquo;
              </motion.p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ---------- body ---------- */}
      <article className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* why it's on the shelf */}
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <SectionLabel accent={accent}>Why it&apos;s on the shelf</SectionLabel>
            <p className="mt-4 text-[16px] leading-[1.85] text-ink/75">{book.note}</p>
          </motion.section>

          {/* ideas worth stealing */}
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-14"
          >
            <SectionLabel accent={accent} Icon={Lightbulb}>
              Ideas worth stealing
            </SectionLabel>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              className="mt-5 space-y-3"
            >
              {book.ideas.map((idea, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -14 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
                  }}
                  className="flex items-start gap-4 rounded-[20px] bg-card p-5 ring-1 ring-black/5"
                >
                  <span
                    className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-[13px] font-semibold text-ink"
                    style={{ background: accentSoft[book.accent] }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[15px] leading-[1.6] text-ink/80">{idea}</p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>

          {/* pull quote */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative mt-14 overflow-hidden rounded-[28px] bg-ink p-9 text-white sm:p-12"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full opacity-40 blur-3xl"
              style={{ background: `radial-gradient(closest-side, ${accent} 0%, transparent 70%)` }}
            />
            <Quote className="relative size-7 text-white/40" strokeWidth={1.6} />
            <blockquote className="relative mt-4 font-display text-[clamp(1.6rem,3.2vw,2.3rem)] italic leading-[1.3]">
              {book.quote}
            </blockquote>
            <figcaption className="relative mt-5 text-[13px] uppercase tracking-[0.18em] text-white/55">
              {book.author}
            </figcaption>
          </motion.figure>

          {/* who it's for */}
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-14 flex items-start gap-4 rounded-[24px] p-7 ring-1 ring-black/5"
            style={{ background: accentSoft[book.accent] }}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/70 text-ink ring-1 ring-black/5">
              <Users className="size-4" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-ink/55">Who it&apos;s for</p>
              <p className="mt-1.5 text-[15px] leading-[1.6] text-ink/80">{book.forWho}</p>
            </div>
          </motion.section>
        </div>
      </article>

      {/* ---------- keep reading ---------- */}
      {related.length > 0 && (
        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/45">More from the shelf</p>
            <div className="mt-6 grid grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/resources/books/${r.slug}`} className="group block">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    whileHover={{ y: -6 }}
                  >
                    <BookCover book={r} />
                  </motion.div>
                  <p className="mt-3 line-clamp-1 text-[12px] text-ink/55 group-hover:text-ink">
                    by {r.author}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/resources/books"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-[14px] font-medium text-ink transition hover:bg-ink hover:text-white"
              >
                Back to the shelf
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function SectionLabel({
  children,
  accent,
  Icon,
}: {
  children: React.ReactNode;
  accent: string;
  Icon?: typeof Lightbulb;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8" style={{ background: accent }} />
      <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] text-ink/55">
        {Icon && <Icon className="size-4" strokeWidth={2} style={{ color: accent }} />}
        {children}
      </span>
    </div>
  );
}
