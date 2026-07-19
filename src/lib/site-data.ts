const project1 = "/assets/project-1.jpg";
const project2 = "/assets/project-2.jpg";
const project3 = "/assets/project-3.jpg";
const project4 = "/assets/project-4.jpg";
const devDiaryImg = "/assets/dev-diary.jpg";
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

/* Product Thinking — compact mental models and frameworks, not articles.
   Each card is self-contained: the idea, and when to reach for it. */

export type ThinkingModel = {
  /** "Mental model" | "Framework" | "Principle" — shown as the card's chip. */
  tag: string;
  title: string;
  oneLiner: string;
  useWhen: string;
};

export const THINKING_MODELS: ThinkingModel[] = [
  {
    tag: "Principle",
    title: "Value before verification",
    oneLiner:
      "Let people feel the product working before you ask them for anything heavy — trust is earned first, then requested.",
    useWhen: "Designing onboarding, sign-up, or any flow that asks before it gives.",
  },
  {
    tag: "Mental model",
    title: "Own, don't rent",
    oneLiner:
      "An audience on someone else's platform is rented reach. An email list and a product you sell are owned distribution.",
    useWhen: "Choosing where growth effort goes — platforms change rules, lists don't.",
  },
  {
    tag: "Framework",
    title: "Depth before breadth",
    oneLiner:
      "Your first $1,000 comes from a thousand people who trust you, not a hundred thousand who scrolled past.",
    useWhen: "Deciding between making the audience bigger and serving it deeper.",
  },
  {
    tag: "Mental model",
    title: "Reorder, don't remove",
    oneLiner:
      "Good flows rarely have fewer steps — they sequence the same steps so trust is built before it's spent.",
    useWhen: "A funnel leaks and the obvious fix is deleting steps you actually need.",
  },
  {
    tag: "Principle",
    title: "Constraint is a moat",
    oneLiner:
      "Products built under real constraints — cost, power, patchy networks — come out leaner and travel further.",
    useWhen: "Tempted to treat limited resources as the reason the work can't be great.",
  },
  {
    tag: "Framework",
    title: "Default-alive first",
    oneLiner:
      "Lead with traction and runway, not vision. The strongest position in any negotiation is not needing the outcome.",
    useWhen: "Pitching investors, partners, or stakeholders in a disciplined market.",
  },
];

/* Opportunity Finder — a running log of gaps and "someone should build this"
   moments, each with the observed frustration and a signal-strength read. */

export type OpportunitySignal = "Early" | "Growing" | "Strong";

export type Opportunity = {
  title: string;
  /** The everyday frustration or pain point that surfaced it. */
  frustration: string;
  /** Why it stays unbuilt — the market gap. */
  gap: string;
  audience: string;
  signal: OpportunitySignal;
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    title: "Monetization rails for African creators",
    frustration:
      "Six in ten African creators earn under $100 a month — not for lack of audience, but for lack of simple ways to sell to it.",
    gap:
      "Storefront, payout, and pricing tools assume US cards and US price points; almost nothing is designed around local rails and local buying power.",
    audience: "Creators & solo builders",
    signal: "Strong",
  },
  {
    title: "Validation before the build",
    frustration:
      "Most founders validate after building — 73% of the ones I interviewed — because structured validation feels like a consultancy-sized job.",
    gap:
      "No lightweight tool walks a founder from hunch to evidence in a week, with the exact questions to ask before a single line of code.",
    audience: "Early-stage founders",
    signal: "Growing",
  },
  {
    title: "Pricing architecture for digital products",
    frustration:
      "Template and course sellers guess their price, then wonder why conversion dies at checkout.",
    gap:
      "The data on what converts — the ~$27 sweet spot, laddered bundles — exists, but no product turns it into a pricing page you can copy.",
    audience: "Digital product sellers",
    signal: "Growing",
  },
  {
    title: "Onboarding that respects slow networks",
    frustration:
      "Apps shipped for Lagos and Nairobi still assume fast, cheap, always-on data — and lose users at the first heavy screen.",
    gap:
      "A testing tool that previews flows under real local network conditions before launch, instead of after the drop-off shows up.",
    audience: "Teams shipping to emerging markets",
    signal: "Early",
  },
];

export const VAULT: VaultEntry[] = [
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
    slug: "claude-ai-research-tool-teardown",
    title: "Claude AI as a research tool — a power user teardown",
    category: "Product Teardowns",
    readTime: "6 min read",
    access: "Free",
    tags: ["AI", "Research tools"],
    summary:
      "How I actually use Claude for product research — the prompts, the guardrails, and the places it still needs a human in the loop.",
  },
];

export function getVaultEntry(slug: string) {
  return VAULT.find((v) => v.slug === slug);
}

/** Up to `n` other vault entries to suggest after reading one. */
export function relatedVault(slug: string, n = 2) {
  return VAULT.filter((v) => v.slug !== slug && !v.featured).slice(0, n);
}
