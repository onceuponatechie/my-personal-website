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

const CHANNELS = [
  { Icon: Mail, title: "Write directly", body: "hello@essy.dev", href: "mailto:hello@essy.dev" },
  { Icon: Calendar, title: "Book a 20-min chat", body: "Pick a slot that works for you.", href: "https://cal.com" },
  { Icon: Coffee, title: "In Lagos? Coffee's on me.", body: "Yaba or Lekki, you pick.", href: "mailto:hello@essy.dev" },
];

/* The lanes I actually work in — products, converting sites, automation,
 * behaviour research, and the storytelling around all of it. */
const SERVICES = [
  "Web or mobile product",
  "A website that converts",
  "Automation & AI workflows",
  "UX research & behaviour audit",
  "Product storytelling & content",
  "Something else / just a chat",
];

export function ContactView() {
  const [sent, setSent] = useState(false);
  const [services, setServices] = useState<string[]>([]);

  const toggleService = (s: string) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

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
              <>
                <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-black/[0.07] pb-6">
                  <h2 className="font-display text-[24px] leading-none tracking-tight text-ink">The brief</h2>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink/40">No pitch deck needed</p>
                </div>

                <div className="space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
                    <Field label="Your name" index="01" id="name">
                      <input id="name" required className={inputCls} placeholder="Ada Lovelace" />
                    </Field>
                    <Field label="Email" index="02" id="email">
                      <input id="email" type="email" required className={inputCls} placeholder="ada@calm.studio" />
                    </Field>
                  </div>
                  {/* Pick-a-lane chips — multi-select, since projects rarely
                      stay in one box. */}
                  <fieldset>
                    <legend className="mb-3 flex items-baseline gap-2.5">
                      <span className="font-display text-[12px] italic text-ink/30">03</span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink/50">
                        What are you interested in?
                      </span>
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((s) => {
                        const on = services.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleService(s)}
                            className={`rounded-full px-4 py-2 text-[13px] transition ${
                              on
                                ? "bg-sage font-medium text-white shadow-sm"
                                : "border border-ink/15 text-ink/70 hover:border-ink/30 hover:text-ink"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <Field label="What's the project?" index="04" id="project">
                    <textarea
                      id="project"
                      required
                      rows={4}
                      className={inputCls + " resize-none"}
                      placeholder="A short paragraph is plenty. Links welcome."
                    />
                  </Field>

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 self-start rounded-full bg-sage px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_10px_24px_-12px_oklch(0.72_0.07_145/0.7)] transition hover:bg-lavender hover:text-ink hover:shadow-[0_10px_24px_-12px_rgba(224,159,241,0.75)]"
                    >
                      Send it over
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
                    </button>
                    <p className="text-[12px] leading-[1.5] text-ink/45 sm:max-w-[24ch] sm:text-right">
                      Plain words are perfect. Replies within two working days.
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col gap-6"
          >
            {/* Three doors, one quiet card. */}
            <div className="overflow-hidden rounded-[36px] bg-card ring-1 ring-black/5">
              <p className="border-b border-black/[0.07] px-6 pb-4 pt-6 text-[11px] uppercase tracking-[0.2em] text-ink/40">
                Other doors in
              </p>
              <div className="divide-y divide-black/[0.06]">
                {CHANNELS.map((c) => (
                  <ContactRow key={c.title} {...c} />
                ))}
              </div>
            </div>

            <div className="rounded-[36px] bg-ink p-7 text-white">
              <p className="font-display text-[22px] leading-tight">A small note —</p>
              <p className="mt-3 text-[13px] leading-[1.7] text-white/70">
                I read every message myself, usually with a coffee in hand. I only keep a few projects on the bench at once, so I&apos;m honest fast about fit — and if we&apos;re not right for each other, I&apos;ll gladly point you toward someone who is.
              </p>
              <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5">
                <span className="font-display text-[18px] italic leading-none">— Essy</span>
                <LagosClock />
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* Editorial underline inputs — hairline that sharpens to ink on focus. */
const inputCls =
  "w-full border-b border-black/10 bg-transparent px-0 py-2.5 text-[15px] text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-ink";

function Field({
  label,
  index,
  id,
  children,
}: {
  label: string;
  index: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="group/field block">
      <span className="mb-2 flex items-baseline gap-2.5">
        <span className="font-display text-[12px] italic text-ink/30">{index}</span>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink/50">{label}</span>
      </span>
      {children}
    </label>
  );
}

function ContactRow({ Icon, title, body, href }: { Icon: LucideIcon; title: string; body: string; href: string }) {
  return (
    <a href={href} className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-ink/[0.03]">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-black/10 text-ink transition-colors group-hover:border-ink/30">
        <Icon className="size-4" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 truncate text-[13px] text-ink/55">{body}</p>
      </div>
      <ArrowUpRight
        className="size-4 shrink-0 text-ink/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
        strokeWidth={2}
      />
    </a>
  );
}

/* Live local time in Lagos — a small true detail instead of decoration. */
function LagosClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Lagos",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="text-[12px] tabular-nums text-white/50">
      Lagos {time ? `· ${time.toUpperCase()}` : ""}
    </span>
  );
}
