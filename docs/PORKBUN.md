# Porkbun-Bereitstellung für upip-tv.com

Stand: 8. November 2026. Diese Anleitung bezieht sich auf das aktuell geprüfte **Static Hosting** für upip-tv.com. Der Domainname ändert den Markennamen GermanIPTV nicht automatisch.

## Festgestellter Fehler

- https://upip-tv.com/ ist per HTTPS erreichbar und antwortet mit 200. Die Passwortsperre ist aufgehoben. Die sichtbare Porkbun-Platzhalterseite zeigt, dass die Website-Dateien dort noch nicht ausgeliefert werden.
- www.upip-tv.com hat weiterhin einen expliziten A-Eintrag auf 208.66.192.100 und liefert 404. Dieser Eintrag hat Vorrang vor dem vorhandenen Wildcard-CNAME auf ss1-sixie.porkbun.com.
- Ein kontrollierter HTTPS-Test von www gegen den Hostingserver der Hauptdomain ergab eine Weiterleitung auf upip-tv.com. Damit ist der abweichende www-DNS-Eintrag die konkrete Routingursache.

Es wurden keine Änderungen im Porkbun-Konto vorgenommen. Die öffentliche Seite kann erst nach Auswahl des bereitgestellten Deployment-Branches oder dem Upload der erzeugten Dateien die GermanIPTV-Oberfläche anzeigen.

## Dateien für Static Hosting

Das normale Projekt bleibt eine Vinext-/Worker-Anwendung. Das zusätzliche Profil erzeugt eine eigenständige statische Website ohne Worker, Node-Prozess oder Datenbank auf dem Webhost:

```text
npm ci
npm run build:porkbun
npm run test:porkbun
```

Unter Windows PowerShell gegebenenfalls `npm.cmd` verwenden. Der Build läuft in einem isolierten Verzeichnis unter `work/`; er ersetzt nicht den normalen Build unter `dist/`.

Ergebnisse:

- `outputs/upip-tv.com-upload.zip`: uploadfähiges Archiv; index.html liegt direkt an der Archivwurzel.
- `outputs/porkbun-latest.json`: Verzeichnis und Details des letzten erzeugten Builds.
- Das darin genannte `directory`: entpackte, direkt auslieferbare Website mit 18 Inhaltsseiten, eigener Fehlerseite, Bildern, Schrift, CSS, JavaScript und statischen Flight-Dateien.

Der Export enthält Verzeichnisse wie `preise/index.html` und `filme/index.html`. Der Host kann normale Verzeichnis-URLs bedienen; Canonicals, Open Graph, Schema und Sitemap verwenden https://upip-tv.com/ mit passenden abschließenden Schrägstrichen. sitemap.xml, robots.txt und llms.txt werden ausdrücklich als Dateien erzeugt, weil die verwendete Vinext-Version Route Handler beim Export überspringt.

Das exportierte Archiv enthält keine node_modules, Git-Metadaten, privaten Schlüssel oder Serveranwendung. Die Website ist weiterhin als Vorbereitungsstand mit noindex gekennzeichnet; Unternehmens-, Rechte- und Vertragsangaben müssen vor dem regulären Geschäftsbetrieb vervollständigt werden.

## Bereitstellung über GitHub Connect

Der Quellcode bleibt im Branch **main** des Repositorys `lahcenkrizza03-prog/app`. Der Branch **porkbun** ist ausschließlich für die erzeugten Website-Dateien vorgesehen. Er enthält index.html an der Wurzel und kann ohne Buildschritt vom Hosting übernommen werden.

Im Porkbun-Konto:

1. Domain Management → upip-tv.com → Static Hosting öffnen.
2. Zum Bereich **GitHub Connect** gehen.
3. Falls noch nicht verbunden: „connect“ wählen und ausschließlich das Repository `app` freigeben.
4. Repository **app** und Branch **porkbun** auswählen und die Einstellung speichern.
5. Nach Abschluss der Synchronisierung https://upip-tv.com/ in einem privaten Browserfenster prüfen.

[Offizielle Anleitung zu GitHub Connect](https://kb.porkbun.com/article/145-how-to-connect-static-hosting-to-github).

Bei späteren Inhaltsänderungen muss der statische Export neu gebaut und getestet und der Deployment-Branch entsprechend aktualisiert werden. Ein reiner Push des Server-Quellcodes in main ist keine Aktualisierung der statischen Dateien.

## Alternativer Datei-Upload

Das ZIP lokal entpacken und den **Inhalt** des Ausgabeordners einschließlich `_next`, `images`, `fonts` und aller Seitenverzeichnisse über den von Porkbun vorgesehenen Upload-/FTP-Weg übertragen. Es darf kein zusätzliches äußeres Verzeichnis zwischen Website-Wurzel und index.html entstehen. Den Zielordner aus den Angaben des aktuellen Static-Hosting-Kontos verwenden; `public_html` ist eine cPanel-Konvention und darf nicht für jeden Hostingplan angenommen werden.

Die beigefügte `.htaccess` kann bei einem Apache-/cPanel-Host eine Fehlerseite und einzelne Header setzen. Porkbun Static Hosting verwaltet seine Antwortheader und Weiterleitungen selbst. Die Inhalts-Sicherheitsrichtlinie wird deshalb zusätzlich im exportierten HTML mitgegeben. Hostseitige Sicherheitsheader, die benutzerdefinierte Fehlerseite und Weiterleitungen müssen nach der tatsächlichen Bereitstellung noch am Livehost geprüft werden.

## www reparieren

In den DNS-Einstellungen von upip-tv.com den expliziten Eintrag **A / www / 208.66.192.100** entfernen. Dadurch kann der bereits vorhandene Wildcard-CNAME **ss1-sixie.porkbun.com** auch für www greifen. Die anderen Einträge nicht pauschal löschen. Nach Ablauf betroffener DNS-Caches beide HTTPS-Adressen erneut prüfen.

Die maßgeblichen Nameserver und der Haupthost wurden am 8. November 2026 live geprüft; die oben genannte Empfehlung ist an diesen Zustand gebunden.

## Lokale Prüfung

`npm run test:porkbun` überprüft das ZIP und startet vorübergehend einen reinen Dateiserver auf Port 4174. Danach werden dieselben Browserfunktionen wie beim Worker geprüft, einschließlich Metadaten für die neue Domain, Navigation, Genreansichten, Preisberechnung, WhatsApp-Nachrichten und Mobilansichten. Der Testserver wird anschließend beendet.

Für eine manuelle lokale Vorschau `npm run preview:porkbun` starten. Die Adresse wird im Terminal ausgegeben. Screenshots und Browserberichte liegen unter `outputs/porkbun-tests/`.
