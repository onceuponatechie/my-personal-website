"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  FileText,
  Figma,
  NotebookPen,
  Presentation,
} from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import type { Tool, ToolFormat, ToolTone } from "@/lib/site-data";
import type { ToolContent } from "@/lib/tool-content";
import { EASE } from "@/lib/motion";

const FORMAT_ICON: Record<ToolFormat, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  notion: NotebookPen,
  figma: Figma,
  pdf: FileText,
  workshop: Presentation,
};

const FORMAT_LABEL: Record<ToolFormat, string> = {
  notion: "Notion",
  figma: "Figma",
  pdf: "PDF",
  workshop: "Workshop",
};

const TONE_BG: Record<ToolTone, string> = {
  sage: "bg-sage-soft",
  butter: "bg-butter-soft",
  lavender: "bg-lavender-soft",
};

export function ToolDetailView({
  tool,
  content,
  related,
}: {
  tool: Tool;
  content: ToolContent;
  related: Tool[];
}) {
  const Icon = FORMAT_ICON[tool.format];

  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />

      {/* ---------- hero ---------- */}
      <section className="px-4 pt-12 pb-10 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Link
              href="/resources/tools"
              className="inline-flex items-center gap-1.5 text-[14px] text-ink/55 transition hover:text-ink"
            >
              <ArrowLeft className="size-3.5" /> Tools &amp; Templates
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.7, ease: EASE }}
            className="mt-6 flex flex-wrap items-center gap-2.5"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[12px] font-medium uppercase tracking-[0.14em] text-ink ring-1 ring-black/5">
              <Icon className="size-3.5" strokeWidth={2} /> {FORMAT_LABEL[tool.format]}
            </span>
            <span className="text-[14px] text-ink/50">
              {tool.kind} · {tool.meta} · Free forever
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.8, ease: EASE }}
            className="mt-4 font-display text-[clamp(2.4rem,6vw,4rem)] leading-[1.02] tracking-tight text-ink"
          >
            {tool.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
            className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-ink/65"
          >
            {content.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease: EASE }}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <a
              href="#download"
              className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-[14px] font-medium text-white shadow-sm transition hover:bg-ink"
            >
              <Download className="size-4" strokeWidth={2.2} />
              Download free
            </a>
            <span className="text-[14px] text-ink/50">{content.ctaNote}</span>
          </motion.div>
        </div>
      </section>

      {/* ---------- cover ---------- */}
      <section className="px-4 pb-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
          className={`mx-auto max-w-4xl rounded-[36px] ${TONE_BG[tool.tone]} p-3`}
        >
          <img
            src={tool.cover}
            alt={tool.name}
            className="aspect-[16/9] w-full rounded-[28px] object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
          />
        </motion.div>
      </section>

      {/* ---------- the sections this file earned ---------- */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-12">
          {content.sections.map((s, i) => (
            <motion.div
              key={s.heading}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              transition={{ duration: 0.65, ease: EASE, delay: Math.min(i * 0.04, 0.12) }}
            >
              <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight tracking-tight text-ink">
                {s.heading}
              </h2>
              {s.body && <p className="mt-3.5 text-[15px] leading-[1.75] text-ink/70">{s.body}</p>}
              {s.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[18px] leading-[1.6] text-ink/75">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sage-soft text-ink/70">
                        <Check className="size-3" strokeWidth={2.6} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- download ---------- */}
      <section id="download" className="scroll-mt-24 px-4 pb-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-[32px] bg-ink p-8 text-white sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
          />
          <div className="relative">
            <p className="text-[12px] uppercase tracking-[0.2em] text-white/45">Take it with you</p>
            <h2 className="mt-2 font-display text-[clamp(1.6rem,3.4vw,2.2rem)] leading-tight tracking-tight">
              Ready when you are.
            </h2>
            <p className="mt-2.5 max-w-[46ch] text-[18px] leading-[1.65] text-white/65">
              {tool.kind} · {tool.meta}. Free to download, remix, and ship with — just don&apos;t
              resell it as-is.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-[14px] font-medium text-white transition hover:bg-ink"
              >
                <Download className="size-4" strokeWidth={2.2} />
                Download {tool.name}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
              </button>
              <span className="text-[14px] text-white/50">{content.ctaNote}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---------- more from the shelf ---------- */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight tracking-tight text-ink"
          >
            More from the <span className="italic">shelf</span>
          </motion.h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((r, i) => (
              <motion.div
                key={r.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.06 }}
              >
                <Link href={`/resources/tools/${r.slug}`} className="group block h-full">
                  <article className="flex h-full flex-col rounded-[22px] bg-card p-2.5 ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:ring-black/10">
                    <img
                      src={r.cover}
                      alt={r.name}
                      loading="lazy"
                      className="aspect-[16/10] w-full rounded-[16px] object-cover"
                    />
                    <div className="flex flex-1 flex-col px-2 pb-2 pt-3">
                      <h3 className="font-display text-[15px] leading-[1.25] text-ink">{r.name}</h3>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <span className="text-[12px] text-ink/50">{r.meta}</span>
                        <span className="grid size-6 place-items-center rounded-full bg-ink text-white transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-sage">
                          <ArrowUpRight className="size-3" strokeWidth={2.2} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
