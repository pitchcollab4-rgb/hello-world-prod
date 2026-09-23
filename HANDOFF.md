# MintSEOPro — Project Handoff

Read this file first to continue work on this project in a new Claude Code session.

## 1. What this project is

**MintSEOPro** (formerly FitSEO) is a copy of [prepostseo.com](https://www.prepostseo.com/), a site with many free SEO and text tools, with a redesigned UI.
- Repo: `pitchcollab4-rgb/hello-world-prod` (originally built in `nayakqche/prepostseo_project`)
- Working branch: `claude/admiring-lamport-n22a9t`
- UI: dark "Mint SaaS template" look (near-black surfaces, lime `#c5f82a` accent, grid texture, olive hero glow)

## 2. Owner's standing instructions (follow these)

1. **Always give a PR link** after every change, so the owner can merge it directly from GitHub.
2. Develop on the working branch, commit, push, open a PR to `main`, and share the link.
3. If the last PR on the branch is already merged, restart the branch from the latest `main` before starting new work:
   `git fetch origin main && git checkout -B claude/admiring-lamport-n22a9t origin/main`
   and push with `--force-with-lease`.
4. The owner sometimes writes in Hindi or Hinglish ("kidhar paste karna h" means "where do I paste it?"). Give simple, step-by-step instructions.

## 3. History

| PR | Status | What it did |
|----|--------|-------------|
| #1 | Merged | Built the FitSEO platform: home page, 108 tools listed across 12 categories, and 12 working client-side tools |
| #2 | Merged | Added the Claude API integration: 12 AI tools went from "Coming Soon" to live |
| #3 | Merged | Added `HANDOFF.md` |
| — | hello-world-prod | Ported the project here and restyled everything with the Mint dark/lime theme: new hero with dashboard mockup, features bento, AI tools "plans" section, CTA and footer |

## 4. Tech stack

- **Next.js 16.3.0** (App Router) with React 19.2.8 and TypeScript
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **lucide-react** for icons
- **@anthropic-ai/sdk** (^0.116.0) for the AI tools
- ⚠️ `AGENTS.md`: this Next.js version has breaking changes. Read `node_modules/next/dist/docs/` before writing Next.js code.

## 5. Running it locally

```bash
git clone https://github.com/pitchcollab4-rgb/hello-world-prod.git
cd hello-world-prod
npm install
# Create .env.local in the project root with this line:
#   ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
npm run dev          # opens on http://localhost:3000
npm run build        # production build check
```
Get the API key from https://console.anthropic.com. The AI tools need it. The other tools work without it.

## 6. File structure

```
src/
├── app/
│   ├── layout.tsx, page.tsx, globals.css   # home page and theme tokens
│   ├── api/ai/route.ts                      # POST /api/ai, the only backend route (Claude)
│   └── tool/[id]/page.tsx                   # page for each tool; maps tool id → component
├── components/
│   ├── Header, Footer, Hero, PopularTools, StatsSection, ToolCard, ToolsSection, ApiSection
│   ├── Logo (LogoMark), SectionHeading (badge + title), DashboardPreview (hero mockup),
│   │   Features (bento cards), AiToolsSection (#ai-tools), CtaSection
│   └── tools/
│       ├── useAiTool.ts                     # shared hook: { result, loading, error, run, clear }
│       ├── (client-side tools) WordCounter, CaseConverter, LoremIpsum, JsonFormatter,
│       │   PasswordGenerator, MetaTagGenerator, ColorPicker, KeywordDensity, QrCodeGenerator,
│       │   Base64, SerpSimulator, ReadabilityChecker
│       └── (AI tools) Paraphrasing, AiContentDetector, TextSummarizer, ArticleRewriter,
│           AiEssayWriter, AiStoryGenerator, AiEmailWriter, AiCodeGenerator, AiChatbot,
│           AiTranslator, AiTitleGenerator, GrammarChecker
└── data/tools.ts                            # categories[] and tools[] (id, name, description,
                                             # category, icon, popular?, apiRequired?)
```

## 7. How tools are wired

- `src/data/tools.ts` defines every tool. The `icon` field is a lucide-react icon name, looked up dynamically with `(Icons as unknown as Record<string, ComponentType>)[tool.icon]`.
- `src/app/tool/[id]/page.tsx` has a `toolComponents` map from tool id to component. Any tool without an entry shows a **"Coming Soon"** placeholder, along with its `apiRequired` text.
- **To add a tool:** create `src/components/tools/XTool.tsx` (`"use client"`, default export), import it in `page.tsx`, and add it to `toolComponents`.

### AI backend (`src/app/api/ai/route.ts`)
- Request body: `{ tool, input, targetLanguage? }`. Response: `{ result }` or `{ error }`.
- Model: `claude-haiku-4-5` (the cheapest option), `max_tokens: 4096`.
- The `SYSTEM_PROMPTS` record holds one prompt per tool type: `paraphrase`, `ai-content-detector` (returns JSON `{score, verdict, analysis}`), `summarize`, `rewrite`, `essay`, `story`, `email`, `code`, `chat`, `translate`, `title-generator`, `grammar-check` (returns JSON `{corrected, errors[{original, correction, type}]}`).
- **To add an AI tool:** add a prompt to `SYSTEM_PROMPTS`, then in the component call `const { result, loading, error, run } = useAiTool("<type>")` and `run(text, extra?)`.

## 8. UI conventions (keep new tools consistent)

- The site is dark-only. Theme tokens (in globals.css): `bg-background` (#0a0a0a), `bg-surface` (#141414), `bg-surface-hover`, `border-border` (#262626), `text-primary` (lime #c5f82a), `text-muted`, `text-success`, `text-warning`, `text-danger`, `text-accent`, `gradient-bg` (lime gradient)
- Helper classes: `hero-glow` (olive radial glow), `grid-bg` (faint grid), `dot-bg`, `card-glow` (lime glow ring), `animate-marquee`
- **Text on lime backgrounds must be black** (`gradient-bg text-black`), never white. Secondary buttons use `bg-white text-black`.
- Textarea: `w-full h-48 p-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y`
- Primary button: `px-6 py-2.5 gradient-bg text-black font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50`
- Result card: `bg-background border border-border rounded-xl p-4`
- Error box: `p-4 bg-danger/10 border border-danger/20 rounded-xl text-sm text-danger`
- Option chips (selected): `bg-primary/10 border-primary text-primary`. Unselected: `border-border text-muted hover:border-primary/50`

## 9. Tool status

**Live (24):** word-counter, character-counter, sentence-counter, paragraph-counter, word-frequency-counter, syllable-counter (these 6 share WordCounterTool), case-converter, lorem-ipsum-generator, json-formatter, password-generator, meta-tag-generator, color-picker, keyword-density-checker, qr-code-generator, base64-encoder, serp-simulator, readability-checker, plus the 12 AI tools: paraphrasing-tool, ai-content-detector, text-summarizer, article-rewriter, ai-essay-writer, ai-story-generator, ai-email-writer, ai-code-generator, ai-chatbot, ai-translator, ai-title-generator, grammar-checker.

**Still "Coming Soon":** everything else in `tools.ts`. They fall into three groups:
- **Can be done client-side, no API needed:** robots-txt-generator, sitemap-generator, schema-markup-generator, htaccess-redirect-generator, reverse-text-generator, text-to-binary, html-to-text, url-encoder-decoder, uuid-generator, image-compressor, image-resizer, jpg-to-png, png-to-jpg, image-cropper, webp-converter, favicon-generator, unit-converter, age-calculator, bmi-calculator, percentage-calculator, timestamp-converter, csv-to-json, text-to-speech (Web Speech API), speech-to-text (Web Speech API)
- **Can be done with Claude:** keyword-suggestion-tool, long-tail-keyword-finder, related-keywords-finder, image-to-text (Claude vision), duplicate-content-checker (compare two texts)
- **Need a third-party API or server fetch:** plagiarism-checker (Copyscape), page-speed-checker and mobile-friendly-test (Google PageSpeed API, free), backlink, DA/PA and spam-score tools (Moz or Ahrefs), keyword CPC, competition and position (DataForSEO or SEMrush), whois, DNS, IP and domain tools (WHOIS/DNS APIs, or a server-side `dns` module), ssl, http-header, redirect and website-status checkers (server-side fetch route), website-screenshot-generator (screenshot API), google-index-checker, reverse-image-search, word-to-pdf and pdf-to-word

## 10. Suggested next steps

1. Build the client-side tools from the list above. They are quick wins with no cost.
2. Add Claude-based keyword tools and image-to-text.
3. Add server-side routes (`src/app/api/...`) for the SSL, headers, redirect, status and DNS checkers.
4. Consider rate limiting on `/api/ai` before deploying publicly, since it spends API credits.
5. Deploy on Vercel and set `ANTHROPIC_API_KEY` in the project's environment variables.

## 11. Hosting on Render

`render.yaml` in the repo root is a Render Blueprint: a Node web service that runs `npm ci && npm run build` and then `npm start`. `next start` reads Render's `PORT` variable and listens on 0.0.0.0.
1. Go to render.com, sign in with GitHub, and click **New → Blueprint**.
2. Pick this repo and the branch you want to deploy.
3. When it asks, paste your `ANTHROPIC_API_KEY`, then click **Apply**.
4. Every push to that branch redeploys the site. On the free plan the site sleeps after about 15 minutes idle, so the first visit afterwards is slow (around 30–60 seconds).
