"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Star } from "lucide-react";
import { EASE } from "@/lib/motion";

/** Swap for the real Substack address when it's live. */
const SUBSTACK_URL = "https://essyudeme.substack.com";

/* ---------- Brand marks (inline, stylised) ---------- */

function ClaudeMark() {
  // Anthropic's spark — a warm radial burst.
  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-label="Claude">
      <g stroke="#D97757" strokeWidth="2.4" strokeLinecap="round">
        <path d="M12 3.2v5" />
        <path d="M12 15.8v5" />
        <path d="M3.2 12h5" />
        <path d="M15.8 12h5" />
        <path d="M5.8 5.8l3.5 3.5" />
        <path d="M14.7 14.7l3.5 3.5" />
        <path d="M18.2 5.8l-3.5 3.5" />
        <path d="M9.3 14.7l-3.5 3.5" />
      </g>
    </svg>
  );
}

function VSCodeMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-label="VS Code">
      <path
        d="M17.2 2.6 21 4.5v15L17.2 21.4 8.8 13.9 4.9 17 3 16l3.9-4L3 8l1.9-1 3.9 3.1zM17.2 7.4 12.4 12l4.8 4.6z"
        fill="#007ACC"
      />
    </svg>
  );
}

function FigmaMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-label="Figma">
      <path d="M9 2h3v6.4H9A3.2 3.2 0 1 1 9 2z" fill="#F24E1E" />
      <path d="M12 2h3a3.2 3.2 0 1 1 0 6.4h-3z" fill="#FF7262" />
      <path d="M9 8.8h3v6.4H9a3.2 3.2 0 1 1 0-6.4z" fill="#A259FF" />
      <circle cx="15" cy="12" r="3.2" fill="#1ABCFE" />
      <path d="M9 15.2h3v3.2A3.2 3.2 0 1 1 9 15.2z" fill="#0ACF83" />
    </svg>
  );
}

function CanvaMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-label="Canva">
      <defs>
        <linearGradient id="canva-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00C4CC" />
          <stop offset="100%" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill="url(#canva-grad)" />
      <text
        x="12"
        y="16.4"
        textAnchor="middle"
        fontSize="13"
        fontStyle="italic"
        fontFamily="Georgia, serif"
        fill="white"
      >
        C
      </text>
    </svg>
  );
}

const BRANDS: { name: string; Mark: () => React.ReactNode }[] = [
  { name: "Claude", Mark: ClaudeMark },
  { name: "VS Code", Mark: VSCodeMark },
  { name: "Figma", Mark: FigmaMark },
  { name: "Canva", Mark: CanvaMark },
];

/* ---------- Section ---------- */

export function HomeNewsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="px-4 pb-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[44px] bg-ink px-8 py-12 text-white sm:px-12 sm:py-16"
      >
        {/* Soft accent glows in the site's palette. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-35 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.72 0.07 145) 0%, transparent 75%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--lavender) 0%, transparent 75%)" }}
        />

        <div className="relative grid items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
          {/* Copy + proof */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-lavender-soft px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/75">
              <Sparkles className="size-3.5" strokeWidth={2} /> The Letter
            </span>

            <h2 className="mt-6 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.05] tracking-tight">
              Good things, straight
              <br />
              <span className="italic text-sage">to your inbox</span>
            </h2>

            <p className="mt-5 max-w-[46ch] text-[14px] leading-[1.7] text-white/65">
              New builds, fresh tools and templates, subscriber-only offers, and the occasional essay —
              sent when there&apos;s something genuinely worth your time, not on a schedule.
            </p>

            {/* Fave-brand marks + stars, echoing the reference's social row. */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {BRANDS.map(({ name, Mark }) => (
                  <span
                    key={name}
                    title={name}
                    className="grid size-9 place-items-center rounded-full bg-white ring-2 ring-ink"
                  >
                    <Mark />
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-butter">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-1 text-[12px] text-white/55">My fave brands</p>
              </div>
            </div>
          </div>

          {/* Signup card — collects the email, then hands off to Substack. */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const url = email
                ? `${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(email)}`
                : SUBSTACK_URL;
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            className="rounded-[28px] bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur sm:p-8"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full rounded-full bg-white/10 px-5 py-3.5 text-[14px] text-white ring-1 ring-white/10 transition placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sage"
            />
            <button
              type="submit"
              className="group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage px-6 py-3.5 text-[14px] font-medium text-white transition hover:bg-lavender hover:text-ink"
            >
              Get the good stuff
              <Send className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </button>
            <p className="mt-4 text-center text-[11px] leading-[1.6] text-white/40">
              You&apos;ll be signed up to my free letter on Substack.
              <br />
              No spam, just value. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
