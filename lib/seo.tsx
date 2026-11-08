import type { Metadata } from 'next';
import { business, pageUrl } from '@/config/business';
import { shouldIndexPath } from '@/config/indexing';
import { pages } from '@/content/pages';
import { articles } from '@/content/articles';

export function seo(path: string, custom?: { title: string; description: string }): Metadata {
  const page = custom || pages[path];
  const title = page.title.includes(business.name) ? page.title : `${page.title} | ${business.name}`;
  const article = articles.find(item => path === `/ratgeber/${item.slug}`);
  return {
    title: { absolute: title }, description: page.description,
    alternates: { canonical: pageUrl(path) },
    robots: { index: shouldIndexPath(path), follow: true, ...(shouldIndexPath(path) ? { 'max-image-preview': 'large' as const } : {}) },
    openGraph: {
      title, description: page.description, url: pageUrl(path),
      images: [{ url: `${business.url}/images/og-upip-tv.webp`, width: 1200, height: 630, alt: `${business.name} – Entertainment für Deutschland` }],
      locale: 'de_DE', siteName: business.name,
      ...(article ? { type: 'article' as const, modifiedTime: business.contentUpdated } : { type: 'website' as const }),
    },
    twitter: { card: 'summary_large_image', title, description: page.description, images: [`${business.url}/images/og-upip-tv.webp`] },
  };
}

export function StructuredData({ path, title }: { path: string; title?: string }) {
  const pageTitle = title || pages[path]?.title || business.name;
  const url = pageUrl(path);
  const article = articles.find(item => path === `/ratgeber/${item.slug}`);
  const crumbs = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: pageUrl('/') },
    ...(article ? [{ '@type': 'ListItem', position: 2, name: 'Ratgeber', item: pageUrl('/ratgeber') }] : []),
    { '@type': 'ListItem', position: article ? 3 : 2, name: pageTitle, item: url },
  ];
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${business.url}/#organization`, name: business.name,
        url: business.url, logo: `${business.url}/favicon.svg`, email: business.company.email,
        contactPoint: { '@type': 'ContactPoint', contactType: 'Kundenservice', telephone: `+${business.whatsapp}`, availableLanguage: 'de', url: pageUrl('/kontakt') },
        areaServed: { '@type': 'Country', name: 'Deutschland' },
      },
      { '@type': 'WebSite', '@id': `${business.url}/#website`, url: business.url, name: business.name, inLanguage: 'de-DE', publisher: { '@id': `${business.url}/#organization` } },
      { '@type': 'WebPage', '@id': `${url}#page`, url, name: pageTitle, inLanguage: 'de-DE', isPartOf: { '@id': `${business.url}/#website` } },
      ...(path !== '/' ? [{ '@type': 'BreadcrumbList', itemListElement: crumbs }] : []),
      ...(article ? [{
        '@type': 'Article', '@id': `${url}#article`, headline: article.title,
        description: article.description, inLanguage: 'de-DE', dateModified: business.contentUpdated,
        mainEntityOfPage: { '@id': `${url}#page` },
        author: { '@type': 'Organization', name: `${business.name} Redaktion` },
        publisher: { '@id': `${business.url}/#organization` },
      }] : []),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
