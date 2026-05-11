# static

Two public surfaces driven from one set of source JSON files under
`packages/meta/network/`:

1. **npm package [`@polygonlabs/meta`](./packages/meta/)** — typed
   `as const` ABI modules, typed network metadata, and raw JSON. See
   [`packages/meta/README.md`](./packages/meta/README.md) for usage.
2. **HTTP endpoint** at `https://static.polygon.technology/...` — the
   same JSON files served verbatim by an nginx Docker image built from
   the root `Dockerfile` and deployed via the workflows under
   `.github/workflows/`.

Both consumers read from `packages/meta/network/`, so adding or
updating ABIs in one place keeps both surfaces in sync.

## Repo layout

```
packages/meta/        # @polygonlabs/meta npm package
  network/            # source-of-truth JSON tree (also COPYed into the nginx image)
  src/generated/      # codegenned `as const` TS modules
  scripts/codegen.mjs # walks network/, emits src/generated/

Dockerfile            # nginx image for static.polygon.technology
nginx.conf, index.html
```

See [`packages/meta/CONTRIBUTING.md`](./packages/meta/CONTRIBUTING.md)
for contributor docs and [`packages/meta/MIGRATION.md`](./packages/meta/MIGRATION.md)
for `@maticnetwork/meta` → `@polygonlabs/meta` migration notes.

## License

MIT
