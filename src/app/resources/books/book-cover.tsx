"use client";

import type { Book } from "@/lib/site-data";

const accentColor: Record<Book["accent"], string> = {
  sage: "var(--sage)",
  lavender: "var(--lavender)",
  butter: "var(--butter)",
};

/**
 * A designed book "cover": the art, a legibility gradient, an accent wash,
 * a faux spine highlight, and the title typeset on top — so the shared stock
 * images read as real, individual covers on the shelf.
 */
export function BookCover({
  book,
  className = "",
  size = "sm",
}: {
  book: Book;
  className?: string;
  size?: "sm" | "lg";
}) {
  const titleCls =
    size === "lg"
      ? "font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.02]"
      : "font-display text-[15px] leading-[1.05]";

  return (
    <div
      className={`group/cover relative aspect-[2/3] w-full overflow-hidden rounded-[14px] shadow-[0_24px_50px_-22px_rgba(18,18,40,0.6)] ring-1 ring-black/10 ${className}`}
    >
      <img
        src={book.cover}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cover:scale-[1.06] group-active/cover:scale-[1.06]"
      />
      {/* legibility gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,12,26,0.05) 0%, rgba(10,12,26,0.32) 48%, rgba(10,12,26,0.88) 100%)",
        }}
      />
      {/* accent wash */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-soft-light transition-opacity duration-700 group-hover/cover:opacity-90 group-active/cover:opacity-90"
        style={{
          background: `radial-gradient(130% 80% at 18% 4%, ${accentColor[book.accent]} 0%, transparent 58%)`,
        }}
      />
      {/* faux spine */}
      <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-white/35 to-transparent" />
      <div className="absolute inset-y-0 left-[10px] w-px bg-white/25" />
      {/* sheen on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1.1s] ease-out group-hover/cover:translate-x-full group-active/cover:translate-x-full" />
      {/* typeset title */}
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <p className="text-[9px] uppercase tracking-[0.24em] text-white/70">{book.author}</p>
        <h4 className={`mt-1 text-white ${titleCls}`}>{book.title}</h4>
      </div>
    </div>
  );
}
