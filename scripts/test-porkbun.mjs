import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { unzipSync } from 'fflate';
const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'outputs/porkbun-latest.json'), 'utf8'));
const archive = unzipSync(new Uint8Array(fs.readFileSync(manifest.archive)));
for (const file of ['index.html', '404.html', 'preise/index.html', 'filme/index.html', 'sitemap.xml', 'robots.txt', 'llms.txt']) assert.ok(archive[file], `Missing upload file: ${file}`);
assert.ok(!Object.keys(archive).some(file => /^(node_modules|server|\.git)\//.test(file)));
console.log('PASS upload ZIP has root HTML, nested pages, metadata, assets and no server/source tree');
const port = process.env.PORKBUN_PREVIEW_PORT || '4174';
const base = `http://127.0.0.1:${port}`;
const preview = spawn(process.execPath, ['--experimental-strip-types', 'scripts/serve-porkbun.mjs'], { cwd: root, env: { ...process.env, PORKBUN_PREVIEW_PORT: port }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
let startupError = '';
preview.stderr.on('data', chunk => startupError += chunk);
try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    if (preview.exitCode !== null) throw new Error(startupError || 'Static preview exited.');
    try { const response = await fetch(base); if (response.ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  if (!ready) throw new Error('Static preview did not become ready.');
  const env = { ...process.env, TEST_BASE_URL: base, TEST_SITE_URL: manifest.origin, TEST_STATIC_EXPORT: '1', TEST_REPORT_DIR: 'outputs/porkbun-tests' };
  const child = spawn(process.execPath, ['--experimental-strip-types', 'tests/browser.mjs'], { cwd: root, env, stdio: 'inherit', windowsHide: true });
  const code = await new Promise((resolve, reject) => { child.once('error', reject); child.once('exit', resolve); });
  process.exitCode = code ?? 1;
} finally { preview.kill(); }
