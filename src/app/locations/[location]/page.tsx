import { notFound } from 'next/navigation';
import { locations } from '@/data/content';
import { LocationDetail } from '@/components/location-detail';
export function generateStaticParams() {
  return locations.map((l) => ({ location: l.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  return {
    title: `${locations.find((l) => l.slug === location)?.name ?? 'Location'} neighborhood location`,
  };
}
export default async function Page({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const item = locations.find((l) => l.slug === location);
  if (!item) notFound();
  return <LocationDetail location={item} />;
}
