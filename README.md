# Infanti Studio — Animation Portfolio

[![Astro](https://img.shields.io/badge/Astro-5-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

Portfolio website for **Infanti Studio** — the stop-motion animation practice of Louise and Margot Infanti, two Belgian sisters whose work spans film, installation, and exhibitions.

Built for speed, clarity, and craft: bilingual (FR/EN), zero JavaScript framework, high Lighthouse scores across the board. The site is as considered as the work it presents.

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

```text
infanti-animation/
├── public/
│   ├── fonts/          # Self-hosted fonts
│   ├── hero/           # Hero video and poster
│   ├── images/         # Works and exhibition images
│   └── videos/         # Work videos
├── scripts/
│   ├── download-reel.sh       # Download an Instagram reel → mp4/webm/thumbnail + works.ts snippet
│   └── fetch-latest-reels.sh  # Compare Instagram profile against works.ts to find new reels
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Works.astro          # Homepage featured works section
│   │   ├── WorkCard.astro
│   │   ├── WorksPage.astro      # Shared component for /works and /en/works gallery pages
│   │   ├── WorkDetail.astro     # Shared component for per-work detail pages (VideoObject + breadcrumb schema)
│   │   ├── MethodologyPage.astro # Shared component for the FR/EN methodology pages
│   │   ├── BackLink.astro       # Shared back-navigation link (icon + localized label)
│   │   ├── Exhibitions.astro
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   ├── Header.astro
│   │   ├── LanguageToggle.astro
│   │   └── VideoModal.astro
│   ├── assets/
│   │   └── images/     # Imported via astro:assets, optimized to AVIF at build
│   ├── content/
│   │   ├── fr.json     # French content
│   │   └── en.json     # English content
│   ├── data/
│   │   └── works.ts    # Static works catalogue
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro         # FR homepage
│   │   ├── works/
│   │   │   ├── index.astro     # FR full gallery
│   │   │   └── [slug].astro    # FR per-work detail page
│   │   ├── methodologie/
│   │   │   └── index.astro     # FR methodology page
│   │   └── en/
│   │       ├── index.astro     # EN homepage
│   │       ├── works/
│   │       │   ├── index.astro # EN full gallery
│   │       │   └── [slug].astro # EN per-work detail page
│   │       └── methodology/
│   │           └── index.astro # EN methodology page
│   └── styles/
├── astro.config.mjs
└── tsconfig.json
```

---

## Internationalisation

The site is available in two languages:

| Language | URL      | Status         |
|----------|----------|----------------|
| French   | `/`      | Default locale |
| English  | `/en`    | Secondary      |

Content is managed via two separate JSON files in `src/content/`. Language switching is handled by the `LanguageToggle` component in the `Header`.

The i18n configuration in `astro.config.mjs` disables the language prefix for the FR locale (`prefixDefaultLocale: false`), so French is served at the root without any redirect.

Slugs may differ between locales — the methodology page is `/methodologie` in FR but `/en/methodology` in EN. `Layout.astro` normally derives `hreflang` by assuming both locales share a slug, so pages whose slugs diverge must pass `altPathFr` and `altPathEn` explicitly.

---

## Content Management

### Works catalogue

Works are defined in `src/data/works.ts`. Each entry carries a `featured` boolean:

- `featured: true` — displayed on the homepage (currently three works)
- `featured: false` — visible only on the `/works` and `/en/works` gallery pages

The full catalogue is accessible at `/works` (FR) and `/en/works` (EN), both built from the shared `WorksPage` component.

### Adding a new work

Two shell scripts in `scripts/` assist with this workflow. Both require `yt-dlp` and `ffmpeg` (install via Homebrew).

```bash
# 1. (Optional) Find Instagram reels not yet in works.ts
./scripts/fetch-latest-reels.sh

# 2. Download a reel and generate the works.ts snippet
./scripts/download-reel.sh <instagram-url> <slug>

# 3. Copy the output snippet into src/data/works.ts
#    - Insert at the top of the array (newest first)
#    - Set featured: true to show on homepage, false for gallery only
```

For private accounts, add `--cookies-from-browser chrome` to the `yt-dlp` call inside `download-reel.sh`.

---

## Performance

Techniques applied:

- **Hero video**: poster-first, deferred autoplay via `requestIdleCallback`, WebM-only (no MP4 fallback)
- **Fonts**: self-hosted woff2 with `font-display: swap`, preloaded critical subsets — no third-party requests
- **No framework JS**: zero client-side hydration, minimal JS bundle
- **Caching**: immutable `Cache-Control` headers for fonts, video, and static media via `vercel.json`

Target Lighthouse scores: Performance ≥ 95, Accessibility ≥ 95, Best Practices 100, SEO 100.

---

## SEO

- **Per-page metadata** — unique title, description, canonical, and Open Graph / Twitter cards via `Layout.astro`; work pages pass a per-work OG image.
- **Structured data** — a site-wide JSON-LD `@graph` (`Organization` + `WebSite` + a `Person` per sister) on every page, plus `VideoObject` and `BreadcrumbList` on each work detail page.
- **Indexable catalogue** — every work has its own crawlable page at `/works/[slug]`; cards and galleries link to them (no longer modal-only).
- **i18n signals** — per-page `hreflang` (see [Internationalisation](#internationalisation)) and `xhtml:link` alternates in the sitemap.
- **Canonical host** — `www` → non-`www` 301 in `vercel.json`; `robots.txt` points to `sitemap-index.xml`.

After each deploy, resubmit the sitemap in Google Search Console and request indexing of new work pages.

---

## Eco-design

Targeted optimizations to reduce page weight and eliminate unnecessary network requests.

| Audit                                                                                   | Score          | Details                                      |
|-----------------------------------------------------------------------------------------|----------------|----------------------------------------------|
| [EcoIndex](https://www.ecoindex.fr/resultat/?id=fca44c0d-8044-4611-be7b-566d5c601c93) | **A** (83/100) | 0.88 Mo, 178 DOM elements, 13 requests       |

| Optimization                       | Impact                                        | Trade-off                                                               |
|------------------------------------|-----------------------------------------------|-------------------------------------------------------------------------|
| WebM-only video (no MP4 fallback)  | −976KB page weight                            | No playback on Safari <16 (<1% of traffic) — poster image shown instead |
| Self-hosted fonts (no Google Fonts)| Eliminates render-blocking third-party chain  | 8 woff2 files (~144KB) committed to repo                                |
| Hover video abort on mouseleave    | Prevents wasted bandwidth on WorkCard previews| Slight reload delay on re-hover                                         |
| Immutable cache headers            | Instant repeat visits for static assets       | Assets must be renamed (not overwritten) on update                      |

---

## Analytics

Visitor stats are collected via **[Umami Cloud](https://umami.is)** — a privacy-friendly, cookie-free analytics service. RGPD-compliant out of the box, lightweight (~2 KB script), no personal data collected. The tracking snippet is loaded in `Layout.astro`.

---

## Deployment

The project is deployed on **Vercel** via the official SSR adapter `@astrojs/vercel`.

Continuous deployment triggers automatically on every push to the main branch.

After each deploy, submit the sitemap to Google Search Console: `https://infanti.studio/sitemap-index.xml`
