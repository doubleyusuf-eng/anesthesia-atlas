#!/usr/bin/env node
'use strict';
/* Fails if a hub page or redirect stub points at a local file that does not exist.
   The atlases under their own folders are checked in their own repos before they are synced. */
const fs = require('fs');
const path = require('path');
const SITE = path.join(__dirname, '..', 'site');
const ATLAS_DIRS = ['anesthesia-machine', 'advanced-monitoring', 'mechanical-ventilation', 'blood-gas'];
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!ATLAS_DIRS.includes(path.relative(SITE, p))) walk(p); }
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(SITE);
const live = ATLAS_DIRS.filter((d) => fs.existsSync(path.join(SITE, d, 'index.html')));
let bad = 0;
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g), ...html.matchAll(/url=([^"]+)"/g), ...html.matchAll(/location\.replace\("([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|data:)/.test(ref)) continue;
    let target = path.resolve(path.dirname(page), ref);
    const inAtlas = ATLAS_DIRS.find((d) => target.startsWith(path.join(SITE, d) + path.sep) || target === path.join(SITE, d));
    if (inAtlas && !live.includes(inAtlas)) continue; // "coming soon" atlases are not linked yet
    if (ref.endsWith('/') || fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) { bad++; console.error(`MISSING ${path.relative(SITE, page)} -> ${ref}`); }
  }
}
if (bad) { console.error(`FAIL: ${bad} broken local link(s)`); process.exit(1); }
console.log(`PASS: ${pages.length} pages, all local links resolve; live atlases: ${live.join(', ') || 'none'}`);
