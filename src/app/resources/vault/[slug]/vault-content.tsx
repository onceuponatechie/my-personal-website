"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { VaultBlock, Tone } from "@/lib/vault-content";
import { EASE } from "@/lib/motion";

/* ---------- tone helpers ---------- */

const TONE_VAR: Record<Tone, string> = {
  sage: "var(--sage)",
  butter: "var(--butter)",
  lavender: "var(--lavender)",
  ink: "var(--ink)",
};

const TONE_SOFT: Record<Tone, string> = {
  sage: "bg-sage-soft",
  butter: "bg-butter-soft",
  lavender: "bg-lavender-soft",
  ink: "bg-ink/[0.06]",
};

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function Block({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/45">{children}</p>
  );
}

/* ---------- charts ---------- */

function Bars({
  block,
}: {
  block: Extract<VaultBlock, { kind: "bars" }>;
}) {
  const max = Math.max(...block.items.map((i) => i.value));
  return (
    <figure className="rounded-[28px] bg-card p-6 ring-1 ring-black/5 sm:p-8">
      {block.title && (
        <figcaption className="font-display text-[20px] leading-tight tracking-tight text-ink">
          {block.title}
        </figcaption>
      )}
      <div className="mt-6 space-y-4">
        {block.items.map((item, i) => {
          const tone = item.tone ?? "sage";
          return (
            <div key={item.label} className="grid grid-cols-1 gap-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[13px] leading-snug text-ink/70">{item.label}</span>
                <span className="shrink-0 text-[13px] font-semibold tabular-nums text-ink">
                  {item.display ?? item.value}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink/[0.06]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: TONE_VAR[tone] }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(item.value / max) * 100}%` }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {block.caption && (
        <p className="mt-5 text-[12px] leading-[1.5] text-ink/45">{block.caption}</p>
      )}
    </figure>
  );
}

function Donut({
  block,
}: {
  block: Extract<VaultBlock, { kind: "donut" }>;
}) {
  const total = block.segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const R = 56;
  const C = 2 * Math.PI * R;
  // Pre-compute the cumulative value before each segment (no mutation in render).
  const priorTotals = block.segments.reduce<number[]>((acc, seg, idx) => {
    acc.push(idx === 0 ? 0 : acc[idx - 1] + block.segments[idx - 1].value);
    return acc;
  }, []);

  return (
    <figure className="rounded-[28px] bg-card p-6 ring-1 ring-black/5 sm:p-8">
      {block.title && (
        <figcaption className="font-display text-[20px] leading-tight tracking-tight text-ink">
          {block.title}
        </figcaption>
      )}
      <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:gap-10">
        <svg viewBox="0 0 140 140" className="h-40 w-40 shrink-0 -rotate-90">
          <circle cx="70" cy="70" r={R} fill="none" stroke="var(--ink)" strokeOpacity="0.06" strokeWidth="16" />
          {block.segments.map((seg, idx) => {
            const frac = seg.value / total;
            const dash = frac * C;
            const offset = -(priorTotals[idx] / total) * C;
            return (
              <motion.circle
                key={seg.label}
                cx="70"
                cy="70"
                r={R}
                fill="none"
                stroke={TONE_VAR[seg.tone]}
                strokeWidth="16"
                strokeLinecap="butt"
                strokeDasharray={`${dash} ${C - dash}`}
                strokeDashoffset={offset}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            );
          })}
        </svg>
        <ul className="w-full space-y-2.5">
          {block.segments.map((seg) => (
            <li key={seg.label} className="flex items-center gap-3">
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ background: TONE_VAR[seg.tone] }}
              />
              <span className="flex-1 text-[13px] text-ink/70">{seg.label}</span>
              <span className="text-[13px] font-semibold tabular-nums text-ink">
                {Math.round((seg.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
      {block.caption && (
        <p className="mt-6 text-[12px] leading-[1.5] text-ink/45">{block.caption}</p>
      )}
    </figure>
  );
}

/* ---------- persona ---------- */

function Persona({
  block,
}: {
  block: Extract<VaultBlock, { kind: "persona" }>;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-card ring-1 ring-black/5">
      {block.quote && (
        <div className="bg-butter-soft px-6 py-5 sm:px-8">
          <p className="flex gap-3 text-[15px] font-medium leading-[1.5] text-ink">
            <Quote className="size-5 shrink-0 -scale-x-100 text-ink/40" strokeWidth={1.6} />
            {block.quote}
          </p>
        </div>
      )}
      <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:p-8">
        <img
          src={block.image}
          alt={block.name}
          loading="lazy"
          className="h-32 w-32 rounded-[24px] object-cover sm:h-40 sm:w-40"
        />
        <div>
          <h4 className="font-display text-[24px] leading-tight tracking-tight text-ink">{block.name}</h4>
          <p className="text-[13px] text-ink/55">{block.role}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {block.meta.map((m) => (
              <div key={m.label}>
                <span className="text-[12px] text-ink/45">{m.label}: </span>
                <span className="text-[13px] font-semibold text-ink">{m.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-[52ch] text-[13px] leading-[1.65] text-ink/65">{block.bio}</p>
        </div>
      </div>

      {(block.traits || block.goals) && (
        <div className="grid gap-px bg-black/5 sm:grid-cols-2">
          {block.traits && (
            <div className="bg-card p-6 sm:p-8">
              <Eyebrow>Disposition</Eyebrow>
              <div className="mt-4 space-y-4">
                {block.traits.map((t) => (
                  <div key={t.left}>
                    <div className="flex justify-between text-[12px] text-ink/55">
                      <span>{t.left}</span>
                      <span>{t.right}</span>
                    </div>
                    <div className="relative mt-2 h-1.5 rounded-full bg-ink/[0.08]">
                      <motion.div
                        className="absolute left-0 top-0 h-full rounded-full bg-sage/40"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${t.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE }}
                      />
                      <motion.span
                        className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-ink ring-2 ring-card"
                        initial={{ left: 0 }}
                        whileInView={{ left: `calc(${t.value}% - 6px)` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {block.goals && (
            <div className="bg-card p-6 sm:p-8">
              <Eyebrow>Goals</Eyebrow>
              <ul className="mt-4 space-y-2.5">
                {block.goals.map((g) => (
                  <li key={g} className="flex gap-2.5 text-[13px] leading-[1.5] text-ink/70">
                    <span className="mt-0.5 text-sage">→</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- single block ---------- */

function renderBlock(block: VaultBlock, i: number) {
  switch (block.kind) {
    case "lead":
      return (
        <Block key={i}>
          <p className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.35] tracking-tight text-ink">
            {block.text}
          </p>
        </Block>
      );

    case "heading":
      return (
        <Block key={i} className="pt-4">
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <h2 className="mt-2 font-display text-[clamp(1.6rem,3.2vw,2.3rem)] leading-[1.1] tracking-tight text-ink">
            {block.text}
          </h2>
        </Block>
      );

    case "paragraph":
      return (
        <Block key={i}>
          <p className="text-[16px] leading-[1.8] text-ink/75">{block.text}</p>
        </Block>
      );

    case "stats":
      return (
        <Block key={i}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {block.items.map((s) => (
              <div
                key={s.label}
                className={`rounded-[24px] p-6 ${TONE_SOFT[s.tone ?? "sage"]}`}
              >
                <div className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-none tracking-tight text-ink">
                  {s.value}
                </div>
                <div className="mt-2 text-[13px] leading-[1.4] text-ink/60">{s.label}</div>
              </div>
            ))}
          </div>
        </Block>
      );

    case "bars":
      return (
        <Block key={i}>
          <Bars block={block} />
        </Block>
      );

    case "donut":
      return (
        <Block key={i}>
          <Donut block={block} />
        </Block>
      );

    case "quote":
      return (
        <Block key={i}>
          <figure className="border-l-2 border-sage pl-6">
            <blockquote className="font-display text-[clamp(1.5rem,3vw,2.1rem)] italic leading-[1.3] tracking-tight text-ink">
              “{block.text}”
            </blockquote>
            {block.cite && <figcaption className="mt-3 text-[13px] text-ink/55">— {block.cite}</figcaption>}
          </figure>
        </Block>
      );

    case "callout":
      return (
        <Block key={i}>
          <div className={`rounded-[28px] p-7 sm:p-8 ${TONE_SOFT[block.tone ?? "sage"]}`}>
            <h3 className="font-display text-[22px] leading-tight tracking-tight text-ink">
              {block.title}
            </h3>
            <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.7] text-ink/75">{block.text}</p>
          </div>
        </Block>
      );

    case "list":
      return (
        <Block key={i}>
          {block.title && <Eyebrow>{block.title}</Eyebrow>}
          <ul className="mt-4 space-y-3">
            {block.items.map((it) => (
              <li key={it} className="flex gap-3 text-[15px] leading-[1.6] text-ink/75">
                <span className="mt-1 text-sage">→</span>
                {it}
              </li>
            ))}
          </ul>
        </Block>
      );

    case "steps":
      return (
        <Block key={i}>
          {block.title && (
            <h3 className="mb-5 font-display text-[22px] leading-tight tracking-tight text-ink">
              {block.title}
            </h3>
          )}
          <div className="space-y-3">
            {block.items.map((step, n) => (
              <div key={step.title} className="flex gap-4 rounded-[24px] bg-card p-5 ring-1 ring-black/5 sm:p-6">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-[14px] font-semibold text-white">
                  {n + 1}
                </span>
                <div>
                  <h4 className="text-[16px] font-semibold tracking-tight text-ink">{step.title}</h4>
                  <p className="mt-1.5 text-[14px] leading-[1.6] text-ink/65">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Block>
      );

    case "image":
      return (
        <Block key={i}>
          <figure className="overflow-hidden rounded-[28px]">
            <img src={block.src} alt={block.caption ?? ""} loading="lazy" className="w-full object-cover" />
            {block.caption && (
              <figcaption className="mt-3 text-[12px] text-ink/45">{block.caption}</figcaption>
            )}
          </figure>
        </Block>
      );

    case "gallery":
      return (
        <Block key={i}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {block.images.map((img) => (
              <figure key={img.src} className="flex flex-col">
                <div className="overflow-hidden rounded-[20px] ring-1 ring-black/5">
                  <img
                    src={img.src}
                    alt={img.caption ?? ""}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {img.caption && (
                  <figcaption className="mt-2.5 text-[12px] leading-[1.45] text-ink/50">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Block>
      );

    case "persona":
      return (
        <Block key={i}>
          <Persona block={block} />
        </Block>
      );

    case "takeaways":
      return (
        <Block key={i}>
          <div className="rounded-[28px] bg-ink p-7 text-white sm:p-9">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
              Key takeaways
            </p>
            <ol className="mt-5 space-y-4">
              {block.items.map((t, n) => (
                <li key={t} className="flex gap-4">
                  <span className="font-display text-[20px] leading-none text-sage">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-[1.6] text-white/85">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </Block>
      );
  }
}

export function VaultContent({ blocks }: { blocks: VaultBlock[] }) {
  return <div className="space-y-10">{blocks.map((b, i) => renderBlock(b, i))}</div>;
}
