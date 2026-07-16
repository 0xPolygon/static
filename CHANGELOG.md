# Changelog

Repo-level changelog for the `static.polygon.technology` HTTP endpoint and the
repository's tooling. The `@polygonlabs/meta` npm package has its own
changesets-managed changelog at
[`packages/meta/CHANGELOG.md`](./packages/meta/CHANGELOG.md).

## 1.0.0 — 2026-07-08

First changelog entry, marking the endpoint's move to Cloudflare.

### Changed

- `static.polygon.technology` is now served from Cloudflare Workers static
  assets. The nginx Docker image and its AWS ECS / GCP deploy pipelines are
  removed (`Dockerfile`, `nginx.conf`, `deployment.yml`, `build_and_deploy.yml`,
  `deployment_gcp.yml`, `.github/taskdef/`). The image was internal deploy
  tooling only — it was never published to a public registry. Self-hosting the
  content needs nothing more than a static file server pointed at `network/`;
  the retired nginx setup remains available in git history.
- Deployment is trunk-based via `wrangler` (`.github/workflows/deploy.yml`):
  pushes to `master` deploy staging (`static-staging.polygon.technology`), and
  `@polygonlabs/meta` release tags deploy production, in lockstep with the npm
  publish.
- Missing paths now return a real `404`. The retired nginx config served the
  health-check HTML page with `200` for any unknown path.
- CORS: preflight `OPTIONS` is answered by a minimal worker script
  (`worker/worker.ts`) with `204` and `Access-Control-Allow-Origin: *`,
  `Allow-Methods: GET, HEAD, OPTIONS`, `Allow-Headers: Content-Type,
  Authorization`, `Max-Age: 86400`; asset responses carry
  `Access-Control-Allow-Origin: *` via `_headers`. `POST` is no longer
  advertised (nothing accepts a write), but the `Content-Type`/`Authorization`
  allow-headers are load-bearing: maticjs sends `Content-Type` on its GETs, so
  browsers preflight — an initial Cloudflare revision shipped without the
  worker, returned 405 to preflights, and broke browser maticjs consumers
  until the worker restored them (#194).
- Responses now carry `Cache-Control: public, max-age=300`.

### Removed

- `/network/index.js` (a CommonJS `Network` class predating the
  `@maticnetwork/meta` 2.x package split) is no longer served. Use the
  [`@polygonlabs/meta`](./packages/meta/) npm package for typed access, or
  fetch the JSON tree directly.
