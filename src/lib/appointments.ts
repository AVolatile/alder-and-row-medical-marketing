import type { Appointment } from '@/types';

function minutesFromMidnight(time: string) {
  const [clock, period] = time.split(' ');
  const [hour, minute] = clock.split(':').map(Number);
  return ((hour % 12) + (period === 'pm' ? 12 : 0)) * 60 + minute;
}

export function getUpcomingAppointments(appointments: readonly Appointment[]) {
  return appointments
    .filter((appointment) => appointment.status === 'Upcoming')
    .sort((left, right) => {
      const dateOrder = left.date.localeCompare(right.date);
      return dateOrder || minutesFromMidnight(left.time) - minutesFromMidnight(right.time);
    });
}
