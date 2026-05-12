# static

Two public surfaces driven from one set of source JSON files under the
repo-root `network/` directory:

1. **npm package [`@polygonlabs/meta`](./packages/meta/)** — typed
   `as const` ABI modules, typed network metadata, and raw JSON. See
   [`packages/meta/README.md`](./packages/meta/README.md) for usage.
2. **HTTP endpoint** at `https://static.polygon.technology/...` — the
   same JSON files served verbatim by an nginx Docker image built from
   the root `Dockerfile` and deployed via the workflows under
   `.github/workflows/`.

Both consumers read from the same `network/` tree at the repo root, so
adding or updating ABIs in one place keeps both surfaces in sync. The
npm package's `scripts/codegen.ts` reads from there and emits typed
modules + a mirror of the JSON tree into `packages/meta/` before
publish.

## Repo layout

```text
network/              # source-of-truth JSON tree (consumed by both surfaces below)

packages/meta/        # @polygonlabs/meta npm package
  scripts/codegen.ts  # reads <repo-root>/network/, emits src/generated/
  src/generated/      # codegenned `as const` TS modules (tracked)
  network/            # mirror of <repo-root>/network/ for the ./network/* subpath export (gitignored, materialised by prepack)

Dockerfile            # nginx image for static.polygon.technology — COPYs network/
nginx.conf, index.html
```

See [`packages/meta/CONTRIBUTING.md`](./packages/meta/CONTRIBUTING.md)
for contributor docs and [`packages/meta/MIGRATION.md`](./packages/meta/MIGRATION.md)
for `@maticnetwork/meta` → `@polygonlabs/meta` migration notes.

## License

MIT
