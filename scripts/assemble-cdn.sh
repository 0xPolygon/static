#!/usr/bin/env bash
# Assemble the Cloudflare static-assets bundle.
#
# Cloudflare serves the assets directory at the URL root, so the bundle's top
# level must mirror exactly what consumers request: `/network/...` JSON, the
# `/` health-check page, and a `_headers` rule file (CORS + caching). maticjs,
# bridge-api-services, and portal hardcode these `/network/...` paths, so the
# layout under dist/ must match the served paths byte-for-byte.
#
# `_headers` lives in public/ (source) and is copied to the bundle root, where
# Cloudflare reads it and excludes it from the served assets.
set -euo pipefail

cd "$(dirname "$0")/.."

rm -rf dist
mkdir -p dist
cp -R network dist/network
cp index.html dist/index.html
cp public/_headers dist/_headers

echo "Assembled dist/ ($(find dist -type f | wc -l | tr -d ' ') files)"
