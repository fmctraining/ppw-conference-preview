# PPW Conference Preview

Static HTML preview of the Post Production World conference site. Hand-authored pages (no build step) plus assets in `ppw-assets/`.

## Public pages

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

## Deploy (Cloudflare Workers)

### `wrangler.jsonc`

Assets-only Worker config: no Worker script. Everything under the project root is published as static assets.

```bash
npx wrangler deploy
# or preview locally:
npx wrangler dev
```

### `.assetsignore`

Gitignore-style list of paths **not** uploaded as public assets:

- `.git`, `wrangler.jsonc`, `.wrangler`, `.netlify`, and similar — repo / tooling, not site content
- `_*.html` — internal review pages (audit, hub, design options)

Edit `.assetsignore` if you need more private paths excluded from deploy.
