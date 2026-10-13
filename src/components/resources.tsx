'use client';
import { useState } from 'react';
import { articles } from '@/data/content';
import { ArticleCard } from './cards';
import { Breadcrumbs, PageIntro, Notice } from './ui';
export function Resources() {
  const [category, setCategory] = useState('All reads');
  const categories = ['All reads', ...new Set(articles.map((a) => a.category))];
  const results = articles.filter((a) => category === 'All reads' || a.category === category);
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'The Reading Room' }]} />
      <PageIntro
        eyebrow="THE READING ROOM"
        title="Good to know. Easy to take with you."
        text="Practical reads about planning a visit, organizing pharmacy tasks, and asking useful questions."
      />
      <div className="article-filters" role="group" aria-label="Filter resources by topic">
        {categories.map((c) => (
          <button key={c} aria-pressed={c === category} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>
      <p className="eyebrow" role="status">
        {results.length} {results.length === 1 ? 'READ' : 'READS'} TO EXPLORE
      </p>
      <div className="resource-grid">
        {results.map((a) => (
          <ArticleCard article={a} key={a.slug} />
        ))}
      </div>
      <Notice>
        Sample editorial content for a portfolio concept. These articles are high-level planning
        information, not medical advice or clinically reviewed guidance.
      </Notice>
      <div className="section-spacer" />
    </div>
  );
}
