import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { plans, money, planMessage, whatsappLink, business } from '../config/business.ts';
import { catalog, serviceTitles, verifiedReviews } from '../content/catalog.ts';
import { pages } from '../content/pages.ts';
import { articles } from '../content/articles.ts';
import { indexablePaths, draftLegalPaths, shouldIndexPath } from '../config/indexing.ts';
test('four supplied totals and durations are preserved, with only twelve months highlighted', () => {
  assert.deepEqual(plans.map(p => [p.months, p.cents]), [[1,1200],[3,2900],[6,4500],[12,5900]]);
  assert.deepEqual(plans.filter(p => p.featured).map(p => p.months), [12]);
  assert.ok(plans.every(p => p.devices === 1));
});
test('monthly values use German EUR formatting and actual division', () => {
  assert.deepEqual(plans.map(p => money(p.cents / p.months).replace(/\s/g, '')), ['12,00€','9,67€','7,50€','4,92€']);
});
test('each WhatsApp link has the correct number and exact German plan inquiry', () => {
  for (const p of plans) { const link = new URL(whatsappLink(planMessage(p.months))); assert.equal(link.origin, 'https://wa.me'); assert.equal(link.pathname, '/12313354123'); const message = link.searchParams.get('text'); assert.ok(message.includes(`1 Gerät ${p.months} ${p.months === 1 ? 'Monat' : 'Monate'}`)); assert.ok(message.includes(money(p.cents))); assert.ok(message.includes('(EUR)')); assert.ok(message.includes('https://upip-tv.com/')); assert.ok(message.includes(`upip-1-${p.months}`)); }
});
test('catalog has provenance, unique ids, local artwork and no unverified streaming claims', () => {
  assert.equal(new Set(catalog.map(t => t.id)).size, catalog.length);
  for (const t of catalog) { assert.ok(t.source.startsWith('https://studio.blender.org/')); assert.ok(t.licenseSource.startsWith('https://')); assert.ok(t.director); assert.ok(t.description.length > 40); assert.ok(fs.existsSync(new URL(`../public${t.image}`, import.meta.url))); assert.equal(t.availability, 'editorial'); assert.equal(t.rating, undefined); }
  for (const t of catalog) for (const size of [240,420]) assert.ok(fs.existsSync(new URL(`../public${t.image.replace('.webp', `-${size}.avif`)}`, import.meta.url)));
  assert.equal(serviceTitles.length, 0); assert.equal(verifiedReviews.length, 0);
});
test('every required non-auth page has unique metadata', () => {
  const required = ['/', '/tv-kanaele', '/filme', '/serien', '/preise', '/geraete', '/installationsanleitung', '/blog', '/verlaengern', '/reseller', '/ueber-uns', '/kontakt', '/datenschutz', '/impressum', '/agb', '/widerruf', '/kuendigung'];
  for (const path of required) assert.ok(pages[path]);
  assert.equal(new Set(Object.values(pages).map(p => p.title)).size, Object.keys(pages).length);
  assert.equal(new Set(Object.values(pages).map(p => p.description)).size, Object.keys(pages).length);
});

test('public search includes finished pages, excludes legal drafts and never exposes private previews', () => {
  const allPaths = [...Object.keys(pages), ...articles.map(article => `/ratgeber/${article.slug}`)];
  assert.equal(indexablePaths.length, 17);
  assert.equal(draftLegalPaths.length, 5);
  assert.deepEqual([...indexablePaths].sort(), allPaths.filter(path => !draftLegalPaths.includes(path)).sort());
  for (const path of allPaths) {
    assert.equal(shouldIndexPath(path, false), false, `private ${path}`);
    assert.equal(shouldIndexPath(path, true), !draftLegalPaths.includes(path), `public ${path}`);
  }
  for (const path of ['/404', '/api/private', '/does-not-exist']) assert.equal(shouldIndexPath(path, true), false);
  assert.equal(shouldIndexPath('/preise/?source=test', true), true);
});
test('launch remains gated until required real-world business information exists', () => {
  assert.equal(business.publicLaunchReady, false); assert.equal(business.analyticsId, ''); assert.equal(business.verifiedServiceFeatures.length, 0);
  assert.equal(business.company.legalName, 'Anna Müller');
});
test('guides have distinct content and primary sources', () => {
  assert.equal(new Set(articles.map(a => a.slug)).size, articles.length);
  for (const a of articles) { assert.ok(a.sections.length >= 4); assert.ok(a.source.startsWith('https://')); }
});
test('the Porkbun profile uses its own origin and directory canonicals without changing launch approval', () => {
  const result = spawnSync(process.execPath, ['--experimental-strip-types', '--input-type=module', '-e', "const {business,pageUrl,sitePath}=await import('./config/business.ts');console.log(JSON.stringify({home:pageUrl('/'),prices:pageUrl('/preise'),ready:business.publicLaunchReady,links:['/preise','/preise/','/preise?source=test#bedingungen','/filme#verfuegbarkeit','/sitemap.xml','/'].map(sitePath)}));"], { cwd: new URL('../', import.meta.url), env: { ...process.env, NEXT_PUBLIC_STATIC_EXPORT: '1', NEXT_PUBLIC_SITE_URL: 'https://upip-tv.com' }, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), { home: 'https://upip-tv.com/', prices: 'https://upip-tv.com/preise/', ready: false, links: ['/preise/', '/preise/', '/preise/?source=test#bedingungen', '/filme/#verfuegbarkeit', '/sitemap.xml', '/'] });
});

test('invalid term cannot prepare a made-up quote',()=>{assert.throws(()=>planMessage(2),RangeError);});
test('sales guide preserves genuine prices, an illustrated preparation and FAQ removal',()=>{const article=articles.find(a=>a.slug==='iptv-smart-tv-checkliste');assert.equal(article.updated,'2026-11-13');assert(article.sections.some(([,p])=>p.includes('59,00')));const route=fs.readFileSync(new URL('../app/ratgeber/[article]/page.tsx',import.meta.url),'utf8');assert(!route.includes("sitePath('/faq')"));assert(route.includes('DeviceGuideVisual'));});
