/* Deterministic POS demo timeline. render(t) with t in seconds. */
const FPS = 30, POS_DUR = 17.6, OFFSET = 8.6, DUR = OFFSET + POS_DUR;


const ITEMS = [
  ['Crispy Calamari','$12.99'],['Spinach Artichoke Dip','$10.99',{id:'item-spinach'}],['Loaded Potato Skins','$9.99'],['Mozzarella Sticks','$8.99'],
  ['Buffalo Wings (10pc)','$13.99',{plus:'plus-wings'}],['Chicken Tenders','$11.99'],['Fried Pickles','$7.99'],['Jalapeno Poppers','$9.99'],
  ['Nachos Grande','$12.99'],['Bar Burger Deluxe','$16.99'],['Fish & Chips','$15.99'],['Grilled Chicken Sandwich','$14.99'],
  ['Philly Cheesesteak','$17.99'],['BBQ Pulled Pork','$15.99'],['Club Sandwich','$14.99'],['Reuben Sandwich','$15.99'],
  ['BLT Deluxe','$12.99'],['Grilled Cheese & Tomato Soup','$11.99'],['Truffle Fries','$7.99',{plus:'plus-truffle'}],['Onion Rings','$6.99'],
  ['Coleslaw','$4.99'],['Sweet Potato Fries','$7.49'],['Mac & Cheese','$6.99'],['Side Salad','$5.99'],
  ['Garlic Bread','$4.99'],['Loaded Fries','$8.99'],['Cheese Curds','$8.99'],['House Salad','$9.99'],
  ['Caesar Salad','$10.99'],['Cobb Salad','$14.99'],['Greek Salad','$11.99'],['Buffalo Chicken Salad','$14.99'],
  ['Spinach Salad','$11.99'],['Wedge Salad','$10.99'],['Asian Chicken Salad','$13.99'],['Southwest Salad','$13.99'],
];
const grid = document.getElementById('grid');
ITEMS.forEach(([name, price, opt]) => {
  const d = document.createElement('div');
  d.className = 'item' + (opt && opt.plus ? ' hot' : '');
  if (opt && opt.id) d.id = opt.id;
  d.innerHTML = `<span>${name}</span><span class="price">${price}</span><span class="plus"${opt&&opt.plus?` id="${opt.plus}"`:''}>+</span>`;
  grid.appendChild(d);
});

const TICKETS = [
  ['114','Quick Order','DINE IN, 17:30 | 00:12 Min','Card','PAID','$46.67', true],
  ['113','Quick Order','DINE IN, 17:03 | 27:51 Min','Cash','PAID','$27.08', false],
  ['112','Quick Order','DINE IN, 17:03 | 28:37 Min','','ORDERED','$52.02', false],
  ['111','Guest','Dine-In, 16:52 | 34:10 Min','Staff','ORDERING','$0.00', false],
  ['110','Quick Order','DINE IN, 16:44 | 41:02 Min','Card','PAID','$18.40', false],
  ['109','Quick Order','DINE IN, 16:43 | 42:27 Min','','HOLD (5 min)','$21.45', false],
  ['108','Quick Order','DINE IN, 16:42 | 43:34 Min','Cash','PAID','$33.25', false],
  ['107','Quick Order','DINE IN, 16:41 | 44:18 Min','','HOLD (5 min)','$21.45', false],
  ['106','Quick Order','DINE IN, 16:38 | 47:20 Min','Cash','PAID','$26.97', false],
];
const tlist = document.getElementById('tlist');
TICKETS.forEach(([n, name, sub, pay, stat, amt, on], i) => {
  const d = document.createElement('div');
  d.className = 'trow';
  if (on) d.id = 'trow-114';
  const col = stat === 'PAID' ? '#eab308' : stat === 'ORDERED' ? '#9aa1ad' : stat.startsWith('HOLD') ? '#f59e0b' : '#ef4444';
  d.innerHTML = `<div class="tnum">${n}<div class="tsub">000</div></div>
    <div><div class="tname">${name}</div><div class="tsub">${sub}</div></div>
    <div style="margin-left:60px;font-size:12.5px;font-weight:700;color:#9aa1ad">${pay}</div>
    <div class="tpay"><div class="tstat" style="color:${col}">${stat}</div><div class="tamt">${amt}</div><div class="tsub">$0.00</div></div>`;
  tlist.appendChild(d);
});

const LINES = [
  { name: 'Spinach Artichoke Dip', price: '$21.49', mods: ['Extra Crispy', 'To-Go Container', 'Side Dressing', 'Add: Avocado +$2.50', 'Add: Bacon +$2.00', 'Add: Extra Cheese +$1.50', 'Add: Mushrooms +$1.00'] },
  { name: 'Buffalo Wings (10pc)', price: '$13.99', mods: ['Extra Spicy', 'Ranch on Side'] },
  { name: 'Truffle Fries', price: '$7.99', mods: ['Extra Parmesan'] },
];
const lines = document.getElementById('lines');
LINES.forEach((l, i) => {
  const d = document.createElement('div');
  d.className = 'line'; d.id = 'line' + i;
  d.innerHTML = `<div class="lhead"><span class="qty">1</span><span class="lname">${l.name}</span><span class="lprice">${l.price}</span></div>
    <div class="mods">${l.mods.map(m => '&bull; ' + m).join('<br/>')}</div>`;
  lines.appendChild(d);
});

const MODVALS = {
  size: [['Regular', ''], ['Large', '$2.00'], ['Extra Large', '$3.50']],
  prep: [['Standard', ''], ['Extra Crispy', ''], ['Well Done', ''], ['Lightly Baked', '']],
};
const modvals = document.getElementById('modvals');
function paintMods(group, selIdx) {
  modvals.innerHTML = MODVALS[group].map(([n, p], i) =>
    `<div class="chip${i === selIdx ? ' sel' : ''}" id="mv-${group}-${i}">${n}${p ? ` <span style="opacity:.6">${p}</span>` : ''}</div>`).join('');
}
paintMods('size', -1);

const $ = (id) => document.getElementById(id);
const easeIO = (p) => p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
const easeOut = (p) => 1 - Math.pow(1 - p, 3);
const clamp01 = (p) => Math.max(0, Math.min(1, p));
const seg = (t, a, b) => clamp01((t - a) / (b - a));
const money = (v) => '$' + v.toFixed(2);

/* taps: time + element id (measured once with overlays settled) */
const TAPS = [
  { t: 1.10, id: 'item-spinach' },
  { t: 2.40, id: 'mv-size-1' },
  { t: 3.20, id: 'mg-prep' },
  { t: 3.90, id: 'mv-prep-1' },
  { t: 4.70, id: 'sadd' },
  { t: 6.10, id: 'plus-wings' },
  { t: 7.20, id: 'plus-truffle' },
  { t: 8.30, id: 'charge' },
  { t: 9.70, id: 't-card' },
  { t: 10.60, id: 'paycharge' },
  { t: 13.60, id: 'norec' },
];
const START = { x: 1500, y: 960 };
let P = {};

function settleAndMeasure() {
  paintMods('prep', -1);
  const prepIds = ['mv-prep-0', 'mv-prep-1', 'mv-prep-2', 'mv-prep-3'];
  const overlays = ['sheet', 'paymodal', 'success'];
  overlays.forEach(id => { $(id).style.opacity = 1; $(id).style.transform = 'none'; });
  const collect = (ids) => ids.forEach(id => {
    const el = $(id); if (!el) return;
    const r = el.getBoundingClientRect();
    P[id] = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  collect(prepIds.concat(['mg-prep', 'sadd', 'item-spinach', 'plus-wings', 'plus-truffle', 'charge', 't-card', 'paycharge', 'norec']));
  paintMods('size', -1);
  collect(['mv-size-0', 'mv-size-1', 'mv-size-2']);
  overlays.forEach(id => { $(id).style.opacity = 0; });
}

function render(t) {
  /* ---- reset transient ---- */
  ['item-spinach', 'plus-wings', 'plus-truffle', 'charge', 'sadd', 'mg-prep', 't-card', 'paycharge', 'norec', 'mv-size-1', 'mv-prep-1']
    .forEach(id => { const el = $(id); if (el) el.style.transform = ''; });

  /* ---- modifier group + selections ---- */
  const prepActive = t >= 3.20;
  paintMods(prepActive ? 'prep' : 'size', prepActive ? (t >= 3.90 ? 1 : -1) : (t >= 2.40 ? 1 : -1));
  $('mg-size').className = 'chip' + (prepActive ? '' : ' sel');
  $('mg-prep').className = 'chip' + (prepActive ? ' sel' : '');
  const sizeUp = t >= 2.40;
  $('sheetprice').textContent = sizeUp ? '$12.99' : '$10.99';
  $('sadd').textContent = sizeUp ? 'ADD $12.99' : 'ADD $10.99';

  /* ---- sheet ---- */
  const sIn = seg(t, 1.25, 1.85), sOut = seg(t, 4.72, 5.15);
  const sheetVis = easeOut(sIn) * (1 - easeIO(sOut));
  $('sheet').style.opacity = sheetVis;
  $('sheet').style.transform = `translateY(${(1 - easeOut(sIn)) * 70 + easeIO(sOut) * 50}px) scale(${0.97 + 0.03 * easeOut(sIn)})`;

  /* ---- check lines ---- */
  const addTimes = [5.00, 6.16, 7.26];
  let n = 0;
  addTimes.forEach((at, i) => {
    const p = easeOut(seg(t, at, at + 0.45));
    const el = $('line' + i);
    el.style.opacity = p;
    el.style.transform = `translateY(${(1 - p) * 14}px)`;
    if (t >= at) n = i + 1;
  });
  $('empty').style.display = t >= 5.0 ? 'none' : 'flex';
  $('lines').style.display = t >= 5.0 ? 'block' : 'none';

  const subs = [0, 21.49, 35.48, 43.47];
  let sub = subs[n];
  if (n > 0) { const at = addTimes[n - 1]; sub = subs[n - 1] + (subs[n] - subs[n - 1]) * easeOut(seg(t, at, at + 0.5)); }
  const tax = sub * 0.0736;
  $('tsub').textContent = money(sub);
  $('ttax').textContent = money(tax);
  $('charge').textContent = 'CHARGE ' + money(sub + tax);
  $('ordnum').textContent = '115';

  /* ---- payment modal ---- */
  const pIn = seg(t, 8.42, 9.00), pOut = seg(t, 11.42, 11.72);
  const payVis = easeOut(pIn) * (1 - easeIO(pOut));
  $('paymodal').style.opacity = payVis;
  $('paymodal').style.transform = `translateY(${(1 - easeOut(pIn)) * 60 - easeIO(pOut) * 24}px) scale(${0.97 + 0.03 * easeOut(pIn) - 0.02 * easeIO(pOut)})`;
  $('t-card').className = 'tender' + (t >= 9.70 ? ' sel' : '');
  const processing = t >= 10.62 && t < 11.5;
  $('amount').textContent = processing ? 'Processing' + '.'.repeat(1 + (Math.floor((t - 10.62) * 3) % 3)) : '$46.67';
  $('amount').style.color = processing ? '#e5e7eb' : '#22c55e';
  $('paycharge').style.opacity = processing ? 0.45 : 1;

  /* ---- success ---- */
  const scIn = seg(t, 11.78, 12.18), scOut = seg(t, 13.62, 14.05);
  const scVis = easeOut(scIn) * (1 - easeIO(scOut));
  $('success').style.opacity = scVis;
  $('success').style.transform = `translateY(${(1 - easeOut(scIn)) * 40}px)`;
  const tickP = easeOut(seg(t, 11.98, 12.45));
  $('tick').style.transform = `scale(${0.4 + 0.6 * tickP})`;
  $('tick').style.opacity = tickP;
  $('change').style.opacity = easeOut(seg(t, 12.35, 12.8));

  /* ---- scrim ---- */
  const scrim = Math.max(sheetVis, payVis, scVis);
  $('scrim').style.opacity = scrim * 0.9;

  /* ---- tickets view ---- */
  const tv = easeOut(seg(t, 13.75, 14.35));
  $('ticketsview').style.opacity = tv;
  $('ticketsview').style.transform = `translateX(${(1 - tv) * 60}px)`;
  $('menuview').style.opacity = 1 - tv;
  const hl = easeOut(seg(t, 14.4, 14.9));
  $('trow-114').style.outline = hl > 0.5 ? '2px solid #fff' : 'none';
  $('trow-114').style.background = hl > 0.5 ? '#16202f' : '#111722';

  /* ---- reset wipe to loop ---- */
  const fUp = easeIO(seg(t, 16.60, 17.05)), fDn = easeIO(seg(t, 17.15, 17.60));
  $('fader').style.opacity = fUp - fDn;
  if (t >= 17.12) { /* back to idle menu */
    $('ticketsview').style.opacity = 0; $('menuview').style.opacity = 1;
    $('empty').style.display = 'flex'; $('lines').style.display = 'none';
    $('tsub').textContent = '$0.00'; $('ttax').textContent = '$0.00'; $('charge').textContent = 'CHARGE $0.00';
    $('success').style.opacity = 0; $('scrim').style.opacity = 0;
  }

  /* ---- cursor + ripple ---- */
  let from = START, to = TAPS[0], prevT = 0;
  for (let i = 0; i < TAPS.length; i++) {
    if (t <= TAPS[i].t || i === TAPS.length - 1) { to = TAPS[i]; from = i === 0 ? START : P[TAPS[i - 1].id]; prevT = i === 0 ? 0 : TAPS[i - 1].t; break; }
  }
  const target = P[to.id] || START;
  const travelStart = Math.max(prevT + 0.18, to.t - 0.75);
  const cp = easeIO(seg(t, travelStart, to.t));
  const cx = from.x + (target.x - from.x) * cp;
  const cy = from.y + (target.y - from.y) * cp;
  const cur = $('cursor');
  const hidden = t > 16.5;
  cur.style.opacity = hidden ? 0 : 1;
  cur.style.left = cx + 'px';
  cur.style.top = cy + 'px';

  const rp = $('ripple');
  rp.style.opacity = 0;
  for (const tap of TAPS) {
    const p = (t - tap.t) / 0.45;
    if (p >= 0 && p <= 1) {
      const pt = P[tap.id] || START;
      rp.style.left = pt.x + 'px'; rp.style.top = pt.y + 'px';
      rp.style.transform = `scale(${0.25 + 1.15 * easeOut(p)})`;
      rp.style.opacity = 0.6 * (1 - p);
    }
    const pr = (t - tap.t) / 0.14;
    if (pr >= 0 && pr <= 1) {
      const el = $(tap.id);
      if (el) el.style.transform = `scale(${1 - 0.045 * Math.sin(pr * Math.PI)})`;
    }
  }
}

settleAndMeasure();
window.__render = render;
window.__meta = { fps: FPS, dur: DUR, frames: Math.round(FPS * DUR) };
render(0);
