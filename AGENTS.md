# Agent instructions

## Keep README.md current

When you change how this project works, update `README.md` in the same session so the docs stay accurate.

In particular, document changes that affect:

- Public pages (what ships vs internal `_*.html` comps)
- Deploy config (`wrangler.jsonc`, `.assetsignore`, hosting notes)
- SEO / head metadata (e.g. canonical URLs mapping to ppw-conference.com)
- Shared assets layout or other conventions future agents need

Keep notes brief and match the existing README style (short sections, bullets over tables). Do not invent a separate changelog unless the user asks for one — the README is the living reference.

## Local `wrangler dev`

Because `assets.directory` is `.`, never run bare `wrangler dev` / `pnpx wrangler dev` without `--persist-to` outside the project — it reload-loops on `.wrangler` state writes. Prefer `pnpm dev` (see `package.json` and README).

## Package manager

Prefer **pnpm v11** (see `pnpm-workspace.yaml` and README).
