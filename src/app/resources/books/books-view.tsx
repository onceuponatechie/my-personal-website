"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { booksByCategory, type Book } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

function Rating({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5 text-butter">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5" fill={i < n ? "currentColor" : "none"} strokeWidth={1.6} />
      ))}
    </div>
  );
}

function BookCard({ b }: { b: Book }) {
  return (
    <Link href={`/resources/books/${b.slug}`} className="group block h-full">
      <motion.article
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
        }}
        className="flex h-full flex-col overflow-hidden rounded-[24px] bg-card p-3 ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:ring-black/10"
      >
        <div className="overflow-hidden rounded-[16px]">
          <img
            src={b.cover}
            alt={b.title}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-3 pt-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">{b.author}</p>
            <Rating n={b.rating} />
          </div>
          <h3 className="mt-2 font-display text-[19px] leading-[1.15] tracking-tight text-ink">{b.title}</h3>
          <p className="mt-2 line-clamp-2 text-[13px] italic leading-[1.5] text-ink/65">&quot;{b.takeaway}&quot;</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[12px] font-medium text-ink/70 transition group-hover:text-ink">
            Read the note
            <BookOpen className="size-3.5" strokeWidth={1.8} />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

export function BooksView() {
  const groups = booksByCategory();

  return (
    <PageShell
      eyebrow="Resources · Book Hub"
      title={<>the <span className="italic">library</span></>}
      intro="A growing shelf of notes from the books that shaped how I research, build, and tell product stories. Grouped by what they taught me — take what helps, leave what doesn't."
    >
      <div className="mx-auto max-w-5xl space-y-16">
        {groups.map((g) => (
          <section key={g.category}>
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-display text-[24px] italic leading-none text-ink">{g.category}</h2>
              <span className="h-px flex-1 bg-ink/10" />
              <span className="text-[12px] text-ink/45">{g.books.length} {g.books.length === 1 ? "note" : "notes"}</span>
            </div>
            <motion.div
              className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8%" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {g.books.map((b) => (
                <BookCard key={b.slug} b={b} />
              ))}
            </motion.div>
          </section>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto mt-16 flex max-w-3xl flex-col items-center rounded-[32px] bg-sage-soft p-10 text-center"
      >
        <div className="grid size-12 place-items-center rounded-full bg-ink text-white">
          <BookOpen className="size-5" strokeWidth={1.8} />
        </div>
        <h3 className="mt-5 font-display text-[28px] leading-tight text-ink">Got a book I should read?</h3>
        <p className="mt-3 max-w-[40ch] text-[13px] text-ink/65">
          Drop me a line. If it earns a spot on the shelf, it&apos;ll get its own note here.
        </p>
      </motion.div>
    </PageShell>
  );
}
