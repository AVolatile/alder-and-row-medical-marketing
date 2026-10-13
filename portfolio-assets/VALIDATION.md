# Alder & Row validation record

Verified October 13, 2026. Tests used local Google Chrome via Playwright against the actual static production export. The in-app browser runtime was unavailable; local Chrome was used for the browser checks.

| Check                           | Result                                                                                   |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| TypeScript                      | Pass                                                                                     |
| ESLint                          | Pass; zero errors or warnings                                                            |
| Production build                | Pass; Next.js 16.4.0 static export                                                       |
| Application routes              | 32 checked; all successful                                                               |
| Browser regression suite        | 69 tests passed (68 browser checks and 1 domain test); zero remaining failures           |
| Internal links and image assets | Checked on all 32 application routes                                                     |
| Browser console errors          | No errors in route checks                                                                |
| Metadata and landmarks          | Noindex, one main landmark, and one page h1 checked                                      |
| Responsive matrix               | 9 major routes × 7 widths = 63 checks                                                    |
| Standalone email reflow         | 3 templates × 7 widths = 21 checks                                                       |
| Automated accessibility         | 17 application routes and 3 email templates; zero violations in selected WCAG A/AA rules |
| Dependency audit                | Zero known vulnerabilities across the final dependency tree                              |
| Creative exports                | 25 SVG/PNG layouts checked for dimensions and text bounds                                |

Widths: **320, 375, 430, 768, 1024, 1280, and 1440 pixels**.

Major routes: homepage, locator, booking, member overview, member prescriptions, campaign, brand, case study, and health-service hub. The header and footer are exercised across these views. Email previews are checked separately.

## Interaction coverage

- Location search, empty state, reset, service filtering, open status, and selected map marker.
- Eight-step appointment selection, errors, back navigation, preserved choices, field-level contact validation, confirmation, member-list update, and demo calendar download.
- Simulated refill status, pickup change, reminder toggle, prescription details, dialog containment, Escape, and focus restoration.
- Profile errors and propagation of a new greeting and preferred location.
- One-time benefit selection and changing demo credit balance.
- Confirmed appointment cancellation and cancelled history.
- Pickup-location changes reflected in overview activity.
- Booking a later visit preserves the earliest visit in the list and dashboard.
- Date and 12-hour time ordering excludes completed/cancelled records without mutating the source array.
- Mobile menu opening, Escape dismissal, focus return, skip link, and keyboard navigation.
- Demo login errors and password-reset feedback.

## Issues corrected

Low-contrast secondary copy, campaign overflow on phone screens, native-dialog trigger focus restoration, long words clipped inside display ads, and screenshot timing during the brief route-loading state were corrected. Responsive checks now inspect both document overflow and actual campaign text bounds. Asset checks validate lazy-loaded image URLs rather than treating offscreen loading as a missing image.

The complete 69-test suite passed after the member consistency improvements. Regression coverage now also verifies pickup activity propagation and chronological appointment selection, including morning, noon, and midnight ordering. `validation-summary.json` retains the check names, statuses, and coverage counts.

## Visual review

Desktop homepage, member space, campaign collection, brand system, case study, mobile homepage and locator, and the finished 1280 × 960 cover were visually inspected. The screenshot set captures nine major routes at 1440 and 375 pixels. Portfolio screenshots wait for the page heading and the loading state to clear.

## Practical limits

These are automated accessibility checks and selected keyboard smoke tests, not a formal WCAG conformance audit. Screen-reader testing with real users, Safari and Firefox testing, email-client rendering, and print preflight remain high-value next steps. The application is a local frontend concept with no real healthcare, identity, pharmacy, booking, or message-delivery backend.

Node 20.19+ or Node 22 LTS is recommended for a new checkout because a development lint dependency requires the newer Node range. The supplied project was successfully built and checked on the available Node 20.15.1 host.
