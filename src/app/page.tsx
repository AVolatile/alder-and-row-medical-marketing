import Link from 'next/link';
import { ActionLink, Badge, CTABand, Icon, SectionHeading, Symbol } from '@/components/ui';
import { ArticleCard, ServiceCard } from '@/components/cards';
import { articles, services } from '@/data/content';
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="tiny-line" /> YOUR NEIGHBORHOOD. YOUR EVERYDAY CARE.
          </span>
          <h1>
            More life.
            <br />
            Less running
            <br />
            <span>around.</span>
          </h1>
          <p>
            Prescriptions, everyday health services, and a familiar face. All a little closer to
            home.
          </p>
          <div className="actions">
            <ActionLink href="/appointments">Schedule care</ActionLink>
            <ActionLink href="/locations" variant="secondary" icon="pin">
              Find a location
            </ActionLink>
          </div>
          <div className="hero-footnote">
            <Icon name="check" size={16} />
            Pharmacy & everyday care, in one place.
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/images/neighborhood-care.webp"
            alt="Illustrative concept of a customer having a friendly conversation at a neighborhood pharmacy counter"
            fetchPriority="high"
          />
          <div className="hero-photo-label">
            <span className="utility-dot" />
            MADE FOR YOUR EVERYDAY
          </div>
          <div className="hero-float">
            <span className="float-icon">
              <Icon name="bag" size={24} />
            </span>
            <div>
              <span className="eyebrow">ONE LESS THING ON YOUR LIST</span>
              <strong>A little care. A lot more day.</strong>
              <span>Explore your neighborhood pharmacy</span>
            </div>
            <Link href="/pharmacy" aria-label="Explore pharmacy services">
              <Icon name="arrow" size={23} />
            </Link>
          </div>
          <Symbol className="hero-mark" />
        </div>
      </section>
      <div className="quick-strip container">
        <Link href="/member/prescriptions">
          <Icon name="bag" />
          <span>
            Refill a prescription<small>Keep everyday tasks together</small>
          </span>
          <Icon name="arrow" size={18} />
        </Link>
        <Link href="/vaccinations">
          <Icon name="shield" />
          <span>
            Plan a vaccination visit<small>Find a time that fits your day</small>
          </span>
          <Icon name="arrow" size={18} />
        </Link>
        <Link href="/health-services">
          <Icon name="chat" />
          <span>
            Find your next service<small>Start with what you need</small>
          </span>
          <Icon name="arrow" size={18} />
        </Link>
      </div>
      <section className="section container">
        <SectionHeading
          eyebrow="A LITTLE CARE GOES A LONG WAY"
          title="For the everyday. And the in-between."
          text="A prescription to pick up. A question to ask. A check-in to make time for."
          link="/health-services"
          linkLabel="Explore all services"
        />
        <div className="home-services">
          <Link href="/prescriptions" className="service-card surface-sand">
            <div className="service-icon">
              <Icon name="bag" size={29} />
            </div>
            <div>
              <h3>Prescriptions</h3>
              <p>A simpler way to stay on top of things.</p>
            </div>
            <Icon name="arrow" className="card-arrow" />
          </Link>
          {services.slice(0, 3).map((service) => (
            <ServiceCard service={service} key={service.slug} />
          ))}
        </div>
        <div className="preventative-link">
          <Icon name="sun" size={19} />
          <span>A little planning for what’s ahead.</span>
          <Link href="/health-services/preventative-services">
            Explore preventative services
            <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>
      <section className="prescription-section">
        <div className="container split">
          <div>
            <span className="eyebrow">YOUR PHARMACY, WITH YOU</span>
            <h2>
              Less to keep track of.
              <br />
              More to get on with.
            </h2>
            <p>
              Refill requests, pickup updates, and reminders. One familiar place for your everyday
              pharmacy tasks.
            </p>
            <div className="check-list">
              <span>
                <Icon name="check" />
                See where things stand
              </span>
              <span>
                <Icon name="check" />
                Choose your pickup location
              </span>
              <span>
                <Icon name="check" />
                Keep your reminders close
              </span>
            </div>
            <div className="actions">
              <ActionLink href="/prescriptions">Explore prescriptions</ActionLink>
              <ActionLink href="/prescriptions#transfer" variant="text">
                Transfer a prescription
              </ActionLink>
            </div>
          </div>
          <div className="prescription-preview">
            <div className="preview-top">
              <LogoMini />
              <Badge>Member preview</Badge>
            </div>
            <h3>A little less on your mind.</h3>
            <p>Your pharmacy tasks, at a glance.</p>
            <div className="rx-mini">
              <span className="rx-mini-icon">
                <Icon name="bag" />
              </span>
              <div>
                <strong>Sample medication A</strong>
                <span>Demo prescription · Maple Square</span>
              </div>
              <Badge>Ready for pickup</Badge>
            </div>
            <div className="pickup-progress">
              <span>
                <Icon name="check" size={15} />
                Request received
              </span>
              <span>
                <Icon name="check" size={15} />
                Prepared
              </span>
              <strong>Ready for you</strong>
            </div>
            <div className="preview-reminder">
              <Icon name="bell" size={19} />
              <span>
                One less thing to remember.<small>Pharmacy task reminders are on.</small>
              </span>
              <span className="mock-switch" aria-hidden="true" />
            </div>
            <Link className="preview-link" href="/member/prescriptions">
              Open your member space
              <Icon name="arrow" size={18} />
            </Link>
            <span className="demo-caption">
              Fictional prescription information · interactive demo
            </span>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="split appointment-promo">
          <div className="appointment-art surface-peach">
            <div className="art-arch">
              <Symbol />
            </div>
            <div className="time-float">
              <Icon name="calendar" />
              <div>
                <strong>Make a little time for you.</strong>
                <span>Choose a service, a place, a time.</span>
              </div>
            </div>
            <span className="art-label">A LITTLE CLOSER TO EVERYDAY CARE</span>
          </div>
          <div>
            <span className="eyebrow">ON YOUR CALENDAR, ON YOUR TERMS</span>
            <h2>
              The next step
              <br />
              starts with a time.
            </h2>
            <p>
              Book a moment for your questions, a routine screening, or a seasonal service. We’ll
              help you find a place to start.
            </p>
            <div className="inline-services">
              {services.slice(0, 4).map((s) => (
                <Link href={`/appointments?service=${s.slug}`} key={s.slug}>
                  {s.name}
                  <Icon name="arrow" size={17} />
                </Link>
              ))}
            </div>
            <ActionLink href="/appointments">Find an appointment</ActionLink>
          </div>
        </div>
      </section>
      <section className="location-promo">
        <div className="container split">
          <div>
            <span className="eyebrow">PART OF THE NEIGHBORHOOD</span>
            <h2>
              Close by.
              <br />
              Easy to come back to.
            </h2>
            <p>
              Find your local Alder & Row, explore the services there, and plan your next visit.
            </p>
            <ActionLink href="/locations" icon="pin">
              Find your location
            </ActionLink>
          </div>
          <div className="home-map">
            <div className="map-grid" />
            <span className="map-river" />
            <div className="map-location">
              <div className="map-label">
                <Icon name="pin" size={24} />
                <strong>Maple Square</strong>
                <Badge>Open in demo</Badge>
              </div>
              <p>24 Alder Lane · Brookmere</p>
              <p>Pharmacy · Vaccinations · Wellness</p>
              <Link href="/locations/maple-square">
                Get to know your location
                <Icon name="arrow" size={18} />
              </Link>
            </div>
            <span className="map-demo">ILLUSTRATIVE NEIGHBORHOOD · FICTIONAL LOCATIONS</span>
          </div>
        </div>
      </section>
      <section className="section container member-promo">
        <span className="eyebrow">A SPACE THAT KEEPS UP WITH YOU</span>
        <div className="section-heading">
          <h2>Meet your everyday care companion.</h2>
          <ActionLink href="/member" variant="text">
            Explore the member space
          </ActionLink>
        </div>
        <div className="member-preview-row">
          <div>
            <Icon name="bag" />
            <strong>Your prescriptions</strong>
            <p>
              Pickup updates and refill requests.
              <br />
              One place to check in.
            </p>
          </div>
          <div>
            <Icon name="calendar" />
            <strong>Your next appointment</strong>
            <p>
              The time, the place, the details.
              <br />
              Ready when you are.
            </p>
          </div>
          <div>
            <Icon name="gift" />
            <strong>A little extra for members</strong>
            <p>
              Explore member offers
              <br />
              and wellness service concepts.
            </p>
          </div>
        </div>
      </section>
      <section className="resources-section">
        <div className="container">
          <SectionHeading
            eyebrow="THE READING ROOM"
            title="Good to know. Easy to take with you."
            text="Practical reads for the questions that come up along the way."
            link="/resources"
            linkLabel="Visit the Reading Room"
          />
          <div className="grid-three">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        </div>
      </section>
      <div className="container section">
        <CTABand />
      </div>
    </>
  );
}
function LogoMini() {
  return <span className="mini-wordmark">alder & row</span>;
}
