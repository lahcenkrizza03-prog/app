import { sitePath } from '@/config/business';

export function IptvBasicsComparison() {
  return <div className="table-scroll" role="region" aria-label="Internetzugang, Player und IPTV Abo vergleichen" tabIndex={0}>
    <table>
      <caption>Drei Bestandteile deiner IPTV-Einrichtung</caption>
      <thead><tr><th scope="col">Bestandteil</th><th scope="col">Das klärst du damit</th><th scope="col">Daraus folgt nicht automatisch</th></tr></thead>
      <tbody>
        <tr><th scope="row">Internetzugang und Gerät</th><td>Wie das Signal dein Empfangsgerät erreicht</td><td>Ein bestimmtes Fernsehprogramm ist enthalten</td></tr>
        <tr><th scope="row">Player oder TV-App</th><td>Welche Oberfläche und Formate die Anwendung unterstützt</td><td>Die App-Lizenz enthält einen TV-Dienst</td></tr>
        <tr><th scope="row">Fernsehabonnement</th><td>Welche bestätigten Inhalte und Nutzungsbedingungen gelten</td><td>Jede App und jedes Gerät funktionieren damit</td></tr>
      </tbody>
    </table>
  </div>;
}

export function IptvDeviceRecord() {
  return <section id="geraete-anfrage" aria-labelledby="geraete-anfrage-heading">
    <h2 id="geraete-anfrage-heading">Deine Gerätefrage in sechs Angaben</h2>
    <p>Halte diese Angaben zusammen. Du kannst offene Felder als Frage kennzeichnen, statt eine Kompatibilität anzunehmen.</p>
    <dl className="legal-fields">
      <dt>Gerät</dt><dd>Hersteller, vollständiges Modell und gegebenenfalls Generation</dd>
      <dt>System</dt><dd>Angezeigte Betriebssystem- und Softwareversion</dd>
      <dt>Player</dt><dd>Name, Herausgeber und Version der vorgesehenen Anwendung</dd>
      <dt>Verbindung</dt><dd>WLAN oder die für das Gerät dokumentierte Kabelverbindung</dd>
      <dt>Gewünschte Nutzung</dt><dd>Programme oder Sprachen sowie die geplante Laufzeit</dd>
      <dt>Offene Frage</dt><dd>Zum Beispiel Gerätefreigabe, App-Kosten oder ein genauer Fehlertext</dd>
    </dl>
    <p>Passwörter und private Playlist-Adressen gehören nicht in diese erste Rückfrage. Prüfe anschließend die <a href={sitePath('/ratgeber/iptv-smart-tv-checkliste')}>Smart-TV-Checkliste</a> oder den <a href={sitePath('/ratgeber/iptv-kosten-laufzeiten')}>Kostenvergleich</a>.</p>
  </section>;
}
