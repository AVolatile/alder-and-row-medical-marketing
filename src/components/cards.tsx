import Link from 'next/link';
import { services, locations } from '@/data/content';
import type { Service, Location, Article, Appointment } from '@/types';
import { ActionLink, Badge, Icon } from './ui';
import { formatDate } from '@/lib/utils';
export function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  return (
    <Link
      href={`/health-services/${service.slug}`}
      className={`service-card surface-${service.color} ${compact ? 'compact' : ''}`}
    >
      <div className="service-icon">
        <Icon name={service.icon} size={29} />
      </div>
      <div>
        <h3>{service.name}</h3>
        <p>{service.short}</p>
      </div>
      <Icon name="arrow" className="card-arrow" size={22} />
    </Link>
  );
}
export function LocationCard({
  location,
  selected = false,
  onSelect,
}: {
  location: Location;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <article className={`location-card ${selected ? 'selected' : ''}`}>
      <div className="location-card-heading">
        <div>
          <span className="eyebrow">{location.neighborhood}</span>
          <h3>
            <Link href={`/locations/${location.slug}`}>Alder & Row {location.name}</Link>
          </h3>
        </div>
        <span className="distance">
          {location.distance}
          <small>demo distance</small>
        </span>
      </div>
      <p>
        {location.address} · {location.city}, {location.zip}
      </p>
      <div className="location-status">
        <Badge tone={location.open ? 'green' : 'neutral'}>
          {location.open ? 'Open in demo' : 'Closed in demo'}
        </Badge>
        <span>
          <Icon name="clock" size={15} />
          {location.hours}
        </span>
      </div>
      <div className="service-tags">
        {location.services.map((slug) => (
          <span key={slug}>{services.find((s) => s.slug === slug)?.name}</span>
        ))}
      </div>
      <div className="location-access">
        <Icon name="access" size={16} />
        <span>Step-free entry · private consultation space</span>
      </div>
      <div className="location-card-actions">
        <ActionLink href={`/appointments?location=${location.slug}`} icon={false}>
          Schedule here
        </ActionLink>
        {onSelect ? (
          <button className="button button-text" onClick={onSelect} aria-pressed={selected}>
            Show on map
            <Icon name="pin" size={16} />
          </button>
        ) : (
          <ActionLink href={`/locations/${location.slug}`} variant="text">
            Location details
          </ActionLink>
        )}
      </div>
    </article>
  );
}
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link className="article-card" href={`/resources/${article.slug}`}>
      <div className={`article-art surface-${article.color}`}>
        <div className="editorial-orbit" />
        <Icon name={article.icon} size={70} />
        <span className="article-art-caption">THE READING ROOM</span>
      </div>
      <div className="article-copy">
        <span className="eyebrow">
          {article.category} <span className="read-time">· {article.readTime} min read</span>
        </span>
        <h3>{article.title}</h3>
        <span className="read-article">
          Read the article
          <Icon name="arrow" size={18} />
        </span>
      </div>
    </Link>
  );
}
export function AppointmentCard({
  appointment,
  children,
}: {
  appointment: Appointment;
  children?: React.ReactNode;
}) {
  const location = locations.find((l) => l.slug === appointment.location);
  return (
    <article className="appointment-card">
      <div className="date-tile">
        <span>{formatDate(appointment.date, { month: 'short' })}</span>
        <strong>{formatDate(appointment.date, { day: 'numeric' })}</strong>
      </div>
      <div className="appointment-copy">
        <Badge tone={appointment.status === 'Cancelled' ? 'neutral' : 'green'}>
          {appointment.status}
        </Badge>
        <h3>{appointment.service}</h3>
        <p>
          {formatDate(appointment.date)} · {appointment.time}
        </p>
        <p>
          <Icon name="pin" size={16} />
          Alder & Row {location?.name}
        </p>
      </div>
      {children && <div className="appointment-actions">{children}</div>}
    </article>
  );
}
