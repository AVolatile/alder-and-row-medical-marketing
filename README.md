# Alder & Row

**Pharmacy & everyday care. A self-initiated portfolio concept by Anthony Volatile / Volatile Solutions.**

Alder & Row explores a consumer healthcare ecosystem across retail brand identity, marketing, pharmacy tasks, service discovery, neighborhood locations, appointment scheduling, member tools, editorial content, and cross-channel creative.

This is a standalone frontend application. It does not offer real healthcare, authentication, prescriptions, insurance benefits, or appointment bookings. All people in the generated concept photograph are illustrative, and all member records, locations, service availability, credits, and medication displays are fictional.

## Purpose and audience

Designed to demonstrate enterprise brand-system thinking, consumer UX, responsive frontend engineering, accessibility practices, and creative consistency for recruiters, product teams, creative directors, and prospective clients. The project includes a public case study that explains actual implementation choices without inventing research or business results.

## Brand rationale

**Alder** suggests the warmth of a tree-lined neighborhood. **Row** suggests the shops and everyday places beside one another. The nested-arch mark represents an open door: one recognizable starting point across physical and digital experiences.

| Token       | Value     | Use                                |
| ----------- | --------- | ---------------------------------- |
| Alder       | `#183E35` | Text, actions, core brand surfaces |
| Warm ivory  | `#FAF9F5` | Primary background                 |
| Soft peach  | `#F0C8AE` | Human moments, seasonal services   |
| Garden sage | `#DDE8D9` | Member and location surfaces       |
| Oat yellow  | `#EEE5BC` | Wellness and member creative       |
| Quiet lilac | `#E6DFEE` | Preventative service variation     |

Manrope provides display typography; DM Sans provides readable body and interface typography. Both are bundled locally through Fontsource. Lucide provides consistent, decorative SVG icons. The main photograph was generated with the built-in image generation tool, retained as an original, and optimized to WebP for the application.

## Getting started

Node **20.19+** or Node 22 LTS is recommended for all development tools. The framework itself supports Node 20.9+.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`.

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

The production preview serves `out/` at `http://127.0.0.1:4173`. Because the application uses static export, `next start` is not the production serving workflow; use `npm run preview` locally or deploy the export directory.

## Route map

| Experience       | Routes                                                                                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Consumer website | `/`, `/pharmacy`, `/prescriptions`, `/vaccinations`                                                                                                                                                           |
| Services         | `/health-services`, `/health-services/vaccinations`, `/health-services/screenings`, `/health-services/wellness-consultations`, `/health-services/preventative-services`, `/health-services/pharmacy-guidance` |
| Locations        | `/locations`, `/locations/maple-square`, `/locations/river-walk`, `/locations/west-garden`, `/locations/cedar-market`                                                                                         |
| Booking          | `/appointments`                                                                                                                                                                                               |
| Member           | `/member`, `/member/prescriptions`, `/member/appointments`, `/member/benefits`, `/member/profile`                                                                                                             |
| Editorial        | `/resources`, `/resources/a-little-preparation`, `/resources/prescription-routine`, `/resources/neighborhood-location`, `/resources/seasonal-check-in`, `/resources/questions-worth-asking`                   |
| Account entry    | `/login`                                                                                                                                                                                                      |
| Portfolio        | `/campaign`, `/brand`, `/case-study`, `/accessibility`                                                                                                                                                        |

There are 32 application routes, plus a custom 404 page. Three standalone email preview files are served from `/campaign/email/`.

## Stack and architecture

- Next.js 16 App Router, React 19, and strict TypeScript.
- Static export with pre-generated service, location, and article detail routes.
- Typed, centralized demo content in `src/data/content.ts`.
- A shared React context for connected, in-memory demo state.
- CSS tokens and focused marketing, service, booking, member, portfolio, and responsive style files; no UI framework dependency.
- Reusable cards, form fields, headings, actions, badges, breadcrumbs, empty states, notifications, native dialogs, and accordions.
- Playwright and axe for browser-level regression and accessibility smoke checks.

```text
src/
  app/            Route composition, layouts, metadata, and static detail templates
  components/     Shared UI and focused feature modules
  data/           Central service, location, article, campaign, and demo records
  lib/            Date formatting, booking dates, and validation helpers
  styles/         Design tokens, visual system, and responsive rules
  types/          Shared domain types
public/
  brand/          Symbol, wordmark, favicon, and social sharing art
  images/         Optimized original concept photography
  campaign/       Social, display, poster, and standalone email exports
portfolio-assets/
  originals/      Original generated photograph
  screenshots/    Screenshots captured by browser verification
  EXPORT-GUIDE.md
  IMAGE-PROMPT.md
  VALIDATION.md
scripts/          Asset generation and local static preview
tests/           Browser regression checks
```

## Connected demo behavior

The provider in `src/components/demo-provider.tsx` connects booking, prescriptions, member appointments, benefits, profile preferences, and the dashboard. State remains available during Next.js client navigation and resets on a full reload. There is no localStorage, analytics, backend, or network submission of form data.

- Refill requests change a fictional prescription to **Refill requested**.
- Pickup changes and task-reminder preferences update the same prescription record.
- Booking validates service/location compatibility, dates, times, account mode, and contact fields before creating a demo appointment.
- Booking confirmation offers a calendar download explicitly marked **DEMO ONLY**.
- Cancelling a demo appointment requires confirmation and updates history.
- Offers can be selected once; demo credit balances update accordingly.
- Profile changes update the greeting and preferred location.
- Login, account creation, and password-reset forms demonstrate frontend interactions only. Passwords are cleared on submission and never transmitted or persisted.

Use sample details such as `alex@example.com`. Do not enter real health or sensitive personal information.

## Accessibility approach

Semantic landmarks, skip navigation, visible focus rings, field labels, field-specific errors, `aria-invalid`, described errors, written status labels, pressed-state controls, live notifications, native dialog focus management, Escape handling, reduced-motion support, and text equivalents for map content are implemented.

The interface is designed for reflow and touch use at 320, 375, 430, 768, 1024, 1280, and 1440 pixels. Automated checks are evidence of selected behaviors, not formal WCAG certification. Assistive-technology testing with real users remains valuable.

## Browser checks

```sh
npx playwright install chromium
npm run build
npm test
```

For an existing local Chrome installation on macOS:

```sh
PLAYWRIGHT_CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm test
```

Tests cover all application routes, internal links and assets, console errors, noindex metadata, heading structure, the seven-width major-route matrix, axe WCAG A/AA smoke checks, booking, refill simulation, pickup changes, reminder toggles, cancellation, profile validation, member offers, login feedback, mobile navigation, skip navigation, and dialog keyboard behavior. Tests run against the static production export. Reports are written to `playwright-report/`; traces and failure screenshots go to `test-results/`.

## Creative exports

```sh
npm run assets
```

This regenerates 18 social layouts in SVG and PNG (six concepts × three formats), four display layouts in SVG and PNG, three poster concepts in SVG and PNG, three HTML emails, and the vector brand assets and sharing image. Social uses 1080 × 1080, 1080 × 1350, and 1080 × 1920. Display uses 300 × 250, 728 × 90, 160 × 600, and 970 × 250. Posters use 1200 × 1800 vector/image concepts.

The campaign page includes previews and download links. Email templates use inline styling and presentation tables with a mobile media query. Their relative links work when hosted with this project. Actual email deployment would require absolute approved URLs, email-client testing, and an appropriate delivery service. Nothing has been sent. Poster concepts require print preflight, bleed, and color-profile preparation before production.

## Deployment

Run `npm run build` and publish the generated **`out/`** directory to a static host that supports directory indexes and a custom `404.html`. No environment variables or server runtime are required. Preserve trailing-slash routes and all generated `_next/` files. Do not configure an SPA catch-all that sends every path to the homepage; individual routes are pre-generated.

Production metadata defaults to **noindex, nofollow**. The `.example` metadata base is intentionally fictional. Set the actual preview domain in `src/app/layout.tsx` if you deploy privately; retain noindex for the concept. No deployment was required to use the local project.

## Portfolio presentation

A finished 1280 × 960 layered cover is available at `portfolio-assets/cover-1280x960.png`. Regenerate it after the screenshot suite with `node scripts/portfolio-cover.mjs`.

See `portfolio-assets/EXPORT-GUIDE.md` for the 1280 × 960 cover composition, route capture recommendations, mobile views, and campaign exports. See `/case-study` for the authored project narrative and `/brand` for the identity and UI system.

## Concept disclaimer

This is a self-initiated concept project created to demonstrate enterprise healthcare design, accessibility, brand-system thinking, frontend development, campaign execution, and cross-channel digital experience design. It is not a licensed pharmacy or healthcare provider and does not claim real medical services, prescriptions, patients, professional credentials, coverage, or clinical outcomes.
# alder-and-row-medical-marketing
