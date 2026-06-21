"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { relatedStories, storyResource, type Story } from "@/lib/site-data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function StoryDetailView({ s }: { s: Story }) {
  const youMayLike = relatedStories(s.slug, 2);
  const resource = storyResource(s.slug);

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

          <motion.img
            src={s.cover}
            alt={s.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 1, ease: EASE }}
            className="mt-10 aspect-[16/10] w-full rounded-[28px] object-cover"
          />

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

      {/* Resource pairing — a relevant freebie to take away from the post. */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <Reveal blur>
            <p className="text-[11px] uppercase tracking-[0.24em] text-ink/45">A resource for you</p>
          </Reveal>
          <Reveal delay={0.08} className="mt-4">
            <Link
              href={resource.href}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-[28px] bg-ink p-5 text-white sm:flex-row sm:items-center"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-25 blur-3xl"
                style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
              />
              <img
                src={resource.cover}
                alt={resource.name}
                className="aspect-[16/10] w-full rounded-[20px] object-cover sm:h-28 sm:w-44 sm:shrink-0"
              />
              <div className="relative flex-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{resource.kind}</p>
                <h3 className="mt-1.5 font-display text-[22px] leading-tight tracking-tight">{resource.name}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.55] text-white/65">{resource.blurb}</p>
              </div>
              <span className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-[13px] font-medium text-white transition group-hover:gap-3">
                <Download className="size-3.5" strokeWidth={2.2} />
                Grab it free
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* You may like — pointers to other posts, sliding in from the sides. */}
      <section className="px-4 pb-28 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal blur>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight tracking-tight text-ink">
              You may <span className="italic">like</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {youMayLike.map((post, i) => (
              <Reveal key={post.slug} dir={i % 2 === 0 ? "left" : "right"} delay={i * 0.06}>
                <Link href={`/stories/${post.slug}`} className="group block h-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-[24px] bg-card p-2.5 ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:ring-black/10 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.35)]">
                    <div className="overflow-hidden rounded-[18px]">
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col px-3 pb-2 pt-3.5">
                      <div className="flex items-center gap-2 text-[11px] text-ink/50">
                        <span>{post.date}</span>
                        <span className="size-1 rounded-full bg-ink/30" />
                        <span>{post.read}</span>
                      </div>
                      <div className="mt-1.5 flex items-start justify-between gap-3">
                        <h3 className="line-clamp-2 font-display text-[19px] leading-[1.15] tracking-tight text-ink">
                          {post.title}
                        </h3>
                        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-ink text-white transition-all duration-500 group-hover:rotate-45">
                          <ArrowUpRight className="size-4" strokeWidth={2.2} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
