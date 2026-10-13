import emailConcepts from '@/data/emails.json';
import { campaigns } from '@/data/content';
import type { Campaign } from '@/types';
import {
  ActionLink,
  Breadcrumbs,
  Icon,
  Logo,
  Notice,
  PageIntro,
  SectionHeading,
  Symbol,
} from './ui';
export function CampaignArt({ campaign: c }: { campaign: Campaign }) {
  return (
    <div className={`campaign-art surface-${c.color}`}>
      <Logo small />
      <h3>{c.headline}</h3>
      <p>{c.copy}</p>
      <span className="campaign-cta">
        {c.cta}
        <Icon name="arrow" size={15} />
      </span>
      <Icon name={c.icon} size={85} />
      <span className="campaign-demo">PORTFOLIO CONCEPT</span>
    </div>
  );
}
export function CampaignPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Campaign collection' }]} />
      <div className="campaign-intro">
        <PageIntro
          eyebrow="ONE BRAND. EVERY EVERYDAY MOMENT."
          title="A little care. Across every channel."
          text="Six campaign concepts. One clear, familiar voice. From your feed to your inbox to the corner of your neighborhood."
        />
        <span className="campaign-index">
          01 / PAID SOCIAL
          <br />
          02 / DISPLAY
          <br />
          03 / IN THE NEIGHBORHOOD
          <br />
          04 / IN YOUR INBOX
        </span>
      </div>
      <section>
        <SectionHeading
          eyebrow="01 / PAID SOCIAL"
          title="Made for a moment in your day."
          text="A flexible system for square, feed, and vertical formats. Six messages, with room to adapt."
        />
        <div className="campaign-grid">
          {campaigns.map((c) => (
            <article className="campaign-card" key={c.slug}>
              <CampaignArt campaign={c} />
              <span>{c.label}</span>
              <div className="campaign-downloads">
                <a
                  className="button button-text"
                  href={`/campaign/social/${c.slug}-1080x1080.png`}
                  download
                >
                  Square PNG
                  <Icon name="download" size={15} />
                </a>
                <a
                  className="button button-text"
                  href={`/campaign/social/${c.slug}-1080x1350.png`}
                  download
                >
                  Feed PNG
                  <Icon name="download" size={15} />
                </a>
                <a
                  className="button button-text"
                  href={`/campaign/social/${c.slug}-1080x1920.png`}
                  download
                >
                  Story PNG
                  <Icon name="download" size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="campaign-channel">
        <SectionHeading
          eyebrow="02 / DISPLAY"
          title="A familiar message, in any space."
          text="Purposeful layouts for compact, horizontal, vertical, and billboard placements."
        />
        <div className="display-grid">
          <div>
            <div className="display-unit display-square">
              <span className="mini-wordmark">alder & row</span>
              <h3>
                One less errand.
                <br />
                More of your day.
              </h3>
              <span className="display-cta">Find your neighborhood ↗</span>
              <Symbol />
            </div>
            <span className="display-size">300 × 250 · medium rectangle</span>
            <DownloadBanner size="300x250" />
          </div>
          <div>
            <div className="display-unit display-wide">
              <span className="mini-wordmark">alder & row</span>
              <h3>One less errand. More of your day.</h3>
              <span className="display-cta">Find your place ↗</span>
            </div>
            <span className="display-size">728 × 90 · leaderboard</span>
            <DownloadBanner size="728x90" />
            <div className="display-unit display-billboard">
              <span className="mini-wordmark">alder & row</span>
              <h3>
                A familiar place.
                <br />A helpful conversation.
              </h3>
              <span className="display-cta">Explore the concept ↗</span>
            </div>
            <span className="display-size">970 × 250 · billboard</span>
            <DownloadBanner size="970x250" />
          </div>
          <div>
            <div className="display-unit display-skyscraper">
              <span className="mini-wordmark">alder & row</span>
              <h3>
                A familiar
                <br />
                place.
                <br />A helpful
                <br />
                conversation.
              </h3>
              <span className="display-cta">Find your place ↗</span>
              <Symbol />
            </div>
            <span className="display-size">160 × 600 · skyscraper</span>
            <DownloadBanner size="160x600" />
          </div>
        </div>
      </section>
      <section className="campaign-channel">
        <SectionHeading
          eyebrow="03 / IN THE NEIGHBORHOOD"
          title="Care that belongs in the real world."
          text="Quietly confident signage, readable from a distance. Vector masters and 1200 × 1800 image concepts."
        />
        <div className="poster-grid">
          {campaigns.slice(0, 3).map((c) => (
            <article key={c.slug}>
              <div className={`poster surface-${c.color}`}>
                <Logo />
                <h3>{c.headline}</h3>
                <p>{c.copy}</p>
                <Symbol />
                <span className="poster-foot">{c.cta.toUpperCase()} ↗</span>
                <span className="campaign-demo">PORTFOLIO CONCEPT</span>
              </div>
              <span className="display-size">{c.label} · retail poster concept</span>
              <a
                className="button button-text"
                href={`/campaign/posters/${c.slug}-1200x1800.svg`}
                download
              >
                Download vector master
                <Icon name="download" size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="campaign-channel">
        <SectionHeading
          eyebrow="04 / IN YOUR INBOX"
          title="Useful updates. A familiar voice."
          text="Three responsive, standalone HTML templates. Designed for clarity, with inline styles and presentation tables."
        />
        <div className="email-grid">
          {emailConcepts.map((e) => (
            <article className="email-preview" key={e.slug}>
              <div className="email-chrome">Subject: {e.subject}</div>
              <div className={`email-body surface-${e.color}`}>
                <span className="mini-wordmark">alder & row</span>
                <span className="eyebrow">{e.eyebrow}</span>
                <h3>{e.title}</h3>
                <p>{e.copy}</p>
                <span className="email-cta">{e.cta} →</span>
              </div>
              <div className="email-footer">
                Alder & Row · A Volatile Solutions concept
                <br />
                Fictional services. No email has been sent.
              </div>
              <div className="email-downloads">
                <ActionLink href={`/campaign/email/${e.slug}.html`} variant="text" icon="external">
                  Open responsive preview
                </ActionLink>
                <a href={`/campaign/email/${e.slug}.html`} className="button button-text" download>
                  HTML
                  <Icon name="download" size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Notice>
        Every creative is a fictional campaign concept. No real locations, clinical outcomes,
        insurance coverage, or prescription services are claimed. Poster files are scalable visual
        concepts; print production would require final prepress preparation.
      </Notice>
      <div className="section-spacer" />
    </div>
  );
}
function DownloadBanner({ size }: { size: string }) {
  return (
    <a className="button button-text" href={`/campaign/display/neighborhood-${size}.png`} download>
      Download {size.replace('x', ' × ')} PNG
      <Icon name="download" size={15} />
    </a>
  );
}
