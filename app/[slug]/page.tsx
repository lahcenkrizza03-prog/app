import { notFound } from 'next/navigation';
import { pages } from '@/content/pages';
import { seo, StructuredData } from '@/lib/seo';
import { PageContent } from '@/components/germaniptv/page-content';
export function generateStaticParams() { return Object.keys(pages).filter(p => p !== '/').map(p => ({ slug: p.slice(1) })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return pages[`/${slug}`] ? seo(`/${slug}`) : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const path = `/${slug}`; const page = pages[path]; if (!page) notFound(); return <div className={`container inner-page page-${slug}`}><StructuredData path={path} /><nav className="breadcrumbs" aria-label="Brotkrumennavigation"><a href="/">Home</a><span aria-hidden="true">/</span><span>{slug === 'ueber-uns' ? 'Über uns' : slug === 'tv-kanaele' ? 'TV Kanäle' : slug.charAt(0).toUpperCase() + slug.slice(1)}</span></nav><header className="page-header"><span className="eyebrow">{page.eyebrow}</span><h1>{page.h1}</h1><p>{page.description}</p></header><PageContent slug={slug} /></div>; }
