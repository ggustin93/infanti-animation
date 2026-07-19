# Action Plan — infanti.studio Visibility

Prioritized. ✅ = shipped in the `seo/visibility-improvements` branch. The rest are owner actions (mostly off-page) that on-page code can't do alone.

---

## ✅ Critical — shipped in this branch (blocks discovery / indexing)

| # | Action | Files |
|---|---|---|
| C1 | **Per-work indexable pages** (8 FR + 8 EN) with video, description, breadcrumb, related-works links | `src/pages/works/[slug].astro`, `src/pages/en/works/[slug].astro`, `src/components/WorkDetail.astro` |
| C2 | **VideoObject + BreadcrumbList schema** on every work page (video rich-result eligible) | `WorkDetail.astro` |
| C3 | **Site-wide entity graph** — Organization + WebSite + 2× Person, with founders/address/phone/sameAs | `src/layouts/Layout.astro` |
| C4 | **Fix broken hreflang** (was homepage-hardcoded on all pages) | `Layout.astro` |
| C5 | **Sitemap i18n** → `xhtml:link` alternates | `astro.config.mjs` |
| C6 | **Real content** for 3 emoji-only + 4 empty/mistranslated works | `src/data/works.ts` |

## ✅ High — shipped

| # | Action | Files |
|---|---|---|
| H1 | www → non-www **301 redirect** | `vercel.json` |
| H2 | **Crawlable internal links** home + gallery → work pages (title links) | `WorkCard.astro`, `Works.astro`, `WorksPage.astro` |
| H3 | Keyword-rich, brand-suffixed **gallery `<title>`** | `content/{fr,en}.json`, `WorksPage.astro` |
| H4 | **Descriptive image `alt`** (was bare/emoji title) | `WorkCard.astro`, `WorkDetail.astro` |
| H5 | **Per-work OG image** + `video.other` og:type | `Layout.astro`, `WorkDetail.astro` |

---

## ⛔ Owner actions — do after deploy (the other half of the fix)

### Critical — brand ranking & indexing
1. **Deploy this branch**, then in Google Search Console:
   - Confirm the **domain property** covers both www and non-www; set non-www as canonical.
   - **Resubmit** `https://infanti.studio/sitemap-index.xml`.
   - **Request indexing** for the new `/works/*` and `/en/works/*` URLs.
2. **Review/replace the draft work copy** (`dreamcore`, `pig-loop`, `frog-magic`, `apartment` in `src/data/works.ts`) with accurate descriptions — mine are guesses from the visuals.
3. **Verify the real brand SERP:** search `infanti studio animation` and `infanti stop motion` — note who outranks you and target those long-tail brand+topic combos in copy.

### High — authority & disambiguation (moves the position-6 needle)
4. **Backlinks** (highest-leverage off-page): animation directories, festival/exhibition pages (Archives Exhibitions already links?), art-school alumni pages (ERG, Technocité, Conservatoire), Belgian creative press, Vimeo/Behance profiles linking back.
5. **Reciprocal `sameAs`:** ensure the Instagram (`margot.infanti`, `louise_infanti`) and TikTok (`inf.sisters`) bios link to infanti.studio — reinforces the entity graph.
6. **Google Business Profile** for the studio (Belgium) — helps local + brand-entity resolution and the "who is Infanti Studio" question.
7. **Consistent NAP** (name / studio / contact) across every profile.

### Medium — content expansion for non-brand discovery
8. Add a short **process/FAQ** angle (the new Methodology page is a great start) targeting: "stop motion laine feutrée", "needle felt animation", "animation artisanale Belgique", "how stop motion puppets are made".
9. Consider a lightweight **blog / behind-the-scenes** for fresh, indexable, linkable content.
10. **Dedicated 1200×630 OG images** per work (currently reuses the portrait thumbnail).

### Low — polish
11. Add `llms.txt` for AI-crawler guidance.
12. Fix the pre-existing footer contrast issue (`pwablo.be` link) — noted in CLAUDE.md, helps Accessibility ≥95.
13. Methodology page has no sitemap hreflang pair (differing FR/EN slugs) — on-page hreflang is wired via `altPathFr/En`; optionally add a manual sitemap entry.

---

## Verification checklist (post-deploy)
- [ ] `curl -sI https://www.infanti.studio/` → `301` to non-www
- [ ] Rich Results Test passes for Organization, Person, VideoObject, BreadcrumbList
- [ ] Each work page's hreflang points to its true FR/EN counterpart
- [ ] Sitemap shows `xhtml:link` alternates
- [ ] GSC: first **non-brand** impressions appear within 2–4 weeks
- [ ] Lighthouse: Performance ≥95, Accessibility ≥95, SEO 100
