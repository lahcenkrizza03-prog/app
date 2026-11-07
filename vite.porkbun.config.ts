import vinext from 'vinext';
import { defineConfig } from 'vite';

// Used in an isolated build directory by scripts/build-porkbun.mjs.
// The normal Worker/Sites build keeps its existing vite.config.ts integration.
export default defineConfig({
  plugins: [vinext({ appDir: process.cwd(), prerender: { routes: '*', concurrency: 2 } })],
  define: {
    'process.env.NEXT_PUBLIC_SITE_URL': JSON.stringify(process.env.NEXT_PUBLIC_SITE_URL),
    'process.env.NEXT_PUBLIC_STATIC_EXPORT': JSON.stringify('1'),
  },
});
