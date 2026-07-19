const project1 = "/assets/project-1.jpg";
const project2 = "/assets/project-2.jpg";
const project3 = "/assets/project-3.jpg";
const project4 = "/assets/project-4.jpg";
const devDiaryImg = "/assets/dev-diary.jpg";
const researchImg = "/assets/research-vault.jpg";
const inline1 = "/assets/inline-1.jpg";
const inline2 = "/assets/inline-2.jpg";
const inline3 = "/assets/inline-3.jpg";
const inline4 = "/assets/inline-4.jpg";

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
    tags: ["Web App", "Analytics", "Startups"],
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
    tags: ["Web App", "Data & Insights", "Product Teams"],
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
    tags: ["Mobile App", "Coaching", "Founders"],
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
    tags: ["Templates", "Storytelling", "Pitch Decks"],
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
  category: string;
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
    category: "Process",
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
    category: "Craft",
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
    category: "Career",
    cover: inline3,
  },
];

export function getStory(slug: string) {
  return STORIES.find((s) => s.slug === slug);
}

/** Up to `n` other stories to suggest after reading one ("You may like"). */
export function relatedStories(slug: string, n = 2) {
  const others = STORIES.filter((s) => s.slug !== slug);
  // Rotate the start so different posts surface different neighbours.
  const start = Math.max(0, STORIES.findIndex((s) => s.slug === slug));
  const ordered = [...others.slice(start), ...others.slice(0, start)];
  return ordered.slice(0, n);
}

export type ToolFormat = "notion" | "figma" | "pdf" | "workshop";
export type ToolTone = "sage" | "butter" | "lavender";

export type Tool = {
  slug: string;
  name: string;
  kind: string;
  blurb: string;
  cover: string;
  category: string;
  format: ToolFormat;
  /** What you actually get inside the file. */
  includes: string[];
  /** Small factual descriptor — page count, boards, session length. */
  meta: string;
  tone: ToolTone;
  featured?: boolean;
};

export const TOOL_CATEGORIES = ["All", "Plan & run", "Design", "Write & publish", "Launch"] as const;

export const TOOLS: Tool[] = [
  {
    slug: "founder-os",
    name: "Founder OS",
    kind: "Notion template",
    blurb: "A weekly operating system for solo founders — plan the week, log decisions, and watch the numbers that actually matter.",
    cover: "/assets/book-notes.jpg",
    category: "Plan & run",
    format: "notion",
    includes: ["Weekly planning dashboard", "Decision log with context", "Metrics-that-matter board", "Energy budget tracker"],
    meta: "6 linked databases",
    tone: "sage",
    featured: true,
  },
  {
    slug: "design-review-kit",
    name: "Design Review Kit",
    kind: "Figma file",
    blurb: "Run gentle, useful design reviews in 30 min.",
    cover: project2,
    category: "Design",
    format: "figma",
    includes: ["Agenda board", "Feedback stickers", "Severity scale"],
    meta: "3 boards",
    tone: "lavender",
  },
  {
    slug: "launch-checklist",
    name: "Launch Checklist",
    kind: "PDF · Notion",
    blurb: "Every box I tick before pressing publish.",
    cover: project3,
    category: "Launch",
    format: "pdf",
    includes: ["Pre-launch QA sweep", "Announcement copy slots", "Day-one monitoring list"],
    meta: "47 checkpoints",
    tone: "butter",
  },
  {
    slug: "brand-voice-canvas",
    name: "Brand Voice Canvas",
    kind: "Workshop kit",
    blurb: "Find your brand voice in a single afternoon.",
    cover: project4,
    category: "Write & publish",
    format: "workshop",
    includes: ["Voice spectrum sliders", "Word bank builder", "Before/after rewrites"],
    meta: "90-min session",
    tone: "sage",
  },
  {
    slug: "content-calendar",
    name: "Content Calendar",
    kind: "Notion template",
    blurb: "A month of content planned in one honest sitting.",
    cover: inline1,
    category: "Write & publish",
    format: "notion",
    includes: ["Idea inbox", "Channel pipelines", "Repurposing map"],
    meta: "4 views",
    tone: "butter",
  },
  {
    slug: "user-interview-script",
    name: "User Interview Script",
    kind: "PDF guide",
    blurb: "Questions that get past polite answers.",
    cover: inline2,
    category: "Plan & run",
    format: "pdf",
    includes: ["Warm-up script", "Follow-up ladders", "Synthesis worksheet"],
    meta: "9 pages",
    tone: "lavender",
  },
  {
    slug: "case-study-skeleton",
    name: "Case Study Skeleton",
    kind: "Notion + Figma",
    blurb: "Tell the story of the work, not just the screens.",
    cover: inline4,
    category: "Design",
    format: "figma",
    includes: ["Narrative skeleton", "Before/after frames", "Metric callouts"],
    meta: "2 files",
    tone: "butter",
  },
  {
    slug: "pricing-page-worksheet",
    name: "Pricing Page Worksheet",
    kind: "PDF worksheet",
    blurb: "Find the leaks in your pricing page in an hour.",
    cover: inline3,
    category: "Launch",
    format: "pdf",
    includes: ["Teardown checklist", "Objection map", "Copy prompts"],
    meta: "6 pages",
    tone: "sage",
  },
];

export function getTool(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}

/** Nearby files for a tool detail page — same category first, then the rest. */
export function relatedTools(slug: string, n = 3) {
  const current = getTool(slug);
  const others = TOOLS.filter((t) => t.slug !== slug);
  if (!current) return others.slice(0, n);
  return [
    ...others.filter((t) => t.category === current.category),
    ...others.filter((t) => t.category !== current.category),
  ].slice(0, n);
}

/** A downloadable resource paired with a story — picked so each post points
 * to a different freebie. Links to that file's own page. */
export function storyResource(slug: string): Tool & { href: string } {
  const i = Math.max(0, STORIES.findIndex((s) => s.slug === slug));
  const tool = TOOLS[i % TOOLS.length];
  return { ...tool, href: `/resources/tools/${tool.slug}` };
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

/* ---------- The Product Lab ---------- */

export type VaultCategory =
  | "Product Thinking"
  | "Opportunity Finder"
  | "Product Teardowns";

export type LabPillar = {
  category: VaultCategory;
  /** The progression verb: Think → Find → Analyze. */
  verb: string;
  emoji: string;
  description: string;
  tagline: string;
  tone: "sage" | "butter" | "lavender";
};

/** The three drawers of the lab — each with its own icon and color accent. */
export const LAB_PILLARS: LabPillar[] = [
  {
    category: "Product Thinking",
    verb: "Think",
    emoji: "🧠",
    description:
      "Frameworks, mental models, product strategy, user psychology, prioritization, positioning, growth.",
    tagline: "How I think about building products.",
    tone: "sage",
  },
  {
    category: "Opportunity Finder",
    verb: "Find",
    emoji: "🔎",
    description:
      "Everyday frustrations, market gaps, customer pain points, startup ideas, unmet needs, and “someone should build this” moments.",
    tagline: "Where product ideas begin.",
    tone: "butter",
  },
  {
    category: "Product Teardowns",
    verb: "Analyze",
    emoji: "🔍",
    description:
      "Breaking down apps, onboarding, pricing, landing pages, retention loops, and marketing campaigns to understand what works and what doesn't.",
    tagline: "Learning from products already in the wild.",
    tone: "lavender",
  },
];

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

/** Filter labels shown as tabs, mapped to a pillar (or all). */
export const VAULT_FILTERS: { label: string; category: VaultCategory | "All" }[] = [
  { label: "All", category: "All" },
  { label: "Product Thinking", category: "Product Thinking" },
  { label: "Opportunity Finder", category: "Opportunity Finder" },
  { label: "Product Teardowns", category: "Product Teardowns" },
];

export const VAULT: VaultEntry[] = [
  {
    slug: "african-creator-economy-report-2026",
    title: "The African Creator Economy Report — what's really working in 2026",
    category: "Opportunity Finder",
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
    category: "Product Teardowns",
    readTime: "5 min read",
    access: "Free",
    tags: ["Fintech", "UX research"],
    summary:
      "A frame-by-frame look at how Paystack turns a nervous first-time user into a confident one — and the three moments that do the heavy lifting.",
  },
  {
    slug: "african-startup-funding-2026",
    title: "African startup funding — what the 2026 rebound means for founders",
    category: "Opportunity Finder",
    readTime: "4 min read",
    access: "Free",
    tags: ["Startups", "Africa"],
    summary:
      "After two slow years, the cheques are coming back. Here's where the money is moving, and what it quietly expects of you in return.",
  },
  {
    slug: "claude-ai-research-tool-teardown",
    title: "Claude AI as a research tool — a power user teardown",
    category: "Product Teardowns",
    readTime: "6 min read",
    access: "Free",
    tags: ["AI", "Research tools"],
    summary:
      "How I actually use Claude for product research — the prompts, the guardrails, and the places it still needs a human in the loop.",
  },
  {
    slug: "woman-who-builds-in-nigeria",
    title: "On being a woman who builds things in Nigeria",
    category: "Product Thinking",
    readTime: "4 min read",
    access: "Free",
    tags: ["Girl boss", "Founders"],
    summary:
      "A short, honest brief on the particular friction — and the particular advantage — of building software as a woman in Lagos.",
  },
  {
    slug: "are-african-founders-building-right",
    title: "Are African founders building the right things? A validation study",
    category: "Product Thinking",
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
    category: "Opportunity Finder",
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
