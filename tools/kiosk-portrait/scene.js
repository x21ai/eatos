/* Deterministic portrait kiosk ordering animation.
   Every visual state is a pure function of time, driven by window.__render(t). */

const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const seg = (t, a, b) => ease(clamp((t - a) / Math.max(0.0001, b - a), 0, 1));
const cls = (el, c, on) => el.classList[on ? 'add' : 'remove'](c);

const FPS = 24;

/* ---------- scene windows ---------- */
const S = {
  start: [0.0, 5.6],
  dine: [5.4, 10.6],
  menu: [10.4, 15.4],
  item: [15.2, 22.6],
  ups: [22.4, 28.4],
  rev: [28.2, 34.0],
  pay: [33.8, 38.4],
  done: [38.2, 46.0],
};
const DUR = 46.0;
window.__meta = { fps: FPS, frames: Math.round(FPS * DUR) };

/* ---------- tap moments ---------- */
const A = {
  touch: 3.9,
  dinein: 9.0,
  catfood: 13.9,
  aoadd: 18.1,
  aoplus: 19.1,
  additem: 21.3,
  combo: 24.6,
  drink: 26.4,
  review: 27.8,
  place: 32.9,
  cashier: 37.2,
  newOrder: 44.6,
};
const TAPS = Object.keys(A).map((k) => A[k]);

/* ---------- cursor path from real geometry ---------- */
const C = (id, dx, dy) => {
  const r = $(id).getBoundingClientRect();
  return [r.left + r.width / 2 + (dx || 0), r.top + r.height / 2 + (dy || 0)];
};
const WP = [];
const at = (t, p) => WP.push([t, p[0], p[1]]);
const tapAt = (t, p, lead) => {
  at(t - (lead || 0.55), p);
  at(t + 0.4, p);
};

at(0.0, [640, 1180]);
tapAt(A.touch, C('cta'), 0.9);
tapAt(A.dinein, C('dopt0'));
tapAt(A.catfood, C('cat0'));
tapAt(A.aoadd, C('aoadd0'));
tapAt(A.aoplus, C('aoadd0', 44));
tapAt(A.additem, C('addbtn'));
tapAt(A.combo, C('addedbtn'));
tapAt(A.drink, C('dbn1'));
tapAt(A.review, C('upsgo'));
tapAt(A.place, C('placebtn'));
tapAt(A.cashier, C('pc2'));
at(A.cashier + 1.0, [660, 1240]);
at(A.newOrder - 0.7, C('neworder'));
at(A.newOrder + 0.5, C('neworder'));
at(DUR, C('neworder', 40, 60));
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

const pressed = (t, tp) => t >= tp && t < tp + 0.14;
const scaleOn = (t, tp, s) => (pressed(t, tp) ? 'scale(' + s + ')' : 'scale(1)');

/* gentle cross fades between screens */
const FADE = 0.5;
function opacityOf(w, t) {
  const inn = seg(t, w[0], w[0] + FADE);
  const out = w[1] >= DUR ? 0 : seg(t, w[1] - FADE, w[1]);
  return inn * (1 - out);
}
const money = (v) => '$' + v.toFixed(2);

window.__render = function (t) {
  for (const k in S) $(k).style.opacity = opacityOf(S[k], t);

  /* 1 touch to start: slow breathing headline */
  const br = 1 + 0.02 * Math.sin(t * 1.6);
  $('cta').style.transform = 'scale(' + (pressed(t, A.touch) ? 0.965 : br).toFixed(4) + ')';

  /* 2 dine mode */
  cls($('dopt0'), 'on', t >= A.dinein);
  $('dopt0').style.transform = scaleOn(t, A.dinein, 0.975);

  /* 3 menu: promo drifts slowly, category selects */
  const drift = 1.04 + 0.02 * Math.sin((t - S.menu[0]) * 0.9);
  $('menu').querySelector('.promo img').style.transform = 'scale(' + drift.toFixed(4) + ')';
  cls($('cat0'), 'on', t >= A.catfood);
  $('cat0').style.transform = scaleOn(t, A.catfood, 0.97);

  /* 4 item: add on chosen, quantity raised, price follows */
  const addOn = t >= A.aoadd;
  const twoOn = t >= A.aoplus;
  cls($('ao0'), 'on', addOn);
  $('aoadd0').style.display = addOn ? 'none' : 'flex';
  $('aostp0').style.display = addOn ? 'flex' : 'none';
  $('aostp0').querySelector('b').textContent = twoOn ? '2' : '1';
  $('aocount').textContent = twoOn ? '2' : addOn ? '1' : '0';
  cls($('ichip1'), 'hide', !twoOn);
  const itemTotal = 16 + (twoOn ? 4 : addOn ? 2 : 0);
  $('iaddtot').textContent = money(itemTotal);
  $('addbtn').style.transform = scaleOn(t, A.additem, 0.98);
  $('aoadd0').style.transform = scaleOn(t, A.aoadd, 0.94);
  $('aostp0').style.transform = scaleOn(t, A.aoplus, 0.94);

  /* 5 upsell: combo added, then a drink added */
  const combo = t >= A.combo;
  $('upstoast').style.opacity = combo ? seg(t, A.combo, A.combo + 0.3) : 0;
  $('upstoast').style.transform = 'translateY(' + (combo ? 0 : -20) + 'px)';
  $('addedlbl').textContent = combo ? 'Added' : 'Add';
  $('addedbtn').style.background = combo ? '#16a34a' : '#111827';
  $('addedbtn').style.transform = scaleOn(t, A.combo, 0.96);
  const drinkOn = t >= A.drink;
  cls($('dbn1'), 'stp', drinkOn);
  $('dbn1').innerHTML = drinkOn ? '<i>&#8722;</i>1<i>+</i>' : '+';
  $('dbn1').style.transform = scaleOn(t, A.drink, 0.92);
  $('upstot').textContent = money(34 + (drinkOn ? 6 : 0));
  $('upsgo').style.transform = scaleOn(t, A.review, 0.985);

  /* 6 review */
  $('placebtn').style.transform = scaleOn(t, A.place, 0.985);

  /* 7 payment */
  const paid = t >= A.cashier;
  cls($('pc2'), 'on', paid);
  $('pc2').style.transform = scaleOn(t, A.cashier, 0.98);

  /* 8 done: receipt slides out of the printer slot, countdown ticks */
  const slide = seg(t, S.done[0] + 1.2, S.done[0] + 3.4);
  const paper = $('paper');
  paper.style.transform = 'translateY(' + (-96 + 96 * slide).toFixed(1) + 'px)';
  paper.style.opacity = slide > 0.02 ? 1 : 0;
  const left = Math.max(1, 20 - Math.floor(Math.max(0, t - S.done[0] - 1.0)));
  $('donecd').textContent = 'Starting a new order in ' + left + 's';
  $('neworder').style.transform = scaleOn(t, A.newOrder, 0.985);

  /* cursor + tap ripple */
  const cur = cursorAt(t);
  $('cursor').style.transform = 'translate(' + cur[0].toFixed(1) + 'px,' + cur[1].toFixed(1) + 'px)';
  $('cursor').style.opacity = 1;

  let rv = 0, rs = 0.2;
  for (const tp of TAPS) {
    const p = clamp((t - tp) / 0.55, 0, 1);
    if (t >= tp && p < 1) { rv = 1 - p; rs = 0.2 + 1.0 * ease(p); }
  }
  const rip = $('rip');
  rip.style.opacity = rv * 0.75;
  rip.style.left = cur[0] + 'px';
  rip.style.top = cur[1] + 'px';
  rip.style.transform = 'scale(' + rs.toFixed(3) + ')';
};

window.__render(0);
