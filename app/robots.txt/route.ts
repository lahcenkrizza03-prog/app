import { business } from '@/config/business';
import { robotsText } from '@/lib/site-files';
export function GET() { return new Response(robotsText(business.url), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }); }
