/* Deterministic eatOS Customer Facing Display demo scene.
   window.__render(t) paints the exact state at time t (seconds). */

const FPS = 30;
const DUR = 26.0;
window.__meta = { fps: FPS, frames: Math.round(FPS * DUR) };

const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const seg = (t, t0, t1) => ease(clamp((t - t0) / (t1 - t0), 0, 1));
const cls = (el, c, on) => el.classList.toggle(c, !!on);

/* ---------- keypad ---------- */
const KEYS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'C', '0', '\u232B'];
const pad = $('pad');
KEYS.forEach((k, i) => {
  const d = document.createElement('div');
  d.className = 'k' + (k === 'C' || k === '\u232B' ? ' red' : '');
  d.id = 'k' + i;
  d.textContent = k;
  pad.appendChild(d);
});
const COLX = [806, 1100, 1393];
const ROWY = [248, 364, 480, 596];
const keyPos = (i) => [COLX[i % 3], ROWY[Math.floor(i / 3)]];
const keyOf = (ch) => KEYS.indexOf(ch);

/* phone digits typed one at a time */
const DIGITS = '5551234567'.split('');
const T0 = 0.9;          // first key press
const STEP = 0.34;       // per key
const typeAt = (n) => T0 + n * STEP;
const TYPE_END = typeAt(DIGITS.length - 1);

/* ---------- screen windows ---------- */
const S = {
  loy: [0.0, 6.6],
  rew: [6.6, 11.0],
  tip: [11.0, 14.4],
  sig: [14.4, 18.2],
  pay: [18.2, 21.8],
  rcp: [21.8, 24.4],
  ty: [24.4, 26.0],
};
const FADE = 0.36;
function opacityOf(w, t) {
  const inn = seg(t, w[0], w[0] + FADE);
  const out = w[1] >= DUR ? 0 : seg(t, w[1] - FADE, w[1]);
  return inn * (1 - out);
}

/* ---------- action beats ---------- */
const A = {
  tapCheckin: TYPE_END + 0.7,
  tapReward: 8.4,
  tapRedeem: 9.9,
  tapTip: 12.3,
  signStart: 15.4,
  signEnd: 16.6,
  tapSigGo: 17.3,
  tapEmail: 22.9,
};
const TAPS = [A.tapCheckin, A.tapReward, A.tapRedeem, A.tapTip, A.tapSigGo, A.tapEmail]
  .concat(DIGITS.map((_, i) => typeAt(i)));

/* cursor waypoints [t, x, y] */
const WP = [
  [0.0, 1180, 760],
];
DIGITS.forEach((d, i) => {
  const p = keyPos(keyOf(d));
  WP.push([typeAt(i) - 0.14, p[0], p[1]]);
  WP.push([typeAt(i) + 0.06, p[0], p[1]]);
});
WP.push([A.tapCheckin - 0.2, 1321, 780], [A.tapCheckin + 0.3, 1321, 780]);
WP.push([A.tapReward - 0.25, 324, 470], [A.tapReward + 0.3, 324, 470]);
WP.push([A.tapRedeem - 0.25, 1099, 688], [A.tapRedeem + 0.3, 1099, 688]);
WP.push([A.tapTip - 0.3, 229, 462], [A.tapTip + 0.4, 229, 462]);
WP.push([A.signStart, 470, 500]);
WP.push([A.signEnd, 650, 520]);
WP.push([A.tapSigGo - 0.25, 800, 742], [A.tapSigGo + 0.3, 800, 742]);
WP.push([A.tapEmail - 0.3, 1182, 521], [A.tapEmail + 0.4, 1182, 521]);
WP.push([25.4, 1182, 640]);

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
const pressed = (t, tp) => t >= tp && t < tp + 0.12;

/* signature path length */
const ink = $('ink');
const INK_LEN = ink.getTotalLength();
ink.style.strokeDasharray = INK_LEN;

const fmtPhone = (n) => {
  const d = DIGITS.slice(0, n).join('');
  const a = d.slice(0, 3), b = d.slice(3, 6), c = d.slice(6, 10);
  let s = '';
  if (a) s = '(' + a + (a.length === 3 ? ')' : '');
  if (b) s += ' ' + b;
  if (c) s += ' ' + c;
  return s.trim();
};

window.__render = function (t) {
  /* screen visibility */
  for (const k in S) {
    const el = $(k);
    const o = opacityOf(S[k], t);
    el.style.opacity = o;
    el.style.pointerEvents = 'none';
  }

  /* 1. loyalty keypad */
  const typed = DIGITS.filter((_, i) => t >= typeAt(i)).length;
  $('numv').textContent = typed ? fmtPhone(typed) : '(555) 555 5555';
  cls($('numv'), 'filled', typed > 0);
  KEYS.forEach((k, i) => {
    const el = $('k' + i);
    let sc = 1;
    DIGITS.forEach((d, n) => {
      if (keyOf(d) === i && pressed(t, typeAt(n))) sc = 0.94;
    });
    el.style.transform = 'scale(' + sc + ')';
  });
  const ready = typed === DIGITS.length;
  cls($('checkin'), 'live', ready);
  $('checkin').style.transform = pressed(t, A.tapCheckin) ? 'scale(0.98)' : 'scale(1)';

  /* 2. rewards */
  const rsel = t >= A.tapReward;
  cls($('r0'), 'on', rsel);
  $('r0').style.transform = pressed(t, A.tapReward) ? 'scale(0.985)' : 'scale(1)';
  cls($('redeem'), 'live', rsel);
  $('redeem').style.transform = pressed(t, A.tapRedeem) ? 'scale(0.98)' : 'scale(1)';

  /* 3. tip */
  const tsel = t >= A.tapTip;
  cls($('t0'), 'on', tsel);
  $('t0').style.transform = pressed(t, A.tapTip) ? 'scale(0.97)' : 'scale(1)';

  /* 4. signature */
  const sp = clamp((t - A.signStart) / (A.signEnd - A.signStart), 0, 1);
  ink.style.strokeDashoffset = (INK_LEN * (1 - sp)).toFixed(1);
  $('pane').querySelector('.hint').style.opacity = sp > 0.05 ? 0 : 1;
  $('siggo').style.transform = pressed(t, A.tapSigGo) ? 'scale(0.985)' : 'scale(1)';

  /* 5. tap to pay ring pulse */
  const pulse = (t - S.pay[0]) % 1.6 / 1.6;
  const ring = $('payring');
  ring.style.opacity = (t >= S.pay[0] && t < S.pay[1] ? (1 - pulse) * 0.85 : 0).toFixed(3);
  ring.style.transform = 'scale(' + (0.55 + 0.75 * ease(pulse)).toFixed(3) + ')';

  /* 6. receipt */
  const esel = t >= A.tapEmail;
  cls($('w2'), 'on', esel);
  $('w2').style.transform = pressed(t, A.tapEmail) ? 'scale(0.97)' : 'scale(1)';

  /* cursor + ripple */
  const cur = cursorAt(t);
  const inPay = t >= S.pay[0] + 0.2 && t < S.pay[1] - 0.1;
  const inTy = t >= S.ty[0];
  $('cursor').style.transform = 'translate(' + cur[0].toFixed(1) + 'px,' + cur[1].toFixed(1) + 'px)';
  $('cursor').style.opacity = inPay || inTy ? 0 : 1;

  let rv = 0, rs = 0.2;
  for (const tp of TAPS) {
    const p = clamp((t - tp) / 0.5, 0, 1);
    if (t >= tp && p < 1) { rv = 1 - p; rs = 0.2 + 0.9 * ease(p); }
  }
  const rip = $('rip');
  rip.style.opacity = rv * 0.85;
  rip.style.left = cur[0] + 'px';
  rip.style.top = cur[1] + 'px';
  rip.style.transform = 'scale(' + rs.toFixed(3) + ')';
};

window.__render(0);
