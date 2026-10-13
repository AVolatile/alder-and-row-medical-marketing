'use client';
import { useDemo } from './demo-provider';
import { ActionLink, Badge, Icon, Notice } from './ui';
const benefits = [
  {
    id: 'wellness',
    icon: 'chat',
    title: 'A little time to talk.',
    text: 'Explore a concept offer for a wellness conversation at your preferred location.',
    tag: 'Wellness service concept',
    cost: 25,
  },
  {
    id: 'everyday',
    icon: 'gift',
    title: 'Something for your everyday.',
    text: 'A retail member-offer concept for everyday essentials. No real discount or monetary value.',
    tag: 'Member offer concept',
    cost: 15,
  },
  {
    id: 'pharmacy',
    icon: 'bag',
    title: 'Your pharmacy options.',
    text: 'Explore how a live pharmacy could present transparent service and pricing information.',
    tag: 'Savings experience concept',
    cost: 0,
  },
];
export function MemberBenefits() {
  const { credits, redeem, notify } = useDemo();
  const used = benefits.filter((b) => credits.includes(b.id)).reduce((sum, b) => sum + b.cost, 0);
  return (
    <>
      <div className="member-page-header">
        <div>
          <span className="eyebrow">A LITTLE EXTRA, THOUGHTFULLY OFFERED</span>
          <h1>Your member benefits.</h1>
          <p>A concept for service offers, everyday extras, and clear member choices.</p>
        </div>
        <Badge tone="neutral">Illustrative benefits</Badge>
      </div>
      <div className="benefits-hero">
        <div className="benefits-credit">
          {60 - used}
          <small>DEMO WELLNESS CREDITS</small>
        </div>
        <div>
          <h2>A few possibilities for your day.</h2>
          <p>
            These fictional credits demonstrate a member-offer experience. They have no cash value
            and cannot be used for real services or products.
          </p>
        </div>
      </div>
      <div className="grid-three">
        {benefits.map((b) => (
          <article className="benefit-card" key={b.id}>
            <Icon name={b.icon} size={30} />
            <h2>{b.title}</h2>
            <p>{b.text}</p>
            <Badge tone="neutral">{b.tag}</Badge>
            {b.cost ? (
              <button
                className="button button-primary"
                disabled={credits.includes(b.id)}
                onClick={() => {
                  redeem(b.id);
                  notify(
                    'Demo offer saved. No real credit, discount, or service has been redeemed.',
                  );
                }}
              >
                {credits.includes(b.id)
                  ? 'Demo offer saved'
                  : `Explore with ${b.cost} demo credits`}
              </button>
            ) : (
              <ActionLink href="/prescriptions" variant="secondary">
                Explore pharmacy options
              </ActionLink>
            )}
          </article>
        ))}
      </div>
      <Notice>
        Benefits are illustrative. No insurance participation, guaranteed savings, medical
        eligibility, or real financial value is represented.
      </Notice>
      <div className="section-spacer" />
    </>
  );
}
