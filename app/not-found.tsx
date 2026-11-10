import { sitePath } from '@/config/business';
import { Icon } from '@/components/germaniptv/icon';
export default function NotFound() { return <div className="container not-found"><span className="eyebrow">404 · SZENE NICHT GEFUNDEN</span><h1>Hier läuft gerade nichts.</h1><p>Diese Seite existiert nicht. Entdecke stattdessen unsere Filme oder finde deinen Plan.</p><a className="button" href={sitePath('/')}>Zur Startseite <Icon name="arrow" /></a></div>; }
