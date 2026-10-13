import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Activity,
  MessageCircle,
  ShoppingBag,
  Sun,
  Smartphone,
  Clock,
  Check,
  Accessibility,
  Search,
  ChevronDown,
  X,
  Menu,
  UserRound,
  Bell,
  Settings,
  Gift,
  ArrowLeft,
  Mail,
  CircleHelp,
  Leaf,
  Download,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import type { ReactNode } from 'react';
const icons = {
  arrow: ArrowUpRight,
  right: ArrowRight,
  pin: MapPin,
  calendar: CalendarDays,
  shield: ShieldCheck,
  activity: Activity,
  chat: MessageCircle,
  bag: ShoppingBag,
  sun: Sun,
  phone: Smartphone,
  clock: Clock,
  check: Check,
  access: Accessibility,
  search: Search,
  down: ChevronDown,
  close: X,
  menu: Menu,
  user: UserRound,
  bell: Bell,
  settings: Settings,
  gift: Gift,
  back: ArrowLeft,
  mail: Mail,
  help: CircleHelp,
  leaf: Leaf,
  download: Download,
  external: ExternalLink,
  success: CheckCircle2,
};
export function Icon({
  name = 'arrow',
  size = 22,
  className = '',
}: {
  name?: string;
  size?: number;
  className?: string;
}) {
  const Component = icons[name as keyof typeof icons] ?? ArrowUpRight;
  return <Component size={size} strokeWidth={1.6} aria-hidden="true" className={className} />;
}
export function Symbol({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="40"
      viewBox="0 0 36 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 35V17C4 9.27 10.27 3 18 3s14 6.27 14 14v18"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path d="M12 35V18a6 6 0 0 1 12 0v17M3 35h30" stroke="currentColor" strokeWidth="4" />
      <path d="M18 24v12" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
export function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className={`logo ${small ? 'logo-small' : ''}`}>
      <Symbol />
      <span>
        alder<span className="amp">&</span>row
        <span className="logo-caption">PHARMACY & EVERYDAY CARE</span>
      </span>
    </span>
  );
}
export function ActionLink({
  href,
  children,
  variant = 'primary',
  icon = 'arrow',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'light' | 'text';
  icon?: string | false;
  className?: string;
}) {
  return (
    <Link href={href} className={`button button-${variant} ${className}`}>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </Link>
  );
}
export function Badge({ children, tone = 'green' }: { children: ReactNode; tone?: string }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <Link href="/">Home</Link>
      {items.map((item, i) => (
        <span key={i}>
          <span aria-hidden="true">/</span>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function PageIntro({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
      {children && <div className="actions">{children}</div>}
    </div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
  link,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  link?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {link && (
        <ActionLink href={link} variant="text">
          {linkLabel ?? 'Explore more'}
        </ActionLink>
      )}
    </div>
  );
}
export function Accordion({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <details key={item.title}>
          <summary>
            {item.title}
            <Icon name="down" size={20} />
          </summary>
          <p>{item.text}</p>
        </details>
      ))}
    </div>
  );
}
export function EmptyState({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <Icon name="search" size={30} />
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}
export function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <small id={`${id}-hint`}>{hint}</small>}
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="notice">
      <Icon name="help" size={18} />
      <p>{children}</p>
    </div>
  );
}
export function CTABand() {
  return (
    <section className="cta-band">
      <div>
        <span className="eyebrow">YOUR NEXT STEP, CLOSE TO HOME</span>
        <h2>
          A familiar place.
          <br />A little more peace of mind.
        </h2>
      </div>
      <div>
        <p>
          Find your neighborhood Alder & Row.
          <br />
          Make time for what matters.
        </p>
        <ActionLink href="/locations" variant="light">
          Find a location
        </ActionLink>
      </div>
      <Symbol className="cta-symbol" />
    </section>
  );
}
