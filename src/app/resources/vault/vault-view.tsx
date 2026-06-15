"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { RESEARCH } from "@/lib/site-data";

export function VaultView() {
  return (
    <PageShell
      eyebrow="Resources · Vault"
      title={<>Research <span className="italic">Vault</span></>}
      intro="Notes, patterns, and small studies. Long-form for the reader, scannable for the skimmer."
    >
      <motion.div
        className="mx-auto max-w-4xl space-y-5"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
      >
        {RESEARCH.map((r) => (
          <motion.article
            key={r.slug}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } }}
            className="group grid grid-cols-[140px_1fr_auto] items-center gap-6 overflow-hidden rounded-[28px] bg-sage-soft p-3 transition hover:-translate-y-0.5 sm:grid-cols-[200px_1fr_auto]"
          >
            <div className="overflow-hidden rounded-[20px]">
              <img src={r.cover} alt={r.title} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink/45">{r.category}</p>
              <h3 className="mt-1 font-display text-[22px] leading-tight text-ink">{r.title}</h3>
              <p className="mt-1 text-[13px] leading-[1.55] text-ink/60">{r.summary}</p>
            </div>
            <span className="mr-3 grid size-10 place-items-center rounded-full bg-ink text-white">
              <ArrowUpRight className="size-4" strokeWidth={2.2} />
            </span>
          </motion.article>
        ))}
      </motion.div>

      <Newsletter />
    </PageShell>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative mx-auto mt-24 max-w-4xl overflow-hidden rounded-[44px] bg-ink p-10 text-white sm:p-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
      />
      <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
            <Sparkles className="size-3.5" strokeWidth={2} /> Weekly Vault
          </span>
          <h3 className="mt-5 font-display text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.05] tracking-tight">
            One short <span className="italic">research letter,</span> every Sunday.
          </h3>
          <p className="mt-4 max-w-[42ch] text-[14px] leading-[1.65] text-white/65">
            A new pattern, a small study, or a behaviour worth noticing — sent in under 400 words. No fluff, no ads, no Mondays.
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
              You're in. Look out for Sunday.
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
                Subscribe
                <span className="grid size-7 place-items-center rounded-full bg-white text-ink">
                  <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
                </span>
              </button>
            </div>
          )}
          <p className="mt-2 px-5 pb-2 text-[11px] text-white/40">Free forever. Unsubscribe with one click.</p>
        </form>
      </div>
    </motion.section>
  );
}
