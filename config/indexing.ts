// Public search visibility is independent of the unfinished subscription/legal launch.
// The Porkbun build enables this flag; private previews retain noindex.
export const searchIndexingEnabled = process.env.NEXT_PUBLIC_SEARCH_INDEXING === '1';

export const indexablePaths = [
  '/', '/tv-kanaele', '/filme', '/serien', '/preise', '/geraete', '/faq',
  '/ueber-uns', '/kontakt', '/ratgeber', '/ratgeber/was-ist-iptv',
  '/ratgeber/iptv-smart-tv-checkliste', '/ratgeber/iptv-anbieter-pruefen', '/ratgeber/iptv-kosten-laufzeiten',
] as const;

export const draftLegalPaths = ['/datenschutz', '/impressum', '/agb', '/widerruf', '/kuendigung'] as const;

export function shouldIndexPath(path: string, enabled = searchIndexingEnabled) {
  const normalized = (path.split(/[?#]/)[0] || '/').replace(/\/+$/, '') || '/';
  return enabled && indexablePaths.some(candidate => candidate === normalized);
}
