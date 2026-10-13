'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { initialAppointments, initialPrescriptions, initialProfile } from '@/data/content';
import type { Appointment, Prescription, Profile } from '@/types';
import { Icon } from './ui';
type DemoContextType = {
  prescriptions: Prescription[];
  appointments: Appointment[];
  profile: Profile;
  credits: string[];
  updatePrescription: (id: string, data: Partial<Prescription>) => void;
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (id: string) => void;
  updateProfile: (profile: Profile) => void;
  redeem: (id: string) => void;
  notify: (message: string) => void;
};
const DemoContext = createContext<DemoContextType | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [profile, setProfile] = useState(initialProfile);
  const [credits, setCredits] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const notify = (text: string) => setMessage(text);
  return (
    <DemoContext.Provider
      value={{
        prescriptions,
        appointments,
        profile,
        credits,
        notify,
        updatePrescription: (id, data) =>
          setPrescriptions((current) =>
            current.map((item) => (item.id === id ? { ...item, ...data } : item)),
          ),
        addAppointment: (item) => setAppointments((current) => [item, ...current]),
        cancelAppointment: (id) =>
          setAppointments((current) =>
            current.map((item) => (item.id === id ? { ...item, status: 'Cancelled' } : item)),
          ),
        updateProfile: setProfile,
        redeem: (id) => setCredits((current) => [...current, id]),
      }}
    >
      {children}
      <div className="toast-region" aria-live="polite" aria-atomic="true">
        {message && (
          <div className="toast">
            <Icon name="success" size={22} />
            <p>{message}</p>
            <button aria-label="Dismiss notification" onClick={() => setMessage('')}>
              <Icon name="close" size={18} />
            </button>
          </div>
        )}
      </div>
    </DemoContext.Provider>
  );
}
export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('Demo context requires DemoProvider');
  return context;
}
