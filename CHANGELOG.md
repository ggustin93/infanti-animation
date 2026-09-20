# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Subtle site-wide starfield background (fixed dim stars plus two desynchronised twinkling layers, gold and cream) and a random shooting star every few seconds (random direction, angle and speed; occasional larger, slower one), pure CSS with a small script in `Layout` for the randomisation; disabled under `prefers-reduced-motion`
- Exhibition posts at `/expositions/[slug]` (FR) and `/en/exhibitions/[slug]` (EN) for *Laine des Songes — Puppet in the City* (Uccle, 18–20 Sept 2026) and *ARCHIVES: whimsy* (Lafayette, 12 July 2025), each with a photo/poster, bilingual copy, `ExhibitionEvent` + `BreadcrumbList` JSON-LD and per-page `hreflang`
- `ExhibitionPost` component and `src/data/exhibitions.ts` (typed FR/EN catalogue, same pattern as `works.ts`)
- Optional `keywords` field on works, filled from the Instagram hashtags by `download-reel.sh` and emitted in the `VideoObject` JSON-LD
- Work *Presque Parfait* / *Almost Perfectly Done* (`ice-cream`, Instagram post of 21 Aug 2026)
- Five works — `how-feelings-are-born`, `messy-bird`, `metamorphose`, `time-to-be-human`, `water-phoenix` — each with mp4, webm and thumbnail
- Methodology teaser section on both homepages, between Works and Exhibitions: the five stage labels as gold display-serif numerals with the page's intro, linking to `/methodologie` (`/en/methodology`); typographic rather than photographic so it is not read as "more works"
- Individual work detail pages at `/works/[slug]` (FR) and `/en/works/[slug]` (EN) — crawlable, indexable pages per work with video, description, breadcrumb, and internal links to the rest of the catalogue (previously works only opened a modal + linked to Instagram)
- `WorkDetail` component emitting `VideoObject` and `BreadcrumbList` JSON-LD per work page (eligible for Google video rich results)
- Site-wide structured-data `@graph` on every page — `Organization` (with founders, `foundingDate`, address, telephone, raster logo), `WebSite`, and a `Person` entity for each sister — strengthening brand disambiguation
- `image`, `ogType`, and `schema` props on `Layout` for per-page Open Graph images and JSON-LD injection
- `works.detail` i18n block and keyword-rich `allWorksMetaTitle` for the gallery pages
- `www` → non-`www` 301 redirect in `vercel.json`
- Bilingual methodology page at `/methodologie` (FR) and `/en/methodology` (EN), presenting the five production stages — screenwriting, visual development, fabrication, animation, post-production — as alternating text/photo rows
- `MethodologyPage` component rendering the five stage photos through `astro:assets` (`src/assets/images/methodologie/`), with a build-time guard that fails with a locale- and step-specific message when `fr.json` and `en.json` drift
- `BackLink` component extracted from `WorksPage` — shared back-navigation link with an icon and a localized label
- `methodology` content block (`title`, `metaTitle`, `description`, `intro`, `steps[]` with per-photo `alt`) in `fr.json` and `en.json`
- `nav.methodology` and `nav.backToStudio` i18n keys, and a Methodology entry in the header navigation
- `altPathFr` / `altPathEn` props on `Layout` for correct `hreflang` when the FR and EN routes do not share a slug

### Changed
- Home Exhibitions section rebuilt from a single hard-coded card into a compact editorial list driven by `exhibitions.ts` (year, title, place, summary, thumbnail; whole row links to the post, external link kept alongside); `exhibitions` i18n block reduced to `title`, `readMore`, `backLabel`
- Instagram consolidated on `@infanti.studio`: one Contact link, one Organization `sameAs` entry; the two personal profiles are no longer linked and the Person entities lose their Instagram `sameAs`
- `fetch-latest-reels.sh` now defaults to the `infanti.studio` profile
- Archives Exhibitions link now targets the artist page on the Wix site
- Work cards, video modal and detail pages refined; the modal's dialog and close-button `aria-label`s now come from `works.modalLabel` / `works.closeVideo` in `fr.json` and `en.json` (were hardcoded English on the French page)
- `hreflang` tags are now computed per page from the current path (were hardcoded to the homepage on every page, so `/works` etc. declared the wrong alternates)
- Sitemap now emits `xhtml:link` language alternates via the `@astrojs/sitemap` `i18n` option
- Bare `Organization` JSON-LD replaced by a full entity graph; `logo` switched from the SVG favicon to a raster image
- Work cards link to their detail page via a crawlable title link; image `alt` is now descriptive instead of the bare title
- Gallery page `<title>` gains a keyword + brand suffix (was just "All works" / "Toutes les œuvres")
- `WorksPage` back-link label is now localized via a `backLabel` prop instead of a hardcoded "Studio"

### Known issues
- `fetch-latest-reels.sh` cannot list the Instagram profile: yt-dlp's profile extractor is marked broken upstream (still failing on 2026.08.19). `download-reel.sh` works on individual post URLs.

### Fixed
- `download-reel.sh` aborted on stock macOS bash 3.2 whenever `IG_COOKIES` was unset (empty array expansion under `set -u`); cookie args are now expanded safely at both call sites
- Emoji-only work titles (`🌺🦷`, `🐽`, `🐸✨`), empty descriptions, and one mistranslated `apartment` description in `works.ts` replaced with real bilingual copy (drafts pending studio review)
- Mobile menu stayed open when following a cross-page navigation link — the close handler now matches all `a` elements instead of only `a[href^="#"]`
- Header logo href carried a trailing slash on EN (`/en/`) conflicting with `trailingSlash: 'never'` — corrected to `/en`

## [1.1.0] - 2026-03-29

### Added
- `robots.txt` with crawl policy and pointer to `sitemap-index.xml`
- Open Graph image (`og-image.jpg`, 1200×630 JPEG) generated from hero poster via Sharp
- `og:image`, `og:image:alt`, `og:image:width`, `og:image:height` meta tags
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt` meta tags
- `og:locale:alternate` tag for bilingual locale signaling
- `hreflang` tags for `fr`, `en`, and `x-default` locales
- Organization JSON-LD structured data (name, URL, logo, email, sameAs social profiles)
- Localized aria-labels for the hero video play/pause control (`pauseVideo` / `playVideo` i18n keys)
- `viewWorkLabel` prop on `WorkCard` for a localized aria-label on the Instagram link

### Fixed
- `hreflang` EN href carried a trailing slash (`/en/`) conflicting with `trailingSlash: 'never'` — corrected to `/en`
- Hero video toggle `aria-label` was not updated in the `prefers-reduced-motion` branch — screen readers now receive the correct "play" label when motion is reduced
- `WorkCard` Instagram link aria-label was hardcoded in English on both language versions — now uses the localized `viewWorkLabel` value
- `og:image` referenced an AVIF file unsupported by most social crawlers — replaced with JPEG

## [1.0.4] - 2026-03-02

### Changed
- Language toggle layout and icon updated for improved visual clarity

## [1.0.3] - 2026-03-01

### Fixed
- Mobile side menu scroll no longer blocked when the menu is open

## [1.0.2] - 2026-03-01

### Added
- Eco-design badge in the footer
- Umami analytics integration
- Sitemap generation via `@astrojs/sitemap`
- Updated works section images

### Changed
- Dependencies updated to include sitemap integration

## [1.0.1] - 2026-03-01

### Added
- Self-hosted font files to eliminate third-party font requests
- Vercel `Cache-Control` headers for static assets
- Updated `.gitignore` entries

### Changed
- Video strategy switched to WebM-only to reduce payload
- Fonts served from origin with immutable cache headers

### Fixed
- Contact page layout and video modal close button rendering on mobile

## [1.0.0] - 2026-03-01

### Added
- Initial release of Infanti Studio portfolio
- Bilingual site (FR default, EN at `/en/`) using Astro 5 built-in i18n
- Hero section with deferred-autoplay video (poster-first, `requestIdleCallback`)
- Works, About, Exhibitions, and Contact sections
- `VideoModal` component for work previews
- `LanguageToggle` component for FR/EN switching
- SSR deployment via `@astrojs/vercel` adapter
- Async font loading with `preload` + `onload` pattern
- Works video assets for the works section

[Unreleased]: https://github.com/ggustin93/infanti-animation/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/ggustin93/infanti-animation/compare/v1.0.4...v1.1.0
[1.0.4]: https://github.com/ggustin93/infanti-animation/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/ggustin93/infanti-animation/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/ggustin93/infanti-animation/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/ggustin93/infanti-animation/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/ggustin93/infanti-animation/releases/tag/v1.0.0
