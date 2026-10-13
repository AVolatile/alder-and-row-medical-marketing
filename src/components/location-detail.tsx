'use client';
import { services } from '@/data/content';
import type { Location } from '@/types';
import { ActionLink, Badge, Breadcrumbs, Icon, Notice, PageIntro } from './ui';
import { useDemo } from './demo-provider';
export function LocationDetail({ location }: { location: Location }) {
  const { notify } = useDemo();
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Locations', href: '/locations' }, { label: location.name }]} />
      <div className="detail-hero">
        <PageIntro
          eyebrow={`YOUR ${location.neighborhood.toUpperCase()} CONCEPT LOCATION`}
          title={`Alder & Row ${location.name}`}
          text={`${location.address} · ${location.city}, ${location.zip}`}
        >
          <ActionLink href={`/appointments?location=${location.slug}`}>Schedule here</ActionLink>
          <button
            className="button button-secondary"
            onClick={() =>
              notify('This address is fictional. Directions are unavailable in the concept.')
            }
          >
            <Icon name="pin" size={18} />
            Directions concept
          </button>
        </PageIntro>
        <div className="retail-sign surface-forest">
          <span>YOUR NEIGHBORHOOD</span>
          <strong>alder & row</strong>
          <span>PHARMACY & EVERYDAY CARE</span>
          <div className="retail-door" />
        </div>
      </div>
      <div className="location-details-grid">
        <div>
          <div className="section-heading">
            <h2>A place for your everyday.</h2>
            <Badge tone={location.open ? 'green' : 'neutral'}>
              {location.open ? 'Open in demo' : 'Closed in demo'}
            </Badge>
          </div>
          <p>
            Explore the service concepts available at {location.name}. Pharmacy pickup and private
            conversations share a warm, accessible neighborhood space.
          </p>
          <h3>Services at this location</h3>
          <div className="inline-services">
            {location.services.map((slug) => {
              const s = services.find((s) => s.slug === slug)!;
              return (
                <a key={slug} href={`/health-services/${slug}/`}>
                  <Icon name={s.icon} size={20} />
                  {s.name}
                  <Icon name="arrow" size={18} />
                </a>
              );
            })}
          </div>
          <h3>Access & comfort</h3>
          <div className="access-grid">
            {[
              'Step-free entry',
              'Accessible seating',
              'Private consultation space',
              'Written information on request',
            ].map((s) => (
              <span key={s}>
                <Icon name="access" size={18} />
                {s}
              </span>
            ))}
          </div>
          <Notice>
            Accessibility features are concept specifications. No real location or service is
            represented.
          </Notice>
        </div>
        <aside className="hours-card">
          <Icon name="clock" size={25} />
          <h3>Location hours</h3>
          <dl>
            {['Monday – Friday', 'Saturday', 'Sunday'].map((day, i) => (
              <div key={day}>
                <dt>{day}</dt>
                <dd>{i === 0 ? location.hours : i === 1 ? '10:00 am – 5:00 pm' : 'Closed'}</dd>
              </div>
            ))}
          </dl>
          <h3>Pharmacy hours</h3>
          <p>
            Monday – Friday
            <br />
            10:00 am – 6:00 pm
          </p>
          <h3>Contact concept</h3>
          <p>
            (202) 555-0146
            <br />
            hello@alderandrow.example
          </p>
          <small>Fictional, non-operational contact details.</small>
          <ActionLink href={`/appointments?location=${location.slug}`}>
            Choose an appointment
          </ActionLink>
        </aside>
      </div>
      <div className="section-spacer" />
    </div>
  );
}
