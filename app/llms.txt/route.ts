import { business, pageUrl } from '@/config/business';
import { llmsText } from '@/lib/site-files';
export function GET() {
  const body = llmsText(business.name, { prices: pageUrl('/preise'), faq: pageUrl('/faq'), devices: pageUrl('/geraete'), contact: pageUrl('/kontakt'), legal: pageUrl('/impressum') });
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
