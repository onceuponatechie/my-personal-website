/**
 * Editorial content for each Tools & Templates detail page.
 * Every file earns its own sections — a planning system explains how a week
 * runs on it, a script explains why polite answers lie — so no two pages
 * read like the same brochure.
 */

export type ToolSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type ToolContent = {
  /** One-line hook under the title. */
  tagline: string;
  sections: ToolSection[];
  /** Small line of reassurance beside the download button. */
  ctaNote: string;
};

const CONTENT: Record<string, ToolContent> = {
  "founder-os": {
    tagline: "Your week, your decisions, and the numbers that matter — one calm Notion home.",
    sections: [
      {
        heading: "What it is",
        body: "Founder OS is the operating system I actually run my weeks on — a linked set of Notion databases that turns the shapeless blur of founder work into a Monday-to-Friday rhythm. Plan the week, log the decisions you'll otherwise re-argue in three months, and watch a handful of numbers instead of forty.",
      },
      {
        heading: "Who it's for",
        body: "Solo founders and tiny teams who don't have an ops person — and don't want the productivity app graveyard either. If your week currently lives across sticky notes, a notes app, and vibes, this is the consolidation.",
      },
      {
        heading: "Inside the system",
        bullets: [
          "Weekly planning dashboard — the week on one screen",
          "Decision log with context — what you chose and why",
          "Metrics-that-matter board — a handful, not a haystack",
          "Energy budget tracker — because output follows energy",
        ],
      },
      {
        heading: "How a week runs on it",
        body: "Monday: pick three needle-movers on the dashboard. Midweek: log any decision bigger than lunch. Friday: ten minutes with the metrics board and the energy tracker, then close the week on purpose instead of letting it trail off. That's the whole ritual — six databases, zero ceremony.",
      },
    ],
    ctaNote: "Duplicate it into your Notion in one click.",
  },

  "design-review-kit": {
    tagline: "Gentle, useful design reviews in thirty minutes — stickers included.",
    sections: [
      {
        heading: "What it is",
        body: "A Figma file that gives design reviews a shape. Instead of a scroll-and-shrug session, you get an agenda board, feedback stickers with a shared vocabulary, and a severity scale that separates 'this breaks the flow' from 'I personally love teal.'",
      },
      {
        heading: "Built for",
        body: "Design leads running weekly crits, PMs who want to give useful feedback without stepping on craft, and any team whose reviews currently produce more feelings than decisions.",
      },
      {
        heading: "On the boards",
        bullets: [
          "Agenda board — what we're looking at and what kind of feedback is wanted",
          "Feedback stickers — praise, question, concern, blocker, each visually distinct",
          "Severity scale — so a nitpick can't dress up as a crisis",
        ],
      },
      {
        heading: "Run a review in 30 minutes",
        body: "Five minutes of silent looking, fifteen of stickered feedback, ten to sort by severity and assign owners. The kit holds the structure so the humans can hold the opinions.",
      },
    ],
    ctaNote: "Copy the Figma file to your drafts — free.",
  },

  "launch-checklist": {
    tagline: "Every box I tick before pressing publish, so nothing ships on adrenaline alone.",
    sections: [
      {
        heading: "Why this exists",
        body: "Every launch I've rushed has billed me later — the broken OG image, the form that only worked for me, the pricing typo screenshotted forever. This checklist is the paper trail of those lessons: 47 checkpoints that catch the embarrassing stuff while it's still cheap to fix.",
      },
      {
        heading: "Keep it close if…",
        body: "You ship things — products, sites, features, newsletters — and you've ever discovered a launch-day bug from a stranger's reply. Solo makers get the most from it, but teams use it as a shared pre-flight ritual.",
      },
      {
        heading: "The checkpoints, grouped",
        bullets: [
          "Pre-launch QA sweep — links, forms, states, devices",
          "Announcement copy slots — write it before you're tired",
          "Day-one monitoring list — what to watch after you press the button",
        ],
      },
      {
        heading: "When to run it",
        body: "Start the sweep 48 hours out, not launch morning. The last section runs after you ship — day-one monitoring is where quiet launches turn into good ones.",
      },
    ],
    ctaNote: "PDF to print, Notion version to duplicate — both included.",
  },

  "brand-voice-canvas": {
    tagline: "Find the voice your brand already has — in one honest afternoon.",
    sections: [
      {
        heading: "What it is",
        body: "A 90-minute workshop kit that pulls your brand's voice out of everyone's heads and onto one canvas. Not a 40-page brand book nobody opens — sliders, word banks, and rewrites you can hand to anyone who writes a sentence for you.",
      },
      {
        heading: "Bring your whole team",
        body: "It's built to run with founders, marketers, and that one engineer with strong opinions about copy. Three to eight people is the sweet spot; the exercises force the vague words ('friendly, but premium?') into concrete choices.",
      },
      {
        heading: "The exercises",
        bullets: [
          "Voice spectrum sliders — playful↔serious, plain↔lyrical, warm↔wry",
          "Word bank builder — the words you own, the words you ban",
          "Before/after rewrites — your real copy, re-said in your real voice",
        ],
      },
      {
        heading: "What you leave with",
        body: "One canvas that settles copy debates before they start. New writer, new agency, new AI prompt — hand them the canvas and the voice survives the handoff.",
      },
    ],
    ctaNote: "Facilitator notes included — no workshop experience needed.",
  },

  "content-calendar": {
    tagline: "A month of content planned in one honest sitting — then a system that keeps it honest.",
    sections: [
      {
        heading: "What it is",
        body: "A Notion calendar built around how content actually happens: ideas arrive at random, get made once, and should be reused shamelessly. It catches the ideas, pipelines them per channel, and maps every piece to its repurposed lives.",
      },
      {
        heading: "Made for",
        body: "Creators and small brands publishing across two or more channels who are tired of the Sunday-night scramble. If your 'calendar' is currently your drafts folder, start here.",
      },
      {
        heading: "The four views",
        bullets: [
          "Idea inbox — capture without committing",
          "Channel pipelines — each platform's queue at a glance",
          "Calendar — the month as it will actually publish",
          "Repurposing map — one idea, five formats, zero guilt",
        ],
      },
      {
        heading: "A month in one sitting",
        body: "Block two hours. Dump every idea into the inbox, promote the twelve best into pipelines, drag them onto dates, and let the repurposing map multiply them. You'll leave with a month planned and — more useful — a system that makes next month faster.",
      },
    ],
    ctaNote: "Duplicate to Notion; sample month included so it's never blank.",
  },

  "user-interview-script": {
    tagline: "Questions that get past polite answers — because users lie nicely.",
    sections: [
      {
        heading: "Why polite answers lie",
        body: "Ask someone if they'd use your product and they'll say yes, because they're kind and you're standing right there. This script is designed around that problem: it asks about past behaviour instead of future intentions, and digs where the real answers live.",
      },
      {
        heading: "Who it helps",
        body: "Founders doing discovery, designers validating a flow, PMs who inherited 'talk to users' with no training. If your interviews keep confirming whatever you hoped, the questions are the problem — not the users.",
      },
      {
        heading: "Inside the script",
        bullets: [
          "Warm-up script — get someone comfortable in three minutes",
          "Follow-up ladders — the 'tell me more' chains that reach the truth",
          "Synthesis worksheet — turn five conversations into three decisions",
        ],
      },
      {
        heading: "How to use it",
        body: "Read it once before your first interview, then keep it beside you — it's a safety net, not a teleprompter. The synthesis worksheet is the part most people skip and the part that pays: fill it within an hour of each call, while the exact words are still warm.",
      },
    ],
    ctaNote: "Nine pages, free, no email required.",
  },

  "case-study-skeleton": {
    tagline: "Tell the story of the work — not just a scroll of screens.",
    sections: [
      {
        heading: "What it is",
        body: "A Notion + Figma pair that structures a case study as a narrative: the mess you walked into, the calls you made, what changed because of them. The screens still show up — they just stop pretending to be the plot.",
      },
      {
        heading: "For the designer who…",
        body: "…has shipped real work but freezes at 'write it up.' Portfolio-builders, job-hunters, and freelancers pitching with past work all use the same skeleton — only the tone shifts.",
      },
      {
        heading: "The skeleton",
        bullets: [
          "Narrative skeleton — context, tension, decisions, outcome",
          "Before/after frames — composed comparisons that make change visible",
          "Metric callouts — numbers styled to be read, not skimmed",
        ],
      },
      {
        heading: "Story first, screens second",
        body: "Hiring managers read forty portfolios a week; they remember decisions, not gradients. Leading with the story is what turns 'nice visuals' into 'this person thinks' — which is the actual hiring signal.",
      },
    ],
    ctaNote: "Two files — the structure in Notion, the frames in Figma.",
  },

  "pricing-page-worksheet": {
    tagline: "Find the leaks in your pricing page in about an hour.",
    sections: [
      {
        heading: "What it is",
        body: "A worksheet that walks your pricing page the way a skeptical stranger does — tier by tier, objection by objection — and marks where trust leaks out. Most pricing pages sell features; the worksheet pushes yours toward selling relief.",
      },
      {
        heading: "Who should print it",
        body: "SaaS founders watching visitors bounce at the pricing step, and marketers who suspect the page is underperforming but can't name why. No pricing-strategy background needed — the prompts do the asking.",
      },
      {
        heading: "The teardown, step by step",
        bullets: [
          "Teardown checklist — clarity, anchoring, and the choices your tiers imply",
          "Objection map — every hesitation, matched to the line that should answer it",
          "Copy prompts — rewrite the weak spots before the hour is up",
        ],
      },
      {
        heading: "What you'll walk away with",
        body: "A marked-up page, a short list of fixes ranked by likely impact, and copy that answers hesitations you didn't know your visitors had. Run it again after any pricing change — leaks regrow.",
      },
    ],
    ctaNote: "Six pages, printable — best done with a pen.",
  },
};

const FALLBACK: ToolContent = {
  tagline: "A working file from the shelf — download it, remix it, ship with it.",
  sections: [
    {
      heading: "What it is",
      body: "One of the working files I actually use — built for a real problem, sanded down until it was worth sharing.",
    },
  ],
  ctaNote: "Free, forever.",
};

export function getToolContent(slug: string): ToolContent {
  return CONTENT[slug] ?? FALLBACK;
}
