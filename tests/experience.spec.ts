import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { services, locations, articles } from '../src/data/content';
const publicRoutes = [
  '/',
  '/pharmacy/',
  '/prescriptions/',
  '/vaccinations/',
  '/health-services/',
  '/locations/',
  '/appointments/',
  '/resources/',
  '/campaign/',
  '/brand/',
  '/case-study/',
  '/login/',
  '/accessibility/',
];
const memberRoutes = [
  '/member/',
  '/member/prescriptions/',
  '/member/benefits/',
  '/member/appointments/',
  '/member/profile/',
];
const detailRoutes = [
  ...services.map((s) => `/health-services/${s.slug}/`),
  ...locations.map((l) => `/locations/${l.slug}/`),
  ...articles.map((a) => `/resources/${a.slug}/`),
];
const majorRoutes = [
  '/',
  '/locations/',
  '/appointments/',
  '/member/',
  '/member/prescriptions/',
  '/campaign/',
  '/brand/',
  '/case-study/',
  '/health-services/',
];
for (const route of [...publicRoutes, ...memberRoutes, ...detailRoutes])
  test(`route, landmarks, metadata, assets and console: ${route}`, async ({ page, request }) => {
    const failures: string[] = [];
    page.on('pageerror', (error) => failures.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') failures.push(message.text());
    });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await page.evaluate(() => document.fonts.ready);
    const imageSources = await page
      .locator('img')
      .evaluateAll((images) => images.map((img) => (img as HTMLImageElement).src));
    for (const source of imageSources) {
      const imageResponse = await request.get(source);
      expect(imageResponse.status(), `${route} has a missing image: ${source}`).toBe(200);
      expect(imageResponse.headers()['content-type']).toMatch(/^image\//);
    }
    const invalidNesting = await page.locator('button button, a a, a button, button a').count();
    expect(invalidNesting).toBe(0);
    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((links) => [
        ...new Set(
          links
            .map((link) => link.getAttribute('href')!)
            .filter((href) => href.startsWith('/') && !href.startsWith('//')),
        ),
      ]);
    for (const href of hrefs) {
      const result = await request.get(href.split('#')[0]);
      expect(result.status(), `${route} has broken link ${href}`).toBe(200);
    }
    expect(failures).toEqual([]);
  });
for (const width of [320, 375, 430, 768, 1024, 1280, 1440])
  test(`responsive major-route matrix: ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    for (const route of majorRoutes) {
      await page.goto(route);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('.loading-state')).toHaveCount(0);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${route} overflows at ${width}px`,
      ).toBe(true);
      await expect(page.locator('main')).toBeVisible();
      const clippedCampaignHeadings = await page
        .locator('.campaign-art h3, .display-unit h3, .poster h3')
        .evaluateAll((headings) =>
          headings
            .filter((heading) => {
              const range = document.createRange();
              range.selectNodeContents(heading);
              const text = range.getBoundingClientRect();
              const box = heading.getBoundingClientRect();
              return text.right > box.right + 1 || text.left < box.left - 1;
            })
            .map((heading) => heading.textContent),
        );
      expect(clippedCampaignHeadings, `${route} clips campaign copy at ${width}px`).toEqual([]);
      if (width === 1440 || width === 375) {
        await page.screenshot({
          path: `portfolio-assets/screenshots/${route === '/' ? 'home' : route.replaceAll('/', '-').replace(/^-|-$/g, '')}-${width}.png`,
          fullPage: route === '/' || route === '/campaign/' || route === '/brand/',
        });
      }
    }
  });
for (const route of [
  ...majorRoutes,
  '/login/',
  '/member/profile/',
  '/vaccinations/',
  '/prescriptions/',
  '/resources/',
  '/health-services/screenings/',
  '/locations/maple-square/',
  '/resources/a-little-preparation/',
])
  test(`automated accessibility: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('.loading-state')).toHaveCount(0);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({ html: n.html, summary: n.failureSummary })),
      })),
    ).toEqual([]);
  });
test('locator search, empty state, filters, and map selection', async ({ page }) => {
  await page.goto('/locations/');
  await page.getByLabel('City, ZIP, or neighborhood').fill('no-such-neighborhood');
  await expect(page.getByRole('heading', { name: 'No locations match just yet.' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
  await expect(page.locator('.location-card')).toHaveCount(4);
  await page.getByLabel('What brings you in?').selectOption('wellness-consultations');
  await expect(page.locator('.location-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'Select River Walk on map' }).click();
  await expect(page.locator('.map-selected')).toContainText('River Walk');
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await page.getByLabel('Open in demo', { exact: true }).check();
  await expect(page.locator('.location-card')).toHaveCount(3);
  await page.getByLabel('City, ZIP, or neighborhood').fill('00001');
  await expect(page.locator('.location-card')).toHaveCount(1);
});
test('eight-step booking validates, retains state, confirms and connects to member appointments', async ({
  page,
}) => {
  await page.goto('/appointments/');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.locator('main').getByRole('alert')).toHaveText('Choose a service to continue.');
  await page.getByRole('button', { name: 'Health screenings 30-minute demo visit' }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.locator('h1')).toBeFocused();
  await page
    .getByRole('button', { name: 'West Garden', exact: false })
    .isDisabled()
    .then((v) => expect(v).toBe(true));
  await page.getByRole('button', { name: 'Maple Square', exact: false }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const dates = page.locator('.date-choice');
  expect(await dates.count()).toBe(8);
  await dates.nth(0).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: '10:30 am', exact: true }).click();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.locator('.date-choice[aria-pressed="true"]')).toHaveCount(1);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByRole('button', { name: '10:30 am', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Continue as a guest', exact: false }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Review visit' }).click();
  await expect(page.getByLabel('Name', { exact: true })).toBeFocused();
  await expect(page.getByText('Enter a valid email, such as alex@example.com.')).toBeVisible();
  await page.getByLabel('Name', { exact: true }).fill('Jamie Demo');
  await page.getByLabel('Email', { exact: true }).fill('jamie@example.com');
  await page.getByLabel('I understand this is a portfolio concept').check();
  await page.getByRole('button', { name: 'Review visit' }).click();
  await expect(page.locator('.review-list')).toContainText('Health screenings');
  await page.getByRole('button', { name: 'Confirm demo appointment' }).click();
  await expect(page.locator('h1')).toHaveText('Your demo visit is on the calendar.');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download demo calendar event' }).click();
  expect((await downloadPromise).suggestedFilename()).toBe('alder-row-demo-appointment.ics');
  await page.getByRole('link', { name: 'View your demo appointments' }).click();
  await expect(page.locator('.appointments-list')).toContainText('Health screenings');
});
test('prescription refill, pickup changes, reminder and native dialog keyboard behavior', async ({
  page,
}) => {
  await page.goto('/member/prescriptions/');
  const card = page
    .locator('.prescription-card')
    .filter({ has: page.getByRole('heading', { name: 'Sample medication B', exact: true }) });
  await card.getByRole('button', { name: 'Request demo refill' }).click();
  await expect(card).toContainText('Refill requested');
  await expect(page.locator('.toast')).toContainText('No prescription was transmitted');
  await card.getByRole('button', { name: 'Change pickup' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByLabel('Pickup location', { exact: true }).selectOption('river-walk');
  await page.getByRole('button', { name: 'Save demo pickup' }).click();
  await expect(card).toContainText('River Walk');
  await card.getByRole('button', { name: 'Add task reminder' }).click();
  await expect(card.getByRole('button', { name: 'Reminder on' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await card.getByRole('button', { name: 'View details' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.activeElement?.closest('dialog') !== null)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(card.getByRole('button', { name: 'View details' })).toBeFocused();
});
test('profile validation and preferred location update', async ({ page }) => {
  await page.goto('/member/profile/');
  await page.getByLabel('Name', { exact: true }).fill('');
  await page.getByRole('button', { name: 'Save demo profile' }).click();
  await expect(page.getByText('Enter a name with at least two characters.')).toBeVisible();
  await page.getByLabel('Name', { exact: true }).fill('Sam Demo');
  await page.getByLabel('Preferred location').selectOption('cedar-market');
  await page.getByRole('button', { name: 'Save demo profile' }).click();
  await page
    .getByRole('navigation', { name: 'Member navigation' })
    .getByRole('link', { name: 'Overview' })
    .click();
  await expect(page.locator('h1')).toHaveText('Hello, Sam.');
  await expect(page.locator('.preferred-store')).toContainText('Cedar Market');
});
test('demo benefit redemption is idempotent', async ({ page }) => {
  await page.goto('/member/benefits/');
  await page.getByRole('button', { name: 'Explore with 25 demo credits' }).click();
  await expect(page.getByRole('button', { name: 'Demo offer saved' })).toBeDisabled();
  await expect(page.locator('.benefits-credit')).toContainText('35');
});
test('appointment cancellation requires confirmation and updates history', async ({ page }) => {
  await page.goto('/member/appointments/');
  await page.getByRole('button', { name: 'Cancel demo visit' }).click();
  await page.getByRole('button', { name: 'Keep appointment' }).click();
  await expect(page.locator('.appointment-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Cancel demo visit' }).click();
  await page.getByRole('button', { name: 'Cancel demo appointment' }).click();
  await expect(
    page.getByRole('heading', { name: 'A little room on your calendar.' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Cancelled', exact: true }).click();
  await expect(page.locator('.appointment-card')).toContainText('Cancelled');
});
test('mobile menu, Escape, skip link and keyboard navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
});
test('login validation and password-reset feedback', async ({ page }) => {
  await page.goto('/login/');
  await page.getByRole('button', { name: 'Open demo member space' }).click();
  await expect(page.getByLabel('Sample email', { exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Forgot password?' }).click();
  await page.getByLabel('Sample email', { exact: true }).fill('alex@example.com');
  await page.getByRole('button', { name: 'Preview reset request' }).click();
  await expect(
    page.getByRole('status').filter({ hasText: 'Demo reset request confirmed' }),
  ).toBeVisible();
});

test('standalone email previews reflow and meet automated contrast and semantic checks', async ({
  page,
}) => {
  for (const slug of ['seasonal-services', 'prescription-ready', 'appointment-confirmation']) {
    for (const width of [320, 375, 430, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 960 });
      const response = await page.goto(`/campaign/email/${slug}.html`);
      expect(response?.status()).toBe(200);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      await expect(page.locator('h1')).toHaveCount(1);
    }
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.failureSummary) })),
    ).toEqual([]);
  }
});

test('creative export sizes and text remain inside their artboards', async ({ page }) => {
  const { campaigns } = await import('../src/data/content');
  const { default: sharp } = await import('sharp');
  const exports = campaigns.flatMap((c) =>
    [
      [1080, 1080],
      [1080, 1350],
      [1080, 1920],
    ].map(([width, height]) => ({ path: `social/${c.slug}-${width}x${height}`, width, height })),
  );
  exports.push(
    ...[
      [300, 250],
      [728, 90],
      [160, 600],
      [970, 250],
    ].map(([width, height]) => ({
      path: `display/neighborhood-${width}x${height}`,
      width,
      height,
    })),
  );
  exports.push(
    ...campaigns
      .slice(0, 3)
      .map((c) => ({ path: `posters/${c.slug}-1200x1800`, width: 1200, height: 1800 })),
  );
  for (const asset of exports) {
    const metadata = await sharp(`public/campaign/${asset.path}.png`).metadata();
    expect([metadata.width, metadata.height]).toEqual([asset.width, asset.height]);
    await page.goto(`/campaign/${asset.path}.svg`);
    await page.evaluate(() => document.fonts.ready);
    const outside = await page.locator('svg text').evaluateAll(
      (nodes, size) =>
        nodes
          .filter((node) => {
            const box = (node as SVGGraphicsElement).getBBox();
            return (
              box.x < 0 ||
              box.x + box.width > size.width ||
              box.y < 0 ||
              box.y + box.height > size.height
            );
          })
          .map((node) => node.textContent),
      { width: asset.width, height: asset.height },
    );
    expect(outside, `Clipped copy in ${asset.path}`).toEqual([]);
  }
});
