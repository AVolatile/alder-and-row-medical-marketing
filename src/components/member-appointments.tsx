'use client';
import { useState } from 'react';
import { useDemo } from './demo-provider';
import { ActionLink, EmptyState } from './ui';
import { AppointmentCard } from './cards';
import { Modal } from './modal';
import { getUpcomingAppointments } from '@/lib/appointments';
export function MemberAppointments() {
  const { appointments, cancelAppointment, notify } = useDemo();
  const [filter, setFilter] = useState('Upcoming');
  const [cancel, setCancel] = useState('');
  const results =
    filter === 'Upcoming'
      ? getUpcomingAppointments(appointments)
      : appointments.filter((appointment) => filter === 'All' || appointment.status === filter);
  return (
    <>
      <div className="member-page-header">
        <div>
          <span className="eyebrow">A LITTLE TIME, THOUGHTFULLY PLANNED</span>
          <h1>Your appointments.</h1>
          <p>Keep the time, the place, and the next step together.</p>
        </div>
        <ActionLink href="/appointments">Schedule care</ActionLink>
      </div>
      <div className="tabs" role="group" aria-label="Filter appointments">
        {['Upcoming', 'Completed', 'Cancelled', 'All'].map((item) => (
          <button key={item} aria-pressed={item === filter} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <p className="eyebrow" role="status">
        {results.length} DEMO {results.length === 1 ? 'APPOINTMENT' : 'APPOINTMENTS'}
      </p>
      <div className="appointments-list">
        {results.length ? (
          results.map((a) => (
            <AppointmentCard key={a.id} appointment={a}>
              {a.status === 'Upcoming' && (
                <>
                  <ActionLink
                    href={`/appointments?location=${a.location}`}
                    variant="secondary"
                    icon={false}
                  >
                    Book another visit
                  </ActionLink>
                  <button className="button button-text" onClick={() => setCancel(a.id)}>
                    Cancel demo visit
                  </button>
                </>
              )}
              {a.status === 'Completed' && (
                <ActionLink href="/appointments" variant="text">
                  Find another time
                </ActionLink>
              )}
            </AppointmentCard>
          ))
        ) : (
          <EmptyState
            title="A little room on your calendar."
            text={`There are no ${filter.toLowerCase()} demo visits in this view.`}
          >
            <ActionLink href="/appointments">Find an appointment</ActionLink>
          </EmptyState>
        )}
      </div>
      {cancel && (
        <Modal title="Cancel this demo visit?" onClose={() => setCancel('')}>
          <p>
            The appointment will move to Cancelled in your demo history. No real care team will be
            notified.
          </p>
          <div className="actions">
            <button
              className="button button-primary"
              onClick={() => {
                cancelAppointment(cancel);
                setCancel('');
                notify('Demo appointment cancelled. No real booking was affected.');
              }}
            >
              Cancel demo appointment
            </button>
            <button className="button button-secondary" onClick={() => setCancel('')}>
              Keep appointment
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
