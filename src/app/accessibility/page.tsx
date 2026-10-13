import { ActionLink, Breadcrumbs, PageIntro } from '@/components/ui';
export const metadata = { title: 'Accessibility approach' };
export default function Page() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Accessibility' }]} />
      <PageIntro
        eyebrow="ACCESS IS PART OF EVERYDAY CARE"
        title="A clear path, for more people."
        text="Alder & Row is a portfolio concept with accessibility considered throughout its design and implementation."
      />
      <div className="accessibility-content">
        <h2>Navigation that follows a clear order.</h2>
        <p>
          Semantic landmarks, a skip-to-content link, descriptive navigation, visible keyboard
          focus, and native controls support exploration without a mouse. Member navigation remains
          accessible when it scrolls on smaller screens.
        </p>
        <h2>Forms that explain what happens next.</h2>
        <p>
          Inputs have visible labels. Field-specific validation messages are associated with the
          relevant control. The booking flow validates one step at a time, announces errors, and
          places focus on the next step’s heading.
        </p>
        <h2>Feedback you can read.</h2>
        <p>
          Status badges include written labels. Selection controls expose their pressed state. Demo
          actions announce feedback through a live region. Dialogs use native focus containment and
          support Escape.
        </p>
        <h2>Layouts that adapt.</h2>
        <p>
          Page grids reflow for smaller screens. Task summaries and location details stay available
          on mobile. Reduced-motion preferences turn off transitions and smooth scrolling.
        </p>
        <h2>A measured accessibility commitment.</h2>
        <p>
          This project targets WCAG-oriented practices. Automated accessibility checks and keyboard
          smoke testing help identify issues; they do not establish formal WCAG conformance or
          replace testing with disabled users.
        </p>
        <ul>
          <li>Browser zoom and text resizing should remain available.</li>
          <li>Map data has equivalent text in location cards.</li>
          <li>Clinical guidance and real service access are outside this concept.</li>
        </ul>
        <ActionLink href="/brand" variant="secondary">
          See the design system
        </ActionLink>
      </div>
    </div>
  );
}
