import fs from 'node:fs/promises';
const { SITE_URL, INDEXNOW_KEY } = process.env;
if (!SITE_URL || !INDEXNOW_KEY || !/^[a-zA-Z0-9-]{8,128}$/.test(INDEXNOW_KEY)) throw new Error('Set SITE_URL and a valid INDEXNOW_KEY. No placeholder submissions are allowed.');
const site = new URL(SITE_URL);
if (site.protocol !== 'https:' || site.pathname !== '/' || site.username || site.password || site.search || site.hash) throw new Error('SITE_URL must be an HTTPS origin.');
const mode = process.argv[2];
if (mode === '--prepare') { await fs.writeFile(new URL(`../public/${INDEXNOW_KEY}.txt`, import.meta.url), INDEXNOW_KEY); console.log('Ownership key file created. Deploy it before submitting.'); }
else if (mode === '--submit') {
  if (process.env.PUBLIC_LAUNCH_APPROVED !== 'true') throw new Error('Complete the launch checklist and set PUBLIC_LAUNCH_APPROVED=true.');
  const keyLocation = new URL(`${INDEXNOW_KEY}.txt`, site).href;
  const key = await fetch(keyLocation).then(r => r.text()); if (key.trim() !== INDEXNOW_KEY) throw new Error('Deployed key verification failed.');
  const urls = process.argv.slice(3).map(p => { const u = new URL(p, site); if (u.origin !== site.origin) throw new Error('Only this site may be submitted.'); return u.href; });
  if (!urls.length || urls.length > 10000) throw new Error('Provide 1 to 10,000 changed URLs.');
  const res = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ host: site.hostname, key: INDEXNOW_KEY, keyLocation, urlList: urls }) });
  if (![200,202].includes(res.status)) throw new Error(`IndexNow returned ${res.status}.`);
  console.log(`IndexNow accepted notification (${res.status}). This does not guarantee indexing.`);
} else throw new Error('Choose --prepare or --submit.');
