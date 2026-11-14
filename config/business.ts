export const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';
export const business = {
  name: 'upip-tv.com',
  brandLabel: 'Upip TV',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://upip-tv.com',
  locale: 'de-DE',
  currency: 'EUR',
  whatsapp: '12313354123',
  whatsappDisplay: '+1 (231) 335-4123',
  publicLaunchReady: false,
  analyticsId: '',
  company: { legalName: 'Anna Müller', address: 'Platz der Republik 1, 11011 Berlin, Deutschland', email: 'annamuller@web.de', vatId: '' },
  terms: {
    vat: 'included', renewal: 'new-order', cancellation: 'automatic-expiry', withdrawal: '',
    paymentMethods: ['PayPal', 'Banküberweisung'], activation: 'after-payment', activationMaxHours: 24,
    activationClock: 'received-and-confirmed', bankActivationClock: 'credited-to-account',
    periodStart: 'activation', replacementDeviceAllowed: true,
    refundAvailability: 'anytime', refundAmount: 'full', refundProcessingDays: 1, refundAccessEnd: 'completed',
  },
  contentUpdated: '2026-11-10',
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
export function activationInformation() {
  return `Die Aktivierung erfolgt spätestens ${business.terms.activationMaxHours} Stunden nach Eingang und Bestätigung der Zahlung. Bei Banküberweisungen beginnt diese Frist mit der Gutschrift auf dem Konto der Anbieterin.`;
}
export function refundInformation() {
  return 'Die Anbieterin bietet jederzeit eine vollständige Erstattung des gezahlten Betrags auf Anfrage an. Die Erstattung wird innerhalb eines Tages nach Eingang der Anfrage bearbeitet. Der Zugang endet, sobald die Erstattung abgeschlossen ist.';
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
export function sitePath(path: string) {
  const [, pathname, tail = ''] = path.match(/^([^?#]*)(.*)$/)!;
  if (!isStaticExport || pathname === '/' || /\.[a-z0-9]+$/i.test(pathname)) return path;
  return `${pathname.replace(/\/$/, '')}/${tail}`;
}
export function pageUrl(path: string) {
  return `${business.url}${path === '/' && !isStaticExport ? '' : sitePath(path)}`;
}
export function planMessage(months: number) {
  const plan = plans.find(item => item.months === months);
  if (!plan) throw new RangeError('Unbekannte Laufzeit');
  return `${business.brandLabel}\nPlan: ${planDuration(months)} · ${plan.devices} Gerät\nGesamtpreis: ${money(plan.cents)} ${business.currency}`;
}
export function whatsappLink(message = 'Hallo Upip TV, ich habe eine Frage zu Ihren Abonnements.') {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message.replace(/upip-tv\.com/gi,business.brandLabel))}`;
}
