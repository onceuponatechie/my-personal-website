"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import type { Project } from "@/lib/site-data";

export function ProjectDetailView({ p }: { p: Project }) {
  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />
      <article className="px-4 pt-16 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-[13px] text-ink/60 transition hover:text-ink">
            <ArrowLeft className="size-3.5" /> All projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-8"
          >
            <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-ink/45">
              <span>{p.year}</span>
              <span className="size-1 rounded-full bg-ink/30" />
              <span>{p.role}</span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-ink">
              {p.title}
            </h1>
            <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.65] text-ink/65">{p.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-10 overflow-hidden rounded-[36px] bg-card p-3 ring-1 ring-black/5"
          >
            <img src={p.image} alt={p.title} className="aspect-[4/3] w-full rounded-[28px] object-cover" />
          </motion.div>

          <div className="mt-14 grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="font-display text-[26px] text-ink">About the project</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-ink/70">{p.longDescription}</p>
              <a
                href={p.liveHref}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-[14px] font-medium text-white transition hover:brightness-105"
              >
                Visit live site
                <ArrowUpRight className="size-4" strokeWidth={2.2} />
              </a>
            </div>
            <aside className="space-y-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink/45">Stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-foreground/5 px-3 py-1 text-[12px] text-ink/70">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink/45">Outcomes</p>
                <ul className="mt-3 space-y-2 text-[13px] text-ink/70">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex gap-2"><span className="text-sage">→</span>{o}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
