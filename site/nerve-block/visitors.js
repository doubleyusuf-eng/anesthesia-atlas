'use strict';
/* Anonymous visitor counters: no cookies, no personal data, no third-party script or SDK.
   Firestore REST (project anesthesia-briefs-v2), rules in the "siteStats" block:
     siteStats/{site}/days/{YYYY-MM-DD}.n   unique browsers that day (Europe/Istanbul)
     siteStats/{site}/months/{YYYY-MM}.n    unique browsers that month
     siteStats/{site}/presence/{vid}.t      server time of the browser's last heartbeat
   "Active" = heartbeat within the last 2 minutes. A browser is a random id kept in
   localStorage; with storage blocked it is counted again on each visit.
   Needs <div id="visitor-stats" data-site="www|atlas"> with [data-k="active|today|month"] .v */
(() => {
  const host = document.getElementById('visitor-stats');
  if (!host || !window.fetch || !window.crypto) return;
  const SITE = host.dataset.site;
  const DOCS = 'projects/anesthesia-briefs-v2/databases/(default)/documents';
  const API = 'https://firestore.googleapis.com/v1/' + DOCS;
  const BASE = DOCS + '/siteStats/' + SITE;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  let vid = store.get('ab_vid');
  if (!/^[A-Za-z0-9]{16,40}$/.test(vid || '')) {
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    vid = Array.from(crypto.getRandomValues(new Uint8Array(20)), (b) => abc[b % 62]).join('');
    store.set('ab_vid', vid);
  }
  const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const month = day.slice(0, 7);
  const post = (url, body) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const plusOne = (path) => ({ transform: { document: BASE + path, fieldTransforms: [{ fieldPath: 'n', increment: { integerValue: '1' } }] } });

  async function countVisit() {
    const kd = 'ab_vd_' + SITE, km = 'ab_vm_' + SITE, writes = [];
    if (store.get(kd) !== day) writes.push(plusOne('/days/' + day));
    if (store.get(km) !== month) writes.push(plusOne('/months/' + month));
    if (!writes.length) return;
    const r = await post(API + ':commit', { writes });
    if (r.ok) { store.set(kd, day); store.set(km, month); }
  }
  const heartbeat = () => post(API + ':commit', { writes: [{
    update: { name: BASE + '/presence/' + vid, fields: {} }, updateMask: { fieldPaths: [] },
    updateTransforms: [{ fieldPath: 't', setToServerValue: 'REQUEST_TIME' }],
  }] });
  async function readN(path) {
    const r = await fetch(API + '/siteStats/' + SITE + path);
    if (!r.ok) return 0;
    const j = await r.json();
    return Number(j.fields?.n?.integerValue || 0);
  }
  async function readActive() {
    const since = new Date(Date.now() - 120000).toISOString();
    const r = await post(API + '/siteStats/' + SITE + ':runAggregationQuery', { structuredAggregationQuery: {
      structuredQuery: { from: [{ collectionId: 'presence' }], where: { fieldFilter: { field: { fieldPath: 't' }, op: 'GREATER_THAN_OR_EQUAL', value: { timestampValue: since } } } },
      aggregations: [{ alias: 'n', count: {} }],
    } });
    if (!r.ok) return 1;
    const j = await r.json();
    return Number(j[0]?.result?.aggregateFields?.n?.integerValue || 0);
  }
  const fmt = (n) => n.toLocaleString(document.documentElement.lang || undefined);
  async function render() {
    const [active, today, thisMonth] = await Promise.all([readActive(), readN('/days/' + day), readN('/months/' + month)]);
    // this browser counts itself even if a write was refused or is still in flight
    const vals = { active: Math.max(1, active), today: Math.max(1, today), month: Math.max(1, thisMonth) };
    for (const [k, v] of Object.entries(vals)) { const el = host.querySelector(`[data-k="${k}"] .v`); if (el) el.textContent = fmt(v); }
    host.hidden = false;
  }
  async function tick() { try { await heartbeat(); await render(); } catch (e) { /* offline: keep the last numbers */ } }
  // Start after the page has settled so the requests never compete with first paint or scrolling.
  const start = async () => {
    try { await countVisit(); } catch (e) {}
    await tick();
    setInterval(() => { if (document.visibilityState === 'visible') tick(); }, 60000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') tick(); });
  };
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 4000 }); else setTimeout(start, 2000);
})();
