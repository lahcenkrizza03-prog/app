# Sicherheitsprüfung

Stand: 7. November 2026. Dieser Bericht beschreibt den implementierten Funktionsumfang und die tatsächlich möglichen Prüfungen; er ist kein Penetrationstest und keine Rechtsfreigabe.

## Umgesetzt

- Serverseitiges Rendering und Auslieferung über einen Cloudflare Worker, HTTPS am Hostingrand.
- `X-Content-Type-Options: nosniff`, restriktive Permissions-Policy, Referrer-Policy, CSP und HSTS bei HTTPS-Anfragen in `lib/security.ts`.
- CSP beschränkt Ressourcen auf den eigenen Ursprung; optional ist nur der vorbereitete GA4-Dienst freigegeben. Keine Fremd-Frames, Plugins oder beliebigen Form-Ziele. Die erlaubten `frame-ancestors` berücksichtigen die private Sites-Einbettung.
- Inline-Skripte und Inline-Styles sind für die verwendete SSR-/Hydrationsarchitektur zugelassen. Die CSP ist deshalb keine vollständige noncebasierte XSS-Sperre. Eine spätere Verschärfung muss mit der Plattformintegration getestet werden.
- Keine öffentlichen Schreib-APIs, Uploads, Passwörter, Kundenkonten, Zahlungsdaten oder gespeicherten Kontakttexte in dieser Implementierung.
- Texteingaben sind längenbegrenzt, durch Browservalidierung geprüft und ausschließlich URL-kodiert an den vom Nutzer gewählten WhatsApp-Link übergeben. Unkontrolliertes HTML wird nicht aus Eingaben gerendert.
- Externe Links nutzen `noopener noreferrer`. Die Kontaktformulare behaupten keine Zustellung oder Kaufbestätigung.
- Keine API-Schlüssel im Frontend. Es sind keine erfundenen Analytics-, Webmaster- oder Metadaten-Zugangsdaten eingebaut.
- Analyse ist standardmäßig vollständig aus. GA4 wird erst nach Konfiguration und aktiver Einwilligung geladen; Werbespeicherung bleibt verweigert. Ein Ablehnen/Widerrufen ist über die Datenschutzeinstellungen möglich.
- JSON-LD wird aus kontrollierten Konfigurationen erzeugt und gegen schließende Script-Tags abgesichert.
- IndexNow prüft HTTPS-Ursprung, eigene URLs, Schlüsseldatei und eine explizite Startfreigabe vor Submission. Kein anonymer öffentlicher Indexierungsendpunkt.

## Abhängigkeiten

Die anfängliche Starterprüfung fand bekannte Advisories. Betroffene direkte Pakete und Entwicklungswerkzeuge wurden aktualisiert, darunter Next.js, React/RSC, Vinext, Vite, Wrangler, die Cloudflare-Integration und Zod. Die veraltete sharp-Überschreibung des Starters wurde auf eine korrigierte Version geändert. Nicht genutzte Drizzle-Generatorwerkzeuge wurden entfernt. Die neue Versionierung ist im Lockfile festgehalten.

Der vollständige abschließende `npm audit` meldet 0 bekannte Advisories: 0 kritisch, 0 hoch, 0 mittel, 0 niedrig. Auch der gesonderte Lauf für Produktionsabhängigkeiten war ohne Befund. Eine passende fflate-Korrektur im Buildwerkzeugpfad wurde per Override festgehalten. Ein erfolgreicher Paket-Audit ist keine Garantie für allgemeine Sicherheit.

## Vor einer späteren Backend-Erweiterung

Für Kontaktzustellung, CMS, Accounts, Aboverwaltung oder Checkout sind echte serverseitige Validierung, Berechtigungsprüfung, CSRF-Schutz nach gewähltem Sessionmodell, dauerhafte Speicherung, Eingangsbegrenzung und Rate-Limits nötig. Der aktuelle Stand besitzt keinen empfangenden Form-Endpunkt, an dem eine angebliche Anwendungs-Ratebegrenzung sinnvoll behauptet werden könnte. Beim öffentlichen Hosting sollten ergänzende Schutzregeln für ungewöhnliche Abruflast konfiguriert werden.

Ein Kündigungsprozess muss tatsächlichen Zugang, dauerhafte Speicherung und unverzügliche elektronische Bestätigung leisten. Eine optische Schaltfläche ohne Zustellung wird hier nicht als solche Funktion ausgegeben.

## Betrieb

Entwicklungsserver nur lokal betreiben. Sicherheitsupdates regelmäßig prüfen, Lockfile nach Aktualisierung testen und Build/Browserprüfungen wiederholen. Hostingrollen auf notwendige Berechtigungen beschränken. Zugangsdaten nur im vorgesehenen Secret-Verfahren nutzen, niemals im Repository speichern. Keine Authentifizierung allein zur Zierde einbauen.
