/* Deterministic eatOS Self Service Kiosk demo scene.
   window.__render(t) paints the exact state at time t (seconds). */

const FPS = 30;
const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const seg = (t, t0, t1) => ease(clamp((t - t0) / (t1 - t0), 0, 1));
const cls = (el, c, on) => el.classList.toggle(c, !!on);

/* ---------- decorative deterministic QR ---------- */
(function () {
  const g = $('qrcells');
  const N = 29;
  let s = 20260824;
  const rnd = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  const add = (px, py, w, h) => {
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    r.setAttribute('x', px); r.setAttribute('y', py);
    r.setAttribute('width', w); r.setAttribute('height', h);
    g.appendChild(r);
  };
  const finder = (x, y) => {
    add(x, y, 7, 1); add(x, y + 6, 7, 1); add(x, y + 1, 1, 5); add(x + 6, y + 1, 1, 5);
    add(x + 2, y + 2, 3, 3);
  };
  const inFinder = (x, y) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (inFinder(x, y)) continue;
    if (rnd() > 0.52) add(x, y, 1, 1);
  }
  finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
})();

/* ---------- category rail ---------- */
const CATS = [
  ['\u2302', 'Home', ''],
  ['\u25C9', 'Food', '10 products'],
  ['\u25D3', 'Drinks', '8 products'],
  ['\u2726', 'Dessert', '6 products'],
  ['\u25D4', 'Breakfast', '4 products'],
  ['\u2740', 'Salads & Bowls', '3 products'],
  ['\u25E2', 'Pizza', '3 products'],
  ['\u25A3', 'Sides & Snacks', '3 products'],
  ['\u2605', 'Kids Menu', '3 products'],
];

(function () {
  const r = $('rail0');
  const lg = document.createElement('div');
  lg.className = 'lg';
  lg.textContent = 'Memories';
  r.appendChild(lg);
  CATS.forEach(([ic, nm, sb], i) => {
    const d = document.createElement('div');
    d.className = 'it' + (i === 1 ? ' on' : '');
    d.innerHTML = '<em>' + ic + '</em><div><span>' + nm + '</span>' + (sb ? '<s>' + sb + '</s>' : '') + '</div>';
    r.appendChild(d);
  });
})();

/* ---------- menu grid ---------- */
const ITEMS = [
  ['Classic Cheeseburger', '$16.00', '445 Cal', 'pop', '#c98a4b'],
  ['Peruvian Chicken Sandwich', '$14.50', '397 Cal', 'new', '#d9a86c'],
  ['Spaghetti & Meatballs', '$18.00', '486 Cal', 'pop', '#c05a3a'],
  ['Rigatoni Pork & Beef Ragu', '$22.00', '192 Cal', '', '#b9713f'],
  ['Spicy Sausage Linguine', '$19.00', '209 Cal', '', '#c9603c'],
  ['Wiener Schnitzel', '$28.00', '218 Cal', '', '#cf9c56'],
  ['Grilled Skirt Steak with Mojo', '$32.00', '417 Cal', 'pop', '#8f5233'],
  ['Grilled Branzino', '$34.00', '194 Cal', 'new', '#d8c184'],
  ['Jidori Roast Chicken', '$26.00', '440 Cal', '', '#c88f4e'],
];
(function () {
  const g = $('grid');
  ITEMS.forEach(([nm, pr, cal, tag, col], i) => {
    const d = document.createElement('div');
    d.className = 'cardit';
    d.innerHTML =
      '<div class="ph">' +
      (tag ? '<div class="tag ' + tag + '">' + (tag === 'pop' ? '\u2726 Popular' : 'NEW') + '</div>' : '') +
      '<div class="cal">' + cal + '</div>' +
      '<div class="disc"><b style="background:' + col + '"></b></div></div>' +
      '<div class="bd"><b>' + nm + '</b><i>' + pr + '</i></div>' +
      '<div class="add" id="add' + i + '">+</div>';
    g.appendChild(d);
  });
})();

/* ---------- number keypads ---------- */
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '\u232B'];
(function () {
  const p = $('kpad');
  KEYS.forEach((k, i) => {
    const d = document.createElement('div');
    d.className = 'k' + (k === 'C' || k === '\u232B' ? ' red' : '');
    d.id = 'k' + i;
    d.textContent = k;
    p.appendChild(d);
  });
  const tk = $('tipkeys');
  ['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach((k) => {
    const d = document.createElement('div');
    d.textContent = k;
    tk.appendChild(d);
  });
})();

const DIGITS = '5551234567'.split('');
const keyOf = (ch) => KEYS.indexOf(ch);

/* ---------- timeline ---------- */
const S = {
  start: [0.0, 4.4],
  phone: [4.4, 10.0],
  menu: [10.0, 13.8],
  item: [13.8, 18.9],
  ups: [18.9, 21.4],
  rev: [21.4, 24.7],
  tip: [24.7, 28.2],
  pay: [28.2, 30.6],
  done: [30.6, 33.4],
};
const DUR = 33.4;
window.__meta = { fps: FPS, frames: Math.round(FPS * DUR) };

const T0 = 5.3, STEP = 0.24;
const typeAt = (n) => T0 + n * STEP;
const TYPE_END = typeAt(DIGITS.length - 1);

const A = {
  touch: 3.3,
  cont: TYPE_END + 0.7,
  plus: 12.3,
  temp: 15.3,
  add: 17.6,
  back: 20.4,
  place: 23.6,
  tip15: 26.1,
  tipgo: 27.4,
  card: 29.6,
};
const TAPS = Object.keys(A).map((k) => A[k]).concat(DIGITS.map((_, i) => typeAt(i)));

/* ---------- cursor waypoints from real DOM geometry ---------- */
const C = (id, dx, dy) => {
  const r = $(id).getBoundingClientRect();
  return [r.left + r.width / 2 + (dx || 0), r.top + r.height / 2 + (dy || 0)];
};
const WP = [];
const at = (t, p) => WP.push([t, p[0], p[1]]);

at(0.0, [880, 780]);
at(A.touch - 0.4, C('cta'));
at(A.touch + 0.4, C('cta'));
DIGITS.forEach((d, i) => {
  const p = C('k' + keyOf(d));
  at(typeAt(i) - 0.11, p);
  at(typeAt(i) + 0.05, p);
});
at(A.cont - 0.25, C('cont'));
at(A.cont + 0.3, C('cont'));
at(A.plus - 0.4, C('add0'));
at(A.plus + 0.35, C('add0'));
at(A.temp - 0.35, C('o0'));
at(A.temp + 0.3, C('o0'));
at(A.add - 0.3, C('addbtn'));
at(A.add + 0.3, C('addbtn'));
at(A.back - 0.3, C('backmenu'));
at(A.back + 0.3, C('backmenu'));
at(A.place - 0.3, C('placebtn'));
at(A.place + 0.3, C('placebtn'));
at(A.tip15 - 0.35, C('tp2'));
at(A.tip15 + 0.3, C('tp2'));
at(A.tipgo - 0.3, C('tipgo'));
at(A.tipgo + 0.3, C('tipgo'));
at(A.card - 0.35, C('pc0'));
at(A.card + 0.3, C('pc0'));
at(DUR, [800, 700]);
WP.sort((a, b) => a[0] - b[0]);

function cursorAt(t) {
  if (t <= WP[0][0]) return [WP[0][1], WP[0][2]];
  for (let i = 1; i < WP.length; i++) {
    if (t <= WP[i][0]) {
      const a = WP[i - 1], b = WP[i];
      const p = ease(clamp((t - a[0]) / Math.max(0.0001, b[0] - a[0]), 0, 1));
      return [a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p];
    }
  }
  const l = WP[WP.length - 1];
  return [l[1], l[2]];
}
const pressed = (t, tp) => t >= tp && t < tp + 0.13;
const scaleOn = (t, tp, s) => (pressed(t, tp) ? 'scale(' + s + ')' : 'scale(1)');

const FADE = 0.34;
function opacityOf(w, t) {
  const inn = seg(t, w[0], w[0] + FADE);
  const out = w[1] >= DUR ? 0 : seg(t, w[1] - FADE, w[1]);
  return inn * (1 - out);
}

const fmtPhone = (n) => {
  const d = DIGITS.slice(0, n).join('');
  const a = d.slice(0, 3), b = d.slice(3, 6), c = d.slice(6, 10);
  let s = '';
  if (a) s = '(' + a + (a.length === 3 ? ')' : '');
  if (b) s += ' ' + b;
  if (c) s += '-' + c;
  return s.trim();
};
const money = (v) => '$' + v.toFixed(2);

window.__render = function (t) {
  for (const k in S) {
    const el = $(k);
    el.style.opacity = opacityOf(S[k], t);
  }

  /* 0 touch to start: slow breathing on the call to action */
  const br = 1 + 0.018 * Math.sin(t * 1.7);
  $('cta').style.transform = 'scale(' + (pressed(t, A.touch) ? 0.965 : br).toFixed(4) + ')';

  /* 1 phone entry */
  const typed = DIGITS.filter((_, i) => t >= typeAt(i)).length;
  $('phval').textContent = typed ? fmtPhone(typed) : '(XXX) XXX-XXXX';
  cls($('phval'), 'filled', typed > 0);
  KEYS.forEach((k, i) => {
    let sc = 1;
    DIGITS.forEach((d, n) => { if (keyOf(d) === i && pressed(t, typeAt(n))) sc = 0.93; });
    $('k' + i).style.transform = 'scale(' + sc + ')';
  });
  cls($('cont'), 'live', typed === DIGITS.length);
  $('cont').style.transform = scaleOn(t, A.cont, 0.98);

  /* 2 menu */
  $('add0').style.transform = scaleOn(t, A.plus, 0.88);

  /* 3 item detail */
  const chosen = t >= A.temp;
  cls($('o0'), 'on', chosen);
  $('o0').style.transform = scaleOn(t, A.temp, 0.97);
  $('selchip').style.opacity = chosen ? 1 : 0;
  $('addbtn').style.transform = scaleOn(t, A.add, 0.98);

  /* 4 upsell */
  $('backmenu').style.transform = scaleOn(t, A.back, 0.985);

  /* 5 review */
  $('placebtn').style.transform = scaleOn(t, A.place, 0.985);

  /* 6 tip */
  const tipped = t >= A.tip15;
  cls($('tp2'), 'on', tipped);
  $('tp2').style.transform = scaleOn(t, A.tip15, 0.97);
  $('tippct').textContent = tipped ? '15.00%' : '0.00%';
  $('tipstate').textContent = tipped ? 'Tip $2.60 added' : 'No tip added';
  $('tiptotal').textContent = 'Total ' + money(tipped ? 19.96 : 17.36);
  $('tipgo').textContent = tipped ? 'Continue \u00b7 ' + money(19.96) : 'Continue without tip';
  $('tipgo').style.transform = scaleOn(t, A.tipgo, 0.99);

  /* 7 payment */
  const paid = t >= A.card;
  cls($('pc0'), 'on', paid);
  $('pc0').style.transform = scaleOn(t, A.card, 0.98);

  /* cursor + ripple */
  const cur = cursorAt(t);
  $('cursor').style.transform = 'translate(' + cur[0].toFixed(1) + 'px,' + cur[1].toFixed(1) + 'px)';
  $('cursor').style.opacity = t >= S.done[0] ? 0 : 1;

  let rv = 0, rs = 0.2;
  for (const tp of TAPS) {
    const p = clamp((t - tp) / 0.5, 0, 1);
    if (t >= tp && p < 1) { rv = 1 - p; rs = 0.2 + 0.9 * ease(p); }
  }
  const rip = $('rip');
  rip.style.opacity = rv * 0.8;
  rip.style.left = cur[0] + 'px';
  rip.style.top = cur[1] + 'px';
  rip.style.transform = 'scale(' + rs.toFixed(3) + ')';
};

window.__render(0);
