import { notFound } from 'next/navigation';
import { articles } from '@/data/content';
import { ActionLink, Breadcrumbs, Icon, Notice } from '@/components/ui';
export function generateStaticParams() {
  return articles.map((a) => ({ article: a.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ article: string }> }) {
  const { article } = await params;
  return { title: articles.find((a) => a.slug === article)?.title ?? 'The Reading Room' };
}
export default async function Page({ params }: { params: Promise<{ article: string }> }) {
  const { article } = await params;
  const item = articles.find((a) => a.slug === article);
  if (!item) notFound();
  return (
    <div className="container">
      <Breadcrumbs
        items={[{ label: 'The Reading Room', href: '/resources' }, { label: item.category }]}
      />
      <article className="article-detail">
        <span className="eyebrow">{item.category.toUpperCase()}</span>
        <h1>{item.title}</h1>
        <div className="article-meta">
          <span>ALDER & ROW READING ROOM</span>
          <span>· {item.readTime} min read</span>
          <span>· Sample editorial</span>
        </div>
        <p className="article-intro">{item.intro}</p>
        <div className={`article-art surface-${item.color}`}>
          <div className="editorial-orbit" />
          <Icon name={item.icon} size={85} />
          <span className="article-art-caption">GOOD TO KNOW. EASY TO TAKE WITH YOU.</span>
        </div>
        {item.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
        <Notice>
          This is sample concept content, not medical advice or clinically reviewed guidance.
          Consult a qualified professional for medical questions.
        </Notice>
        <div className="reading-room-note">
          A useful conversation starts with a question.
          <br />
          <ActionLink href="/resources" variant="text" icon="back">
            Back to the Reading Room
          </ActionLink>
        </div>
      </article>
    </div>
  );
}
