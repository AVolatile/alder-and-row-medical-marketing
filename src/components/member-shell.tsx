'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge, Icon } from './ui';
const items = [
  { href: '/member', label: 'Overview', icon: 'user' },
  { href: '/member/prescriptions', label: 'Prescriptions', icon: 'bag' },
  { href: '/member/appointments', label: 'Appointments', icon: 'calendar' },
  { href: '/member/benefits', label: 'Member benefits', icon: 'gift' },
  { href: '/member/profile', label: 'Your profile', icon: 'settings' },
];
export function MemberShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="member-shell container">
      <div className="member-nav-heading">
        <span className="eyebrow">YOUR MEMBER SPACE</span>
        <Badge tone="neutral">Demo account</Badge>
      </div>
      <nav className="member-nav" aria-label="Member navigation">
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            aria-current={path === item.href ? 'page' : undefined}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </Link>
        ))}
      </nav>
      {children}
      <div className="member-demo-note">
        <Icon name="help" size={17} />
        <p>
          Fictional member information. Changes stay in memory as you navigate and reset when you
          reload. Do not enter real health information.
        </p>
      </div>
    </div>
  );
}
