# PPW Conference Preview

Static HTML preview of the Post Production World conference site. Hand-authored pages (no build step) plus assets in `ppw-assets/`.

### Local preview (as served by Cloudflare)

- Install [pnpm](https://pnpm.io/installation) (v11 preferred)
- Run `pnpm install` to install wrangler
- Run `pnpm dev` to start a local preview dev server
- Type `b` to open the preview in a browser
- Type `x` to exit

### Public pages

- `index.html` — homepage
- `new-york.html`, `vegas.html`, `london.html`, `mumbai.html` — city editions
- `ppw-sponsorships.html` — sponsorship

Internal design/review comps use an `_` prefix (e.g. `_hub.html`). They are not linked from the public site.

### Canonical URLs

Each public page sets `<link rel="canonical">` to the matching URL on the live site ([ppw-conference.com](https://www.ppw-conference.com/)) when one exists:

- `index.html` → `https://www.ppw-conference.com/`
- `new-york.html` → `https://www.ppw-conference.com/nyc/`
- `vegas.html` → `https://www.ppw-conference.com/las-vegas/`
- `london.html` → `https://www.ppw-conference.com/london/`
- `mumbai.html` → `https://www.ppw-conference.com/mumbai/`
- `ppw-sponsorships.html` → `https://www.ppw-conference.com/` (no dedicated sponsorship page on the live site)

### `.assetsignore`

Gitignore-style list of paths **not** uploaded as public assets:

- `.git`, `wrangler.jsonc`, `.wrangler`, `.netlify`, `package.json`, `pnpm-workspace.yaml`, README/AGENTS, and similar — repo / tooling, not site content
- `_*.html` — internal review pages (audit, hub, design options)

Edit `.assetsignore` if you need more private paths excluded from deploy.

### Dev note
`assets.directory` is `.` (the repo root). Wrangler’s default local state lives under `.wrangler/`, which is *inside* that watched tree. State files (e.g. SQLite `-shm`) update continuously, so bare `wrangler dev` / `pnpx wrangler dev` enters an infinite “Local server updated / Reloading…” loop.

Use the `dev` script (or pass the flag yourself):

```bash
pnpm dev
# equivalent:
pnpx wrangler dev --persist-to /tmp/ppw-conference-preview-wrangler
```

That keeps local persistence outside the assets directory so the watcher stays quiet.
