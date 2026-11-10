import { sitePath } from '@/config/business';
import { IPTVExplained } from '@/components/germaniptv/iptv-explained';
import { Hero } from '@/components/germaniptv/hero';
import { CategoryCarousel, MovieCarousel } from '@/components/germaniptv/catalog';
import { Pricing } from '@/components/germaniptv/pricing';
import { Features, HowItWorks, Reviews, FAQ } from '@/components/germaniptv/sections';
import { catalog } from '@/content/catalog';
import { seo, StructuredData } from '@/lib/seo';
import { CatalogCollections } from '@/components/germaniptv/collections';
export const metadata = seo('/');
export default function Home() { return <><StructuredData path="/" /><Hero /><div className="container home-content"><CategoryCarousel /><div className="catalog-intro"><span className="eyebrow">NEUE WELTEN ENTDECKEN</span><span>Open Movies · redaktionell kuratiert · <a href={sitePath('/filme#verfuegbarkeit')}>kein zugesicherter Abo-Inhalt</a></span></div><div className="home-catalog"><MovieCarousel title="Filme entdecken" items={catalog.filter(t => t.type === 'movie').slice(0, 5)} compact /><MovieCarousel title="Noch mehr Geschichten" items={[...catalog.filter(t => t.type === 'series'), ...catalog.filter(t => ['cosmos-laundromat', 'big-buck-bunny'].includes(t.id))]} href={sitePath('/serien')} compact /></div><CatalogCollections /><Pricing /><Features /><HowItWorks /><IPTVExplained /><Reviews /><FAQ short /><div className="closing-cta"><div><span className="eyebrow">DEIN NÄCHSTER SCHRITT</span><h2>Bereit für deinen nächsten Lieblingsmoment?</h2><p>Finde deinen Plan. Kläre die Details. Entscheide in Ruhe.</p></div><a className="button" href={sitePath('/preise')}>Pläne entdecken <span aria-hidden="true">→</span></a></div></div></>; }
