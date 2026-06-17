/**
 * Rich, structured content for each Research Vault entry.
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

const profileImg = "/assets/profile.jpg";
const research = "/assets/research-vault.jpg";
const project1 = "/assets/project-1.jpg";
const project2 = "/assets/project-2.jpg";
const project3 = "/assets/project-3.jpg";

export const VAULT_CONTENT: Record<string, VaultBlock[]> = {
  "african-creator-economy-report-2026": [
    {
      kind: "lead",
      text: "6 in 10 African creators earn less than $100 a month. The ones earning more aren't more talented — they're playing a different game. This report breaks down what that game looks like.",
    },
    {
      kind: "stats",
      items: [
        { value: "1,240", label: "Creators surveyed", tone: "sage" },
        { value: "11", label: "Countries", tone: "lavender" },
        { value: "62%", label: "Earn under $100/mo", tone: "butter" },
      ],
    },
    {
      kind: "heading",
      eyebrow: "The income gap",
      text: "Most creators are stuck. A few have broken out.",
    },
    {
      kind: "paragraph",
      text: "When you plot monthly income across the sample, it isn't a smooth curve — it's a cliff. The vast majority cluster under $100, a thin middle hovers around $500, and a small top band clears $2,000. The interesting question isn't who's at the top. It's what changed for the people who climbed out of the bottom.",
    },
    {
      kind: "donut",
      title: "Monthly income distribution",
      caption: "Share of surveyed creators by monthly earnings band.",
      segments: [
        { label: "Under $100", value: 62, tone: "ink" },
        { label: "$100–$500", value: 24, tone: "butter" },
        { label: "$500–$2k", value: 10, tone: "sage" },
        { label: "Over $2k", value: 4, tone: "lavender" },
      ],
    },
    {
      kind: "heading",
      eyebrow: "What the earners do differently",
      text: "Three habits separate the top 14% from everyone else.",
    },
    {
      kind: "bars",
      title: "Adoption of growth habits, top earners vs. the rest",
      caption: "Percentage of each group that consistently does the thing.",
      items: [
        { label: "Sell their own product (not just ads)", value: 81, display: "81%", tone: "sage" },
        { label: "Email list over rented audience", value: 68, display: "68%", tone: "lavender" },
        { label: "Publish on a fixed schedule", value: 74, display: "74%", tone: "butter" },
        { label: "Reinvest earnings into tools", value: 57, display: "57%", tone: "ink" },
      ],
    },
    {
      kind: "persona",
      name: "Amara O.",
      role: "Newsletter creator · Lagos",
      image: profileImg,
      quote: "The month I stopped chasing virality and started selling a $9 template, everything changed.",
      meta: [
        { label: "Audience", value: "9,400" },
        { label: "Channel", value: "Email + IG" },
        { label: "Monthly", value: "$1,900" },
      ],
      bio: "Amara spent two years posting daily for reach that never paid. Her turnaround came from owning the relationship — a small email list and one paid product — rather than renting attention on a platform that could change the rules overnight.",
      traits: [
        { left: "Reach", right: "Depth", value: 72 },
        { left: "Free", right: "Paid", value: 80 },
        { left: "Trends", right: "System", value: 66 },
      ],
      goals: [
        "Own the audience relationship, not rent it",
        "One flagship product before ten small ones",
        "Predictable income over viral spikes",
      ],
    },
    {
      kind: "quote",
      text: "The creators who win in Africa aren't the loudest. They're the ones who turned 1,000 real fans into a business before they chased the next 100,000 strangers.",
    },
    {
      kind: "callout",
      title: "What to do with this",
      text: "If you're under $100/month, don't optimise your posting more. Pick one product your existing audience would pay for, and put it in front of the people who already trust you. Distribution you own beats reach you rent — every single time.",
      tone: "sage",
    },
    {
      kind: "takeaways",
      items: [
        "The income curve is a cliff, not a slope — the gap is structural, not about talent.",
        "Top earners sell products and own their audience; the rest rent reach and sell attention.",
        "Consistency compounds: a fixed schedule shows up in 74% of earners vs. a minority of the rest.",
        "Your first $1,000 comes from depth with 1,000 fans, not breadth with 100,000.",
      ],
    },
  ],

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

  "african-startup-funding-2026": [
    {
      kind: "lead",
      text: "After two slow years, the cheques are coming back — but they're landing in different places, and they expect more of founders than they did in 2021.",
    },
    {
      kind: "stats",
      items: [
        { value: "+34%", label: "YoY deal volume", tone: "sage" },
        { value: "$2.1B", label: "Deployed, H1 2026", tone: "lavender" },
        { value: "18mo", label: "Avg. runway expected", tone: "butter" },
      ],
    },
    {
      kind: "heading",
      eyebrow: "Where the money is moving",
      text: "Fintech still leads, but climate and AI tooling are the fast risers.",
    },
    {
      kind: "bars",
      title: "Share of H1 2026 funding by sector",
      caption: "Across tracked African startup rounds.",
      items: [
        { label: "Fintech", value: 38, display: "38%", tone: "sage" },
        { label: "Climate / energy", value: 21, display: "21%", tone: "butter" },
        { label: "AI tooling", value: 17, display: "17%", tone: "lavender" },
        { label: "Logistics", value: 13, display: "13%", tone: "ink" },
        { label: "Health", value: 11, display: "11%", tone: "sage" },
      ],
    },
    {
      kind: "paragraph",
      text: "The rebound is real but disciplined. Investors are writing cheques again, just with sharper questions: show me revenue, show me a path to default-alive, show me you can do more with less. The era of growth-at-all-costs financing isn't back — and it probably isn't coming back.",
    },
    {
      kind: "quote",
      text: "The money returned with a memory. It remembers 2022, and it's pricing discipline as a feature, not a constraint.",
    },
    {
      kind: "callout",
      title: "What it quietly expects of you",
      text: "Raise like the round is harder than it looks. Lead with traction, not vision; show 18 months of runway and a credible route to default-alive. The founders getting termsheets in 2026 are the ones who sound like they don't strictly need the money.",
      tone: "butter",
    },
    {
      kind: "takeaways",
      items: [
        "Funding is up ~34% YoY, but it's concentrated and disciplined, not exuberant.",
        "Fintech leads; climate and AI tooling are the fastest-rising sectors to watch.",
        "Investors price runway and revenue over narrative — default-alive is the new pitch.",
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

  "woman-who-builds-in-nigeria": [
    {
      kind: "lead",
      text: "A short, honest brief on the particular friction — and the particular advantage — of building software as a woman in Lagos.",
    },
    {
      kind: "image",
      src: research,
      caption: "Lagos, where the constraints are real and so is the resourcefulness they breed.",
    },
    {
      kind: "paragraph",
      text: "Some of the friction is exactly what you'd expect: being the only woman in the room, having your technical answer double-checked, the unspoken maths of who gets taken seriously. None of it is news. What's less talked about is the second, stranger thing — that the same constraints quietly compound into an edge.",
    },
    {
      kind: "quote",
      text: "You learn early to over-prepare, to ship proof instead of promises. That habit doesn't go away — it just turns into a moat.",
    },
    {
      kind: "heading",
      eyebrow: "The advantage nobody markets",
      text: "Building under constraint makes you legible to your users.",
    },
    {
      kind: "paragraph",
      text: "Building here means designing for unreliable power, expensive data, and a hundred small frictions a Valley founder never models. You build leaner because you have to — and lean, resilient products travel well. The constraint that looks like a disadvantage on a pitch deck is the thing that makes the work durable.",
    },
    {
      kind: "callout",
      title: "If this is you",
      text: "Keep the receipts. Ship the proof. The over-preparation that the room forces on you is the same discipline that makes great product people — let it become your signature, not your burden.",
      tone: "lavender",
    },
    {
      kind: "takeaways",
      items: [
        "The friction is real — and naming it plainly is more useful than pretending it isn't.",
        "Designing under constraint produces leaner, more resilient products that travel.",
        "Over-preparation, forced by the room, compounds into genuine craft over time.",
      ],
    },
  ],

  "are-african-founders-building-right": [
    {
      kind: "lead",
      text: "I interviewed 40 founders about how they decide what to build. Most are guessing — guessing well, but guessing. A few have a system. This report is that system.",
    },
    {
      kind: "stats",
      items: [
        { value: "40", label: "Founders interviewed", tone: "sage" },
        { value: "73%", label: "Validate after building", tone: "butter" },
        { value: "4", label: "Steps in the system", tone: "lavender" },
      ],
    },
    {
      kind: "donut",
      title: "How founders decide what to build next",
      caption: "Primary decision input, self-reported.",
      segments: [
        { label: "Gut / founder intuition", value: 45, tone: "ink" },
        { label: "Loudest customer request", value: 28, tone: "butter" },
        { label: "Structured validation", value: 18, tone: "sage" },
        { label: "Competitor moves", value: 9, tone: "lavender" },
      ],
    },
    {
      kind: "paragraph",
      text: "The gap between the founders who validate before building and the ones who validate after is the gap between two months saved and two months lost — repeated every quarter. The full report walks through the four-step system the validators use, with the exact questions they ask before a single line of code.",
    },
  ],

  "digital-product-income-study": [
    {
      kind: "lead",
      text: "Templates, courses, communities, briefs — a breakdown of what digital products actually earn, and the price points that quietly convert best.",
    },
    {
      kind: "stats",
      items: [
        { value: "$27", label: "Best-converting price", tone: "sage" },
        { value: "320", label: "Products analysed", tone: "lavender" },
        { value: "5x", label: "Spread, top vs. median", tone: "butter" },
      ],
    },
    {
      kind: "bars",
      title: "Median monthly revenue by product type",
      caption: "Across the products analysed (indexed).",
      items: [
        { label: "Cohort courses", value: 100, display: "Highest", tone: "sage" },
        { label: "Communities", value: 78, display: "High", tone: "lavender" },
        { label: "Templates", value: 54, display: "Mid", tone: "butter" },
        { label: "One-off guides", value: 31, display: "Low", tone: "ink" },
      ],
    },
    {
      kind: "paragraph",
      text: "The headline isn't the product type — it's the price architecture underneath it. The full report breaks down the price points that convert, the bundles that lift average order value, and the ladder that moves a $9 buyer to a $290 one.",
    },
  ],
};

export function getVaultContent(slug: string): VaultBlock[] {
  return VAULT_CONTENT[slug] ?? [];
}
