"use client";

import { useEffect, useState } from "react";

/**
 * Butter-yellow circular frame containing two looping faces:
 *  1) a winking smiley, then it scrolls up
 *  2) revealing a waving hand, which then scrolls up
 *  loop forever.
 */
export function SmileyMark() {
  const [step, setStep] = useState(0); // 0 smile, 1 wink, 2 scroll-out, 3 wave settle, 4 wave, 5 scroll-out

  useEffect(() => {
    const seq = [
      { d: 1400, n: 1 }, // smile -> wink
      { d: 600, n: 2 },  // wink -> scroll
      { d: 800, n: 3 },  // scroll done, wave in
      { d: 1200, n: 4 }, // wave
      { d: 600, n: 5 },  // wave scroll out
      { d: 800, n: 0 },  // back to smile
    ];
    const t = setTimeout(() => setStep(seq[step].n), seq[step].d);
    return () => clearTimeout(t);
  }, [step]);

  // translation of the inner reel
  const reelY = step <= 1 ? 0 : step === 2 ? -100 : step <= 4 ? -100 : -200;

  return (
    <div className="relative size-14 overflow-hidden rounded-full bg-butter shadow-[0_8px_24px_-8px_oklch(0.88_0.13_92/0.55)]">
      <div
        className="absolute inset-0 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]"
        style={{ transform: `translateY(${reelY}%)` }}
      >
        {/* Face 1: smiley with wink */}
        <div className="h-full w-full shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 56 56" className="size-9">
            {/* left eye */}
            <circle cx="21" cy="24" r="2.4" fill="#1a1a1a" />
            {/* right eye / wink */}
            {step === 1 ? (
              <path d="M31 24 q3 0 6 0" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            ) : (
              <circle cx="35" cy="24" r="2.4" fill="#1a1a1a" />
            )}
            {/* smile */}
            <path d="M20 33 q8 7 16 0" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* Face 2: waving hand */}
        <div className="h-full w-full shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 56 56" className="size-9 origin-bottom" style={{
            animation: step === 4 ? "wave 0.7s ease-in-out infinite" : "none",
          }}>
            {/* palm */}
            <path
              d="M18 30 v-8 a2.4 2.4 0 0 1 4.8 0 v6 M22.8 28 v-12 a2.4 2.4 0 0 1 4.8 0 v12 M27.6 28 v-13 a2.4 2.4 0 0 1 4.8 0 v13 M32.4 28 v-10 a2.4 2.4 0 0 1 4.8 0 v12 c0 6 -3 12 -9 12 c-4 0 -7 -2 -9 -6 l-3 -6 a2.4 2.4 0 0 1 4.2 -2.4 l2 3"
              fill="#f4c873"
              stroke="#1a1a1a"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* spacer (third panel reused as smile loop) */}
        <div className="h-full w-full shrink-0" />
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(18deg); }
        }
      `}</style>
    </div>
  );
}
