export const securityHeaders: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://*.google-analytics.com https://www.googletagmanager.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self' https://chatgpt.com https://*.chatgpt.com https://*.chatgpt.site; upgrade-insecure-requests",
};
export function secureResponse(response: Response, https: boolean) { const result = new Response(response.body, response); for (const [key, value] of Object.entries(securityHeaders)) result.headers.set(key, value); if (https) result.headers.set('Strict-Transport-Security', 'max-age=31536000'); return result; }
