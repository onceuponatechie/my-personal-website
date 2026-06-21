"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import { Reveal, RevealText, Parallax } from "@/components/Motion";
import type { Story, Book } from "@/lib/site-data";
import { EASE } from "@/lib/motion";

export function StoryDetailView({
  s,
  nextStory,
  resource,
}: {
  s: Story;
  nextStory: Story;
  resource: Book;
}) {
  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />
      <article className="px-4 pt-16 pb-20 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <Link href="/stories" className="inline-flex items-center gap-1.5 text-[13px] text-ink/60 transition hover:text-ink">
            <ArrowLeft className="size-3.5" /> All stories
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-8"
          >
            <div className="flex items-center gap-3 text-[12px] text-ink/50">
              <span>{s.date}</span>
              <span className="size-1 rounded-full bg-ink/30" />
              <span>{s.read}</span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-ink">{s.title}</h1>
            <p className="mt-5 text-[17px] leading-[1.65] text-ink/70">{s.excerpt}</p>
          </motion.div>

          <div className="mt-10 overflow-hidden rounded-[28px]">
            <Parallax distance={28}>
              <motion.img
                src={s.cover}
                alt={s.title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 1, ease: EASE }}
                className="aspect-[16/10] w-full scale-110 object-cover"
              />
            </Parallax>
          </div>

          <div className="prose prose-neutral mt-10 max-w-none text-[16px] leading-[1.85] text-ink/75">
            <p>{s.body}</p>
            <p>
              The longer I do this, the more I trust the small moves. Renaming a button. Cutting a paragraph in half. Letting an empty state stay empty. The work that lasts is the work that resists the temptation to perform.
            </p>
            <p>
              If any of this lands, I&apos;d love to hear from you. The journal is best when it&apos;s a conversation.
            </p>
          </div>
        </div>
      </article>

      {/* ---------- you may also like ---------- */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <Reveal dir="up" amount={0.6}>
            <p className="text-[12px] uppercase tracking-[0.22em] text-ink/45">Keep going</p>
          </Reveal>
          <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight tracking-tight text-ink">
            <RevealText text="You may also like" />
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {/* next letter */}
            <Reveal dir="left" amount={0.4}>
              <Link
                href={`/stories/${nextStory.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-card p-3 ring-1 ring-black/5 transition hover:-translate-y-1 hover:ring-black/10"
              >
                <div className="overflow-hidden rounded-[18px]">
                  <img
                    src={nextStory.cover}
                    alt={nextStory.title}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-sage">Next story</span>
                  <h3 className="mt-1.5 font-display text-[18px] leading-[1.2] tracking-tight text-ink">
                    {nextStory.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-medium text-ink">
                    Read story
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* take-away resource */}
            <Reveal dir="right" amount={0.4}>
              <Link
                href={`/resources/books/${resource.slug}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] bg-sage-soft p-6 ring-1 ring-black/5 transition hover:-translate-y-1"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full opacity-50 blur-2xl"
                  style={{ background: "radial-gradient(closest-side, var(--sage) 0%, transparent 70%)" }}
                />
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/70 ring-1 ring-black/5">
                    <BookOpen className="size-3" strokeWidth={2} /> Take this with you
                  </span>
                  <h3 className="mt-4 font-display text-[22px] leading-[1.1] tracking-tight text-ink">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.55] text-ink/70">{resource.takeaway}</p>
                </div>
                <span className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink py-2 pl-4 pr-1.5 text-[13px] font-medium text-white transition group-hover:gap-3">
                  Get the notes
                  <span className="grid size-6 place-items-center rounded-full bg-white text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
