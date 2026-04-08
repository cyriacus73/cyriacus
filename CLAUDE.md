# CLAUDE.md — Personal Website of Cyriacus

This file is context for any AI agent (Claude Code, Cursor, Copilot, etc.) working on this codebase.
Read it fully before touching anything. It covers the owner, the aesthetic vision, the technical architecture, and the rules.

---

## Who This Is For

**Cyriacus** — 20-year-old Electrical & Electronics Engineering student, final year, Girne American University, TRNC.
GPA: 3.5, first-class honours.

He is not a typical developer building a portfolio to get a job. This website is a **public record of a mind in motion** — someone building toward something serious. The writing will be technical, philosophical, and personal in varying doses. The site must reflect that weight without performing it.

Background in brief:

- Research in TinyML (fixed-point neural networks), antenna array optimization (differential evolution), control theory (LQR, Kalman filtering).
- Co-founder of Rabbit Hole (graph-structured knowledge platform) and Yagi Media.
- Currently building **EKAM** — an AI-powered business intelligence platform for YouTube creators (Next.js 15, TypeScript, Supabase, Upstash Redis, Trigger.dev, Anthropic API). Think Palantir for your own business.
- Long-term vision: swarm robotics (centimetre-scale aerial platforms), deep-tech company building.
- Chess player (2100+ bullet on Lichess). Writes extensively in Obsidian. Reads across philosophy, history, strategy.
- Benchmarks himself against historical greatness — Alexander, Newton, Caesar. Not ironically.

**Do not build a generic developer portfolio for this person. That would be a failure.**

---

## The Aesthetic

**Sleek brutalism.** These two words are the entire brief. They are not in tension — they define each other here.

### What this means:

**Brutalism** in this context means:

- Structure is exposed, not hidden. The grid is visible or implied.
- Hard edges. No border-radius unless there's a reason.
- Typography does heavy lifting — layout is typographic first, decorative never.
- Nothing is there because it looks nice. Everything is there because it _is_ something.
- Raw but intentional. Industrial but controlled.

**Sleek** means the brutalism is not ugly or chaotic:

- Negative space is generous and deliberate.
- The palette is narrow and cold.
- Motion (if any) is slow, precise, not flashy.
- It feels like it was made by someone who knows exactly what they're doing.

### Palette

```
--bg:           #080808   /* near-black, not pure black */
--bg-surface:   #111111   /* slightly raised surface */
--bg-border:    #1e1e1e   /* subtle borders */
--text-primary: #e8e8e8   /* off-white, not blinding */
--text-muted:   #666666   /* secondary text */
--text-faint:   #333333   /* ghost text, labels */
--accent:       #c8a96e   /* dim amber — used sparingly */
--accent-cold:  #5a7a8a   /* cold slate blue — alternative accent */
```

The amber (`#c8a96e`) is the one warm note. It should feel earned. Use it for: article category tags, hover states on links, active nav indicators. Not for decorative elements.

### Typography

**Display / Headers:** `IBM Plex Mono` or `Departure Mono` — monospace, technical, slightly cold.
Headings should feel like terminal output or engineering notation, not editorial flair.

**Body / Articles:** `Spectral` (serif) or `Söhne` if available — something with weight and intelligence.
Long-form reading needs a proper reading font. Monospace body text in articles would be a mistake.

**Labels / UI:** `IBM Plex Mono` light weight — consistent with headers, but clearly functional.

**Scale:** Use a strict typographic scale. No arbitrary sizes.

```
xs:  0.75rem
sm:  0.875rem
base: 1rem
lg:  1.125rem
xl:  1.25rem
2xl: 1.5rem
3xl: 2rem
4xl: 3rem
5xl: 4.5rem
```

### Layout Principles

- Max content width: `720px` for article body, `1100px` for page layouts.
- No cards with rounded corners and drop shadows. If you need to separate content, use a `1px solid var(--bg-border)` border or raw whitespace.
- The nav should be minimal — name on the left, links on the right, full-width underline border at the bottom. No logo, no icon, no hamburger animation.
- Articles list: left-aligned, date on the left in `--text-faint`, title dominant, tag beneath in `--accent`. No card containers. Just rows.
- Hover states: a subtle shift to `--text-primary` from `--text-muted`, plus the amber underline. No background fills on hover.

### What to Avoid

- Gradient backgrounds or gradient text
- Glassmorphism, shadows with blur, soft glow effects
- Rounded corners on structural elements
- Animations that exist to impress rather than communicate
- Sans-serif body text in articles (it will feel clinical, not intelligent)
- Any colour that isn't in the palette above
- Section headers like "About Me" or "My Projects" — write real copy instead
- Hero sections with a large centred name and tagline — this is not a landing page

---

## Technical Architecture

### Stack

```
Framework:    Next.js 15 (App Router)
Language:     TypeScript (strict mode)
Styling:      Tailwind CSS v4 + CSS variables for the design system
Content:      MDX files in /content/articles/
MDX:          @next/mdx or next-mdx-remote (server components)
Deployment:   Vercel (auto-deploy on push to main)
```

### No database. No CMS. No backend.

Articles are MDX files. That's it. No Supabase, no Contentful, no Sanity. The filesystem is the CMS.

If this ever needs to change (comments, analytics, private drafts), revisit — but default to zero infra.

### Folder Structure

```
/app
  layout.tsx                  ← root layout, font loading, global styles
  page.tsx                    ← home / landing
  /articles
    page.tsx                  ← article index — list all posts
    /[slug]
      page.tsx                ← individual article renderer
/content
  /articles
    *.mdx                     ← all posts live here
/components
  /ui
    nav.tsx
    footer.tsx
    article-card.tsx
    tag.tsx
  /mdx
    callout.tsx               ← custom MDX components
    figure.tsx
    code-block.tsx
    math.tsx                  ← for equations (KaTeX or MathJax)
/lib
  articles.ts                 ← reads and parses MDX frontmatter
  types.ts
/styles
  globals.css                 ← CSS variables, base resets, typography
```

### MDX Frontmatter Schema

Every article should have this frontmatter:

```yaml
---
title: "Title of the Article"
date: "YYYY-MM-DD"
description: "One or two sentence summary. Used in the article list and meta tags."
tags: ["systems", "control-theory", "tinyml"]  # lowercase, kebab-case
status: "published" | "draft"
math: true | false   # whether to load KaTeX
---
```

### Article Features to Support

- **Code blocks** with syntax highlighting (Shiki or Highlight.js, dark theme)
- **Math** via KaTeX — inline `$...$` and block `$$...$$` — he will use equations
- **Callout blocks** — a custom `<Callout type="note|warning|insight">` component
- **Figures with captions** — `<Figure src="..." caption="...">`
- **Internal links** between articles
- **Reading time** estimate — calculate from word count, show in article header

### Performance

- Static generation for all articles (`generateStaticParams`)
- No client components unless absolutely necessary
- Fonts self-hosted or loaded via `next/font` — no FOUT
- Images via `next/image` with explicit dimensions

---

## Pages

### `/` — Home

Not a portfolio page. Not a hero with a big name.

A brief, direct introduction — 3–4 sentences, written in first person, matter-of-fact. Then a short list of what he's currently building/thinking about. Then a link to articles.

Something like:

> I'm Cyriacus. I study electrical engineering and build systems — embedded, distributed, occasionally political.
> This site is where I write about what I'm working through.

No profile photo required. If added later, it should be small, black and white, left-aligned. Never centred.

### `/articles` — Article Index

Clean list. Reverse chronological. Each row:

```
[date in faint grey]   [title in primary]
                       [tags in amber]   [reading time in muted]
```

No excerpts on the list page. The title and tags should be enough to decide whether to click.

Filter by tag should be possible eventually — a row of tag buttons at the top that filter the list client-side.

### `/articles/[slug]` — Article

- Header: title (large, monospace), date and reading time beneath in muted
- Body: article content — switch to serif here, comfortable line-length (65–75 chars)
- No sidebar. No table of contents for short pieces; optional sticky TOC for long pieces (>2000 words)
- Footer: next/previous article links, nothing else

---

## Tone and Voice — For Any Copy Written by an Agent

If you (the AI agent) are asked to write placeholder copy, headlines, or any text that will appear on the site, follow these rules:

- **Direct and declarative.** No hedging, no "exploring the intersection of X and Y."
- **Technical where appropriate, never performatively technical.** Don't use jargon to sound smart.
- **Short sentences preferred.** Especially in UI copy and navigation labels.
- **No motivational framing.** He is not "passionate about" anything. He builds things and thinks about things.
- **First person, active voice.** "I built" not "was built." "I'm working on" not "currently being developed."

Things to avoid in copy:

- "Hi, I'm Cyriacus and I love solving complex problems"
- "Welcome to my corner of the internet"
- Any mention of "journey" as a noun used to describe learning
- "Let's connect" as a CTA
- Exclamation marks

---

## What the Articles Will Cover

Expect writing in these areas:

- **Systems engineering** — embedded control, estimation theory, sensor fusion
- **TinyML / edge inference** — fixed-point arithmetic, quantization, MCU deployment
- **Robotics** — swarm coordination, aerial platforms, flight dynamics
- **Software systems** — distributed architecture, infra decisions on projects like EKAM
- **Mathematics** — Lagrangian/Hamiltonian mechanics, linear algebra, signals
- **Occasionally** — history, strategy, institutional design,

The writing will range from technical documentation style to reflective essays. The design system needs to handle both gracefully without the agent needing to make case-by-case layout decisions.

---

## Rules for the AI Agent

1. **Never break the palette.** If you're tempted to add a colour not in the design system, stop and ask why.
2. **Never add rounded corners to structural elements.** Buttons can have `2px` radius at most.
3. **No `Inter` as the body font.** Ever.
4. **Keep components small and composable.** Do not build monolithic page components.
5. **TypeScript strict.** No `any`. No `// @ts-ignore` without a comment explaining why.
6. **Article MDX files are not to be reformatted by the agent.** Only touch them if explicitly asked.
7. **When in doubt about layout, do less.** More whitespace, less decoration.
8. **The serif font in article bodies is non-negotiable.** Do not switch it to a sans-serif for "consistency."
9. **Math support must always be preserved.** Do not remove KaTeX dependencies.
10. **Every component gets a brief JSDoc comment** explaining what it does and what props it accepts.

---

## Status

This file will be updated as the site evolves. Check the git log for what's changed recently before making large structural decisions.

Last updated by owner: see git blame.
