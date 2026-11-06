import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { plans, money, planMessage, whatsappLink, business } from '../config/business.ts';
import { catalog, serviceTitles, verifiedReviews } from '../content/catalog.ts';
import { pages } from '../content/pages.ts';
import { articles } from '../content/articles.ts';
test('four supplied totals and durations are preserved, with only twelve months highlighted', () => {
  assert.deepEqual(plans.map(p => [p.months, p.cents]), [[3,2499],[6,3999],[12,5999],[24,11999]]);
  assert.deepEqual(plans.filter(p => p.featured).map(p => p.months), [12]);
  assert.ok(plans.every(p => p.devices === 1));
});
test('monthly values use German EUR formatting and actual division', () => {
  assert.deepEqual(plans.map(p => money(p.cents / p.months).replace(/\s/g, '')), ['8,33€','6,67€','5,00€','5,00€']);
});
test('each WhatsApp link has the correct number and exact German plan inquiry', () => {
  for (const p of plans) { const link = new URL(whatsappLink(planMessage(p.months))); assert.equal(link.origin, 'https://wa.me'); assert.equal(link.pathname, '/212781003018'); assert.equal(link.searchParams.get('text'), `Ich möchte den GermanIPTV 1 Gerät ${p.months} Monate Plan anfragen.`); }
});
test('catalog has provenance, unique ids, local artwork and no unverified streaming claims', () => {
  assert.equal(new Set(catalog.map(t => t.id)).size, catalog.length);
  for (const t of catalog) { assert.ok(t.source.startsWith('https://studio.blender.org/')); assert.ok(t.licenseSource.startsWith('https://')); assert.ok(t.director); assert.ok(t.description.length > 40); assert.ok(fs.existsSync(new URL(`../public${t.image}`, import.meta.url))); assert.equal(t.availability, 'editorial'); assert.equal(t.rating, undefined); }
  for (const t of catalog) for (const size of [240,420]) assert.ok(fs.existsSync(new URL(`../public${t.image.replace('.webp', `-${size}.avif`)}`, import.meta.url)));
  assert.equal(serviceTitles.length, 0); assert.equal(verifiedReviews.length, 0);
});
test('every required non-auth page has unique metadata', () => {
  const required = ['/', '/tv-kanaele', '/filme', '/serien', '/preise', '/geraete', '/faq', '/ueber-uns', '/kontakt', '/datenschutz', '/impressum', '/agb', '/widerruf', '/kuendigung'];
  for (const path of required) assert.ok(pages[path]);
  assert.equal(new Set(Object.values(pages).map(p => p.title)).size, Object.keys(pages).length);
  assert.equal(new Set(Object.values(pages).map(p => p.description)).size, Object.keys(pages).length);
});
test('launch remains gated until required real-world business information exists', () => {
  assert.equal(business.publicLaunchReady, false); assert.equal(business.analyticsId, ''); assert.equal(business.verifiedServiceFeatures.length, 0);
  assert.equal(business.company.legalName, '');
});
test('guides have distinct content and primary sources', () => {
  assert.equal(new Set(articles.map(a => a.slug)).size, articles.length);
  for (const a of articles) { assert.ok(a.sections.length >= 4); assert.ok(a.source.startsWith('https://')); }
});
