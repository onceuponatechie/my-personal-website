"use client";

import { motion } from "framer-motion";
import { BookOpen, Star } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BOOKS } from "@/lib/site-data";

function Rating({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5 text-butter">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5" fill={i < n ? "currentColor" : "none"} strokeWidth={1.6} />
      ))}
    </div>
  );
}

export function BooksView() {
  return (
    <PageShell
      eyebrow="Resources · Book Hub"
      title={<>The <span className="italic">Book</span> Hub</>}
      intro="A growing shelf of notes from the books that shaped how I research, build, and tell product stories. Take what helps, leave what doesn't."
    >
      <motion.div
        className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
      >
        {BOOKS.map((b) => (
          <motion.article
            key={b.slug}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
            }}
            className="group flex gap-5 overflow-hidden rounded-[28px] bg-card p-3 ring-1 ring-black/5 transition hover:-translate-y-0.5"
          >
            <div className="shrink-0 overflow-hidden rounded-[20px]">
              <img src={b.cover} alt={b.title} className="h-[180px] w-[130px] object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col py-2 pr-3">
              <div className="flex items-center gap-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink/45">{b.category}</p>
                <Rating n={b.rating} />
              </div>
              <h3 className="mt-2 font-display text-[22px] leading-tight text-ink">{b.title}</h3>
              <p className="text-[12px] text-ink/55">by {b.author}</p>
              <p className="mt-3 text-[13px] italic leading-[1.55] text-ink/80">&quot;{b.takeaway}&quot;</p>
              <p className="mt-2 line-clamp-3 text-[13px] leading-[1.55] text-ink/60">{b.note}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="mx-auto mt-16 flex max-w-3xl flex-col items-center rounded-[32px] bg-sage-soft p-10 text-center"
      >
        <div className="grid size-12 place-items-center rounded-full bg-ink text-white">
          <BookOpen className="size-5" strokeWidth={1.8} />
        </div>
        <h3 className="mt-5 font-display text-[28px] leading-tight text-ink">Got a book I should read?</h3>
        <p className="mt-3 max-w-[40ch] text-[13px] text-ink/65">Drop me a line. If it earns a spot on the shelf, it&apos;ll get its own note here.</p>
      </motion.div>
    </PageShell>
  );
}
