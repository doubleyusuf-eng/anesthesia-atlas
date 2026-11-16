// Blok listesi (arayüzdeki sıra; gruplar seçicide başlık olur, ilk görüldükleri sırayla)
import interskalen from './interskalen.js';
import supraklavikuler from './supraklavikuler.js';
import infraklavikuler from './infraklavikuler.js';
import aksiller from './aksiller.js';
import pecs from './pecs.js';
import serratus from './serratus.js';
import esp from './esp.js';
import paravertebral from './paravertebral.js';
import tap from './tap.js';
import rektus from './rektus.js';
import ql from './ql.js';
import fasyailiaka from './fasyailiaka.js';
import peng from './peng.js';
import femoral from './femoral.js';
import subgluteal from './subgluteal.js';
import adduktor from './adduktor.js';
import ipack from './ipack.js';
import popliteal from './popliteal.js';

export const BLOKLAR = [
  // Üst ekstremite
  interskalen, supraklavikuler, infraklavikuler, aksiller,
  // Gövde
  pecs, serratus, esp, paravertebral, tap, rektus, ql,
  // Alt ekstremite
  fasyailiaka, peng, femoral, subgluteal, adduktor, ipack, popliteal,
];
