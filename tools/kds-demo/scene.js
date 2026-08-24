/* Deterministic eatOS Kitchen Display System demo scene.
   window.__render(t) paints the exact state at time t (seconds). */

const FPS = 30;
const DUR = 23.0;
window.__meta = { fps: FPS, frames: Math.round(FPS * DUR) };

const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const seg = (t, t0, t1) => ease(clamp((t - t0) / (t1 - t0), 0, 1));
const mmss = (s) => {
  s = Math.max(0, Math.floor(s));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
};

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

/* ---------- tickets ---------- */
const TICKETS = [
  {
    num: '49', icon: '&#9974;', type: 'Scheduled', sub: '&#9998; Pickup 1:15 pm',
    base: 164, tone: 'amber', tags: ['EGG allergy'],
    sec: ['APPETIZER', '1 items'],
    items: [
      { q: '4', nm: 'Samosa', tr: 'Samosa', mods: ['+ Tamarind chutney', '+ Tamarind chutney'], al: ['GLUTEN allergy'], tm: 2 },
    ],
    sec2: ['ENTREE', '&#9201; Fires 1:00 pm'],
  },
  {
    num: '47', icon: '&#9743;', type: 'Phone In', sub: '&#9998; Aisha K. &middot; 12:12',
    base: 220, tone: 'amber', tags: ['SHELLFISH allergy'],
    noteh: ['Point of Sale terminal 1', '5m ago'],
    notes: ['Guest calling back in 10 minutes to confirm pickup time.', 'Pack sauces separately, guest is collecting on the way home'],
    items: [
      { q: '1', nm: 'Prawn Curry', tr: 'Prawn Curry', mods: ['Extra hot', 'Extra hot'], al: ['SHELLFISH allergy'], tm: 14 },
      { q: '2', nm: 'Steamed Rice', tr: 'Steamed Rice', mods: [], al: [], tm: 8 },
    ],
  },
  {
    num: '45', icon: '&#9645;', type: 'Take Out', sub: '&#9998; Counter 1 &middot; 12:11',
    base: 269, tone: 'amber', tags: ['GLUTEN allergy'],
    items: [
      { q: '2', nm: 'Chicken Biryani', tr: 'Chicken Biryani', mods: ['Medium spice', '+ Raita'], al: [], tm: 0 },
      { q: '1', nm: 'Butter Naan', tr: 'Butter Naan', mods: [], al: ['GLUTEN allergy', 'DAIRY allergy'], tm: 0 },
      { q: '2', nm: 'Mango Lassi', tr: 'Mango Lassi', mods: ['No sugar'], al: ['DAIRY allergy'], tm: 0 },
    ],
  },
  {
    num: '51', icon: '&#9744;', type: 'Table 9', sub: '&#9998; Leo M. &middot; 12:13',
    base: 364, tone: 'red', tags: ['DAIRY allergy'],
    sec: ['APPETIZER', '1 items'],
    items: [
      { q: '2', nm: 'Soup of the Day', tr: 'Sopa del D&iacute;a', mods: ['No cream'], al: ['DAIRY allergy'], tm: 0 },
    ],
    sec2: ['ENTREE', '&#9201; Prep 2:10'],
  },
  {
    num: '38', icon: '&#9723;', type: 'Drive Thru', sub: '&#9998; Lane 2 &middot; 12:10',
    base: 486, tone: 'violet', tags: ['GLUTEN allergy'],
    items: [
      { q: '3', nm: 'Chicken Wrap', tr: 'Wrap de Pollo', mods: ['No mayo'], al: ['GLUTEN allergy', 'MUSTARD allergy'], tm: 0 },
      { q: '2', nm: 'Onion Rings', tr: 'Aros de Cebolla', mods: [], al: ['GLUTEN allergy'], tm: 0 },
      { q: '3', nm: 'Iced Tea', tr: 'Iced Tea', mods: ['No sugar'], al: [], tm: 0 },
    ],
  },
  {
    num: '23', icon: '&#9744;', type: 'Table 4', sub: '&#9998; Maria S. &middot; 12:09',
    base: 637, tone: 'violet', tags: ['PEANUT allergy', 'GLUTEN allergy', 'NUT allergy'],
    noteh: ['Point of Sale terminal 1', '5m ago'],
    notes: ['Table 4 guest has severe nut allergy. Please double check all dishes before plating.'],
    sec: ['APPETIZER', '2 items'],
    items: [
      { q: '1', nm: 'Bruschetta', tr: 'Bruschetta', mods: ['+ Basil oil'], al: ['GLUTEN allergy'], tm: 0 },
      { q: '2', nm: 'Calamari', tr: 'Calamares', mods: ['Lemon aioli'], al: ['GLUTEN allergy', 'EGG allergy'], tm: 0 },
    ],
  },
];

const track = $('track');
TICKETS.forEach((tk, i) => {
  const el = document.createElement('div');
  el.className = 'tk';
  el.id = 'tk' + i;
  let h = '';
  h += '<div class="tkhead"><div class="tknum">' + tk.num + '</div>' +
    '<div class="tkmeta"><div class="tktype"><i>' + tk.icon + '</i>' + tk.type + '</div>' +
    '<div class="tksub">' + tk.sub + '</div></div>' +
    '<div class="timer ' + tk.tone + '" id="tm' + i + '">0:00</div></div>';
  if (tk.tags && tk.tags.length) {
    h += '<div class="tags">' + tk.tags.map((a) => '<div class="tag">' + a + '</div>').join('') + '</div>';
  }
  if (tk.noteh) {
    h += '<div class="noteh"><span>&#9992;</span>' + tk.noteh[0] + '<s>' + tk.noteh[1] + '</s></div>';
  }
  (tk.notes || []).forEach((n) => {
    h += '<div class="note"><i>&#9788;</i><span>' + n + '</span></div>';
  });
  if (tk.sec) h += '<div class="sech"><span>&#9662;</span>' + tk.sec[0] + '<s>' + tk.sec[1] + '</s></div>';
  h += '<div class="lis">';
  tk.items.forEach((it, j) => {
    h += '<div class="li" id="li' + i + '_' + j + '">' +
      '<div class="liq">' + it.q + '&times;</div>' +
      '<div class="libody"><div class="lin">' + it.nm + '</div>' +
      '<div class="lit">' + it.tr + '</div>' +
      (it.mods.length ? '<div class="lim">' + it.mods.join('<br/>') + '</div>' : '') +
      (it.al.length ? '<div class="tags">' + it.al.map((a) => '<div class="tag">&#9888; ' + a + '</div>').join('') + '</div>' : '') +
      '</div>' +
      '<div class="liact">' +
      (it.tm ? '<div class="litime" id="lt' + i + '_' + j + '">0:00</div>' : '') +
      '<div class="bump" id="bmp' + i + '_' + j + '">&#9737;</div>' +
      '</div></div>';
  });
  h += '</div>';
  if (tk.sec2) h += '<div class="sech"><span>&#8250;</span>' + tk.sec2[0] + '<s>' + tk.sec2[1] + '</s></div>';
  h += '<div class="tkfoot"><div class="undo" id="un' + i + '" style="display:none">&#8630;</div>' +
    '<div class="act" id="act' + i + '"><span>&#9737;</span><span id="actl' + i + '">Seen</span></div></div>';
  el.innerHTML = h;
  track.appendChild(el);
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
  toast: [7.6, 10.4],
  boardStart: 4.5,
  bump1: 8.9,
  acts1: [9.9, 10.9, 11.9],
  slide1: [12.6, 13.35],
  bump2: 14.6,
  acts2: [15.6, 16.6, 17.6],
  slide2: [18.3, 19.05],
  outro: [21.6, 22.6],
};

const PITCH = 336;
const BOARD_X = 76 + 22;
const BOARD_Y = 52 + 22;

function localPos(el) {
  let x = 0, y = 0, n = el;
  while (n && n.id !== 'track') { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
  return [x + el.offsetWidth / 2, y + el.offsetHeight / 2];
}
function tapPos(id, off) {
  const p = localPos($(id));
  return [BOARD_X + p[0] - off * PITCH, BOARD_Y + p[1]];
}

const P = {
  bump1: tapPos('bmp0_0', 0),
  act1: tapPos('act0', 0),
  bump2: tapPos('bmp1_0', 1),
  act2: tapPos('act1', 1),
};

/* cursor waypoints: [t, x, y] */
const WP = [
  [0.0, 1180, 300],
  [0.8, 1195, 330],
  [2.05, 1195, 425],
  [3.1, 1240, 500],
  [4.9, 1180, 300],
  [5.0, 1140, 280],
  [5.4, 1300, 280],
  [5.8, 1140, 355],
  [6.2, 1300, 430],
  [6.65, 1400, 630],
  [7.1, 1400, 470],
  [T.bump1, P.bump1[0], P.bump1[1]],
  ...T.acts1.map((tt) => [tt, P.act1[0], P.act1[1]]),
  [T.bump2, P.bump2[0], P.bump2[1]],
  ...T.acts2.map((tt) => [tt, P.act2[0], P.act2[1]]),
  [20.4, 700, 430],
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
  T.bump1, ...T.acts1, T.bump2, ...T.acts2,
];

const STATES = ['Seen', 'Preparing', 'Ready', 'Served'];
const STATE_CLASS = ['', 'prep', 'ready', 'served'];

const EMAIL = 'kitchen@eatos.com';
const pressed = (t, at) => t >= at && t < at + 0.16;

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
  $('app').style.opacity = seg(t, T.appIn[0], T.appIn[1]) * (1 - seg(t, T.outro[0] + 0.5, T.outro[1]));

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

  /* --- timers --- */
  const el = Math.max(0, t - T.boardStart);
  TICKETS.forEach((tk, i) => {
    $('tm' + i).textContent = mmss(tk.base + el);
    tk.items.forEach((it, j) => {
      if (it.tm) $('lt' + i + '_' + j).textContent = mmss(it.tm + el);
    });
  });

  /* --- board slide --- */
  const s1 = seg(t, T.slide1[0], T.slide1[1]);
  const s2 = seg(t, T.slide2[0], T.slide2[1]);
  const off = s1 + s2;
  track.style.transform = 'translateX(' + (-off * PITCH).toFixed(1) + 'px)';
  $('tk0').style.opacity = (1 - seg(t, T.slide1[0], T.slide1[0] + 0.4)).toFixed(3);
  $('tk0').style.transform = 'scale(' + (1 - 0.06 * s1).toFixed(3) + ')';
  $('tk1').style.opacity = (1 - seg(t, T.slide2[0], T.slide2[0] + 0.4)).toFixed(3);
  $('tk1').style.transform = 'scale(' + (1 - 0.06 * s2).toFixed(3) + ')';

  /* --- ticket interactions --- */
  function ticket(idx, bumpT, acts) {
    const done = t >= bumpT + 0.08;
    cls($('li' + idx + '_0'), 'done', done);
    cls($('bmp' + idx + '_0'), 'done', done);
    cls($('bmp' + idx + '_0'), 'press', pressed(t, bumpT));
    let n = 0;
    acts.forEach((at) => { if (t >= at + 0.08) n++; });
    const st = Math.min(n, STATES.length - 1);
    STATE_CLASS.forEach((c, k) => { if (c) cls($('act' + idx), c, k === st && n > 0); });
    cls($('act' + idx), 'press', acts.some((at) => pressed(t, at)));
    $('actl' + idx).textContent = STATES[st];
    $('un' + idx).style.display = n > 0 ? 'flex' : 'none';
    return done;
  }
  const done0 = ticket(0, T.bump1, T.acts1);
  const done1 = ticket(1, T.bump2, T.acts2);

  /* --- counters --- */
  const cleared = (t >= T.slide1[0] + 0.25 ? 1 : 0) + (t >= T.slide2[0] + 0.25 ? 1 : 0);
  $('qn').textContent = String(11 - cleared);
  $('sumtot').innerHTML = (80 - cleared * 9) + ' \u203A';
  $('c0').textContent = String(32 - cleared * 4);
  $('c1').textContent = String(77 - cleared * 7 - (done0 ? 1 : 0) - (done1 ? 1 : 0));
  $('c2').textContent = String(12 - cleared);
  $('c3').textContent = String(25 - cleared * 2);
  $('c4').textContent = String(30 - cleared * 3);
  $('rb1').textContent = String(1 + cleared);
  $('rb2').textContent = String(9 - cleared);
  $('tbtime').textContent = t >= 14 ? '6:41 PM' : '6:40 PM';

  /* cursor + ripple */
  const cur = cursorAt(t);
  $('cursor').style.transform = 'translate(' + cur[0].toFixed(1) + 'px,' + cur[1].toFixed(1) + 'px)';
  $('cursor').style.opacity = 1 - seg(t, T.outro[0], T.outro[0] + 0.4);

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
