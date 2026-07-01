// Cloudflare Workers entry point.
//
// The production env binds this Worker to static.polygon.technology via a *route*
// (see wrangler.toml). A route attaches the Worker to an existing proxied record
// without touching DNS — but unlike an assets-only deployment, a route needs a
// Worker script, so this thin entry exists to guarantee the binding serves assets.
//
// Asset requests are served directly from Cloudflare's edge WITHOUT invoking this
// handler (no per-request cost for the hot path). It runs only for paths matching
// no asset, where it defers back to the assets binding so not_found_handling
// ("none" → 404) still applies. The Workers runtime requires a default export, so
// this is a framework-imposed exception to the named-exports-only rule.
interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  }
};
