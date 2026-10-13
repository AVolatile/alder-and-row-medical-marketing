'use client';
import { useState } from 'react';
import { useDemo } from './demo-provider';
import { locations } from '@/data/content';
import { formatDate } from '@/lib/utils';
import { Badge, Field, Icon, Notice } from './ui';
import { Modal } from './modal';
import type { Prescription } from '@/types';
export function PrescriptionCard({
  prescription: p,
  onDetails,
  onPickup,
}: {
  prescription: Prescription;
  onDetails: () => void;
  onPickup: () => void;
}) {
  const { updatePrescription, notify } = useDemo();
  const location = locations.find((l) => l.slug === p.location)!;
  const refill = () => {
    updatePrescription(p.id, { status: 'Refill requested' });
    notify(`Demo refill requested for ${p.name}. No prescription was transmitted.`);
  };
  return (
    <article className="prescription-card">
      <div className="prescription-card-top">
        <Icon name="bag" size={27} />
        <Badge
          tone={
            p.status === 'Review needed'
              ? 'amber'
              : p.status === 'Refill available'
                ? 'neutral'
                : 'green'
          }
        >
          {p.status}
        </Badge>
      </div>
      <h2>{p.name}</h2>
      <p className="rx-strength">
        {p.strength} · {p.id}
      </p>
      <dl>
        <div>
          <dt>Refills available</dt>
          <dd>{p.refills}</dd>
        </div>
        <div>
          <dt>Pickup location</dt>
          <dd>{location.name}</dd>
        </div>
        <div>
          <dt>Last filled</dt>
          <dd>{formatDate(p.lastFilled)}</dd>
        </div>
        <div>
          <dt>Demo refill date</dt>
          <dd>{formatDate(p.refillDate)}</dd>
        </div>
      </dl>
      {p.status === 'Review needed' && (
        <p className="rx-review-notice">
          This sample has no refills available. A live pharmacy would ask you to contact a qualified
          professional.
        </p>
      )}
      <div className="rx-actions">
        <button
          className="button button-primary"
          disabled={p.status !== 'Refill available' || p.refills === 0}
          onClick={refill}
        >
          {p.status === 'Refill requested'
            ? 'Request recorded'
            : p.status === 'Ready for pickup'
              ? 'Ready for pickup'
              : p.status === 'Review needed'
                ? 'Refill unavailable'
                : 'Request demo refill'}
        </button>
        <button className="button button-text" onClick={onDetails}>
          View details
          <Icon name="arrow" size={16} />
        </button>
      </div>
      <div className="rx-secondary-actions">
        <button className="button button-text" onClick={onPickup}>
          <Icon name="pin" size={15} />
          Change pickup
        </button>
        <button
          className="button button-text"
          aria-pressed={p.reminder}
          onClick={() => {
            updatePrescription(p.id, { reminder: !p.reminder });
            notify(
              `Demo task reminder ${p.reminder ? 'turned off' : 'turned on'}. No notification is sent.`,
            );
          }}
        >
          <Icon name="bell" size={15} />
          {p.reminder ? 'Reminder on' : 'Add task reminder'}
        </button>
      </div>
    </article>
  );
}
export function MemberPrescriptions() {
  const { prescriptions, updatePrescription, notify } = useDemo();
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState<{ type: 'detail' | 'pickup'; id: string } | null>(null);
  const [pickup, setPickup] = useState('');
  const selected = prescriptions.find((p) => p.id === modal?.id);
  const results = prescriptions.filter(
    (p) =>
      filter === 'All' ||
      (filter === 'Ready for pickup'
        ? p.status === 'Ready for pickup'
        : p.status === 'Refill available'),
  );
  return (
    <>
      <div className="member-page-header">
        <div>
          <span className="eyebrow">YOUR EVERYDAY PHARMACY TASKS</span>
          <h1>Your prescriptions.</h1>
          <p>See where things stand. Plan a pickup. Request a simulated refill.</p>
        </div>
        <Badge tone="neutral">{prescriptions.length} demo prescriptions</Badge>
      </div>
      <Notice>
        All medication names and strengths are fictional display information. No medical
        instructions, real prescriptions, or pharmacy transmissions.
      </Notice>
      <div className="tabs" role="group" aria-label="Filter prescriptions">
        {['All', 'Ready for pickup', 'Refill available'].map((item) => (
          <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <p className="eyebrow" role="status">
        {results.length} {results.length === 1 ? 'PRESCRIPTION' : 'PRESCRIPTIONS'} SHOWN
      </p>
      <div className="prescription-grid">
        {results.map((p) => (
          <PrescriptionCard
            key={p.id}
            prescription={p}
            onDetails={() => setModal({ type: 'detail', id: p.id })}
            onPickup={() => {
              setPickup(p.location);
              setModal({ type: 'pickup', id: p.id });
            }}
          />
        ))}
      </div>
      {results.length === 0 && (
        <div className="empty-state">
          <h3>No prescriptions in this view.</h3>
          <p>Try All to see your demo records.</p>
          <button className="button button-primary" onClick={() => setFilter('All')}>
            View all prescriptions
          </button>
        </div>
      )}
      {modal && selected && (
        <Modal
          title={modal.type === 'detail' ? selected.name : 'Choose your pickup place'}
          onClose={() => setModal(null)}
        >
          {modal.type === 'detail' ? (
            <>
              <Badge tone={selected.status === 'Review needed' ? 'amber' : 'green'}>
                {selected.status}
              </Badge>
              <dl className="review-list">
                <div>
                  <dt>Demo ID</dt>
                  <dd>{selected.id}</dd>
                </div>
                <div>
                  <dt>Display strength</dt>
                  <dd>{selected.strength}</dd>
                </div>
                <div>
                  <dt>Refills</dt>
                  <dd>{selected.refills} available in demo</dd>
                </div>
                <div>
                  <dt>Pickup</dt>
                  <dd>{locations.find((l) => l.slug === selected.location)?.name}</dd>
                </div>
                <div>
                  <dt>Task reminders</dt>
                  <dd>{selected.reminder ? 'On' : 'Off'} · no notifications sent</dd>
                </div>
              </dl>
              <Notice>
                Questions about medication should be discussed with a qualified professional. This
                is fictional data.
              </Notice>
              <button className="button button-primary" onClick={() => setModal(null)}>
                Done
              </button>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updatePrescription(selected.id, { location: pickup });
                setModal(null);
                notify('Demo pickup location updated. No pharmacy was contacted.');
              }}
            >
              <p>Pick a location for {selected.name}. This changes the local demo only.</p>
              <Field id="pickup-location" label="Pickup location">
                <select
                  id="pickup-location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  required
                >
                  {locations.map((l) => (
                    <option key={l.slug} value={l.slug}>
                      {l.name} · {l.city}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="actions">
                <button type="submit" className="button button-primary">
                  Save demo pickup
                </button>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setModal(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </>
  );
}
