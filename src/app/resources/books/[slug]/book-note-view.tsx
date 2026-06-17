"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Star, BookOpen } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import type { Book } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

function Rating({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5 text-butter">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4" fill={i < n ? "currentColor" : "none"} strokeWidth={1.6} />
      ))}
    </div>
  );
}

export function BookNoteView({
  book,
  highlights,
  related,
}: {
  book: Book;
  highlights: string[];
  related: Book[];
}) {
  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />

      <article className="px-4 pt-16 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/resources/books"
            className="inline-flex items-center gap-1.5 text-[13px] text-ink/60 transition hover:text-ink"
          >
            <ArrowLeft className="size-3.5" /> The library
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-8 grid gap-8 md:grid-cols-[200px_1fr] md:items-start"
          >
            <div className="overflow-hidden rounded-[20px] bg-card p-2 ring-1 ring-black/5">
              <img src={book.cover} alt={book.title} className="aspect-[3/4] w-full rounded-[14px] object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink/45">
                <span>{book.category}</span>
                <span className="size-1 rounded-full bg-ink/30" />
                <Rating n={book.rating} />
              </div>
              <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-ink">
                {book.title}
              </h1>
              <p className="mt-2 text-[15px] text-ink/55">by {book.author}</p>
              <p className="mt-6 border-l-2 border-sage pl-5 font-display text-[22px] italic leading-[1.3] text-ink">
                &quot;{book.takeaway}&quot;
              </p>
            </div>
          </motion.div>

          {/* What I underlined */}
          {highlights.length > 0 && (
            <div className="mt-14">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/45">What I underlined</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {highlights.map((h, i) => (
                  <li key={i} className="rounded-[20px] bg-card p-5 text-[14px] leading-[1.5] text-ink/75 ring-1 ring-black/5">
                    <span className="font-display text-[20px] text-sage">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-2">{h}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* The note */}
          <div className="prose prose-neutral mt-12 max-w-none text-[16px] leading-[1.85] text-ink/75">
            <h2 className="font-display text-[24px] text-ink">The note</h2>
            <p>{book.note}</p>
          </div>
        </div>
      </article>

      {/* More from the shelf */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-10">
          {related.length > 0 && (
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/45">More from the shelf</p>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/resources/books/${r.slug}`} className="group block h-full">
                    <article className="flex h-full gap-3 rounded-[20px] bg-card p-3 ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:ring-black/10">
                      <img src={r.cover} alt={r.title} className="h-[84px] w-[60px] shrink-0 rounded-[10px] object-cover" />
                      <div className="flex flex-col py-1">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-ink/45">{r.author}</p>
                        <h3 className="mt-1 font-display text-[16px] leading-[1.15] text-ink">{r.title}</h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col items-start justify-between gap-5 rounded-[28px] bg-ink p-8 text-white sm:flex-row sm:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/55">
                <BookOpen className="size-3.5" strokeWidth={2} /> Keep reading
              </p>
              <p className="mt-3 font-display text-[22px] leading-tight">Wander the rest of the shelf.</p>
            </div>
            <Link
              href="/resources/books"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-sage px-6 py-3 text-[13px] font-medium text-white transition hover:brightness-110"
            >
              Back to the library
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
