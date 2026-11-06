# Performancebericht

Gemessen am 7. November 2026 gegen den lokalen Produktionsbuild im Cloudflare-Worker-Emulator. Lighthouse 13, vorhandenes Chrome, mobile Simulation und gesondertes Desktopprofil. Das sind Laborwerte, keine Messungen echter Besucher in Deutschland.

| Kennzahl | Mobil | Desktop |
| --- | --- | --- |
| Lighthouse Performance | 95 | 100 |
| Barrierefreiheit | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 69 | 69 |
| First Contentful Paint | 0,9 s | 0,3 s |
| Largest Contentful Paint | 3,0 s | 0,7 s |
| Total Blocking Time | 0 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 0,9 s | 0,3 s |

Die einzige nicht bestandene automatische SEO-Prüfung ist die absichtliche Vorschau-Sperre `noindex, follow`. Sie bleibt bis zur Freigabe der Unternehmens-, Rechte- und Vertragsangaben aktiv. Dieser Wert darf nicht durch das Entfernen einer notwendigen Startvoraussetzung kosmetisch verbessert werden. Nach dem öffentlichen Start ist erneut zu messen.

Der mobile LCP liegt noch über dem angestrebten guten Schwellenwert von 2,5 Sekunden. Er wurde im Verlauf durch Bildoptimierung von 3,9 auf 3,0 Sekunden reduziert. Für weitere Verbesserungen nach der Veröffentlichung sind echte Geräte, Hostinglatenz und reale Besucherwerte zu untersuchen. Es wird kein bereits bestandenes Core-Web-Vitals-Feldergebnis behauptet. INP wurde mit diesen Lighthouseläufen nicht gemessen; TBT ist kein Ersatz für INP-Felddaten.

## Umgesetzt

- Hero in AVIF mit responsiver Auswahl und explizitem Preload; WebP-Fallback.
- Hauptmotiv etwa 29 KiB bei 960 Pixeln und 70 KiB bei 1680 Pixeln.
- Poster als responsive AVIF-Dateien mit 240 × 360 und 420 × 630 Pixeln. Kleine Varianten liegen ungefähr bei 6–10 KiB. WebP bleibt als Fallback und für Detailansichten verfügbar.
- Sichtbare Hauptgrafik mit hoher Ladepriorität; Poster mit Lazy Loading, asynchroner Dekodierung und niedriger Priorität.
- Keine automatisch geladenen Video-, WhatsApp-, Review- oder Analyse-Widgets.
- Lokal ausgelieferte variable Inter-Schrift, deutscher Zeichensatz, WOFF2, Preload und `font-display: optional` gegen späte Schriftwechsel bei langsamen Verbindungen. Die Systemschrift ist ein bewusstes Fallback.
- Eigene CSS-Datei statt unnötiger generierter Utility-Regeln; etwa 42 KiB unkomprimiert, ungefähr 10 KiB übertragen im Test.
- Codeaufteilung durch das Framework, serverseitiges HTML, feste Bildproportionen und kein clientseitig nachgeladener Haupttext.
- Cache-Regeln für Bilder und Schriften sowie kurze CDN-Frist für HTML, damit Preis- und Rechtstextänderungen zeitnah sichtbar werden.

## Reproduktion und Artefakte

Produktionsserver lokal auf Port 4173 starten und `npm run test:performance` ausführen. Falls erforderlich `CHROME_PATH` und `TEST_BASE_URL` setzen. Die Dateien `outputs/lighthouse-mobile.html`, `outputs/lighthouse-desktop.html`, die zugehörigen JSON-Dateien und `outputs/performance-summary.json` enthalten die vollständigen Ergebnisse. Sie werden lokal erhalten und nicht als öffentliche Website-Inhalte ausgeliefert.

Nach einem öffentlichen Start in Search Console und über eine datenschutzgerecht eingerichtete Messung LCP, INP und CLS beobachten. Ergebnisse nach Gerät und Verbindung betrachten. Private Anmeldung, vorgeschaltete Hostingschichten, Cachezustand und die Messmaschine können Labortests beeinflussen.
