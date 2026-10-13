'use client';
import { ActionLink, Icon } from '@/components/ui';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="error-page" role="alert">
      <Icon name="help" size={40} />
      <h1>Let’s try that again.</h1>
      <p>
        This part of the demo could not be displayed. Try reopening the page or return to the
        homepage.
      </p>
      <div className="actions">
        <button className="button button-primary" onClick={reset}>
          Try again
        </button>
        <ActionLink href="/" variant="secondary">
          Return home
        </ActionLink>
      </div>
    </div>
  );
}
