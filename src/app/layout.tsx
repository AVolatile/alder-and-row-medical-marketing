import type { Metadata } from 'next';
import { Header, Footer } from '@/components/shell';
import { DemoProvider } from '@/components/demo-provider';
import '@/styles/globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://alderandrow.example'),
  title: { default: 'Alder & Row | Pharmacy & everyday care', template: '%s | Alder & Row' },
  description:
    'A neighborhood pharmacy and everyday care experience. A self-initiated design and development concept by Anthony Volatile / Volatile Solutions.',
  robots: { index: false, follow: false },
  icons: { icon: '/brand/favicon.svg' },
  openGraph: {
    title: 'Alder & Row — A little closer to everyday care',
    description: 'A pharmacy and everyday care portfolio concept by Anthony Volatile.',
    images: ['/brand/og.png'],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DemoProvider>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </DemoProvider>
      </body>
    </html>
  );
}
