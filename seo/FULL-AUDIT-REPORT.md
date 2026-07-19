# SEO Audit — infanti.studio

**Date:** 2026-07-19
**Site:** https://infanti.studio (bilingual FR/EN, Astro 5 + Vercel)
**Business type:** Creative portfolio — stop-motion animation studio (Louise & Margot Infanti, Belgium)
**Data sources:** Google Search Console export (3 months, Apr 18 – Jul 19 2026), live-site crawl, source code review.

---

## Executive Summary

### Overall SEO Health Score: **62 / 100** (pre-fix) → **~78 / 100** (after this branch's changes)

The site is *technically clean* but *strategically invisible*. Every metric in Search Console points to the same conclusion: **infanti.studio ranks for nothing except its own brand name — and not even #1 for that.**

| GSC metric (3 mo) | Value | Read |
|---|---|---|
| Total clicks | 12 | Very low |
| Total impressions | ~390 | Very low |
| Brand query `infanti` | 231 impr / **0 clicks** / pos **6.2** | Buried under other "Infanti" entities |
| Non-brand queries | **0** | No topical discovery at all |
| Top page | `/` (326 impr) | Homepage carries everything |
| `/en` | 73 impr / 0 clicks | English presence, no engagement |
| `/works` | 3 impr | Barely indexed |

### Top 5 critical issues (all addressed in this branch)
1. **No indexable content beyond a 4-URL brochure.** All 8 works opened a modal + linked to Instagram — zero on-domain pages to rank. → *Fixed: 16 new per-work pages (FR+EN) with VideoObject schema.*
2. **Weak brand entity signals.** Bare `Organization` schema; no `Person`, no `WebSite`, no founders/address. → *Fixed: full `@graph` (Organization + WebSite + 2 × Person).*
3. **Broken per-page hreflang.** hreflang was hardcoded to the homepage on every page. → *Fixed: computed per page.*
4. **Sitemap had no language alternates.** `@astrojs/sitemap` ran with no i18n config. → *Fixed: emits `xhtml:link` hreflang pairs.*
5. **Thin/broken content.** 3 emoji-only titles (`🌺🦷`, `🐽`, `🐸✨`), 4 empty descriptions, 1 mistranslation — polluting `<h3>` and image `alt`. → *Fixed: real bilingual copy (draft, pending studio review).*

### Top 5 quick wins (in this branch)
- www → non-www 301 redirect (`vercel.json`).
- Works-gallery `<title>` now keyword-rich + brand-suffixed (was just "All works").
- Descriptive image `alt` (was the bare title, incl. emojis).
- Crawlable internal links from homepage + gallery to each work.
- Per-work OG images so shared work links aren't all the same generic card.

---

## Technical SEO

**Strengths (preserved):** clean `robots.txt` → sitemap-index; correct canonical; `trailingSlash: 'never'`; privacy-friendly Umami analytics; modern AVIF images via Astro `<Image>`; HSTS enabled.

**Issues found & status:**
| Issue | Severity | Status |
|---|---|---|
| hreflang hardcoded to homepage on all pages | High | ✅ Fixed (`Layout.astro`) |
| Sitemap missing i18n → no `xhtml:link` alternates | High | ✅ Fixed (`astro.config.mjs`) |
| www + non-www both return 200 (dup content; canonical was correct but not enforced) | Medium | ✅ Fixed (301 in `vercel.json`) |
| `logo` in schema pointed to SVG favicon (Google prefers raster) | Low | ✅ Now raster (og-image.jpg) |
| Methodology page (`/methodologie` ↔ `/en/methodology`) has no sitemap alternates (differing slugs) | Low | ⚠️ On-page hreflang handled via `altPathFr/En`; sitemap pair is a known integration limitation |

**Core Web Vitals:** Lab posture is strong (poster-first hero, deferred autoplay, async fonts, AVIF, CLS-safe). Field data unavailable (too few visits for CrUX). Keep monitoring after traffic grows.

---

## Content Quality

- **About section** is genuinely good: 3 bilingual paragraphs + 2 artist bios naming real schools (ERG Brussels, Technocité Mons, Conservatoire de Bruxelles). Strong E-E-A-T raw material — now amplified by `Person` schema.
- **Works were the weak point:** modal-only, off-domain, half with empty or emoji copy. Now every work has a page with a real bilingual title + description.
- **New Methodology page** (added concurrently by the studio) adds a substantial 5-stage process narrative — excellent topical depth for "how stop motion is made / needle-felt animation process".
- **Remaining dependency:** the draft work descriptions I wrote (`dreamcore`, `pig-loop`, `frog-magic`, `apartment`) are best-guess from visuals — **the studio should review/replace them with accurate copy.**

---

## On-Page SEO

| Element | Before | After |
|---|---|---|
| Homepage title/desc | Unique, good | Unchanged (kept) |
| Works gallery `<title>` | "All works" / "Toutes les œuvres" | Brand + keyword suffix |
| Per-work `<title>` | none (no page) | `{Work} — Infanti Studio` |
| Work page H1 | none | Work title |
| Emoji `<h3>` / `alt` | `🌺🦷` etc. | Real titles + descriptive alt |
| Internal links to works | none (modal only) | Crawlable `<a>` from home + gallery + related-works |

---

## Schema & Structured Data

**Before:** single `Organization` (name, url, logo=svg, email, 3× sameAs).

**After (site-wide `@graph` on every page):**
- `Organization` — + `founder` (×2 Person refs), `foundingDate`, `address` (BE), `areaServed`, `telephone`, raster `logo`, `email`, 3× `sameAs`.
- `WebSite` — publisher-linked, `inLanguage: [fr, en]`.
- `Person` × 2 — Louise & Margot, `jobTitle`, `worksFor`, individual Instagram `sameAs`.

**Per work page (added):** `BreadcrumbList` + `VideoObject` (name, description, thumbnailUrl, contentUrl, uploadDate, creator/publisher). → eligible for Google **video rich results / Video tab**.

Validate post-deploy at https://search.google.com/test/rich-results.

---

## Images

- AVIF everywhere via Astro `<Image>`, responsive densities, lazy-loaded — good.
- `alt` was the bare title (emoji for 3 works). Now descriptive: `"{title} — stop motion animation by Infanti Studio"`.
- Future nice-to-have: dedicated 1200×630 per-work OG images (currently reuses the portrait thumbnail as the social image — relevant but not ideal ratio).

---

## AI Search Readiness (GEO)

- Site-wide entity graph + `Person`/`Organization` disambiguation improves eligibility for AI Overviews and knowledge-panel association.
- On-domain video pages + Methodology narrative give LLMs citable, on-site passages (previously all substance lived on Instagram, which crawlers can't cite).
- Consider adding an `llms.txt` and an FAQ/process page as a later step.

---

## Why the brand ranks 6th (the off-page reality)

Even a perfectly optimized homepage sits at position ~6 for "infanti" because:
- "Infanti" is a common Italian surname **and** established brands (pianos, kids' furniture).
- The domain is new (founded Jan 2024) with **few backlinks** and low authority.

On-page work can't fully win this alone — see ACTION-PLAN.md §Off-page. The schema + entity graph shipped here is the on-page half of the fix.
