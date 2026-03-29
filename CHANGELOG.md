# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
