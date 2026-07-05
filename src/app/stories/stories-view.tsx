"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, PenLine } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import { STORIES, type Story } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

/* ---------- hero: diary pages that fan out together ---------- */

/** Story covers fan out from a closed stack like loose diary pages,
 * re-fanning whenever the hero scrolls back into view. */
function DiaryFan({ stories }: { stories: Story[] }) {
  const n = stories.length;
  const mid = (n - 1) / 2;
  return (
    <div className="group relative mx-auto h-[280px] w-[280px] sm:h-[330px] sm:w-[340px]">
      {stories.map((s, i) => {
        const offset = i - mid;
        const angle = offset * 14;
        const x = offset * 72;
        const y = Math.abs(offset) * 18;
        return (
          <motion.div
            key={s.slug}
            variants={{
              closed: { rotate: 0, x: 0, y: 0, opacity: 0 },
              open: {
                rotate: angle,
                x,
                y,
                opacity: 1,
                transition: { delay: 0.15 + i * 0.1, duration: 0.9, ease: EASE },
              },
            }}
            initial="closed"
            whileInView="open"
            viewport={{ once: false, amount: 0.4 }}
            whileHover={{ y: y - 22, scale: 1.04, zIndex: 50 }}
            style={{ transformOrigin: "bottom center", zIndex: 10 - Math.abs(offset) }}
            className="absolute inset-x-0 bottom-0 mx-auto w-[150px] sm:w-[168px]"
          >
            <Link
              href={`/stories/${s.slug}`}
              aria-label={s.title}
              className="block rounded-[18px] bg-card p-2 pb-3 shadow-[0_24px_45px_-22px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.07] transition hover:ring-black/[0.14]"
            >
              <img src={s.cover} alt="" className="aspect-[3/4] w-full rounded-[12px] object-cover" />
              <div className="mt-2 px-1">
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-ink/45">{s.category}</p>
                <p className="mt-0.5 line-clamp-2 font-display text-[13px] leading-[1.2] text-ink">{s.title}</p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ---------- entry card ---------- */

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
            Read entry
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
    <main className="relative min-h-screen overflow-hidden bg-background pt-6">
      {/* ambient washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--butter-soft) 0%, transparent 72%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-[28%] h-[560px] w-[560px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--sage-soft) 0%, transparent 72%)" }}
      />

      <Navbar />

      {/* ---------- hero: header copy + fanned diary pages ---------- */}
      <section className="relative px-4 pt-16 pb-10 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="text-[12px] uppercase tracking-[0.22em] text-ink/50"
              >
                Resources · The blog
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.8, ease: EASE }}
                className="mt-3 font-display text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95] tracking-tight text-ink"
              >
                The Build <span className="italic">Diary</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
                className="mt-5 max-w-[46ch] text-[14px] leading-[1.7] text-ink/65"
              >
                Honest logs from the workbench — the decisions, the dead ends, and what actually
                shipped. Half essays, half field notes, written between builds.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.7, ease: EASE }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#entries"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:bg-sage"
                >
                  Read the latest
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                </a>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-[13px] text-ink/70">
                  <PenLine className="size-3.5" strokeWidth={2} />
                  {STORIES.length} entries and counting
                </span>
              </motion.div>
            </div>

            {/* fanned diary pages */}
            <div className="relative">
              <div className="relative pt-4 pb-2">
                <DiaryFan stories={STORIES.slice(0, 3)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- featured / latest ---------- */}
      <section id="entries" className="relative scroll-mt-24 px-4 pt-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.8, ease: EASE }}
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
                Latest entry
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
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink py-2 pl-4 pr-1.5 text-[13px] font-medium text-white transition group-hover:bg-sage">
                  Read entry
                  <span className="grid size-6 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-0.5 group-active:translate-x-0.5">
                    <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Category pills */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
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
            className="mx-auto mt-7 grid max-w-6xl grid-cols-1 gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
          >
            {shown.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </motion.ul>
        )}
      </section>

      <Footer />
    </main>
  );
}
