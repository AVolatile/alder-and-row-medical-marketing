import { expect, test, type Page } from '@playwright/test';
import { getUpcomingAppointments } from '../src/lib/appointments';
import type { Appointment } from '../src/types';

test('upcoming appointments respect date, morning, noon, and midnight without mutating records', () => {
  const records: Appointment[] = [
    {
      id: 'afternoon',
      date: '2026-10-20',
      time: '2:30 pm',
      status: 'Upcoming',
      service: 'Screenings',
      location: 'maple-square',
    },
    {
      id: 'later-date',
      date: '2026-10-21',
      time: '9:00 am',
      status: 'Upcoming',
      service: 'Screenings',
      location: 'maple-square',
    },
    {
      id: 'noon',
      date: '2026-10-20',
      time: '12:00 pm',
      status: 'Upcoming',
      service: 'Screenings',
      location: 'maple-square',
    },
    {
      id: 'completed',
      date: '2026-10-19',
      time: '9:00 am',
      status: 'Completed',
      service: 'Screenings',
      location: 'maple-square',
    },
    {
      id: 'morning',
      date: '2026-10-20',
      time: '10:30 am',
      status: 'Upcoming',
      service: 'Screenings',
      location: 'maple-square',
    },
    {
      id: 'cancelled',
      date: '2026-10-19',
      time: '9:00 am',
      status: 'Cancelled',
      service: 'Screenings',
      location: 'maple-square',
    },
    {
      id: 'midnight',
      date: '2026-10-20',
      time: '12:00 am',
      status: 'Upcoming',
      service: 'Screenings',
      location: 'maple-square',
    },
  ];
  const originalIds = records.map((record) => record.id);
  expect(getUpcomingAppointments(records).map((record) => record.id)).toEqual([
    'midnight',
    'morning',
    'noon',
    'afternoon',
    'later-date',
  ]);
  expect(records.map((record) => record.id)).toEqual(originalIds);
  expect(getUpcomingAppointments([])).toEqual([]);
});

test('changing a ready prescription pickup location updates overview activity', async ({
  page,
}) => {
  await page.goto('/member/prescriptions/');
  const prescription = page
    .locator('.prescription-card')
    .filter({ has: page.getByRole('heading', { name: 'Sample medication A', exact: true }) });
  await prescription.getByRole('button', { name: 'Change pickup' }).click();
  await page.getByLabel('Pickup location', { exact: true }).selectOption('river-walk');
  await page.getByRole('button', { name: 'Save demo pickup' }).click();
  await page
    .getByRole('navigation', { name: 'Member navigation' })
    .getByRole('link', { name: 'Overview', exact: true })
    .click();
  await expect(page.locator('.recent-activity')).toContainText(
    'Sample medication A is ready at River Walk',
  );
  await expect(page.locator('.recent-activity')).not.toContainText('Maple Square');
});

async function bookVisit(page: Page, service: string, time: string) {
  await page.locator('header').getByRole('link', { name: 'Schedule care', exact: true }).click();
  await page.getByRole('button', { name: service, exact: false }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Maple Square', exact: false }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const dates = page.locator('.date-choice');
  await expect(dates).toHaveCount(8);
  await dates.nth(0).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: time, exact: true }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Continue as a demo member', exact: false }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByLabel('I understand this is a portfolio concept').check();
  await page.getByRole('button', { name: 'Review visit' }).click();
  await page.getByRole('button', { name: 'Confirm demo appointment' }).click();
  await page.getByRole('link', { name: 'View your demo appointments' }).click();
}

test('booking a later visit keeps the earliest appointment first in the list and overview', async ({
  page,
}) => {
  await page.goto('/member/appointments/');
  await page.getByRole('button', { name: 'Cancel demo visit' }).click();
  await page.getByRole('button', { name: 'Cancel demo appointment' }).click();
  await bookVisit(page, 'Health screenings', '9:00 am');
  await bookVisit(page, 'Wellness consultations', '4:00 pm');
  const appointments = page.locator('.appointments-list .appointment-card');
  await expect(appointments).toHaveCount(2);
  await expect(appointments.nth(0)).toContainText('Health screenings');
  await expect(appointments.nth(0)).toContainText('9:00 am');
  await expect(appointments.nth(1)).toContainText('4:00 pm');
  await page
    .getByRole('navigation', { name: 'Member navigation' })
    .getByRole('link', { name: 'Overview', exact: true })
    .click();
  const nextVisit = page.locator('.member-main-grid .appointment-card');
  await expect(nextVisit).toHaveCount(1);
  await expect(nextVisit).toContainText('Health screenings');
  await expect(nextVisit).toContainText('9:00 am');
});
