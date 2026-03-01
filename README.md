# Infanti Studio — Animation Portfolio

[![Astro](https://img.shields.io/badge/Astro-5-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-100%2F100-00B140?logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)

Portfolio website for **Infanti Studio** — the stop-motion animation practice of Louise and Margot Infanti, two Belgian sisters whose work spans film, installation, and exhibitions.

Built for speed, clarity, and craft: bilingual (FR/EN), zero JavaScript framework, Lighthouse 100 across the board. The site is as considered as the work it presents.

---

## Stack

- **[Astro 5](https://astro.build)** — primary framework, SSR rendering
- **[@astrojs/vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/)** — SSR adapter
- **TypeScript** — static typing
- **Vanilla CSS** — no UI framework, no client-side JS dependencies
- **Vercel** — hosting and continuous deployment

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
infanti-animation/
├── public/
│   ├── fonts/          # Self-hosted fonts
│   ├── hero/           # Hero video and poster
│   ├── images/         # Works and exhibition images
│   └── videos/         # Work videos
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Works.astro
│   │   ├── WorkCard.astro
│   │   ├── Exhibitions.astro
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   ├── Header.astro
│   │   ├── LanguageToggle.astro
│   │   └── VideoModal.astro
│   ├── content/
│   │   ├── fr.json     # French content
│   │   └── en.json     # English content
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro         # FR route (default)
│   │   └── en/
│   │       └── index.astro     # EN route
│   └── styles/
├── astro.config.mjs
└── tsconfig.json
```

---

## Internationalisation

The site is available in two languages:

| Language | URL | Status |
|----------|-----|--------|
| French | `/` | Default locale |
| English | `/en` | Secondary |

Content is managed via two separate JSON files in `src/content/`. Language switching is handled by the `LanguageToggle` component in the `Header`.

The i18n configuration in `astro.config.mjs` disables the language prefix for the FR locale (`prefixDefaultLocale: false`), so French is served at the root without any redirect.

---

## Performance

Current Lighthouse scores:

| Category | FR | EN |
|----------|----|----|
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Core Web Vitals:

| Metric | FR | EN |
|--------|----|----|
| FCP | 297ms | 210ms |
| LCP | 392ms | 370ms |
| TBT | 0ms | 0ms |
| CLS | 0 | 0 |

Techniques applied:

- **Hero video**: poster-first, deferred autoplay via `requestIdleCallback`, WebM-only (no MP4 fallback)
- **Fonts**: self-hosted woff2 with `font-display: swap`, preloaded critical subsets — no third-party requests
- **No framework JS**: zero client-side hydration, minimal JS bundle
- **Caching**: immutable `Cache-Control` headers for fonts, video, and static media via `vercel.json`

---

## Eco-design

Targeted optimizations to reduce page weight and eliminate unnecessary network requests.

| Audit | Score | Details |
|-------|-------|---------|
| [EcoIndex](https://www.ecoindex.fr/resultat/?id=fca44c0d-8044-4611-be7b-566d5c601c93) | **A** (83/100) | 0.88 Mo, 178 DOM elements, 13 requests |

| Optimization | Impact | Trade-off |
|-------------|--------|-----------|
| WebM-only video (no MP4 fallback) | −976KB page weight | No playback on Safari <16 (<1% of traffic) — poster image shown as fallback |
| Self-hosted fonts (no Google Fonts) | Eliminates render-blocking third-party chain | 8 woff2 files (~144KB) committed to repo |
| Hover video abort on mouseleave | Prevents wasted bandwidth on WorkCard previews | Slight reload delay on re-hover |
| Immutable cache headers | Instant repeat visits for static assets | Assets must be renamed (not overwritten) on update |

---

## Analytics

Visitor stats are collected via **[Umami Cloud](https://umami.is)** — a privacy-friendly, cookie-free analytics service. RGPD-compliant out of the box, lightweight (~2 KB script), no personal data collected. The tracking snippet is loaded in `Layout.astro`.

---

## Deployment

The project is deployed on **Vercel** via the official SSR adapter `@astrojs/vercel`.

```bash
# Production build
npm run build
```

Continuous deployment triggers automatically on every push to the main branch.
