"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { STORIES } from "@/lib/site-data";

export function StoriesView() {
  const [featured, ...rest] = STORIES;

  return (
    <PageShell
      eyebrow="The journal"
      title={<>Stories, <span className="italic">told slowly</span></>}
      intro="One letter at a time. Start with the latest, then wander."
    >
      {/* Featured / latest */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="mx-auto max-w-6xl"
      >
        <Link
          href={`/stories/${featured.slug}`}
          className="group grid grid-cols-1 overflow-hidden rounded-[36px] bg-card p-3 ring-1 ring-black/5 transition hover:ring-black/10 md:grid-cols-[1.1fr_1fr]"
        >
          <div className="overflow-hidden rounded-[28px]">
            <img
              src={featured.cover}
              alt={featured.title}
              className="aspect-[5/4] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink/70">
                Latest letter
              </span>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight text-ink">
                {featured.title}
              </h2>
              <p className="mt-5 text-[15px] leading-[1.7] text-ink/65">{featured.excerpt}</p>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-3 text-[12px] text-ink/50">
                <span>{featured.date}</span>
                <span className="size-1 rounded-full bg-ink/30" />
                <span>{featured.read}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink py-2 pl-4 pr-1.5 text-[13px] font-medium text-white">
                Read story
                <span className="grid size-6 place-items-center rounded-full bg-white text-ink">
                  <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Rest */}
      {rest.length > 0 && (
        <motion.ul
          className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        >
          {rest.map((s) => (
            <motion.li
              key={s.slug}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
              }}
            >
              <Link
                href={`/stories/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-card p-3 ring-1 ring-black/5 transition hover:-translate-y-1"
              >
                <div className="overflow-hidden rounded-[20px]">
                  <img src={s.cover} alt={s.title} className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-[12px] text-ink/50">
                    <span>{s.date}</span>
                    <span className="size-1 rounded-full bg-ink/30" />
                    <span>{s.read}</span>
                  </div>
                  <h3 className="mt-3 font-display text-[20px] leading-[1.15] tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-ink/60">{s.excerpt}</p>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </PageShell>
  );
}
