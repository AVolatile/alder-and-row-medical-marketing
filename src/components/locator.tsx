'use client';
import { useEffect, useState } from 'react';
import { locations, services } from '@/data/content';
import { LocationCard } from './cards';
import { Breadcrumbs, EmptyState, Field, Icon, Notice, PageIntro } from './ui';
export function Locator() {
  const [search, setSearch] = useState('');
  const [service, setService] = useState('');
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState(false);
  const [selected, setSelected] = useState('maple-square');
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const item = query.get('service');
    if (services.some((s) => s.slug === item)) setService(item!);
  }, []);
  const results = locations.filter(
    (l) =>
      (!search.trim() ||
        `${l.name} ${l.address} ${l.city} ${l.zip} ${l.neighborhood}`
          .toLowerCase()
          .includes(search.trim().toLowerCase())) &&
      (!service || l.services.includes(service)) &&
      (!open || l.open) &&
      (!available || l.appointments),
  );
  const active = results.find((l) => l.slug === selected) ?? results[0];
  const reset = () => {
    setSearch('');
    setService('');
    setOpen(false);
    setAvailable(false);
  };
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: 'Locations' }]} />
      <PageIntro
        eyebrow="PART OF YOUR NEIGHBORHOOD"
        title="Find a familiar place."
        text="Explore our fictional neighborhood locations. Start with a city, demo ZIP, or the service you have in mind."
      />
      <div className="locator-filters">
        <Field
          id="location-search"
          label="City, ZIP, or neighborhood"
          hint="Try Brookmere, Fielden, or 00001."
        >
          <div className="search-input">
            <Icon name="search" size={20} />
            <input
              id="location-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Where would you like to go?"
              aria-describedby="location-search-hint"
            />
            {search && (
              <button onClick={() => setSearch('')} aria-label="Clear location search">
                <Icon name="close" size={16} />
              </button>
            )}
          </div>
        </Field>
        <Field id="service-filter" label="What brings you in?">
          <select id="service-filter" value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">All services</option>
            {services.map((s) => (
              <option value={s.slug} key={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>
        <div className="filter-checks">
          <label className="checkbox">
            <input type="checkbox" checked={open} onChange={(e) => setOpen(e.target.checked)} />
            Open in demo
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            Demo appointments available
          </label>
        </div>
      </div>
      <div className="locator-result-bar">
        <p role="status">
          <strong>{results.length}</strong> {results.length === 1 ? 'location' : 'locations'} found
        </p>
        <button className="button button-text" onClick={reset}>
          Reset filters
          <Icon name="close" size={16} />
        </button>
      </div>
      <div className="locator-layout">
        <div className="locator-results">
          {results.length ? (
            results.map((l) => (
              <LocationCard
                key={l.slug}
                location={l}
                selected={active?.slug === l.slug}
                onSelect={() => setSelected(l.slug)}
              />
            ))
          ) : (
            <EmptyState
              title="No locations match just yet."
              text="Try Brookmere or Fielden, choose another service, or clear the filters."
            >
              <button className="button button-primary" onClick={reset}>
                Clear filters
              </button>
            </EmptyState>
          )}
        </div>
        <div
          className="locator-map"
          aria-label="Illustrative neighborhood map. Use the location cards for full details."
        >
          <div className="map-grid" />
          <span className="map-river" />
          <span className="map-park park-one">MAPLE GREEN</span>
          <span className="map-park park-two">WEST GARDEN</span>
          <span className="map-road road-one">ALDER LANE</span>
          <span className="map-road road-two">CEDAR MEWS</span>
          <span className="map-city">BROOKMERE</span>
          {results.map((l, i) => (
            <button
              key={l.slug}
              className={`map-pin ${active?.slug === l.slug ? 'active' : ''}`}
              style={{ left: `${l.x}%`, top: `${l.y}%` }}
              aria-label={`Select ${l.name} on map`}
              aria-pressed={active?.slug === l.slug}
              onClick={() => setSelected(l.slug)}
            >
              {i + 1}
            </button>
          ))}
          {active && (
            <div className="map-selected">
              <Icon name="pin" />
              <div>
                <strong>{active.name}</strong>
                <span>
                  {active.address} · {active.city}
                </span>
              </div>
            </div>
          )}
          <span className="map-demo">ILLUSTRATIVE MAP · NOT FOR NAVIGATION</span>
        </div>
      </div>
      <Notice>
        All locations, addresses, ZIPs, hours, distances, and service availability are fictional
        demo information. Search does not use your device location.
      </Notice>
      <div className="section-spacer" />
    </div>
  );
}
