import { business, pageUrl, planMonthsList } from '@/config/business';
import { llmsText } from '@/lib/site-files';
export function GET() {
  const body = llmsText(business.name, { prices: pageUrl('/preise'), faq: pageUrl('/faq'), devices: pageUrl('/geraete'), contact: pageUrl('/kontakt'), legal: pageUrl('/impressum') }, planMonthsList());
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
