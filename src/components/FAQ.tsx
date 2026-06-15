"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/site-data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 pb-24 pt-12 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-ink"
        >
          Your questions, <span className="italic">answered</span>
        </motion.h2>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
          className="mt-12 space-y-4"
        >
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={f.q}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
                }}
                className="overflow-hidden rounded-full bg-card shadow-[0_6px_24px_-18px_rgba(0,0,0,0.15)] ring-1 ring-black/[0.04] data-[open=true]:rounded-[28px]"
                data-open={isOpen}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium text-ink">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-white"
                  >
                    <Plus className="size-4" strokeWidth={2.2} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                      <p className="px-7 pb-6 pr-20 text-[14px] leading-[1.65] text-ink/65">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-16 rounded-[36px] bg-ink px-8 py-14 text-center text-white"
        >
          <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight">
            Still have <span className="italic">questions?</span>
          </h3>
          <p className="mt-3 text-[14px] text-white/65">I'd love to hear from you. Let's chat!</p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-sage px-7 py-3.5 text-[14px] font-medium text-white shadow-sm transition hover:brightness-105"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
