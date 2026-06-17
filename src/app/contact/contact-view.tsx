"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Calendar, Coffee, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ContactView() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />

      <section className="px-4 pt-20 pb-12 sm:pt-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={fadeUp} className="text-[12px] uppercase tracking-[0.22em] text-ink/50">
            Hi, hello, howdy 👋
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[1] tracking-tight text-ink"
          >
            Let's <span className="italic">build</span> something <br className="hidden sm:block" />
            you'll be proud of.
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-[48ch] text-[15px] leading-[1.65] text-ink/65">
            I take on 2-3 focused projects each quarter. Tell me what you're cooking and I'll get back within two working days — usually faster, sometimes with sketches.
          </motion.p>
        </motion.div>
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-[36px] bg-card p-7 ring-1 ring-black/5 sm:p-10"
          >
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="grid size-14 place-items-center rounded-full bg-sage-soft text-ink">✶</div>
                <h2 className="mt-5 font-display text-[28px] text-ink">Got it — talk soon.</h2>
                <p className="mt-2 max-w-[36ch] text-[14px] text-ink/60">
                  Your note landed. I'll write back within two working days.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <Field label="Your name" id="name"><input id="name" required className={inputCls} placeholder="Ada Lovelace" /></Field>
                <Field label="Email" id="email"><input id="email" type="email" required className={inputCls} placeholder="ada@calm.studio" /></Field>
                <Field label="What's the project?" id="project">
                  <textarea id="project" required rows={5} className={inputCls + " resize-none"} placeholder="A short paragraph is plenty. Links welcome." />
                </Field>
                <Field label="Timeline" id="timeline">
                  <select id="timeline" className={inputCls}>
                    <option>Just exploring for now</option>
                    <option>Ready to start right away</option>
                    <option>Within the next month</option>
                    <option>Sometime this quarter</option>
                    <option>Not sure yet — let&apos;s talk</option>
                  </select>
                </Field>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_10px_24px_-12px_oklch(0.72_0.07_145/0.7)] transition hover:brightness-105"
                >
                  Send it over
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
                </button>
              </div>
            )}
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col gap-4"
          >
            <ContactCard Icon={Mail} title="Write directly" body="hi@onceuponatechie.com" href="mailto:hi@onceuponatechie.com" />
            <ContactCard Icon={Calendar} title="Book a 20-min chat" body="Pick a slot that works for you." href="https://cal.com" />
            <ContactCard Icon={Coffee} title="In Lagos? Coffee's on me." body="Yaba or Lekki, you pick." href="mailto:hi@onceuponatechie.com" />
            <div className="rounded-[28px] bg-ink p-6 text-white">
              <p className="font-display text-[22px] leading-tight">A small note —</p>
              <p className="mt-2 text-[13px] leading-[1.6] text-white/70">
                I'm slow to start and fast to finish. If your timeline is &lt; 2 weeks, I'm probably not the right fit. If it's a long, careful build, you've found me.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const inputCls =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px] text-ink placeholder:text-ink/35 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/30";

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.16em] text-ink/55">{label}</span>
      {children}
    </label>
  );
}

function ContactCard({ Icon, title, body, href }: { Icon: LucideIcon; title: string; body: string; href: string }) {
  return (
    <a
      href={href}
      className="group flex items-start gap-4 rounded-[24px] bg-card p-5 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:ring-black/10"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage-soft text-ink">
        <Icon className="size-4" strokeWidth={2} />
      </span>
      <div>
        <p className="text-[14px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-[13px] text-ink/60">{body}</p>
      </div>
    </a>
  );
}
