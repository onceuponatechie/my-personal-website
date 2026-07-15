"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, Mail, Calendar, Coffee, type LucideIcon } from "lucide-react";
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
  const [service, setService] = useState("");

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
          <motion.p variants={fadeUp} className="text-[13px] uppercase tracking-[0.22em] text-ink/50">
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
                  <p className="text-[12px] uppercase tracking-[0.18em] text-ink/40">No pitch deck needed</p>
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
                  <Field label="What are you interested in?" index="03" id="service">
                    <ServiceSelect value={service} onChange={setService} />
                  </Field>
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
                      className="group inline-flex items-center gap-2 self-start rounded-full bg-sage px-7 py-3.5 text-[14px] font-medium text-white shadow-[0_10px_24px_-12px_oklch(0.72_0.07_145/0.7)] transition hover:bg-ink hover:shadow-[0_10px_24px_-12px_rgba(28,28,34,0.45)]"
                    >
                      Send it over
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
                    </button>
                    <p className="text-[14px] leading-[1.5] text-ink/45 sm:max-w-[24ch] sm:text-right">
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
              <p className="border-b border-black/[0.07] px-6 pb-4 pt-6 text-[12px] uppercase tracking-[0.2em] text-ink/40">
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
              <p className="mt-3 text-[14px] leading-[1.7] text-white/70">
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

/** On-brand replacement for a native select — the trigger reads like the
 * other underline fields, the options open in the same soft card the nav
 * dropdown uses. */
function ServiceSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id="service"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${inputCls} flex items-center justify-between text-left ${value ? "text-ink" : "text-ink/30"}`}
      >
        {value || "Pick a lane"}
        <ChevronDown
          className={`size-4 shrink-0 text-ink/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Services"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl bg-card p-1.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.22)] ring-1 ring-black/5"
          >
            {SERVICES.map((s) => {
              const selected = s === value;
              return (
                <li key={s}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(s);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] transition hover:bg-foreground/5 ${
                      selected ? "bg-foreground/5 font-medium text-ink" : "text-ink/70"
                    }`}
                  >
                    {s}
                    {selected && <Check className="size-3.5 shrink-0 text-sage" strokeWidth={2.4} />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

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
        <span className="font-display text-[14px] italic text-ink/30">{index}</span>
        <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink/50">{label}</span>
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
        <p className="mt-0.5 truncate text-[14px] text-ink/55">{body}</p>
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
    <span className="text-[14px] tabular-nums text-white/50">
      Lagos {time ? `· ${time.toUpperCase()}` : ""}
    </span>
  );
}
