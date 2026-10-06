(function(){
'use strict';
/* ───────────── PARÇALAR ───────────── */
const PARTS=[
 {k:'pipeline',t:ATLAS.t("app.1"),z:ATLAS.t("app.2"),a:[.2,1.03,-.36],v:[2.55,1.25,1.15],
  s:ATLAS.t("app.3"),
  f:[[ATLAS.t("app.4"),'≈ 4 bar (400 kPa)'],[ATLAS.t("app.5"),ATLAS.t("app.6")],[ATLAS.t("app.7"),ATLAS.t("app.8")]],
  b:[ATLAS.t("app.9"),ATLAS.t("app.10")],
  p:['fizik.html#fizik-boyle',ATLAS.t("app.11")]},
 {k:'cylinders',t:ATLAS.t("app.12"),z:ATLAS.t("app.13"),a:[-.06,.62,-.44],v:[2.75,1.2,1.25],
  s:ATLAS.t("app.14"),
  f:[[ATLAS.t("app.15"),ATLAS.t("app.16")],['N₂O (20 °C)',ATLAS.t("app.17")],[ATLAS.t("app.18"),ATLAS.t("app.19")],[ATLAS.t("app.20"),ATLAS.t("app.21")]],
  b:[ATLAS.t("app.22"),ATLAS.t("app.23")],
  p:['fizik.html#fizik-boyle',ATLAS.t("app.24")]},
 {k:'gauges',t:ATLAS.t("app.25"),z:ATLAS.t("app.26"),a:[-.19,1.39,.02],v:[-.15,.9,1.3],
  s:ATLAS.t("app.27"),
  f:[[ATLAS.t("app.28"),'0–10 bar'],[ATLAS.t("app.29"),'0–250 bar'],[ATLAS.t("app.30"),ATLAS.t("app.31")]],
  b:[ATLAS.t("app.32"),ATLAS.t("app.33")]},
 {k:'flowmeters',t:ATLAS.t("app.34"),z:ATLAS.t("app.35"),a:[-.19,1.18,.055],v:[-.1,.75,1.3],
  s:ATLAS.t("app.36"),
  f:[[ATLAS.t("app.37"),ATLAS.t("app.38")],[ATLAS.t("app.39"),ATLAS.t("app.40")],[ATLAS.t("app.41"),ATLAS.t("app.42")],[ATLAS.t("app.43"),ATLAS.t("app.44")]],
  b:[ATLAS.t("app.45"),ATLAS.t("app.46")],
  p:['fizik.html#fizik-thorpe',ATLAS.t("app.47")]},
 {k:'knobs',t:ATLAS.t("app.48"),z:ATLAS.t("app.49"),a:[-.19,.995,.08],v:[-.1,.7,1.3],
  s:ATLAS.t("app.50"),
  f:[['Link-25','N₂O:O₂ ≤ 3:1'],[ATLAS.t("app.51"),ATLAS.t("app.52")],[ATLAS.t("app.53"),ATLAS.t("app.54")]],
  b:[ATLAS.t("app.55"),ATLAS.t("app.56")]},
 {k:'vaporizers',t:ATLAS.t("app.57"),z:ATLAS.t("app.58"),a:[.17,1.26,.1],v:[.35,.8,1.25],
  s:ATLAS.t("app.59"),
  f:[[ATLAS.t("app.60"),'157 mmHg (20 °C)'],[ATLAS.t("app.61"),'669 mmHg · Tec 6: 39 °C'],[ATLAS.t("app.62"),ATLAS.t("app.63")],[ATLAS.t("app.64"),ATLAS.t("app.65")]],
  b:[ATLAS.t("app.66"),ATLAS.t("app.67")],
  p:['fizik.html#fizik-vapor',ATLAS.t("app.68")]},
 {k:'flush',t:ATLAS.t("app.69"),z:ATLAS.t("app.70"),a:[-.02,.93,.035],v:[0,.75,1.2],
  s:ATLAS.t("app.71"),
  f:[[ATLAS.t("app.72"),ATLAS.t("app.73")],[ATLAS.t("app.74"),ATLAS.t("app.75")],[ATLAS.t("app.76"),ATLAS.t("app.77")]],
  b:[ATLAS.t("app.78"),ATLAS.t("app.79")]},
 {k:'cgo',t:ATLAS.t("app.80"),z:ATLAS.t("app.81"),a:[.3,.92,.065],v:[.6,.8,1.1],
  s:ATLAS.t("app.82"),
  f:[[ATLAS.t("app.83"),ATLAS.t("app.84")],[ATLAS.t("app.85"),ATLAS.t("app.86")],[ATLAS.t("app.87"),ATLAS.t("app.88")]],
  b:[ATLAS.t("app.89"),ATLAS.t("app.90")]},
 {k:'absorber',t:ATLAS.t("app.91"),z:ATLAS.t("app.92"),a:[-.57,.66,.135],v:[-.85,.7,1.15],
  s:ATLAS.t("app.93"),
  f:[[ATLAS.t("app.94"),ATLAS.t("app.95")],[ATLAS.t("app.96"),ATLAS.t("app.97")],[ATLAS.t("app.98"),'4–8 mesh'],[ATLAS.t("app.99"),ATLAS.t("app.100")]],
  b:[ATLAS.t("app.101"),ATLAS.t("app.102")],
  p:['#monitor',ATLAS.t("app.103")]},
 {k:'valves',t:ATLAS.t("app.104"),z:ATLAS.t("app.105"),a:[-.57,.885,.09],v:[-.6,.5,.95],
  s:ATLAS.t("app.106"),
  f:[[ATLAS.t("app.107"),ATLAS.t("app.108")],[ATLAS.t("app.109"),ATLAS.t("app.110")],[ATLAS.t("app.111"),ATLAS.t("app.112")]],
  b:[ATLAS.t("app.113"),ATLAS.t("app.114")],
  p:['#monitor',ATLAS.t("app.115")]},
 {k:'o2sensor',t:ATLAS.t("app.116"),z:ATLAS.t("app.117"),a:[-.62,.915,.09],v:[-.65,.45,.95],
  s:ATLAS.t("app.118"),
  f:[[ATLAS.t("app.119"),ATLAS.t("app.120")],[ATLAS.t("app.121"),ATLAS.t("app.122")],[ATLAS.t("app.123"),ATLAS.t("app.124")]],
  b:[ATLAS.t("app.125"),ATLAS.t("app.126")],
  p:['fizik.html#fizik-dalton',ATLAS.t("app.127")]},
 {k:'apl',t:ATLAS.t("app.128"),z:ATLAS.t("app.129"),a:[-.5,.89,0],v:[-.5,.55,1.0],
  s:ATLAS.t("app.130"),
  f:[[ATLAS.t("app.131"),ATLAS.t("app.132")],[ATLAS.t("app.133"),ATLAS.t("app.134")],[ATLAS.t("app.135"),ATLAS.t("app.136")]],
  b:[ATLAS.t("app.137"),ATLAS.t("app.138")]},
 {k:'bagvent',t:ATLAS.t("app.139"),z:ATLAS.t("app.140"),a:[-.64,.88,-.01],v:[-.7,.55,1.0],
  s:ATLAS.t("app.141"),
  f:[[ATLAS.t("app.142"),ATLAS.t("app.143")],[ATLAS.t("app.144"),ATLAS.t("app.145")],[ATLAS.t("app.146"),ATLAS.t("app.147")]],
  b:[ATLAS.t("app.148")]},
 {k:'bag',t:ATLAS.t("app.149"),z:ATLAS.t("app.150"),a:[-.78,.53,.12],v:[-1.0,.8,1.1],
  s:ATLAS.t("app.151"),
  f:[[ATLAS.t("app.152"),'3 L'],[ATLAS.t("app.153"),ATLAS.t("app.154")],[ATLAS.t("app.155"),ATLAS.t("app.156")]],
  b:[ATLAS.t("app.157"),ATLAS.t("app.158")],
  p:['fizik.html#fizik-laplace',ATLAS.t("app.159")]},
 {k:'hoses',t:ATLAS.t("app.160"),z:ATLAS.t("app.161"),a:[-.55,.79,.4],v:[-.75,.75,1.2],
  s:ATLAS.t("app.162"),
  f:[[ATLAS.t("app.163"),'≈ 2–5 mL/cmH₂O'],[ATLAS.t("app.164"),ATLAS.t("app.165")],[ATLAS.t("app.166"),'22 mm']],
  b:[ATLAS.t("app.167"),ATLAS.t("app.168")]},
 {k:'lung',t:ATLAS.t("app.169"),z:ATLAS.t("app.170"),a:[-.455,.6,.71],v:[-.35,.7,1.0],
  s:ATLAS.t("app.171"),
  f:[[ATLAS.t("app.172"),'50–100 mL/cmH₂O'],[ATLAS.t("app.173"),ATLAS.t("app.174")],[ATLAS.t("app.175"),'τ = R × C']],
  b:[ATLAS.t("app.176")],
  p:['#ventilator',ATLAS.t("app.177")]},
 {k:'bellows',t:ATLAS.t("app.178"),z:ATLAS.t("app.179"),a:[.29,1.06,.22],v:[.7,.6,1.15],
  s:ATLAS.t("app.180"),
  f:[[ATLAS.t("app.181"),ATLAS.t("app.182")],[ATLAS.t("app.183"),'≈ 2–3 cmH₂O'],[ATLAS.t("app.184"),ATLAS.t("app.185")]],
  b:[ATLAS.t("app.186"),ATLAS.t("app.187")],
  p:['#ventilator',ATLAS.t("app.188")]},
 {k:'monitor',t:ATLAS.t("app.189"),z:ATLAS.t("app.190"),a:[0,1.9,-.1],v:[0,1.0,1.1],
  s:ATLAS.t("app.191"),
  f:[[ATLAS.t("app.192"),'FiO₂, SpO₂'],[ATLAS.t("app.193"),'EtCO₂, Paw, Vt'],[ATLAS.t("app.194"),ATLAS.t("app.195")],[ATLAS.t("app.196"),ATLAS.t("app.197")]],
  b:[ATLAS.t("app.198")],
  p:['#monitor',ATLAS.t("app.199")]}
];
const PIDX={}; PARTS.forEach((p,i)=>PIDX[p.k]=i);

/* ───────────── GAZ DURUMU ───────────── */
const GAS={o2:2,air:2,n2o:0,sevo:2,mode:'vent',flowVis:true};
function gasD(){const tot=GAS.o2+GAS.air+GAS.n2o;return{tot,fio2:tot>0?(GAS.o2+.21*GAS.air)/tot:0,fin2o:tot>0?GAS.n2o/tot:0,use:3*tot*GAS.sevo};}

/* ───────────── MONİTÖR + FİZYOLOJİ ───────────── */
const MON=(()=>{
  const W=1280,H=800,cv=document.createElement('canvas');cv.width=W;cv.height=H;
  cv.setAttribute('role','img');cv.setAttribute('aria-label',ATLAS.t("app.200"));
  const g=cv.getContext('2d');
  const C={bg:'#03070A',hdr:'#09131A',grid:'#0C1820',sep:'#1A2A33',ecg:'#3CF06E',art:'#FF5A68',spo2:'#3AD7F5',co2:'#F7D53C',paw:'#FF9A4A',ink:'#E8F0F4',dim:'#7890A0',crit:'#FF3B4E',warn:'#FFC233'};
  let K=1; // simülasyon hızı (1 = gerçek zaman)
  // Hasta tipleri. drop: apnede alveoler O₂ düşüş hızı (mmHg/s). Kaynak: Benumof 1997 (70 kg erişkin, SpO₂<90 ≈ 8 dk),
  // Patel 1994 (preoksijenasyon sonrası bebek 0–6 ay ≈ 97 s, 2–5 yaş ≈ 160 s); bebekte VO₂ ≈ 6 mL/kg/dk (erişkin ≈ 3).
  const PT={
    adult:{k:'adult',n:ATLAS.t("app.201"),lab:ATLAS.t("app.202"),w:70,hr:72,sys:118,dia:72,rr:12,drop:1.0,tauA:40,brady:false,al:{hrLo:45,hrHi:120,sysLo:85,sysHi:170}},
    child:{k:'child',n:ATLAS.t("app.203"),lab:ATLAS.t("app.204"),w:20,hr:100,sys:100,dia:60,rr:20,drop:2.2,tauA:25,brady:false,al:{hrLo:60,hrHi:150,sysLo:75,sysHi:140}},
    infant:{k:'infant',n:ATLAS.t("app.205"),lab:ATLAS.t("app.206"),w:5,hr:135,sys:80,dia:45,rr:30,drop:3.6,tauA:15,brady:true,al:{hrLo:100,hrHi:190,sysLo:60,sysHi:110}}};
  let pt=PT.adult;
  const EFF0={vent:1,breathing:true,rr:12,ppeak:18,pplat:15,peep:5,fico2:0,aa:10,gap:4,vco2:1,wave:'normal',tauR:.07,slope:2,cleft:false,sevoMult:1,potency:1,fgfMult:1,o2Cut:false,crossover:false,o2Add:0,fiDisplay:null,probeOff:false,sampling:false,coRise:false,hr:72,sys:118,dia:72,perf:1,pvar:0,tempRate:0,ventStop:false,circLeak:0,disc:false,alarm:null};
  const ACT={cyl:ATLAS.t("app.207"),pipecyl:ATLAS.t("app.208"),ambuAir:ATLAS.t("app.209"),ambuO2:ATLAS.t("app.210"),bag:ATLAS.t("app.211"),vent:ATLAS.t("app.212"),reconnect:ATLAS.t("app.213"),flow:ATLAS.t("app.214"),'vent+':ATLAS.t("app.215"),absorber:ATLAS.t("app.216"),valve:ATLAS.t("app.217"),vapFill:ATLAS.t("app.218"),vapOff:ATLAS.t("app.219"),tiva:ATLAS.t("app.220"),leakFix:ATLAS.t("app.221"),flushRel:ATLAS.t("app.222"),apl:ATLAS.t("app.223"),scav:ATLAS.t("app.224"),suction:ATLAS.t("app.225"),verify:ATLAS.t("app.226"),reintubate:ATLAS.t("app.227"),sensor:ATLAS.t("app.228"),machine:ATLAS.t("app.229"),bronchodil:ATLAS.t("app.230"),dantrolene:ATLAS.t("app.231"),needle:ATLAS.t("app.232"),support:ATLAS.t("app.233"),nmb:ATLAS.t("app.234")};
  const TEMPMSG={ambuAir:ATLAS.t("app.235"),ambuO2:ATLAS.t("app.236"),bag:ATLAS.t("app.237"),flow:ATLAS.t("app.238"),'vent+':ATLAS.t("app.239")};
  const SCN={
    normal:{n:'Normal',c:'hasta',d:ATLAS.t("app.240"),sg:ATLAS.t("app.241"),opts:[]},
    bronko:{n:ATLAS.t("app.242"),c:'hasta',d:ATLAS.t("app.243"),sg:ATLAS.t("app.244"),ok:ATLAS.t("app.245"),hint:ATLAS.t("app.246"),fix:['bronchodil'],opts:['bronchodil','suction','vent+','reconnect'],eff:{vent:.7,aa:70,wave:'shark',tauR:.55,slope:10,ppeak:40,pplat:19,hr:84}},
    hipovent:{n:ATLAS.t("app.247"),c:'hasta',d:ATLAS.t("app.248"),sg:ATLAS.t("app.249"),ok:ATLAS.t("app.250"),fix:['vent+'],opts:['vent+','flow','absorber','sensor'],eff:{vent:.45,rr:6}},
    ozofagus:{n:ATLAS.t("app.251"),c:'hasta',d:ATLAS.t("app.252"),sg:ATLAS.t("app.253"),ok:ATLAS.t("app.254"),hint:ATLAS.t("app.255"),fix:['reintubate'],opts:['verify','reintubate','vent+','flow'],onAct(id){if(id==='verify')return{lv:'warn',msg:ATLAS.t("app.256")};},eff:{vent:0,wave:'decay',ppeak:22,pplat:16}},
    kurar:{n:ATLAS.t("app.257"),c:'hasta',d:ATLAS.t("app.258"),sg:ATLAS.t("app.259"),ok:ATLAS.t("app.260"),fix:['nmb'],opts:['nmb','vent+','absorber','suction'],eff:{cleft:true}},
    mh:{n:ATLAS.t("app.261"),c:'hasta',d:ATLAS.t("app.262"),sg:ATLAS.t("app.263"),ok:ATLAS.t("app.264"),hint:ATLAS.t("app.265"),fix:['dantrolene'],temp:['vent+'],opts:['dantrolene','vent+','absorber','flow'],eff:t=>({vco2:Math.min(4.5,1+t/100),tempRate:.006,hr:72+Math.min(40,t/8)})},
    emboli:{n:ATLAS.t("app.266"),c:'hasta',d:ATLAS.t("app.267"),sg:ATLAS.t("app.268"),ok:ATLAS.t("app.269"),hint:ATLAS.t("app.270"),fix:['support'],opts:['support','vent+','reintubate','absorber'],eff:{gap:22,aa:70,hr:118,sys:80,dia:46,perf:.45,pvar:.3}},
    ptx:{n:ATLAS.t("app.271"),c:'hasta',d:ATLAS.t("app.272"),sg:ATLAS.t("app.273"),ok:ATLAS.t("app.274"),hint:ATLAS.t("app.275"),fix:['needle'],opts:['needle','bronchodil','suction','vent+'],eff:t=>({ppeak:Math.min(44,26+t*.1),pplat:Math.min(38,18+t*.1),aa:Math.min(260,30+t*1.2),sys:Math.max(60,118-t*.35),dia:Math.max(35,72-t*.2),hr:72+Math.min(45,t*.2),pvar:.35,vent:.8})},

    o2fail:{n:ATLAS.t("app.276"),c:'gaz',d:ATLAS.t("app.277"),sg:ATLAS.t("app.278"),ok:ATLAS.t("app.279"),fix:['cyl','pipecyl'],temp:['ambuAir','bag'],opts:['cyl','ambuAir','bag','flow'],eff:{o2Cut:true,ventStop:true,alarm:['crit',ATLAS.t("app.280")]},start(){setMode('vent');},
      onAct(id){if(id==='flow')return{lv:'bad',msg:ATLAS.t("app.281")};}},
    o2failEmpty:{n:ATLAS.t("app.282"),c:'gaz',d:ATLAS.t("app.283"),sg:ATLAS.t("app.284"),ok:ATLAS.t("app.285"),fix:['ambuO2'],temp:['ambuAir','bag'],opts:['cyl','ambuAir','ambuO2','bag'],eff:{o2Cut:true,ventStop:true,alarm:['crit',ATLAS.t("app.286")]},start(){setMode('vent');},
      onAct(id){if(id==='cyl'||id==='pipecyl')return{lv:'bad',msg:ATLAS.t("app.287")};}},
    crossover:{n:ATLAS.t("app.288"),c:'gaz',d:ATLAS.t("app.289"),sg:ATLAS.t("app.290"),ok:ATLAS.t("app.291"),fix:['pipecyl','ambuO2'],temp:['ambuAir'],opts:['cyl','pipecyl','flow','ambuAir'],eff:{crossover:true},
      onAct(id){if(id==='cyl')return{lv:'bad',msg:ATLAS.t("app.292")};if(id==='flow'){setGasUI(8,0,0);return{lv:'bad',msg:ATLAS.t("app.293")};}}},
    hypoxic:{n:ATLAS.t("app.294"),c:'gaz',d:ATLAS.t("app.295"),sg:ATLAS.t("app.296"),ok:ATLAS.t("app.297"),fix:['flow'],opts:['flow','vent+','absorber','sensor'],eff:{},start(){setGasUI(.5,0,1.5);},auto:c=>c.fi>=.3},

    vapEmpty:{n:ATLAS.t("app.298"),c:'vap',d:ATLAS.t("app.299"),sg:ATLAS.t("app.300"),ok:ATLAS.t("app.301"),fix:['vapFill','tiva'],opts:['vapFill','tiva','flow','vent+'],eff:{sevoMult:0}},
    wrongAgent:{n:ATLAS.t("app.302"),c:'vap',d:ATLAS.t("app.303"),sg:ATLAS.t("app.304"),ok:ATLAS.t("app.305"),fix:['vapOff'],opts:['vapOff','vapFill','support','flow'],eff:{potency:3,alarm:['warn',ATLAS.t("app.306")]}},
    tipped:{n:ATLAS.t("app.307"),c:'vap',d:ATLAS.t("app.308"),sg:ATLAS.t("app.309"),ok:ATLAS.t("app.310"),fix:['vapOff'],opts:['vapOff','support','vapFill','flow'],eff:{potency:5}},
    interlock:{n:ATLAS.t("app.311"),c:'vap',d:ATLAS.t("app.312"),sg:ATLAS.t("app.313"),ok:ATLAS.t("app.314"),fix:['vapOff'],opts:['vapOff','vapFill','support','flow'],eff:{potency:3,alarm:['warn',ATLAS.t("app.315")]}},
    lpLeak:{n:ATLAS.t("app.316"),c:'vap',d:ATLAS.t("app.317"),sg:ATLAS.t("app.318"),ok:ATLAS.t("app.319"),fix:['leakFix'],temp:['flow'],opts:['leakFix','flow','absorber','vent+'],eff:{fgfMult:.35,sevoMult:.35}},
    cgoDisc:{n:ATLAS.t("app.320"),c:'vap',d:ATLAS.t("app.321"),sg:ATLAS.t("app.322"),ok:ATLAS.t("app.323"),fix:['reconnect'],temp:['ambuO2'],opts:['reconnect','flow','vent+','ambuO2'],eff:{fgfMult:0},
      onAct(id){if(id==='flow'){setGasUI(8,0,0);return{lv:'bad',msg:ATLAS.t("app.324")};}}},
    flushStuck:{n:ATLAS.t("app.325"),c:'vap',d:ATLAS.t("app.326"),sg:ATLAS.t("app.327"),ok:ATLAS.t("app.328"),fix:['flushRel'],opts:['flushRel','vapFill','bag','apl'],eff:t=>({o2Add:45,sevoMult:.12,ppeak:Math.min(62,32+t*.25),pplat:Math.min(52,24+t*.22),peep:Math.min(22,6+t*.12),aa:t>100?Math.min(200,10+(t-100)*1.5):10,alarm:['warn',ATLAS.t("app.329")]})},

    disc:{n:ATLAS.t("app.330"),c:'devre',d:ATLAS.t("app.331"),sg:ATLAS.t("app.332"),ok:ATLAS.t("app.333"),fix:['reconnect'],opts:['reconnect','flow','vent+','sensor'],eff:{vent:0,disc:true,wave:'none',ppeak:2,pplat:1,peep:0,alarm:['crit',ATLAS.t("app.334")]}},
    leak:{n:ATLAS.t("app.335"),c:'devre',d:ATLAS.t("app.336"),sg:ATLAS.t("app.337"),ok:ATLAS.t("app.338"),fix:['leakFix'],temp:['flow'],opts:['leakFix','flow','vent+','suction'],eff:(t,c)=>({vent:.45+.4*clamp((c.tot-3)/5,0,1),circLeak:2.5,ppeak:11,pplat:9,alarm:['warn',ATLAS.t("app.339")]})},
    expValve:{n:ATLAS.t("app.340"),c:'devre',d:ATLAS.t("app.341"),sg:ATLAS.t("app.342"),ok:ATLAS.t("app.343"),hint:ATLAS.t("app.344"),fix:['valve'],temp:['flow'],opts:['valve','absorber','flow','vent+'],eff:t=>({fico2:Math.min(12,t*.1)})},
    inspValve:{n:ATLAS.t("app.345"),c:'devre',d:ATLAS.t("app.346"),sg:ATLAS.t("app.347"),ok:ATLAS.t("app.348"),hint:ATLAS.t("app.349"),fix:['valve'],temp:['flow'],opts:['valve','absorber','flow','vent+'],eff:t=>({fico2:Math.min(7,t*.06),tauR:.1})},
    absorban:{n:ATLAS.t("app.350"),c:'devre',d:ATLAS.t("app.351"),sg:ATLAS.t("app.352"),ok:ATLAS.t("app.353"),fix:['absorber'],temp:['flow'],opts:['absorber','valve','flow','vent+'],eff:t=>({fico2:Math.min(11,1+t*.05)})},
    coAbs:{n:ATLAS.t("app.354"),c:'devre',d:ATLAS.t("app.355"),sg:ATLAS.t("app.356"),ok:ATLAS.t("app.357"),hint:ATLAS.t("app.358"),fix:['absorber'],opts:['absorber','sensor','flow','support'],eff:{coRise:true}},
    aplClosed:{n:ATLAS.t("app.359"),c:'devre',d:ATLAS.t("app.360"),sg:ATLAS.t("app.361"),ok:ATLAS.t("app.362"),fix:['apl'],opts:['apl','vent+','suction','scav'],start(){setMode('bag');},eff:t=>{const pe=Math.min(42,5+t*.22);return{peep:pe,ppeak:pe+12,pplat:pe+8,vent:pe>28?.35:pe>18?.7:1,alarm:['warn',ATLAS.t("app.363")]};}},
    scavOcc:{n:ATLAS.t("app.364"),c:'devre',d:ATLAS.t("app.365"),sg:ATLAS.t("app.366"),ok:ATLAS.t("app.367"),fix:['scav'],opts:['scav','apl','suction','vent+'],start(){setMode('vent');},eff:t=>{const pe=Math.min(30,5+t*.15);return{peep:pe,ppeak:pe+14,pplat:pe+10,vent:pe>22?.6:1,alarm:['warn',ATLAS.t("app.368")]};}},
    obstruction:{n:ATLAS.t("app.369"),c:'devre',d:ATLAS.t("app.370"),sg:ATLAS.t("app.371"),ok:ATLAS.t("app.372"),hint:ATLAS.t("app.373"),fix:['suction'],opts:['suction','bronchodil','vent+','apl'],eff:{vent:.25,ppeak:55,pplat:16,wave:'shark',tauR:.6,slope:8,alarm:['warn',ATLAS.t("app.374")]}},

    switchWrong:{n:ATLAS.t("app.375"),c:'vent',d:ATLAS.t("app.376"),sg:ATLAS.t("app.377"),ok:ATLAS.t("app.378"),fix:['vent'],temp:['bag','ambuO2'],opts:['vent','bag','flow','reconnect'],eff:{ventStop:true},start(){setMode('vent');}},
    power:{n:ATLAS.t("app.379"),c:'vent',d:ATLAS.t("app.380"),sg:ATLAS.t("app.381"),ok:ATLAS.t("app.382"),fix:['bag','ambuO2'],opts:['bag','ambuO2','flow','vent'],eff:{ventStop:true,alarm:['crit',ATLAS.t("app.383")]},start(){setMode('vent');},
      onAct(id){if(id==='vent')return{lv:'bad',msg:ATLAS.t("app.384")};}},
    bellowsLeak:{n:ATLAS.t("app.385"),c:'vent',d:ATLAS.t("app.386"),sg:ATLAS.t("app.387"),ok:ATLAS.t("app.388"),fix:['bag','machine'],opts:['machine','bag','flow','vapFill'],eff:{o2Add:3,sevoMult:.45,ppeak:30,pplat:24},start(){setMode('vent');}},

    sampling:{n:ATLAS.t("app.389"),c:'sensor',d:ATLAS.t("app.390"),sg:ATLAS.t("app.391"),ok:ATLAS.t("app.392"),fix:['sensor'],opts:['sensor','verify','reintubate','reconnect'],eff:{sampling:true},
      onAct(id){if(id==='verify')return{lv:'warn',msg:ATLAS.t("app.393")};if(id==='reintubate')return{lv:'bad',msg:ATLAS.t("app.394")};}},
    probe:{n:ATLAS.t("app.395"),c:'sensor',d:ATLAS.t("app.396"),sg:ATLAS.t("app.397"),ok:ATLAS.t("app.398"),fix:['sensor'],opts:['sensor','flow','ambuO2','vent+'],eff:{probeOff:true}},
    sensorFault:{n:ATLAS.t("app.399"),c:'sensor',d:ATLAS.t("app.400"),sg:ATLAS.t("app.401"),ok:ATLAS.t("app.402"),fix:['flow'],opts:['sensor','flow','vent+','absorber'],eff:(t,c,ss)=>({fiDisplay:ss.reveal?null:.5}),start(){setGasUI(.4,0,1.2);},auto:c=>c.fi>=.3,
      onAct(id,ss){if(id==='sensor'&&!ss.reveal){ss.reveal=true;return{lv:'warn',msg:ATLAS.t("app.403")};}}}
  };
  const CATS=[['hasta',ATLAS.t("app.404")],['gaz',ATLAS.t("app.405")],['vap',ATLAS.t("app.406")],['devre',ATLAS.t("app.407")],['vent',ATLAS.t("app.408")],['sensor',ATLAS.t("app.409")]];
  let key='normal',scT=0,simT=0,mit={},hid=false,ss={},arrest=null,brRR=12,beat='n';
  const P={A:330,PaCO2:40,PaO2:320,coHb:1,circ:1,etSev:1.76,temp:36.4,dec:1,fiC:.58,fiInsp:.58,fiM:.58,vEff:1,totEff:4,sa:99,Hx:0,sys:118,dia:72,hr:72};
  const S={hr:72,spo2:99,et:36,fi:0,rr:12,perf:1,ppeak:18,pplat:15,peep:5,tauR:.07,slope:2,pvar:0,cleft:false,wave:'normal',breathing:true,mech:true,co2On:true,probeOff:false,fio2:.58,fin2o:0,mac:.88,etSev:1.76,tot:4,temp:36.4,eflows:{o2:2,air:2,n2o:0},alarms:[],amb:false,pvc:0};
  const NIBP={sys:118,dia:72,ok:true,t:0,measuring:false,el:0,cycle:300,next:300,cuff:0};
  let artOn=false;
  let E=Object.assign({},EFF0);
  const sev=p=>100/(23400/(p*p*p+150*p)+1);
  const listeners=[];
  function effects(ctx){const sc=SCN[key];const e=Object.assign({},EFF0,typeof sc.eff==='function'?sc.eff(scT,ctx,ss):(sc.eff||{}));
    if(mit['vent+']){e.vent=Math.min(2,e.vent*1.8);e.rr=Math.max(e.rr,20);}
    if(GAS.mode==='bag')e.ventStop=false;
    return e;}
  function nibpStart(){if(!NIBP.measuring){NIBP.measuring=true;NIBP.el=0;}}
  function phys(dt){
    const d=dt*K;scT+=d;simT+=d;
    E=effects({tot:GAS.o2+GAS.air+GAS.n2o});
    const amb=!!(mit.ambuAir||mit.ambuO2);S.amb=amb;
    let o2=GAS.o2,air=GAS.air,n2o=GAS.n2o;
    if(E.crossover){n2o+=o2;o2=0;}
    if(E.o2Cut){o2=0;if(!E.crossover)n2o=0;}
    S.eflows={o2:E.o2Cut?0:GAS.o2,air:GAS.air,n2o:E.o2Cut?0:GAS.n2o};
    const fm=E.fgfMult,tot=(o2+air+n2o)*fm+E.o2Add,o2e=(o2+.21*air)*fm+E.o2Add;P.totEff=tot;
    const fiM=tot>.26?clamp((o2e-.25)/(tot-.25),0,1):0;P.fiM=fiM;
    // halka devre + FRC ≈ 6 L: inspire edilen O₂, zaman sabiti V/TGA ile değişir
    P.fiC+=(fiM-P.fiC)*Math.min(1,Math.max(tot,.05)/6/60*d);
    const need=.35+E.circLeak;
    if(E.disc)P.circ=Math.max(0,P.circ-d*.02);else P.circ=clamp(P.circ+(tot-need)/1.5*d/60*(tot<need?1:3),0,1);
    const ventRun=!E.ventStop;let vEff,fi;
    if(amb){vEff=1;fi=mit.ambuO2?.9:.21;}else{vEff=ventRun&&!E.disc?E.vent*clamp(P.circ/.4,0,1):0;fi=P.fiC;}
    P.vEff=vEff;P.fiInsp=fi;
    // CO₂: apnede ≈ 4 mmHg/dk; vücut depoları büyük olduğu için dengelenme dakikalar sürer
    const fico2=amb?0:E.fico2*(tot>=6?.4:1);
    if(vEff<.03)P.PaCO2+=d*(4/60)*E.vco2;else{const tg=Math.min(140,40*E.vco2/vEff+fico2*.9);P.PaCO2+=(tg-P.PaCO2)*Math.min(1,d/(tg>P.PaCO2?180:120));}
    P.PaCO2=Math.min(P.PaCO2,160);
    // O₂: alveoler gaz denklemi; apnede FRC deposu ≈ 60 mmHg/dk tükenir
    const PB=PBof(ALT.h),PAi=Math.max(0,fi*(PB-47)-P.PaCO2/.8),ve=Math.min(vEff,1.5);
    P.A+=(ve*(PAi-P.A)/pt.tauA-(1-Math.min(ve,1))*pt.drop)*d;P.A=clamp(P.A,12,700);
    P.PaO2=Math.max(12,P.A-E.aa*Math.min(1,P.A/120));
    if(E.coRise)P.coHb=Math.min(35,P.coHb+d*.03);else P.coHb+=(1-P.coHb)*Math.min(1,d/(fi>.6?80:300));
    const satO2=sev(P.PaO2),saTrue=satO2*(1-P.coHb/100);P.sa=saTrue;
    // ajan ve derinlik
    const agent=amb?0:GAS.sevo*E.sevoMult*(tot>.3?1:0);
    P.etSev+=(agent*.88-P.etSev)*Math.min(1,d*(tot>3?.012:.006));
    const fin2o=amb||tot<=0?0:n2o*fm/tot,mac=Math.max(0,P.etSev*E.potency/2+fin2o*100/104),depth=mit.tiva?Math.max(mac,1):mac;
    if(E.tempRate>0)P.temp=Math.min(41,P.temp+E.tempRate*d);else P.temp+=(36.4-P.temp)*Math.min(1,d/900);
    // hemodinami hedefleri: önce sempatik yanıt
    let hr=pt.hr*E.hr/72,sys=pt.sys*E.sys/118,dia=pt.dia*E.dia/72;
    if(saTrue<92){const x=Math.min(92-saTrue,25);if(pt.brady&&saTrue<85){hr-=(85-saTrue)*2.2;}else hr+=x*1.3;sys+=x*.9;dia+=x*.4;}
    if(P.PaCO2>50){const x=Math.min(P.PaCO2,100)-50;hr+=x*.5;sys+=x*.6;dia+=x*.3;if(P.PaCO2>100)sys-=(P.PaCO2-100)*1.2;}
    if(depth<.6){const x=(.6-depth)/.6;hr+=x*32;sys+=x*42;dia+=x*20;}
    if(depth>1.4){const x=depth-1.4;sys-=x*30;dia-=x*17;hr-=x*9;}
    if(E.peep>12){const x=E.peep-12;sys-=x*2.4;dia-=x*1.3;hr+=x*.8;}
    if(P.temp>37.5)hr+=(P.temp-37.5)*10;
    // miyokard hipoksi yükü: uzamış ağır hipoksemi ya da hipotansiyon birikir
    const hxIn=Math.max(0,(78-saTrue)/78)/220+Math.max(0,(55-P.sys)/55)/240;
    if(hxIn>0)P.Hx+=hxIn*d;else if(saTrue>88&&P.sys>70)P.Hx=Math.max(0,P.Hx-d/400);
    if(P.Hx>.3){const x=Math.min(1,(P.Hx-.3)/.5);hr=hr*(1-x)+30*x;sys*=1-.55*x;dia*=1-.5*x;}
    S.pvc=P.Hx>.2?Math.min(.35,(P.Hx-.2)*.6):0;
    hr=clamp(hr,25,220);sys=clamp(sys,30,230);dia=clamp(dia,15,sys-12);
    if(!arrest&&P.Hx>=1)arrest={type:key==='mh'?'vf':'pea',t:0};
    if(arrest){arrest.t+=d;if(arrest.type==='pea'&&arrest.t>120)arrest.type='asys';}
    const kh=Math.min(1,d/25);
    if(arrest){const th=arrest.type==='pea'?22:0;P.hr+=(th-P.hr)*Math.min(1,d/5);P.sys+=(12-P.sys)*Math.min(1,d/6);P.dia+=(8-P.dia)*Math.min(1,d/6);}
    else{P.hr+=(hr-P.hr)*kh;P.sys+=(sys-P.sys)*kh;P.dia+=(dia-P.dia)*kh;}
    // ekrandaki değerler
    S.hr=P.hr;
    S.spo2+=(satO2-S.spo2)*Math.min(1,d/15);
    S.probeOff=E.probeOff||!!arrest||P.sys<45;S.perf+=((arrest?0:E.perf*Math.min(1,P.sys/80))-S.perf)*Math.min(1,dt);S.pvar=E.pvar;
    S.mech=!amb&&ventRun;S.breathing=amb||(ventRun&&!E.disc);S.co2On=S.breathing&&!E.sampling&&E.wave!=='none';
    S.wave=E.wave;S.cleft=E.cleft;S.tauR+=(E.tauR-S.tauR)*Math.min(1,dt*2);S.slope+=(E.slope-S.slope)*Math.min(1,dt*2);
    const etT=S.co2On?(arrest?4:Math.max(0,P.PaCO2-E.gap)*(E.wave==='decay'?P.dec:1)):0;
    S.et+=(etT-S.et)*Math.min(1,dt*.8);S.fi+=((S.co2On?fico2:0)-S.fi)*Math.min(1,dt*.8);
    const rrP=E.rr*pt.rr/12;S.rr+=((S.co2On?rrP:0)-S.rr)*Math.min(1,dt*2);brRR=rrP;
    const pk=S.mech?E.ppeak:E.peep,pl=S.mech?E.pplat:E.peep;
    S.ppeak+=(pk-S.ppeak)*Math.min(1,dt*2);S.pplat+=(pl-S.pplat)*Math.min(1,dt*2);S.peep+=((amb?0:E.peep)-S.peep)*Math.min(1,dt*2);
    S.fio2+=((E.fiDisplay!=null?E.fiDisplay:fi)-S.fio2)*Math.min(1,dt*.7);
    S.fin2o=fin2o;S.mac+=(mac-S.mac)*Math.min(1,dt);S.depth=depth;S.etSev=P.etSev;S.tot=tot;S.temp=P.temp;
    // NIBP: yalnızca ölçüldüğü anı gösterir (osilometrik ölçüm ≈ 30 s)
    if(NIBP.measuring){NIBP.el+=d;NIBP.cuff=Math.max(0,Math.max(160,P.sys+30)-NIBP.el*5);
      if(NIBP.el>=30){NIBP.measuring=false;const ok=!arrest&&P.sys>=45;NIBP.ok=ok;if(ok){NIBP.sys=P.sys+(Math.random()-.5)*4;NIBP.dia=P.dia+(Math.random()-.5)*3;}NIBP.t=simT;NIBP.next=simT+(ok?(NIBP.cycle||1e9):60);}}
    else if(NIBP.cycle>0&&simT>=NIBP.next)nibpStart();
    S.alarms=alarms();
    const sc=SCN[key];if(sc.auto&&sc.auto({fi:fiM}))resolve({lv:'ok',msg:ATLAS.t("app.410")+sc.n+': '+sc.ok});
  }
  // dalga üreteçleri
  let bp=0,rp=0,drawAcc=1,clock=0;
  const rows={ecg:{y:66,h:150,sp:200,c:C.ecg,lab:'II',min:-.55,max:1.2},art:{y:0,h:0,sp:200,c:C.art,lab:'ART',min:0,max:160,u:'mmHg'},pl:{y:228,h:128,sp:200,c:C.spo2,lab:'Pleth',min:-.08,max:1.15},co2:{y:368,h:186,sp:85,c:C.co2,lab:'CO₂',min:0,max:60,u:'mmHg'},paw:{y:566,h:150,sp:85,c:C.paw,lab:'Paw',min:0,max:45,u:'cmH₂O'}};
  const LAY={off:{ecg:[66,150],pl:[228,128],co2:[368,186],paw:[566,150]},on:{ecg:[62,118],art:[192,118],pl:[322,90],co2:[424,160],paw:[596,120]}};
  const WX=22,WW=870;Object.entries(rows).forEach(([k,r])=>{r.k=k;r.buf=new Float32Array(WW).fill(NaN);r.x=0;});
  function layout(){const L=LAY[artOn?'on':'off'];Object.entries(rows).forEach(([k,r])=>{const v=L[k];r.on=!!v;if(v){r.y=v[0];r.h=v[1];}});}
  layout();
  const gs=(x,m,s)=>Math.exp(-((x-m)*(x-m))/(2*s*s));
  const nz=a=>(Math.random()-.5)*a;
  const ecgN=p=>.12*gs(p,.12,.022)-.1*gs(p,.225,.008)+1*gs(p,.245,.009)-.24*gs(p,.266,.009)+.26*gs(p,.5,.045)+nz(.012);
  const ecgV=p=>1.05*gs(p,.27,.03)-.5*gs(p,.36,.045)-.22*gs(p,.56,.07)+nz(.012);
  const vf=t=>.3*Math.sin(2*Math.PI*4.7*t)+.2*Math.sin(2*Math.PI*6.3*t+1.3)+.12*Math.sin(2*Math.PI*2.1*t+.4)+nz(.06);
  function ecg(p,t){if(arrest){if(arrest.type==='vf')return vf(t);if(arrest.type==='asys')return .015*Math.sin(t*.8)+nz(.02);return .55*gs(p,.2,.035)-.25*gs(p,.33,.05)+nz(.015);}return beat==='v'?ecgV(p):ecgN(p);}
  function pleth(p){const q=(p-.28+1)%1;return q<.14?Math.pow(Math.sin(q/.14*Math.PI/2),2)*.95:.95*Math.exp(-(q-.14)*3.4)-.07*gs(q,.31,.018)+.1*gs(q,.37,.035);}
  function artW(p){if(arrest)return 10+(arrest.type==='pea'?2*gs(p,.3,.05):0)+nz(.6);const q=(p-.22+1)%1;
    const v=q<.09?Math.pow(Math.sin(q/.09*Math.PI/2),2):Math.exp(-(q-.09)*2.3)-.08*gs(q,.3,.02)+.07*gs(q,.35,.03);
    const amp=(P.sys-P.dia)*(beat==='v'?.55:1);return P.dia+amp*clamp((v-.12)/.88,-.1,1);}
  function co2(ph){if(!S.co2On)return 0;const Tb=60/brRR,ti=Tb/3,s=ph*Tb,fi=S.fi,et=S.et;
    if(s<ti)return fi+(et-fi)*Math.exp(-s/(.05+S.tauR*.3));
    const e=s-ti,Te=Tb-ti,d0=.12;if(e<d0)return fi;
    const r=1-Math.exp(-(e-d0)/S.tauR);let v=fi+(et-S.slope-fi)*r+S.slope*r*(e-d0)/(Te-d0);
    if(S.cleft){const u=(e-d0)/(Te-d0);if(u>.5&&u<.68)v-=10*Math.sin(Math.PI*(u-.5)/.18);}
    return Math.max(0,v);}
  function paw(ph){if(!S.mech)return S.peep;const Tb=60/brRR,ti=Tb/3,s=ph*Tb;
    if(s<ti){const u=s/ti;if(u<.8)return S.peep+(S.ppeak-S.pplat)*(1-Math.exp(-u/.03))+(S.pplat-S.peep)*u/.8;return S.pplat;}
    return S.peep+(S.pplat-S.peep)*Math.exp(-(s-ti)/.08);}
  function sample(k,b,r,t){
    if(k==='ecg')return ecg(b,t);
    if(k==='art')return artW(b);
    if(k==='pl')return S.probeOff?.05+nz(.02):.08+pleth(b)*S.perf*(beat==='v'?.4:1)*(1-S.pvar*.5*(1+Math.sin(2*Math.PI*r)));
    if(k==='co2')return co2(r);return paw(r);}
  function onBreath(){if(E.wave==='decay')P.dec*=.45;else P.dec=Math.min(1,P.dec+.5);}
  function bpShown(){if(artOn)return arrest?{s:12,d:8}:{s:P.sys,d:P.dia};return NIBP.ok?{s:NIBP.sys,d:NIBP.dia}:null;}
  function alarms(){const a=[];
    if(arrest&&arrest.type==='vf')a.push(['crit','VF / VT']);
    if(arrest&&arrest.type==='asys')a.push(['crit',ATLAS.t("app.411")]);
    if(E.alarm)a.push(E.alarm);
    if(!S.amb&&S.tot<.05)a.push(['crit',ATLAS.t("app.412")]);
    if(S.fio2<.21)a.push(['crit',ATLAS.t("app.413")]);
    if(!S.probeOff&&S.spo2<90)a.push(['crit',ATLAS.t("app.414")]);
    const b=bpShown();if(b&&b.s<pt.al.sysLo)a.push(['crit',artOn?ATLAS.t("app.415"):ATLAS.t("app.416")]);if(b&&b.s>pt.al.sysHi)a.push(['warn',ATLAS.t("app.417")]);
    if(!NIBP.ok&&!artOn)a.push(['warn',ATLAS.t("app.418")]);
    if((!arrest||arrest.type==='pea')&&S.hr<pt.al.hrLo)a.push(['crit',ATLAS.t("app.419")]);
    if(S.pvc>.08&&!arrest)a.push(['warn',ATLAS.t("app.420")]);
    if(S.et<5)a.push(['crit',ATLAS.t("app.421")]);else if(S.et<25)a.push(['warn',ATLAS.t("app.422")]);
    if(S.et>50)a.push(['warn',ATLAS.t("app.423")]);
    if(S.fi>3)a.push(['warn',ATLAS.t("app.424")]);
    if(S.mech&&S.ppeak>35)a.push(['warn',ATLAS.t("app.425")]);
    if(S.mech&&S.ppeak<8)a.push(['crit',ATLAS.t("app.426")]);
    if(S.peep>14)a.push(['warn',ATLAS.t("app.427")]);
    if(!arrest&&S.hr>pt.al.hrHi)a.push(['warn',ATLAS.t("app.428")]);
    if(S.temp>38.3)a.push(['warn',ATLAS.t("app.429")]);
    if(!mit.tiva&&!arrest&&S.mac<.5)a.push(['warn',ATLAS.t("app.430")]);
    if(S.mac>2)a.push(['warn',ATLAS.t("app.431")]);
    if(S.probeOff)a.push([arrest||P.sys<45?'crit':'warn',E.probeOff?ATLAS.t("app.432"):ATLAS.t("app.433")]);
    const seen=new Set();return a.filter(x=>!seen.has(x[1])&&seen.add(x[1]));}
  function txt(s,x,y,font,col,al){g.font=font;g.fillStyle=col;g.textAlign=al||'left';g.fillText(s,x,y);}
  function ago(){if(NIBP.measuring)return ATLAS.t("app.434")+Math.round(NIBP.cuff);const m=Math.floor((simT-NIBP.t)/60);return m<1?ATLAS.t("app.435"):m+ATLAS.t("app.436");}
  function draw(){
    g.fillStyle=C.bg;g.fillRect(0,0,W,H);g.fillStyle=C.hdr;g.fillRect(0,0,W,50);g.textBaseline='middle';
    txt(ATLAS.t("app.437")+pt.lab+ATLAS.t("app.438"),22,26,'600 19px '+MONO,C.dim);
    txt(new Date().toLocaleTimeString(ATLAS.t("app.439")),W-22,26,'600 20px '+MONO,C.ink,'right');
    const al=S.alarms;
    if(al.length){const crit=al.filter(a=>a[0]==='crit'),list=crit.length?crit:al,[lv,msg]=list[Math.floor(clock/2)%list.length],on=lv!=='crit'||Math.floor(clock*2.5)%2===0;
      g.fillStyle=on?(lv==='crit'?C.crit:C.warn):'#3A1218';g.fillRect(330,8,560,34);
      txt(msg+(al.length>1?'   +'+(al.length-1):''),610,26,'700 21px '+MONO,on?'#160406':C.crit,'center');}
    g.textBaseline='alphabetic';
    rows.co2.max=S.et>55?100:60;rows.paw.max=S.ppeak>42?70:45;rows.art.max=P.sys>150?220:160;
    for(const r of Object.values(rows)){if(!r.on)continue;
      g.strokeStyle=C.grid;g.lineWidth=1;g.setLineDash([3,6]);
      if(r.u){for(const f of [0,.5,1]){const y=r.y+r.h-f*r.h;g.beginPath();g.moveTo(WX,y);g.lineTo(WX+WW,y);g.stroke();txt(String(Math.round(r.min+f*(r.max-r.min))),WX+WW-4,y-5,'500 15px '+MONO,C.dim,'right');}}
      g.setLineDash([]);txt(r.lab+(r.u?'  '+r.u:''),WX,r.y+18,'600 18px '+MONO,r.c);
      const cur=Math.floor(r.x)%WW;g.strokeStyle=r.c;g.lineWidth=2.6;g.lineJoin='round';g.beginPath();let pen=false;
      for(let i=0;i<WW;i++){const gap=((i-cur+WW)%WW)<14,v=r.buf[i];if(gap||isNaN(v)){pen=false;continue;}const y=r.y+r.h-((clamp(v,r.min,r.max)-r.min)/(r.max-r.min))*r.h;if(!pen){g.moveTo(WX+i,y);pen=true;}else g.lineTo(WX+i,y);}
      g.stroke();}
    g.fillStyle=C.sep;g.fillRect(906,58,2,668);
    const X=926,R=W-24,red=(c,b)=>b?C.crit:c,hrTxt=arrest&&arrest.type!=='pea'?'---':String(Math.round(S.hr)),hrBad=!!arrest||S.hr<pt.al.hrLo||S.hr>pt.al.hrHi+10;
    const nb=NIBP.ok?Math.round(NIBP.sys)+'/'+Math.round(NIBP.dia):'---/---',nbm=NIBP.ok?'('+Math.round((NIBP.sys+2*NIBP.dia)/3)+')':'',nbBad=NIBP.ok&&NIBP.sys<pt.al.sysLo;
    const cyc=NIBP.cycle?'↻'+nf(NIBP.cycle/60,1)+ATLAS.t("app.440"):ATLAS.t("app.441");
    if(!artOn){
      txt(ATLAS.t("app.442"),X,92,'600 20px '+MONO,C.ecg);txt(ATLAS.t("app.443"),R,92,'500 16px '+MONO,C.dim,'right');
      txt(hrTxt,R,196,'700 104px '+MONO,red(C.ecg,hrBad),'right');
      txt('SpO₂',X,252,'600 20px '+MONO,C.spo2);txt('%',R,252,'500 16px '+MONO,C.dim,'right');
      txt(S.probeOff?'--':String(Math.round(S.spo2)),R,342,'700 88px '+MONO,red(C.spo2,!S.probeOff&&S.spo2<90),'right');
      txt(ATLAS.t("app.444")+(S.probeOff?'--':Math.round(S.hr)),X,342,'500 18px '+MONO,C.spo2);
      txt('EtCO₂',X,394,'600 20px '+MONO,C.co2);txt('mmHg',R,394,'500 16px '+MONO,C.dim,'right');
      txt(String(Math.round(S.et)),R,486,'700 88px '+MONO,C.co2,'right');
      txt('FiCO₂ '+Math.round(S.fi),X,526,'500 19px '+MONO,S.fi>3?C.warn:C.co2);txt(ATLAS.t("app.445")+Math.round(S.rr),R,526,'500 19px '+MONO,C.co2,'right');
      txt(ATLAS.t("app.446"),X,584,'600 20px '+MONO,C.ink);txt(cyc,R,584,'500 16px '+MONO,C.dim,'right');
      txt(nb,R,642,'700 54px '+MONO,red(C.ink,nbBad),'right');
      txt(nbm,R,676,'500 22px '+MONO,C.dim,'right');txt(ago(),X,676,'500 17px '+MONO,NIBP.measuring?C.warn:C.dim);
      txt('T '+nf(S.temp,1)+' °C',X,712,'600 22px '+MONO,S.temp>38.3?C.warn:C.ink);
    }else{
      const ab=bpShown();
      txt(ATLAS.t("app.447"),X,86,'600 20px '+MONO,C.ecg);txt(ATLAS.t("app.448"),R,86,'500 16px '+MONO,C.dim,'right');
      txt(hrTxt,R,170,'700 88px '+MONO,red(C.ecg,hrBad),'right');
      txt('ART',X,214,'600 20px '+MONO,C.art);txt('mmHg',R,214,'500 16px '+MONO,C.dim,'right');
      txt(Math.round(ab.s)+'/'+Math.round(ab.d),R,272,'700 56px '+MONO,ab.s<pt.al.sysLo?C.crit:C.art,'right');
      txt('('+Math.round((ab.s+2*ab.d)/3)+')',R,306,'500 22px '+MONO,C.art,'right');
      txt('SpO₂',X,346,'600 20px '+MONO,C.spo2);
      txt(S.probeOff?'--':String(Math.round(S.spo2)),R,414,'700 66px '+MONO,red(C.spo2,!S.probeOff&&S.spo2<90),'right');
      txt('EtCO₂',X,456,'600 20px '+MONO,C.co2);
      txt(String(Math.round(S.et)),R,526,'700 66px '+MONO,C.co2,'right');
      txt('FiCO₂ '+Math.round(S.fi),X,560,'500 18px '+MONO,S.fi>3?C.warn:C.co2);txt(ATLAS.t("app.449")+Math.round(S.rr),R,560,'500 18px '+MONO,C.co2,'right');
      txt(ATLAS.t("app.450")+ago(),X,604,'600 17px '+MONO,NIBP.measuring?C.warn:C.dim);txt(cyc,R,604,'500 15px '+MONO,C.dim,'right');
      txt(nb+' '+nbm,R,650,'700 34px '+MONO,red(C.ink,nbBad),'right');
      txt('T '+nf(S.temp,1)+' °C',X,708,'600 22px '+MONO,S.temp>38.3?C.warn:C.ink);
    }
    g.fillStyle=C.hdr;g.fillRect(0,730,W,70);
    const items=[['FiO₂',Math.round(S.fio2*100)+' %',S.fio2<.21?C.crit:'#9FE3FF'],[ATLAS.t("app.451"),nf(S.etSev,1)+' %','#FFE07A'],['FiN₂O',Math.round(S.fin2o*100)+' %','#9DB6FF'],[ATLAS.t("app.452"),nf(S.mac,2),S.mac<.5||S.mac>2?C.warn:'#FFFFFF'],[ATLAS.t("app.453"),Math.round(S.ppeak)+'/'+Math.round(S.peep),C.paw]];
    items.forEach((it,i)=>{const x=24+i*252;txt(it[0],x,758,'500 16px '+MONO,C.dim);txt(it[1],x,788,'700 26px '+MONO,it[2]);});
  }
  function step(dt,doDraw){
    dt=Math.min(dt,.1);const t0=clock;clock+=dt;phys(dt);
    const hr=Math.max(S.hr,1);
    for(const r of Object.values(rows)){const n0=r.x,n1=r.x+r.sp*dt,span=n1-n0;
      for(let px=Math.floor(n0)+1;px<=Math.floor(n1);px++){const f=(px-n0)/span*dt;r.buf[px%WW]=sample(r.k,(bp+f*hr/60)%1,(rp+f*brRR/60)%1,t0+f);}
      r.x=n1%(WW*1000);}
    bp+=dt*hr/60;if(bp>=1){bp-=1;beat=Math.random()<S.pvc?'v':'n';}
    rp+=dt*brRR/60;if(rp>=1){rp-=1;onBreath();}
    if(!doDraw)return false;drawAcc+=dt;if(drawAcc>=1/30){drawAcc=0;draw();return true;}return false;}
  function breath(){const Tb=60/brRR,ti=1/3;let raw,insp;if(rp<ti){const u=rp/ti;raw=u*u*(3-2*u);insp=true;}else{raw=Math.exp(-(rp-ti)*Tb/.55);insp=false;}
    return{ph:rp,insp,raw,v:raw,mech:S.mech,lung:raw*clamp(P.vEff,0,1.3),circ:P.circ,disc:E.disc,tot:P.totEff,eflows:S.eflows,amb:S.amb};}
  function emit(fb){listeners.forEach(f=>f(key,fb));}
  function resolve(fb){const pk=key;try{document.dispatchEvent(new CustomEvent('anm-progress',{detail:{kind:'scenario',id:pk,score:null,ok:true}}));}catch(e){}key='normal';scT=0;const keepTiva=mit.tiva;mit={};if(keepTiva)mit.tiva=true;ss={};hid=false;emit(fb);}
  function applySide(id){if(id==='flow')setGasUI(8,0,0);if(id==='vent+')mit['vent+']=true;if(id==='bag')setMode('bag');if(id==='vent')setMode('vent');if(id==='tiva')mit.tiva=true;}
  function act(id){const sc=SCN[key],name=sc.n;let r=sc.onAct?sc.onAct(id,ss):null;
    const tail=arrest?ATLAS.t("app.454"):'';
    if(r){r.msg+=tail;emit(r);return;}
    if((sc.fix||[]).includes(id)){applySide(id);resolve({lv:'ok',msg:ATLAS.t("app.455")+(hid?ATLAS.t("app.456")+name+'. ':'')+sc.ok+tail});return;}
    if((sc.temp||[]).includes(id)){applySide(id);mit[id]=true;emit({lv:'warn',msg:ATLAS.t("app.457")+TEMPMSG[id]+tail});return;}
    if(['flow','vent+','bag','vent','tiva'].includes(id))applySide(id);
    emit({lv:'bad',msg:ATLAS.t("app.458")+(sc.hint?ATLAS.t("app.459")+sc.hint:'')+tail});}
  function set(k,hidden){key=k;scT=0;mit={};ss={};hid=!!hidden;P.dec=1;const sc=SCN[k];if(sc.start)sc.start();emit(null);}
  function reset(){arrest=null;Object.assign(P,{A:330,PaCO2:40,coHb:1,circ:1,temp:36.4,dec:1,Hx:0,sys:pt.sys,dia:pt.dia,hr:pt.hr,fiC:P.fiM});Object.assign(S,{hr:pt.hr,spo2:99,et:36,fi:0,perf:1,pvc:0,rr:pt.rr});brRR=pt.rr;
    Object.assign(NIBP,{sys:pt.sys,dia:pt.dia,ok:true,t:simT,measuring:false,next:simT+(NIBP.cycle||1e9)});set('normal');}
  draw();
  return{canvas:cv,step,breath,set,act,reset,reveal(){hid=false;emit(null);},SCN,ACT,CATS,onSet:f=>listeners.push(f),
    beat:()=>bp,getK:()=>K,setK:k=>{K=k;},nibpNow:nibpStart,setCycle:m=>{NIBP.cycle=m*60;NIBP.next=m>0?simT+NIBP.cycle:1e9;},setArt:on=>{artOn=on;layout();},
    PT,patient:()=>pt,setPatient(k){if(PT[k]){pt=PT[k];reset();}},
    simNow:()=>simT,nibp:NIBP,state:()=>({P,S,E,key,scT,hid,mit,arrest,sc:SCN[key],artOn,nibp:NIBP})};
})();

/* ───────────── VENTİLATÖR MODELİ ───────────── */
const IE=['1:1','1:1.5','1:2','1:3','1:4'];
const MODES={
  VCV:{n:ATLAS.t("app.460"),rows:['vt','rr','ie','peep'],set:ATLAS.t("app.461"),out:ATLAS.t("app.462"),
    d:ATLAS.t("app.463")},
  PCV:{n:ATLAS.t("app.464"),rows:['pi','rr','ie','peep'],set:ATLAS.t("app.465"),out:ATLAS.t("app.466"),
    d:ATLAS.t("app.467")},
  PRVC:{n:ATLAS.t("app.468"),rows:['vt','rr','ie','peep'],set:ATLAS.t("app.469"),out:ATLAS.t("app.470"),
    d:ATLAS.t("app.471")},
  SIMV:{n:ATLAS.t("app.472"),rows:['vt','rr','ie','ps','peep'],set:ATLAS.t("app.473"),out:ATLAS.t("app.474"),
    d:ATLAS.t("app.475")},
  PSV:{n:ATLAS.t("app.476"),rows:['ps','peep'],set:ATLAS.t("app.477"),out:ATLAS.t("app.478"),
    d:ATLAS.t("app.479")},
  CPAP:{n:'CPAP',rows:['peep'],set:ATLAS.t("app.480"),out:ATLAS.t("app.481"),
    d:ATLAS.t("app.482")}
};
const VENT=(()=>{
  const cv=$('#ventCanvas');if(matchMedia('(max-width:700px)').matches)cv.width=660; // fewer pixels across a phone = legible labels
  const g=cv.getContext('2d'),W=cv.width,H=cv.height;
  const P={mode:'VCV',vt:450,pinsp:10,ps:10,rr:12,ie:'1:2',peep:5,C:50,R:10,h:170,sex:'m',eff:0,srr:14,effT:.9,trig:2,cyc:25,pt:'adult',wt:20};
  const X0=78,WW=W-X0-18,sp=WW/10,DT=.0025;
  const rows=[{k:'P',y:22,h:150,min:0,max:50,c:'#FF9A4A',lab:'Paw',u:'cmH₂O'},{k:'F',y:204,h:160,min:-90,max:90,c:'#7FB2FF',lab:ATLAS.t("app.483"),u:ATLAS.t("app.484")},{k:'V',y:396,h:140,min:0,max:1000,c:'#EDEFF0',lab:ATLAS.t("app.485"),u:'mL'}];
  rows.forEach(r=>r.buf=new Float32Array(WW).fill(NaN));
  const S={V:0,ph:'exp',kind:'',tIn:0,tE:1,t:0,lastMand:-99,lastAny:0,flow:0,target:0,peakF:0,Ti:1,Tf:.9,pinsp:15,apnea:false,backup:false,pm:0,pmPh:.5};
  let cur={P:5,F:0,V:0},x=0,breaths=[],cb=null,loop=[],lastSample=0,statT=1,mk=[],evts=[],starts=[];const seen=new Set();
  S.effOn=false;S.effStartPh='exp';S.effBreaths=0;S.effEndT=-9;
  const timing=()=>{const [a,b]=P.ie.split(':').map(Number),Tb=60/P.rr;return{Tb,Ti:Tb*a/(a+b)};};
  function pmus(dt){if(P.eff<=0){S.pm=0;if(S.effOn)effEnd();return 0;}const T=60/P.srr,Td=Math.min(P.effT,T*.8);S.pmPh+=dt/T;if(S.pmPh>=1)S.pmPh-=1;const u=S.pmPh*T/Td,on=u<1;
    if(on&&!S.effOn){S.effOn=true;S.effStartPh=S.ph;S.effBreaths=0;}else if(!on&&S.effOn)effEnd();
    S.pm=on?P.eff*Math.sin(Math.PI*u):0;return S.pm;}
  // asenkroni dedektörleri
  function effEnd(){S.effOn=false;S.effEndT=S.t;if(S.effStartPh==='exp'&&S.effBreaths===0)flag(ATLAS.t("app.486"));if(S.effBreaths>=2)flag(ATLAS.t("app.487"));}
  function flag(type){evts.push({t:S.t,type});if(evts.length>400)evts.splice(0,100);mk.push({x:null,async:type});
    if(!seen.has(type)){seen.add(type);try{document.dispatchEvent(new CustomEvent('anm-progress',{detail:{kind:'async',id:({IE:'ET',DT:'ÇT',FS:'AA',DC:'GD',EI:'ET',DD:'ÇT',HF:'AA',CT:'GD'}[type]||type),score:null,ok:false,stage:2}}));}catch(e){}}}
  function finish(){if(cb&&cb.done){breaths.push({t:cb.t0,vt:cb.vt,ppeak:cb.pmax,pplat:cb.pplat,vee:S.V,kind:cb.kind,backup:cb.backup});if(breaths.length>12)breaths.shift();loop=cb.samples;
      if(P.mode==='PRVC'&&cb.kind==='PC'){const err=P.vt/1000-cb.vt;S.pinsp=clamp(S.pinsp+clamp(err/(P.C/1000),-3,3),5,35);}}cb=null;}
  function start(kind,patient){if(S.ph==='exp'&&cur.F<-(P.vt/1000)*.15)flag('AP');finish();if(S.effOn)S.effBreaths++;starts.push(S.t);if(starts.length>400)starts.splice(0,100);const tm=timing();S.ph='insp';S.kind=kind;S.tIn=0;S.peakF=0;S.lastAny=S.t;
    if(patient)S.apnea=false;
    if(kind==='VC'||kind==='PC')S.lastMand=S.t;
    S.Ti=tm.Ti;S.Tf=tm.Ti*.9;if(kind==='VC')S.flow=P.vt/1000/S.Tf;
    const bk=S.backup;
    S.target=kind==='PC'?(bk?(P.pt==='adult'?Math.max(P.pinsp,15):P.pinsp):P.mode==='PRVC'?S.pinsp:P.pinsp):kind==='PS'?P.ps:0;
    if(bk&&kind==='PC'){S.Ti=1.2;}
    cb={t0:S.t,v0:S.V,pmax:P.peep,pplat:null,vt:0,kind,backup:bk,samples:[],done:false,pmVC:0};mk.push({x:null,kind,patient:!!patient,backup:bk});}
  function endInsp(){S.ph='exp';S.tE=0;if(cb){cb.vt=S.V-cb.v0;cb.pplat=(cb.kind==='VC'||cb.kind==='PC')?P.peep+S.V/(P.C/1000):null;cb.done=true;
      if(cb.kind==='VC'&&cb.pmVC>=4)flag(ATLAS.t("app.488"));if(cb.kind==='PS'&&S.effEndT>cb.t0&&S.t-S.effEndT>.3)flag(ATLAS.t("app.489"));}S.backup=false;}
  function micro(dt){
    S.t+=dt;const C=P.C/1000,R=P.R,pm=pmus(dt),tm=timing();let paw=P.peep,F;
    if(S.ph==='insp'){S.tIn+=dt;
      if(S.kind==='VC'){F=S.tIn<S.Tf?S.flow:0;paw=P.peep+S.V/C+R*F-pm;if(cb&&S.tIn<S.Tf)cb.pmVC=Math.max(cb.pmVC,pm);if(S.tIn>=S.Ti)endInsp();}
      else if(S.kind==='PC'||S.kind==='PS'){paw=P.peep+S.target*(1-Math.exp(-S.tIn/.05));F=(paw-P.peep-S.V/C+pm)/R;S.peakF=Math.max(S.peakF,F);
        if(S.kind==='PC'&&S.tIn>=S.Ti)endInsp();
        if(S.kind==='PS'&&S.tIn>.15&&(F<P.cyc/100*S.peakF||S.tIn>2.5))endInsp();}
      else{F=(pm-S.V/C)/R;paw=P.peep;if(S.tIn>.2&&F<=0)endInsp();}
    }else{S.tE+=dt;F=(pm-S.V/C)/R;paw=P.peep;
      const mand=P.mode==='VCV'||P.mode==='PCV'||P.mode==='PRVC'||P.mode==='SIMV',due=mand&&S.t-S.lastMand>=tm.Tb,trig=pm>0&&F>P.trig/60&&S.tE>.15;
      const mkind=P.mode==='VCV'||P.mode==='SIMV'?'VC':'PC';
      if(due)start(mkind,false);
      else if(trig){if(P.mode==='SIMV')start(S.t-S.lastMand>=tm.Tb*.7?'VC':'PS',true);else if(P.mode==='PSV')start('PS',true);else if(P.mode==='CPAP')start('SP',true);else start(mkind,true);}
      else if((P.mode==='PSV'||P.mode==='CPAP')&&S.t-S.lastAny>(S.apnea?6:20)){S.apnea=true;if(P.mode==='PSV'){S.backup=true;start('PC',false);}else S.lastAny=S.t;}
    }
    S.V+=F*dt;cur={P:paw,F,V:S.V};
    if(cb&&!cb.done){cb.pmax=Math.max(cb.pmax,paw);}
    if(cb&&S.t-lastSample>=.01){lastSample=S.t;cb.samples.push([paw,S.V-cb.v0]);}
  }
  function scale(){const C=P.C/1000,nice=(v,a)=>a.find(q=>q>=v)||a[a.length-1],est=P.mode==='VCV'||P.mode==='SIMV'?P.vt/1000/(timing().Ti*.9)*60:Math.max(P.pinsp,P.ps)/P.R*60;
    const fp=Math.max(est,P.vt/1000/(P.R*C)*60*.8,P.eff/P.R*60*1.5)*1.3;rows[1].max=nice(fp,[10,20,40,90,150,240]);rows[1].min=-rows[1].max;
    rows[2].max=nice(Math.max(P.vt,P.mode==='PCV'?P.pinsp*P.C:0,P.mode==='PSV'||P.mode==='SIMV'?P.ps*P.C:0)*1.5,[50,100,200,500,1000,1500]);rows[0].max=50;}
  function rebuild(resetPR){if(resetPR)S.pinsp=clamp(Math.round(P.vt/P.C),5,35);scale();readouts();pv();}
  function step(dt){dt=Math.min(dt,.1);const n0=x,n1=x+sp*dt;let acc=0;
    for(let px=Math.floor(n0)+1;px<=Math.floor(n1);px++){const tg=(px-n0)/sp;while(acc<tg){micro(DT);acc+=DT;}
      const i=px%WW,ref=cb?cb.v0:0;rows[0].buf[i]=cur.P;rows[1].buf[i]=cur.F*60;rows[2].buf[i]=(cur.V-ref)*1000;
      if(mk.length)mk.forEach(m=>{if(m.x===null)m.x=i;});}
    while(acc<dt){micro(DT);acc+=DT;}
    x=n1%(WW*1000);if(rows[0].max<cur.P+4)rows[0].max=70;
    mk=mk.filter(m=>m.x===null||((Math.floor(x)%WW-m.x+WW)%WW)<WW-14);
    statT+=dt;if(statT>.5){statT=0;readouts();pv();}
    draw();}
  function draw(){
    g.fillStyle='#04080B';g.fillRect(0,0,W,H);const cx=Math.floor(x)%WW;
    for(const r of rows){
      g.strokeStyle='#14222A';g.lineWidth=1;g.setLineDash([3,6]);const ticks=r.k==='F'?[r.min,0,r.max]:[0,r.max/2,r.max];
      g.font='500 15px '+MONO;g.textAlign='right';g.fillStyle='#7890A0';
      for(const v of ticks){const y=r.y+r.h-(v-r.min)/(r.max-r.min)*r.h;g.beginPath();g.moveTo(X0,y);g.lineTo(X0+WW,y);g.stroke();g.fillText(String(Math.round(v)),X0-10,y+5);}
      g.setLineDash([]);g.textAlign='left';g.font='600 17px '+MONO;g.fillStyle=r.c;g.fillText(r.lab,X0+6,r.y+16);g.font='500 13px '+MONO;g.fillStyle='#7890A0';g.fillText(r.u,X0+20+g.measureText(r.lab).width,r.y+16);
      g.strokeStyle=r.c;g.lineWidth=2.6;g.lineJoin='round';g.beginPath();let pen=false;
      for(let i=0;i<WW;i++){const gap=((i-cx+WW)%WW)<12,v=r.buf[i];if(gap||isNaN(v)){pen=false;continue;}const y=r.y+r.h-((clamp(v,r.min,r.max)-r.min)/(r.max-r.min))*r.h;if(!pen){g.moveTo(X0+i,y);pen=true;}else g.lineTo(X0+i,y);}
      g.stroke();}
    // soluk tipi işaretleri
    g.font='700 12px '+MONO;g.textAlign='center';
    for(const m of mk){if(m.x===null||m.async)continue;const lab=m.backup?ATLAS.t("app.490"):m.kind==='VC'?(m.patient?'VC▲':'VC'):m.kind==='PC'?(m.patient?'PC▲':'PC'):m.kind==='PS'?'PS▲':'SP▲';
      g.fillStyle=m.backup?'#FF5A68':m.patient?'#9FE3A8':'#7890A0';g.fillText(lab,X0+m.x+14,16);}
    // asenkroni işaretleri
    const AC={ET:'#FF5A68',[ATLAS.t("app.491")]:'#FFC233',AA:'#FF9A4A',GD:'#C8A2FF',AP:'#5BB7DE'};g.font='700 13px '+MONO;
    for(const m of mk){if(m.x===null||!m.async)continue;const lab=m.async===ATLAS.t("app.492")?ATLAS.t("app.493"):m.async,tw=g.measureText(lab).width+10,xx=X0+m.x-tw/2;
      g.fillStyle='rgba(4,8,11,.85)';g.fillRect(xx,30,tw,18);g.strokeStyle=AC[m.async];g.lineWidth=1.5;g.strokeRect(xx,30,tw,18);g.fillStyle=AC[m.async];g.fillText(lab,X0+m.x,44);
      g.setLineDash([2,4]);g.beginPath();g.moveTo(X0+m.x,50);g.lineTo(X0+m.x,rows[1].y+rows[1].h);g.stroke();g.setLineDash([]);}
    g.textAlign='left';g.font='600 14px '+MONO;g.fillStyle='#9FB3C0';g.fillText(P.mode+(S.apnea?ATLAS.t("app.494"):''),X0+WW-170,16);
  }
  function stats(){const C=P.C/1000,b=breaths[breaths.length-1];if(!b)return null;const rec=breaths.slice(-5);
    const rr=rec.length>1?60*(rec.length-1)/(rec[rec.length-1].t-rec[0].t):P.rr,vt=rec.reduce((a,x)=>a+x.vt,0)/rec.length,auto=Math.max(0,b.vee)/C;
    const ibw=P.pt==='adult'?(P.sex==='m'?50:45.5)+.91*(P.h-152.4):P.wt;
    return{b,rr,vt:b.vt,mv:rr*vt,auto,peepTot:P.peep+auto,dp:b.pplat==null?null:b.pplat-(P.peep+auto),ibw,vtkg:b.vt*1000/ibw,tau:P.R*C,Te:timing().Tb-timing().Ti};}
  function readouts(){asyncStats();const s=stats(),C=P.C/1000,ad=P.pt==='adult',plim=ad?30:28,mvLim=ad?4:P.wt*.1;
    if(!s){$('#vreads').innerHTML=ATLAS.t("app.495");return;}
    const hot=c=>c?' hot':'';
    $('#vreads').innerHTML=[
      [ATLAS.t("app.496"),nf(s.b.ppeak,0),'cmH₂O',s.b.ppeak>35],[ATLAS.t("app.497"),s.b.pplat==null?'—':nf(s.b.pplat,0),'cmH₂O',s.b.pplat>plim],
      [ATLAS.t("app.498"),s.dp==null?'—':nf(s.dp,0),'cmH₂O',s.dp>15],[ATLAS.t("app.499"),nf(s.peepTot,1),'cmH₂O',s.auto>=1],
      [ATLAS.t("app.500"),nf(s.vt*1000,ad?0:1),'mL',false],[ad?ATLAS.t("app.501"):'Vt / kg',nf(s.vtkg,1),'mL/kg',s.vtkg>8||s.vtkg<4],
      [ATLAS.t("app.502"),nf(s.rr,0),ATLAS.t("app.503"),false],[ATLAS.t("app.504"),nf(s.mv,ad?1:2),ATLAS.t("app.505"),s.mv<mvLim]
    ].map(([k,v,u,h])=>`<div class="vr${hot(h)}"><div class="k">${k}</div><div class="v">${v}<small>${u}</small></div></div>`).join('')+
    `<div class="vr wide"><div class="k">${P.mode==='PRVC'?ATLAS.t("app.506"):ATLAS.t("app.507")}</div><div class="v" style="font-size:18px">${P.mode==='PRVC'?nf(S.pinsp,0)+'<small>cmH₂O</small>':({VC:ATLAS.t("app.508"),PC:ATLAS.t("app.509"),PS:ATLAS.t("app.510"),SP:ATLAS.t("app.511")})[s.b.kind]+(s.b.backup?ATLAS.t("app.512"):'')}</div></div>`;
    $('#ventEq').innerHTML=ATLAS.template("app.513")`${s.b.kind==='VC'?ATLAS.t("app.514")+nf(s.b.ppeak-s.b.pplat,1):ATLAS.t("app.515")}${nf(s.vt/C,1)}${ad?ATLAS.t("app.516"):ATLAS.t("app.517")}${nf(s.ibw,1)}${Math.round(s.ibw*6)}${Math.round(s.ibw*8)}`;
    const al=[];
    if(S.apnea)al.push(['crit',P.mode==='PSV'?ATLAS.t("app.518"):ATLAS.t("app.519")]);
    if(s.b.ppeak>35)al.push(['crit',ATLAS.t("app.520")+nf(s.b.ppeak,0)+ATLAS.t("app.521")]);
    if(s.b.pplat!=null&&s.b.pplat>plim)al.push(['crit',ATLAS.t("app.522")+nf(s.b.pplat,0)+' cmH₂O > '+plim+(ad?'':ATLAS.t("app.523"))+ATLAS.t("app.524")]);
    if(s.dp!=null&&s.dp>15)al.push(['warn',ATLAS.t("app.525")+nf(s.dp,0)+' cmH₂O > 15.']);
    if(s.auto>=1)al.push(['warn',ATLAS.t("app.526")+nf(s.auto,1)+ATLAS.t("app.527")+nf(3*s.tau,2)+ATLAS.t("app.528")]);
    if(s.vtkg>8)al.push(['warn','Vt '+nf(s.vtkg,1)+(ad?ATLAS.t("app.529"):' mL/kg')+ATLAS.t("app.530")]);
    if(s.vtkg<4&&!S.apnea)al.push(['warn','Vt '+nf(s.vtkg,1)+(ad?ATLAS.t("app.531"):' mL/kg')+ATLAS.t("app.532")]);
    if(s.mv<mvLim&&!S.apnea)al.push(['warn',ATLAS.t("app.533")+nf(s.mv,ad?1:2)+ATLAS.t("app.534")]);
    if(!al.length)al.push(['ok',ATLAS.t("app.535")]);if(!ad)al.push(['ok',ATLAS.t("app.536")]);
    $('#ventAlarms').innerHTML=al.map(([c,m])=>`<div class="alarm ${c==='ok'?'':c}">${m}</div>`).join('');
  }
  function asyncStats(){const el=$('#asyncStats');if(!el)return;const t0=S.t-60,ev=evts.filter(e=>e.t>=t0),n=k=>ev.filter(e=>e.type===k).length,cyc=starts.filter(t=>t>=t0).length+n(ATLAS.t("app.537")),ai=cyc?100*(n(ATLAS.t("app.538"))+n(ATLAS.t("app.539"))+n(ATLAS.t("app.540"))+n(ATLAS.t("app.541")))/cyc:0;
    el.innerHTML=[[ATLAS.t("app.542"),ATLAS.t("app.543")],[ATLAS.t("app.544"),ATLAS.t("app.545")],[ATLAS.t("app.546"),ATLAS.t("app.547")],[ATLAS.t("app.548"),ATLAS.t("app.549")],['AP',ATLAS.t("app.550")]].map(([k,l])=>`<div class="stat ${n(k)?'w':''}"><div class="k">${k} · ${l}</div><div class="v">${n(k)}</div></div>`).join('')+
      ATLAS.template("app.551")`${ai>10?'c':''}${nf(ai,0)}${ai>10?ATLAS.t("app.552"):ATLAS.t("app.553")}`;}
  const pc=$('#pvCanvas'),pg=pc.getContext('2d');
  function pv(){const w=pc.width,h=pc.height,l=64,b=56,tp=20,rt=20;pg.fillStyle='#04080B';pg.fillRect(0,0,w,h);
    const pmax=rows[0].max,vmax=rows[2].max,X=p=>l+(p/pmax)*(w-l-rt),Y=v=>h-b-(v/vmax)*(h-b-tp);
    pg.strokeStyle='#22323C';pg.lineWidth=1.5;pg.beginPath();pg.moveTo(l,tp);pg.lineTo(l,h-b);pg.lineTo(w-rt,h-b);pg.stroke();
    pg.font='500 20px '+MONO;pg.fillStyle='#7890A0';pg.textAlign='center';for(const p of [0,pmax/2,pmax])pg.fillText(String(Math.round(p)),X(p),h-b+26);
    pg.fillText('Paw  cmH₂O',(l+w-rt)/2,h-8);pg.textAlign='right';for(const v of [0,vmax/2,vmax])pg.fillText(nf(v,1),l-8,Y(v)+6);
    pg.save();pg.translate(18,(h-b+tp)/2);pg.rotate(-Math.PI/2);pg.textAlign='center';pg.fillText(ATLAS.t("app.554"),0,0);pg.restore();
    pg.setLineDash([5,6]);pg.strokeStyle='#3A4E5A';pg.beginPath();pg.moveTo(X(P.peep),tp);pg.lineTo(X(P.peep),h-b);pg.stroke();pg.setLineDash([]);
    if(!loop.length){pg.textAlign='center';pg.fillText(ATLAS.t("app.555"),w/2,h/2);return;}
    pg.strokeStyle='#FF9A4A';pg.lineWidth=3.5;pg.lineJoin='round';pg.beginPath();
    loop.forEach(([p,v],i)=>{const px=X(clamp(p,0,pmax)),py=Y(clamp(v*1000,-vmax*.05,vmax));if(i)pg.lineTo(px,py);else pg.moveTo(px,py);});pg.stroke();}
  return{P,S,rebuild,step,clearAsync(){evts.length=0;starts.length=0;asyncStats();},counts(){const c={};evts.forEach(e=>c[e.type]=(c[e.type]||0)+1);return c;},get cur(){return cur;},get ref(){return cb?cb.v0:0;},get mode(){return P.mode;},get bellRange(){return P.pt==='adult'?1.2:P.pt==='child'?.4:.1;}};
})();

/* ───────────── PARÇA PANELİ ───────────── */
const infoEl=$('#partInfo');
function defaultInfo(){
  infoEl.innerHTML=ATLAS.template("app.556")``;
}
function showInfo(k){
  const p=PARTS[PIDX[k]];if(!p){defaultInfo();return;}
  infoEl.innerHTML=ATLAS.template("app.557")`${String(PIDX[k]+1).padStart(2,'0')}${PARTS.length}${p.t}${p.z}${p.s}${p.f.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}${p.b.map(x=>`<p>${x}</p>`).join('')}${p.p?`<a class="linkbtn" href="${p.p[0]}">${p.p[1]} →</a>`:''}`;
  const c=infoEl.querySelector('[data-clear]');c&&c.addEventListener('click',()=>selectPart(null));
}
const pidx=$('#partIndex');
pidx.innerHTML=PARTS.map((p,i)=>`<li><button type="button" data-k="${p.k}"><span class="n">${i+1}</span>${p.t}</button></li>`).join('');
let selected=null, VM=null;
function selectPart(k,focus){
  selected=k;showInfo(k);
  if(VM)VM.selectedKey=k;
  $('#stageMachine').classList.toggle('has-selection',!!k);
  document.dispatchEvent(new CustomEvent('atlas:part',{detail:{key:k}}));
  $$('#partIndex button').forEach(b=>b.setAttribute('aria-current',b.dataset.k===k?'true':'false'));
  if(VM){VM.highlight(k);VM.pins.forEach(p=>p.el.classList.toggle('on',p.key===k));
    if(k&&focus!==false){const p=PARTS[PIDX[k]];VM.focus(new THREE.Vector3(...p.a),p.v[2],p.v[0],p.v[1]);}
    if(!k&&focus!==false)VM.reset();}
}
pidx.addEventListener('click',e=>{const b=e.target.closest('button[data-k]');if(b)selectPart(b.dataset.k);});
defaultInfo();

/* ───────────── HERO KONTROLLERİ ───────────── */
const fO2=$('#fO2'),fAir=$('#fAir'),fN2O=$('#fN2O'),dSevo=$('#dSevo');
function syncGas(src){
  GAS.o2=+fO2.value;GAS.air=+fAir.value;GAS.n2o=+fN2O.value;GAS.sevo=+dSevo.value;
  let guard='';
  if(GAS.n2o>3*GAS.o2+1e-9){
    if(src==='n2o'){GAS.o2=Math.min(10,Math.ceil(GAS.n2o/3*10)/10);fO2.value=GAS.o2;if(GAS.n2o>3*GAS.o2){GAS.n2o=3*GAS.o2;fN2O.value=GAS.n2o;}guard=ATLAS.t("app.558")+nf(GAS.o2)+ATLAS.t("app.559");}
    else{GAS.n2o=Math.floor(3*GAS.o2*10)/10;fN2O.value=GAS.n2o;guard=ATLAS.t("app.560")+nf(GAS.n2o)+ATLAS.t("app.561");}
  }
  $('#oO2').textContent=nf(GAS.o2);$('#oAir').textContent=nf(GAS.air);$('#oN2O').textContent=nf(GAS.n2o);$('#oSevo').textContent=nf(GAS.sevo);
  const d=gasD();
  $('#dTot').innerHTML=nf(d.tot)+ATLAS.t("app.562");
  $('#dFi').textContent=d.tot>0?ATLAS.percent(Math.round(d.fio2*100)):'—';
  $('#dUse').innerHTML=Math.round(d.use)+ATLAS.t("app.563");
  const n=$('#dNote');n.className='note';
  if(d.tot<.05){n.classList.add('crit');n.textContent=ATLAS.t("app.564");}
  else if(guard){n.classList.add('warn');n.textContent=guard;}
  else if(d.fio2<.3){n.classList.add('warn');n.textContent=ATLAS.t("app.565");}
  else if(GAS.sevo>0&&d.tot<1){n.classList.add('warn');n.textContent=ATLAS.t("app.566");}
  else n.textContent=ATLAS.t("app.567");
  VM&&VM.setFlows();
}
fO2.addEventListener('input',()=>syncGas('o2'));fAir.addEventListener('input',()=>syncGas('air'));fN2O.addEventListener('input',()=>syncGas('n2o'));dSevo.addEventListener('input',()=>syncGas('sevo'));
function setGasUI(o2,air,n2o,sevo){fO2.value=o2;fAir.value=air;fN2O.value=n2o;if(sevo!=null)dSevo.value=sevo;syncGas('set');}
function setMode(m){GAS.mode=m;$('#mVent').setAttribute('aria-pressed',m==='vent');$('#mBag').setAttribute('aria-pressed',m==='bag');}
$('#mVent').addEventListener('click',()=>setMode('vent'));$('#mBag').addEventListener('click',()=>setMode('bag'));
$('#tFlow').addEventListener('change',e=>{GAS.flowVis=e.target.checked;});
syncGas();

/* ───────────── GAZ YOLU ADIMLARI ───────────── */
const JOURNEY=[
  [ATLAS.t("app.568"),ATLAS.t("app.569"),'pipeline'],
  [ATLAS.t("app.570"),ATLAS.t("app.571"),'gauges'],
  [ATLAS.t("app.572"),ATLAS.t("app.573"),'flowmeters'],
  [ATLAS.t("app.574"),ATLAS.t("app.575"),'vaporizers'],
  [ATLAS.t("app.576"),ATLAS.t("app.577"),'cgo'],
  [ATLAS.t("app.578"),ATLAS.t("app.579"),'valves'],
  [ATLAS.t("app.580"),ATLAS.t("app.581"),'lung'],
  [ATLAS.t("app.582"),ATLAS.t("app.583"),'absorber']
];
$('#journey').innerHTML=JOURNEY.map(([h,p,k])=>ATLAS.template("app.584")`${h}${p}${k}`).join('');
$('#journey').addEventListener('click',e=>{const b=e.target.closest('button[data-k]');if(!b)return;selectPart(b.dataset.k);$('#stageMachine').scrollIntoView({behavior:RM?'auto':'smooth',block:'center'});});

/* ───────────── 3B ───────────── */
let monTexes=[];
if(K3){try{
  const {lin,std,glass,MAT,makeEnv,rbox,put,cylG,corrugated,canvasTex,lathe,Viewer,gaugeTex,labelTex}=K3;
  /* gösterge ve etiket dokuları */
  const flowBackTex=canvasTex(512,512,(g,w,h)=>{g.fillStyle='#1B2227';g.fillRect(0,0,w,h);
    const xs=[.185,.5,.815],names=['N₂O',ATLAS.t("app.585"),'O₂'],cols=['#6E98FF','#E6E9EB','#FFFFFF'];
    g.textAlign='center';g.textBaseline='middle';
    xs.forEach((u,i)=>{const x=u*w;g.font='700 34px sans-serif';g.fillStyle=cols[i];g.fillText(names[i],x,32);
      for(let k=0;k<=10;k++){const v=.204+.0666*k,y=(1-v)*h;g.strokeStyle='#C8D2D8';g.lineWidth=k%5?2:3;const L=k%5?14:24;g.beginPath();g.moveTo(x+26,y);g.lineTo(x+26+L,y);g.stroke();
        if(k%2===0){g.font='500 20px sans-serif';g.fillStyle='#C8D2D8';g.fillText(String(k),x+68,y);}}});
    g.font='500 20px sans-serif';g.fillStyle='#8C9AA3';g.fillText(ATLAS.t("app.586"),w/2,h-18);});
  function drawGran(g,w,h,frac){g.fillStyle='#EEF0EE';g.fillRect(0,0,w,h);let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
    for(let i=0;i<1600;i++){const x=rnd()*w,y=rnd()*h,r=3+rnd()*4,used=y<h*frac+(rnd()-.5)*18;g.fillStyle=used?`hsl(${275+rnd()*12},${45+rnd()*20}%,${42+rnd()*14}%)`:`hsl(90,${4+rnd()*8}%,${84+rnd()*12}%)`;g.beginPath();g.arc(x,y,r,0,7);g.fill();}}
  const granTex=canvasTex(256,256,(g,w,h)=>drawGran(g,w,h,.28));
  function setAbsorber(frac){const c=granTex.userData.canvas;drawGran(c.getContext('2d'),c.width,c.height,frac);granTex.needsUpdate=true;}

  const monTexA=new THREE.CanvasTexture(MON.canvas),monTexB=new THREE.CanvasTexture(MON.canvas);
  [monTexA,monTexB].forEach(t=>{t.encoding=THREE.sRGBEncoding;t.minFilter=THREE.LinearFilter;t.generateMipmaps=false;});
  monTexes=[monTexA,monTexB];

  /* ═════════ MAKİNE ═════════ */
  VM=new Viewer($('#stageMachine'),{target:[-.12,1.0,0],dist:3.8,theta:-.52,phi:1.2,minD:.55,maxD:6,fov:30,shadow:1.4,groundR:1.6,panLim:1.6});
  const R=VM.root,partG={},A={};
  const part=k=>{if(!partG[k]){const g=new THREE.Group();g.userData.part=k;R.add(g);partG[k]=g;}return partG[k];};

  // şasi
  put(R,rbox(.88,.07,.62,.02,MAT.dark),0,.115,0);
  for(const [x,z] of [[-.36,-.24],[.36,-.24],[-.36,.24],[.36,.24]]){put(R,new THREE.Mesh(cylG(.042,.042,.032,20),MAT.rubber),x,.045,z,0,0,Math.PI/2);put(R,new THREE.Mesh(new THREE.BoxGeometry(.03,.05,.05),MAT.metal),x,.085,z);}
  put(R,rbox(.78,.66,.54,.025,MAT.shell),0,.49,0);
  [.27,.47,.67].forEach(y=>{put(R,rbox(.7,.16,.02,.006,MAT.shell2),0,y,.272);put(R,new THREE.Mesh(new THREE.BoxGeometry(.18,.012,.016),MAT.metal),0,y+.048,.288);});
  put(R,rbox(.92,.036,.64,.012,MAT.shell2),0,.842,0);
  put(R,new THREE.Mesh(cylG(.011,.011,.9,16),MAT.chrome),0,.83,.345,0,0,Math.PI/2);
  [-.42,.42].forEach(x=>put(R,new THREE.Mesh(new THREE.BoxGeometry(.02,.02,.04),MAT.chrome),x,.83,.325));
  put(R,rbox(.74,.56,.3,.02,MAT.shell),0,1.14,-.15);
  put(R,new THREE.Mesh(new THREE.BoxGeometry(.7,.5,.006),MAT.panel),0,1.15,.003);
  put(R,rbox(.8,.03,.38,.01,MAT.shell2),0,1.435,-.14);

  // monitör
  {const g=part('monitor');put(g,new THREE.Mesh(cylG(.022,.022,.11,16),MAT.metal),0,1.5,-.15);
   const m=new THREE.Group();m.position.set(0,1.7,-.12);m.rotation.x=.06;g.add(m);
   put(m,rbox(.54,.36,.05,.015,MAT.black));
   const scr=new THREE.Mesh(new THREE.PlaneGeometry(.48,.3),new THREE.MeshBasicMaterial({map:monTexA,toneMapped:false}));scr.position.set(0,.01,.0262);m.add(scr);
   put(m,new THREE.Mesh(new THREE.SphereGeometry(.005,10,8),new THREE.MeshBasicMaterial({color:0x3CF06E})),.245,-.163,.026);}

  // göstergeler
  {const g=part('gauges');[['N₂O','#2156C4',.38,10,-.275],[ATLAS.t("app.587"),'#2A2F33',.4,10,-.19],['O₂','#E8ECEE',.4,10,-.105]].forEach(([l,c,f,mx,x])=>{
    put(g,new THREE.Mesh(new THREE.CircleGeometry(.03,40),new THREE.MeshStandardMaterial({map:gaugeTex(l,c,f,mx),roughness:.35})),x,1.35,.008);
    put(g,new THREE.Mesh(new THREE.TorusGeometry(.031,.004,10,40),MAT.chrome),x,1.35,.008);
    put(g,new THREE.Mesh(cylG(.034,.034,.012,32),MAT.dark),x,1.35,.002,Math.PI/2);});}

  // akım ölçerler
  {const g=part('flowmeters');put(g,new THREE.Mesh(new THREE.BoxGeometry(.3,.3,.02),MAT.dark),-.19,1.16,-.002);
   put(g,new THREE.Mesh(new THREE.PlaneGeometry(.27,.27),new THREE.MeshStandardMaterial({map:flowBackTex,roughness:.6})),-.19,1.16,.0085);
   A.bob={};[['n2o',-.275,MAT.n2o],['air',-.19,MAT.metal],['o2',-.105,MAT.o2]].forEach(([k,x,bm])=>{
     put(g,new THREE.Mesh(cylG(.012,.012,.2,20,true),glass(0xEAF6FA,.28)),x,1.17,.03);
     put(g,new THREE.Mesh(cylG(.016,.016,.012,20),MAT.chrome),x,1.064,.03);put(g,new THREE.Mesh(cylG(.016,.016,.012,20),MAT.chrome),x,1.276,.03);
     const b=put(g,new THREE.Mesh(cylG(.0095,.0065,.012,16),bm),x,1.08,.03);A.bob[k]=b;});}

  // düğmeler
  {const g=part('knobs');put(g,new THREE.Mesh(cylG(.017,.017,.03,24),MAT.n2o),-.275,.995,.02,Math.PI/2);put(g,new THREE.Mesh(cylG(.017,.017,.03,24),MAT.air),-.19,.995,.02,Math.PI/2);
   put(g,new THREE.Mesh(new THREE.TorusGeometry(.017,.0025,8,24),MAT.o2),-.19,.995,.036);
   put(g,new THREE.Mesh(cylG(.021,.021,.04,12),MAT.o2),-.105,.995,.025,Math.PI/2);put(g,new THREE.Mesh(new THREE.TorusGeometry(.021,.003,8,12),MAT.green),-.105,.995,.045);}

  // vaporizatörler
  {const g=part('vaporizers');put(g,new THREE.Mesh(new THREE.BoxGeometry(.32,.025,.014),MAT.metal),.17,1.2,.008);
   [[.1,MAT.sevo,ATLAS.t("app.588"),'#F0C21B','#2a2200'],[.24,MAT.des,ATLAS.t("app.589"),'#1E6FD9','#ffffff']].forEach(([x,m,lab,bg,fg],i)=>{
     put(g,rbox(.1,.19,.11,.012,m),x,1.125,.068);
     const dial=put(g,new THREE.Mesh(cylG(.042,.042,.03,32),MAT.o2),x,1.232,.068);put(g,new THREE.Mesh(new THREE.TorusGeometry(.042,.004,8,32),m),x,1.247,.068,Math.PI/2);
     const ind=put(g,new THREE.Mesh(new THREE.BoxGeometry(.006,.005,.03),MAT.dark),0,.017,.022);dial.remove(ind);dial.add(ind);ind.position.set(0,.016,.024);
     if(i===0)A.sevoDial=dial;
     put(g,new THREE.Mesh(new THREE.PlaneGeometry(.085,.021),new THREE.MeshStandardMaterial({map:labelTex(lab,bg,fg),roughness:.5})),x,1.17,.1245);
     put(g,new THREE.Mesh(new THREE.PlaneGeometry(.014,.06),MAT.dark),x+.03,1.08,.1245);
     put(g,new THREE.Mesh(new THREE.PlaneGeometry(.01,.035),new THREE.MeshBasicMaterial({color:lin(i?0x7FB0FF:0xFFE27A)})),x+.03,1.07,.125);
     put(g,new THREE.Mesh(new THREE.BoxGeometry(.03,.025,.02),MAT.black),x-.02,1.06,.13);});
   put(g,new THREE.Mesh(cylG(.005,.005,.04,10),MAT.chrome),.17,1.24,.03,0,0,Math.PI/2);}

  // flush ve ortak gaz çıkışı
  {const g=part('flush');put(g,new THREE.Mesh(new THREE.TorusGeometry(.022,.006,10,28),MAT.dark),-.02,.93,.006);put(g,new THREE.Mesh(cylG(.017,.017,.016,24),MAT.o2),-.02,.93,.01,Math.PI/2);
   put(g,new THREE.Mesh(new THREE.PlaneGeometry(.05,.016),new THREE.MeshStandardMaterial({map:labelTex('O₂ +','#E8ECEE','#123'),roughness:.5})),-.02,.965,.0065);}
  {const g=part('cgo');put(g,new THREE.Mesh(cylG(.011,.013,.05,20),MAT.chrome),.3,.92,.025,Math.PI/2);put(g,new THREE.Mesh(cylG(.02,.02,.012,20),MAT.metal),.3,.92,.006,Math.PI/2);}

  // hat girişleri ve hortumlar
  {const g=part('pipeline');[[.12,MAT.o2],[.2,MAT.air],[.28,MAT.n2o]].forEach(([x,m])=>{
    put(g,new THREE.Mesh(cylG(.014,.014,.035,16),MAT.chrome),x,1.0,-.315,Math.PI/2);
    const cu=new THREE.CatmullRomCurve3([[x,1.0,-.33],[x,.97,-.44],[x+.03,.7,-.53],[x+.06,.3,-.6],[x+.1,.012,-.76]].map(p=>new THREE.Vector3(...p)));
    put(g,new THREE.Mesh(new THREE.TubeGeometry(cu,60,.0095,10,false),m));});}

  // silindirler
  {const g=part('cylinders');[[-.15,MAT.black,MAT.o2],[.02,MAT.n2o,MAT.n2o]].forEach(([x,body,sh])=>{
    put(g,new THREE.Mesh(cylG(.055,.055,.56,28),body),x,.46,-.37);
    const s=put(g,new THREE.Mesh(new THREE.SphereGeometry(.055,28,14,0,Math.PI*2,0,Math.PI/2),sh),x,.74,-.37);s.scale.y=.75;
    put(g,new THREE.Mesh(cylG(.016,.016,.05,14),MAT.chrome),x,.79,-.37);
    put(g,new THREE.Mesh(new THREE.BoxGeometry(.07,.06,.06),MAT.metal),x,.84,-.36);
    put(g,new THREE.Mesh(cylG(.018,.018,.012,20),MAT.o2),x,.84,-.395,Math.PI/2);
    put(g,new THREE.Mesh(new THREE.BoxGeometry(.13,.02,.03),MAT.dark),x,.3,-.3);});}

  // absorber
  {const g=part('absorber');put(g,new THREE.Mesh(new THREE.BoxGeometry(.09,.04,.08),MAT.metal),-.43,.75,.05);
   put(g,rbox(.22,.06,.19,.012,MAT.dark),-.57,.8,.05);
   put(g,new THREE.Mesh(cylG(.07,.07,.2,36,true),glass(0xE6F3F7,.25)),-.57,.67,.05);
   put(g,new THREE.Mesh(cylG(.064,.064,.19,36),new THREE.MeshStandardMaterial({map:granTex,roughness:.9})),-.57,.67,.05);
   put(g,new THREE.Mesh(cylG(.076,.076,.022,36),MAT.dark),-.57,.56,.05);}

  // tek yönlü valfler
  {const g=part('valves');[[-.62,'insp'],[-.52,'exp']].forEach(([x,k])=>{
    put(g,new THREE.Mesh(cylG(.031,.031,.012,28),MAT.metal),x,.836,.09);
    put(g,new THREE.Mesh(new THREE.SphereGeometry(.029,28,14,0,Math.PI*2,0,Math.PI/2),glass(0xF0FAFF,.3)),x,.842,.09);
    A[k+'Disc']=put(g,new THREE.Mesh(cylG(.022,.022,.003,24),std(0xE9E2C6,.4)),x,.845,.09);
    put(g,new THREE.Mesh(cylG(.014,.014,.05,16),MAT.chrome),x,.85,.135,Math.PI/2);});}
  {const g=part('o2sensor');put(g,new THREE.Mesh(cylG(.013,.013,.03,18),MAT.o2),-.62,.885,.09);put(g,new THREE.Mesh(cylG(.009,.009,.01,14),MAT.green),-.62,.904,.09);}
  {const g=part('apl');put(g,new THREE.Mesh(cylG(.016,.016,.02,18),MAT.metal),-.49,.84,.0);put(g,new THREE.Mesh(cylG(.024,.024,.024,24),MAT.dark),-.49,.862,0);put(g,new THREE.Mesh(cylG(.018,.018,.006,24),MAT.orange),-.49,.877,0);}
  {const g=part('bagvent');put(g,new THREE.Mesh(cylG(.015,.015,.02,16),MAT.metal),-.64,.84,-.01);A.lever=put(g,new THREE.Mesh(new THREE.BoxGeometry(.06,.012,.016),MAT.green),-.64,.856,-.01);}

  // balon
  {const g=part('bag');const cu=new THREE.CatmullRomCurve3([[-.67,.8,.05],[-.74,.8,.05],[-.78,.775,.05],[-.78,.73,.05]].map(p=>new THREE.Vector3(...p)));put(g,new THREE.Mesh(new THREE.TubeGeometry(cu,24,.012,12,false),MAT.chrome));
   put(g,new THREE.Mesh(cylG(.019,.019,.03,18),MAT.black),-.78,.715,.05);
   A.bag=put(g,lathe([[.018,0],[.032,-.03],[.064,-.09],[.074,-.17],[.067,-.25],[.044,-.31],[.001,-.33]],std(0x1E2226,.75)),-.78,.7,.05);}

  // hortumlar
  const inspCurve=new THREE.CatmullRomCurve3([[-.62,.85,.155],[-.62,.848,.22],[-.6,.8,.34],[-.53,.762,.48],[-.468,.746,.565]].map(p=>new THREE.Vector3(...p)));
  const expCurve=new THREE.CatmullRomCurve3([[-.52,.85,.155],[-.52,.848,.22],[-.5,.81,.32],[-.465,.776,.45],[-.445,.752,.56]].map(p=>new THREE.Vector3(...p)));
  {const g=part('hoses');put(g,corrugated(inspCurve,.0125,MAT.hose));put(g,corrugated(expCurve,.0125,MAT.hose));
   put(g,new THREE.Mesh(new THREE.SphereGeometry(.017,16,12),std(0xEEF2F4,.3,0,{transparent:true,opacity:.85})),-.456,.748,.575);
   put(g,new THREE.Mesh(cylG(.011,.011,.06,16),std(0xEEF2F4,.3,0,{transparent:true,opacity:.85})),-.456,.748,.61,Math.PI/2);}
  {const g=part('lung');put(g,new THREE.Mesh(cylG(.011,.011,.05,14),MAT.metal),-.456,.72,.645);
   A.lung=put(g,lathe([[.011,0],[.03,-.03],[.05,-.08],[.052,-.13],[.035,-.17],[.001,-.18]],std(0x8C2F2F,.6)),-.456,.695,.645);}

  // körük
  {const g=part('bellows');put(g,new THREE.Mesh(cylG(.088,.09,.03,36),MAT.dark),.29,.875,.22);
   put(g,new THREE.Mesh(cylG(.076,.076,.28,36,true),glass(0xE6F3F7,.2)),.29,1.03,.22);
   put(g,new THREE.Mesh(new THREE.TorusGeometry(.076,.005,8,36),MAT.dark),.29,1.17,.22,Math.PI/2);
   const pts=[];for(let i=0;i<=16;i++)pts.push([i%2?.052:.064,i/16]);
   A.bellows=put(g,lathe(pts,MAT.bellows),.29,.89,.22);
   A.bellTop=put(g,new THREE.Mesh(cylG(.066,.066,.008,32),MAT.bellows),.29,1.13,.22);
   for(let i=0;i<=10;i++)put(g,new THREE.Mesh(new THREE.BoxGeometry(.012,.0015,.002),MAT.dark),.29+.074*Math.sin(.5),.9+i*.025,.22+.074*Math.cos(.5),0,.5,0);}

  // akış parçacıkları
  const v3=a=>a.map(p=>new THREE.Vector3(...p));
  const freshCurve=new THREE.CatmullRomCurve3(v3([[.13,.99,-.45],[.12,1.0,-.33],[.0,1.02,-.12],[-.105,1.05,.03],[-.105,1.17,.03],[-.105,1.272,.03],[-.04,1.295,.04],[.1,1.26,.068],[.1,1.12,.08],[.18,.96,.06],[.3,.92,.055],[.15,.82,.1],[-.2,.8,.1],[-.45,.8,.06],[-.57,.815,.06],[-.62,.84,.09]]),false,'catmullrom',.3);
  const canCurve=new THREE.CatmullRomCurve3(v3([[-.52,.84,.09],[-.54,.79,.06],[-.57,.72,.05],[-.585,.6,.05],[-.6,.72,.05],[-.61,.79,.06],[-.62,.84,.09]]));
  const expRev=new THREE.CatmullRomCurve3(expCurve.points.slice().reverse());
  const dummy=new THREE.Object3D();
  function flowSet(curve,n,col,size){const m=new THREE.InstancedMesh(new THREE.SphereGeometry(size||.0065,8,6),new THREE.MeshBasicMaterial({color:lin(col),transparent:true,opacity:.95,depthWrite:false,toneMapped:false}),n);
    m.userData.nopick=true;m.frustumCulled=false;R.add(m);return{m,curve,n,u:Array.from({length:n},(_,i)=>i/n),p:new THREE.Vector3()};}
  const flows={fresh:flowSet(freshCurve,70,0x7CF2A0),insp:flowSet(inspCurve,26,0x6FD3FF),exp:flowSet(expRev,26,0xFFB347),can:flowSet(canCurve,22,0xFFB347)};
  function runFlow(F,speed,dt){F.m.visible=GAS.flowVis;if(!F.m.visible)return;for(let i=0;i<F.n;i++){F.u[i]=(F.u[i]+speed*dt)%1;F.curve.getPointAt(F.u[i],F.p);dummy.position.copy(F.p);dummy.updateMatrix();F.m.setMatrixAt(i,dummy.matrix);}F.m.instanceMatrix.needsUpdate=true;}

  // parça kaydı
  Object.values(partG).forEach(g=>g.traverse(o=>{if(o.isMesh&&!o.userData.nopick){o.material=o.material.clone();o.userData.baseEm=o.material.emissive?o.material.emissive.clone():null;}}));
  VM.highlight=k=>{Object.entries(partG).forEach(([key,g])=>g.traverse(o=>{if(o.isMesh&&o.material.emissive){o.material.emissive.copy(key===k?lin(0x2F6BFF):o.userData.baseEm);o.material.emissiveIntensity=key===k?.55:1;}}));};
  PARTS.forEach((p,i)=>VM.addPin(p.k,String(i+1),new THREE.Vector3(...p.a),(i+1)+'. '+p.t));
  VM.onPick=k=>selectPart(k,k?true:false);
  VM.onReset=()=>selectPart(null,false);
  VM.setFlows=()=>{};
  $('#tPins').addEventListener('change',e=>{VM.showPins=e.target.checked;});
  $('#tRot').addEventListener('change',e=>{VM.auto=e.target.checked;});

  const cur={o2:GAS.o2,air:GAS.air,n2o:GAS.n2o,sevo:GAS.sevo};let bagS=1,bellH=.24,lungS=1;
  VM.tick.push((dt)=>{
    const b=MON.breath(),ef=b.eflows,k=1-Math.exp(-dt*6);
    ['o2','air','n2o'].forEach(x=>cur[x]+=(ef[x]-cur[x])*k);cur.sevo+=(GAS.sevo-cur.sevo)*k;
    const jig=t=>Math.sin(performance.now()/90+t)*.0012;
    A.bob.o2.position.y=1.08+.018*cur.o2+(cur.o2>.05?jig(1):0);A.bob.air.position.y=1.08+.018*cur.air+(cur.air>.05?jig(2):0);A.bob.n2o.position.y=1.08+.018*cur.n2o+(cur.n2o>.05?jig(3):0);
    A.sevoDial.rotation.y=-cur.sevo/8*Math.PI*1.4;
    const cyc=b.mech;
    A.inspDisc.position.y+=((cyc&&b.insp?.853:.845)-A.inspDisc.position.y)*Math.min(1,dt*25);
    A.expDisc.position.y+=((cyc&&!b.insp&&b.raw>.15?.853:.845)-A.expDisc.position.y)*Math.min(1,dt*25);
    const vent=GAS.mode==='vent',full=.07+.17*b.circ;
    const tb=vent&&cyc?full-.1*b.raw*Math.min(1,b.circ*1.5):full;bellH+=(tb-bellH)*Math.min(1,dt*10);A.bellows.scale.y=Math.max(.02,bellH);A.bellTop.position.y=.89+Math.max(.02,bellH);
    const manual=!vent&&cyc,tbag=(manual?1-.32*b.raw:1)*(.55+.45*b.circ);bagS+=(tbag-bagS)*Math.min(1,dt*10);A.bag.scale.set(bagS,1-(1-bagS)*.3,bagS);
    A.lever.rotation.y+=((vent?.9:-.2)-A.lever.rotation.y)*Math.min(1,dt*8);
    const tl=1+.45*b.lung;lungS+=(tl-lungS)*Math.min(1,dt*10);A.lung.scale.set(lungS,lungS*.9+.1,lungS);
    runFlow(flows.fresh,b.tot>.05?Math.min(.5,.04+b.tot*.012):0,dt);
    runFlow(flows.insp,cyc&&b.insp&&!b.disc?.75:0,dt);runFlow(flows.exp,cyc&&!b.insp&&b.raw>.12&&!b.disc?.55*b.raw+.1:0,dt);runFlow(flows.can,cyc&&!b.insp&&b.raw>.12?.35:0.02,dt);
  });

  MON.onSet(k=>{setAbsorber(k==='absorban'?.96:.28);});

  /* ═════════ VENTİLATÖR 3B ═════════ */
  const VV=new Viewer($('#stageVent'),{target:[0,.33,0],dist:1.75,theta:.55,phi:1.18,minD:.6,maxD:3.5,fov:30,shadow:.7,groundR:.9,panLim:.8,fitAspect:1.0});
  const VR=VV.root,vg={},vA={};const vpart=k=>{if(!vg[k]){const g=new THREE.Group();g.userData.part=k;VR.add(g);vg[k]=g;}return vg[k];};
  {const g=vpart('base');put(g,rbox(.56,.17,.4,.02,MAT.shell),0,.085,0);put(g,new THREE.Mesh(new THREE.PlaneGeometry(.18,.06),new THREE.MeshStandardMaterial({map:labelTex(ATLAS.t("app.590"),'#1B2227','#CFE3EE'),roughness:.5})),.15,.1,.2005);
   put(g,new THREE.Mesh(new THREE.SphereGeometry(.007,10,8),new THREE.MeshBasicMaterial({color:0x3CF06E})),.26,.13,.2005);}
  {const g=vpart('housing');put(g,new THREE.Mesh(cylG(.145,.15,.035,48),MAT.dark),-.06,.188,0);
   put(g,new THREE.Mesh(cylG(.132,.132,.43,48,true),glass(0xE6F3F7,.18)),-.06,.42,0);
   put(g,new THREE.Mesh(new THREE.TorusGeometry(.132,.007,10,48),MAT.dark),-.06,.635,0,Math.PI/2);
   put(g,new THREE.Mesh(new THREE.CircleGeometry(.132,48),glass(0xE6F3F7,.12)),-.06,.636,0,-Math.PI/2);
   for(let i=0;i<=12;i++)put(g,new THREE.Mesh(new THREE.BoxGeometry(i%2?.016:.028,.002,.002),MAT.dark),-.06+.133*Math.sin(.6),.22+i*.032,.133*Math.cos(.6),0,.6,0);
   vA.drive=put(g,new THREE.Mesh(cylG(.128,.128,.42,48),new THREE.MeshBasicMaterial({color:lin(0x5AA9FF),transparent:true,opacity:.05,depthWrite:false})),-.06,.415,0);vA.drive.userData.nopick=true;}
  {const g=vpart('bellows');const pts=[];for(let i=0;i<=20;i++)pts.push([i%2?.098:.118,i/20]);
   vA.bel=put(g,lathe(pts,MAT.bellows,48),-.06,.206,0);vA.top=put(g,new THREE.Mesh(cylG(.12,.12,.012,40),MAT.bellows),-.06,.586,0);}
  const driveCurve=new THREE.CatmullRomCurve3(v3([[.36,.12,.12],[.24,.12,.12],[.12,.15,.1],[.04,.2,.08],[.0,.27,.07]]));
  {const g=vpart('drive');put(g,new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(driveCurve.points.slice(0,4)),40,.012,12,false),MAT.chrome));
   put(g,new THREE.Mesh(cylG(.02,.02,.04,18),MAT.metal),.37,.12,.12,0,0,Math.PI/2);}
  {const g=vpart('spill');put(g,new THREE.Mesh(cylG(.032,.032,.04,24),MAT.metal),-.22,.19,.14);put(g,new THREE.Mesh(new THREE.SphereGeometry(.03,24,12,0,Math.PI*2,0,Math.PI/2),glass(0xF0FAFF,.3)),-.22,.21,.14);
   vA.spillDisc=put(g,new THREE.Mesh(cylG(.022,.022,.003,20),std(0xE9E2C6,.4)),-.22,.213,.14);
   put(g,corrugated(new THREE.CatmullRomCurve3(v3([[-.25,.2,.14],[-.31,.2,.12],[-.33,.16,.0],[-.31,.12,-.16]])),.011,std(0x8E959B,.5)));}
  {const g=vpart('port');put(g,new THREE.Mesh(cylG(.015,.015,.14,18),MAT.chrome),-.06,.12,.26,Math.PI/2);put(g,corrugated(new THREE.CatmullRomCurve3(v3([[-.06,.12,.33],[-.06,.12,.42],[-.1,.08,.52],[-.2,.03,.6]])),.014,MAT.hose));}
  {const g=vpart('exhaust');put(g,new THREE.Mesh(cylG(.022,.022,.05,18),MAT.metal),.17,.195,-.12);put(g,new THREE.Mesh(cylG(.028,.028,.012,18),MAT.dark),.17,.226,-.12);}
  const VPARTS={
    housing:[ATLAS.t("app.591"),ATLAS.t("app.592")],
    bellows:[ATLAS.t("app.593"),ATLAS.t("app.594")],
    drive:[ATLAS.t("app.595"),ATLAS.t("app.596")],
    spill:[ATLAS.t("app.597"),ATLAS.t("app.598")],
    port:[ATLAS.t("app.599"),ATLAS.t("app.600")],
    exhaust:[ATLAS.t("app.601"),ATLAS.t("app.602")],
    base:[ATLAS.t("app.603"),ATLAS.t("app.604")]
  };
  Object.values(vg).forEach(g=>g.traverse(o=>{if(o.isMesh&&!o.userData.nopick){o.material=o.material.clone();o.userData.baseEm=o.material.emissive?o.material.emissive.clone():null;}}));
  const vAnch={housing:[.07,.55,.0],bellows:[-.06,.45,.12],drive:[.3,.13,.13],spill:[-.22,.25,.14],port:[-.06,.12,.4],exhaust:[.17,.25,-.12],base:[.2,.15,.2]};
  const vInfo=$('#ventInfo');
  function vDefault(){vInfo.innerHTML=ATLAS.template("app.605")``;}
  function vSel(k){Object.entries(vg).forEach(([key,g])=>g.traverse(o=>{if(o.isMesh&&o.material.emissive){o.material.emissive.copy(key===k?lin(0x2F6BFF):o.userData.baseEm);o.material.emissiveIntensity=key===k?.55:1;}}));
    VV.pins.forEach(p=>p.el.classList.toggle('on',p.key===k));
    if(!k||!VPARTS[k]){vDefault();return;}const [t,b]=VPARTS[k];vInfo.innerHTML=ATLAS.template("app.606")`${t}${b}`;
    vInfo.querySelector('[data-clear]').addEventListener('click',()=>vSel(null));}
  Object.keys(VPARTS).forEach((k,i)=>VV.addPin(k,String(i+1),new THREE.Vector3(...vAnch[k]),VPARTS[k][0]));
  VV.onPick=vSel;VV.onReset=()=>vSel(null);vDefault();
  const vDummy=new THREE.Object3D();const arrows=new THREE.InstancedMesh(new THREE.ConeGeometry(.012,.03,10),new THREE.MeshBasicMaterial({color:lin(0x5AA9FF),toneMapped:false}),8);arrows.userData.nopick=true;arrows.frustumCulled=false;VR.add(arrows);
  const au=Array.from({length:8},(_,i)=>i/8),ap=new THREE.Vector3(),at=new THREE.Vector3(),up=new THREE.Vector3(0,1,0);
  let vh=.38;
  VV.tick.push(dt=>{const c=VENT.cur;const frac=clamp((c.V-VENT.ref)/VENT.bellRange,0,.85);const th=.38*(1-frac);vh+=(th-vh)*Math.min(1,dt*20);
    vA.bel.scale.y=vh;vA.top.position.y=.206+vh;
    const insp=c.F>.001;vA.drive.material.opacity+=((insp?.06+.22*clamp(c.F/(VENT.bellRange*.8),0,1):.03)-vA.drive.material.opacity)*Math.min(1,dt*8);
    vA.spillDisc.position.y+=((!insp&&frac<.02?.222:.213)-vA.spillDisc.position.y)*Math.min(1,dt*15);
    arrows.visible=insp;if(insp){for(let i=0;i<8;i++){au[i]=(au[i]+dt*.9)%1;driveCurve.getPointAt(au[i],ap);driveCurve.getTangentAt(au[i],at);vDummy.position.copy(ap);vDummy.quaternion.setFromUnitVectors(up,at);vDummy.updateMatrix();arrows.setMatrixAt(i,vDummy.matrix);}arrows.instanceMatrix.needsUpdate=true;}
  });

  /* ═════════ MONİTÖR 3B ═════════ */
  const VMo=new Viewer($('#stageMon'),{target:[0,.56,0],dist:1.12,theta:.32,phi:1.42,minD:.45,maxD:2.4,fov:30,shadow:.8,groundR:.8,panLim:.6,fitAspect:1.7});
  {const MR=VMo.root;put(MR,rbox(.58,.42,.07,.022,MAT.black),0,.58,0);
   const scr=new THREE.Mesh(new THREE.PlaneGeometry(.5,.3125),new THREE.MeshBasicMaterial({map:monTexB,toneMapped:false}));scr.position.set(0,.6,.0362);MR.add(scr);
   for(let i=0;i<6;i++)put(MR,new THREE.Mesh(new THREE.BoxGeometry(.04,.012,.006),MAT.dark),-.2+i*.058,.395,.036);
   put(MR,new THREE.Mesh(cylG(.022,.022,.016,28),MAT.metal),.235,.397,.04,Math.PI/2);
   put(MR,new THREE.Mesh(new THREE.TorusGeometry(.09,.012,10,32,Math.PI),MAT.shell2),0,.79,-.005);
   put(MR,new THREE.Mesh(cylG(.025,.025,.36,20),MAT.metal),0,.2,-.06);put(MR,new THREE.Mesh(cylG(.16,.18,.025,40),MAT.dark),0,.012,-.06);
   put(MR,new THREE.Mesh(new THREE.BoxGeometry(.12,.08,.04),MAT.dark),0,.38,-.06);
   put(MR,new THREE.Mesh(new THREE.SphereGeometry(.006,10,8),new THREE.MeshBasicMaterial({color:0x3CF06E})),.26,.785-.4,.036);}
  VMo.onPick=null;

  VM.keepView=()=>!!selected;
}catch(err){console.error(err);VM=null;}}
if(!VM){['#stageMachine','#stageVent','#stageMon'].forEach(s=>{const el=$(s);if(el&&!el.querySelector('canvas.gl'))failStage(el,ATLAS.t("app.607"));});}
/* ───────────── MONİTÖR BÖLÜMÜ: OLAYLAR ───────────── */
let lastActionFeedback=null;
const catNames=Object.fromEntries(MON.CATS);
$('#catalog').innerHTML=MON.CATS.map(([c,name])=>{const items=Object.entries(MON.SCN).filter(([,s])=>s.c===c);
  return `<div class="card cat"><h4>${name} <span class="muted mono" style="font-weight:500">${items.length}</span></h4><div class="cat-list">${items.map(([k,s])=>`<button type="button" data-k="${k}" aria-pressed="${k==='normal'}">${s.n}</button>`).join('')}</div></div>`;}).join('');
$('#catalog').addEventListener('click',e=>{const b=e.target.closest('button[data-k]');if(!b)return;MON.set(b.dataset.k);
  const ev=$('#evCard');if(!ev.closest('.is-fs'))ev.scrollIntoView({behavior:RM?'auto':'smooth',block:'nearest'});});
$('#btnHidden').addEventListener('click',()=>{
  const ks=Object.keys(MON.SCN).filter(k=>MON.SCN[k].c!=='hasta'&&k!==MON.state().key);
  MON.set(ks[Math.floor(Math.random()*ks.length)],true);
  const ev=$('#evCard');
  const target=ev.closest('.is-fs')?ev:ev.closest('.mon-grid');
  (target||ev).scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});
});
$('#btnReset').addEventListener('click',()=>MON.reset());
const fmtAgo=t=>{const m=Math.floor((MON.simNow()-t)/60);return m<1?ATLAS.t("app.608"):m+ATLAS.t("app.609");};
const fmtT=s=>{s=Math.floor(s);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');};
function renderEvent(fb){lastActionFeedback=fb;const st=MON.state(),sc=st.sc,h=st.hid,k=st.key;
  $$('#catalog button').forEach(b=>b.setAttribute('aria-pressed',!h&&b.dataset.k===k));
  const opts=(sc.opts||[]).slice().sort((a,b)=>MON.ACT[a].localeCompare(MON.ACT[b],ATLAS.t("app.610")));
  $('#evCard').innerHTML=ATLAS.template("app.611")`${k==='normal'?ATLAS.t("app.612"):h?ATLAS.t("app.613"):ATLAS.t("app.614")+catNames[sc.c].toLocaleUpperCase(ATLAS.locale)}${h?ATLAS.t("app.615"):sc.n}${MON.getK()>1?' · '+MON.getK()+ATLAS.t("app.616"):''}${h?ATLAS.t("app.617"):sc.d}${!h&&sc.sg?ATLAS.template("app.618")`${sc.sg}`:''}${opts.length?ATLAS.template("app.619")`${opts.map(a=>`<button type="button" data-a="${a}">${MON.ACT[a]}</button>`).join('')}`:''}${fb?`<div class="fb ${fb.lv}">${fb.msg}</div>`:''}${h?ATLAS.t("app.620"):''}${k!=='normal'?ATLAS.t("app.621"):''}`;}
$('#evCard').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.a){const before=caseVitals();caseEmit('action',{name:MON.ACT[b.dataset.a],before});MON.act(b.dataset.a);if(lastActionFeedback)caseEmit('feedback',{feedback:lastActionFeedback.msg,level:lastActionFeedback.lv});}else if(b.hasAttribute('data-reveal'))MON.reveal();else if(b.hasAttribute('data-stop')){if(CS.run?.cur)evClose(true);MON.set('normal');}});
MON.onSet((k,fb)=>{renderEvent(fb);if(k!=='normal')PROGRESS.record({kind:'scenario',id:k,stage:2});});
renderEvent(null);
function renderPt(){const st=MON.state(),P=st.P,S=st.S,f=(v,d=0)=>nf(v,d);
  const cls=(v,w,c,inv)=>inv?(v>c?'c':v>w?'w':''):(v<c?'c':v<w?'w':'');
  const items=[
    [ATLAS.t("app.622"),ATLAS.percent(f(P.fiInsp*100)),cls(P.fiInsp*100,25,21)],
    ['PaO₂',f(P.PaO2)+' mmHg',cls(P.PaO2,80,60)],
    ['PaCO₂',f(P.PaCO2)+' mmHg',cls(P.PaCO2,50,70,true)],
    [ATLAS.t("app.623"),ATLAS.percent(f(P.sa)),cls(P.sa,92,85)],
    ['COHb',ATLAS.percent(f(P.coHb,1)),cls(P.coHb,3,10,true)],
    [ATLAS.t("app.624"),ATLAS.percent(f(P.vEff*100)),cls(P.vEff*100,70,40)],
    [ATLAS.t("app.625"),ATLAS.percent(f(P.circ*100)),cls(P.circ*100,70,40)],
    [ATLAS.t("app.626"),(st.mit.tiva?ATLAS.t("app.627"):'')+f(S.depth,2)+ATLAS.t("app.628"),S.depth<.5?'w':S.depth>2?'c':S.depth>1.5?'w':''],
    [ATLAS.t("app.629"),st.arrest?ATLAS.t("app.630"):f(P.sys)+'/'+f(P.dia),st.arrest||P.sys<70?'c':P.sys<90?'w':''],
    [ATLAS.t("app.631"),ATLAS.percent(f(Math.min(100,P.Hx*100))),P.Hx>.3?'c':P.Hx>.15?'w':'']];
  $('#ptGrid').innerHTML=items.map(([k,v,c])=>`<div class="stat ${c}"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('')+(st.arrest?ATLAS.t("app.632")+({pea:ATLAS.t("app.633"),asys:ATLAS.t("app.634"),vf:ATLAS.t("app.635")})[st.arrest.type]+ATLAS.t("app.636"):'');
  const nb=$('#nibpInfo');if(nb){const n=st.nibp;nb.textContent=n.measuring?ATLAS.t("app.637")+Math.round(n.cuff)+' mmHg':ATLAS.t("app.638")+(n.ok?Math.round(n.sys)+'/'+Math.round(n.dia):ATLAS.t("app.639"))+' · '+fmtAgo(n.t);}
  const t=$('#evT');if(t)t.textContent=fmtT(st.scT);
  const hs=$('#hSp');if(hs){hs.textContent=S.probeOff?'--':ATLAS.percent(Math.round(S.spo2));hs.parentNode.className='stat '+(S.probeOff?'':cls(S.spo2,94,90));
    $('#hPa').innerHTML=Math.round(P.PaO2)+'<small>mmHg</small>';$('#hPa').parentNode.className='stat '+cls(P.PaO2,80,60);
    $('#hEt').innerHTML=Math.round(S.et)+'<small>mmHg</small>';$('#hEv').textContent=st.key==='normal'?ATLAS.t("app.640"):(st.hid?ATLAS.t("app.641"):st.sc.n);}
}
renderPt();
$('#speedChips').addEventListener('click',e=>{const b=e.target.closest('button[data-k]');if(!b)return;MON.setK(+b.dataset.k);$$('#speedChips button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderEvent(null);});
$('#nibpBtn').addEventListener('click',()=>MON.nibpNow());
$('#nibpCycle').addEventListener('change',e=>MON.setCycle(+e.target.value));
$('#artChk').addEventListener('change',e=>MON.setArt(e.target.checked));
const monFlat=$('#monFlat');let monFlatVis=false;
function flat(on){const st=$('#stageMon');if(on){monFlat.appendChild(MON.canvas);monFlat.hidden=false;st.hidden=true;}else{monFlat.hidden=true;st.hidden=false;}monFlatVis=on;}
$('#monFlatBtn').addEventListener('click',()=>flat(true));$('#mon3DBtn').addEventListener('click',()=>flat(false));
if(!has3D||!VM)flat(true);
new IntersectionObserver(es=>{for(const e of es)monFlat.dataset.vis=e.isIntersecting?'1':'';},{rootMargin:'100px'}).observe(monFlat);

/* ───────────── VENTİLATÖR KONTROLLERİ ───────────── */
const VP=VENT.P;
const PRE={adult:{[ATLAS.t("app.642")]:{C:50,R:10,vt:450,rr:12,peep:5,ie:2,eff:0},'ARDS':{C:22,R:12,vt:420,rr:20,peep:10,ie:2,eff:0},[ATLAS.t("app.643")]:{C:55,R:35,vt:500,rr:18,peep:5,ie:2,eff:0},[ATLAS.t("app.644")]:{C:28,R:14,vt:450,rr:14,peep:8,ie:2,eff:0},[ATLAS.t("app.645")]:{C:50,R:10,vt:450,rr:8,peep:5,ie:2,eff:6,srr:16}},
  child:{[ATLAS.t("app.646")]:{C:20,R:20,vt:140,rr:20,peep:5,ie:2,eff:0},[ATLAS.t("app.647")]:{C:18,R:50,vt:140,rr:24,peep:5,ie:2,eff:0},'PARDS':{C:8,R:20,vt:120,rr:28,peep:8,ie:2,eff:0},[ATLAS.t("app.648")]:{C:20,R:20,vt:140,rr:14,peep:5,ie:2,eff:4,srr:24}},
  infant:{[ATLAS.t("app.649")]:{C:5,R:40,vt:35,rr:30,peep:5,ie:2,eff:0},[ATLAS.t("app.650")]:{C:4,R:90,vt:35,rr:35,peep:5,ie:2,eff:0},[ATLAS.t("app.651")]:{C:2.5,R:40,vt:30,rr:40,peep:6,ie:2,eff:0},[ATLAS.t("app.652")]:{C:5,R:40,vt:35,rr:20,peep:5,ie:2,eff:3,srr:40}}};
const PTR={adult:{vtS:[200,1000,10],cS:[10,100,1],rS:[2,50,1],rrS:[6,35,1],trig:2},child:{vtS:[50,400,5],cS:[5,60,1],rS:[5,80,1],rrS:[10,40,1],wt:[10,40,.5,20],trig:1},infant:{vtS:[15,100,1],cS:[1,15,.5],rS:[10,150,1],rrS:[15,60,1],wt:[2,10,.1,5],trig:.5}};
const vctl={vtS:['vt','vtO'],piS:['pinsp','piO'],psS:['ps','psO'],rrS:['rr','rrO'],peS:['peep','peO'],cS:['C','cO'],rS:['R','rO'],hS:['h','hO'],wtS:['wt','wtO'],efS:['eff','efO'],srS:['srr','srO'],etS:['effT','etO'],tgS:['trig','tgO'],cyS:['cyc','cyO']};
function vRows(){const m=MODES[VP.mode],map={vt:'rowVt',pi:'rowPi',ps:'rowPs',rr:'rowRr',ie:'rowIe'};Object.entries(map).forEach(([k,id])=>$('#'+id).hidden=!m.rows.includes(k));
  $('#modeName').textContent=m.n;$('#modeSet').textContent=ATLAS.t("app.653")+m.set+ATLAS.t("app.654")+m.out;$('#ventExplain').textContent=m.d;
  $('#rowRr label').textContent=VP.mode==='SIMV'?ATLAS.t("app.655"):ATLAS.t("app.656");$('#rowCy').hidden=!(VP.mode==='PSV'||VP.mode==='SIMV');}
function vSync(){Object.entries(vctl).forEach(([id,[k,o]])=>{const el=$('#'+id);VP[k]=+el.value;$('#'+o).textContent=Number(el.value).toLocaleString(ATLAS.locale,{maximumFractionDigits:2});});VP.ie=IE[+$('#ieS').value];$('#ieO').textContent=VP.ie;VENT.rebuild();}
Object.keys(vctl).concat(['ieS']).forEach(id=>$('#'+id).addEventListener('input',()=>{$$('#vPresets button,#asyncPresets button').forEach(b=>b.setAttribute('aria-pressed','false'));vSync();}));
function renderPresets(){$('#vPresets').innerHTML=Object.keys(PRE[VP.pt]).map((k,i)=>`<button type="button" data-p="${k}" aria-pressed="${i===0}">${k}</button>`).join('');}
function applyPreset(p){$('#cS').value=p.C;$('#rS').value=p.R;$('#vtS').value=p.vt;$('#rrS').value=p.rr;$('#peS').value=p.peep;$('#ieS').value=p.ie;$('#efS').value=p.eff;if(p.srr)$('#srS').value=p.srr;vSync();}
$('#vPresets').addEventListener('click',e=>{const b=e.target.closest('button[data-p]');if(!b)return;$$('#vPresets button').forEach(x=>x.setAttribute('aria-pressed',x===b));$$('#asyncPresets button').forEach(x=>x.setAttribute('aria-pressed','false'));applyPreset(PRE[VP.pt][b.dataset.p]);});
function setMode_(m){VP.mode=m;$$('[data-mode]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.mode===m));}
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{setMode_(b.dataset.mode);
  if((VP.mode==='PSV'||VP.mode==='CPAP'||VP.mode==='SIMV')&&+$('#efS').value<3){$('#efS').value=VP.pt==='adult'?6:4;}
  vRows();vSync();VENT.rebuild(true);}));
$$('[data-sex]').forEach(b=>b.addEventListener('click',()=>{VP.sex=b.dataset.sex;$$('[data-sex]').forEach(x=>x.setAttribute('aria-pressed',x===b));VENT.rebuild();}));
function setPt(pt,skip){VP.pt=pt;const R=PTR[pt],ad=pt==='adult';$$('#ptSeg [data-pt]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.pt===pt));
  $('#rowH').hidden=!ad;$('#sexSeg').hidden=!ad;$('#rowWt').hidden=ad;
  ['vtS','cS','rS','rrS'].forEach(id=>{const el=$('#'+id),[a,b,s]=R[id];el.min=a;el.max=b;el.step=s;});
  if(!ad){const el=$('#wtS'),[a,b,s,v]=R.wt;el.min=a;el.max=b;el.step=s;el.value=v;}
  $('#tgS').value=R.trig;renderPresets();
  if(!skip){setMode_('VCV');vRows();applyPreset(PRE[pt][Object.keys(PRE[pt])[0]]);}else vSync();VENT.rebuild(true);}
$('#ptSeg').addEventListener('click',e=>{const b=e.target.closest('[data-pt]');if(!b||b.dataset.pt===VP.pt)return;$$('#asyncPresets button').forEach(x=>x.setAttribute('aria-pressed','false'));setPt(b.dataset.pt);VENT.clearAsync();});
/* asenkroni örnekleri */
const ASY={
  ET:{n:ATLAS.t("app.657"),m:'VCV',v:{cS:60,rS:30,vtS:600,rrS:20,ieS:2,peS:0,efS:4,srS:23,etS:.8,tgS:2,cyS:25},
    how:ATLAS.t("app.658"),
    why:ATLAS.t("app.659"),
    fix:ATLAS.t("app.660")},
  [ATLAS.t("app.661")]:{n:ATLAS.t("app.662"),m:'VCV',v:{cS:50,rS:10,vtS:350,rrS:14,ieS:4,peS:5,efS:10,srS:14,etS:1.8,tgS:2,cyS:25},
    how:ATLAS.t("app.663"),
    why:ATLAS.t("app.664"),
    fix:ATLAS.t("app.665")},
  AA:{n:ATLAS.t("app.666"),m:'VCV',v:{cS:50,rS:10,vtS:400,rrS:12,ieS:0,peS:5,efS:10,srS:18,etS:1,tgS:2,cyS:25},
    how:ATLAS.t("app.667"),
    why:ATLAS.t("app.668"),
    fix:ATLAS.t("app.669")},
  GD:{n:ATLAS.t("app.670"),m:'PSV',v:{cS:60,rS:30,psS:15,peS:5,efS:6,srS:15,etS:.8,tgS:2,cyS:10},
    how:ATLAS.t("app.671"),
    why:ATLAS.t("app.672"),
    fix:ATLAS.t("app.673")}};
$('#asyncPresets').innerHTML=Object.entries(ASY).map(([k,a])=>`<button type="button" data-a="${k}" aria-pressed="false">${a.n}</button>`).join('');
function asyncInfo(k){const a=ASY[k];$('#asyncInfo').innerHTML=a?ATLAS.template("app.674")`${a.n}${a.how}${a.why}${a.fix}`:
  ATLAS.t("app.675");}
function applyAsync(k){const a=ASY[k];setPt('adult',true);setMode_(a.m);Object.entries(a.v).forEach(([id,v])=>{$('#'+id).value=v;});vRows();vSync();VENT.rebuild(true);VENT.clearAsync();
  $$('#asyncPresets button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.a===k));$$('#vPresets button').forEach(x=>x.setAttribute('aria-pressed','false'));asyncInfo(k);}
$('#asyncPresets').addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b)applyAsync(b.dataset.a);});
asyncInfo(null);renderPresets();vRows();vSync();VENT.rebuild(true);
let ventVis=false;new IntersectionObserver(es=>{for(const e of es)ventVis=e.isIntersecting;},{rootMargin:'150px'}).observe($('#ventilator'));

/* ───────────── GÜVENLİK ───────────── */
const PINS={'O₂':[2,5],'N₂O':[3,5],[ATLAS.t("app.676")]:[1,5],'CO₂':[1,6],'Entonox':[7]};let pinSel='O₂';
$('#pinGas').innerHTML=Object.keys(PINS).map(k=>`<button type="button" data-g="${k}" aria-pressed="${k==='O₂'}">${k}</button>`).join('');
$('#pinGas').addEventListener('click',e=>{const b=e.target.closest('button[data-g]');if(!b)return;pinSel=b.dataset.g;$$('#pinGas button').forEach(x=>x.setAttribute('aria-pressed',x===b));pinDraw();});
function pinDraw(){const cx=160,cy=40,R=110,on=PINS[pinSel];let s=ATLAS.template("app.677")`${cx}${cy+18}${cx}${cy+50}`;
  const pos=k=>{const ph=(k===7?0:(k-3.5))*12*Math.PI/180;return[cx+R*Math.sin(ph),cy+R*Math.cos(ph)];};
  for(const k of [1,2,3,4,5,6,7]){const [x,y]=pos(k),a=on.includes(k),r=k===7?7:9;s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${a?'var(--accent)':'var(--paper)'}" stroke="var(--ink)" stroke-width="1.5"/><text x="${x}" y="${y+(k===7?-12:26)}" text-anchor="middle" font-size="12" ${a?'font-weight="700"':'class="dim"'}>${k}</text>`;}
  s+=`<text x="${cx}" y="192" text-anchor="middle" font-size="13" font-weight="700">${pinSel}: ${on.join(' – ')}</text>`;$('#pinFig').innerHTML=s;}
pinDraw();
const CK=[ATLAS.t("app.678"),ATLAS.t("app.679"),ATLAS.t("app.680"),ATLAS.t("app.681"),ATLAS.t("app.682"),ATLAS.t("app.683"),ATLAS.t("app.684"),ATLAS.t("app.685"),ATLAS.t("app.686"),ATLAS.t("app.687"),ATLAS.t("app.688"),ATLAS.t("app.689"),ATLAS.t("app.690"),ATLAS.t("app.691"),ATLAS.t("app.692")];
const ckState=store.get('anm-ck',{});
$('#checklist').innerHTML=CK.map((t,i)=>`<li><label for="ck${i}"><input type="checkbox" id="ck${i}" ${ckState[i]?'checked':''}><span>${t}</span></label></li>`).join('');
function ckBar(){const n=$$('#checklist input:checked').length;$('#ckBar').style.width=(n/CK.length*100)+'%';}
$('#checklist').addEventListener('change',e=>{const i=+e.target.id.slice(2);ckState[i]=e.target.checked;store.set('anm-ck',ckState);ckBar();});
$('#ckReset').addEventListener('click',()=>{$$('#checklist input').forEach(c=>c.checked=false);Object.keys(ckState).forEach(k=>delete ckState[k]);store.set('anm-ck',{});ckBar();});
ckBar();

/* ───────────── TEST ───────────── */
const QZ=[
 [ATLAS.t("app.693"),[ATLAS.t("app.694"),ATLAS.t("app.695"),ATLAS.t("app.696")],1,ATLAS.t("app.697")],
 [ATLAS.t("app.698"),[ATLAS.t("app.699"),ATLAS.t("app.700"),ATLAS.t("app.701")],1,ATLAS.t("app.702")],
 [ATLAS.t("app.703"),[ATLAS.t("app.704"),ATLAS.t("app.705"),ATLAS.t("app.706")],1,ATLAS.t("app.707")],
 [ATLAS.t("app.708"),[ATLAS.t("app.709"),ATLAS.t("app.710"),ATLAS.t("app.711")],0,ATLAS.t("app.712")],
 [ATLAS.t("app.713"),[ATLAS.t("app.714"),ATLAS.t("app.715"),ATLAS.t("app.716")],1,ATLAS.t("app.717")],
 [ATLAS.t("app.718"),[ATLAS.t("app.719"),ATLAS.t("app.720"),ATLAS.t("app.721")],1,ATLAS.t("app.722")],
 [ATLAS.t("app.723"),[ATLAS.t("app.724"),ATLAS.t("app.725"),ATLAS.t("app.726")],2,ATLAS.t("app.727")]
];
let score=0;
$('#quiz').innerHTML=QZ.map(([q,o],i)=>ATLAS.template("app.728")`${i}${i+1}${q}${o.map((t,j)=>`<button type="button" data-j="${j}">${t}</button>`).join('')}`).join('');
$('#quiz').addEventListener('click',e=>{const b=e.target.closest('.opts button');if(!b||b.disabled)return;const card=b.closest('.q'),i=+card.dataset.i,j=+b.dataset.j,[,,ans,ex]=QZ[i];
  card.querySelectorAll('.opts button').forEach((x,k)=>{x.disabled=true;if(k===ans)x.classList.add('right');});if(j!==ans)b.classList.add('wrong');else score++;
  document.dispatchEvent(new CustomEvent('anm-progress',{detail:{kind:'quiz',id:'q'+(i+1),score:null,ok:j===ans}}));
  const p=card.querySelector('.exp');p.hidden=false;p.textContent=(j===ans?ATLAS.t("app.729"):ATLAS.t("app.730"))+ex;$('#score').textContent=score+' / '+QZ.length+ATLAS.t("app.731");});

/* ───────────── HASTA TİPİ, RAKIM, VAKA MODU ───────────── */
$('#ptChips').addEventListener('click',e=>{const b=e.target.closest('button[data-p]');if(!b)return;MON.setPatient(b.dataset.p);$$('#ptChips button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
$('#altChipsMon').addEventListener('click',e=>{const b=e.target.closest('button[data-h]');if(!b)return;ALT.h=+b.dataset.h;$$('#altChipsMon button').forEach(x=>x.setAttribute('aria-pressed',x===b));});
const CASES=[
  {id:'lapkole',n:ATLAS.t("app.732"),pt:'adult',dur:900,ev:[[120,'bronko'],[380,'absorban'],[640,'disc']]},
  {id:'tonsil',n:ATLAS.t("app.733"),pt:'child',dur:780,ev:[[90,'obstruction'],[330,'leak'],[560,'probe']]},
  {id:'laparotomi',n:ATLAS.t("app.734"),pt:'adult',dur:960,ev:[[100,'vapEmpty'],[360,'o2fail'],[640,'emboli']]},
  {id:'bebek',n:ATLAS.t("app.735"),pt:'infant',dur:720,ev:[[80,'ozofagus'],[330,'hypoxic'],[540,'switchWrong']]}];
const EV_TIMEOUT=240;
$('#caseSel').innerHTML=CASES.map(c=>`<option value="${c.id}">${c.n}</option>`).join('');
const CS={run:null};
function caseVitals(){const {S}=MON.state();return {spo2:S.probeOff?null:Math.round(S.spo2),hr:Math.round(S.hr),et:Math.round(S.et)};}
function caseEmit(type,extra={}){document.dispatchEvent(new CustomEvent('atlas:case',{detail:{type,time:CS.run?MON.simNow()-CS.run.t0:0,vitals:caseVitals(),...extra}}));}
let caseSample=0;
frameHooks.push(()=>{if(!CS.run)return;const elapsed=MON.simNow()-CS.run.t0;if(elapsed-caseSample>=10){caseSample=elapsed;caseEmit('observe');}if(elapsed<caseSample)caseSample=elapsed;});
function caseStart(){if(CS.run)return;const c=CASES.find(x=>x.id===$('#caseSel').value);MON.setPatient(c.pt);
  $$('#ptChips button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.p===c.pt));
  CS.run={c,t0:MON.simNow(),i:0,cur:null,log:[]};$('#caseSel').disabled=true;$('#ptChips').inert=true;PROGRESS.record({kind:'case',id:c.id,stage:2});caseEmit('start',{name:c.n});$('#caseRun').hidden=false;$('#caseStop').hidden=false;$('#caseStart').hidden=true;$('#caseRep').innerHTML='';
  if(!$('#caseCard').closest('.is-fs,dialog'))$('#evCard').scrollIntoView({behavior:RM?'auto':'smooth',block:'nearest'});}
function evClose(missed){const r=CS.run,e=r.cur;if(!e)return;e.t=MON.simNow()-e.t0;e.missed=missed;r.log.push(e);caseEmit('resolved',{name:MON.SCN[e.k].n,missed:!!missed,arrest:!!e.arrest});r.cur=null;if(missed)MON.set('normal');}
function evScore(e){if(e.missed||e.arrest)return 0;let s=40+60*Math.max(0,1-e.t/EV_TIMEOUT)-10*e.wrong-(e.minSp<90?20:0);return Math.round(clamp(s,0,100));}
function caseEnd(stopped){const r=CS.run;if(!r)return;if(r.cur)evClose(true);caseEmit('end',{stopped:!!stopped});CS.run=null;$('#caseSel').disabled=false;$('#ptChips').inert=false;
  $('#caseRun').hidden=true;$('#caseStop').hidden=true;$('#caseStart').hidden=false;
  const sc=r.log.length?Math.round(r.log.reduce((a,e)=>a+evScore(e),0)/r.c.ev.length):0;
  $('#caseRep').innerHTML=ATLAS.template("app.736")`${r.c.n}${stopped?ATLAS.t("app.737"):''}${sc}${r.log.map(e=>ATLAS.template("app.738")`${MON.SCN[e.k].n}${e.missed?'—':fmtT(e.t)}${e.wrong}${Math.round(e.minSp)}${e.arrest?ATLAS.t("app.739"):e.missed?ATLAS.t("app.740"):ATLAS.t("app.741")}${evScore(e)}`).join('')}${r.log.map(e=>`<div class="fb ${e.missed||e.arrest?'bad':'ok'}"><b>${MON.SCN[e.k].n}:</b> ${MON.SCN[e.k].ok}</div>`).join('')}${EV_TIMEOUT/60}`;
  try{document.dispatchEvent(new CustomEvent('anm-progress',{detail:{kind:'case',id:r.c.id,score:sc,ok:!stopped&&r.log.length===r.c.ev.length&&r.log.every(e=>!e.missed&&!e.arrest)}}));}catch(e){}}
$('#caseStart').addEventListener('click',caseStart);$('#caseStop').addEventListener('click',()=>caseEnd(true));
MON.onSet((k,fb)=>{const r=CS.run;if(!r||!r.cur||!fb)return;if(fb.lv==='bad')r.cur.wrong++;if(fb.lv==='ok'&&k==='normal')evClose(false);});
frameHooks.push(()=>{const r=CS.run;if(!r)return;const now=MON.simNow(),el=now-r.t0,st=MON.state();
  if(r.cur){r.cur.minSp=Math.min(r.cur.minSp,st.S.probeOff?r.cur.minSp:st.S.spo2);if(st.arrest)r.cur.arrest=true;if(now-r.cur.t0>EV_TIMEOUT)evClose(true);}
  else if(r.i<r.c.ev.length&&el>=r.c.ev[r.i][0]){const k=r.c.ev[r.i][1];r.i++;r.cur={k,t0:now,wrong:0,minSp:st.S.spo2,arrest:false};MON.set(k,true);caseEmit('event');}
  else if(r.i>=r.c.ev.length&&el>=r.c.dur){caseEnd(false);return;}
  $('#caseBar').style.width=Math.min(100,el/r.c.dur*100)+'%';
  $('#caseStat').textContent=ATLAS.template("app.742")`${fmtT(el)}${fmtT(r.c.dur)}${r.i}${r.c.ev.length}${r.cur?ATLAS.t("app.743")+fmtT(now-r.cur.t0):ATLAS.t("app.744")}${MON.getK()}`;});

/* ───────────── UYGULAMALI MAKİNE KONTROLÜ ───────────── */
(function(){
const CKF={
  none:{n:ATLAS.t("app.745"),step:null,note:ATLAS.t("app.746")},
  emptyCyl:{n:ATLAS.t("app.747"),step:'cyl',part:'cylinders',note:ATLAS.t("app.748")},
  brokenTube:{n:ATLAS.t("app.749"),step:'lp',part:'flowmeters',note:ATLAS.t("app.750")},
  fillerCap:{n:ATLAS.t("app.751"),step:'lp',part:'vaporizers',note:ATLAS.t("app.752")},
  o2cal:{n:ATLAS.t("app.753"),step:'o2',part:'o2sensor',note:ATLAS.t("app.754")},
  absorb:{n:ATLAS.t("app.755"),step:'abs',part:'absorber',note:ATLAS.t("app.756")},
  hose:{n:ATLAS.t("app.757"),step:'circ',part:'hoses',note:ATLAS.t("app.758")},
  expValve:{n:ATLAS.t("app.759"),step:'valve',part:'valves',note:ATLAS.t("app.760")},
  bellows:{n:ATLAS.t("app.761"),step:'vent',part:'bellows',note:ATLAS.t("app.762")},
  scav:{n:ATLAS.t("app.763"),step:'scav',part:'apl',note:ATLAS.t("app.764")}
};
const CKS=[
  {k:'cyl',n:ATLAS.t("app.765"),part:'cylinders',t:ATLAS.t("app.766")},
  {k:'pipe',n:ATLAS.t("app.767"),part:'pipeline',t:ATLAS.t("app.768")},
  {k:'lp',n:ATLAS.t("app.769"),part:'cgo',t:ATLAS.t("app.770")},
  {k:'o2',n:ATLAS.t("app.771"),part:'o2sensor',t:ATLAS.t("app.772")},
  {k:'abs',n:ATLAS.t("app.773"),part:'absorber',t:ATLAS.t("app.774")},
  {k:'circ',n:ATLAS.t("app.775"),part:'hoses',t:ATLAS.t("app.776")},
  {k:'valve',n:ATLAS.t("app.777"),part:'valves',t:ATLAS.t("app.778")},
  {k:'vent',n:ATLAS.t("app.779"),part:'bellows',t:ATLAS.t("app.780")},
  {k:'scav',n:ATLAS.t("app.781"),part:'apl',t:ATLAS.t("app.782")}
];
// saf fonksiyon: bir arızada bir adımın gerçek sonucu (opts.vapOn: düşük basınç testinde vaporizatör açık mı)
function ckOutcome(f,k,o){o=o||{};
  if(k==='lp'){if(f==='brokenTube')return'fail';if(f==='fillerCap')return o.vapOn?'fail':'pass';return'pass';}
  return CKF[f]&&CKF[f].step===k?'fail':'pass';}
const S={f:'none',cur:'cyl',done:{},mark:{},lp:{off:false,on:false},finished:false,timer:null};
const $p=()=>$('#cklPane');
function stopTimer(){if(S.timer){clearInterval(S.timer);S.timer=null;}}
function newMachine(){stopTimer();const ks=Object.keys(CKF);S.f=Math.random()<.12?'none':ks.filter(k=>k!=='none')[Math.floor(Math.random()*(ks.length-1))];
  S.done={};S.mark={};S.lp={off:false,on:false};S.finished=false;S.cur='cyl';$('#cklStat').textContent=ATLAS.t("app.783");renderSteps();openStep('cyl');}
function renderSteps(){$('#cklSteps').innerHTML=CKS.map(s=>{const m=S.mark[s.k];let cls=m?(m==='pass'?'pass':'fail'):'';
    if(S.finished&&m)cls+=m===ckOutcome(S.f,s.k,{vapOn:true})?' right':' wrongm';
    return`<li><button type="button" data-s="${s.k}" aria-current="${S.cur===s.k}"><span>${s.n}</span><span class="st ${cls}">${m?(m==='pass'?ATLAS.t("app.784"):ATLAS.t("app.785")):'—'}</span></button></li>`;}).join('')+
  ATLAS.template("app.786")`${S.cur==='dx'}${S.finished?ATLAS.t("app.787"):'—'}`;}
const show3D=k=>ATLAS.template("app.788")`${k}`;
const markBar=k=>ATLAS.template("app.789")`${S.mark[k]==='pass'}${S.done[k]?'':'disabled'}${S.mark[k]==='fail'}${S.done[k]?'':'disabled'}${S.done[k]?'':ATLAS.t("app.790")}`;
function gaugeSVG(val,max,lab,unit){const f=Math.min(1,val/max),a=(135+270*f)*Math.PI/180,cx=110,cy=100;let t='';
  for(let i=0;i<=10;i++){const b=(135+27*i)*Math.PI/180,r2=i%5?70:62;t+=`<line x1="${cx+Math.cos(b)*80}" y1="${cy+Math.sin(b)*80}" x2="${cx+Math.cos(b)*r2}" y2="${cy+Math.sin(b)*r2}" stroke="var(--ink)" stroke-width="${i%5?1.5:3}"/>`;}
  return ATLAS.template("app.791")`${lab}${cx}${cy}${t}${cx-56}${cy+66}${cx+50}${cy+66}${max}${cx}${cy+40}${lab}${cx}${cy+56}${unit}${cx}${cy}${cx+Math.cos(a)*72}${cy+Math.sin(a)*72}${cx}${cy}`;}
function openStep(k){stopTimer();S.cur=k;renderSteps();
  if(k==='dx'){renderDx();return;}
  const s=CKS.find(x=>x.k===k),f=S.f;let test='',act='';
  if(k==='cyl'){S.done[k]=true;const v=f==='emptyCyl'?12:148;test=ATLAS.template("app.792")`${gaugeSVG(v,250,ATLAS.t("app.793"),'bar')}${v}`;}
  else if(k==='pipe'){S.done[k]=true;test=`<div class="ckl-test" style="grid-template-columns:repeat(3,minmax(0,1fr))">${[['O₂',4.1],[ATLAS.t("app.794"),4.0],['N₂O',4.2]].map(([n,v])=>`<div>${gaugeSVG(v,10,n,'bar')}<div class="ckl-read" style="text-align:center">${nf(v,1)}<small>bar</small></div></div>`).join('')}</div>`;}
  else if(k==='lp'){test=ATLAS.template("app.795")`${S.lp.off?ATLAS.t("app.796"):'—'}${S.lp.on?ATLAS.t("app.797"):'—'}`;
    act=ATLAS.template("app.798")``;}
  else if(k==='o2'){test=ATLAS.template("app.799")``;act=ATLAS.template("app.800")``;}
  else if(k==='abs'){S.done[k]=true;const bad=f==='absorb';test=ATLAS.template("app.801")`${bad?130:28}${bad?ATLAS.t("app.802"):ATLAS.t("app.803")}${bad?ATLAS.t("app.804"):ATLAS.t("app.805")}${bad?ATLAS.t("app.806"):ATLAS.t("app.807")}`;}
  else if(k==='circ'){test=ATLAS.template("app.808")``;act=ATLAS.template("app.809")``;drawCirc([]);}
  else if(k==='valve'){test=ATLAS.template("app.810")``;act=ATLAS.template("app.811")``;}
  else if(k==='vent'){test=ATLAS.template("app.812")``;act=ATLAS.template("app.813")``;}
  else if(k==='scav'){S.done[k]=true;const bad=f==='scav';test=ATLAS.template("app.814")`${bad?30:110}${bad?ATLAS.t("app.815"):ATLAS.t("app.816")}${bad?ATLAS.t("app.817"):ATLAS.t("app.818")}`;}
  $p().innerHTML=`<h4>${s.n}</h4><p>${s.t}</p>${test}${act}<div class="ckl-act">${show3D(s.part)}</div>${markBar(k)}`;
  if(k==='lp')drawBulb(1);if(k==='valve')drawValve(0,0);if(k==='vent')drawBel(1);}
function drawBulb(fill){const s=$('#bulbSvg');if(!s)return;const rx=30+40*fill,ry=24+36*fill;s.innerHTML=ATLAS.template("app.819")`${110}${rx}${ry}`;}
function lpRun(vapOn){stopTimer();const leak=ckOutcome(S.f,'lp',{vapOn})==='fail';let t=0,fill=0;drawBulb(0);$('#bulbMsg').textContent=ATLAS.t("app.820");
  S.timer=setInterval(()=>{t+=.1;if(leak)fill=Math.min(1,t/4);drawBulb(fill);$('#bulbT').innerHTML=nf(t,1)+'<small>s</small>';
    if(fill>=1||t>=10){stopTimer();S.lp[vapOn?'on':'off']=true;$('#lpOff').textContent=S.lp.off?ATLAS.t("app.821"):'—';$('#lpOn').textContent=S.lp.on?ATLAS.t("app.822"):'—';
      $('#bulbMsg').textContent=fill>=1?ATLAS.t("app.823")+nf(t,1)+ATLAS.t("app.824"):ATLAS.t("app.825");
      if(S.lp.off&&S.lp.on){S.done.lp=true;const m=$p().querySelector('.ckl-mark');m.outerHTML=markBar('lp');}}},100);}
function drawCirc(pts){const s=$('#circSvg');if(!s)return;const X=t=>20+t*18,Y=p=>130-p*3;let d=pts.map((p,i)=>(i?'L':'M')+X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1)).join(' ');
  s.innerHTML=`<line x1="20" y1="130" x2="200" y2="130" stroke="var(--line)"/><line x1="20" y1="${Y(30)}" x2="200" y2="${Y(30)}" stroke="var(--muted)" stroke-dasharray="4 4"/><text x="200" y="${Y(30)-5}" text-anchor="end" font-size="11">30 cmH₂O</text><text x="20" y="146" font-size="11">0 s</text><text x="200" y="146" text-anchor="end" font-size="11">10 s</text>${d?`<path d="${d}" fill="none" stroke="var(--accent)" stroke-width="3"/>`:''}`;}
function circRun(){stopTimer();const leak=ckOutcome(S.f,'circ')==='fail';let t=0;const pts=[];
  S.timer=setInterval(()=>{t+=.1;const p=leak?30.5*Math.exp(-t/7):30.5-.02*t;pts.push([t,p]);drawCirc(pts);$('#circR').innerHTML=nf(p,1)+'<small>cmH₂O</small>';
    if(t>=10){stopTimer();S.done.circ=true;$p().querySelector('.ckl-mark').outerHTML=markBar('circ');}},100);}
function drawValve(i,e){const s=$('#valveSvg');if(!s)return;const dome=(x,lift,lab)=>`<path d="M${x-30} 80 A30 30 0 0 1 ${x+30} 80 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/><rect x="${x-22}" y="${74-lift}" width="44" height="5" rx="2" fill="#C9B98A"/><text x="${x}" y="104" text-anchor="middle" font-size="12">${lab}</text>`;
  s.innerHTML=dome(60,i,ATLAS.t("app.826"))+dome(160,e,ATLAS.t("app.827"));}
function valveRun(){stopTimer();const stuck=ckOutcome(S.f,'valve')==='fail';let t=0;
  S.timer=setInterval(()=>{t+=.05;const ph=(t%2)/2,insp=ph<.5;drawValve(insp?12:0,stuck?2:(insp?0:12));
    $('#valveMsg').textContent=insp?ATLAS.t("app.828"):ATLAS.t("app.829");if(t>=6){stopTimer();S.done.valve=true;drawValve(0,stuck?2:0);
      $('#valveMsg').textContent=stuck?ATLAS.t("app.830"):ATLAS.t("app.831");$p().querySelector('.ckl-mark').outerHTML=markBar('valve');}},50);}
function drawBel(h){const s=$('#belSvg');if(!s)return;const H=130*h;s.innerHTML=ATLAS.template("app.832")`${170-H}${H}${Array.from({length:8},(_,i)=>`<line x1="72" x2="148" y1="${170-H*(i+1)/9}" y2="${170-H*(i+1)/9}" stroke="#56687A"/>`).join('')}`;}
function ventRun(){stopTimer();const bad=ckOutcome(S.f,'vent')==='fail';let t=0;
  S.timer=setInterval(()=>{t+=.05;const ph=(t%3)/3,top=bad?.78:1,h=ph<.33?top-(.45*ph/.33):Math.min(top,top-.45+(.45*(ph-.33)/.2));drawBel(Math.max(.2,h));
    if(t>=9){stopTimer();S.done.vent=true;$('#ventR').innerHTML=(bad?'Vte 340':'Vte 490')+'<small>mL</small>'+(bad?ATLAS.t("app.833"):'');$p().querySelector('.ckl-mark').outerHTML=markBar('vent');}},50);}
function renderDx(){const ks=Object.keys(CKF);
  if(S.finished){renderResult();return;}
  $p().innerHTML=ATLAS.template("app.834")`${ks.map(k=>`<button type="button" data-dx="${k}">${CKF[k].n}</button>`).join('')}`;}
function score(dx){let right=0,miss=[];CKS.forEach(s=>{const m=S.mark[s.k];if(!m){miss.push(s.n);return;}if(m===ckOutcome(S.f,s.k,{vapOn:true}))right++;});
  const ok=dx===S.f;return{right,miss,ok,score:Math.round(60*right/CKS.length+(ok?40:0))};}
function renderResult(){const r=S.res,F=CKF[S.f];
  $p().innerHTML=ATLAS.template("app.835")`${r.score}${r.right}${CKS.length}${r.ok?ATLAS.t("app.836"):ATLAS.t("app.837")}${r.ok?'ok':'bad'}${F.n}${F.note}${r.miss.length?ATLAS.template("app.838")`${r.miss.join(', ')}`:''}${F.part?show3D(F.part):''}`;}
$('#cklSteps').addEventListener('click',e=>{const b=e.target.closest('button[data-s]');if(b)openStep(b.dataset.s);});
$('#cklNew').addEventListener('click',newMachine);
$('#cklPane').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset['3d']){if(typeof selectPart==='function')selectPart(b.dataset['3d']);const st=$('#stageMachine');st&&st.scrollIntoView({behavior:RM?'auto':'smooth',block:'center'});return;}
  if(b.dataset.m){const k=S.cur;if(!S.done[k]||S.finished)return;S.mark[k]=b.dataset.m;renderSteps();b.parentNode.querySelectorAll('[data-m]').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const i=CKS.findIndex(x=>x.k===k);setTimeout(()=>openStep(i<CKS.length-1?CKS[i+1].k:'dx'),350);return;}
  if(b.dataset.lp){lpRun(b.dataset.lp==='on');return;}
  if(b.hasAttribute('data-o2')){const v=S.f==='o2cal'?34:21;$('#o2R').innerHTML=ATLAS.percent(v);S.done.o2=true;$p().querySelector('.ckl-mark').outerHTML=markBar('o2');return;}
  if(b.hasAttribute('data-circ')){circRun();return;}
  if(b.hasAttribute('data-valve')){valveRun();return;}
  if(b.hasAttribute('data-vent')){ventRun();return;}
  if(b.dataset.dx){S.res=score(b.dataset.dx);S.finished=true;renderSteps();renderResult();$('#cklStat').textContent=ATLAS.t("app.839")+S.res.score+ATLAS.t("app.840");
    document.dispatchEvent(new CustomEvent('anm-progress',{detail:{kind:'checkout',id:S.f,score:S.res.score,ok:S.res.ok}}));return;}
  if(b.hasAttribute('data-newm')){newMachine();return;}});
if(typeof PROGRESS!=='undefined'){PROGRESS.setTotal('checkout',Object.keys(CKF).length);PROGRESS.setLabels('checkout',Object.fromEntries(Object.entries(CKF).map(([k,v])=>[k,v.n])));}
newMachine();
})();
/* ───────────── İLERLEME: TOPLAMLAR ───────────── */
if(typeof PROGRESS!=='undefined'){const sc=Object.keys(MON.SCN).filter(k=>k!=='normal');PROGRESS.setTotal('scenario',sc.length);PROGRESS.setLabels('scenario',Object.fromEntries(sc.map(k=>[k,MON.SCN[k].n])));
  PROGRESS.setTotal('case',CASES.length);PROGRESS.setLabels('case',Object.fromEntries(CASES.map(c=>[c.id,c.n])));
  PROGRESS.setTotal('quiz',QZ.length);PROGRESS.setLabels('quiz',Object.fromEntries(QZ.map((q,i)=>['q'+(i+1),ATLAS.t("app.841")+(i+1)])));
  PROGRESS.setTotal('async',5);PROGRESS.setLabels('async',{ET:ATLAS.t("app.842"),ÇT:ATLAS.t("app.843"),AA:ATLAS.t("app.844"),GD:ATLAS.t("app.845"),AP:ATLAS.t("app.846")});}
/* ───────────── DÖNGÜ ───────────── */
let ptAcc=1;
frameHooks.push(dt=>{const anyMon=viewers.some(v=>v.visible&&!v.el.hidden)||monFlat.dataset.vis==='1';
  if(MON.step(dt,anyMon))monTexes.forEach(t=>t.needsUpdate=true);
  if(ventVis)VENT.step(dt);
  ptAcc+=dt;if(ptAcc>.4){ptAcc=0;renderPt();}});

ATLAS.sim={
  selectPart, parts:PARTS.map(p=>({key:p.k,title:p.t})),
  filter(keys){if(VM)VM.pinFilter=keys?new Set(keys):null;},
  guide(key){if(VM){VM.priorityKey=key;VM.reset();}},
  flat, caseRunning:()=>!!CS.run,
  workspace(on){if(on)flat(true);},
  get selected(){return selected;}
};
})();
