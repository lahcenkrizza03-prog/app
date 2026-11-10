import { sitePath } from '@/config/business';

export function IPTVExplained() {
  return <section className="section iptv-explained" aria-labelledby="iptv-explained-heading">
    <div className="comparison-intro">
      <span className="eyebrow">VOR DER PLANANFRAGE</span>
      <h2 id="iptv-explained-heading">IPTV in Deutschland: Was solltest du wissen?</h2>
      <p>IPTV bedeutet Fernsehen über eine Internetverbindung. Ein IPTV-Player ist eine Anwendung zum Abspielen; das Fernsehangebot und die dazugehörigen Nutzungsrechte sind davon getrennt zu prüfen.</p>
    </div>
    <div className="explainer-grid">
      <article><span className="explainer-number">01</span><h3>Welches IPTV Abo passt zu dir?</h3><p>Vergleiche den Gesamtpreis für die Laufzeit und die Zahl gleichzeitiger Geräte. Bei upip-tv.com stehen ein, drei, sechs und zwölf Monate für jeweils ein Gerät zur Anfrage. Der Zugang verlängert sich nicht automatisch.</p><a href={sitePath('/preise')} className="inline-link">Alle vier Laufzeiten vergleichen →</a></article>
      <article><span className="explainer-number">02</span><h3>Was brauchst du auf dem Smart TV?</h3><p>Notiere Modell, Betriebssystem und gewünschte App. Ob IPTV auf deinem Smart TV oder Streaming-Stick funktioniert, hängt von dieser Kombination und der Freigabe des Dienstes ab. Eine 4K-Anzeige allein garantiert keinen 4K-Stream.</p><a href={sitePath('/ratgeber/iptv-smart-tv-checkliste')} className="inline-link">Smart-TV-Checkliste lesen →</a></article>
      <article><span className="explainer-number">03</span><h3>Wie prüfst du einen Anbieter?</h3><p>Lass dir den Vertragspartner, die konkrete Senderliste und die Verbreitungsrechte für Deutschland nennen. Kläre Zahlungsweg, Aktivierungsfrist, zusätzliche Kosten und Erstattungsbedingungen vor einer Zahlung.</p><a href={sitePath('/ratgeber/iptv-anbieter-pruefen')} className="inline-link">Anbieter-Check vorbereiten →</a></article>
    </div>
    <p className="explainer-source">Grundlagen zur Übertragung: <a href="https://www.telekom.de/magenta-tv/iptv" target="_blank" rel="noopener noreferrer">Telekom: IPTV erklärt</a>. Die hier gezeigten Open Movies sind redaktionelle Empfehlungen mit eigenen Quellen; eine bestätigte Sender- oder Filmliste für das angefragte Abo ist vorab zu klären.</p>
  </section>;
}
