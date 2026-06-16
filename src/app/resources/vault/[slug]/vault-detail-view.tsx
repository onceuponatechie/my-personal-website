"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowRight, Lock, Sparkles } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import type { VaultEntry } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

export function VaultDetailView({
  entry,
  related,
}: {
  entry: VaultEntry;
  related: VaultEntry[];
}) {
  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />

      <article className="px-4 pt-16 pb-20 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/resources/vault"
            className="inline-flex items-center gap-1.5 text-[13px] text-ink/60 transition hover:text-ink"
          >
            <ArrowLeft className="size-3.5" /> Research Vault
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-8"
          >
            <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-ink/45">
              <span>{entry.category}</span>
              <span className="size-1 rounded-full bg-ink/30" />
              <span>{entry.readTime}</span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-ink">
              {entry.title}
            </h1>
            <p className="mt-5 text-[17px] leading-[1.65] text-ink/70">{entry.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {entry.tags.map((t) => (
                <span key={t} className="rounded-full border border-ink/15 px-3 py-1 text-[12px] text-ink/65">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {entry.gated ? (
            <div className="mt-12 rounded-[28px] border border-dashed border-ink/15 bg-card p-8 text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-sage-soft text-ink">
                <Lock className="size-5" strokeWidth={1.8} />
              </div>
              <h2 className="mt-5 font-display text-[24px] text-ink">Read the full report</h2>
              <p className="mx-auto mt-2 max-w-[40ch] text-[14px] text-ink/60">
                It&apos;s free — drop your email and the PDF lands in your inbox.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="you@studio.com"
                  className="min-w-0 flex-1 rounded-full border border-black/10 bg-white px-5 py-3 text-[14px] text-ink outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/30"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:brightness-110"
                >
                  Send it
                  <ArrowRight className="size-4" strokeWidth={2.2} />
                </button>
              </form>
            </div>
          ) : (
            <div className="prose prose-neutral mt-10 max-w-none text-[16px] leading-[1.85] text-ink/75">
              <p>{entry.summary}</p>
              <p>
                This is the kind of piece the Vault is built for — a single, data-backed idea, written to
                change one decision you&apos;ll make this quarter. The full version walks through the method,
                the numbers, and the three takeaways worth stealing.
              </p>
              <p>
                I write these between builds, so they stay grounded in practice rather than theory. If a line
                here lands, the footnotes and raw data are always a reply away.
              </p>
            </div>
          )}
        </div>
      </article>

      {/* Lead somewhere next */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-10">
          {related.length > 0 && (
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/45">Keep reading</p>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.slug} href={`/resources/vault/${r.slug}`} className="group block h-full">
                    <article className="flex h-full flex-col rounded-[24px] bg-card p-6 ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:ring-black/10">
                      <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/45">
                        {r.category}
                      </p>
                      <h3 className="mt-3 font-display text-[19px] leading-[1.2] tracking-tight text-ink">
                        {r.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium text-ink">
                        Read it
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
                      </span>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Grab a resource */}
          <div className="flex flex-col items-start justify-between gap-5 rounded-[28px] bg-ink p-8 text-white sm:flex-row sm:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/55">
                <Sparkles className="size-3.5" strokeWidth={2} /> Take one with you
              </p>
              <p className="mt-3 font-display text-[22px] leading-tight">
                Grab the free Tools &amp; Templates that pair with this research.
              </p>
            </div>
            <Link
              href="/resources/tools"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-sage px-6 py-3 text-[13px] font-medium text-white transition hover:brightness-110"
            >
              Browse resources
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
