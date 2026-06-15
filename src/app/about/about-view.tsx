"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";

const profileImg = "/assets/profile.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const PRINCIPLES = [
  { title: "Quiet beats clever", body: "If a feature has to announce itself, it's already failing. Calm software earns trust." },
  { title: "Ship small, often", body: "A live, ugly version beats a perfect Figma file. Iteration is the design tool." },
  { title: "Words are design", body: "Half my craft is rewriting microcopy until the button feels obvious." },
  { title: "Care, but don't cling", body: "Hold opinions loosely. The user is the source of truth, not your taste." },
];

const TIMELINE = [
  { year: "2026", note: "Independent studio of one. Building Streamline, writing more often." },
  { year: "2024", note: "Founding designer at Pocket Coach. App Store featured." },
  { year: "2022", note: "Design engineer at a Series B SaaS. First proper case study." },
  { year: "2020", note: "Self-taught my way out of a chemistry degree. No regrets." },
];

export function AboutView() {
  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />

      <section className="px-4 pt-20 pb-16 sm:pt-28 sm:px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[1.2fr_1fr]"
        >
          <div>
            <motion.p variants={fadeUp} className="text-[12px] uppercase tracking-[0.22em] text-ink/50">
              About
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] tracking-tight text-ink"
            >
              I'm Essy — I make <span className="italic">quiet</span> software <br />
              for loud problems.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-[56ch] text-[16px] leading-[1.7] text-ink/70">
              Six years in, I still believe the best software disappears. I design and build products end-to-end —
              from the first sketch on a napkin to the deploy log scrolling at 2 a.m. I work mostly with founders
              who care about craft and have something genuinely useful to say.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-[14px] font-medium text-white transition hover:brightness-105"
              >
                Work with me
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-1.5 text-[14px] text-ink underline-offset-4 hover:underline">
                See the work
              </Link>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="overflow-hidden rounded-[36px] bg-card p-3 ring-1 ring-black/5">
            <img src={profileImg} alt="Essy" className="aspect-[4/5] w-full rounded-[28px] object-cover" />
          </motion.div>
        </motion.div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-ink"
          >
            How I <span className="italic">work</span>
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {PRINCIPLES.map((p) => (
              <motion.div
                key={p.title}
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } }}
                className="rounded-[28px] bg-card p-7 ring-1 ring-black/5"
              >
                <h3 className="font-display text-[22px] text-ink">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-ink/65">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-ink"
          >
            The short <span className="italic">timeline</span>
          </motion.h2>
          <ol className="mt-10 space-y-6">
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                className="grid grid-cols-[80px_1fr] items-baseline gap-6 border-b border-black/5 pb-6"
              >
                <span className="font-display text-[22px] text-ink/50">{t.year}</span>
                <p className="text-[15px] leading-[1.6] text-ink/75">{t.note}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </main>
  );
}
