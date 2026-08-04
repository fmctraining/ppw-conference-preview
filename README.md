# PPW Conference
https://ppw-conference.com/

Static HTML of the Post Production World conference site. Hand-authored pages (no build step) plus assets in `ppw-assets/`.

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

Each public page sets `<link rel="canonical">` to itself on [ppw-conference.com](https://ppw-conference.com/) (this site is the live host; paths match the HTML filename without `.html`):

- `index.html` → `https://ppw-conference.com/`
- `new-york.html` → `https://ppw-conference.com/new-york`
- `vegas.html` → `https://ppw-conference.com/vegas`
- `london.html` → `https://ppw-conference.com/london`
- `mumbai.html` → `https://ppw-conference.com/mumbai`
- `ppw-sponsorships.html` → `https://ppw-conference.com/ppw-sponsorships`

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
