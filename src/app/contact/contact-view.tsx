"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Calendar, Coffee, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

/** Live Lagos wall-clock — a small "I'm a real person in a real place" touch. */
function LagosTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Lagos",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);
  return <span>Lagos, Nigeria{time ? ` · ${time} WAT` : ""}</span>;
}

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

          {/* Quiet facts row — grounds the page without shouting. */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-[12px] text-ink/55"
          >
            <span className="inline-flex items-center gap-2">
              <span className="relative grid size-2 place-items-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-sage" />
              </span>
              2 spots open this quarter
            </span>
            <span className="hidden size-1 rounded-full bg-ink/20 sm:inline-flex" />
            <LagosTime />
            <span className="hidden size-1 rounded-full bg-ink/20 sm:inline-flex" />
            <span>Replies within 2 working days</span>
          </motion.div>
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
              <>
                <div className="mb-9 flex items-end justify-between gap-4 border-b border-ink/[0.08] pb-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">The brief</p>
                    <h2 className="mt-2 font-display text-[26px] leading-tight tracking-tight text-ink">
                      Tell me what we&apos;re making
                    </h2>
                  </div>
                  <span className="hidden text-[12px] text-ink/40 sm:block">Takes ~2 minutes</span>
                </div>

                <div className="space-y-8">
                  <Field label="Your name" id="name" n="01">
                    <input id="name" required className={inputCls} placeholder="Ada Lovelace" />
                  </Field>
                  <Field label="Email" id="email" n="02">
                    <input id="email" type="email" required className={inputCls} placeholder="ada@calm.studio" />
                  </Field>
                  <Field label="What's the project?" id="project" n="03">
                    <textarea
                      id="project"
                      required
                      rows={4}
                      className={inputCls + " resize-none"}
                      placeholder="A short paragraph is plenty. Links welcome."
                    />
                  </Field>
                  <Field label="A link to your world (optional)" id="link" n="04">
                    <input
                      id="link"
                      type="text"
                      className={inputCls}
                      placeholder="Website, deck, or wherever you live online"
                    />
                  </Field>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 rounded-full btn-sage px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_10px_24px_-12px_oklch(0.72_0.07_145/0.7)] transition"
                    >
                      Send it over
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
                    </button>
                    <span className="text-[12px] text-ink/40">Read by a human — me.</span>
                  </div>
                </div>
              </>
            )}
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col gap-4"
          >
            <ContactCard Icon={Mail} tint="bg-sage-soft" title="Write directly" body="hello@essy.dev" meta="Fastest way in" href="mailto:hello@essy.dev" />
            <ContactCard Icon={Calendar} tint="bg-lavender-soft" title="Book a 20-min chat" body="Pick a slot that works for you." meta="Free · No agenda needed" href="https://cal.com" />
            <ContactCard Icon={Coffee} tint="bg-butter-soft" title="In Lagos? Coffee's on me." body="Yaba or Lekki, you pick." meta="Best ideas happen offline" href="mailto:hello@essy.dev" />

            <div className="rounded-[28px] bg-ink p-6 text-white">
              <p className="font-display text-[22px] leading-tight">A small note —</p>
              <p className="mt-2 text-[13px] leading-[1.6] text-white/70">
                I read every message myself, usually with a coffee in hand. I only keep a few projects on the bench at once, so I&apos;m honest fast about fit — and if we&apos;re not right for each other, I&apos;ll gladly point you toward someone who is.
              </p>
              <p className="mt-4 font-display text-[17px] italic text-white/80">— Essy</p>
            </div>
          </motion.aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* Editorial fields — a hairline baseline instead of boxed inputs, so the form
 * reads like stationery rather than a settings panel. */
const inputCls =
  "w-full border-0 border-b border-ink/15 bg-transparent px-0 pb-3 pt-1 text-[15px] text-ink placeholder:text-ink/30 outline-none transition-colors duration-300 focus:border-sage focus:ring-0";

function Field({ label, id, n, children }: { label: string; id: string; n: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="group/field block">
      <span className="mb-1.5 flex items-baseline gap-2.5">
        <span className="font-display text-[13px] italic text-ink/30 transition-colors group-focus-within/field:text-sage">
          {n}
        </span>
        <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-ink/55">{label}</span>
      </span>
      {children}
    </label>
  );
}

function ContactCard({
  Icon,
  tint,
  title,
  body,
  meta,
  href,
}: {
  Icon: LucideIcon;
  tint: string;
  title: string;
  body: string;
  meta: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-start gap-4 rounded-[24px] bg-card p-5 ring-1 ring-black/5 transition duration-300 hover:-translate-y-0.5 hover:ring-black/10 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.25)]"
    >
      <span className={`grid size-11 shrink-0 place-items-center rounded-full ${tint} text-ink`}>
        <Icon className="size-4" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-[13px] text-ink/60">{body}</p>
        <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-ink/35">{meta}</p>
      </div>
      <span className="grid size-8 shrink-0 place-items-center self-center rounded-full text-ink/30 ring-1 ring-ink/10 transition-all duration-300 group-hover:bg-ink group-hover:text-white group-hover:ring-ink">
        <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
      </span>
    </a>
  );
}
