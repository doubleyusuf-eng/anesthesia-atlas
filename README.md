# Anesthesia Atlas · publish repo

Everything served at https://atlas.anesthesiabriefs.com, and nothing else. This repo is public; the atlases' sources, tests, tools and references live in their own private repos.

| Path | What it is | Source |
|---|---|---|
| `site/index.html`, `site/en/`, `site/es/` | Landing page with the six atlas banners (3 × 2 on desktop, one column on phones) | `tools/build-hub.cjs` (generated, do not hand-edit) |
| `site/fizik.html`, `site/ekipman.html`, `site/kaynakca.html` (+ `en/`, `es/`) | Redirects from the machine atlas's old root addresses | `tools/build-hub.cjs` |
| `site/anesthesia-machine/` | Anesthesia Machine Atlas | `tools/sync-machine.sh` from `../Anestezi-Atlasi` |
| `site/advanced-monitoring/` | Advanced Monitoring Atlas | `tools/sync-monitoring.sh` from `../Ileri-Cihaz-Atlasi` |
| `site/mechanical-ventilation/` | Mechanical Ventilation Atlas | `tools/sync-ventilation.sh` from `../Mekanik-Ventilasyon-Atlasi` |
| `site/blood-gas/` | Blood Gas Atlas | `tools/sync-bloodgas.sh` from `../Kan-Gazi-Atlasi` |
| `site/nerve-block/` | Nerve Block Atlas (Sinir Bloğu Atlası; Turkish only for now) | `tools/sync-nerveblock.sh` from `../AR-Sinir-Blogu` |
| `site/edaic/` | EDAIC Preparation Atlas (EDAIC’e Hazırlık Atlası; Turkish only for now) | `tools/sync-edaic.sh` from `../EDAIC-Sinav-Atlasi` |

## Updating

```sh
node tools/build-hub.cjs      # after editing landing-page text or adding an atlas
./tools/sync-machine.sh       # runs the machine atlas's checks, then copies its site/
./tools/sync-monitoring.sh    # same for the Advanced Monitoring Atlas
./tools/sync-ventilation.sh   # same for the Mechanical Ventilation Atlas
./tools/sync-bloodgas.sh      # same for the Blood Gas Atlas (its check runs the engine tests)
./tools/sync-nerveblock.sh    # same for the Nerve Block Atlas (its check: links, blocks, region models, JS syntax)
./tools/sync-edaic.sh         # same for the EDAIC Preparation Atlas (its check: links, JS syntax, source markers, components, tabs)
node tools/check-links.cjs    # the same check the deploy runs
```

To open a "coming soon" atlas: sync it into its folder, set its `status` to `live` in `tools/build-hub.cjs`, rebuild.
An atlas can be live in some languages only: `langs: ['tr']` on its `ATLASES` entry keeps the other languages' cards "coming soon" (the Nerve Block and EDAIC atlases until they are translated).

Preview locally: `python3 -m http.server 8833 --directory site`.

Push to `main` deploys via `.github/workflows/pages.yml`.

© 2026 Anesthesia Briefs and Anestezi Rehberi. All rights reserved, except the 3D anatomy models in `site/nerve-block/models/`: they are adapted from Z-Anatomy (Lluís Vinent) and BodyParts3D (DBCLS) and licensed CC BY-SA 4.0, as the atlas footer states.
