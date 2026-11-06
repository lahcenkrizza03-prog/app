import fs from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const images = new URL('public/images/', root);
const source = new URL('assets-source/hero-original.png', root);
await fs.mkdir(new URL('assets-source/', root), { recursive: true });
try { await fs.copyFile(new URL('public/images/hero-original.png', root), source); await fs.unlink(new URL('public/images/hero-original.png', root)); } catch (e) { if (e.code !== 'ENOENT') throw e; }
for (const width of [960,1680]) await sharp(fileURLToPath(source)).resize({ width }).avif({ quality: 52, effort: 6 }).toFile(fileURLToPath(new URL(`hero-${width}.avif`, images)));
await sharp(fileURLToPath(source)).resize({ width: 1680 }).webp({ quality: 80 }).toFile(fileURLToPath(new URL('hero.webp', images)));
await sharp(fileURLToPath(source)).resize(1200, 630, { fit: 'cover' }).composite([{ input: Buffer.from('<svg width="1200" height="630"><rect width="680" height="630" fill="#070711" fill-opacity=".72"/><text x="70" y="270" fill="white" font-family="Arial" font-size="68" font-weight="700">German<tspan fill="#ab60ff">IPTV</tspan></text><text x="73" y="330" fill="#d9cfea" font-family="Arial" font-size="26">Entertainment für Deutschland.</text></svg>') }]).webp({ quality: 85 }).toFile(fileURLToPath(new URL('og.webp', images)));
const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const germanCharacters = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('') + 'ÄÖÜäöüßẞ€©–—„“‚‘’…→×²³°';
const css = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@400..800&display=optional&text=' + encodeURIComponent(germanCharacters), { headers: { 'User-Agent': ua } }).then(r => r.text());
const matches = [...css.matchAll(/src: url\((https:\/\/fonts.gstatic.com\/[^)]+)\) format\('woff2'\)/g)];
if (!matches.length) throw new Error('No woff2 font found');
const bytes = await fetch(matches.at(-1)[1]).then(r => r.arrayBuffer());
await fs.writeFile(new URL('public/fonts/inter-de-variable.woff2', root), Buffer.from(bytes));
await fs.writeFile(new URL('public/fonts/inter.css', root), "@font-face{font-family:Inter;font-style:normal;font-weight:400 800;font-display:optional;src:url('/fonts/inter-de-variable.woff2') format('woff2')}\n");
const license = await fetch('https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt').then(r => { if (!r.ok) throw new Error('Font license missing'); return r.text(); });
await fs.writeFile(new URL('public/fonts/OFL.txt', root), license);
console.log('Prepared AVIF, WebP, social image, and self-hosted Inter font.');
for (const file of await fs.readdir(images)) {
  if (!file.endsWith('.webp') || file.startsWith('hero') || file === 'og.webp') continue;
  for (const width of [240, 420]) {
    await sharp(fileURLToPath(new URL(file, images))).resize(width, Math.round(width * 1.5), { fit: 'cover' }).avif({ quality: 48, effort: 5 }).toFile(fileURLToPath(new URL(file.replace('.webp', `-${width}.avif`), images)));
  }
}
for (const file of await fs.readdir(images)) { const stat = await fs.stat(new URL(file, images)); const m = await sharp(new URL(file, images).pathname.replace(/^\/(\w:)/, '$1')).metadata(); console.log(`${file}: ${m.width}×${m.height}, ${Math.round(stat.size / 1024)} KiB`); }
