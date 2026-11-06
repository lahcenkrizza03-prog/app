'use client';
import { useState } from 'react';
import { catalog } from '@/content/catalog';
import { MovieCarousel } from './catalog';
import { Icon } from './icon';
const collections = [
  { label: 'Film-Highlights', description: 'Redaktionelle Auswahl. Es liegen keine verifizierten Beliebtheitsdaten vor.', items: catalog.filter(t => t.type === 'movie') },
  { label: 'Kurzfilmreihen', description: 'Eigenständige Folgen der Caminandes-Reihe, keine unbestätigten Serienstaffeln.', items: catalog.filter(t => t.type === 'series') },
  { label: 'Neuerscheinungen', description: 'Hier erscheinen geprüfte neue Titel aus dem aktuellen und dem vergangenen Jahr.', items: catalog.filter(t => t.year >= new Date().getFullYear() - 1) },
  ...['Action & Abenteuer', 'Drama', 'Komödien', 'Science-Fiction', 'Dokumentationen'].map(genre => ({ label: genre, description: 'Open Movies entdecken, Quellen und Verfügbarkeit in den Details prüfen.', items: catalog.filter(t => t.genres.includes(genre)) })),
  { label: 'Sport', description: 'Sportereignisse werden erst mit bestätigten Übertragungsrechten für Deutschland veröffentlicht.', items: [] },
];
export function CatalogCollections() {
  const [selected, setSelected] = useState(0);
  const current = collections[selected];
  return <details className="collections-disclosure"><summary><span><Icon name="movie" size={16} /> Noch mehr Filmwelten entdecken</span><span>9 Kategorien <Icon name="down" size={15} /></span></summary><div className="collections-content"><div className="filter-pills" role="group" aria-label="Filmwelt auswählen">{collections.map((c, i) => <button key={c.label} onClick={() => setSelected(i)} aria-pressed={selected === i} className={selected === i ? 'selected' : ''}>{c.label}</button>)}</div><p className="collection-description" aria-live="polite">{current.description}</p>{current.items.length ? <MovieCarousel key={current.label} title={current.label} items={current.items} href={selected === 1 ? '/serien' : selected > 2 ? `/filme?genre=${encodeURIComponent(current.label)}` : '/filme'} /> : <div className="collection-empty"><Icon name={selected === 8 ? 'sport' : 'movie'} size={26} /><div><h2>{current.label}</h2><p>Für diese Kategorie liegen noch keine passenden, geprüften Inhalte vor.</p></div><a className="inline-link" href="/kontakt">Verfügbarkeit anfragen <Icon name="arrow" size={15} /></a></div>}</div></details>;
}
