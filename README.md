# Once Upon a Techie — Personal Website

Personal website for Essy Udeme — creator, builder, and storyteller. Built with
Next.js (App Router), TypeScript, Tailwind CSS v4, and framer-motion.

Originally designed in Figma and prototyped in Lovable, then rebuilt from scratch
in Next.js for full control over performance, SEO, and conversion.

## Tech stack

- **Framework:** Next.js (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-based `@theme`, OKLCH design tokens)
- **Animation:** framer-motion
- **Icons:** lucide-react
- **Fonts:** Inter (sans) + Instrument Serif (display) via `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  app/              # App Router routes (each page = server component + client view)
    page.tsx        # Home
    about/ contact/ projects/ stories/ resources/
  components/        # Section + shared UI components
  lib/site-data.ts   # Content layer (projects, stories, books, tools, research, FAQs)
  hooks/             # Reusable hooks
public/assets/       # Images
```

## Pages

Home · About · Contact · Projects (+ case-study detail) · Stories (+ detail) ·
Resources (Book Hub · Tools & Templates · Research Vault)
