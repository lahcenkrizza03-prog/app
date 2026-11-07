export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';
export const business = {
  name: 'GermanIPTV',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://germaniptv.rainybongo.chatgpt.site',
  locale: 'de-DE',
  currency: 'EUR',
  whatsapp: '212781003018',
  publicLaunchReady: false,
  analyticsId: '',
  company: { legalName: '', address: '', email: '', vatId: '' },
  terms: { vat: '', renewal: '', cancellation: '', withdrawal: '' },
  contentUpdated: '2026-11-08',
  verifiedServiceFeatures: [] as string[],
  unverifiedClaims: ['20.000+ Live-Kanäle', '60.000+ Filme & Serien', 'Sport & PPV', 'Anti-Freeze Technologie', 'WhatsApp Support'],
};

export const plans = [
  { months: 1, cents: 1200, devices: 1, label: 'Zum Kennenlernen', featured: false },
  { months: 3, cents: 2900, devices: 1, label: 'Dein nächstes Kapitel', featured: false },
  { months: 6, cents: 4500, devices: 1, label: 'Mehr Zeit für Entertainment', featured: false },
  { months: 12, cents: 5900, devices: 1, label: 'Ein Jahr voller Möglichkeiten', featured: true },
] as const;

export function money(cents: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}
export function planDuration(months: number) {
  return `${months} ${months === 1 ? 'Monat' : 'Monate'}`;
}
export function planMonthsList(type: 'conjunction' | 'disjunction' = 'conjunction') {
  return new Intl.ListFormat('de-DE', { style: 'long', type }).format(plans.map(p => String(p.months)));
}
export function planPricesList() {
  return new Intl.ListFormat('de-DE', { style: 'long', type: 'conjunction' }).format(plans.map(p => money(p.cents)));
}
export function pageUrl(path: string) {
  const suffix = path === '/' ? (isStaticExport ? '/' : '') : isStaticExport && !/\.[a-z0-9]+$/i.test(path) ? `${path.replace(/\/$/, '')}/` : path;
  return `${business.url}${suffix}`;
}
export function planMessage(months: number) {
  return `Ich möchte den GermanIPTV 1 Gerät ${planDuration(months)} Plan anfragen.`;
}
export function whatsappLink(message = 'Ich möchte mehr über GermanIPTV erfahren.') {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
