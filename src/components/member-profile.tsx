'use client';
import { useState } from 'react';
import { useDemo } from './demo-provider';
import { locations } from '@/data/content';
import { validEmail } from '@/lib/utils';
import { Field, Icon, Notice } from './ui';
export function MemberProfile() {
  const { profile, updateProfile, notify } = useDemo();
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = 'Enter a name with at least two characters.';
    if (!validEmail(form.email)) next.email = 'Enter a valid email, such as alex@example.com.';
    if (
      form.phone &&
      (!/^[+()\d\s.-]+$/.test(form.phone) || form.phone.replace(/\D/g, '').length < 10)
    )
      next.phone = 'Enter at least 10 digits, or leave the phone field blank.';
    if (form.textUpdates && !form.phone)
      next.phone = 'Add a demo phone number to turn on text preferences.';
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`profile-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    updateProfile({ ...form, name: form.name.trim() });
    notify('Your demo profile and preferences are saved for this session.');
  };
  return (
    <>
      <div className="member-page-header">
        <div>
          <span className="eyebrow">MAKE YOUR SPACE FEEL FAMILIAR</span>
          <h1>Your profile.</h1>
          <p>Keep your preferred location and communication choices together.</p>
        </div>
      </div>
      <div className="profile-layout">
        <form className="profile-form" onSubmit={save} noValidate>
          <h2>Your demo details</h2>
          <div className="form-grid">
            <Field id="profile-name" label="Name" error={errors.name}>
              <input
                id="profile-name"
                value={form.name}
                maxLength={80}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoComplete="off"
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'profile-name-error' : undefined}
              />
            </Field>
            <Field id="profile-email" label="Email" error={errors.email}>
              <input
                id="profile-email"
                type="email"
                value={form.email}
                maxLength={120}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="off"
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'profile-email-error' : undefined}
              />
            </Field>
            <Field id="profile-phone" label="Phone (optional)" error={errors.phone}>
              <input
                id="profile-phone"
                type="tel"
                value={form.phone}
                maxLength={30}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                autoComplete="off"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'profile-phone-error' : undefined}
              />
            </Field>
            <Field id="profile-location" label="Preferred location">
              <select
                id="profile-location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              >
                {locations.map((l) => (
                  <option value={l.slug} key={l.slug}>
                    {l.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <h2>Communication preferences</h2>
          <p>These choices simulate settings. No messages are sent.</p>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.emailUpdates}
              onChange={(e) => setForm({ ...form, emailUpdates: e.target.checked })}
            />
            Email updates concept
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.textUpdates}
              onChange={(e) => setForm({ ...form, textUpdates: e.target.checked })}
            />
            Text updates concept
          </label>
          <button className="button button-primary" type="submit">
            Save demo profile
            <Icon name="check" size={18} />
          </button>
        </form>
        <aside className="profile-aside">
          <Icon name="user" size={30} />
          <h2>A space for the demo.</h2>
          <p>
            Use sample information while exploring. Your profile changes stay in memory and reset
            when you reload the application.
          </p>
          <Notice>
            Do not enter real health information, passwords, or sensitive personal details.
          </Notice>
        </aside>
      </div>
    </>
  );
}
