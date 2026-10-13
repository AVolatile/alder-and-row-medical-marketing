import { campaigns } from '@/data/content';
import {
  ActionLink,
  Accordion,
  Badge,
  Breadcrumbs,
  Field,
  Icon,
  Logo,
  Notice,
  SectionHeading,
  Symbol,
} from './ui';
import { CampaignArt } from './campaign-system';
const colors = [
  { name: 'Alder', hex: '#183E35', class: 'forest' },
  { name: 'Warm ivory', hex: '#FAF9F5', class: 'cream' },
  { name: 'Soft peach', hex: '#F0C8AE', class: 'peach' },
  { name: 'Garden sage', hex: '#DDE8D9', class: 'sage' },
  { name: 'Oat yellow', hex: '#EEE5BC', class: 'yellow' },
  { name: 'Quiet lilac', hex: '#E6DFEE', class: 'lilac' },
];
export function BrandSystem() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Brand system' }]} />
      <h1 className="sr-only">The Alder &amp; Row brand system</h1>
      <div className="brand-hero">
        <div>
          <span className="eyebrow">ALDER & ROW / IDENTITY SYSTEM 01</span>
          <Logo />
          <p>
            A neighborhood name. An open door. A calm, familiar system for pharmacy and everyday
            care.
          </p>
        </div>
        <Symbol className="brand-hero-symbol" />
      </div>
      <section className="brand-section">
        <SectionHeading
          eyebrow="01 / THE IDEA"
          title="A place you can come back to."
          text="Alder brings the warmth of a tree-lined neighborhood. Row suggests the shops, homes, and everyday places that sit beside one another. Together, they sound at home on a storefront."
        />
        <div className="grid-three">
          <div className="feature-card">
            <Symbol />
            <h3>The open-door symbol</h3>
            <p>
              Two nested arches represent a welcoming entrance and the continuity between physical
              places and digital care tools. The structure stays legible at favicon size.
            </p>
            <a className="button button-text" href="/brand/symbol.svg" download>
              Download symbol
              <Icon name="download" size={16} />
            </a>
          </div>
          <div className="feature-card">
            <span className="mini-wordmark">alder & row</span>
            <h3>The wordmark</h3>
            <p>
              Lowercase letterforms feel conversational; a compact silhouette supports retail
              signage, member interfaces, and small campaign formats.
            </p>
            <a className="button button-text" href="/brand/wordmark.svg" download>
              Download wordmark
              <Icon name="download" size={16} />
            </a>
          </div>
          <div className="feature-card">
            <Icon name="chat" size={30} />
            <h3>The voice</h3>
            <p>
              Specific, useful, and human. Short sentences, clear next steps, and space for
              questions. Service information stays neutral and avoids clinical claims.
            </p>
            <ActionLink href="/campaign" variant="text">
              See the voice in use
            </ActionLink>
          </div>
        </div>
      </section>
      <section className="brand-section">
        <SectionHeading
          eyebrow="02 / COLOR"
          title="Grounded in green. Warmed by everyday life."
          text="Alder and warm ivory carry the interface. Soft secondary tones distinguish services and campaigns. Dark green carries text on every light surface."
        />
        <div className="palette-grid">
          {colors.map((c) => (
            <div className="palette-card" key={c.hex}>
              <div className={`swatch surface-${c.class}`} style={{ background: c.hex }} />
              <strong>{c.name}</strong>
              <span>{c.hex}</span>
            </div>
          ))}
        </div>
        <Notice>
          Core text pair: Alder #183E35 on warm ivory #FAF9F5. Secondary colors are backgrounds, not
          small text colors. Status always includes a written label.
        </Notice>
      </section>
      <section className="brand-section">
        <SectionHeading
          eyebrow="03 / TYPOGRAPHY"
          title="Clear enough for the details. Warm enough for the everyday."
        />
        <div className="type-grid">
          <div className="type-sample">
            <span className="eyebrow">MANROPE / DISPLAY</span>
            <h3>
              More life.
              <br />
              Less running around.
            </h3>
            <p className="letter-sample">Aa Bb Cc 0123456789</p>
            <p>
              Measured, open letterforms. Used for headlines and strong section hierarchy. Weight
              550–650, with restrained tracking.
            </p>
          </div>
          <div className="type-sample body-sample">
            <span className="eyebrow">DM SANS / BODY & INTERFACE</span>
            <h3>
              A little closer
              <br />
              to everyday care.
            </h3>
            <p className="letter-sample">Aa Bb Cc 0123456789</p>
            <p>
              Readable at practical sizes. Used for navigation, forms, status labels, and editorial
              text. Fonts are bundled locally.
            </p>
          </div>
        </div>
      </section>
      <section className="brand-section">
        <SectionHeading eyebrow="04 / THE INTERFACE" title="Familiar components. Clear choices." />
        <div className="component-showcase">
          <div className="component-demo">
            <h3>Actions & hierarchy</h3>
            <div className="actions">
              <ActionLink href="/appointments">Schedule care</ActionLink>
              <ActionLink href="/locations" variant="secondary">
                Find a location
              </ActionLink>
            </div>
            <ActionLink href="/resources" variant="text">
              Read something useful
            </ActionLink>
            <div className="icon-showcase">
              {['bag', 'calendar', 'pin', 'shield', 'chat', 'sun', 'gift', 'access'].map((name) => (
                <div key={name}>
                  <Icon name={name} size={25} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="component-demo">
            <h3>Forms & feedback</h3>
            <Field
              id="brand-example"
              label="A clearly labeled field"
              hint="Useful supporting information sits beside the task."
            >
              <input
                id="brand-example"
                placeholder="Try typing here"
                aria-describedby="brand-example-hint"
              />
            </Field>
            <div className="actions">
              <Badge>Ready for pickup</Badge>
              <Badge tone="amber">Review needed</Badge>
              <Badge tone="neutral">Demo account</Badge>
            </div>
            <p className="field-error">Example validation: choose a location to continue.</p>
          </div>
        </div>
      </section>
      <section className="brand-section">
        <SectionHeading
          eyebrow="05 / SPACE & SURFACES"
          title="Give important things room to breathe."
          text="An 8-pixel rhythm supports spacious sections and compact operational details. Use 6–12-pixel radii, fine borders, and flat surfaces; elevation is reserved for overlays."
        />
        <div className="spacing-demo">
          {[8, 16, 24, 32, 48, 64, 80].map((size) => (
            <div key={size}>
              <span style={{ height: size }} />
              {size}px
            </div>
          ))}
        </div>
      </section>
      <section className="brand-section">
        <SectionHeading
          eyebrow="06 / IMAGERY"
          title="Real-life warmth, without the clinical theater."
        />
        <div className="brand-photo-direction">
          <img
            src="/images/neighborhood-care.webp"
            alt="AI-generated concept photograph of a warm neighborhood pharmacy conversation"
            loading="lazy"
          />
          <div>
            <h3>A conversation, not a credential.</h3>
            <p>
              Original AI-generated concept photography shows an everyday interaction, warm material
              textures, and natural light. The people are illustrative, not real staff or customers.
            </p>
            <ul>
              <li>Environmental context over staged portraits.</li>
              <li>Muted green, oak, and warm afternoon light.</li>
              <li>No white-coat authority cues or clinical procedures.</li>
              <li>Never use imagery as proof of an outcome.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="brand-section">
        <SectionHeading eyebrow="07 / ACROSS CHANNELS" title="One idea, with room to adapt." />
        <div className="grid-three">
          {campaigns.slice(0, 3).map((c) => (
            <CampaignArt campaign={c} key={c.slug} />
          ))}
        </div>
        <div className="retail-sign surface-forest">
          <span>RETAIL SIGNAGE CONCEPT</span>
          <strong>alder & row</strong>
          <span>PHARMACY & EVERYDAY CARE</span>
          <div className="retail-door" />
        </div>
        <p className="brand-retail-note">
          Retail principles: high contrast, generous clear space, one primary message, and an
          open-door symbol readable from the sidewalk. The digital wordmark and vector export are
          concept executions; production signage requires optical proofing.
        </p>
      </section>
      <section className="brand-section">
        <SectionHeading
          eyebrow="08 / ACCESS & ADAPTATION"
          title="Care begins with being able to use it."
        />
        <Accordion
          items={[
            {
              title: 'Keyboard and focus',
              text: 'Use native controls, visible focus rings, a skip link, and semantic navigation. Booking headings receive focus as steps change; native dialogs contain focus and support Escape.',
            },
            {
              title: 'Color and status',
              text: 'Dark green text sits on light surfaces. Written status labels accompany every badge, and selected choices include accessible pressed states.',
            },
            {
              title: 'Forms and validation',
              text: 'Every input has a visible label. Errors identify the exact field, use aria-invalid and associated descriptions, and move focus to the first issue.',
            },
            {
              title: 'Responsive layouts',
              text: 'Content reflows at small widths. Member navigation can scroll horizontally; map and booking summaries adapt to a single-column layout. Touch targets stay usable.',
            },
            {
              title: 'Motion and content integrity',
              text: 'Reduced-motion preferences disable transitions. Neutral service descriptions and clearly fictional data support healthcare integrity without inventing credentials or outcomes.',
            },
          ]}
        />
        <div className="actions brand-actions">
          <ActionLink href="/accessibility" variant="secondary">
            Accessibility approach
          </ActionLink>
          <ActionLink href="/case-study" variant="text">
            Explore the full case study
          </ActionLink>
        </div>
      </section>
      <div className="section-spacer" />
    </div>
  );
}
