"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, LineChart, Lock, Sparkles } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import { VAULT, VAULT_FILTERS, type VaultEntry } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-ink/15 px-3 py-1 text-[12px] text-ink/65">
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/45">{children}</p>
  );
}

/* ---------- Featured flagship ---------- */

function FeaturedCard({ entry }: { entry: VaultEntry }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="overflow-hidden rounded-[28px] bg-card p-7 ring-1 ring-black/5 sm:p-9"
    >
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-lavender-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/70">
            {entry.readTime}
          </span>
          <h3 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.25rem)] leading-[1.08] tracking-tight text-ink">
            {entry.title}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.7] text-ink/65">{entry.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/resources/vault/${entry.slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-white transition hover:brightness-110"
            >
              Download free report
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
            </Link>
            {entry.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
        <div
          aria-hidden
          className="hidden size-32 place-items-center rounded-[20px] bg-sage-soft text-ink/70 md:grid"
        >
          <LineChart className="size-12" strokeWidth={1.5} />
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Cards ---------- */

function VaultCard({ entry }: { entry: VaultEntry }) {
  return (
    <Link href={`/resources/vault/${entry.slug}`} className="group block h-full">
      <motion.article
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
        }}
        className="flex h-full flex-col rounded-[24px] bg-card p-6 ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:ring-black/10"
      >
        <SectionLabel>{entry.category}</SectionLabel>
        <h3 className="mt-3 font-display text-[20px] leading-[1.2] tracking-tight text-ink">
          {entry.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-ink/55">{entry.summary}</p>
        <div className="mt-4 flex items-center gap-2 text-[12px] text-ink/50">
          <span>{entry.readTime}</span>
          <span className="size-1 rounded-full bg-ink/30" />
          <span>{entry.access}</span>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {entry.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </motion.article>
    </Link>
  );
}

function GatedCard({ entry }: { entry: VaultEntry }) {
  return (
    <Link href={`/resources/vault/${entry.slug}`} className="group block h-full">
      <motion.article
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
        }}
        className="flex h-full flex-col rounded-[24px] border border-dashed border-ink/15 bg-card/60 p-6 transition duration-300 group-hover:-translate-y-1 group-hover:border-ink/25"
      >
        <div className="flex items-center gap-2 text-ink/45">
          <Lock className="size-3.5" strokeWidth={2} />
          <SectionLabel>{entry.category} · Email gate</SectionLabel>
        </div>
        <h3 className="mt-3 font-display text-[20px] leading-[1.2] tracking-tight text-ink">
          {entry.title}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-[12px] text-ink/50">
          <span>{entry.readTime}</span>
          <span className="size-1 rounded-full bg-ink/30" />
          <span>{entry.access}</span>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {entry.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </motion.article>
    </Link>
  );
}

/* ---------- Subscribe bar ---------- */

function SubscribeBar() {
  const [sent, setSent] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col items-start justify-between gap-5 rounded-[28px] bg-sage-soft p-7 sm:flex-row sm:items-center sm:p-8"
    >
      <div>
        <p className="font-display text-[20px] leading-tight text-ink">New research, every two weeks</p>
        <p className="mt-1.5 max-w-[52ch] text-[13px] leading-[1.6] text-ink/65">
          Reports, briefs, and teardowns — delivered to your inbox before they hit the Vault.
        </p>
      </div>
      <button
        onClick={() => setSent(true)}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:brightness-110"
      >
        {sent ? "You're in ✶" : "Subscribe free"}
        {!sent && <Sparkles className="size-3.5" strokeWidth={2} />}
      </button>
    </motion.div>
  );
}

/* ---------- Page ---------- */

export function VaultView() {
  const [active, setActive] = useState(0);
  const filter = VAULT_FILTERS[active].category;

  const matches = (e: VaultEntry) => filter === "All" || e.category === filter;
  const featured = VAULT.find((e) => e.featured);
  const showFeatured = featured && matches(featured);
  const latest = VAULT.filter((e) => !e.featured && !e.gated && matches(e));
  const gated = VAULT.filter((e) => e.gated && matches(e));

  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />

      <section className="px-4 pt-20 pb-12 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.02] tracking-tight text-ink"
          >
            Research Vault
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="mt-5 max-w-[60ch] text-[15px] leading-[1.7] text-ink/65"
          >
            Original research, product teardowns, trend watches, and insight briefs. Everything here is
            backed by data, grounded in practice, and written to make you think — not just scroll.
          </motion.p>

          {/* Filters */}
          <div className="mt-9 flex flex-wrap gap-2.5">
            {VAULT_FILTERS.map((f, i) => (
              <button
                key={f.label}
                onClick={() => setActive(i)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                  active === i
                    ? "bg-ink text-white"
                    : "border border-ink/15 text-ink/70 hover:border-ink/30 hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-16 px-4 pb-24 sm:px-6">
        {/* Featured */}
        {showFeatured && (
          <section className="space-y-5">
            <SectionLabel>Featured</SectionLabel>
            <FeaturedCard entry={featured} />
          </section>
        )}

        {/* Latest */}
        {latest.length > 0 && (
          <section className="space-y-5">
            <SectionLabel>Latest</SectionLabel>
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8%" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {latest.map((e) => (
                <VaultCard key={e.slug} entry={e} />
              ))}
            </motion.div>
          </section>
        )}

        {/* Gated reports */}
        {gated.length > 0 && (
          <section className="space-y-5">
            <SectionLabel>Reports (gated)</SectionLabel>
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8%" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {gated.map((e) => (
                <GatedCard key={e.slug} entry={e} />
              ))}
            </motion.div>
          </section>
        )}

        {latest.length === 0 && gated.length === 0 && !showFeatured && (
          <p className="py-10 text-center text-[14px] text-ink/50">Nothing here yet — check back soon.</p>
        )}

        <SubscribeBar />
      </div>

      <Footer />
    </main>
  );
}
