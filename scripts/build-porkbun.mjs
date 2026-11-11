import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { zipSync } from 'fflate';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = new URL(process.env.PORKBUN_SITE_URL || 'https://upip-tv.com');
if (origin.protocol !== 'https:' || origin.pathname !== '/' || origin.username || origin.password || origin.search || origin.hash) throw new Error('PORKBUN_SITE_URL must be an HTTPS origin.');
const siteUrl = origin.origin;
const outputs = path.join(root, 'outputs');
const work = path.join(root, 'work');
fs.mkdirSync(outputs, { recursive: true });
fs.mkdirSync(work, { recursive: true });
const checkout = fs.mkdtempSync(path.join(work, 'porkbun-build-'));
for (const name of ['app', 'components', 'config', 'content', 'lib', 'public', 'package.json', 'tsconfig.json', 'next.config.ts', 'vite.porkbun.config.ts']) {
  fs.cpSync(path.join(root, name), path.join(checkout, name), { recursive: true });
}
fs.symlinkSync(path.join(root, 'node_modules'), path.join(checkout, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir');
// The dynamic route's streamed notFound() can retain status 200 in this Vinext
// release. Export the shared error design through a build-only concrete route.
fs.mkdirSync(path.join(checkout, 'app/404'), { recursive: true });
fs.writeFileSync(path.join(checkout, 'app/404/page.tsx'), `export { default } from '../not-found';\nexport const metadata = { title: 'Seite nicht gefunden | upip-tv.com', robots: { index: false, follow: true } };\n`);
const env = { ...process.env, NODE_ENV: 'production', NEXT_PUBLIC_STATIC_EXPORT: '1', NEXT_PUBLIC_SITE_URL: siteUrl, NEXT_PUBLIC_SEARCH_INDEXING: '1' };
console.log(`Building a static website for ${siteUrl}`);
const build = spawnSync(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'build', '--config', path.join(checkout, 'vite.porkbun.config.ts')], { cwd: checkout, env, stdio: 'inherit', windowsHide: true });
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status || 1);

Object.assign(process.env, { NEXT_PUBLIC_STATIC_EXPORT: '1', NEXT_PUBLIC_SITE_URL: siteUrl, NEXT_PUBLIC_SEARCH_INDEXING: '1' });
const { business, pageUrl, planMonthsList } = await import(pathToFileURL(path.join(root, 'config/business.ts')).href);
const { pages } = await import(pathToFileURL(path.join(root, 'content/pages.ts')).href);
const { articles } = await import(pathToFileURL(path.join(root, 'content/articles.ts')).href);
const { shouldIndexPath } = await import(pathToFileURL(path.join(root, 'config/indexing.ts')).href);
const { contentUpdatedForPath } = await import(pathToFileURL(path.join(root, 'lib/content-updates.ts')).href);
const { sitemapText, robotsText, llmsText } = await import(pathToFileURL(path.join(root, 'lib/site-files.ts')).href);
const paths = [...Object.keys(pages), ...articles.map(a => `/ratgeber/${a.slug}`)];
const client = path.join(checkout, 'dist/client');
for (const route of paths) {
  const file = path.join(client, route.slice(1), 'index.html');
  if (!fs.existsSync(file)) throw new Error(`Static export is incomplete: ${route} has no HTML.`);
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes(pageUrl(route))) throw new Error(`Incorrect canonical origin in ${route}.`);
}
if (!fs.existsSync(path.join(client, '404.html')) && fs.existsSync(path.join(client, '404/index.html'))) {
  fs.copyFileSync(path.join(client, '404/index.html'), path.join(client, '404.html'));
}
if (!fs.existsSync(path.join(client, '404.html'))) throw new Error('Missing static 404 page.');

const directory = fs.mkdtempSync(path.join(outputs, `porkbun-${origin.hostname}-`));
fs.cpSync(client, directory, { recursive: true, filter: (entry) => !entry.endsWith('.map') && path.basename(entry) !== '.vite' });
fs.writeFileSync(path.join(directory, 'sitemap.xml'), sitemapText(paths.filter(route => shouldIndexPath(route)).map(pageUrl), business.contentUpdated, Object.fromEntries(paths.map(route => [pageUrl(route), contentUpdatedForPath(route)]))));
fs.writeFileSync(path.join(directory, 'robots.txt'), robotsText(siteUrl));
fs.writeFileSync(path.join(directory, 'llms.txt'), llmsText(business.name, { prices: pageUrl('/preise'), installation: pageUrl('/installationsanleitung'), devices: pageUrl('/geraete'), contact: pageUrl('/kontakt'), legal: pageUrl('/impressum') }, planMonthsList()));
// Apache/cPanel can use these directives. Porkbun Static Hosting serves the
// directory HTML directly and manages its own response headers and redirects.
fs.writeFileSync(path.join(directory, '.htaccess'), `DirectoryIndex index.html\nOptions -Indexes -MultiViews\nErrorDocument 404 /404.html\n<IfModule mod_headers.c>\nHeader always set X-Content-Type-Options "nosniff"\nHeader always set Referrer-Policy "strict-origin-when-cross-origin"\n</IfModule>\n`);
const files = {};
function collect(dir, relative = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const name = path.posix.join(relative, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Unexpected symbolic link in upload: ${name}`);
    if (entry.isDirectory()) collect(path.join(dir, entry.name), name);
    else files[name] = new Uint8Array(fs.readFileSync(path.join(dir, entry.name)));
  }
}
collect(directory);
if (Object.keys(files).some(name => name.startsWith('server/') || name.startsWith('node_modules/') || name.startsWith('.git/'))) throw new Error('Server or source metadata leaked into the static package.');
const archive = path.join(outputs, `${origin.hostname}-upload.zip`);
fs.writeFileSync(archive, zipSync(files, { level: 6 }));
const result = { origin: siteUrl, directory, archive, pageCount: paths.length, fileCount: Object.keys(files).length, archiveBytes: fs.statSync(archive).size, noindex: !paths.some(route => shouldIndexPath(route)), indexablePageCount: paths.filter(route => shouldIndexPath(route)).length, noindexPageCount: paths.filter(route => !shouldIndexPath(route)).length };
fs.writeFileSync(path.join(outputs, 'porkbun-latest.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
