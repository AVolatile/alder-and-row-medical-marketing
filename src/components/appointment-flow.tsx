'use client';
import { useEffect, useRef, useState } from 'react';
import { locations, services } from '@/data/content';
import { formatDate, upcomingDates, validEmail } from '@/lib/utils';
import { ActionLink, Badge, Breadcrumbs, Field, Icon, Notice } from './ui';
import { useDemo } from './demo-provider';
const steps = [
  'Service',
  'Location',
  'Date',
  'Time',
  'Guest or member',
  'Contact',
  'Review',
  'Confirmation',
];
const titles = [
  'What brings you in?',
  'Where would you like to go?',
  'Make a little time for you.',
  'What time fits your day?',
  'How would you like to continue?',
  'A few details for your visit.',
  'Take a moment to check the details.',
  'Your demo visit is on the calendar.',
];
const times = ['9:00 am', '10:30 am', '11:00 am', '1:00 pm', '2:30 pm', '4:00 pm'];
export function AppointmentFlow() {
  const { profile, addAppointment } = useDemo();
  const [step, setStep] = useState(0);
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [account, setAccount] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dates, setDates] = useState<string[]>([]);
  const [reference, setReference] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    setDates(upcomingDates());
    const params = new URLSearchParams(window.location.search);
    const s = params.get('service') ?? '';
    const l = params.get('location') ?? '';
    if (services.some((item) => item.slug === s)) setService(s);
    if (
      locations.some(
        (item) => item.slug === l && item.appointments && (!s || item.services.includes(s)),
      )
    )
      setLocation(l);
  }, []);
  useEffect(() => {
    if (step > 0) heading.current?.focus();
  }, [step]);
  const pickedService = services.find((s) => s.slug === service);
  const pickedLocation = locations.find((l) => l.slug === location);
  const possibleLocations = locations.filter((l) => l.services.includes(service));
  function next() {
    const issues: Record<string, string> = {};
    if (step === 0 && !service) issues.selection = 'Choose a service to continue.';
    if (
      step === 1 &&
      (!location || !pickedLocation?.appointments || !pickedLocation.services.includes(service))
    )
      issues.selection = 'Choose a location with demo appointments for your service.';
    if (step === 2 && (!date || !dates.includes(date)))
      issues.selection = 'Choose an available demo date.';
    if (step === 3 && !time) issues.selection = 'Choose a time to continue.';
    if (step === 4 && !account) issues.selection = 'Choose guest or demo member to continue.';
    if (step === 5) {
      if (contact.name.trim().length < 2)
        issues.name = 'Enter a name with at least two characters.';
      if (!validEmail(contact.email))
        issues.email = 'Enter a valid email, such as alex@example.com.';
      if (
        contact.phone &&
        (!/^[+()\d\s.-]+$/.test(contact.phone) || contact.phone.replace(/\D/g, '').length < 10)
      )
        issues.phone = 'Enter a phone number with at least 10 digits, or leave it blank.';
      if (!consent) issues.consent = 'Confirm that you understand this is a demo booking.';
    }
    setErrors(issues);
    if (Object.keys(issues).length) {
      window.setTimeout(
        () =>
          document
            .getElementById(
              Object.keys(issues)[0] === 'selection'
                ? 'step-error'
                : `contact-${Object.keys(issues)[0]}`,
            )
            ?.focus(),
        0,
      );
      return;
    }
    if (step === 6) {
      const id = `AR-DEMO-${Date.now().toString().slice(-6)}`;
      setReference(id);
      addAppointment({
        id,
        service: pickedService!.name,
        location,
        date,
        time,
        status: 'Upcoming',
      });
    }
    setStep((current) => current + 1);
  }
  const goBack = () => {
    setErrors({});
    setStep((current) => current - 1);
  };
  function downloadCalendar() {
    const [hour, minute] = time.split(' ')[0].split(':').map(Number);
    const hours = (hour % 12) + (time.includes('pm') ? 12 : 0);
    const start = `${date.replaceAll('-', '')}T${String(hours).padStart(2, '0')}${String(minute ?? 0).padStart(2, '0')}00`;
    const calendar = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Alder and Row//Portfolio Concept//EN\r\nBEGIN:VEVENT\r\nUID:${reference}@alderandrow.example\r\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z\r\nDTSTART;TZID=America/New_York:${start}\r\nDURATION:PT${pickedService!.duration}M\r\nSUMMARY:DEMO ONLY - ${pickedService!.name}\r\nLOCATION:Fictional Alder and Row ${pickedLocation!.name}\r\nDESCRIPTION:Portfolio concept. This is not a real appointment.\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const url = URL.createObjectURL(new Blob([calendar], { type: 'text/calendar' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'alder-row-demo-appointment.ics';
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="container booking-page">
      <Breadcrumbs items={[{ label: 'Schedule care' }]} />
      <div className="booking-top">
        <span className="eyebrow">A LITTLE TIME FOR YOUR EVERYDAY CARE</span>
        <Badge tone="neutral">Demo booking</Badge>
      </div>
      <nav aria-label="Booking progress">
        <ol className="stepper">
          {steps.map((label, i) => (
            <li
              key={label}
              className={i === step ? 'current' : i < step ? 'complete' : ''}
              aria-current={i === step ? 'step' : undefined}
            >
              <span>{i < step ? <Icon name="check" size={15} /> : i + 1}</span>
              <small>{label}</small>
            </li>
          ))}
        </ol>
      </nav>
      <div className="booking-layout">
        <section className="booking-content">
          <span className="eyebrow">
            STEP {step + 1} OF {steps.length}
          </span>
          <h1 className="booking-title" tabIndex={-1} ref={heading}>
            {titles[step]}
          </h1>
          {step === 0 && (
            <>
              <p>Choose the kind of visit you would like to explore.</p>
              <div className="selection-grid">
                {services.map((s) => (
                  <button
                    className={`choice-card ${service === s.slug ? 'chosen' : ''}`}
                    key={s.slug}
                    aria-pressed={service === s.slug}
                    onClick={() => {
                      setService(s.slug);
                      if (!locations.find((l) => l.slug === location)?.services.includes(s.slug)) {
                        setLocation('');
                        setDate('');
                        setTime('');
                      }
                      setErrors({});
                    }}
                  >
                    <Icon name={s.icon} size={28} />
                    <strong>{s.name}</strong>
                    <span>{s.duration}-minute demo visit</span>
                    <span className="choice-check">
                      <Icon name="check" size={15} />
                    </span>
                  </button>
                ))}
              </div>
              <Notice>
                A qualified professional would confirm service suitability in a live experience.
              </Notice>
            </>
          )}
          {step === 1 && (
            <>
              <p>These locations offer your selected service in the concept.</p>
              <div className="selection-list">
                {possibleLocations.map((l) => (
                  <button
                    disabled={!l.appointments}
                    key={l.slug}
                    className={`choice-card location-choice ${location === l.slug ? 'chosen' : ''}`}
                    aria-pressed={location === l.slug}
                    onClick={() => {
                      setLocation(l.slug);
                      setTime('');
                      setErrors({});
                    }}
                  >
                    <Icon name="pin" />
                    <div>
                      <strong>{l.name}</strong>
                      <span>
                        {l.address} · {l.city}
                      </span>
                      <small>
                        {l.appointments
                          ? 'Demo appointments available'
                          : 'No demo appointment slots'}
                      </small>
                    </div>
                    <span className="choice-check">
                      <Icon name="check" size={15} />
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p>Illustrative dates for your visit to {pickedLocation?.name}.</p>
              <div className="date-grid">
                {dates.map((d) => (
                  <button
                    key={d}
                    className={`date-choice ${date === d ? 'chosen' : ''}`}
                    aria-pressed={date === d}
                    onClick={() => {
                      setDate(d);
                      setTime('');
                      setErrors({});
                    }}
                  >
                    <span>{formatDate(d, { weekday: 'short' })}</span>
                    <strong>{formatDate(d, { day: 'numeric' })}</strong>
                    <span>{formatDate(d, { month: 'short' })}</span>
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <p>
                {formatDate(date, { weekday: 'long', month: 'long', day: 'numeric' })} · Eastern
                Time
              </p>
              <div className="time-grid">
                {times.map((t) => (
                  <button
                    key={t}
                    className={`time-choice ${time === t ? 'chosen' : ''}`}
                    aria-pressed={time === t}
                    onClick={() => {
                      setTime(t);
                      setErrors({});
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <Notice>Times are illustrative and do not represent real availability.</Notice>
            </>
          )}
          {step === 4 && (
            <>
              <p>You can explore the booking flow either way.</p>
              <div className="selection-grid">
                {[
                  {
                    key: 'guest',
                    title: 'Continue as a guest',
                    text: 'Use sample contact details for this visit.',
                    icon: 'user',
                  },
                  {
                    key: 'member',
                    title: 'Continue as a demo member',
                    text: 'Use Alex’s fictional member profile.',
                    icon: 'bag',
                  },
                ].map((item) => (
                  <button
                    className={`choice-card ${account === item.key ? 'chosen' : ''}`}
                    key={item.key}
                    aria-pressed={account === item.key}
                    onClick={() => {
                      setAccount(item.key);
                      setContact(
                        item.key === 'member'
                          ? { name: profile.name, email: profile.email, phone: profile.phone }
                          : { name: '', email: '', phone: '' },
                      );
                      setErrors({});
                    }}
                  >
                    <Icon name={item.icon} size={28} />
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                    <span className="choice-check">
                      <Icon name="check" size={15} />
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 5 && (
            <form
              id="contact-form"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
            >
              <p>Use sample information. Details are held in memory and are never sent.</p>
              <div className="form-grid">
                <Field id="contact-name" label="Name" error={errors.name}>
                  <input
                    id="contact-name"
                    autoComplete="off"
                    value={contact.name}
                    maxLength={80}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    required
                  />
                </Field>
                <Field id="contact-email" label="Email" error={errors.email}>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="off"
                    value={contact.email}
                    maxLength={120}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    required
                  />
                </Field>
                <Field
                  id="contact-phone"
                  label="Phone (optional)"
                  error={errors.phone}
                  hint="No calls or texts are sent in the demo."
                >
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="off"
                    value={contact.phone}
                    maxLength={30}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    aria-invalid={!!errors.phone}
                    aria-describedby={`contact-phone-hint${errors.phone ? ' contact-phone-error' : ''}`}
                  />
                </Field>
              </div>
              <label className="checkbox consent">
                <input
                  id="contact-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                />
                I understand this is a portfolio concept and no real appointment is booked.
              </label>
              {errors.consent && (
                <p className="field-error" id="consent-error">
                  {errors.consent}
                </p>
              )}
            </form>
          )}
          {step === 6 && (
            <>
              <p>Everything look right? You can go back to make a change.</p>
              <dl className="review-list">
                <div>
                  <dt>Service</dt>
                  <dd>{pickedService?.name}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>
                    {pickedLocation?.name}
                    <small>
                      {pickedLocation?.address}, {pickedLocation?.city}
                    </small>
                  </dd>
                </div>
                <div>
                  <dt>Date & time</dt>
                  <dd>
                    {formatDate(date)} · {time} ET
                  </dd>
                </div>
                <div>
                  <dt>Guest / member</dt>
                  <dd>{account === 'member' ? 'Demo member' : 'Guest'}</dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>
                    {contact.name}
                    <small>
                      {contact.email}
                      {contact.phone && ` · ${contact.phone}`}
                    </small>
                  </dd>
                </div>
              </dl>
              <Notice>
                Confirming creates a demo appointment in your member space for this browser session.
                No email is sent.
              </Notice>
            </>
          )}
          {step === 7 && (
            <>
              <div className="confirmation-icon">
                <Icon name="success" size={48} />
              </div>
              <p>
                Your visit details are ready to explore in the member space. This is a confirmation
                concept, with no real booking.
              </p>
              <div className="confirmation-reference">
                <span className="eyebrow">DEMO REFERENCE</span>
                <strong>{reference}</strong>
              </div>
              <div className="actions">
                <ActionLink href="/member/appointments">View your demo appointments</ActionLink>
                <button className="button button-secondary" onClick={downloadCalendar}>
                  <Icon name="calendar" size={18} />
                  Download demo calendar event
                </button>
              </div>
              <Notice>
                No real appointment has been booked, and no confirmation email has been sent.
              </Notice>
            </>
          )}
          {errors.selection && (
            <p id="step-error" className="validation-summary" role="alert" tabIndex={-1}>
              {errors.selection}
            </p>
          )}
          {step < 7 && (
            <div className="booking-controls">
              {step > 0 ? (
                <button onClick={goBack} className="button button-secondary">
                  <Icon name="back" size={18} />
                  Back
                </button>
              ) : (
                <ActionLink href="/health-services" variant="text" icon="back">
                  Explore services
                </ActionLink>
              )}
              {step === 5 ? (
                <button type="submit" form="contact-form" className="button button-primary">
                  Review visit
                  <Icon name="right" size={18} />
                </button>
              ) : (
                <button className="button button-primary" onClick={next}>
                  {step === 6 ? 'Confirm demo appointment' : 'Continue'}
                  <Icon name="right" size={18} />
                </button>
              )}
            </div>
          )}
        </section>
        <aside className="booking-summary">
          <span className="eyebrow">YOUR VISIT, AT A GLANCE</span>
          <h2>
            A little time.
            <br />A clear next step.
          </h2>
          <dl>
            <div>
              <dt>
                <Icon name="chat" size={18} />
                Service
              </dt>
              <dd>{pickedService?.name ?? 'Choose your service'}</dd>
            </div>
            <div>
              <dt>
                <Icon name="pin" size={18} />
                Location
              </dt>
              <dd>{pickedLocation?.name ?? 'Find a neighborhood place'}</dd>
            </div>
            <div>
              <dt>
                <Icon name="calendar" size={18} />
                Date & time
              </dt>
              <dd>
                {date ? formatDate(date) : 'Make time for you'}
                {time && <small>{time} · Eastern Time</small>}
              </dd>
            </div>
          </dl>
          <small>Concept experience. All services, locations, and time slots are fictional.</small>
        </aside>
      </div>
    </div>
  );
}
