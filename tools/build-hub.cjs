#!/usr/bin/env node
'use strict';
/* Builds the Anesthesia Atlas landing page (site/index.html, site/en/index.html, site/es/index.html)
   and the redirect stubs that keep the old machine-atlas addresses working.
   Edit the strings and the template here, then run: node tools/build-hub.cjs */
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..', 'site');
const ORIGIN = 'https://atlas.anesthesiabriefs.com';
const YEAR = 2026;

const ATLASES = [
  { id: 'anesthesia-machine', status: 'live', img: 'img/anesthesia-machine.jpg', w: 1200, h: 786, tone: 'blue' },
  { id: 'advanced-monitoring', status: 'live', img: 'img/advanced-monitoring.jpg', w: 900, h: 846, tone: 'teal' },
  { id: 'mechanical-ventilation', status: 'live', svg: 'vent', tone: 'orange' },
];

const T = {
  tr: {
    locale: 'tr_TR', dir: '', name: 'Anestezi Atlası',
    title: 'Anestezi Atlası · 3B eğitim atlasları',
    desc: 'Anestezi makinesi, ileri monitörizasyon ve mekanik ventilasyon için ücretsiz, etkileşimli 3B eğitim atlasları. Anesthesia Briefs ve Anestezi Rehberi tarafından hazırlanır.',
    back: 'Anesthesia Briefs', backAria: "Anesthesia Briefs'e dön", langAria: 'Dil · Language · Idioma',
    h1: 'Anestezi Atlası',
    by: 'Hazırlayanlar',
    listTitle: 'Atlaslar', listAria: 'Atlaslar',
    live: 'Yayında', soon: 'Yakında', open: 'Atlası aç', soonCta: 'Hazırlanıyor',
    atlases: {
      'anesthesia-machine': {
        name: 'Anestezi Makinesi Atlası',
        text: 'Anestezi iş istasyonunu parça parça inceleyin: gazın duvardaki prizden alveole uzanan yolu, bu yolu yöneten fizik yasaları, körüklü ventilatör ve hasta monitörü.',
        facts: [['18', 'parça'], ['10', 'fizik yasası'], ['8', 'ekipman modeli'], ['4', 'vaka']],
        alt: 'Anestezi makinesinin 3B modeli: akış ölçerler, vaporizatörler, körük ve hasta monitörü',
      },
      'advanced-monitoring': {
        name: 'İleri Monitörizasyon Atlası',
        text: 'Anestezi derinliği ve nosisepsiyon monitörlerinden ileri hemodinamiye, nöromüsküler izlemden NIRS’e: her cihaz nasıl çalışır, hastaya nasıl uygulanır, verisi nasıl yorumlanır.',
        facts: [['BIS', 'derinlik'], ['NIRS', 'serebral oksimetri'], ['TOF', 'nöromüsküler'], ['CO', 'hemodinami']],
        alt: 'Alnına derinlik monitörü sensörü yerleştirilmiş hastanın 3B baş modeli',
      },
      'mechanical-ventilation': {
        name: 'Mekanik Ventilasyon Atlası',
        text: 'Volüm ve basınç kontrollü modlardan destek modlarına: her modun nasıl çalıştığını canlı basınç, akım ve hacim eğrileri üzerinde adım adım görün.',
        facts: [['VC', 'volüm kontrol'], ['PC', 'basınç kontrol'], ['PS', 'basınç destek'], ['SIMV', 'senkronize']],
        alt: 'Basınç kontrollü modda ventilatör ekranı: basınç, akım ve hacim eğrileri',
      },
    },
    credit: 'Anesthesia Briefs ve Anestezi Rehberi tarafından hazırlanmıştır.',
    note: 'Atlaslar eğitim amaçlıdır. Modeller belirli bir markayı değil, genel cihazları temsil eder; sayısal değerler yaklaşıktır. Klinik değerlendirmenin, cihaz kılavuzunun veya kurum protokollerinin yerini tutmaz.',
    rights: `© ${YEAR} Anesthesia Briefs ve Anestezi Rehberi. Tüm hakları saklıdır.`,
    visitors: ['şu an aktif', 'Bugün', 'Bu ay'],
    redirect: 'Bu sayfa taşındı:',
  },
  en: {
    locale: 'en_US', dir: 'en/', name: 'Anesthesia Atlas',
    title: 'Anesthesia Atlas · 3D teaching atlases',
    desc: 'Free, interactive 3D teaching atlases for the anaesthesia machine, advanced monitoring and mechanical ventilation. By Anesthesia Briefs and Anestezi Rehberi.',
    back: 'Anesthesia Briefs', backAria: 'Back to Anesthesia Briefs', langAria: 'Dil · Language · Idioma',
    h1: 'Anesthesia Atlas',
    by: 'Made by',
    listTitle: 'Atlases', listAria: 'Atlases',
    live: 'Live', soon: 'Coming soon', open: 'Open the atlas', soonCta: 'In preparation',
    atlases: {
      'anesthesia-machine': {
        name: 'Anaesthesia Machine Atlas',
        text: 'Explore an anaesthesia workstation part by part: the path gas takes from the wall outlet to the alveolus, the physical laws that govern it, the bellows ventilator and the patient monitor.',
        facts: [['18', 'parts'], ['10', 'laws of physics'], ['8', 'equipment models'], ['4', 'cases']],
        alt: '3D model of an anaesthesia machine: flowmeters, vaporizers, bellows and patient monitor',
      },
      'advanced-monitoring': {
        name: 'Advanced Monitoring Atlas',
        text: 'From depth-of-anaesthesia and nociception monitors to advanced haemodynamics, neuromuscular monitoring and NIRS: how each device works, how it is applied to the patient and how to interpret its data.',
        facts: [['BIS', 'depth'], ['NIRS', 'cerebral oximetry'], ['TOF', 'neuromuscular'], ['CO', 'haemodynamics']],
        alt: '3D head model of a patient with a depth-of-anaesthesia sensor on the forehead',
      },
      'mechanical-ventilation': {
        name: 'Mechanical Ventilation Atlas',
        text: 'From volume- and pressure-controlled modes to support modes: see step by step how each mode works on live pressure, flow and volume waveforms.',
        facts: [['VC', 'volume control'], ['PC', 'pressure control'], ['PS', 'pressure support'], ['SIMV', 'synchronized']],
        alt: 'Ventilator screen in pressure-controlled mode: pressure, flow and volume waveforms',
      },
    },
    credit: 'by Anesthesia Briefs and Anestezi Rehberi',
    note: 'The atlases are for education. The models represent generic equipment rather than a specific brand, and numerical values are approximate. They do not replace clinical judgement, the device manual or local protocols.',
    rights: `© ${YEAR} Anesthesia Briefs and Anestezi Rehberi. All rights reserved.`,
    visitors: ['active now', 'Today', 'This month'],
    redirect: 'This page has moved:',
  },
  es: {
    locale: 'es_ES', dir: 'es/', name: 'Atlas de Anestesia',
    title: 'Atlas de Anestesia · atlas docentes en 3D',
    desc: 'Atlas docentes en 3D, gratuitos e interactivos, sobre la máquina de anestesia, la monitorización avanzada y la ventilación mecánica. Por Anesthesia Briefs y Anestezi Rehberi.',
    back: 'Anesthesia Briefs', backAria: 'Volver a Anesthesia Briefs', langAria: 'Dil · Language · Idioma',
    h1: 'Atlas de Anestesia',
    by: 'Elaborado por',
    listTitle: 'Atlas', listAria: 'Atlas',
    live: 'Disponible', soon: 'Próximamente', open: 'Abrir el atlas', soonCta: 'En preparación',
    atlases: {
      'anesthesia-machine': {
        name: 'Atlas de la Máquina de Anestesia',
        text: 'Explore una estación de anestesia pieza a pieza: el recorrido del gas desde la toma de pared hasta el alvéolo, las leyes físicas que lo rigen, el ventilador de fuelle y el monitor del paciente.',
        facts: [['18', 'piezas'], ['10', 'leyes físicas'], ['8', 'modelos de equipamiento'], ['4', 'casos']],
        alt: 'Modelo 3D de una máquina de anestesia: caudalímetros, vaporizadores, fuelle y monitor del paciente',
      },
      'advanced-monitoring': {
        name: 'Atlas de Monitorización Avanzada',
        text: 'Desde monitores de profundidad anestésica y nocicepción hasta hemodinámica avanzada, monitorización neuromuscular y NIRS: cómo funciona cada equipo, cómo se aplica al paciente y cómo se interpretan sus datos.',
        facts: [['BIS', 'profundidad'], ['NIRS', 'oximetría cerebral'], ['TOF', 'neuromuscular'], ['GC', 'hemodinámica']],
        alt: 'Modelo 3D de la cabeza de un paciente con un sensor de profundidad anestésica en la frente',
      },
      'mechanical-ventilation': {
        name: 'Atlas de Ventilación Mecánica',
        text: 'De los modos controlados por volumen y por presión a los modos de soporte: vea paso a paso cómo funciona cada modo sobre curvas de presión, flujo y volumen en vivo.',
        facts: [['VC', 'control por volumen'], ['PC', 'control por presión'], ['PS', 'presión de soporte'], ['SIMV', 'sincronizada']],
        alt: 'Pantalla de ventilador en modo controlado por presión: curvas de presión, flujo y volumen',
      },
    },
    credit: 'por Anesthesia Briefs y Anestezi Rehberi',
    note: 'Los atlas tienen fines docentes. Los modelos representan equipos genéricos, no una marca concreta, y los valores numéricos son aproximados. No sustituyen el juicio clínico, el manual del equipo ni los protocolos del centro.',
    rights: `© ${YEAR} Anesthesia Briefs y Anestezi Rehberi. Todos los derechos reservados.`,
    visitors: ['activos ahora', 'Hoy', 'Este mes'],
    redirect: 'Esta página se ha trasladado:',
  },
};
const LANGS = Object.keys(T);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

// The hub's own mark: an "A" (Anestezi / Anesthesia / Anestesia) whose crossbar is a monitor trace.
// The letter opens where the trace crosses it (mask), so the mark reads cleanly at 16 px.
const HUB_TRACE = 'M4 39 H21.5 L25 34.5 L28.5 42 L32.5 22.5 L36.5 46 L39.5 39 H60';
const mark = (cls, id) => `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true"><defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64"><rect width="64" height="64" fill="#fff"/><path d="${HUB_TRACE}" fill="none" stroke="#000" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></mask></defs><path class="hm-letter" d="M12.5 54 L32 10.5 L51.5 54" mask="url(#${id})" fill="none" stroke-width="7.4" stroke-linecap="round" stroke-linejoin="round"/><path class="hm-trace" d="${HUB_TRACE}" fill="none" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const logos = (up, lazy) => {
  const l = lazy ? ' loading="lazy" decoding="async"' : '';
  return `<a class="ab-logo-link" href="https://www.anesthesiabriefs.com/"><img class="ab-logo ab-light" src="${up}brand/ab-logo.png" alt="Anesthesia Briefs" width="917" height="309"${l}><img class="ab-logo ab-dark" src="${up}brand/ab-logo-white.png" alt="Anesthesia Briefs" width="917" height="309"${l}></a><span class="partner-divider" aria-hidden="true"></span><img class="ar-logo ab-light" src="${up}brand/anestezi-rehberi.png" alt="Anestezi Rehberi" width="291" height="320"${l}><img class="ar-logo ab-dark" src="${up}brand/anestezi-rehberi-white.png" alt="Anestezi Rehberi" width="291" height="320"${l}>`;
};

/* A ventilator screen in pressure control, from a one-compartment lung:
   R = 10 cmH2O·s/L, C = 0.05 L/cmH2O, PEEP 5, ΔP 12, Ti 1.1 s, f 14/min. */
function ventScreen() {
  const R = 10, C = 0.05, PEEP = 5, dP = 12, Ti = 1.1, period = 60 / 14, rise = 0.06, span = 9, dt = 0.01;
  const P = [], F = [], V = [];
  let vol = 0;
  for (let t = 0; t <= span + 1e-9; t += dt) {
    const tb = t % period, insp = tb < Ti;
    const target = insp ? dP * (1 - Math.exp(-tb / rise)) : 0;
    const flow = (target - vol / C) / R; // L/s
    vol = Math.max(0, vol + flow * dt);
    P.push(PEEP + target); F.push(flow * 60); V.push(vol * 1000);
  }
  const x0 = 18, x1 = 452, top = [52, 182, 312], hgt = 112;
  const X = (i) => (x0 + (i * dt / span) * (x1 - x0)).toFixed(1);
  const line = (arr, lo, hi, row, cls) => {
    const y = (v) => (top[row] + hgt - ((v - lo) / (hi - lo)) * hgt).toFixed(1);
    return `<polyline class="${cls}" points="${arr.map((v, i) => X(i) + ',' + y(v)).join(' ')}"/>`;
  };
  const zero = (lo, hi, row) => (top[row] + hgt - ((0 - lo) / (hi - lo)) * hgt).toFixed(1);
  const grid = top.map((y) => `<rect class="vs-strip" x="${x0}" y="${y}" width="${x1 - x0}" height="${hgt}" rx="4"/>`).join('');
  const sweep = (x0 + (7.55 / span) * (x1 - x0)).toFixed(1);
  const num = (y, k, v, u, cls) => `<text class="vs-k" x="472" y="${y}">${k}</text><text class="vs-v ${cls}" x="472" y="${y + 30}">${v}</text><text class="vs-u" x="582" y="${y}" text-anchor="end">${u}</text>`;
  return `<svg class="vent-screen" viewBox="0 0 600 450" preserveAspectRatio="xMidYMid meet" role="img" aria-label="{{ALT}}">
<rect class="vs-bg" width="600" height="450"/>
<rect class="vs-mode" x="18" y="14" width="74" height="24" rx="5"/><text class="vs-mode-t" x="55" y="31" text-anchor="middle">PC-AC</text>
<text class="vs-head" x="104" y="31">Paw · Flow · V</text>
${grid}
<line class="vs-zero" x1="${x0}" x2="${x1}" y1="${zero(-80, 80, 1)}" y2="${zero(-80, 80, 1)}"/>
<text class="vs-lab p" x="26" y="${top[0] + 16}">Paw cmH₂O</text><text class="vs-lab f" x="26" y="${top[1] + 16}">Flow L/min</text><text class="vs-lab v" x="26" y="${top[2] + 16}">V mL</text>
${line(P, 0, 25, 0, 'tr-p')}
${line(F, -80, 80, 1, 'tr-f')}
${line(V, 0, 700, 2, 'tr-v')}
<rect class="vs-gap" x="${sweep}" y="50" width="12" height="376"/>
<line class="vs-div" x1="462" x2="462" y1="52" y2="424"/>
${num(70, 'Ppeak', '17', 'cmH₂O', 'p')}${num(140, 'PEEP', '5', 'cmH₂O', 'p')}${num(210, 'VTe', '532', 'mL', 'v')}${num(280, 'f', '14', '/min', 'f')}${num(350, 'I:E', '1:2.9', '', 'f')}
</svg>`;
}
const VENT = ventScreen();

function page(lang) {
  const s = T[lang];
  const up = lang === 'tr' ? '' : '../';
  const self = ORIGIN + '/' + s.dir;
  const alts = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${ORIGIN}/${T[l].dir}">`).join('\n');
  const langs = LANGS.map((l) => {
    const href = l === lang ? './' : (lang === 'tr' ? T[l].dir : (l === 'tr' ? '../' : '../' + T[l].dir));
    return `<a href="${href}" lang="${l}" hreflang="${l}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`;
  }).join('');
  const machineHome = up + 'anesthesia-machine/' + s.dir;

  const cards = ATLASES.map((a, i) => {
    const c = s.atlases[a.id];
    const live = a.status === 'live';
    const href = up + a.id + '/' + s.dir;
    const visual = a.svg
      ? VENT.replace('{{ALT}}', esc(c.alt))
      : `<img src="${up}${a.img}" alt="${esc(c.alt)}" width="${a.w}" height="${a.h}"${i ? ' fetchpriority="low"' : ' fetchpriority="high"'} decoding="async">`;
    const facts = c.facts.map(([n, l]) => `<li><b>${esc(n)}</b> ${esc(l)}</li>`).join('');
    const title = live ? `<a class="card-link" href="${href}">${esc(c.name)}</a>` : esc(c.name);
    const cta = live
      ? `<span class="cta" aria-hidden="true">${esc(s.open)} <span class="arr">→</span></span>`
      : `<span class="cta cta-soon">${esc(s.soonCta)}</span>`;
    return `<li class="atlas-card tone-${a.tone}${live ? ' is-live' : ' is-soon'}" id="${a.id}">
  <div class="card-visual">${visual}</div>
  <div class="card-text">
    <div class="card-meta"><span class="card-no">${String(i + 1).padStart(2, '0')}</span><span class="status ${live ? 'status-live' : 'status-soon'}">${esc(live ? s.live : s.soon)}</span></div>
    <h2>${title}</h2>
    <p class="card-desc">${esc(c.text)}</p>
    <ul class="card-facts">${facts}</ul>
    ${cta}
  </div>
</li>`;
  }).join('\n');

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(s.title)}</title>
<meta name="description" content="${esc(s.desc)}">
<link rel="canonical" href="${self}">
${alts}
<link rel="alternate" hreflang="x-default" href="${ORIGIN}/">
<link rel="icon" href="${up}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${up}apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(s.name)}">
<meta property="og:title" content="${esc(s.title)}">
<meta property="og:description" content="${esc(s.desc)}">
<meta property="og:url" content="${self}">
<meta property="og:locale" content="${s.locale}">
<meta name="twitter:card" content="summary">
<script>/* Old links into the machine atlas (atlas.anesthesiabriefs.com/#ventilator) now open it at its new address. */
if(location.hash.length>1)location.replace(${JSON.stringify(machineHome)}+location.hash);</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400&family=JetBrains+Mono:wght@400;500;700&display=swap">
<link rel="stylesheet" href="${up}hub.css">
</head>
<body>
<header class="topbar">
  <div class="wrap">
    <a class="brand" href="./" aria-label="${esc(s.name)}">${mark('brand-mark', 'bmTop')}<span>${esc(s.name)}</span></a>
    <a class="ab-back" href="https://www.anesthesiabriefs.com/" aria-label="${esc(s.backAria)}"><span aria-hidden="true">←</span> ${esc(s.back)}</a>
    <div class="lang-switch" role="group" aria-label="${esc(s.langAria)}">${langs}</div>
  </div>
</header>

<main class="hub">
  <h1 class="sr-only">${esc(s.h1)}</h1>
  <div class="wrap hub-inner">
    <ol class="atlas-list" aria-label="${esc(s.listAria)}">
${cards}
    </ol>
    <div class="by-row"><span class="by-label">${esc(s.by)}</span><span class="by-logos">${logos(up, false)}</span></div>
  </div>
</main>

<footer>
  <div class="wrap foot-brand">${mark('foot-mark', 'bmFoot')}<div class="foot-name"><span class="foot-title">${esc(s.name)}</span><span class="foot-partners"><span class="foot-by">${logos(up, true)}</span><span class="foot-credit">${esc(s.credit)}</span></span></div></div>
  <div class="wrap foot-cols">
    <p class="foot-note">${esc(s.note)}</p>
    <p class="foot-rights">${esc(s.rights)}</p>
    <div class="visitor-stats" id="visitor-stats" data-site="atlas" hidden><span data-k="active"><i class="live" aria-hidden="true"></i><b class="v">–</b> ${esc(s.visitors[0])}</span><span data-k="today">${esc(s.visitors[1])} <b class="v">–</b></span><span data-k="month">${esc(s.visitors[2])} <b class="v">–</b></span></div>
  </div>
</footer>
<script src="${up}visitors.js" defer></script>
</body>
</html>
`;
}

/* The machine atlas lived at the site root until the hub took its place; these pages send
   old bookmarks and shared links to the same page at its new address, keeping the #section. */
const MOVED = ['fizik.html', 'ekipman.html', 'kaynakca.html'];
function stub(lang, file) {
  const s = T[lang];
  const up = lang === 'tr' ? '' : '../';
  const target = up + 'anesthesia-machine/' + s.dir + file;
  const canonical = ORIGIN + '/anesthesia-machine/' + s.dir + file;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>${esc(s.atlases['anesthesia-machine'].name)}</title>
<link rel="canonical" href="${canonical}">
<script>location.replace(${JSON.stringify(target)}+location.search+location.hash);</script>
<meta http-equiv="refresh" content="0; url=${target}">
</head>
<body><p>${esc(s.redirect)} <a href="${target}">${canonical}</a></p></body>
</html>
`;
}

for (const lang of LANGS) {
  const dir = path.join(SITE, T[lang].dir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(lang));
  for (const f of MOVED) fs.writeFileSync(path.join(dir, f), stub(lang, f));
}
console.log('built hub:', LANGS.map((l) => T[l].dir + 'index.html').join(', '), '+', MOVED.length * LANGS.length, 'redirect stubs');
