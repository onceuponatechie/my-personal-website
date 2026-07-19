"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import {
  VAULT,
  LAB_PILLARS,
  THINKING_MODELS,
  OPPORTUNITIES,
  type LabPillar,
  type VaultEntry,
  type VaultCategory,
  type OpportunitySignal,
} from "@/lib/site-data";
import { EASE } from "@/lib/motion";

const researchImg = "/assets/research-vault.jpg";

const TONE_BG: Record<"sage" | "butter" | "lavender", string> = {
  sage: "bg-sage-soft",
  butter: "bg-butter-soft",
  lavender: "bg-lavender-soft",
};

/** Anchor targets for the three drawers. */
const PILLAR_IDS: Record<VaultCategory, string> = {
  "Product Thinking": "thinking",
  "Opportunity Finder": "opportunities",
  "Product Teardowns": "teardowns",
};

const SIGNAL_BG: Record<OpportunitySignal, string> = {
  Strong: "bg-sage-soft",
  Growing: "bg-butter-soft",
  Early: "bg-lavender-soft",
};

function HeroChip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-card/80 px-3.5 py-1.5 text-[14px] text-ink/70 ring-1 ring-black/5 backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-ink/15 px-3 py-1 text-[14px] text-ink/65">
      {children}
    </span>
  );
}

/* ---------- Drawer scaffolding ---------- */

/** Section header for a drawer — the pillar's icon, verb, name, and tagline. */
function DrawerHeader({ pillar }: { pillar: LabPillar }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <div className="flex items-center gap-3.5">
        <span
          className={`grid size-11 place-items-center rounded-2xl text-[20px] ${TONE_BG[pillar.tone]}`}
          aria-hidden
        >
          {pillar.emoji}
        </span>
        <div>
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/45">
            {pillar.verb}
          </p>
          <h2 className="mt-1 text-[22px] font-semibold leading-none tracking-tight text-ink">
            {pillar.category}
          </h2>
        </div>
      </div>
      <p className="text-[14px] italic text-ink/45">“{pillar.tagline}”</p>
    </div>
  );
}

const drawerReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8%" },
  transition: { duration: 0.7, ease: EASE },
} as const;

/* ---------- Think: mental-model cards ---------- */

function ThinkingCard({ model }: { model: (typeof THINKING_MODELS)[number] }) {
  return (
    <article className="flex h-full flex-col rounded-[24px] bg-card p-6 ring-1 ring-black/5">
      <span className="w-fit rounded-full bg-sage-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/70">
        {model.tag}
      </span>
      <h3 className="mt-4 text-[17px] font-semibold leading-[1.3] tracking-tight text-ink">
        {model.title}
      </h3>
      <p className="mt-2 text-[14px] leading-[1.6] text-ink/55">{model.oneLiner}</p>
      <p className="mt-auto pt-4 text-[13px] leading-[1.55] text-ink/45">
        <span className="font-medium text-ink/60">Use it when: </span>
        {model.useWhen}
      </p>
    </article>
  );
}

/* ---------- Find: the opportunity log ---------- */

function OpportunityRow({
  opportunity,
  index,
}: {
  opportunity: (typeof OPPORTUNITIES)[number];
  index: number;
}) {
  return (
    <article className="grid gap-4 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto]">
      <span className="font-display text-[24px] leading-none text-ink/30" aria-hidden>
        0{index + 1}
      </span>
      <div className="max-w-[62ch]">
        <h3 className="text-[17px] font-semibold leading-[1.3] tracking-tight text-ink">
          {opportunity.title}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.65] text-ink/60">{opportunity.frustration}</p>
        <p className="mt-2 text-[14px] leading-[1.65] text-ink/60">
          <span className="font-medium text-ink">The gap: </span>
          {opportunity.gap}
        </p>
        <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.16em] text-ink/40">
          For {opportunity.audience}
        </p>
      </div>
      <span
        className={`h-fit w-fit rounded-full px-3 py-1 text-[12px] font-medium text-ink/70 ${SIGNAL_BG[opportunity.signal]} md:justify-self-end`}
      >
        Signal · {opportunity.signal}
      </span>
    </article>
  );
}

/* ---------- Analyze: teardown cards (unchanged format) ---------- */

function TeardownCard({ entry }: { entry: VaultEntry }) {
  return (
    <Link href={`/resources/lab/${entry.slug}`} className="group block h-full">
      <article className="flex h-full flex-col rounded-[24px] bg-card p-6 ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:ring-black/10">
        <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-ink/45">
          {entry.category}
        </p>
        <h3 className="mt-3 text-[17px] font-semibold leading-[1.3] tracking-tight text-ink">
          {entry.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-[1.55] text-ink/55">{entry.summary}</p>
        <div className="mt-4 flex items-center gap-2 text-[14px] text-ink/50">
          <span>{entry.readTime}</span>
          <span className="size-1 rounded-full bg-ink/30" />
          <span>{entry.access}</span>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {entry.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </article>
    </Link>
  );
}

/* ---------- Page ---------- */

export function VaultView() {
  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />

      <section className="relative overflow-hidden px-4 pt-14 pb-12 sm:px-6 sm:pt-16">
        <div className="relative mx-auto max-w-6xl">
          {/* floating chips */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <HeroChip>Not another blog</HeroChip>
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
              <span className="block">The Product</span>
              <span className="block">Lab</span>
            </motion.h1>

            {/* Floating tile — decorative, kept on the right at every size. */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, y: 24, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
              className="pointer-events-none absolute right-0 top-1/2 h-32 w-24 -translate-y-1/2 sm:right-[4%] sm:h-44 sm:w-36 lg:h-48 lg:w-40"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[26px] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
                <img src={researchImg} alt="" className="h-full w-full object-cover" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1 text-[12px] font-medium text-ink backdrop-blur">
                  Lab notes
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
              Think, find, analyze. The mental models I build with, the gaps that look like unbuilt
              products, and teardowns of products already in the wild — a working lab bench, not
              another feed of posts.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
              className="flex shrink-0 gap-7"
            >
              <div>
                <div className="font-display text-[28px] leading-none tracking-tight text-ink">
                  {THINKING_MODELS.length}
                </div>
                <div className="mt-1.5 text-[14px] text-ink/50">Mental models</div>
              </div>
              <div>
                <div className="font-display text-[28px] leading-none tracking-tight text-ink">
                  {OPPORTUNITIES.length}
                </div>
                <div className="mt-1.5 text-[14px] text-ink/50">Open gaps</div>
              </div>
              <div>
                <div className="font-display text-[28px] leading-none tracking-tight text-ink">
                  {VAULT.length}
                </div>
                <div className="mt-1.5 text-[14px] text-ink/50">Teardowns</div>
              </div>
            </motion.div>
          </div>

          {/* The three drawers of the lab — each card jumps to its section. */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {LAB_PILLARS.map((p) => (
              <a
                key={p.category}
                href={`#${PILLAR_IDS[p.category]}`}
                className="group flex h-full flex-col rounded-[24px] bg-card p-6 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:ring-black/15"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid size-10 place-items-center rounded-xl text-[18px] ${TONE_BG[p.tone]}`}
                    aria-hidden
                  >
                    {p.emoji}
                  </span>
                  <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/40">
                    {p.verb}
                  </span>
                </div>
                <h3 className="mt-4 text-[17px] font-semibold leading-[1.25] tracking-tight text-ink">
                  {p.category}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink/55">{p.description}</p>
                <p className="mt-auto pt-4 text-[14px] italic leading-[1.5] text-ink/45">
                  “{p.tagline}”
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-20 px-4 pb-24 sm:px-6">
        {/* ---------- Drawer 1 · Think ---------- */}
        <motion.section
          id={PILLAR_IDS["Product Thinking"]}
          className="scroll-mt-24 space-y-6"
          {...drawerReveal}
        >
          <DrawerHeader pillar={LAB_PILLARS[0]} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {THINKING_MODELS.map((m) => (
              <ThinkingCard key={m.title} model={m} />
            ))}
          </div>
        </motion.section>

        {/* ---------- Drawer 2 · Find ---------- */}
        <motion.section
          id={PILLAR_IDS["Opportunity Finder"]}
          className="scroll-mt-24 space-y-6"
          {...drawerReveal}
        >
          <DrawerHeader pillar={LAB_PILLARS[1]} />
          <div className="divide-y divide-black/5 overflow-hidden rounded-[28px] bg-card ring-1 ring-black/5">
            {OPPORTUNITIES.map((o, i) => (
              <OpportunityRow key={o.title} opportunity={o} index={i} />
            ))}
          </div>
        </motion.section>

        {/* ---------- Drawer 3 · Analyze ---------- */}
        <motion.section
          id={PILLAR_IDS["Product Teardowns"]}
          className="scroll-mt-24 space-y-6"
          {...drawerReveal}
        >
          <DrawerHeader pillar={LAB_PILLARS[2]} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {VAULT.map((e) => (
              <TeardownCard key={e.slug} entry={e} />
            ))}
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}
