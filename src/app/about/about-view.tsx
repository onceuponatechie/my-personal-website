"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Twitter } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";

const profileImg = "/assets/profile.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// The three questions that pulled me toward people, then products.
const CURIOSITIES: { q: string; bar: string }[] = [
  { q: "Why do certain ideas stick?", bar: "bg-sage" },
  { q: "Why do some brands earn trust while others never do?", bar: "bg-lavender" },
  { q: "Why can one sentence change someone's mind?", bar: "bg-butter" },
];

// How my toolkit grew, one season at a time.
const TOOLBOX_STEPS: { label: string; body: string; dot: string }[] = [
  { label: "First", body: "with no-code tools.", dot: "bg-sage" },
  { label: "Then", body: "with AI.", dot: "bg-lavender" },
  { label: "Now", body: "with code, curiosity, and a very healthy amount of trial and error.", dot: "bg-butter" },
];

const BUILDS = [
  "Sometimes it's a website.",
  "Sometimes it's a product concept.",
  "Sometimes it's an automation that saves time.",
  "And sometimes it's just an idea that refused to leave me alone until I made it.",
];

// Each card gets a soft accent tint, rotating through the palette.
const CARES: { icon: string; body: string; tint: string }[] = [
  { icon: "✨", body: "Products that feel like someone genuinely thought about the people using them.", tint: "bg-sage-soft" },
  { icon: "🧠", body: "Understanding why people trust, adopt, and come back.", tint: "bg-lavender-soft" },
  { icon: "📚", body: "Books. Comfortably more than I have shelf space for.", tint: "bg-butter-soft" },
  { icon: "🚀", body: "Startups, and the people brave (or stubborn) enough to build them.", tint: "bg-sage-soft" },
  { icon: "💬", body: "Communication and storytelling, treated as serious crafts.", tint: "bg-lavender-soft" },
  { icon: "⚡", body: "Making technology feel a little more human.", tint: "bg-butter-soft" },
  { icon: "✝️", body: "My Christian faith — quietly, but fully.", tint: "bg-sage-soft" },
  { icon: "🇳🇬", body: "The Nigerian startup ecosystem, and what we're building here.", tint: "bg-lavender-soft" },
];

const NOTS = [
  "I'm not trying to be the loudest person in the room.",
  "I'm not pretending I've got it all figured out.",
  "And I'm definitely not a “guru.”",
];

export function AboutView() {
  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />

      {/* Hero — portrait beside the opening headline */}
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
              className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.04] tracking-tight text-ink"
            >
              <span className="italic">Curiosity</span> is usually where my projects begin.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-[58ch] text-[16px] leading-[1.7] text-ink/70">
              A random question turns into research. Research becomes sketches. Sketches become websites, products,
              presentations, and the occasional late-night rabbit hole. I spend most of my time figuring out what
              deserves to be built, then finding the simplest way to bring it to life. Somewhere between all these, I
              found a space that feels like home. And I&apos;m not leaving anytime soon.
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

      {/* How I got here */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-ink"
          >
            How I <span className="italic">got here</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-8 text-[18px] leading-[1.6] text-ink/80"
          >
            Long before I cared about products, I cared about people.
          </motion.p>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={stagger}
            className="mt-8 space-y-4"
          >
            {CURIOSITIES.map((c) => (
              <motion.li
                key={c.q}
                variants={fadeUp}
                className="flex items-stretch gap-4 rounded-[20px] bg-card p-5 ring-1 ring-black/5"
              >
                <span className={`w-1 shrink-0 rounded-full ${c.bar}`} aria-hidden />
                <p className="font-display text-[20px] italic leading-snug text-ink">{c.q}</p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={stagger}
            className="mt-10 space-y-5 text-[16px] leading-[1.7] text-ink/70"
          >
            <motion.p variants={fadeUp}>
              Those questions got me writing, then led me into tech. And once I started paying attention, I realised
              products aren&apos;t just tools. They&apos;re experiences. They&apos;re conversations. They&apos;re promises
              someone made and either kept or broke. The best ones make a person feel understood before they can explain
              why.
            </motion.p>
            <motion.p variants={fadeUp} className="text-ink/85">
              That&apos;s the kind of work I want to do. So I started building.
            </motion.p>
          </motion.div>

          {/* The toolkit, season by season */}
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={stagger}
            className="mt-8 space-y-4"
          >
            {TOOLBOX_STEPS.map((s) => (
              <motion.li key={s.label} variants={fadeUp} className="flex items-baseline gap-4">
                <span className={`mt-2 size-2.5 shrink-0 rounded-full ${s.dot}`} aria-hidden />
                <p className="text-[16px] leading-[1.6] text-ink/75">
                  <span className="font-display text-[18px] italic text-ink">{s.label}</span> {s.body}
                </p>
              </motion.li>
            ))}
          </motion.ol>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-8 text-[16px] leading-[1.7] text-ink/70"
          >
            These days, research, design, writing, and a growing friendship with{" "}
            <span className="font-medium text-ink">Python</span> are my tools of choice when I want to drag an idea out
            of my head and into something real.
          </motion.p>
        </div>
      </section>

      {/* What I'm up to these days */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-ink"
          >
            What I&apos;m up to <span className="italic">these days</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={stagger}
            className="mt-8 space-y-5 text-[16px] leading-[1.7] text-ink/70"
          >
            <motion.p variants={fadeUp}>
              I&apos;m a <span className="font-medium text-ink">Product Manager at NitHub</span>, helping build products
              in education and agritech; and learning, up close, what it actually takes to move from &ldquo;wouldn&apos;t
              it be nice if&rdquo; to something people can hold and use. It&apos;s one thing to have an idea. It&apos;s
              another to watch a real person try it and find out you were wrong about half your assumptions. I&apos;ve
              come to love that part.
            </motion.p>
            <motion.p variants={fadeUp}>Outside of work, I&apos;m usually building something.</motion.p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={stagger}
            className="mt-6 space-y-3"
          >
            {BUILDS.map((b) => (
              <motion.li key={b} variants={fadeUp} className="flex items-baseline gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lavender" aria-hidden />
                <p className="text-[15px] leading-[1.6] text-ink/70">{b}</p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-8 text-[16px] leading-[1.7] text-ink/70"
          >
            I&apos;m especially drawn to products, communication, human behaviour, fintech and startups, and the small,
            hidden stories inside everyday experiences.
          </motion.p>
        </div>
      </section>

      {/* Things I care about */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-ink"
          >
            Things I <span className="italic">care about</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {CARES.map((c) => (
              <motion.div
                key={c.body}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-[24px] bg-card p-6 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:ring-black/10"
              >
                <span className={`grid size-11 shrink-0 place-items-center rounded-full text-[18px] ${c.tint}`}>
                  {c.icon}
                </span>
                <p className="text-[15px] leading-[1.6] text-ink/75">{c.body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-8 text-center text-[15px] italic leading-[1.6] text-ink/55"
          >
            And, admittedly, an unreasonable number of open browser tabs.
          </motion.p>
        </div>
      </section>

      {/* What I'm not */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-ink"
          >
            What I&apos;m <span className="italic">not</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={stagger}
            className="mt-8 space-y-4"
          >
            {NOTS.map((n) => (
              <motion.p
                key={n}
                variants={fadeUp}
                className="border-l-2 border-butter pl-5 text-[17px] leading-[1.6] text-ink/75"
              >
                {n}
              </motion.p>
            ))}
            <motion.p variants={fadeUp} className="pt-2 text-[16px] leading-[1.7] text-ink/70">
              I&apos;m just someone who likes understanding people, making useful things, and sharing what I learn while
              I&apos;m still learning it.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Closing — let's talk */}
      <section className="px-4 pb-24 pt-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-[36px] bg-ink px-8 py-14 text-center text-white"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(closest-side, #e09ff1 0%, transparent 75%)" }}
          />
          <h3 className="relative font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight">
            So, if you&apos;re building <span className="italic">something interesting</span>…
          </h3>
          <p className="relative mx-auto mt-4 max-w-[52ch] text-[14px] leading-[1.65] text-white/65">
            I&apos;d love to hear about it. Products, startups, ideas, books, a fascinating problem you can&apos;t put
            down; I&apos;m always up for a good conversation. Or wander through the rest of the site and see what
            I&apos;ve been making.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-[14px] font-medium text-white shadow-sm transition hover:brightness-105"
            >
              <Linkedin className="size-4" strokeWidth={2} />
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-[14px] font-medium text-white ring-1 ring-white/15 transition hover:bg-white/15"
            >
              <Twitter className="size-4" strokeWidth={2} />
              X
            </a>
          </div>
          <p className="relative mt-7 text-[14px] text-white/55">
            Thanks for stopping by. Have a brilliant one. <span className="text-butter">✨</span>
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
