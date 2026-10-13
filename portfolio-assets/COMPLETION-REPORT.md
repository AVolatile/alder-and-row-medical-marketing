# Alder & Row — completion report

Created for Anthony Volatile / Volatile Solutions as a self-initiated portfolio concept. This report describes implemented frontend behavior; it does not claim real healthcare services or production backend integration.

## Brand

**Alder & Row** pairs the warmth of a tree-lined neighborhood with the familiar shops and places beside one another. A lowercase wordmark and nested open-door arches connect the retail and digital experience without medical-cross imagery.

Palette: Alder `#183E35`, warm ivory `#FAF9F5`, peach `#F0C8AE`, sage `#DDE8D9`, oat yellow `#EEE5BC`, lilac `#E6DFEE`. Manrope handles display typography; DM Sans handles body and interface text. Both are bundled locally. Lucide supplies consistent line icons. Original generated concept photography contributes warm light, oak, and everyday human context.

Visual principles: generous spacing, restrained hierarchy, clear task choices, legible dark-on-light text, flat surfaces, fine borders, quiet secondary colors, and neutral healthcare language.

## Marketing website

Completed public routes:

- `/` — full consumer homepage: hero, quick tasks, services, prescription support, appointment discovery, locations, membership, resources, and final CTA.
- `/pharmacy` — neighborhood pharmacy overview.
- `/prescriptions` — prescription logistics and a transfer-interest simulation.
- `/vaccinations` — neutral seasonal, travel-conversation, and preventative service categories.
- `/health-services` — service taxonomy and discovery hub.
- `/health-services/vaccinations`
- `/health-services/screenings`
- `/health-services/wellness-consultations`
- `/health-services/preventative-services`
- `/health-services/pharmacy-guidance`
- `/locations` — searchable, filterable locator.
- `/locations/maple-square`
- `/locations/river-walk`
- `/locations/west-garden`
- `/locations/cedar-market`
- `/appointments` — eight-step booking flow.
- `/resources` — categorized editorial hub.
- `/resources/a-little-preparation`
- `/resources/prescription-routine`
- `/resources/neighborhood-location`
- `/resources/seasonal-check-in`
- `/resources/questions-worth-asking`
- `/campaign` — cross-channel creative showcase and downloads.
- `/brand` — identity and UI system.
- `/case-study` — authored portfolio narrative.
- `/login` — demo sign-in, account creation, and reset request.
- `/accessibility` — accessibility approach and limits.

Custom loading, recoverable error, and 404 experiences are included. Metadata supplies titles, descriptions, favicon, and OG art, with noindex/nofollow by default.

## Pharmacy experience

Public pharmacy pages connect refill management, pickup status, transfer discovery, reminders, and pharmacist-question service discovery. Three clearly fictional prescription records demonstrate varied states without real medication instructions.

Member prescription cards display name, fictional strength, availability, status, pickup location, last-filled date, refill date, and actions. Refill simulation updates status; pickup selection and task reminders update the same shared record. Details use a native dialog.

## Appointment system

Eight steps: service, location, date, time, guest/member, contact, review, and confirmation. Progress and a visit summary remain available. The flow carries discovery selections into booking, prevents incompatible locations, validates each required selection, preserves state when going back, and gives field-specific contact errors.

Confirmation adds a demo appointment to the member list and provides an explicitly labeled demo calendar event download. No real booking or email occurs. A current Eastern Time date baseline generates the next eight demo days.

## Location system

City, fictional ZIP, neighborhood, and address search combine with service, demo-open, and appointment-availability filters. Four location cards expose hours, service availability, accessibility details, and scheduling links. An illustrative map offers selectable markers with corresponding text cards. Empty states explain how to reset or refine filters.

Location details include fictional addresses and contact details, location and pharmacy hours, services, access features, and booking links. The directions action clearly explains that fictional addresses cannot provide real navigation.

## Member experience

Completed routes: `/member`, `/member/prescriptions`, `/member/appointments`, `/member/benefits`, `/member/profile`.

The consumer member overview connects prescriptions, a next visit, preferred store, recent activity, account tasks, benefits, and useful articles. Appointments support upcoming/completed/cancelled filters, date-and-time ordering for upcoming visits, and confirmed cancellation. The dashboard derives the next visit from that same ordered list and reflects current prescription pickup locations in activity. Benefits support one-time simulated selections and a changing demo credit balance. Profile validation updates the greeting, preferred store, and communication preferences.

All state is in memory, connected during client navigation, and reset on reload. No backend or browser storage collects credentials, clinical information, or contact records.

## Health services

Five reusable service detail pages: vaccinations, screenings, wellness consultations, preventative services, and pharmacy conversations. Each includes an overview, an illustrative appointment duration, expectations, preparation framing, booking and location actions, and FAQs. Suitability, pricing, inventory, clinical advice, and coverage are not invented.

## Campaign

Six concepts: prescription convenience, seasonal vaccination, local services, member tools, preventative care, and neighborhood locations.

- Paid social: 18 layouts across 1080 × 1080, 1080 × 1350, and 1080 × 1920; SVG and PNG.
- Display: 300 × 250, 728 × 90, 160 × 600, and 970 × 250; SVG and PNG.
- Retail: three 1200 × 1800 poster concepts; SVG and PNG.

Copy records are shared between the application showcase and the generation script. Print creative is a visual concept; production prepress remains a separate step.

## Email

Three standalone responsive HTML templates and in-app previews:

- `public/campaign/email/seasonal-services.html`
- `public/campaign/email/prescription-ready.html`
- `public/campaign/email/appointment-confirmation.html`

Templates use inline styles, presentation tables, mobile reflow, clear text, and concept framing. No email has been sent. Actual delivery would require approved absolute links and email-client rendering tests.

## Brand system

`/brand` covers naming, symbol, wordmark, palette, typography, actions, field and status examples, icons, spacing, surfaces, photography, campaigns, retail signage, accessibility, and responsive principles. SVG identity files, favicon, and OG PNG/SVG are supplied.

## Case study

`/case-study` covers the challenge, strategy, brand and marketing, service discovery, booking decisions, member UX, accessibility, campaign adaptability, component architecture, and actual build. It includes an honest concept disclaimer and identifies user research and secure integrations as future work, without inventing research results or performance metrics.

## Accessibility

Implemented: semantic landmarks, skip navigation, visible keyboard focus, native controls, labeled fields, field-specific errors, described errors, aria-invalid, live action feedback, written statuses, pressed states, reduced motion, native dialog focus containment and Escape handling, explicit focus restoration, step-heading focus, and location information equivalent to map visuals.

Automated checks and selected keyboard tests support WCAG-oriented development. They are not a formal conformance audit or a substitute for testing with assistive-technology users.

## Architecture

Next.js 16 App Router, React 19, strict TypeScript, static export, focused feature modules, typed centralized content, shared in-memory React state, local variable fonts, optimized WebP photography, and ordered CSS layers for base, marketing, service discovery, booking, member, portfolio, and responsive styles.

Responsive grids and task flows adapt at 320, 375, 430, 768, 1024, 1280, and 1440 pixels. No backend or environment variables are needed for the concept. The generated `out/` directory is ready for static hosting; no external deployment is claimed.

## Validation

See `VALIDATION.md` and `validation-summary.json` for the final results and precise coverage. The suite includes all application routes, internal links and image assets, browser console checks, noindex metadata, heading structure, responsive layouts, automated accessibility, selected keyboard behaviors, booking, prescriptions, cancellations, benefits, profile changes, email previews, and campaign export dimensions and clipping.

## Files created

Major deliverables:

- `src/app/` — all route pages, layouts, metadata, dynamic static templates, loading/error/404 handling.
- `src/components/` — shared UI, cards, navigation, feature modules, native dialog, demo provider.
- `src/data/` — typed domain records plus shared campaign and email JSON.
- `src/lib/` — formatting, Eastern Time booking dates, and email validation.
- `src/styles/` — tokens, component styling, responsive layers.
- `src/types/` — shared domain models.
- `public/brand/`, `public/images/`, `public/campaign/` — identity, photography, and creative exports.
- `scripts/generate-assets.mjs`, `scripts/portfolio-cover.mjs`, `scripts/serve.mjs`.
- `tests/experience.spec.ts`, `tests/member-state.spec.ts`, `playwright.config.ts`.
- `README.md`, TypeScript, lint, Next.js, package, and formatting configuration.

## Portfolio assets

- `EXPORT-GUIDE.md` — 4:3 cover direction and route capture plan.
- `cover-1280x960.png` — finished layered brand, homepage, member, and locator composition.
- `screenshots/` — nine major routes at 1440 and 375 pixels, including full-page homepage, campaign, and brand captures.
- `originals/neighborhood-care.png` — original generated concept photography.
- `IMAGE-PROMPT.md` — final generation prompt and tool provenance.
- `VALIDATION.md` and `validation-summary.json` — final verification record.
- Downloadable social, display, poster, and email files in `public/campaign/`.

## Remaining opportunities

1. Task-based user research and assistive-technology testing with a diverse audience.
2. Qualified clinical/content review before adapting any service copy to a real provider.
3. Secure authentication, consent, scheduling, and pharmacy integrations for a commissioned live product.
4. Email-client testing and print preflight for actual campaign production.
