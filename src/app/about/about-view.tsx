"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Linkedin, Twitter } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";

const profileImg = "/assets/profile.jpg";
const imgNotebook = "/assets/inline-3.jpg";
const imgReading = "/assets/dev-diary.jpg";
const imgCoffee = "/assets/inline-4.jpg";
const imgDesk = "/assets/research-vault.jpg";
const imgMouse = "/assets/inline-2.jpg";
const imgBooks = "/assets/book-notes.jpg";

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
const CURIOSITIES = [
  "Why do certain ideas stick?",
  "Why do some brands earn trust while others never do?",
  "Why can one sentence change someone's mind?",
];

// How my toolkit grew, one season at a time.
const TOOLBOX_STEPS: { label: string; body: string }[] = [
  { label: "First", body: "with no-code tools." },
  { label: "Then", body: "with AI." },
  { label: "Now", body: "with code, curiosity, and a very healthy amount of trial and error." },
];

const BUILDS = [
  "Sometimes it's a website.",
  "Sometimes it's a product concept.",
  "Sometimes it's an automation that saves time.",
  "And sometimes it's just an idea that refused to leave me alone until I made it.",
];

// An editorial index — a quiet label above each line instead of icon chips.
const CARES: { label: string; body: string }[] = [
  { label: "Considered products", body: "Products that feel like someone genuinely thought about the people using them." },
  { label: "Human behaviour", body: "Understanding why people trust, adopt, and come back." },
  { label: "Books", body: "Comfortably more than I have shelf space for." },
  { label: "Startups", body: "And the people brave (or stubborn) enough to build them." },
  { label: "Storytelling", body: "Communication and storytelling, treated as serious crafts." },
  { label: "Human technology", body: "Making technology feel a little more human." },
  { label: "Faith", body: "My Christian faith — quietly, but fully." },
  { label: "Nigeria", body: "The Nigerian startup ecosystem, and what we're building here." },
];

// Role titles and dates only — the story stays scannable.
const JOURNEY: { role: string; org: string; period: string }[] = [
  { role: "Product Manager", org: "Nithub", period: "Apr 2026 — Present" },
  { role: "AI Conversation Facilitator", org: "Lingtec.AI", period: "Jan — Mar 2026" },
  { role: "Graphic Designer", org: "Freelance", period: "Mar 2024 — Dec 2025" },
  { role: "Associate Product Manager", org: "Luminevent", period: "Feb — Apr 2025" },
  { role: "Product Marketer", org: "Alldiscounts", period: "Mar — Sep 2024" },
  { role: "Customer Service Representative", org: "Alldiscounts", period: "Sep 2022 — Mar 2024" },
];

/**
 * A small photo card that springs in with a tilt, idly bobs, and straightens
 * when hovered. `frame` controls the card's shape (polaroid, arch, circle…).
 */
function PhotoCard({
  src,
  alt = "",
  rotate = 0,
  delay = 0,
  bobDelay = 0,
  bobDuration = 6,
  className = "",
  frame = "rounded-[18px] bg-card p-1.5",
  imgClass = "rounded-[13px]",
}: {
  src: string;
  alt?: string;
  rotate?: number;
  delay?: number;
  bobDelay?: number;
  bobDuration?: number;
  className?: string;
  frame?: string;
  imgClass?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotate * 2.5, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotate, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      whileHover={{ rotate: 0, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 210, damping: 20, delay }}
      className={`relative hover:z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: bobDuration, delay: bobDelay, ease: "easeInOut" }}
        className={`h-full w-full overflow-hidden shadow-[0_22px_44px_-22px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.06] ${frame}`}
      >
        <img src={src} alt={alt} className={`h-full w-full object-cover ${imgClass}`} />
      </motion.div>
    </motion.div>
  );
}

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
            <motion.p variants={fadeUp} className="text-[13px] uppercase tracking-[0.22em] text-ink/50">
              About
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.04] tracking-tight text-ink"
            >
              <span className="italic">Curiosity</span> is where my projects begin.
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
                className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-[14px] font-medium text-white transition hover:bg-ink"
              >
                Work with me
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
              </Link>
              <Link
                href="/projects"
                className="group/link inline-flex items-center gap-1.5 text-[14px] text-foreground underline underline-offset-4 hover:opacity-70"
              >
                See the work
                <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-0.5" />
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

          {/* Three little snapshots, fanned like they fell out of a notebook. */}
          <div className="mt-12 flex items-end justify-center">
            <PhotoCard
              src={imgNotebook}
              alt="A notebook open on a warm desk"
              rotate={-7}
              bobDuration={5.5}
              className="z-[1] h-32 w-28 sm:h-40 sm:w-36"
            />
            <PhotoCard
              src={imgReading}
              alt="Reading on the couch"
              rotate={2.5}
              delay={0.08}
              bobDelay={0.6}
              bobDuration={6.5}
              className="z-[2] -ml-6 mb-5 h-36 w-32 sm:h-48 sm:w-40"
            />
            <PhotoCard
              src={imgCoffee}
              alt="A warm cup of coffee"
              rotate={6}
              delay={0.16}
              bobDelay={1.1}
              bobDuration={5}
              className="z-[1] -ml-6 h-32 w-28 sm:h-40 sm:w-36"
            />
          </div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={stagger}
            className="mt-10 border-y border-black/[0.08]"
          >
            {CURIOSITIES.map((q, i) => (
              <motion.li
                key={q}
                variants={fadeUp}
                className={`flex items-baseline gap-5 py-6 sm:gap-8 ${i > 0 ? "border-t border-black/[0.08]" : ""}`}
              >
                <span className="font-display text-[14px] italic text-ink/35">0{i + 1}</span>
                <p className="font-display text-[clamp(1.35rem,2.8vw,1.9rem)] italic leading-snug tracking-tight text-ink">
                  {q}
                </p>
              </motion.li>
            ))}
          </motion.ol>

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
              <motion.li key={s.label} variants={fadeUp} className="flex items-baseline gap-5">
                <span className="w-12 shrink-0 font-display text-[18px] italic text-ink">{s.label}</span>
                <p className="text-[16px] leading-[1.6] text-ink/75">{s.body}</p>
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

          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                variants={stagger}
                className="space-y-5 text-[16px] leading-[1.7] text-ink/70"
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
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink/25" aria-hidden />
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

            {/* A different pairing here — one arch, one porthole. */}
            <div className="flex items-center justify-center gap-6 md:flex-col md:gap-8 md:pl-2">
              <PhotoCard
                src={imgDesk}
                alt="A laptop mid-build"
                rotate={-4}
                bobDuration={6}
                frame="rounded-t-[999px] rounded-b-[22px]"
                imgClass=""
                className="h-44 w-32 sm:h-52 sm:w-36"
              />
              <PhotoCard
                src={imgMouse}
                alt="A mouse on a dark desk"
                rotate={5}
                delay={0.1}
                bobDelay={0.8}
                bobDuration={5}
                frame="rounded-full"
                imgClass=""
                className="size-24 sm:size-28"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Things I care about */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-ink"
            >
              Things I <span className="italic">care about</span>
            </motion.h2>
            <PhotoCard
              src={imgBooks}
              alt="A stack of well-loved books"
              rotate={5}
              bobDuration={6.5}
              className="hidden h-28 w-24 shrink-0 sm:block"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            className="mt-10 grid grid-cols-1 gap-x-14 sm:grid-cols-2"
          >
            {CARES.map((c, i) => (
              <motion.div key={c.label} variants={fadeUp} className="border-t border-black/[0.08] py-6">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink/45">{c.label}</p>
                  <span className="font-display text-[14px] italic text-ink/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-ink/75">{c.body}</p>
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

      {/* The journey so far */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-ink"
          >
            The journey <span className="italic">so far…</span>
          </motion.h2>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={stagger}
            className="mt-10 border-y border-black/[0.08]"
          >
            {JOURNEY.map((j, i) => (
              <motion.li
                key={`${j.role}-${j.period}`}
                variants={fadeUp}
                className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-5 ${
                  i > 0 ? "border-t border-black/[0.08]" : ""
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <p className="text-[16px] font-medium text-ink">{j.role}</p>
                  <p className="text-[14px] text-ink/50">{j.org}</p>
                </div>
                <p className="font-display text-[14px] italic text-ink/45">{j.period}</p>
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
            Different rooms, same thread. Support taught me to listen, marketing taught me to translate, design gave me
            an eye, and product is where they all meet — building things that make people feel understood.
          </motion.p>
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
              className="group inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-[14px] font-medium text-white shadow-sm transition hover:bg-ink"
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
            Thanks for stopping by. Have a brilliant one.
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
