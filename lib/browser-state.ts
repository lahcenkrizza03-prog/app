'use client';
import { useSyncExternalStore } from 'react';

const searchEvent = 'upip-search-change';
function subscribeSearch(notify: () => void) {
  window.addEventListener('popstate', notify);
  window.addEventListener(searchEvent, notify);
  return () => { window.removeEventListener('popstate', notify); window.removeEventListener(searchEvent, notify); };
}
const readSearch = () => window.location.search;
const serverSearch = () => '';

/** Keep deep links, reset buttons and browser history in agreement after hydration. */
export function useSearchChoice(name: string, allowed: readonly string[], fallback: string) {
  const search = useSyncExternalStore(subscribeSearch, readSearch, serverSearch);
  const query = new URLSearchParams(search).get(name);
  const value = query && allowed.includes(query) ? query : fallback;
  const choose = (next: string) => {
    const url = new URL(window.location.href);
    if (next === fallback) url.searchParams.delete(name); else url.searchParams.set(name, next);
    window.history.replaceState(null, '', url);
    window.dispatchEvent(new Event(searchEvent));
  };
  return [value, choose] as const;
}

export const consentKey = 'germaniptv-privacy-v1';
const consentEvent = 'upip-consent-change';
function subscribeConsent(notify: () => void) {
  window.addEventListener('storage', notify);
  window.addEventListener(consentEvent, notify);
  return () => { window.removeEventListener('storage', notify); window.removeEventListener(consentEvent, notify); };
}
function readConsent() { try { return localStorage.getItem(consentKey) || ''; } catch { return ''; } }
export function useConsentChoice() { return useSyncExternalStore(subscribeConsent, readConsent, () => ''); }
export function saveConsent(value: boolean) {
  try { localStorage.setItem(consentKey, value ? 'accepted' : 'rejected'); } catch { /* Fail closed when storage is unavailable. */ }
  window.dispatchEvent(new Event(consentEvent));
}
