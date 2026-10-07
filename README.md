# Anesthesia Atlas · publish repo

Everything served at https://atlas.anesthesiabriefs.com, and nothing else. This repo is public; the atlases' sources, tests, tools and references live in their own private repos.

| Path | What it is | Source |
|---|---|---|
| `site/index.html`, `site/en/`, `site/es/` | Landing page with the three atlas banners | `tools/build-hub.cjs` (generated, do not hand-edit) |
| `site/fizik.html`, `site/ekipman.html`, `site/kaynakca.html` (+ `en/`, `es/`) | Redirects from the machine atlas's old root addresses | `tools/build-hub.cjs` |
| `site/anesthesia-machine/` | Anesthesia Machine Atlas | `tools/sync-machine.sh` from `../Anestezi-Atlasi` |
| `site/advanced-monitoring/` | Advanced Monitoring Atlas | `tools/sync-monitoring.sh` from `../Ileri-Cihaz-Atlasi` |
| `site/mechanical-ventilation/` | Mechanical Ventilation Atlas (coming soon) | not published yet |

## Updating

```sh
node tools/build-hub.cjs      # after editing landing-page text or adding an atlas
./tools/sync-machine.sh       # runs the machine atlas's checks, then copies its site/
./tools/sync-monitoring.sh    # same for the Advanced Monitoring Atlas
node tools/check-links.cjs    # the same check the deploy runs
```

To open a "coming soon" atlas: sync it into its folder, set its `status` to `live` in `tools/build-hub.cjs`, rebuild.

Preview locally: `python3 -m http.server 8833 --directory site`.

Push to `main` deploys via `.github/workflows/pages.yml`.

© 2026 Anesthesia Briefs and Anestezi Rehberi. All rights reserved.
