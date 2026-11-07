export function sitemapText(urls: string[], modified: string) {
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${escape(url)}</loc><lastmod>${escape(modified)}</lastmod></url>`).join('')}</urlset>`;
}
export function robotsText(origin: string) {
  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`;
}
export function llmsText(name: string, links: { prices: string; faq: string; devices: string; contact: string; legal: string }, durations: string) {
  return `# ${name}\n\n> Deutschsprachiges Informations- und Anfrageangebot für Deutschland.\n\nStatus: Vorbereitungsphase. Keine bestätigte Senderliste, kein Online-Checkout, keine verifizierte Abo-Verfügbarkeit. Open Movies sind redaktionelle Entdeckungen mit Quellenangaben.\n\n- [Preise](${links.prices}): ${durations} Monate; ein Gerät/ein Login; unverbindliche Anfragen.\n- [FAQ](${links.faq})\n- [Geräte](${links.devices})\n- [Kontakt](${links.contact})\n- [Anbieterangaben](${links.legal})\n\nDiese Datei ist eine optionale Orientierungshilfe und keine Ranking-Zusage.\n`;
}
