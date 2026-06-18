"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { STORIES, type Story } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

/* ---------- redesigned story card ---------- */

function StoryCard({ story }: { story: Story }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      <Link
        href={`/stories/${story.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-card p-3 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:ring-black/10"
      >
        {/* image + editorial overlay */}
        <div className="relative overflow-hidden rounded-[22px]">
          <img
            src={story.cover}
            alt={story.title}
            className="aspect-[4/3] w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-active:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />
          <span className="absolute left-3 top-3 rounded-full bg-card/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/70 ring-1 ring-black/5 backdrop-blur">
            {story.category}
          </span>
          <span className="absolute bottom-3 right-3 grid size-9 translate-y-2 place-items-center rounded-full bg-card text-ink opacity-0 shadow-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-active:translate-y-0 group-active:opacity-100">
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </span>
        </div>

        {/* content */}
        <div className="flex flex-1 flex-col px-3 pb-2 pt-4">
          <div className="flex items-center gap-2.5 text-[12px] text-ink/50">
            <span>{story.date}</span>
            <span className="size-1 rounded-full bg-ink/30" />
            <span>{story.read}</span>
          </div>
          <h3 className="mt-2.5 font-display text-[21px] leading-[1.15] tracking-tight text-ink">
            {story.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-ink/60">{story.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium text-ink">
            Read story
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1" strokeWidth={2.2} />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

/* ---------- page ---------- */

export function StoriesView() {
  const [featured, ...rest] = STORIES;

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(rest.map((s) => s.category)))],
    [rest]
  );
  const [active, setActive] = useState("All");
  const shown = active === "All" ? rest : rest.filter((s) => s.category === active);

  return (
    <PageShell
      eyebrow="The journal"
      title={<>Stories, <span className="italic">told slowly</span></>}
      intro="One letter at a time. Start with the latest, then wander by what you're in the mood for."
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
          <div className="relative overflow-hidden rounded-[28px]">
            <img
              src={featured.cover}
              alt={featured.title}
              className="aspect-[5/4] h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-active:scale-105"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-sage-soft px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink/70">
              Latest letter
            </span>
          </div>
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <div className="flex items-center gap-2.5 text-[12px] text-ink/50">
                <span>{featured.category}</span>
                <span className="size-1 rounded-full bg-ink/30" />
                <span>{featured.read}</span>
              </div>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight text-ink">
                {featured.title}
              </h2>
              <p className="mt-5 text-[15px] leading-[1.7] text-ink/65">{featured.excerpt}</p>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <span className="text-[12px] text-ink/50">{featured.date}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink py-2 pl-4 pr-1.5 text-[13px] font-medium text-white">
                Read story
                <span className="grid size-6 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-0.5 group-active:translate-x-0.5">
                  <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Category pills — underneath the featured card */}
      {categories.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
          className="mx-auto mt-10 flex max-w-6xl flex-wrap gap-2.5"
        >
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative inline-flex items-center rounded-full px-4 py-2.5 text-[13px] font-medium transition ${
                  isActive ? "text-white" : "text-ink/70 hover:text-ink"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="storyPill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full bg-card ring-1 ring-black/5" />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </motion.div>
      )}

      {/* Grouped grid */}
      {shown.length > 0 && (
        <motion.ul
          key={active}
          className="mx-auto mt-7 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
        >
          {shown.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </motion.ul>
      )}
    </PageShell>
  );
}
