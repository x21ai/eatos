/* Deterministic eatOS Point of Sale demo scene.
   window.__render(t) paints the exact state at time t (seconds). */

const FPS = 30;
const DUR = 20.0;
window.__meta = { fps: FPS, frames: Math.round(FPS * DUR) };

const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
// eased 0..1 progress across [t0,t1]
const seg = (t, t0, t1) => ease(clamp((t - t0) / (t1 - t0), 0, 1));
const money = (n) => '$' + n.toFixed(2);

/* ---------- menu grid ---------- */
const ITEMS = [
  { nm: 'Caprice Sandwich', pr: '$20.00' },
  { nm: 'Chicken Crepe', pr: '$19.00', badge: '12' },
  { nm: 'Chicken Sandwich (Poulet)', pr: '$20.00' },
  { nm: 'Croque Madame', pr: '$21.00', badge: '- 5' },
  { nm: 'Croque Monsieur', pr: 'Out of stock', off: true },
  { nm: 'Figaro BLT', pr: '$20.00' },
  { nm: 'Fromage Fondu', pr: 'Open price' },
  { nm: 'Half Sandwich and Soup', pr: '$22.00' },
  { nm: 'Jambon (Ham) Sandwich', pr: '$20.00' },
];
const grid = $('grid');
ITEMS.forEach((it, i) => {
  const d = document.createElement('div');
  d.className = 'item' + (it.off ? ' off' : '');
  d.id = 'it' + i;
  d.innerHTML =
    '<div class="nm">' + it.nm + '</div><div class="pr">' + it.pr + '</div>' +
    '<div class="plus">+</div>' + (it.badge ? '<div class="badge">' + it.badge + '</div>' : '');
  grid.appendChild(d);
});

/* ---------- clock-in keypad ---------- */
const KEYS = [
  ['7', ''], ['8', ''], ['9', ''],
  ['4', ''], ['5', ''], ['6', ''],
  ['1', ''], ['2', ''], ['3', ''],
  ['C', 'red'], ['0', ''], ['ENTER', 'dark'],
  ['Clock Out', 'out'], ['Break', 'brk'], ['Clock In', 'in'],
];
const kgrid = $('kgrid');
KEYS.forEach((k, i) => {
  const d = document.createElement('div');
  d.className = 'key ' + k[1];
  d.id = 'k' + i;
  d.textContent = k[0];
  kgrid.appendChild(d);
});

/* ---------- check line items ---------- */
const LINES = [
  { qty: '1 ea', nm: 'Chicken Crepe', sub: 'Preparation: Extra Sauce', pr: '$20.00' },
  { qty: '1 ea', nm: 'Caprice Sandwich', sub: 'Main', pr: '$20.00' },
  { qty: '1 ea', nm: 'Figaro BLT', sub: 'Main', pr: '$20.00' },
];
const linesEl = $('lines');
LINES.forEach((l, i) => {
  const d = document.createElement('div');
  d.className = 'line';
  d.id = 'ln' + i;
  d.innerHTML =
    '<div class="qty">' + l.qty + '</div>' +
    '<div style="flex:1"><div class="lnm">' + l.nm + '</div><div class="lsub">' + l.sub + '</div></div>' +
    '<div class="lpr">' + l.pr + '</div>';
  linesEl.appendChild(d);
});

/* ---------- timeline ---------- */
const T = {
  signIn: [0, 0.5],
  email: [0.7, 1.9],
  pass: [2.0, 2.9],
  tapSignIn: 3.25,
  loading: [3.45, 4.5],
  appIn: [4.45, 4.85],
  pins: [5.0, 5.4, 5.8, 6.2],
  tapClockIn: 6.7,
  tapEnter: 7.1,
  keypadOut: [7.25, 7.75],
  toast: [7.6, 10.6],
  tapCrepe: 8.6,
  sheetIn: [8.7, 9.2],
  tapSauce: 9.75,
  tapAdd: 10.3,
  sheetOut: [10.4, 10.85],
  addItems: [10.9, 11.6, 12.2], // line 0,1,2 land times
  tapCharge: 13.1,
  payIn: [13.2, 13.75],
  tapCash: 14.3,
  cashIn: [14.4, 14.85],
  tapExact: 15.4,
  tapChargeCash: 16.0,
  successIn: [16.3, 16.8],
  outro: [18.7, 19.6],
};

/* cursor waypoints: [t, x, y] */
const WP = [
  [0.0, 1180, 300],
  [0.8, 1195, 330],   // email field
  [2.05, 1195, 425],  // password field
  [3.1, 1240, 500],   // sign in
  [4.9, 1180, 300],
  [5.0, 1140, 280],   // pin 7
  [5.4, 1300, 280],   // 8
  [5.8, 1140, 355],   // 4
  [6.2, 1300, 430],   // 2
  [6.65, 1400, 630],  // Clock In
  [7.1, 1400, 470],   // ENTER
  [8.5, 465, 420],    // chicken crepe
  [9.7, 785, 620],    // extra sauce
  [10.25, 800, 800],  // ADD
  [11.5, 240, 500],   // caprice plus
  [12.15, 1070, 500], // figaro plus
  [13.05, 1420, 830], // CHARGE
  [14.25, 1390, 245], // Cash tender
  [15.35, 745, 360],  // EXACT
  [15.95, 800, 745],  // CHARGE cash
  [17.2, 800, 500],
];

function cursorAt(t) {
  let a = WP[0];
  let b = WP[WP.length - 1];
  for (let i = 0; i < WP.length - 1; i++) {
    if (t >= WP[i][0] && t <= WP[i + 1][0]) { a = WP[i]; b = WP[i + 1]; break; }
    if (t > WP[WP.length - 1][0]) { a = b = WP[WP.length - 1]; }
  }
  const p = a === b ? 1 : ease(clamp((t - a[0]) / (b[0] - a[0]), 0, 1));
  return [a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p];
}

const TAPS = [
  T.tapSignIn, T.pins[0], T.pins[1], T.pins[2], T.pins[3], T.tapClockIn, T.tapEnter,
  T.tapCrepe, T.tapSauce, T.tapAdd, T.addItems[1] - 0.1, T.addItems[2] - 0.1,
  T.tapCharge, T.tapCash, T.tapExact, T.tapChargeCash,
];

const EMAIL = 'memocafe@eatos.com';

function pressed(t, at) {
  return t >= at && t < at + 0.16;
}

window.__render = function (t) {
  const cls = (el, c, on) => el.classList.toggle(c, !!on);

  /* --- sign in --- */
  const signVis = t < T.loading[0] + 0.1 ? 1 - seg(t, T.loading[0] - 0.15, T.loading[0] + 0.1) : 0;
  $('signin').style.opacity = Math.min(seg(t, T.signIn[0], T.signIn[1]), signVis);

  const en = Math.round(seg(t, T.email[0], T.email[1]) * EMAIL.length);
  const emailv = $('emailv');
  if (en === 0) { emailv.textContent = 'Enter Email'; emailv.className = 'ph'; }
  else { emailv.textContent = EMAIL.slice(0, en); emailv.className = ''; }
  cls($('emailf'), 'focus', t >= T.email[0] - 0.2 && t < T.pass[0]);

  const pn = Math.round(seg(t, T.pass[0], T.pass[1]) * 10);
  const passv = $('passv');
  if (pn === 0) { passv.textContent = 'Enter Password'; passv.className = 'ph'; }
  else { passv.textContent = '\u2022'.repeat(pn); passv.className = ''; }
  cls($('passf'), 'focus', t >= T.pass[0] - 0.2 && t < T.tapSignIn + 0.2);
  $('signbtn').style.transform = pressed(t, T.tapSignIn) ? 'scale(0.97)' : 'scale(1)';

  /* --- loading --- */
  const lv = seg(t, T.loading[0] - 0.1, T.loading[0] + 0.15) * (1 - seg(t, T.appIn[0], T.appIn[1]));
  $('loading').style.opacity = lv;
  const lp = clamp((t - T.loading[0]) / (T.loading[1] - T.loading[0]), 0, 1);
  $('lpct').textContent = Math.round(lp * 100) + '%';
  $('lring').style.transform = 'rotate(' + (t * 620).toFixed(1) + 'deg)';

  /* --- app --- */
  $('app').style.opacity = seg(t, T.appIn[0], T.appIn[1]) * (1 - seg(t, T.outro[0] + 0.6, T.outro[1]));

  /* clock-in overlay */
  const kIn = seg(t, T.appIn[0], T.appIn[1] + 0.15);
  const kOut = seg(t, T.keypadOut[0], T.keypadOut[1]);
  const kv = kIn * (1 - kOut);
  $('scrim').style.opacity = kv;
  $('clockleft').style.opacity = kv;
  $('keypad').style.opacity = kv;
  $('keypad').style.transform = 'translateY(' + (18 * (1 - kIn) + 26 * kOut).toFixed(1) + 'px)';

  let filled = 0;
  T.pins.forEach((pt) => { if (t >= pt + 0.05) filled++; });
  for (let i = 0; i < 4; i++) cls($('s' + i), 'on', i < filled);

  const keyTaps = { 0: T.pins[0], 1: T.pins[1], 3: T.pins[2], 7: T.pins[3], 14: T.tapClockIn, 11: T.tapEnter };
  Object.keys(keyTaps).forEach((k) => cls($('k' + k), 'press', pressed(t, keyTaps[k])));

  /* toast */
  $('toast').style.opacity = seg(t, T.toast[0], T.toast[0] + 0.3) * (1 - seg(t, T.toast[1], T.toast[1] + 0.35));
  $('toast').style.transform = 'translateY(' + (-16 * (1 - seg(t, T.toast[0], T.toast[0] + 0.3))).toFixed(1) + 'px)';

  /* item press feedback */
  for (let i = 0; i < ITEMS.length; i++) $('it' + i).style.transform = 'scale(1)';
  if (pressed(t, T.tapCrepe)) $('it1').style.transform = 'scale(0.975)';
  if (pressed(t, T.addItems[1] - 0.1)) $('it0').style.transform = 'scale(0.975)';
  if (pressed(t, T.addItems[2] - 0.1)) $('it5').style.transform = 'scale(0.975)';

  /* modifier sheet */
  const sIn = seg(t, T.sheetIn[0], T.sheetIn[1]);
  const sOut = seg(t, T.sheetOut[0], T.sheetOut[1]);
  const sv = sIn * (1 - sOut);
  $('sheetwrap').style.opacity = sv;
  $('sheet').style.transform = 'translateY(' + (120 * (1 - sIn) + 140 * sOut).toFixed(1) + 'px)';
  const sauceOn = t >= T.tapSauce + 0.05;
  cls($('optsauce'), 'on', sauceOn);
  $('addbtn').textContent = 'ADD \u00b7 ' + (sauceOn ? '$20.00' : '$19.00');
  $('sheetsum').textContent = 'Foccacia \u00b7 Medium Rare \u00b7 Main' + (sauceOn ? ' \u00b7 Extra Sauce' : '');
  $('addbtn').style.transform = pressed(t, T.tapAdd) ? 'scale(0.98)' : 'scale(1)';

  /* check panel */
  let count = 0;
  T.addItems.forEach((at, i) => {
    const v = seg(t, at, at + 0.32);
    const el = $('ln' + i);
    el.style.opacity = v;
    el.style.transform = 'translateY(' + (14 * (1 - v)).toFixed(1) + 'px)';
    if (t >= at + 0.16) count++;
  });
  $('empty').style.opacity = 1 - seg(t, T.addItems[0], T.addItems[0] + 0.25);
  $('empty').style.display = t >= T.addItems[0] + 0.3 ? 'none' : 'flex';
  const sub = count * 20;
  const growth = seg(t, T.addItems[0], T.addItems[0] + 0.3);
  const subShown = count === 0 ? 0 : sub;
  $('tsub').textContent = money(subShown * (count === 1 ? growth : 1));
  $('ttax').textContent = money(subShown * 0.2 * (count === 1 ? growth : 1));
  $('ttot').textContent = money(subShown * 1.2 * (count === 1 ? growth : 1));
  cls($('chargebtn'), 'live', count > 0);
  $('chargebtn').textContent = count > 0 ? 'CHARGE ' + money(subShown * 1.2) : 'CHARGE';
  $('chargebtn').style.transform = pressed(t, T.tapCharge) ? 'scale(0.98)' : 'scale(1)';
  $('gstat').textContent = t >= T.addItems[0] ? 'ARRIVED AT 5:43 PM' : 'NOT STARTED';

  /* payment screen */
  const pIn = seg(t, T.payIn[0], T.payIn[1]);
  const pOut = seg(t, T.successIn[0], T.successIn[1]);
  $('pay').style.opacity = pIn;
  $('pay').style.transform = 'translateX(' + (60 * (1 - pIn)).toFixed(1) + 'px)';
  const cashSel = t >= T.tapCash + 0.05;
  cls($('tcash'), 'on', cashSel);
  $('tcash').style.transform = pressed(t, T.tapCash) ? 'scale(0.985)' : 'scale(1)';
  cls($('paybar'), 'live', cashSel);
  $('paybar').textContent = cashSel ? 'CHARGE $72.00' : 'SELECT A PAYMENT METHOD';


  const cIn = seg(t, T.cashIn[0], T.cashIn[1]);
  $('cashwrap').style.opacity = cIn * (1 - pOut);
  $('cash').style.transform = 'translateY(' + (90 * (1 - cIn)).toFixed(1) + 'px)';
  const exact = t >= T.tapExact + 0.05;
  cls($('qexact'), 'on', exact);
  $('amt').textContent = exact ? '$72.00' : '$0.00';
  cls($('cashcharge'), 'live', exact);
  $('cashcharge').style.transform = pressed(t, T.tapChargeCash) ? 'scale(0.985)' : 'scale(1)';

  /* success */
  const suc = pOut * (1 - seg(t, T.outro[0], T.outro[0] + 0.5));
  $('success').style.opacity = suc;
  const pop = seg(t, T.successIn[0], T.successIn[1] + 0.2);
  $('success').querySelector('.ring').style.transform = 'scale(' + (0.7 + 0.3 * pop).toFixed(3) + ')';

  /* cursor + ripple */
  const cur = cursorAt(t);
  const hideCursor = suc > 0.4 ? 0 : 1;
  $('cursor').style.transform = 'translate(' + cur[0].toFixed(1) + 'px,' + cur[1].toFixed(1) + 'px)';
  $('cursor').style.opacity = hideCursor;

  let rv = 0, rs = 0.2;
  for (const tp of TAPS) {
    const p = clamp((t - tp) / 0.5, 0, 1);
    if (t >= tp && p < 1) { rv = 1 - p; rs = 0.2 + 0.9 * ease(p); }
  }
  const rip = $('rip');
  rip.style.opacity = rv * 0.9;
  rip.style.left = cur[0] + 'px';
  rip.style.top = cur[1] + 'px';
  rip.style.transform = 'scale(' + rs.toFixed(3) + ')';
};

window.__render(0);
