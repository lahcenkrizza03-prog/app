# GermanIPTV: Start, Betrieb und offene Voraussetzungen

Stand: 7. November 2026. Die Website wurde als neue Anwendung im zuvor leeren Arbeitsverzeichnis erstellt. Sie verwendet React, TypeScript und Vinext mit serverseitigem Rendering auf einem Cloudflare Worker und der Sites-Buildintegration.

## Lokal starten

Voraussetzung: Node.js 22.13 oder neuer. Für diese Sitzung liegen ein geprüfter portabler Node-Download und MinGit außerhalb des Projektverzeichnisses in `../.tools`. Sie werden nicht mit der Website veröffentlicht. Die Node-ZIP wurde gegen die SHA-256-Liste von nodejs.org geprüft.

```powershell
cd C:\Users\lahce\OneDrive\Desktop\tv\germaniptv
$env:Path = 'C:\Users\lahce\OneDrive\Desktop\tv\.tools\node-v22.23.4-win-x64;' + $env:Path
npm.cmd ci
npm.cmd run dev
```

Die Entwicklungsadresse wird vom Server ausgegeben, normalerweise http://localhost:5173. Unter PowerShell wird `npm.cmd` verwendet, damit keine Änderung an der Windows-Ausführungsrichtlinie erforderlich ist.

```powershell
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd start -- --port 4173
npm.cmd run test:browser
npm.cmd run test:performance
```

Die Browserprüfungen verwenden das vorhandene Chrome unter `C:/Program Files/Google/Chrome/Application/chrome.exe`. Auf anderen Systemen `CHROME_PATH` setzen; für einen abweichenden lokalen Port `TEST_BASE_URL`. Screenshots und JSON-/HTML-Berichte landen in `outputs/`. Dieser Ordner wird nicht in den Site-Quellstand eingecheckt.

`npm run prepare:assets` erstellt die Hero-Derivate und lädt die selbst gehostete Schrift erneut. Der normale Build benötigt dafür keinen externen Bild- oder Schriftdienst. Für eine Reproduktion dieses optionalen Schritts ist Netzwerkzugriff erforderlich.

## Aufbau und Pflege

| Datei / Bereich | Zuständigkeit |
| --- | --- |
| config/business.ts | Preise in Cent, Laufzeiten, Gerätezahl, WhatsApp-Nummer, Geschäftsstatus, Domain, optionale Analytics-ID |
| content/catalog.ts | redaktionelle Metadaten, Quellen, Lizenzhinweise, Verfügbarkeitsstatus |
| content/faq.ts | fachliche FAQ |
| content/pages.ts | zentrale Titel, H1, Beschreibung, Seitenzuordnung |
| content/articles.ts | eigenständige deutsche Ratgeber |
| components/germaniptv/ | wiederverwendbare UI- und Funktionsmodule |
| app/[slug]/page.tsx | Seitenrouting mit echter 404 für unbekannte Seiten |
| app/ratgeber/[article]/page.tsx | Ratgeberrouting |
| lib/seo.tsx | Canonicals, soziale Metadaten, JSON-LD |
| lib/security.ts + worker/index.ts | Sicherheitsheader für Worker-Antworten |
| scripts/indexnow.mjs | Eigentumsdatei vorbereiten und freigegebene Änderungen melden |
| .openai/hosting.json | Site-Identität und Hostingkonfiguration |

Eine Preisänderung erfolgt nur in der Tarifliste; Gesamtpreise und Monatswerte werden in allen Ansichten daraus abgeleitet. 12 und 24 Monate behalten die vorgegebenen Gesamtsummen und den gleich gerundeten Monatswert. Der Anfragekontakt bleibt +212 781 003 018 und wird nicht als deutsche Nummer dargestellt.

Ein Redaktions-CMS, eine Anmeldung und ein Adminportal wurden nicht vorgetäuscht: Es gab keinen vorhandenen Backend- oder Authentifizierungsdienst. Die zentrale Dateikonfiguration ist der aktuelle Pflegeweg. Für ein späteres Adminsystem sind echte Identitätsprüfung, Rollen, Änderungsprotokolle, serverseitige Validierung und persistente Speicherung erforderlich.

## Aktuell nutzbare Seiten und Funktionen

Startseite, TV-Kanäle-Information, Filme, Kurzfilmreihen, Preise, Geräte, FAQ, Über uns, Kontakt, Datenschutzentwurf, Impressumsentwurf, AGB-Status, Widerrufsinformation, Kündigungsstatus, Ratgeberübersicht und drei Ratgeber. Dazu Sitemap, robots.txt und llms.txt.

MovieCard, SeriesCard, MovieCarousel und CategoryCarousel unterstützen lokale Bilder und echte Interaktion. Suche, Genreansichten, Details, Scrollleisten, mobile Navigation, native FAQ-Disclosure und native Dialoge funktionieren. Die Kontakt- und Geräteformulare bereiten eine WhatsApp-Nachricht vor. Es wird keine Nachricht im Hintergrund verschickt und kein Formulareingang behauptet.

Der Trailer-Dialog verweist ausdrücklich zum offiziellen Sintel-Projekt. Es wird kein nicht lizenzierter Trailer eingebettet. Die Open-Movie-Auswahl ist redaktionell; ein bestätigter Abokatalog ist davon getrennt. Kundenstimmen bleiben leer, bis echte Einwilligungen und verifizierte Bewertungen vorliegen.

## Voraussetzungen vor einem öffentlichen Geschäftsbetrieb

1. Rechtliche Anbieteridentität, ladungsfähige Anschrift, E-Mail, Vertretung und gegebenenfalls Register-/Umsatzsteuerangaben bereitstellen.
2. Konkrete Verbreitungsrechte für Deutschland und reale Inhaltsverfügbarkeit je Sender/Titel nachweisen. Für Sport/PPV separat prüfen. Die gewünschten hohen Sender- und Filmzahlen sind bislang unbestätigt.
3. Gerätefreigaben, tatsächliche Apps, Qualitätsstufen und technischen Leistungsumfang bestätigen. Keine pauschale 4K-, Sofortaktivierungs-, Stabilitäts- oder Supportzusage ohne Nachweis.
4. Gesamtpreise, Umsatzsteuerstatus, Zahlung, Leistungsbeginn, Laufzeit, Verlängerung, Kündigung und Widerruf rechtlich verbindlich festlegen.
5. Impressum, Datenschutzhinweise, Vertragsbedingungen und Widerrufsinformation nach dem tatsächlichen Geschäftsmodell fertigstellen und prüfen lassen. Eine Vorlage ist keine Rechtsfreigabe.
6. Falls Online-Verträge ermöglicht werden, einen tatsächlich zustellenden Kündigungsprozess mit Zugangsnachweis, elektronischer Bestätigung und Speichermöglichkeit vorsehen. Eine Messenger-Anfrage ersetzt diesen Prozess nicht. [§ 312k BGB](https://www.gesetze-im-internet.de/bgb/__312k.html).
7. Hostingdatenverarbeitung und gegebenenfalls Analyseanbieter, Auftragsverarbeitung und internationale Übermittlungen dokumentieren. Consent und Analytics nur mit zutreffender Information aktivieren.
8. Rechte-, Geschäfts- und Inhaltsstatus in den sichtbaren Seiten sowie llms.txt aktualisieren; nicht nur einen Schalter umlegen.
9. Erst danach `publicLaunchReady` auf true setzen und ein öffentliches Hostingziel freigeben. Der jetzige private Zustand verwendet absichtlich noindex.

Bis diese Voraussetzungen erfüllt sind, ist das Ergebnis eine funktionsfähige private Vorschau und Anfrageoberfläche, keine freigegebene laufende Streamingdienstleistung.

## Deployment

Die registrierte Site-ID steht in `.openai/hosting.json`. Die Buildausgabe besteht aus `dist/server/index.js` und `dist/client/`. Der Worker verwendet die erhaltene `sites()`-Integration aus dem Starter. D1 und R2 bleiben ohne tatsächlichen Speicherbedarf ungebunden.

1. Tests und Produktionsbuild ausführen.
2. Im Sites-Workflow einen frischen, kurzlebigen Schreibzugang für genau diese Site anfordern.
3. Den offiziellen `site-workflow.mjs`-Helfer mit Zugangsdaten ausschließlich über verdeckte Standardeingabe verwenden; niemals Tokens in Dateien oder Shellargumente schreiben.
4. Quellstand synchronisieren und Archiv außerhalb des Checkouts erzeugen. Die vom Helfer zurückgegebenen Site-ID, Commit-SHA und Archiv unverändert für die native Speicherung/Veröffentlichung verwenden.
5. Neue Sites privat veröffentlichen. Publikum oder Domain nur nach gewünschter, bestätigter Einstellung ändern. Kein Kampagnenstart durch ein Deployment.
6. Endzustand der Veröffentlichung prüfen; bei Fehlern denselben Vorgang fortsetzen statt neue Sites anzulegen.

Ein eigener öffentlicher Domainname wurde nicht geliefert. Beim Domainwechsel `business.url` ändern, Canonicals, Schema, Sitemap, soziale Bilder und llms-Verweise erneut prüfen. HTTPS wird am Hostingrand bereitgestellt; Weiterleitungen vom alten Domainnamen müssen beim zuständigen Host korrekt eingerichtet werden.

## Google Search Console

Nach Freigabe der öffentlichen Website eine Property hinzufügen. Für eine eigene Domain ist DNS-Verifikation eine robuste Option; nur einen echten von Google ausgegebenen Datensatz verwenden. Auf einer bereitgestellten Subdomain kann eine verfügbare URL-Präfix-Verifikation über echte HTML-Datei oder Meta-Tag erforderlich sein. Keine erfundenen Tokens einsetzen. [Offizielle Verifikationsanleitung](https://support.google.com/webmasters/answer/9008080?hl=de).

Nach erfolgreicher Verifikation `/sitemap.xml` einreichen. Home, Preise und Geräte jeweils per URL-Prüfung auf Erreichbarkeit, Canonical, erlaubtes Indexieren und gerenderten Inhalt kontrollieren. Bei wesentlichen Änderungen die unterstützte Indexierungsanfrage nutzen, ohne wiederholt denselben unveränderten Inhalt einzureichen. Die normale Website wird nicht über Googles eingeschränkte Indexing API gepusht. [Google zu Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

Wöchentlich Seitenindexierung, Crawlfehler, Sicherheitsmeldungen und Core Web Vitals prüfen. Eigentümerzugang und konkrete Verifikation fehlen derzeit; es wurde kein Konto stellvertretend eingerichtet.

## Bing Webmaster Tools

Die freigegebene Domain hinzufügen und über einen angebotenen echten Nachweis bestätigen; alternativ einen berechtigten Search-Console-Import verwenden. Danach Sitemap unter „Sitemaps“ einreichen, wichtige URLs prüfen und Site Scan starten. [Bing: Verifikation](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b), [Sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed), [Site Scan](https://www.bing.com/webmasters/help/site-scan-623520c9).

Auch hier fehlen Kontozugriff und Eigentumsnachweis. Es wurden keine Submission-Erfolge erfunden.

## IndexNow

IndexNow ist für teilnehmende Suchmaschinen vorgesehen und garantiert keine Indexierung. Grundlage ist eine veröffentlichte Eigentumsdatei. Der beigefügte Helfer verwendet die [offizielle Dokumentation](https://www.indexnow.org/documentation).

1. Einen eigenen zufälligen Schlüssel mit zulässigen Zeichen erzeugen und als `INDEXNOW_KEY` setzen; `SITE_URL` auf den tatsächlichen HTTPS-Ursprung setzen.
2. `npm run indexnow -- --prepare` ausführen. Das erstellt `public/<Schlüssel>.txt`.
3. Die Datei mit der freigegebenen Website veröffentlichen und auf Erreichbarkeit prüfen.
4. Nach Abschluss der Startcheckliste `PUBLIC_LAUNCH_APPROVED=true` setzen.
5. Mit `npm run indexnow -- --submit / /preise /geraete` nur neue, geänderte oder entfernte URLs der eigenen Domain melden. Der Helfer prüft die veröffentlichte Schlüsseldatei und fremde Ursprünge.
6. Antworten 200/202 bedeuten Annahme der Meldung, keine Aufnahme in den Index. Fehler und Crawlberichte beobachten.

Es gibt noch keinen Schlüssel und es wurde nichts eingereicht. Schlüssel nicht durch einen ausgedachten Verifikationstext ersetzen.

## Kompakte Startkontrolle

- [ ] Betreiber, Rechte, Vertrags- und Datenschutzangaben vollständig
- [ ] Tatsächliche Sender-, Geräte- und Inhaltsfreigaben dokumentiert
- [ ] Öffentliche Domain und HTTPS erreichbar, private Zugangssperre passend aufgehoben
- [ ] Absichtliche Vorschau-noindex-Sperre entfernt, keine versehentlichen X-Robots-Sperren
- [ ] Canonicals, JSON-LD, Links, 404, Sitemap und lastmod geprüft
- [ ] Mobile Kontakt- und Tarifwege auf einem echten Smartphone geprüft
- [ ] Google und Bing mit echten Nachweisen verifiziert
- [ ] Sitemap eingereicht und wichtige Seiten untersucht
- [ ] Optional IndexNow-Datei veröffentlicht und Änderungen gemeldet
- [ ] Analytics nur nach vollständiger Konfiguration und wirksamer Einwilligung
- [ ] Crawl-, Index- und Fehlerüberwachung eingerichtet

Eine schnelle Entdeckung lässt sich vorbereiten; sofortige Indexierung, Sichtbarkeit oder Rankings werden nicht zugesagt.
