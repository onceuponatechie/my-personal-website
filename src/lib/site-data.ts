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
const inline4 = "/assets/inline-4.jpg";
const profileImg = "/assets/profile.jpg";

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

export type Tool = {
  slug: string;
  name: string;
  kind: string;
  blurb: string;
  cover: string;
};

export const TOOLS: Tool[] = [
  { slug: "founder-os", name: "Founder OS", kind: "Notion template", blurb: "A weekly operating system for solo founders.", cover: project1 },
  { slug: "design-review-kit", name: "Design Review Kit", kind: "Figma file", blurb: "Run gentle, useful design reviews in 30 min.", cover: project2 },
  { slug: "launch-checklist", name: "Launch Checklist", kind: "PDF · Notion", blurb: "Every box I tick before pressing publish.", cover: project3 },
  { slug: "brand-voice-canvas", name: "Brand Voice Canvas", kind: "Workshop", blurb: "Find your brand voice in a single afternoon.", cover: project4 },
];

/** A downloadable resource paired with a story — picked so each post points
 * to a different freebie. Links to the Tools & Templates shelf. */
export function storyResource(slug: string): Tool & { href: string } {
  const i = Math.max(0, STORIES.findIndex((s) => s.slug === slug));
  const tool = TOOLS[i % TOOLS.length];
  return { ...tool, href: "/resources/tools" };
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

export type BookAccent = "sage" | "lavender" | "butter";

export type Book = {
  slug: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  year: string;
  /** Per-book accent used to theme its cover + detail page. */
  accent: BookAccent;
  takeaway: string;
  note: string;
  /** The handful of ideas worth stealing. */
  ideas: string[];
  /** One line worth remembering. */
  quote: string;
  /** Who should read it. */
  forWho: string;
  cover: string;
};

export const BOOKS: Book[] = [
  {
    slug: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Behaviour",
    rating: 5,
    year: "2018",
    accent: "sage",
    takeaway: "Systems beat goals. Identity beats motivation.",
    note: "The chapter on environment design alone is worth the price. I rewired three small rituals after reading and they still hold a year in. What stays with me isn't the tactics — it's the reframe: you don't change by deciding to, you change by becoming the kind of person the habit belongs to.",
    ideas: [
      "Make it obvious, easy, and satisfying — design the environment, not the willpower.",
      "Every action is a small vote for the person you're becoming.",
      "Aim for 1% better, not a dramatic overhaul you can't sustain.",
    ],
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    forWho: "Anyone trying to change a behaviour that motivation alone keeps failing to fix.",
    cover: bookNotesImg,
  },
  {
    slug: "hooked",
    title: "Hooked",
    author: "Nir Eyal",
    category: "Product",
    rating: 4,
    year: "2014",
    accent: "lavender",
    takeaway: "Trigger, action, variable reward, investment — in that order.",
    note: "The model is tidy, the ethics chapter is necessary. Read with the Indistractable follow-up to keep yourself honest. It's the clearest map I know for why some products quietly become a reflex — and a reminder that the same mechanics can be used kindly or cruelly.",
    ideas: [
      "The Hook: trigger → action → variable reward → investment, then loop.",
      "Variable rewards are the engine; predictability kills the pull.",
      "Stored value — data, content, followers — makes the next loop easier to start.",
    ],
    quote: "Habits are formed when the mind stops actively deliberating over the next action.",
    forWho: "Product builders who want engagement they can also defend ethically.",
    cover: inline2,
  },
  {
    slug: "the-lean-startup",
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Building",
    rating: 4,
    year: "2011",
    accent: "butter",
    takeaway: "Measure what changes your next decision. Nothing else.",
    note: "A bit dated, still the best primer on build-measure-learn. The pivot taxonomy saved me two months on my last project. Skim the war stories, sit with the loop — the discipline of validated learning is the part that actually transfers to your own work.",
    ideas: [
      "Build–measure–learn: optimise the whole loop, not any single step.",
      "Validated learning beats vanity metrics, every single time.",
      "A pivot is a change in strategy — not a failure of nerve.",
    ],
    quote: "The only way to win is to learn faster than anyone else.",
    forWho: "Founders shipping into uncertainty who keep mistaking motion for progress.",
    cover: inline1,
  },
  {
    slug: "shape-up",
    title: "Shape Up",
    author: "Ryan Singer",
    category: "Process",
    rating: 5,
    year: "2019",
    accent: "sage",
    takeaway: "Fixed time, variable scope. Bet on shaped work.",
    note: "Reads like a love letter to focus. Even if you don't adopt the full system, the appetite/scope language is a gift. It gave my team a shared vocabulary for saying \"this is a six-week bet, not a forever project\" — and that one sentence changed how we plan.",
    ideas: [
      "Fixed time, variable scope — bet six weeks, then ship what's shaped.",
      "Shape work at the right altitude: concrete enough to bet on, loose enough to design.",
      "Hand teams the problem and the appetite, not a spec to follow.",
    ],
    quote: "Set the appetite first, then design a solution to fit the time.",
    forWho: "Teams drowning in endless backlogs and sprints that never quite end.",
    cover: inline3,
  },
  {
    slug: "the-mom-test",
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    category: "Research",
    rating: 5,
    year: "2013",
    accent: "lavender",
    takeaway: "Ask about their life, not your idea.",
    note: "I keep this on the desk. Every founder I share it with comes back two weeks later with cleaner interview notes. It's barely a hundred pages and it quietly fixes the most expensive mistake in early research: asking questions that only ever return polite, useless yeses.",
    ideas: [
      "Talk about their life, not your idea — opinions are worthless, facts aren't.",
      "Ask about the past and the specific, never the hypothetical future.",
      "Commitment and advancement — not compliments — tell you it's real.",
    ],
    quote: "People will lie to you if they think it's what you want to hear.",
    forWho: "Anyone running customer interviews who keeps leaving the room falsely encouraged.",
    cover: researchImg,
  },
  {
    slug: "show-your-work",
    title: "Show Your Work",
    author: "Austin Kleon",
    category: "Storytelling",
    rating: 4,
    year: "2014",
    accent: "butter",
    takeaway: "Working in public is a compounding asset.",
    note: "Short, generous, and a kick in the pants for anyone hoarding drafts. Reread it whenever the journal goes quiet. The whole book is permission — to share the messy middle, to teach what you just learned, to let people find you through the trail you leave.",
    ideas: [
      "Document the process; share the scraps, not just the finished masterpiece.",
      "Working in public turns your work into a discoverable, compounding asset.",
      "Give credit and stay generous — a network grows by what you give away.",
    ],
    quote: "Share something small every day.",
    forWho: "Makers hoarding drafts who'd grow far faster building in the open.",
    cover: devDiaryImg,
  },
  {
    slug: "never-split-the-difference",
    title: "Never Split the Difference",
    author: "Chris Voss",
    category: "Communication",
    rating: 5,
    year: "2016",
    accent: "lavender",
    takeaway: "Negotiation is calibrated listening, not clever arguing.",
    note: "A hostage negotiator's playbook that works on roadmaps, salaries, and stubborn stakeholders. I started mirroring and labelling in user calls and the conversations cracked open. The trick isn't winning — it's making the other person feel heard enough to tell you the truth.",
    ideas: [
      "Mirror the last three words — silence does the rest of the work.",
      "Label the emotion in the room before it labels you.",
      "\"No\" is the start of the deal, not the end of it.",
    ],
    quote: "He who has learned to disagree without being disagreeable has discovered the most valuable secret.",
    forWho: "Builders who negotiate scope, pay, and priorities and keep leaving value on the table.",
    cover: inline4,
  },
  {
    slug: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Process",
    rating: 4,
    year: "2016",
    accent: "sage",
    takeaway: "Concentration is a skill you train, not a mood you wait for.",
    note: "The case for treating focus as the rare currency it is. I time-blocked one project end-to-end after reading and shipped it in half the calendar time. The shutdown ritual sounds silly until you try it and notice your evenings come back.",
    ideas: [
      "Schedule deep blocks like meetings you can't move.",
      "Embrace boredom — willpower leaks when you reach for the phone.",
      "Measure the day in hours of real focus, not hours online.",
    ],
    quote: "Clarity about what matters provides clarity about what does not.",
    forWho: "Makers whose best work keeps losing to a busy, fragmented day.",
    cover: project2,
  },
  {
    slug: "thinking-fast-and-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Behaviour",
    rating: 5,
    year: "2011",
    accent: "butter",
    takeaway: "Two systems run your mind — design for the lazy one.",
    note: "The source code for most of behavioural design. Dense, but worth it. Once you can name anchoring and loss aversion, you start seeing them in every pricing page and onboarding flow you build — and you stop falling for them yourself.",
    ideas: [
      "System 1 is fast and wrong often; System 2 is slow and lazy.",
      "What you see is all there is — we judge on the visible, not the true.",
      "Anchors quietly set the range before anyone reasons.",
    ],
    quote: "Nothing in life is as important as you think it is while you are thinking about it.",
    forWho: "Product people who want to understand the irrational user — and themselves.",
    cover: project3,
  },
  {
    slug: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Building",
    rating: 4,
    year: "2014",
    accent: "sage",
    takeaway: "Build something new, not a slightly better copy.",
    note: "Contrarian, occasionally smug, often right. The \"what important truth do few people agree with you on\" prompt reshaped a project of mine. Skip the politics, keep the lens: real progress is going from zero to one, not one to many.",
    ideas: [
      "Competition is for losers — aim for a monopoly of usefulness.",
      "Start with a small market you can actually dominate.",
      "A great answer to \"what does nobody agree with you on?\" is your edge.",
    ],
    quote: "The most contrarian thing of all is not to oppose the crowd but to think for yourself.",
    forWho: "Founders tempted to build the tenth version of something that already exists.",
    cover: project4,
  },
  {
    slug: "made-to-stick",
    title: "Made to Stick",
    author: "Chip & Dan Heath",
    category: "Storytelling",
    rating: 4,
    year: "2007",
    accent: "butter",
    takeaway: "Ideas survive when they're simple, concrete, and unexpected.",
    note: "The clearest framework I know for why some pitches stick and others evaporate. I ran a flat product description through SUCCESs and it finally landed in a single line. Concreteness is the lever most builders ignore.",
    ideas: [
      "SUCCESs: Simple, Unexpected, Concrete, Credible, Emotional, Stories.",
      "Beat the Curse of Knowledge — you forgot what it's like not to know.",
      "One concrete image beats ten abstract adjectives.",
    ],
    quote: "If you say three things, you don't say anything.",
    forWho: "Builders whose product is great but whose explanation keeps falling flat.",
    cover: inline3,
  },
  {
    slug: "mere-christianity",
    title: "Mere Christianity",
    author: "C.S. Lewis",
    category: "Faith",
    rating: 5,
    year: "1952",
    accent: "lavender",
    takeaway: "Conviction, reasoned patiently, outlasts the loudest argument.",
    note: "Whatever you believe, it's a masterclass in arguing gently and thinking in first principles. I keep it on the shelf as much for the rhetoric as the faith — Lewis builds a case brick by honest brick, never bullying the reader to the conclusion.",
    ideas: [
      "Start from what everyone already half-knows, then build carefully.",
      "Integrity is what you do when no roadmap is watching.",
      "Humility isn't thinking less of yourself — it's thinking of yourself less.",
    ],
    quote: "Integrity is doing the right thing, even when no one is watching.",
    forWho: "Builders who want their work anchored to something steadier than the next launch.",
    cover: profileImg,
  },
];

export function getBook(slug: string) {
  return BOOKS.find((b) => b.slug === slug);
}

/** Up to `n` other books — same category first, then fill from the shelf. */
export function relatedBooks(slug: string, n = 3) {
  const current = BOOKS.find((b) => b.slug === slug);
  const others = BOOKS.filter((b) => b.slug !== slug);
  const sameCat = current ? others.filter((b) => b.category === current.category) : [];
  const rest = others.filter((b) => !sameCat.includes(b));
  return [...sameCat, ...rest].slice(0, n);
}

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
