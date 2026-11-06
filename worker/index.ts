import handler from "vinext/server/fetch-handler";
import { runWithConnectorBinding } from "../lib/connector-context";
import type { ConnectorBinding } from "../lib/connector-contract.mjs";
import { secureResponse } from "../lib/security";
import { pages } from "../content/pages";
import { articles } from "../content/articles";

const knownPages = new Set([...Object.keys(pages), ...articles.map(article => `/ratgeber/${article.slug}`), '/robots.txt', '/sitemap.xml', '/llms.txt']);

const worker = {
  async fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext<{ CONNECTORS?: ConnectorBinding }>) {
    let binding = ctx.props?.CONNECTORS;
    // Local preview emulates the same request-scoped capability. This branch and
    // the auxiliary service binding are absent from production builds.
    if (import.meta.env.DEV && !binding && env.CONNECTORS) {
      const preview = env.CONNECTORS;
      const expiresAt = Date.now() + 60_000;
      binding = {
        async getContext() {
          if (Date.now() >= expiresAt) return { status: "request_context_expired" };
          return preview.getContext?.() ?? { status: "binding_unavailable" };
        },
        async invoke(connectorId, actionName, args) {
          if (Date.now() >= expiresAt) {
            return { status: "request_context_expired", message: "This request has expired. Please try again." };
          }
          return preview.invoke(connectorId, actionName, args);
        },
      };
    }
    const url = new URL(request.url);
    const response = await runWithConnectorBinding(binding, () => handler.fetch(request, env, ctx));
    // Streaming can begin before a dynamic route calls notFound(). Keep the
    // visible error page while making the document status accurate for crawlers.
    const path = url.pathname.length > 1 ? url.pathname.replace(/\/$/, '') : '/';
    const asset = /^\/(?:_next|images|fonts)\//.test(path) || path === '/favicon.svg';
    const unknownDocument = !knownPages.has(path) && !asset && response.status === 200;
    const finalResponse = unknownDocument ? new Response(response.body, { status: 404, headers: response.headers }) : response;
    if (unknownDocument) finalResponse.headers.set('Cache-Control', 'no-store');
    else if (response.status === 200 && response.headers.get('Content-Type')?.includes('text/html')) {
      // Keep pricing and legal revisions fresh instead of inheriting a year-long
      // framework CDN lifetime for statically classified marketing documents.
      finalResponse.headers.set('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=600');
    }
    return secureResponse(finalResponse, url.protocol === 'https:');
  },
};

export default worker;
