import { business, pageUrl } from '@/config/business';
import { pages } from '@/content/pages';
import { articles } from '@/content/articles';
import { sitemapText } from '@/lib/site-files';
import { shouldIndexPath } from '@/config/indexing';
export function GET() {
  const paths = [...Object.keys(pages), ...articles.map(a => `/ratgeber/${a.slug}`)];
  return new Response(sitemapText(paths.filter(path => shouldIndexPath(path)).map(pageUrl), business.contentUpdated), { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
