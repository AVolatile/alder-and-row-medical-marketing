'use client';
import { useState } from 'react';
import {
  ActionLink,
  Accordion,
  Breadcrumbs,
  Icon,
  Notice,
  PageIntro,
  SectionHeading,
  Field,
} from './ui';
import { locations } from '@/data/content';
import { useDemo } from './demo-provider';
export function PrescriptionsPublic() {
  const [submitted, setSubmitted] = useState(false);
  const { notify } = useDemo();
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Prescriptions' }]} />
      <div className="detail-hero">
        <PageIntro
          eyebrow="ONE LESS THING ON YOUR LIST"
          title="Your pharmacy tasks. All together."
          text="See pickup status, request a refill, choose a location, and set task reminders. Keep the small things from taking up your whole day."
        >
          <ActionLink href="/member/prescriptions">Manage demo prescriptions</ActionLink>
          <ActionLink href="#transfer" variant="secondary">
            Explore a transfer
          </ActionLink>
        </PageIntro>
        <div className="service-detail-art surface-sand">
          <div className="editorial-orbit" />
          <Icon name="bag" size={110} />
          <span>MORE OF YOUR DAY.</span>
        </div>
      </div>
      <section className="section">
        <SectionHeading title="Clear from request to pickup." />
        <div className="process-grid">
          {[
            {
              title: 'Request',
              text: 'See refill availability and submit a simulated request in your member space.',
            },
            {
              title: 'Keep track',
              text: 'Review status, your selected location, and last-filled demo dates.',
            },
            { title: 'Pick up', text: 'See pickup information and location details in one place.' },
          ].map((item, i) => (
            <div key={item.title}>
              <span className="process-number">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="transfer" className="transfer-panel">
        <div>
          <span className="eyebrow">A FAMILIAR PLACE TO START</span>
          <h2>Thinking about a transfer?</h2>
          <p>
            Explore the first step: choosing a neighborhood location. In a live service, a pharmacy
            team would handle the secure transfer process.
          </p>
          <Notice>No prescription details are collected or transmitted.</Notice>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            notify('Transfer interest noted in the demo. No pharmacy has been contacted.');
          }}
        >
          <Field id="transfer-location" label="Choose your demo pharmacy">
            <select id="transfer-location" required>
              {locations.map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.name} · {l.city}
                </option>
              ))}
            </select>
          </Field>
          <label className="checkbox">
            <input type="checkbox" required />I understand this is a concept, with no real transfer.
          </label>
          <button className="button button-primary" type="submit" disabled={submitted}>
            {submitted ? 'Demo interest recorded' : 'Explore transfer next steps'}
            <Icon name="arrow" size={18} />
          </button>
          {submitted && (
            <p role="status">
              In a live service, the pharmacy team would explain the secure intake process. No
              transfer has been started.
            </p>
          )}
        </form>
      </section>
      <section className="section">
        <h2>A few useful answers.</h2>
        <Accordion
          items={[
            {
              title: 'Are these real prescriptions?',
              text: 'No. Every medication name, strength, and prescription record is fictional demo information. Nothing is sent to a pharmacy.',
            },
            {
              title: 'Can I change a pickup location?',
              text: 'Yes. Open a demo prescription and choose another location. The change stays in memory while you explore this app.',
            },
            {
              title: 'What do reminders do?',
              text: 'The demo lets you set a pharmacy task reminder preference. It does not send notifications or provide medication instructions.',
            },
            {
              title: 'What happens when I request a refill?',
              text: 'The interface changes the demo status to Refill requested. There is no prescription transmission or clinical fulfillment.',
            },
          ]}
        />
      </section>
    </div>
  );
}
