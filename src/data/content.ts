import campaignRecords from './campaigns.json';
import type {
  Service,
  Location,
  Article,
  Prescription,
  Appointment,
  Profile,
  Campaign,
} from '@/types';
export const services: Service[] = [
  {
    slug: 'vaccinations',
    name: 'Vaccinations',
    short: 'A little planning. A place nearby.',
    category: 'Preventative care',
    icon: 'shield',
    duration: 20,
    description:
      'Explore seasonal vaccination visits and travel vaccination consultations. Choose a convenient location and leave the clinical questions to a qualified professional.',
    expectations: [
      'A conversation about the service and your questions.',
      'A professional review of suitability before any service.',
      'Time to understand the next steps.',
    ],
    preparation:
      'Bring your questions. In a live service, the care team would confirm eligibility, records, and any preparation before your visit.',
    color: 'peach',
  },
  {
    slug: 'screenings',
    name: 'Health screenings',
    short: 'Make room for a health check-in.',
    category: 'Screenings',
    icon: 'activity',
    duration: 30,
    description:
      'A dedicated time for routine health-screening conversations, with space to ask questions and understand what happens next.',
    expectations: [
      'Check in at your selected neighborhood location.',
      'Talk through the purpose and scope of the visit.',
      'Discuss follow-up questions with a qualified professional.',
    ],
    preparation:
      'The care team would confirm which records or information are useful. This concept does not provide screening instructions or results.',
    color: 'sage',
  },
  {
    slug: 'wellness-consultations',
    name: 'Wellness consultations',
    short: 'A conversation with time for you.',
    category: 'Wellness support',
    icon: 'chat',
    duration: 30,
    description:
      'Set aside time to talk about everyday routines, personal priorities, and questions you would like to bring to a care professional.',
    expectations: [
      'Share the topics you would like to discuss.',
      'Have a focused, private conversation.',
      'Leave with clarity on any recommended next conversation.',
    ],
    preparation:
      'Write down the questions you want to discuss. Clinical advice and service suitability belong with a qualified professional.',
    color: 'yellow',
  },
  {
    slug: 'preventative-services',
    name: 'Preventative services',
    short: 'Small steps, thoughtfully planned.',
    category: 'Preventative care',
    icon: 'sun',
    duration: 25,
    description:
      'Discover appointment-based preventative services and plan a conversation about the options available at your neighborhood location.',
    expectations: [
      'Explore the services offered at the location.',
      'Discuss your questions with the care team.',
      'Understand the scope of a future appointment.',
    ],
    preparation:
      'Service availability and eligibility would be confirmed by the care team in a live experience. No medical recommendations are made here.',
    color: 'lilac',
  },
  {
    slug: 'pharmacy-guidance',
    name: 'Pharmacy conversations',
    short: 'Your questions deserve a conversation.',
    category: 'Pharmacy guidance',
    icon: 'bag',
    duration: 20,
    description:
      'An appointment concept for discussing pharmacy services, prescription logistics, and questions for a qualified pharmacist.',
    expectations: [
      'Talk about managing pharmacy tasks.',
      'Review pickup and reminder preferences.',
      'Ask a qualified professional your medication questions.',
    ],
    preparation:
      'Do not enter real prescription or medical details in this demo. A live pharmacy would provide a secure intake process.',
    color: 'sand',
  },
];
export const locations: Location[] = [
  {
    slug: 'maple-square',
    name: 'Maple Square',
    neighborhood: 'Maple Square',
    city: 'Brookmere',
    zip: '00001',
    address: '24 Alder Lane',
    distance: '0.8 mi',
    hours: '9:00 am – 7:00 pm',
    open: true,
    appointments: true,
    services: [
      'vaccinations',
      'screenings',
      'wellness-consultations',
      'preventative-services',
      'pharmacy-guidance',
    ],
    x: 47,
    y: 42,
  },
  {
    slug: 'river-walk',
    name: 'River Walk',
    neighborhood: 'Riverside',
    city: 'Brookmere',
    zip: '00002',
    address: '86 Row Street',
    distance: '1.6 mi',
    hours: '9:00 am – 6:00 pm',
    open: true,
    appointments: true,
    services: ['vaccinations', 'wellness-consultations', 'pharmacy-guidance'],
    x: 73,
    y: 67,
  },
  {
    slug: 'west-garden',
    name: 'West Garden',
    neighborhood: 'West Garden',
    city: 'Brookmere',
    zip: '00003',
    address: '12 Garden Passage',
    distance: '2.4 mi',
    hours: '10:00 am – 5:00 pm',
    open: false,
    appointments: false,
    services: ['screenings', 'preventative-services', 'pharmacy-guidance'],
    x: 23,
    y: 72,
  },
  {
    slug: 'cedar-market',
    name: 'Cedar Market',
    neighborhood: 'Cedar District',
    city: 'Fielden',
    zip: '00004',
    address: '41 Cedar Mews',
    distance: '4.2 mi',
    hours: '8:00 am – 8:00 pm',
    open: true,
    appointments: true,
    services: ['vaccinations', 'screenings', 'preventative-services', 'pharmacy-guidance'],
    x: 68,
    y: 22,
  },
];
export const articles: Article[] = [
  {
    slug: 'a-little-preparation',
    title: 'A little preparation. A more useful appointment.',
    category: 'Preventative care',
    readTime: 4,
    intro:
      'You do not need a perfect checklist. A few written questions can help you make the most of a conversation with your care team.',
    sections: [
      {
        title: 'Start with what matters to you',
        text: 'Think about what you want to understand by the end of the visit. Write down your questions in your own words so you can return to them during the conversation.',
      },
      {
        title: 'Know the practical details',
        text: 'Confirm the location, appointment time, and accessibility needs with the care team. Ask which documents or records they would like you to bring.',
      },
      {
        title: 'Leave with a clear next step',
        text: 'If anything is unclear, ask the professional to explain it again. Confirm how to contact the service if a question comes up later. This article is an illustrative guide to appointment planning, not medical advice.',
      },
    ],
    color: 'sage',
    icon: 'calendar',
  },
  {
    slug: 'prescription-routine',
    title: 'Give your pharmacy tasks a place in your week.',
    category: 'Prescriptions',
    readTime: 3,
    intro:
      'Pickup plans, reminder preferences, and a familiar location can help organize everyday pharmacy logistics.',
    sections: [
      {
        title: 'Keep logistics together',
        text: 'A member account can keep pickup locations and refill-request status in one place. In this concept, all prescription information is fictional and every action is simulated.',
      },
      {
        title: 'Make reminders work for your day',
        text: 'Choose a reminder preference you find useful. Reminders in this demo track pharmacy tasks; they do not provide medication schedules or instructions.',
      },
      {
        title: 'Bring questions to your pharmacist',
        text: 'For questions about medicines, doses, interactions, or changes to a prescription, contact a qualified professional. A digital interface should support that conversation rather than replace it.',
      },
    ],
    color: 'peach',
    icon: 'bag',
  },
  {
    slug: 'neighborhood-location',
    title: 'What to look for in a neighborhood care location.',
    category: 'Pharmacy guidance',
    readTime: 5,
    intro:
      'Hours are only part of the picture. Service availability and accessibility matter, too.',
    sections: [
      {
        title: 'Check the service, then the place',
        text: 'Use service filters to see locations offering the appointment type you are exploring. In a live experience, check actual availability with the location before making plans.',
      },
      {
        title: 'Plan for access',
        text: 'Look for information about step-free entry, seating, and private consultation spaces. Contact the team to discuss any specific accommodations you need.',
      },
      {
        title: 'Find a familiar routine',
        text: 'Choose a location that fits your travel and scheduling needs. The locations in Alder & Row are fictional examples created to demonstrate discovery and booking UX.',
      },
    ],
    color: 'yellow',
    icon: 'pin',
  },
  {
    slug: 'seasonal-check-in',
    title: 'Put a seasonal check-in on your calendar.',
    category: 'Seasonal health',
    readTime: 3,
    intro:
      'A change of season can be a helpful prompt to revisit the practical things you have been meaning to organize.',
    sections: [
      {
        title: 'Make a short list',
        text: 'Review any appointments you have been meaning to arrange and questions you want to bring to a care professional. There is no need to do everything at once.',
      },
      {
        title: 'Ask about services',
        text: 'A qualified professional can explain which services are appropriate for you. This concept shows a way to discover appointment categories without recommending a vaccine or treatment.',
      },
      {
        title: 'Keep the details accessible',
        text: 'Save the location and time somewhere easy to find. Confirm details with your care team, especially if your plans change.',
      },
    ],
    color: 'lilac',
    icon: 'sun',
  },
  {
    slug: 'questions-worth-asking',
    title: 'The questions worth taking with you.',
    category: 'Everyday wellness',
    readTime: 4,
    intro:
      'A good conversation starts with the things you want to understand, even if you are not sure how to phrase them.',
    sections: [
      {
        title: 'Use your own words',
        text: 'You do not need medical terminology to ask a useful question. Tell the professional what you are trying to understand and ask for a plain-language explanation.',
      },
      {
        title: 'Take a moment to check understanding',
        text: 'Repeat what you have understood and ask whether you have missed anything. Request written information in a format that works for you.',
      },
      {
        title: 'Know where to ask next',
        text: 'Before leaving, ask who to contact with follow-up questions. This sample resource demonstrates editorial content structure and does not give medical advice.',
      },
    ],
    color: 'sand',
    icon: 'chat',
  },
];
export const initialPrescriptions: Prescription[] = [
  {
    id: 'DEMO-1042',
    name: 'Sample medication A',
    strength: '10 mg · fictional display',
    status: 'Ready for pickup',
    refills: 2,
    location: 'maple-square',
    lastFilled: '2026-10-01',
    refillDate: '2026-11-01',
    reminder: true,
  },
  {
    id: 'DEMO-1086',
    name: 'Sample medication B',
    strength: '20 mg · fictional display',
    status: 'Refill available',
    refills: 1,
    location: 'maple-square',
    lastFilled: '2026-09-15',
    refillDate: '2026-10-15',
    reminder: false,
  },
  {
    id: 'DEMO-1120',
    name: 'Sample medication C',
    strength: '5 mg · fictional display',
    status: 'Review needed',
    refills: 0,
    location: 'river-walk',
    lastFilled: '2026-09-22',
    refillDate: '2026-10-22',
    reminder: false,
  },
];
export const initialAppointments: Appointment[] = [
  {
    id: 'AR-DEMO-2401',
    service: 'Wellness consultations',
    location: 'maple-square',
    date: '2026-10-22',
    time: '10:30 am',
    status: 'Upcoming',
  },
  {
    id: 'AR-DEMO-2106',
    service: 'Pharmacy conversations',
    location: 'maple-square',
    date: '2026-09-12',
    time: '2:00 pm',
    status: 'Completed',
  },
];
export const initialProfile: Profile = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  phone: '202-555-0146',
  location: 'maple-square',
  emailUpdates: true,
  textUpdates: false,
};
export const campaigns: Campaign[] = campaignRecords;
export const navItems = [
  { href: '/pharmacy', label: 'Pharmacy' },
  { href: '/vaccinations', label: 'Vaccinations' },
  { href: '/health-services', label: 'Health services' },
  { href: '/locations', label: 'Locations' },
  { href: '/resources', label: 'Resources' },
];
