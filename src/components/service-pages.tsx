import { services } from '@/data/content';
import {
  ActionLink,
  Accordion,
  Breadcrumbs,
  CTABand,
  Icon,
  Notice,
  PageIntro,
  SectionHeading,
} from './ui';
import { ServiceCard } from './cards';
import type { Service } from '@/types';
export function ServicesHub() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Health services' }]} />
      <PageIntro
        eyebrow="EVERYDAY CARE, CLOSE BY"
        title="Make time for the things that matter."
        text="A check-in. A question. A conversation you have been putting off. Explore our service concepts and find a place to start."
      >
        <ActionLink href="/appointments">Find an appointment</ActionLink>
        <ActionLink href="/locations" variant="secondary">
          Explore locations
        </ActionLink>
      </PageIntro>
      <div className="service-hub-grid">
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
      <section className="section">
        <SectionHeading eyebrow="A CLEARER NEXT STEP" title="From a question to a plan." />
        <div className="process-grid">
          {[
            {
              title: 'Find your service',
              text: 'Browse by the kind of conversation you want to have.',
            },
            {
              title: 'Choose a familiar place',
              text: 'See services, hours, and accessibility details at each location.',
            },
            {
              title: 'Make a little time',
              text: 'Select a demo appointment and keep the details in your member space.',
            },
          ].map((item, i) => (
            <div key={item.title}>
              <span className="process-number">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <Notice>
          These are fictional service experiences. A live care team would confirm eligibility,
          availability, pricing, and preparation. For medical questions, consult a qualified
          professional.
        </Notice>
      </section>
      <CTABand />
      <div className="section-spacer" />
    </div>
  );
}
export function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="container">
      <Breadcrumbs
        items={[{ label: 'Health services', href: '/health-services' }, { label: service.name }]}
      />
      <div className="detail-hero">
        <PageIntro
          eyebrow={service.category.toUpperCase()}
          title={service.short}
          text={service.description}
        >
          <ActionLink href={`/appointments?service=${service.slug}`}>Schedule a visit</ActionLink>
          <ActionLink href={`/locations?service=${service.slug}`} variant="secondary">
            Find a location
          </ActionLink>
        </PageIntro>
        <div className={`service-detail-art surface-${service.color}`}>
          <div className="editorial-orbit" />
          <Icon name={service.icon} size={110} />
          <span>{service.name}</span>
        </div>
      </div>
      <div className="detail-content">
        <div>
          <SectionHeading title="What a visit could look like." />
          <ol className="expectations">
            {service.expectations.map((item, i) => (
              <li key={item}>
                <span>{i + 1}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
          <h2>A little preparation.</h2>
          <p>{service.preparation}</p>
          <Notice>
            This page demonstrates service discovery. Appointment lengths and availability are
            illustrative; no clinical service is offered.
          </Notice>
          <section className="section">
            <h2>A few useful answers.</h2>
            <Accordion
              items={[
                {
                  title: 'How long is the appointment?',
                  text: `This demo reserves a ${service.duration}-minute appointment. In a live service, duration would depend on the service and be confirmed by the care team.`,
                },
                {
                  title: 'Is this service right for me?',
                  text: 'A qualified professional would review eligibility and suitability before providing a service. This concept cannot make clinical recommendations.',
                },
                {
                  title: 'What will the service cost?',
                  text: 'Pricing and payment options would be confirmed before a real appointment. The demo makes no pricing or insurance-coverage claims.',
                },
                {
                  title: 'Can I request accessibility support?',
                  text: 'The location detail pages demonstrate accessibility information. In a live experience, contact the team to arrange accommodations before your visit.',
                },
              ]}
            />
          </section>
        </div>
        <aside className="detail-aside">
          <Icon name="calendar" size={30} />
          <h3>A little time for you.</h3>
          <p>Illustrative duration</p>
          <strong>{service.duration} minutes</strong>
          <ActionLink href={`/appointments?service=${service.slug}`}>Choose a time</ActionLink>
          <small>Demo booking. No real appointment.</small>
        </aside>
      </div>
    </div>
  );
}
export function PharmacyPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Pharmacy' }]} />
      <div className="detail-hero">
        <PageIntro
          eyebrow="YOUR NEIGHBORHOOD PHARMACY"
          title="A familiar face. A little less to manage."
          text="A pharmacy experience built around your everyday life. Keep pickup plans, refill requests, and questions together."
        >
          <ActionLink href="/prescriptions">Explore prescriptions</ActionLink>
          <ActionLink href="/locations" variant="secondary">
            Find a pharmacy
          </ActionLink>
        </PageIntro>
        <div className="pharmacy-photo">
          <img
            src="/images/neighborhood-care.webp"
            alt="Illustrative neighborhood pharmacy conversation"
          />
        </div>
      </div>
      <section className="section">
        <SectionHeading title="The practical things, thoughtfully connected." />
        <div className="grid-three">
          {[
            {
              icon: 'bag',
              title: 'Your prescriptions',
              text: 'Check demo pickup status, request a simulated refill, and choose a neighborhood location.',
              href: '/member/prescriptions',
            },
            {
              icon: 'chat',
              title: 'Your pharmacy questions',
              text: 'Find time for a conversation. Medical and medication questions belong with a qualified pharmacist.',
              href: '/health-services/pharmacy-guidance',
            },
            {
              icon: 'bell',
              title: 'Your everyday reminders',
              text: 'Keep pharmacy tasks visible with simple member preferences and a clear overview.',
              href: '/prescriptions',
            },
          ].map((item) => (
            <div className="feature-card" key={item.title}>
              <Icon name={item.icon} size={30} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <ActionLink href={item.href} variant="text">
                Explore
              </ActionLink>
            </div>
          ))}
        </div>
      </section>
      <CTABand />
      <div className="section-spacer" />
    </div>
  );
}
export function VaccinationsPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Vaccinations' }]} />
      <div className="detail-hero">
        <PageIntro
          eyebrow="A LITTLE PLANNING, CLOSE TO HOME"
          title="Put your next visit on the calendar."
          text="Explore seasonal and preventative vaccination service concepts, or make time for a travel vaccination conversation."
        >
          <ActionLink href="/appointments?service=vaccinations">
            Explore appointment times
          </ActionLink>
          <ActionLink href="/locations?service=vaccinations" variant="secondary">
            Find a location
          </ActionLink>
        </PageIntro>
        <div className="service-detail-art surface-peach">
          <div className="editorial-orbit" />
          <Icon name="shield" size={105} />
          <span>A LITTLE PLANNING. A PLACE NEARBY.</span>
        </div>
      </div>
      <section className="section">
        <div className="grid-three">
          {[
            {
              title: 'Seasonal vaccination visits',
              text: 'A scheduling concept for seasonal services, with suitability confirmed by a qualified professional.',
            },
            {
              title: 'Travel vaccination conversations',
              text: 'Time to discuss travel-related vaccination questions with a care professional.',
            },
            {
              title: 'Preventative vaccination services',
              text: 'Explore service options and ask the care team about eligibility and availability.',
            },
          ].map((item) => (
            <div className="feature-card" key={item.title}>
              <Icon name="shield" size={28} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <ActionLink href="/appointments?service=vaccinations" variant="text">
                Find a time
              </ActionLink>
            </div>
          ))}
        </div>
        <Notice>
          Service categories are illustrative. This concept does not recommend vaccines, determine
          eligibility, or represent real inventory. Consult a qualified professional for medical
          guidance.
        </Notice>
      </section>
      <section className="section">
        <h2>Before you plan a visit.</h2>
        <Accordion
          items={[
            {
              title: 'Which vaccination should I choose?',
              text: 'A qualified professional can explain which services are appropriate for you. This demo does not recommend a specific vaccine.',
            },
            {
              title: 'Can I check eligibility here?',
              text: 'Eligibility is not assessed in the concept. In a live service, the care team would confirm suitability before the appointment.',
            },
            {
              title: 'Are appointment times real?',
              text: 'All locations and time slots are illustrative. Completing this flow creates a local demo record only.',
            },
          ]}
        />
      </section>
      <CTABand />
      <div className="section-spacer" />
    </div>
  );
}
