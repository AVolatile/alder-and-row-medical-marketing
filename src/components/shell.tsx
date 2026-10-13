'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navItems } from '@/data/content';
import { ActionLink, Icon, Logo } from './ui';
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <div className="utility">
        <span>
          <span className="utility-dot" />A little closer to everyday care.
        </span>
        <Link href="/case-study">
          A Volatile Solutions concept <Icon name="arrow" size={13} />
        </Link>
      </div>
      <header className="header">
        <div className="header-inner">
          <Link href="/" aria-label="Alder and Row homepage" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <nav className="desktop-nav" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={path.startsWith(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link href="/login" className="sign-in" aria-label="Sign in to the demo member space">
              <Icon name="user" size={18} />
              <span>Sign in</span>
            </Link>
            <ActionLink href="/appointments" className="header-book" icon={false}>
              Schedule care
            </ActionLink>
            <button
              className="menu-toggle"
              ref={menuRef}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
            {[
              ...navItems,
              { href: '/member', label: 'Member space' },
              { href: '/appointments', label: 'Schedule care' },
            ].map((item) => (
              <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
                {item.label}
                <Icon name="arrow" size={18} />
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link href="/" aria-label="Alder and Row homepage">
            <Logo />
          </Link>
          <p>
            Pharmacy. Everyday care.
            <br />
            Right in your neighborhood.
          </p>
        </div>
        <div>
          <h3>Everyday care</h3>
          <Link href="/pharmacy">Pharmacy services</Link>
          <Link href="/prescriptions">Prescriptions</Link>
          <Link href="/vaccinations">Vaccinations</Link>
          <Link href="/health-services">Health services</Link>
        </div>
        <div>
          <h3>Your Alder & Row</h3>
          <Link href="/locations">Find a location</Link>
          <Link href="/appointments">Schedule care</Link>
          <Link href="/member">Member space</Link>
          <Link href="/resources">The Reading Room</Link>
        </div>
        <div>
          <h3>Behind the concept</h3>
          <Link href="/case-study">The case study</Link>
          <Link href="/brand">Our brand system</Link>
          <Link href="/campaign">Campaign collection</Link>
          <Link href="/accessibility">Accessibility</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Alder & Row · A self-initiated concept by Anthony Volatile /
          Volatile Solutions.
        </p>
        <span>
          Fictional services and demo information. No real care, prescriptions, or bookings.
        </span>
      </div>
    </footer>
  );
}
