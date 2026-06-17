const project1 = "/assets/project-1.jpg";
const project2 = "/assets/project-2.jpg";
const project3 = "/assets/project-3.jpg";
const project4 = "/assets/project-4.jpg";
const devDiaryImg = "/assets/dev-diary.jpg";
const researchImg = "/assets/research-vault.jpg";
const bookNotesImg = "/assets/book-notes.jpg";
const inline1 = "/assets/inline-1.jpg";
const inline2 = "/assets/inline-2.jpg";
const inline3 = "/assets/inline-3.jpg";

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  year: string;
  role: string;
  liveHref: string;
  outcomes: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "streamline-dashboard",
    title: "Streamline Dashboard",
    description:
      "A real-time analytics dashboard with AI-powered insights for growing startups.",
    longDescription:
      "Streamline is a calm command center for early-stage teams. We replaced six scattered tools with one quiet surface — metrics on the left, intent on the right — and trained a small AI model to surface what changed today and why it matters tomorrow.",
    tags: ["Supabase", "Canva", "Framer"],
    image: project1,
    year: "2026",
    role: "Product Design · Build",
    liveHref: "https://example.com",
    outcomes: ["38% faster decision loop", "6 tools → 1 surface", "Daily active retention up 2.4x"],
  },
  {
    slug: "insight-studio",
    title: "Insight Studio",
    description:
      "An analytics workspace built for product teams who move from data to decision in an afternoon.",
    longDescription:
      "Insight Studio turns event streams into stories. Designers and PMs ask plain-English questions and get a chart, a summary, and a draft of the experiment to run next — no SQL, no waiting on the data team.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    image: project2,
    year: "2025",
    role: "Design Engineering",
    liveHref: "https://example.com",
    outcomes: ["12 weeks to public beta", "1,200 invited users", "NPS 64 at launch"],
  },
  {
    slug: "pocket-coach",
    title: "Pocket Coach",
    description:
      "A mobile companion for new founders — gentle nudges, structured rituals, quiet space to think.",
    longDescription:
      "Pocket Coach is the friend who texts you the right question at the right time. Morning intentions, mid-week reviews, a Friday wind-down — all in a voice that feels like a sharp friend, not a productivity app.",
    tags: ["React Native", "Expo", "Stripe"],
    image: project3,
    year: "2025",
    role: "Founding Designer",
    liveHref: "https://example.com",
    outcomes: ["4.8★ avg rating", "62% week-4 retention", "Featured in App Store Today"],
  },
  {
    slug: "sage-deck",
    title: "Sage Deck",
    description:
      "A pitch deck system for storytellers — clean templates, brand-aware slides, a voice that lets the work speak.",
    longDescription:
      "Sage Deck is the deck system I always wanted. Type a one-line story, pick a tone, and out comes a brand-aware deck with the right pace — punchy openers, quiet middles, and a closer that lands.",
    tags: ["Figma", "Keynote", "Notion"],
    image: project4,
    year: "2024",
    role: "Design · Story",
    liveHref: "https://example.com",
    outcomes: ["3,400 decks shipped", "$2.1M raised by users", "Top 10 product on Peerlist"],
  },
];

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  read: string;
  cover: string;
};

export const STORIES: Story[] = [
  {
    slug: "raw-journal-of-my-product-process",
    title: "The raw journal of my product process",
    excerpt:
      "You'd want to know my product process, but I too want to find out as I write this.",
    body: "Most days, the process is small: an idea, a sketch, a quick chat with a user, a Loom for the team. The shape of it only becomes a process in hindsight. Here's the raw version — the dead ends, the half-built screens, and the rare afternoons where everything clicks.",
    date: "June 6, 2026",
    read: "4 min read",
    cover: devDiaryImg,
  },
  {
    slug: "designing-quiet-software",
    title: "Designing quiet software in a loud world",
    excerpt:
      "The best tools fade. They wait for your intent and disappear once you've used them.",
    body: "Quiet software is not minimal software. It's software that respects the room. It earns attention with a single, well-placed cue instead of demanding it with notifications, badges, and red dots. Here's how I think about restraint as a design value.",
    date: "May 22, 2026",
    read: "6 min read",
    cover: inline1,
  },
  {
    slug: "a-letter-to-junior-designers",
    title: "A letter to junior designers shipping their first feature",
    excerpt:
      "Your first feature will not be your best. That's the point.",
    body: "You will overthink the spacing. You will under-think the empty state. A senior will leave a comment that stings for an hour. Ship it anyway — your taste is built in the gap between the version you imagined and the version that went live.",
    date: "April 14, 2026",
    read: "5 min read",
    cover: inline3,
  },
];

export type Tool = {
  slug: string;
  name: string;
  kind: string;
  category: string;
  blurb: string;
  cover: string;
};

export const TOOLS: Tool[] = [
  { slug: "founder-os", name: "Founder OS", kind: "Notion template", category: "Notion systems", blurb: "A weekly operating system for solo founders.", cover: project1 },
  { slug: "sprint-planner", name: "Sprint Planner", kind: "Notion template", category: "Notion systems", blurb: "Plan a shaped, six-week bet without the ceremony.", cover: project4 },
  { slug: "design-review-kit", name: "Design Review Kit", kind: "Figma file", category: "Design files", blurb: "Run gentle, useful design reviews in 30 min.", cover: project2 },
  { slug: "brand-voice-canvas", name: "Brand Voice Canvas", kind: "Figma file", category: "Design files", blurb: "Find your brand voice in a single afternoon.", cover: project4 },
  { slug: "launch-checklist", name: "Launch Checklist", kind: "PDF · Notion", category: "Guides & checklists", blurb: "Every box I tick before pressing publish.", cover: project3 },
  { slug: "research-interview-guide", name: "Research Interview Guide", kind: "PDF", category: "Guides & checklists", blurb: "The questions that get honest answers from users.", cover: project1 },
];

export function toolsByCategory() {
  const groups: { category: string; tools: Tool[] }[] = [];
  for (const t of TOOLS) {
    let g = groups.find((x) => x.category === t.category);
    if (!g) {
      g = { category: t.category, tools: [] };
      groups.push(g);
    }
    g.tools.push(t);
  }
  return groups;
}

export type ResearchEntry = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  cover: string;
};

export const RESEARCH: ResearchEntry[] = [
  { slug: "patterns-of-trust", title: "Patterns of trust in onboarding", category: "UX research", summary: "Seven small moves that turn a stranger into a believer.", cover: researchImg },
  { slug: "why-pricing-pages-fail", title: "Why pricing pages fail (and a fix)", category: "Conversion", summary: "Most pricing pages sell features. They should sell relief.", cover: project2 },
  { slug: "calm-notifications", title: "Calm notifications: a field study", category: "Behaviour", summary: "What 14 days of opt-in notifications taught me about attention.", cover: project3 },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "What kind of work do you do?", a: "Product design, design engineering, and the in-between work of shipping calm software. I lead 0→1 builds, but I'm just as happy fixing a tired onboarding flow." },
  { q: "Are you available for freelance work?", a: "Yes — I take on 2-3 focused projects each quarter. Long sprints, clear scope, and weekly demos. If our calendars match, let's talk." },
  { q: "What tools do you use?", a: "Figma for thinking, Linear for shipping, Supabase for the boring parts, and Notion for everything else. The tool is rarely the answer." },
  { q: "Do you offer free resources?", a: "Plenty. Templates, audits, and a handful of small tools live in the Resources section. New things land most months." },
  { q: "Can I collaborate with you on content?", a: "If our taste lines up, yes. I write essays, do the occasional podcast, and ghostwrite for a small group of founders I respect." },
  { q: "How can I stay updated?", a: "Subscribe to the journal — one short letter a month, no fluff. You can also follow along on Twitter and LinkedIn." },
];

export const SOCIALS = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
];

export type Book = {
  slug: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  takeaway: string;
  note: string;
  cover: string;
};

export const BOOKS: Book[] = [
  {
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Behaviour",
    rating: 5,
    takeaway: "Systems beat goals. Identity beats motivation.",
    note: "The chapter on environment design alone is worth the price. I rewired three small rituals after reading and they still hold a year in.",
    cover: bookNotesImg,
  },
  {
    slug: "hooked",
    title: "Hooked",
    author: "Nir Eyal",
    category: "Product",
    rating: 4,
    takeaway: "Trigger, action, variable reward, investment — in that order.",
    note: "The model is tidy, the ethics chapter is necessary. Read with the Indistractable follow-up to keep yourself honest.",
    cover: inline2,
  },
  {
    slug: "the-lean-startup",
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Building",
    rating: 4,
    takeaway: "Measure what changes your next decision. Nothing else.",
    note: "A bit dated, still the best primer on build-measure-learn. The pivot taxonomy saved me two months on my last project.",
    cover: inline1,
  },
  {
    slug: "shape-up",
    title: "Shape Up",
    author: "Ryan Singer",
    category: "Process",
    rating: 5,
    takeaway: "Fixed time, variable scope. Bet on shaped work.",
    note: "Reads like a love letter to focus. Even if you don't adopt the full system, the appetite/scope language is a gift.",
    cover: inline3,
  },
  {
    slug: "the-mom-test",
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    category: "Research",
    rating: 5,
    takeaway: "Ask about their life, not your idea.",
    note: "I keep this on the desk. Every founder I share it with comes back two weeks later with cleaner interview notes.",
    cover: researchImg,
  },
  {
    slug: "show-your-work",
    title: "Show Your Work",
    author: "Austin Kleon",
    category: "Storytelling",
    rating: 4,
    takeaway: "Working in public is a compounding asset.",
    note: "Short, generous, and a kick in the pants for anyone hoarding drafts. Reread it whenever the journal goes quiet.",
    cover: devDiaryImg,
  },
];

/* ---------- Research Vault ---------- */

export type VaultCategory =
  | "Report"
  | "Case study"
  | "Insight brief"
  | "Trend watch"
  | "Teardown";

export type VaultEntry = {
  slug: string;
  title: string;
  category: VaultCategory;
  readTime: string;
  /** "Free", "Free download", etc. */
  access: string;
  tags: string[];
  summary: string;
  /** Email-gated download. */
  gated?: boolean;
  /** Flagship piece, surfaced at the top. */
  featured?: boolean;
};

/** Filter labels shown as tabs, mapped to a category (or all). */
export const VAULT_FILTERS: { label: string; category: VaultCategory | "All" }[] = [
  { label: "All", category: "All" },
  { label: "Reports", category: "Report" },
  { label: "Case studies", category: "Case study" },
  { label: "Insight briefs", category: "Insight brief" },
  { label: "Trend watches", category: "Trend watch" },
  { label: "Teardowns", category: "Teardown" },
];

export const VAULT: VaultEntry[] = [
  {
    slug: "african-creator-economy-report-2026",
    title: "The African Creator Economy Report — what's really working in 2026",
    category: "Report",
    readTime: "Flagship report · 2026",
    access: "Free download",
    tags: ["Creator economy", "Africa"],
    summary:
      "6 in 10 African creators earn less than $100/month. This report asks why — and what the ones earning more are actually doing differently.",
    featured: true,
  },
  {
    slug: "paystack-onboarding-teardown",
    title: "How Paystack onboards its users — a UX research teardown",
    category: "Case study",
    readTime: "5 min read",
    access: "Free",
    tags: ["Fintech", "UX research"],
    summary:
      "A frame-by-frame look at how Paystack turns a nervous first-time user into a confident one — and the three moments that do the heavy lifting.",
  },
  {
    slug: "african-startup-funding-2026",
    title: "African startup funding — what the 2026 rebound means for founders",
    category: "Trend watch",
    readTime: "4 min read",
    access: "Free",
    tags: ["Startups", "Africa"],
    summary:
      "After two slow years, the cheques are coming back. Here's where the money is moving, and what it quietly expects of you in return.",
  },
  {
    slug: "claude-ai-research-tool-teardown",
    title: "Claude AI as a research tool — a power user teardown",
    category: "Teardown",
    readTime: "6 min read",
    access: "Free",
    tags: ["AI", "Research tools"],
    summary:
      "How I actually use Claude for product research — the prompts, the guardrails, and the places it still needs a human in the loop.",
  },
  {
    slug: "woman-who-builds-in-nigeria",
    title: "On being a woman who builds things in Nigeria",
    category: "Insight brief",
    readTime: "4 min read",
    access: "Free",
    tags: ["Girl boss", "Founders"],
    summary:
      "A short, honest brief on the particular friction — and the particular advantage — of building software as a woman in Lagos.",
  },
  {
    slug: "are-african-founders-building-right",
    title: "Are African founders building the right things? A validation study",
    category: "Report",
    readTime: "12 min read",
    access: "Free download",
    tags: ["Startups", "Validation"],
    summary:
      "I interviewed 40 founders about how they decide what to build. Most are guessing well — but a few have a system. This is the system.",
    gated: true,
  },
  {
    slug: "digital-product-income-study",
    title: "Digital product income — who's earning, what they sell, how",
    category: "Report",
    readTime: "10 min read",
    access: "Free download",
    tags: ["Creator economy", "Income"],
    summary:
      "Templates, courses, communities, briefs — a breakdown of what digital products actually earn, and the price points that convert.",
    gated: true,
  },
];

export function getVaultEntry(slug: string) {
  return VAULT.find((v) => v.slug === slug);
}

/** Up to `n` other vault entries to suggest after reading one. */
export function relatedVault(slug: string, n = 2) {
  return VAULT.filter((v) => v.slug !== slug && !v.featured).slice(0, n);
}

/* ---------- Book Notes helpers ---------- */

export function getBook(slug: string) {
  return BOOKS.find((b) => b.slug === slug);
}

/** Other books, preferring the same category first. */
export function relatedBooks(slug: string, n = 3) {
  const current = getBook(slug);
  const others = BOOKS.filter((b) => b.slug !== slug);
  const sameCat = others.filter((b) => b.category === current?.category);
  const rest = others.filter((b) => b.category !== current?.category);
  return [...sameCat, ...rest].slice(0, n);
}

/** Books grouped by category, in first-seen order. */
export function booksByCategory() {
  const groups: { category: string; books: Book[] }[] = [];
  for (const b of BOOKS) {
    let g = groups.find((x) => x.category === b.category);
    if (!g) {
      g = { category: b.category, books: [] };
      groups.push(g);
    }
    g.books.push(b);
  }
  return groups;
}

/** A few things worth underlining per book — keeps each note structured, not a wall of text. */
export const BOOK_HIGHLIGHTS: Record<string, string[]> = {
  "atomic-habits": [
    "Design the environment, not the willpower.",
    "Habits are votes for the person you want to become.",
    "Make it obvious, attractive, easy, and satisfying.",
  ],
  hooked: [
    "Trigger → action → variable reward → investment.",
    "Variable rewards are what keep people coming back.",
    "Read the ethics chapter before you ship anything.",
  ],
  "the-lean-startup": [
    "Only measure what changes your next decision.",
    "Build → measure → learn, as fast as honesty allows.",
    "The pivot taxonomy is the practical core.",
  ],
  "shape-up": [
    "Fixed time, variable scope. Bet on shaped work.",
    "Appetite, not estimate, sets the boundary.",
    "Give teams the whole problem, not tickets.",
  ],
  "the-mom-test": [
    "Ask about their life, not your idea.",
    "Talk about specifics in the past, not hypotheticals.",
    "Compliments are noise; commitments are signal.",
  ],
  "show-your-work": [
    "Working in public compounds over time.",
    "Share the process, not just the polished result.",
    "Document, don't create — lower the bar to post.",
  ],
};
