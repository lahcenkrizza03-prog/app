'use client';
import { sitePath } from '@/config/business';
import { useEffect, useState } from 'react';
import { business, planDuration } from '@/config/business';
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } }
import { consentKey as key, useConsentChoice, saveConsent } from '@/lib/browser-state';
export function track(name: string, values: Record<string, string | number> = {}) { try { if (localStorage.getItem(key) === 'accepted' && business.analyticsId) window.gtag?.('event', name, values); } catch { /* storage may be disabled */ } }
export function Consent() { const [open, setOpen] = useState(false); const [dismissed, setDismissed] = useState(false); const saved = useConsentChoice(); const allowed = saved === 'accepted'; useEffect(() => { const show = () => setOpen(true); window.addEventListener('open-consent', show); return () => window.removeEventListener('open-consent', show); }, []);
  useEffect(() => {
    if (!allowed || !/^G-[A-Z0-9]+$/.test(business.analyticsId)) return;
    window.dataLayer = window.dataLayer || [];
    // gtag's public command queue uses an Arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.gtag = function () { window.dataLayer?.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', business.analyticsId, { send_page_view: true });
    if (window.location.pathname === '/') track('homepage_view');
    if (window.location.pathname.replace(/\/$/, '') === '/preise') track('pricing_view');
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${business.analyticsId}`;
    script.async = true;
    document.head.appendChild(script);
    return () => { script.remove(); window.gtag?.('consent', 'update', { analytics_storage: 'denied' }); };
  }, [allowed]);
  function choose(value: boolean) { saveConsent(value); setDismissed(true); setOpen(false); }
  if (!open && !(business.analyticsId && !saved && !dismissed)) return null;
  return <aside className="consent-panel" role="dialog" aria-label="Datenschutzeinstellungen"><strong>Deine Privatsphäre zählt.</strong><p>Die Website funktioniert ohne Analyse-Cookies. {business.analyticsId ? 'Mit deiner Einwilligung verwenden wir Google Analytics zur Reichweitenmessung.' : 'Aktuell ist kein externer Analysedienst eingerichtet.'} WhatsApp öffnet erst nach deinem Klick.</p><a href={sitePath('/datenschutz')}>Mehr zum Datenschutz</a><div className="consent-actions"><button className="button outline" onClick={() => choose(false)}>Nur erforderlich</button>{business.analyticsId ? <button className="button" onClick={() => choose(true)}>Analyse erlauben</button> : <button className="button" onClick={() => { setDismissed(true); setOpen(false); }}>Schließen</button>}</div></aside>;
}
export function TrackedLink({ href, children, className = '', event, months }: { href: string; children: React.ReactNode; className?: string; event: string; months?: number }) { return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={months ? `${planDuration(months)} für ein Gerät unverbindlich über WhatsApp anfragen` : undefined} className={className} onClick={() => { track(event, months ? { plan_months: months } : {}); if (months) track('whatsapp_click', { plan_months: months }); }}>{children}</a>; }
