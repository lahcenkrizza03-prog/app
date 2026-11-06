import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '@/components/germaniptv/navigation';
import { Consent } from '@/components/germaniptv/analytics';
import { business } from '@/config/business';
export const metadata: Metadata = { metadataBase: new URL(business.url), title: { default: 'GermanIPTV – Entertainment für Deutschland', template: '%s | GermanIPTV' }, description: 'IPTV verstehen, Open Movies entdecken und vier Laufzeiten unverbindlich anfragen. GermanIPTV für Deutschland.', icons: { icon: '/favicon.svg' }, robots: { index: business.publicLaunchReady, follow: true }, openGraph: { locale: 'de_DE', siteName: business.name, type: 'website' }, twitter: { card: 'summary_large_image' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="de"><head><link rel="preload" href="/fonts/inter-de-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body><a className="skip-link" href="#inhalt">Zum Inhalt springen</a><Header /><main id="inhalt">{children}</main><div className="container"><Footer /></div><Consent /></body></html>; }
