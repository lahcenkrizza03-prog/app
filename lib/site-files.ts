export function sitemapText(urls: string[], modified: string, modifiedByUrl: Record<string, string> = {}) {
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${escape(url)}</loc><lastmod>${escape(modifiedByUrl[url] || modified)}</lastmod></url>`).join('')}</urlset>`;
}
export function robotsText(origin: string) {
  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`;
}
export function llmsText(_name: string, _links: { prices: string; installation: string; devices: string; contact: string; legal: string }, _durations: string) {
  return `# Upip TV

> IPTV-Abonnements und praktische Geräte- und Einrichtungsratgeber für Deutschland.

Markt: Deutschland. Währung: EUR.

## Veröffentlichte Anfragepreise
- 1 Monat: 12,00 EUR
- 3 Monate: 29,00 EUR
- 6 Monate: 45,00 EUR
- 12 Monate: 59,00 EUR

Jeder Betrag gilt für die vollständige gewählte Laufzeit und ein Gerät mit einem Login. Die Monatswerte auf den Preisseiten sind Vergleichswerte; die genannten Summen sind Gesamtpreise.

Die Planauswahl bereitet eine unverbindliche WhatsApp-Anfrage an +12313354123 vor. Du prüfst den Entwurf und entscheidest, ob du ihn sendest. Das Öffnen des Entwurfs löst weder eine Zahlung noch eine automatische Aktivierung aus.

Lass vor einer Zahlung den aktuellen Abo-Katalog, die gewünschten Programme für Deutschland, die Freigabe deines Geräts und Players sowie mögliche zusätzliche App-Kosten und Vertragsbedingungen bestätigen. Redaktionelle Open Movies haben eigene Quellen und Lizenzangaben. Der konkrete Abo-Inhalt wird separat geklärt.

## Öffentliche Seiten
- [Homepage](https://upip-tv.com/)
- [Preise und Laufzeiten](https://upip-tv.com/preise/)
- [Installationsanleitung](https://upip-tv.com/installationsanleitung/)
- [Geräte prüfen](https://upip-tv.com/geraete/)
- [Kontakt](https://upip-tv.com/kontakt/)
- [TV-Kanäle: Umfang klären](https://upip-tv.com/tv-kanaele/)
- [Filme entdecken](https://upip-tv.com/filme/)
- [Serien entdecken](https://upip-tv.com/serien/)
- [Über Upip TV](https://upip-tv.com/ueber-uns/)
- [Ratgeber](https://upip-tv.com/ratgeber/)
- [Was ist IPTV?](https://upip-tv.com/ratgeber/was-ist-iptv/)
- [Smart-TV-Checkliste](https://upip-tv.com/ratgeber/iptv-smart-tv-checkliste/)
- [IPTV-Anbieter prüfen](https://upip-tv.com/ratgeber/iptv-anbieter-pruefen/)
- [Kosten und Laufzeiten vergleichen](https://upip-tv.com/ratgeber/iptv-kosten-laufzeiten/)
- [Blog](https://upip-tv.com/blog/)
- [Verlängerung anfragen](https://upip-tv.com/verlaengern/)
- [Reseller-Anfrage](https://upip-tv.com/reseller/)

Diese Datei ist eine optionale Orientierungshilfe zu den veröffentlichten Seiten. Sie bestätigt keine Suchplatzierung oder KI-Zitation.
`;
}
