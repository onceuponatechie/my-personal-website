"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, LineChart, Lock, Sparkles, Mail } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import { VAULT, VAULT_FILTERS, type VaultEntry } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

const researchImg = "/assets/research-vault.jpg";

function HeroChip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-card/80 px-3.5 py-1.5 text-[12px] text-ink/70 ring-1 ring-black/5 backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}

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
          className="hidden w-40 flex-col gap-3 rounded-[22px] bg-sage-soft p-5 md:flex"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55">
            <LineChart className="size-3.5" strokeWidth={2} /> Inside
          </div>
          <div className="flex h-16 items-end gap-2">
            {[42, 70, 28, 88, 54].map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
                className="w-3 rounded-full bg-ink/70"
                style={{ minHeight: 6 }}
              />
            ))}
          </div>
          <div className="text-[11px] leading-[1.4] text-ink/55">Charts, a persona &amp; the data.</div>
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

/* ---------- Newsletter ---------- */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mx-auto max-w-4xl overflow-hidden rounded-[44px] bg-ink p-10 text-white sm:p-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
      />
      <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
            <Sparkles className="size-3.5" strokeWidth={2} /> The Vault Letter
          </span>
          <h3 className="mt-5 font-display text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.05] tracking-tight">
            Make sharper product <span className="italic">bets,</span> every Sunday.
          </h3>
          <p className="mt-4 max-w-[42ch] text-[14px] leading-[1.65] text-white/65">
            One data-backed pattern you can act on Monday — what&apos;s actually working in the African
            creator economy, why it matters, and how to use it. Under 400 words. No fluff, no Mondays.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
          className="rounded-[28px] bg-white/[0.06] p-2 ring-1 ring-white/10 backdrop-blur"
        >
          {sent ? (
            <div className="flex items-center gap-3 px-5 py-5 text-[14px] text-white/85">
              <span className="grid size-9 place-items-center rounded-full bg-sage text-white">
                <Mail className="size-4" strokeWidth={2} />
              </span>
              You&apos;re in. The next letter lands Sunday.
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                className="min-w-0 flex-1 bg-transparent px-5 py-4 text-[14px] text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sage py-3 pl-5 pr-2 text-[13px] font-medium text-white transition hover:brightness-110"
              >
                Get the letter
                <span className="grid size-7 place-items-center rounded-full bg-white text-ink">
                  <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
                </span>
              </button>
            </div>
          )}
          <p className="mt-2 px-5 pb-2 text-[11px] text-white/40">
            Join the builders already reading it. Unsubscribe in one click.
          </p>
        </form>
      </div>
    </motion.section>
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

      <section className="relative overflow-hidden px-4 pt-14 pb-12 sm:px-6 sm:pt-16">
        {/* soft gradient washes, echoing the homepage palette */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-32 h-[540px] w-[540px] rounded-full opacity-55 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--lavender-soft) 0%, transparent 72%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-36 top-24 h-[480px] w-[480px] rounded-full opacity-55 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--sage-soft) 0%, transparent 72%)" }}
        />

        <div className="relative mx-auto max-w-6xl">
          {/* floating chips */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <HeroChip>Original research</HeroChip>
            <HeroChip className="hidden sm:inline-flex">Backed by data · built to make you think</HeroChip>
          </motion.div>

          {/* Oversized wordmark with an overlapping glass tile */}
          <div className="relative mt-6">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-display text-[clamp(3.25rem,13vw,9rem)] leading-[0.9] tracking-[-0.02em] text-ink"
            >
              <span className="block">Research</span>
              <span className="block">Vault</span>
            </motion.h1>

            {/* Floating tile — decorative, large screens only */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, y: 24, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
              className="pointer-events-none absolute right-[4%] top-1/2 hidden h-48 w-40 -translate-y-1/2 lg:block"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[26px] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
                <img src={researchImg} alt="" className="h-full w-full object-cover" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium text-ink backdrop-blur">
                  Insights
                </span>
                <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-ink backdrop-blur">
                  <ArrowUpRight className="size-4" strokeWidth={2.2} />
                </span>
              </div>
            </motion.div>
          </div>

          {/* Supporting line + quick stats */}
          <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
              className="max-w-[52ch] text-[15px] leading-[1.7] text-ink/65"
            >
              Product teardowns, trend watches, and insight briefs. Everything here is backed by data,
              grounded in practice, and written to make you think — not just scroll.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
              className="flex shrink-0 gap-7"
            >
              <div>
                <div className="font-display text-[28px] leading-none tracking-tight text-ink">{VAULT.length}</div>
                <div className="mt-1.5 text-[12px] text-ink/50">Live pieces</div>
              </div>
              <div>
                <div className="font-display text-[28px] leading-none tracking-tight text-ink">100%</div>
                <div className="mt-1.5 text-[12px] text-ink/50">Free to read</div>
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="mt-10 flex flex-wrap gap-2.5">
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

        <Newsletter />
      </div>

      <Footer />
    </main>
  );
}
