import {SiteExperienceReady} from '../components/site-experience-ready';
import { contactStyleHref } from '@/config/contact-style';
import { sitePath } from '@/config/business';
import type { Metadata } from 'next';
import './globals.css';
import './sales.css';
import { Header, Footer } from '@/components/germaniptv/navigation';
import { Consent } from '@/components/germaniptv/analytics';
import { business, isStaticExport } from '@/config/business';
import { securityHeaders } from '@/lib/security';
export const metadata: Metadata = { metadataBase: new URL(business.url), title: { default: 'upip-tv.com – Entertainment für Deutschland', template: '%s | upip-tv.com' }, description: 'IPTV verstehen, Open Movies entdecken und vier Laufzeiten unverbindlich anfragen. upip-tv.com für Deutschland.', icons: { icon: '/favicon.svg' }, robots: { index: false, follow: true }, openGraph: { locale: 'de_DE', siteName: business.name, type: 'website' }, twitter: { card: 'summary_large_image' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="de"><head><link rel="stylesheet" href="/journey.css"/>{isStaticExport && <meta httpEquiv="Content-Security-Policy" content={securityHeaders["Content-Security-Policy"].replace(/frame-ancestors[^;]+;\s*/, "")} />}<link rel="preload" href={sitePath('/fonts/inter-de-variable.woff2')} as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="stylesheet" href={contactStyleHref}/><link rel="stylesheet" href="/hero-presence-20261112.css"/></head><body data-sales-site="upip"><a className="skip-link" href="#inhalt">Zum Inhalt springen</a><Header /><main id="inhalt">{children}</main><div className="container"><Footer /></div><Consent /><SiteExperienceReady/></body></html>; }
