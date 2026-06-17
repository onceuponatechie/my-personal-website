"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { STORIES, STORY_CATEGORIES } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

export function StoriesView() {
  const [featured, ...rest] = STORIES;
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? rest : rest.filter((s) => s.category === active);
  const tabs = ["All", ...STORY_CATEGORIES];

  return (
    <PageShell
      eyebrow="The journal"
      title={<>stories, <span className="italic">told slowly</span></>}
      intro="One letter at a time. Start with the latest, then wander by what you're in the mood for."
    >
      {/* Featured / latest */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
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
                Latest · {featured.category}
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

      {/* Category filters, under the featured card */}
      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap gap-2.5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
              active === t
                ? "bg-ink text-white"
                : "border border-ink/15 text-ink/70 hover:border-ink/30 hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.ul
          key={active}
          className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {filtered.map((s) => (
            <motion.li
              key={s.slug}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
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
                    <span className="font-medium text-ink/70">{s.category}</span>
                    <span className="size-1 rounded-full bg-ink/30" />
                    <span>{s.date}</span>
                  </div>
                  <h3 className="mt-3 font-display text-[20px] leading-[1.15] tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-ink/60">{s.excerpt}</p>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="mx-auto mt-10 max-w-6xl text-[14px] text-ink/50">No stories in this category yet.</p>
      )}
    </PageShell>
  );
}
