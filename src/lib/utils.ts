export function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(
    'en-US',
    options ?? { month: 'short', day: 'numeric', year: 'numeric' },
  ).format(new Date(`${date}T12:00:00`));
}
export function upcomingDates(count = 8) {
  const date = new Date();
  const eastern = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const get = (type: string) => eastern.find((p) => p.type === type)?.value;
  const base = new Date(`${get('year')}-${get('month')}-${get('day')}T12:00:00`);
  return Array.from({ length: count }, (_, i) => {
    const next = new Date(base);
    next.setDate(base.getDate() + i + 1);
    return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`;
  });
}
export const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
