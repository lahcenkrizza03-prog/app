import { business } from '../config/business.ts';
import { pages } from '../content/pages.ts';
import { articles } from '../content/articles.ts';

export function contentUpdatedForPath(path: string) {
  if (path === '/ratgeber') return articles.map(article => article.updated).sort().at(-1) || business.contentUpdated;
  const article = articles.find(item => path === `/ratgeber/${item.slug}`);
  return article?.updated || pages[path]?.updated || business.contentUpdated;
}
