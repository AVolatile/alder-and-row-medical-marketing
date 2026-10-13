# Alder & Row portfolio export guide

## Cover: 1280 × 960, 4:3

Use a flat, layered composition of the brand and product. Do not add a laptop mockup.

- Background: Alder `#183E35`.
- Upper left: warm-ivory wordmark with generous clear space.
- Lower left: “Pharmacy & everyday care” and a short project descriptor.
- Center/right: a large homepage browser crop showing the headline, photography, and primary actions.
- Foreground: a smaller member prescription panel plus a location or appointment crop.
- Accent: one soft-peach open-door symbol. Keep decorative elements subordinate to the interface.
- Concept label: discreet but legible “Self-initiated concept · Anthony Volatile / Volatile Solutions.”

The finished `cover-1280x960.png` composes the supplied screenshots. Regenerate it with `node scripts/portfolio-cover.mjs` after running the browser suite. Preserve readable UI at the final export scale and avoid heavy perspective distortion.

## Recommended captures

| Capture                 | Route                                                  | Recommended view                                      |
| ----------------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| Homepage hero           | `/`                                                    | 1440 × 1000 and 1280 × 960                            |
| Service system          | `/health-services`                                     | 1440 × 1000                                           |
| Location finder         | `/locations`                                           | 1440 × 1000; include filters and map                  |
| Appointment choice      | `/appointments`                                        | 1440 × 1000                                           |
| Appointment review      | `/appointments`                                        | Complete the flow to review; avoid real personal data |
| Member overview         | `/member`                                              | 1440 × 1000                                           |
| Prescription management | `/member/prescriptions`                                | 1440 × 1000; show varied statuses                     |
| Campaign system         | `/campaign`                                            | Full-page plus a focused social/display crop          |
| Brand system            | `/brand`                                               | Identity, palette, typography, and components         |
| Case study              | `/case-study`                                          | Hero and selected process sections                    |
| Mobile tasks            | `/locations`, `/appointments`, `/member/prescriptions` | 375 × 960 and 430 × 960                               |

The browser suite captures homepage, locator, booking, member overview, prescriptions, campaigns, brand, case study, and service hub at 1440 and 375 pixels. Some screenshots are full-page and should be cropped for presentation.

## Campaign exports

- `public/campaign/social/`: six concepts, each at 1080 × 1080, 1080 × 1350, and 1080 × 1920; SVG and PNG.
- `public/campaign/display/`: 300 × 250, 728 × 90, 160 × 600, and 970 × 250; SVG and PNG.
- `public/campaign/posters/`: three 1200 × 1800 vector and image concepts.
- `public/campaign/email/`: seasonal service, prescription-ready, and appointment confirmation HTML templates.
- `public/brand/`: symbol, wordmark, favicon, OG vector, and OG PNG.

SVG campaign masters use portable sans-serif rendering; web layouts use locally bundled Manrope and DM Sans. For final agency/client presentation, use the web captures for exact typography and reflow. PNG exports provide convenient platform dimensions; vector poster files are creative masters, not preflighted production files.

## Narrative sequence

1. The retail-friendly identity and homepage.
2. The service taxonomy and locator.
3. Booking choices, validation, review, and confirmation.
4. Member pharmacy tasks and preferences.
5. The cross-channel campaign system.
6. The reusable components and accessibility approach.

Describe the work as a self-initiated concept. Do not present fictional demo records as real patient data, generated people as real staff, or unmeasured design decisions as proven business results.
