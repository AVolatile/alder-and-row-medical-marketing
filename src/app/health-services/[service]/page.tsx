import { notFound } from 'next/navigation';
import { services } from '@/data/content';
import { ServiceDetail } from '@/components/service-pages';
export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  return { title: services.find((s) => s.slug === service)?.name ?? 'Service' };
}
export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const item = services.find((s) => s.slug === service);
  if (!item) notFound();
  return <ServiceDetail service={item} />;
}
