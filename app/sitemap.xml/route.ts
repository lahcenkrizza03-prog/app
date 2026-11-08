import { business, pageUrl } from '@/config/business';
import { pages } from '@/content/pages';
import { articles } from '@/content/articles';
import { sitemapText } from '@/lib/site-files';
import { shouldIndexPath } from '@/config/indexing';
import { contentUpdatedForPath } from '@/lib/content-updates';
export function GET() {
  const paths = [...Object.keys(pages), ...articles.map(a => `/ratgeber/${a.slug}`)];
  return new Response(sitemapText(paths.filter(path => shouldIndexPath(path)).map(pageUrl), business.contentUpdated, Object.fromEntries(paths.map(path => [pageUrl(path), contentUpdatedForPath(path)]))), { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
