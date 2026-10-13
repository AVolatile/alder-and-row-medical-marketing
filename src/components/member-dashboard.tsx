'use client';
import Link from 'next/link';
import { useDemo } from './demo-provider';
import { ActionLink, Badge, Icon, SectionHeading } from './ui';
import { ArticleCard, AppointmentCard } from './cards';
import { articles, locations } from '@/data/content';
import { getUpcomingAppointments } from '@/lib/appointments';
export function MemberDashboard() {
  const { profile, prescriptions, appointments } = useDemo();
  const upcoming = getUpcomingAppointments(appointments);
  const next = upcoming[0];
  const location = locations.find((l) => l.slug === profile.location)!;
  const ready = prescriptions.filter((p) => p.status === 'Ready for pickup');
  return (
    <>
      <div className="member-welcome">
        <div>
          <span className="eyebrow">A LITTLE CLOSER TO YOUR EVERYDAY</span>
          <h1>Hello, {profile.name.split(' ')[0]}.</h1>
          <p>A little less to keep track of. A little more day.</p>
        </div>
        <ActionLink href="/appointments">Schedule care</ActionLink>
      </div>
      <div className="member-main-grid">
        <section className="member-panel">
          <SectionHeading
            title="Your next visit"
            link="/member/appointments"
            linkLabel="All appointments"
          />
          {next ? (
            <AppointmentCard appointment={next} />
          ) : (
            <div className="empty-state">
              <h3>A little time for you.</h3>
              <p>Choose a service and explore a demo visit.</p>
              <ActionLink href="/appointments">Find a time</ActionLink>
            </div>
          )}
          <div className="member-task">
            <Icon name="calendar" size={23} />
            <div>
              <strong>Bring your questions.</strong>
              <p>A few notes can make the conversation more useful.</p>
            </div>
            <Link
              href="/resources/a-little-preparation"
              aria-label="Read about appointment preparation"
            >
              <Icon name="arrow" />
            </Link>
          </div>
        </section>
        <section className="member-panel pharmacy-overview">
          <SectionHeading
            title="Your pharmacy"
            link="/member/prescriptions"
            linkLabel="View prescriptions"
          />
          <div className="rx-count">
            <strong>{ready.length}</strong>
            <div>
              <Badge>Ready for pickup</Badge>
              <p>At your demo neighborhood pharmacy.</p>
            </div>
          </div>
          {prescriptions.slice(0, 2).map((p) => (
            <div className="rx-overview-row" key={p.id}>
              <Icon name="bag" size={21} />
              <div>
                <strong>{p.name}</strong>
                <span>{p.id}</span>
              </div>
              <Badge tone={p.status === 'Ready for pickup' ? 'green' : 'neutral'}>{p.status}</Badge>
            </div>
          ))}
        </section>
      </div>
      <div className="member-secondary-grid">
        <section className="preferred-store surface-sage">
          <Icon name="pin" size={28} />
          <span className="eyebrow">YOUR FAMILIAR PLACE</span>
          <h2>{location.name}</h2>
          <p>
            {location.address} · {location.city}
          </p>
          <Badge>Preferred demo location</Badge>
          <div className="actions">
            <ActionLink href={`/locations/${location.slug}`} variant="text">
              Location details
            </ActionLink>
            <Link href="/member/profile">Change</Link>
          </div>
        </section>
        <section className="benefit-preview surface-peach">
          <Icon name="gift" size={28} />
          <span className="eyebrow">A LITTLE EXTRA FOR MEMBERS</span>
          <h2>More to explore.</h2>
          <p>Wellness service offers and member-credit concepts, together in your space.</p>
          <ActionLink href="/member/benefits" variant="text">
            See member benefits
          </ActionLink>
        </section>
        <section className="member-panel">
          <h2>A quick check-in.</h2>
          <Link className="account-task" href="/member/profile">
            <Icon name="user" />
            <span>
              Review your contact preferences<small>Keep your demo profile up to date.</small>
            </span>
            <Icon name="arrow" size={18} />
          </Link>
          <Link className="account-task" href="/health-services/preventative-services">
            <Icon name="sun" />
            <span>
              Make room for a preventative visit<small>Explore service concepts.</small>
            </span>
            <Icon name="arrow" size={18} />
          </Link>
        </section>
      </div>
      <section className="recent-activity">
        <SectionHeading title="Around your member space" />
        <ul>
          {prescriptions
            .filter((p) => p.status === 'Refill requested')
            .map((p) => (
              <li key={p.id}>
                <Icon name="bag" size={18} />
                <span>Demo refill requested for {p.name}</span>
                <Badge>Requested</Badge>
              </li>
            ))}
          {ready.map((prescription) => (
            <li key={prescription.id}>
              <Icon name="check" size={18} />
              <span>
                {prescription.name} is ready at{' '}
                {locations.find((place) => place.slug === prescription.location)?.name ??
                  'your selected pharmacy'}
              </span>
              <small>Demo pickup status</small>
            </li>
          ))}
          <li>
            <Icon name="calendar" size={18} />
            <span>
              {upcoming.length} upcoming demo {upcoming.length === 1 ? 'visit' : 'visits'} in your
              member space
            </span>
            <small>Current session</small>
          </li>
        </ul>
      </section>
      <section className="section">
        <SectionHeading
          eyebrow="FROM THE READING ROOM"
          title="A useful read for your day."
          link="/resources"
          linkLabel="Browse resources"
        />
        <div className="grid-three">
          {articles.slice(0, 3).map((a) => (
            <ArticleCard article={a} key={a.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
