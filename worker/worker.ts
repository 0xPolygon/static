// CORS preflight shim in front of the static-assets bundle.
//
// Cloudflare's asset layer serves GET/HEAD only; every other method routes to
// the worker script — or returns 405 when none exists. That 405 broke maticjs
// in every browser: it sends Content-Type on its GET of
// /network/<network>/<version>/index.json, browsers therefore preflight with
// OPTIONS, and a failed preflight blocks the GET entirely. This worker answers
// OPTIONS and delegates everything else to the asset layer. run_worker_first
// is required (see wrangler.toml): with default routing the asset layer 405s
// OPTIONS on asset-matched paths itself and the worker never sees it.
interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request, env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          // Content-Type is what maticjs sends (see above); Authorization
          // restores the old nginx origin's allowance for clients that
          // attach it.
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400'
        }
      });
    }
    // Everything else defers to the asset layer, which applies _headers and
    // not_found_handling as if the worker weren't here.
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;
