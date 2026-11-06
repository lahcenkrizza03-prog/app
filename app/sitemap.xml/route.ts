import { business } from '@/config/business';
import { pages } from '@/content/pages';
import { articles } from '@/content/articles';
export function GET() { const paths = [...Object.keys(pages), ...articles.map(a => `/ratgeber/${a.slug}`)]; const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p => `<url><loc>${business.url}${p === '/' ? '' : p}</loc><lastmod>${business.contentUpdated}</lastmod></url>`).join('')}</urlset>`; return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } }); }
