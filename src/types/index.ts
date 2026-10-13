export type Service = {
  slug: string;
  name: string;
  short: string;
  category: string;
  icon: string;
  duration: number;
  description: string;
  expectations: string[];
  preparation: string;
  color: string;
};
export type Location = {
  slug: string;
  name: string;
  neighborhood: string;
  city: string;
  zip: string;
  address: string;
  distance: string;
  hours: string;
  open: boolean;
  appointments: boolean;
  services: string[];
  x: number;
  y: number;
};
export type Article = {
  slug: string;
  title: string;
  category: string;
  readTime: number;
  intro: string;
  sections: { title: string; text: string }[];
  color: string;
  icon: string;
};
export type Prescription = {
  id: string;
  name: string;
  strength: string;
  status: 'Ready for pickup' | 'Refill available' | 'Review needed' | 'Refill requested';
  refills: number;
  location: string;
  lastFilled: string;
  refillDate: string;
  reminder: boolean;
};
export type Appointment = {
  id: string;
  service: string;
  location: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  name?: string;
};
export type Profile = {
  name: string;
  email: string;
  phone: string;
  location: string;
  emailUpdates: boolean;
  textUpdates: boolean;
};
export type Campaign = {
  slug: string;
  label: string;
  headline: string;
  copy: string;
  cta: string;
  color: string;
  icon: string;
};
