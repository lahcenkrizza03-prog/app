import { business } from '@/config/business';
export function GET() { return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${business.url}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }); }
