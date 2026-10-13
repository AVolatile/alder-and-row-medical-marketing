import { ActionLink, Icon } from '@/components/ui';
export default function NotFound() {
  return (
    <div className="error-page">
      <Icon name="pin" size={40} />
      <span className="eyebrow">A LITTLE OFF THE PATH</span>
      <h1>Let’s find your way back.</h1>
      <p>That page is not part of this concept. Explore our services or return to the homepage.</p>
      <div className="actions">
        <ActionLink href="/">Go home</ActionLink>
        <ActionLink href="/health-services" variant="secondary">
          Explore services
        </ActionLink>
      </div>
    </div>
  );
}
