/**
 * Rich, structured content for each Product Lab entry.
 *
 * Instead of a wall of prose, every report is composed of typed "blocks" —
 * stat grids, charts, pull quotes, personas, galleries — so a reader can scan
 * the shape of the research the way they would a proper report deck.
 *
 * Blocks are intentionally presentation-agnostic; the renderer
 * (`vault-content.tsx`) decides how each one looks.
 */

export type Tone = "sage" | "butter" | "lavender" | "ink";

export type VaultBlock =
  /** Large opening sentence that sets the thesis. */
  | { kind: "lead"; text: string }
  /** Section header with a small eyebrow label. */
  | { kind: "heading"; eyebrow?: string; text: string }
  /** Body paragraph. */
  | { kind: "paragraph"; text: string }
  /** A row of headline numbers. */
  | { kind: "stats"; items: { value: string; label: string; tone?: Tone }[] }
  /** Horizontal bar chart. `value` is the raw number; bars scale to the max. */
  | {
      kind: "bars";
      title?: string;
      caption?: string;
      items: { label: string; value: number; display?: string; tone?: Tone }[];
    }
  /** Donut / ring chart. Segment values are summed to 100%. */
  | {
      kind: "donut";
      title?: string;
      caption?: string;
      segments: { label: string; value: number; tone: Tone }[];
    }
  /** Pull quote. */
  | { kind: "quote"; text: string; cite?: string }
  /** Coloured callout box — great for "the fix" / "what to do". */
  | { kind: "callout"; title: string; text: string; tone?: Tone }
  /** Bulleted list with arrow markers. */
  | { kind: "list"; title?: string; items: string[] }
  /** Numbered, step-by-step sequence. */
  | { kind: "steps"; title?: string; items: { title: string; text: string }[] }
  /** Single image with optional caption. */
  | { kind: "image"; src: string; caption?: string }
  /** Image gallery. */
  | { kind: "gallery"; images: { src: string; caption?: string }[] }
  /** A research persona card. */
  | {
      kind: "persona";
      name: string;
      role: string;
      image: string;
      quote?: string;
      meta: { label: string; value: string }[];
      bio: string;
      traits?: { left: string; right: string; value: number }[];
      goals?: string[];
    }
  /** Closing key takeaways. */
  | { kind: "takeaways"; items: string[] };

const project1 = "/assets/project-1.jpg";
const project2 = "/assets/project-2.jpg";
const project3 = "/assets/project-3.jpg";

export const VAULT_CONTENT: Record<string, VaultBlock[]> = {
  "paystack-onboarding-teardown": [
    {
      kind: "lead",
      text: "Paystack turns a nervous, first-time merchant into a confident one in under four minutes. This is a frame-by-frame look at how — and the three moments doing the heavy lifting.",
    },
    {
      kind: "stats",
      items: [
        { value: "3:48", label: "Median time to first key", tone: "sage" },
        { value: "5", label: "Screens to value", tone: "lavender" },
        { value: "0", label: "Forced fields before value", tone: "butter" },
      ],
    },
    {
      kind: "heading",
      eyebrow: "The flow",
      text: "Five screens, one promise kept early.",
    },
    {
      kind: "paragraph",
      text: "Most fintech onboarding front-loads friction — compliance, KYC, a dozen fields — before you see anything useful. Paystack flips it. You reach a working dashboard and a live test key before being asked for anything heavy. Trust is earned first, then requested.",
    },
    {
      kind: "gallery",
      images: [
        { src: project1, caption: "1 · Sign-up asks only for email — nothing else." },
        { src: project2, caption: "2 · Dashboard loads in test mode, fully explorable." },
        { src: project3, caption: "3 · Compliance is invited, not demanded, after first value." },
      ],
    },
    {
      kind: "steps",
      title: "The three moments that do the work",
      items: [
        {
          title: "Value before verification",
          text: "A live test key appears before any KYC. The product proves itself while the stakes are still zero.",
        },
        {
          title: "Progress made visible",
          text: "A quiet checklist shows what's done and what's left, so the merchant always knows they're moving forward.",
        },
        {
          title: "Compliance reframed as unlock",
          text: "KYC isn't a wall — it's 'go live'. The same form feels like a reward instead of a toll.",
        },
      ],
    },
    {
      kind: "bars",
      title: "Where comparable flows lose people",
      caption: "Estimated drop-off by stage across fintech onboarding (industry pattern).",
      items: [
        { label: "Account creation", value: 12, display: "12%", tone: "butter" },
        { label: "KYC / verification", value: 41, display: "41%", tone: "ink" },
        { label: "First integration", value: 23, display: "23%", tone: "lavender" },
        { label: "First live charge", value: 18, display: "18%", tone: "sage" },
      ],
    },
    {
      kind: "quote",
      text: "Good onboarding doesn't reduce the number of steps. It reorders them so trust is built before it's spent.",
    },
    {
      kind: "callout",
      title: "Steal this",
      text: "Find the one moment your product proves itself, and move it before every form you can. Let the user feel the value, then ask for the hard stuff — they'll give it freely once they believe.",
      tone: "lavender",
    },
    {
      kind: "takeaways",
      items: [
        "Deliver value before verification — a test key before KYC keeps the stakes at zero.",
        "Make progress visible; a lightweight checklist removes the fear of an endless form.",
        "Reframe compliance as an unlock, not a wall — same fields, opposite feeling.",
      ],
    },
  ],

  "claude-ai-research-tool-teardown": [
    {
      kind: "lead",
      text: "I use Claude for the unglamorous middle of product research — the synthesis, the pattern-finding, the second opinion. Here's the actual workflow, the guardrails, and where a human still has to stay in the loop.",
    },
    {
      kind: "stats",
      items: [
        { value: "~6h", label: "Saved per study", tone: "sage" },
        { value: "3", label: "Core use cases", tone: "lavender" },
        { value: "100%", label: "Claims I still verify", tone: "butter" },
      ],
    },
    {
      kind: "heading",
      eyebrow: "How I actually use it",
      text: "Three jobs, in order of how much I trust the output.",
    },
    {
      kind: "steps",
      title: "The workflow",
      items: [
        {
          title: "Synthesis",
          text: "Drop in raw interview notes and ask for themes with verbatim quotes attached. The quotes keep it honest and let me trace every claim.",
        },
        {
          title: "Devil's advocate",
          text: "Paste my own conclusion and ask it to argue the opposite. It's the cheapest way to find the hole in my thinking before a stakeholder does.",
        },
        {
          title: "Drafting",
          text: "First passes of summaries and briefs — never the final word, always a faster starting line than a blank page.",
        },
      ],
    },
    {
      kind: "bars",
      title: "Time spent on a research study — with vs. without",
      caption: "Self-tracked across recent studies (hours).",
      items: [
        { label: "Manual synthesis", value: 9, display: "9h", tone: "ink" },
        { label: "With Claude in the loop", value: 3, display: "3h", tone: "sage" },
      ],
    },
    {
      kind: "callout",
      title: "The guardrail that matters",
      text: "Treat it as a sharp junior researcher, not an oracle. It's brilliant at structure and terrible at knowing what it doesn't know — so every number, name, and quote gets checked against the source before it leaves my desk.",
      tone: "sage",
    },
    {
      kind: "quote",
      text: "The win isn't that it thinks for me. It's that it clears the busywork so I can spend my judgement where judgement actually matters.",
    },
    {
      kind: "takeaways",
      items: [
        "Best at synthesis, counter-arguments, and first drafts — worst at knowing its own limits.",
        "Always attach verbatim quotes to themes so every claim is traceable to a source.",
        "Verify every fact before it ships; the model is a junior researcher, not an oracle.",
      ],
    },
  ],
};

export function getVaultContent(slug: string): VaultBlock[] {
  return VAULT_CONTENT[slug] ?? [];
}
