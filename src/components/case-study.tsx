import { campaigns } from '@/data/content';
import { ActionLink, Breadcrumbs, Icon, Logo, Notice } from './ui';
import { CampaignArt } from './campaign-system';
const routes = [
  ['Homepage', '/'],
  ['Pharmacy', '/pharmacy'],
  ['Services', '/health-services'],
  ['Location finder', '/locations'],
  ['Appointment flow', '/appointments'],
  ['Member space', '/member'],
  ['Prescriptions', '/member/prescriptions'],
  ['Reading Room', '/resources'],
  ['Campaigns', '/campaign'],
  ['Brand system', '/brand'],
];
export function CaseStudy() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Case study' }]} />
      <section className="case-hero">
        <div>
          <span className="eyebrow">ANTHONY VOLATILE / VOLATILE SOLUTIONS</span>
          <h1>
            Alder & Row.
            <span>
              Modern pharmacy &<br />
              everyday care platform.
            </span>
          </h1>
          <p>
            One connected consumer experience, from the neighborhood storefront to the next
            appointment.
          </p>
          <ActionLink href="/" variant="text">
            Explore the experience
          </ActionLink>
        </div>
        <div className="case-meta">
          <dl>
            <div>
              <dt>Project</dt>
              <dd>Self-initiated portfolio concept</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>Brand strategy · UI/UX · Frontend · Campaign creative</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>Responsive web application · Next.js · TypeScript</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>
                Consumer marketing · Pharmacy · Service discovery · Member tools · Cross-channel
                creative
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <div className="case-cover">
        <div className="case-cover-brand">
          <Logo />
          <h2>
            More life.
            <br />
            Less running around.
          </h2>
          <p>
            A coherent identity for the places, services, and small tasks that make up everyday
            care.
          </p>
        </div>
        <div className="case-cover-ui">
          <div className="case-cover-ui-top">
            <strong>alder & row</strong>
            <span>PHARMACY & EVERYDAY CARE</span>
          </div>
          <h3>
            A little closer.
            <br />A little more day.
          </h3>
          <img
            src="/images/neighborhood-care.webp"
            alt="Neighborhood pharmacy concept photography in a sample browser composition"
          />
          <div>
            <span>Find your neighborhood</span>
            <Icon name="arrow" size={17} />
          </div>
        </div>
      </div>
      <CaseSection number="01" label="THE CHALLENGE">
        <h2>Every touchpoint should feel like the same place.</h2>
        <p>
          A retail healthcare experience spans marketing, pharmacy tasks, location discovery,
          appointments, member accounts, educational content, and physical creative. The challenge
          is to keep choices understandable and the brand recognizable across all of them.
        </p>
        <p>
          This concept explores that challenge through a connected frontend. It does not represent a
          commissioned client engagement, real provider, or research-backed clinical service.
        </p>
      </CaseSection>
      <CaseSection number="02" label="THE STRATEGY">
        <h2>Start with the task. Keep the system close.</h2>
        <div className="case-points">
          <div>
            <h3>A neighborhood brand</h3>
            <p>
              Alder & Row provides a distinctive name and a retail-friendly identity without
              medical-logo clichés.
            </p>
          </div>
          <div>
            <h3>Connected discovery</h3>
            <p>
              Shared service and location data keep filters, detail pages, and appointment
              selections consistent.
            </p>
          </div>
          <div>
            <h3>Clear operational steps</h3>
            <p>
              Booking and prescription actions show state, explain errors, and confirm exactly what
              changed.
            </p>
          </div>
          <div>
            <h3>Honest healthcare framing</h3>
            <p>
              Fictional data, neutral service language, and no clinical or insurance claims preserve
              the concept’s integrity.
            </p>
          </div>
        </div>
      </CaseSection>
      <CaseSection number="03" label="BRAND & MARKETING">
        <h2>Warm enough for a neighborhood. Structured enough for a system.</h2>
        <p>
          Forest green anchors the identity. Warm ivory gives the content room. Peach, sage, oat,
          and lilac create service and campaign variation without changing the brand’s voice. The
          nested arch symbol connects a physical open door with a digital starting point.
        </p>
        <p>
          The homepage moves from everyday needs to pharmacy support, appointments, locations,
          membership, and editorial content. Each section has a distinct job and a clear next
          action.
        </p>
        <div className="actions">
          <ActionLink href="/brand" variant="secondary">
            See the identity system
          </ActionLink>
          <ActionLink href="/" variant="text">
            Explore the homepage
          </ActionLink>
        </div>
      </CaseSection>
      <CaseSection number="04" label="SERVICE DISCOVERY">
        <h2>Find the service. Then the familiar place.</h2>
        <p>
          Five service records power the service hub, detail templates, location filters, and
          booking flow. The locator combines city and ZIP search, service filters, demo open status,
          appointment availability, and a selectable illustrative map.
        </p>
        <p>
          Location pages make hours, available services, and accessibility features easy to scan. A
          location or service selected during discovery carries into booking through validated query
          parameters.
        </p>
        <ActionLink href="/locations" variant="text">
          Try the locator
        </ActionLink>
      </CaseSection>
      <CaseSection number="05" label="APPOINTMENT UX">
        <h2>Eight steps, with a clear view of the visit.</h2>
        <p>
          Service, location, date, time, guest or member, contact, review, and confirmation. Each
          step presents one decision. A persistent summary keeps the visit understandable, while
          back navigation preserves selections.
        </p>
        <p>
          The flow prevents incompatible service and location choices, validates contact fields
          individually, focuses the next heading, and explains the demo boundary before
          confirmation. A confirmed visit updates the member appointment list and can be downloaded
          as a clearly labeled demo calendar event.
        </p>
        <ActionLink href="/appointments" variant="text">
          Walk through the booking flow
        </ActionLink>
      </CaseSection>
      <CaseSection number="06" label="MEMBER EXPERIENCE">
        <h2>A companion to daily life, with fewer things to manage.</h2>
        <p>
          The member overview brings together pickup status, a next visit, a preferred location,
          activity, and useful reading. Prescription cards provide status, refill availability,
          last-filled dates, and pickup preferences without offering medical instructions.
        </p>
        <p>
          Simulated refills, reminder toggles, location changes, cancellation, benefit selections,
          and profile updates are connected through one in-memory state provider. Reloading restores
          the fictional seed data. No credentials or contact information are transmitted or stored.
        </p>
        <ActionLink href="/member" variant="text">
          Explore the member space
        </ActionLink>
      </CaseSection>
      <CaseSection number="07" label="ACCESSIBILITY">
        <h2>The small details are part of the product.</h2>
        <div className="case-points">
          <div>
            <h3>Navigation and focus</h3>
            <p>
              Semantic landmarks, skip navigation, visible focus rings, native controls,
              step-heading focus, and Escape dismissal.
            </p>
          </div>
          <div>
            <h3>Readable feedback</h3>
            <p>
              Field-specific errors, associated descriptions, live notifications, text status
              labels, and accessible selected states.
            </p>
          </div>
          <div>
            <h3>Intentional reflow</h3>
            <p>
              Single-column task flows on mobile, usable touch controls, responsive grids, and
              accessible horizontal member navigation.
            </p>
          </div>
          <div>
            <h3>Measured claims</h3>
            <p>
              WCAG-oriented implementation and automated smoke checks support quality. A formal
              conformance audit remains a separate process.
            </p>
          </div>
        </div>
        <ActionLink href="/accessibility" variant="text">
          Read the accessibility approach
        </ActionLink>
      </CaseSection>
      <CaseSection number="08" label="CROSS-CHANNEL CREATIVE">
        <h2>One voice. Every format.</h2>
        <p>
          Six campaign concepts adapt to 1080 × 1080, 1080 × 1350, and 1080 × 1920 social layouts.
          The collection also includes four display sizes, three retail poster concepts, and three
          responsive HTML emails.
        </p>
        <div className="campaign-grid">
          {campaigns.slice(0, 2).map((c) => (
            <CampaignArt campaign={c} key={c.slug} />
          ))}
        </div>
        <ActionLink href="/campaign" variant="text">
          See the campaign collection
        </ActionLink>
      </CaseSection>
      <CaseSection number="09" label="THE BUILD">
        <h2>Built as a system you can extend.</h2>
        <p>
          Next.js App Router and TypeScript separate route composition, reusable interface
          components, typed content, and demo state. Static export makes the concept deployable
          without an application backend. Local fonts and optimized concept photography reduce
          external asset dependencies.
        </p>
        <p>
          Shared tokens define color, typography, spacing, surfaces, and controls. Reusable cards,
          accordions, forms, notifications, native dialogs, and page templates carry the system
          across the application.
        </p>
        <div className="case-route-map">
          {routes.map(([name, href]) => (
            <a href={`${href}${href === '/' ? '' : '/'}`} key={href}>
              {name}
              <Icon name="arrow" size={16} />
            </a>
          ))}
        </div>
      </CaseSection>
      <CaseSection number="10" label="CONCEPT & NEXT STEPS">
        <h2>A serious concept. An honest scope.</h2>
        <p>
          This is a self-initiated concept project created to demonstrate enterprise healthcare
          design, accessibility, brand-system thinking, frontend development, campaign execution,
          and cross-channel digital experience design.
        </p>
        <p>
          The next stage would involve user research, testing with assistive technology users, a
          content review by qualified professionals, and secure service integrations. No real care,
          patient information, prescription handling, authentication, or booking backend is present.
        </p>
        <Notice>
          Created for Anthony Volatile / Volatile Solutions. Every member record, location, benefit,
          and service is fictional. No patient or professional testimonials are fabricated.
        </Notice>
      </CaseSection>
      <div className="section-spacer" />
    </div>
  );
}
function CaseSection({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="case-section">
      <span className="eyebrow">
        {number} / {label}
      </span>
      <div>{children}</div>
    </section>
  );
}
