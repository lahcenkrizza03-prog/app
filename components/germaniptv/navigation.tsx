'use client';
import { sitePath } from '@/config/business';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon, type IconName } from './icon';
export function Logo() { return <a className="brand" href={sitePath('/')} aria-label="upip-tv.com – Startseite"><span className="brand-mark"><svg viewBox="0 0 40 44" aria-hidden="true"><path d="M7 5Q4 3 4 8v28q0 5 4 3l27-15q4-2 0-5L7 5Z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" /></svg></span><span>upip<span className="purple">-tv.com</span></span><span className="flag" role="img" aria-label="Deutschland" /></a>; }
const nav: [string, string, IconName][] = [['/', 'Home', 'home'], ['/tv-kanaele', 'TV Kanäle', 'tv'], ['/filme', 'Filme & Serien', 'movie'], ['/preise', 'Preise', 'tag'], ['/faq', 'FAQ', 'help'], ['/kontakt', 'Kontakt', 'mail']];
export function Header() { const currentPath = usePathname(); const pathname = currentPath === '/' ? '/' : currentPath.replace(/\/$/, ''); const [open, setOpen] = useState(false);
 const header = useRef<HTMLElement>(null);
 const menu = useRef<HTMLButtonElement>(null);
 useEffect(() => {
  if (!open) return;
  const closeWithEscape = (event: KeyboardEvent) => {
   if (event.key === 'Escape') { setOpen(false); menu.current?.focus(); }
  };
  const closeOutside = (event: PointerEvent) => {
   if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
  };
  const desktop = window.matchMedia('(min-width: 761px)');
  const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
  document.addEventListener('keydown', closeWithEscape);
  document.addEventListener('pointerdown', closeOutside);
  desktop.addEventListener('change', closeOnDesktop);
  return () => {
   document.removeEventListener('keydown', closeWithEscape);
   document.removeEventListener('pointerdown', closeOutside);
   desktop.removeEventListener('change', closeOnDesktop);
  };
 }, [open]);
 return <header ref={header} className="site-header"><div className="header-inner"><Logo /><nav id="mobile-nav" aria-label="Hauptnavigation" className={open ? 'main-nav is-open' : 'main-nav'}>{nav.map(([url, label, icon]) => <a key={url} href={sitePath(url)} onClick={() => setOpen(false)} className={pathname === url || (url === '/filme' && pathname === '/serien') ? 'active' : ''} aria-current={pathname === url ? 'page' : undefined}><Icon name={icon} size={17} />{label}</a>)}</nav><a className="button small header-cta" href={sitePath('/preise')}>Jetzt starten <Icon name="arrow" size={15} /></a><button ref={menu} className="menu-button icon-button" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button></div></header>; }
export function Footer() { return <footer className="site-footer"><div className="footer-top"><div><Logo /><p>Premium Streaming. Einfach. Flexibel.</p><small>Informationen und Anfragen für Deutschland.</small></div><div className="footer-links"><a href={sitePath('/tv-kanaele')}>TV Kanäle</a><a href={sitePath('/filme')}>Filme</a><a href={sitePath('/serien')}>Serien</a><a href={sitePath('/preise')}>Preise</a><a href={sitePath('/geraete')}>Geräte</a><a href={sitePath('/ratgeber')}>Ratgeber</a><a href={sitePath('/ueber-uns')}>Über uns</a><a href={sitePath('/kontakt')}>Kontakt</a></div><a className="footer-contact" href={sitePath('/kontakt')}><Icon name="chat" /> Fragen? Schreib uns <Icon name="arrow" size={16} /></a></div><div className="footer-bottom"><small>© {new Date().getFullYear()} upip-tv.com</small><div><a href={sitePath('/datenschutz')}>Datenschutz</a><a href={sitePath('/agb')}>AGB</a><a href={sitePath('/impressum')}>Impressum</a><a href={sitePath('/widerruf')}>Widerruf</a><a href={sitePath('/kuendigung')}>Verträge hier kündigen</a><button className="text-button" onClick={() => window.dispatchEvent(new Event('open-consent'))}>Datenschutzeinstellungen</button></div></div></footer>; }
