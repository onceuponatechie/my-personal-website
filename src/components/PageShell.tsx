"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background pt-6">
      <Navbar />
      <section className="px-4 pt-20 pb-16 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-[12px] uppercase tracking-[0.22em] text-ink/50"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-ink"
          >
            {title}
          </motion.h1>
          {intro && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="mx-auto mt-6 max-w-[52ch] text-[15px] leading-[1.65] text-ink/65"
            >
              {intro}
            </motion.p>
          )}
        </div>
      </section>
      <div className="px-4 pb-24 sm:px-6">{children}</div>
      <Footer />
    </main>
  );
}
