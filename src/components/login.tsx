'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ActionLink, Field, Icon, Notice, Symbol } from './ui';
import { validEmail } from '@/lib/utils';
import { useDemo } from './demo-provider';
export function Login() {
  const [mode, setMode] = useState<'login' | 'create' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { notify } = useDemo();
  const changeMode = (next: typeof mode) => {
    setMode(next);
    setErrors({});
    setSuccess(false);
    setPassword('');
  };
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const issues: Record<string, string> = {};
    if (!validEmail(email)) issues.email = 'Enter a valid sample email, such as alex@example.com.';
    if (mode !== 'reset' && password.length < 8)
      issues.password = 'Use a demo password with at least 8 characters.';
    setErrors(issues);
    if (Object.keys(issues).length) {
      document.getElementById(`login-${Object.keys(issues)[0]}`)?.focus();
      return;
    }
    setPassword('');
    if (mode === 'reset') {
      setSuccess(true);
      notify('Demo reset flow complete. No email was sent.');
    } else {
      notify(
        mode === 'create'
          ? 'Demo account opened. No real account was created.'
          : 'Welcome to the demo member space.',
      );
      router.push('/member');
    }
  }
  return (
    <div className="container login-layout">
      <div className="login-art">
        <span className="eyebrow">YOUR EVERYDAY CARE COMPANION</span>
        <h2>
          A little less
          <br />
          on your mind.
        </h2>
        <p>
          Your pharmacy tasks, appointment details, and preferred neighborhood place. Together in
          your member space.
        </p>
        <div className="art-arch">
          <Symbol />
        </div>
      </div>
      <div className="login-form">
        <span className="eyebrow">ALDER & ROW MEMBER SPACE</span>
        <h1>
          {mode === 'login'
            ? 'Welcome back.'
            : mode === 'create'
              ? 'Make yourself at home.'
              : 'A fresh start.'}
        </h1>
        <p>
          {mode === 'login'
            ? 'Explore a familiar place for your everyday care.'
            : mode === 'create'
              ? 'Try the account-creation experience with sample details.'
              : 'Preview a password-reset request with a sample email.'}
        </p>
        <form onSubmit={submit} noValidate>
          <Field id="login-email" label="Sample email" error={errors.email}>
            <input
              id="login-email"
              type="email"
              autoComplete="off"
              placeholder="alex@example.com"
              value={email}
              maxLength={120}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
            />
          </Field>
          {mode !== 'reset' && (
            <Field
              id="login-password"
              label="Demo password"
              error={errors.password}
              hint="Use a sample password, never a real account password."
            >
              <input
                id="login-password"
                type="password"
                autoComplete="off"
                value={password}
                maxLength={100}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={!!errors.password}
                aria-describedby={`login-password-hint${errors.password ? ' login-password-error' : ''}`}
              />
            </Field>
          )}
          <button className="button button-primary" type="submit">
            {mode === 'login'
              ? 'Open demo member space'
              : mode === 'create'
                ? 'Create demo account'
                : 'Preview reset request'}
            <Icon name="right" size={18} />
          </button>
          {success && (
            <p role="status">
              Demo reset request confirmed. No account was changed and no email was sent.
            </p>
          )}
        </form>
        <div className="login-options">
          <button
            className="button button-text"
            onClick={() => changeMode(mode === 'login' ? 'reset' : 'login')}
          >
            {mode === 'login' ? 'Forgot password?' : 'Back to sign in'}
          </button>
          <button
            className="button button-text"
            onClick={() => changeMode(mode === 'create' ? 'login' : 'create')}
          >
            {mode === 'create' ? 'Already have an account?' : 'Create an account'}
          </button>
        </div>
        <ActionLink className="demo-login" href="/member" variant="text">
          Take a look without signing in
        </ActionLink>
        <Notice>
          Concept login only. There is no authentication service, account creation, or email
          delivery. Credentials are never sent or saved.
        </Notice>
      </div>
    </div>
  );
}
