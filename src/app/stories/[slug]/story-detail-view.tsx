"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import type { Story } from "@/lib/site-data";

export function StoryDetailView({ s }: { s: Story }) {
  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />
      <article className="px-4 pt-16 pb-24 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <Link href="/stories" className="inline-flex items-center gap-1.5 text-[13px] text-ink/60 transition hover:text-ink">
            <ArrowLeft className="size-3.5" /> All stories
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
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
            transition={{ delay: 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-10 aspect-[16/10] w-full rounded-[28px] object-cover"
          />

          <div className="prose prose-neutral mt-10 max-w-none text-[16px] leading-[1.85] text-ink/75">
            <p>{s.body}</p>
            <p>
              The longer I do this, the more I trust the small moves. Renaming a button. Cutting a paragraph in half. Letting an empty state stay empty. The work that lasts is the work that resists the temptation to perform.
            </p>
            <p>
              If any of this lands, I'd love to hear from you. The journal is best when it's a conversation.
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
