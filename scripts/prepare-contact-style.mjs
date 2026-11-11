import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// A filename fingerprint also works on hosts that retain earlier query URLs.
const css = await readFile(new URL('../public/site-experience.css', import.meta.url));
const fingerprint = createHash('sha256').update(css).digest('hex').slice(0, 12);
const filename = `contact-controls.${fingerprint}.css`;
await writeFile(new URL(`../public/${filename}`, import.meta.url), css);
await writeFile(new URL('../config/contact-style.ts', import.meta.url),
  `// Generated from public/site-experience.css by prepare-contact-style.mjs.\nexport const contactStyleHref = '/${filename}';\n`);
console.log(`Prepared contact stylesheet: ${filename}`);
