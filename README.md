# upip-tv.com

Deutschsprachige, responsive Streaming-Entdeckungs- und Anfragewebsite für Deutschland. React, TypeScript, Vinext und Cloudflare Workers. Die Gestaltung folgt der bereitgestellten schwarzen/violetten Streaming-Referenz mit originalem Hero-Motiv und lizenzierten Open-Movie-Plakaten.

## Start

```text
npm ci
npm run dev
```

Unter Windows PowerShell kann `npm.cmd` statt `npm` erforderlich sein. Node.js ≥22.13.0 verwenden. Details zum vorbereiteten portablen Runtime-Verzeichnis stehen in [Start und Betrieb](docs/START-UND-BETRIEB.md).

```text
npm run typecheck
npm test
npm run build
npm start -- --port 4173
npm run test:browser
npm run test:performance
```

Die Browserprüfungen verwenden ein vorhandenes Chrome. `CHROME_PATH` und `TEST_BASE_URL` sind optional konfigurierbar. Berichte und Screenshots liegen nach den Prüfungen in `outputs/`.

## Geschäftsdaten

Für Porkbun Static Hosting und **upip-tv.com** gibt es jetzt einen getrennten statischen Export:

```text
npm run build:porkbun
npm run test:porkbun
```

Das fertige Upload-Archiv liegt unter `outputs/upip-tv.com-upload.zip`. Der erzeugte Deployment-Branch **porkbun** dient GitHub Connect; **main** enthält den Quellcode. [Porkbun-Anleitung und DNS-Befund](docs/PORKBUN.md).

Preise, Laufzeiten und die WhatsApp-Nummer werden in [config/business.ts](config/business.ts) gepflegt. Die vier gelieferten Gesamtpreise sind unverändert; Monatswerte werden berechnet. Jeder Tarif öffnet die korrekte unverbindliche WhatsApp-Anfrage.

Die Website behauptet keinen vorhandenen Player, Login, Checkout oder abgeschlossenen Kauf. Die redaktionelle Open-Movie-Auswahl mit Bildlizenzen belegt keine upip-tv.com-Aboverfügbarkeit. Unbestätigte Senderzahlen und Kundenbewertungen werden nicht erfunden.

Die private Vorschau verwendet absichtlich `noindex`. Der Porkbun-Build aktiviert mit `NEXT_PUBLIC_SEARCH_INDEXING=1` die 14 freigegebenen Informationsseiten aus `config/indexing.ts`. Die fünf rechtlichen Entwürfe bleiben `noindex, follow` und werden aus der Sitemap ausgeschlossen. Betreiberidentität, Rechte und Vertragsbedingungen müssen vor dem öffentlichen Geschäftsbetrieb vollständig sein. Einzelheiten und die Reihenfolge der Suchmaschinenfreigabe stehen in der Startcheckliste.

## Dokumentation

- [Start, Deployment, Search Console, Bing und IndexNow](docs/START-UND-BETRIEB.md)
- [Keyword-Zuordnung, AEO/GEO, 30 Tage Redaktion, Werbung und Linkaufbau](docs/SEO-UND-WACHSTUM.md)
- [Bildquellen, Lizenzen und Hero-Prompt](docs/ASSETS-UND-QUELLEN.md)
- [Abschluss- und Prüfbericht](docs/ABSCHLUSSBERICHT.md)

Die öffentliche Website läuft unter https://upip-tv.com/ mit funktionsfähigen Anfragewegen. Die ausdrücklich aufgeführten Geschäfts- und Rechteangaben sind vor dem regulären Abonnementbetrieb zu vervollständigen. Es wurden keine Anzeigen gestartet, Kontakte angeschrieben oder Suchmaschinenkonten mit erfundenen Nachweisen eingerichtet.
