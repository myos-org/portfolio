# Aniket Tyagi — Portfolio

Personal portfolio for Aniket Tyagi, Software Engineer (backend & full-stack).
Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4.
Fully static — no backend, no analytics, no tracking.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | Generate route types and run `tsc` |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests (content integrity, formatting) |
| `npm run test:e2e` | Playwright e2e + axe accessibility (desktop and mobile). Run `npx playwright install chromium` once, and `npm run build` first. |
| `npm run check` | All of the above, in order |
| `node scripts/screenshots.mjs <url> <dir>` | Full-page screenshots at 320–1920px in both themes |

## Structure

```
src/
  app/                 routes, metadata, OG images, icons, robots, sitemap
    work/[slug]/       case-study route (statically generated)
  components/          Header, Footer, ThemeToggle, cards, case-study template
    diagrams/          responsive HTML diagrams (reflow vertically on mobile)
    previews/          project preview panels (illustrations, not screenshots)
  content/
    projects.ts        all case-study content — typed, data-driven
    profile.ts         hero, experience, expertise, about
  lib/                 site config, types, formatting, OG renderer
  proxy.ts             real 404 status for unknown /work/* slugs
tests/unit, tests/e2e
```

To add a project, add an entry to `src/content/projects.ts`. Routes, the home-page card, next-project links, metadata, OG image and sitemap follow automatically.

## Deployment (Vercel)

No environment variables are required. Optional:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin, e.g. `https://anikettyagi.dev`. Enables canonical URLs, absolute OG image URLs and sitemap entries. If unset on Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used; if neither is set, canonical and sitemap entries are omitted rather than filled with a placeholder. |

## Enabling the resume

Put the real PDF in `public/` and set `site.resume` in `src/lib/site.ts` (e.g. `"/aniket-tyagi-resume.pdf"`). The header and mobile menu then show a download action. Update the unit test that asserts `resume` is `null`.

## Content sources

Every claim is traceable:

- **Klyro** — `github.com/myos-org/forkify-ERP` (source code plus `docs/audit` and `docs/engineering`). The backend suite was re-run locally on 2026-10-13: 22 tests, 0 failures. Roadmap items (Redis, Kafka, outbox and so on) are labelled as planned.
- **LifeSnail** — product scope as supplied. The source is private and no public demo was available, so nothing beyond the scope is claimed.
- **Alpide ERP** — contribution areas as supplied; company description from alpide.com. No internal details.

## Open items before publishing

- [ ] Confirm the institution for the B.Sc. Computer Science (Honours with Research), then set `about.education.institution`.
- [ ] Provide the LifeSnail live URL (and screenshots, if approved). Add it as a `{ kind: "live" }` link.
- [ ] Confirm whether the original Forkify ERP college project had teammates; adjust Klyro's `role` if so.
- [ ] Supply a resume PDF (optional).
- [ ] Set `NEXT_PUBLIC_SITE_URL` once the domain is chosen.
