// ============================================
//   GLO'S COOKIES — JAVASCRIPT
// ============================================
//   HOW TO EDIT:
//   - Change Glo's email address below (GLO_EMAIL)
//   - Add/remove flavours in the FLAVOURS array
//   - Change prices in the PRICES object
// ============================================

// ── CHANGE THIS TO GLO'S REAL EMAIL ──────────
const GLO_EMAIL = 'gloscookies@gmail.com';

// ── EDIT FLAVOURS HERE ────────────────────────
// Format: { name: "Flavour Name", emoji: "🍪" }
// Add a new line to add a new flavour
// Delete a line to remove a flavour
const FLAVOURS = [
  { name: "Oreo",                  emoji: "🖤" },
  { name: "S'more",                emoji: "🔥" },
  { name: "Biscoff",               emoji: "🥜" },
  { name: "Red Velvet Cheesecake", emoji: "❤️" },
  { name: "Matcha",                emoji: "🍵" },
  { name: "Chocolate Chip",        emoji: "🍫" },
  { name: "Dubai Choco Chip",      emoji: "🌟" },
];

// ── EDIT PRICES HERE ──────────────────────────
// Format: { number_of_cookies: price_in_dollars }
const PRICES = { 3: 15, 4: 18, 6: 25, 12: 42, 13: 0 };

// ── ORDER STATE (don't edit this) ────────────
let state = { name: '', email: '', notes: '', qty: 0, price: 0, flavours: [] };


// ════════════════════════════════════════════
//   CURSOR
// ════════════════════════════════════════════
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .flavour-card, .price-card, .qty-card, .big-cookie').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});


// ════════════════════════════════════════════
//   NAVBAR — shrinks on scroll
// ════════════════════════════════════════════
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 40);
});


// ════════════════════════════════════════════
//   CANVAS PARTICLE EFFECT
// ════════════════════════════════════════════
const canvas = document.getElementById('cookieCanvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
class Particle {
  constructor(x, y) {
    this.x    = x ?? Math.random() * canvas.width;
    this.y    = y ?? Math.random() * canvas.height;
    this.vx   = (Math.random() - .5) * 1.2;
    this.vy   = (Math.random() - .5) * 1.2;
    this.r    = Math.random() * 3 + 1;
    this.a    = Math.random() * .18 + .04;
    this.c    = ['#8B4513', '#D4956A', '#C47A2B', '#E8A045'][Math.floor(Math.random() * 4)];
    this.life = 1;
    this.d    = Math.random() * .003 + .001;
  }
  update() { this.x += this.vx; this.y += this.vy; this.life -= this.d; }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.a * this.life;
    ctx.fillStyle   = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

(function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
      particles.push(new Particle());
    }
  }
  requestAnimationFrame(loop);
})();


// ════════════════════════════════════════════
//   CLICK BURST EFFECT
// ════════════════════════════════════════════
const burstEmojis = ['🍪', '✨', '🍫', '💛', '🎉', '❤️', '🥜', '🍵'];

function spawnBurst(x, y, count = 6) {
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.classList.add('burst');
    b.textContent          = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
    b.style.left           = (x + (Math.random() - .5) * 70) + 'px';
    b.style.top            = (y + (Math.random() - .5) * 70) + 'px';
    b.style.animationDelay = (Math.random() * .2) + 's';
    document.body.appendChild(b);
    b.addEventListener('animationend', () => b.remove());
  }
  for (let i = 0; i < 15; i++) particles.push(new Particle(x, y));
}

const bigCookie = document.getElementById('bigCookie');
bigCookie.addEventListener('click', e => {
  spawnBurst(e.clientX, e.clientY);
  bigCookie.style.transform = 'scale(1.25) rotate(-15deg)';
  setTimeout(() => bigCookie.style.transform = '', 300);
});

document.addEventListener('click', e => {
  if (!e.target.closest('a, button, input, select, .big-cookie')) {
    spawnBurst(e.clientX, e.clientY, 3);
  }
});


// ════════════════════════════════════════════
//   ORBITING MINI COOKIES (hero animation)
// ════════════════════════════════════════════
const heroVisual = document.getElementById('heroVisual');
[
  { e: '🍫', r: 150, d: 0,   t: 8  },
  { e: '🍵', r: 150, d: 2.7, t: 8  },
  { e: '❤️', r: 150, d: 5.3, t: 8  },
  { e: '🥜', r: 220, d: 0,   t: 14 },
  { e: '🖤', r: 220, d: 4.7, t: 14 },
  { e: '🔥', r: 220, d: 9.3, t: 14 },
].forEach(o => {
  const m = document.createElement('div');
  m.classList.add('mini-cookie');
  m.textContent   = o.e;
  m.style.cssText = `left: calc(50% + ${o.r}px); top: 50%; transform-origin: -${o.r}px 0; animation-duration: ${o.t}s; animation-delay: -${o.d}s;`;
  heroVisual.appendChild(m);
});


// ════════════════════════════════════════════
//   FLOATING BACKGROUND CRUMBS
// ════════════════════════════════════════════
for (let i = 0; i < 14; i++) {
  const c = document.createElement('div');
  c.classList.add('crumb');
  const s = Math.random() * 18 + 8;
  c.style.cssText = `width: ${s}px; height: ${s}px; left: ${Math.random() * 100}vw; animation-duration: ${Math.random() * 14 + 10}s; animation-delay: -${Math.random() * 20}s;`;
  document.body.appendChild(c);
}


// ════════════════════════════════════════════
//   ANIMATED COUNTERS (stats strip)
// ════════════════════════════════════════════
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el    = e.target;
      const tgt   = parseFloat(el.dataset.target);
      const pre   = el.dataset.prefix || '';
      const suf   = el.dataset.suffix || '';
      const isF   = tgt % 1 !== 0;
      const dur   = 1500;
      const start = performance.now();
      (function tick(now) {
        const p    = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const v    = tgt * ease;
        el.textContent = pre + (isF ? v.toFixed(2) : Math.round(v)) + suf;
        if (p < 1) requestAnimationFrame(tick);
      })(start);
      counterObs.unobserve(el);
    }
  });
}, { threshold: .5 });
document.querySelectorAll('[data-target]').forEach(c => counterObs.observe(c));


// ════════════════════════════════════════════
//   SCROLL REVEAL ANIMATIONS
// ════════════════════════════════════════════
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


// ════════════════════════════════════════════
//   ORDER FORM
// ════════════════════════════════════════════

function setStep(n) {
  for (let i = 1; i <= 5; i++) {
    const sf = document.getElementById('sf' + i);
    if (sf) sf.classList.toggle('active', i === n);
  }
  for (let i = 1; i <= 4; i++) {
    const pd = document.getElementById('pd' + i);
    const ps = document.getElementById('ps' + i);
    const pl = document.getElementById('pl' + i);
    if (!pd) continue;
    pd.classList.remove('active', 'done');
    ps.classList.remove('active-step', 'done-step');
    if (i < n) {
      pd.classList.add('done'); pd.textContent = '✓';
      ps.classList.add('done-step');
      if (pl) pl.classList.add('done');
    } else if (i === n) {
      pd.classList.add('active'); pd.textContent = i;
      ps.classList.add('active-step');
      if (pl) pl.classList.remove('done');
    } else {
      pd.textContent = i;
      if (pl) pl.classList.remove('done');
    }
  }
  document.getElementById('order').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goToStep(n) {
  if (n === 2 && !validateStep1()) return;
  if (n === 3 && !validateStep2()) return;
  if (n === 4 && !validateStep3()) return;
  if (n === 3) buildFlavourSlots();
  if (n === 4) buildSummary();
  setStep(n);
}

// ── VALIDATION ──

function validateStep1() {
  const name    = document.getElementById('inputName').value.trim();
  const email   = document.getElementById('inputEmail').value.trim();
  const nameOk  = name.length > 1;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  document.getElementById('errName').classList.toggle('show', !nameOk);
  document.getElementById('inputName').classList.toggle('error', !nameOk);
  document.getElementById('errEmail').classList.toggle('show', !emailOk);
  document.getElementById('inputEmail').classList.toggle('error', !emailOk);

  if (nameOk && emailOk) {
    state.name  = name;
    state.email = email;
    state.notes = document.getElementById('inputNotes').value.trim();
    return true;
  }
  return false;
}

function validateStep2() {
  const errQty = document.getElementById('errQty');

  if (!state.qty) {
    errQty.textContent = 'Please select a quantity.';
    errQty.classList.add('show');
    return false;
  }

  // If 12+ selected, check the custom input
  if (state.qty === 13) {
    const custom = parseInt(document.getElementById('customQtyInput').value);
    if (!custom || custom < 13) {
      errQty.textContent = 'Please enter a number of 13 or more.';
      errQty.classList.add('show');
      return false;
    }
    state.qty = custom;
  }

  errQty.classList.remove('show');
  return true;
}

function validateStep3() {
  const selects = document.querySelectorAll('.slot-select');
  let ok = true;
  selects.forEach(s => {
    if (!s.value) { s.classList.add('error'); ok = false; }
    else            s.classList.remove('error');
  });
  document.getElementById('errFlavour').classList.toggle('show', !ok);
  if (ok) state.flavours = Array.from(selects).map(s => s.value);
  return ok;
}

// ── QUANTITY SELECTION ──

function selectQty(card, qty, price) {
  document.querySelectorAll('.qty-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  state.qty   = qty;
  state.price = price;
  document.getElementById('errQty').classList.remove('show');

  // Show custom number input only for 12+ option
  const customBox = document.getElementById('customQtyBox');
  if (qty === 13) {
    customBox.style.display = 'block';
  } else {
    customBox.style.display = 'none';
    document.getElementById('customQtyInput').value = '';
  }

  const r = card.getBoundingClientRect();
  spawnBurst(r.left + r.width / 2, r.top + r.height / 2, 4);
}

function startOrder(qty) {
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    document.querySelectorAll('.qty-card').forEach(c => {
      const n = parseInt(c.querySelector('.qty-num').textContent);
      c.classList.toggle('selected', n === qty);
      if (n === qty) { state.qty = qty; state.price = PRICES[qty] ?? 0; }
    });
    // Show custom box if 12+ was clicked from pricing section
    const customBox = document.getElementById('customQtyBox');
    if (qty === 13) {
      customBox.style.display = 'block';
    } else {
      customBox.style.display = 'none';
    }
    setStep(2);
  }, 600);
}

// ── FLAVOUR SLOTS (Step 3) ──

function buildFlavourSlots() {
  const container = document.getElementById('flavourSlots');
  document.getElementById('flavourSub').textContent =
    `Select a flavour for each of your ${state.qty} cookies. You can repeat flavours!`;
  container.innerHTML = '';

  for (let i = 0; i < state.qty; i++) {
    const prev = state.flavours[i] || '';
    const slot = document.createElement('div'); slot.classList.add('flavour-slot');
    const emo  = document.createElement('span'); emo.classList.add('slot-emoji'); emo.textContent = '🍪';
    const lbl  = document.createElement('div');  lbl.classList.add('slot-label');  lbl.textContent = `Cookie ${i + 1}`;
    const sel  = document.createElement('select'); sel.classList.add('slot-select');

    sel.innerHTML = `<option value="">-- Pick a flavour --</option>` +
      FLAVOURS.map(f => `<option value="${f.name}"${prev === f.name ? ' selected' : ''}>${f.emoji} ${f.name}</option>`).join('');

    if (prev) emo.textContent = FLAVOURS.find(f => f.name === prev)?.emoji || '🍪';

    sel.addEventListener('change', () => {
      emo.textContent = sel.value ? (FLAVOURS.find(f => f.name === sel.value)?.emoji || '🍪') : '🍪';
      sel.classList.remove('error');
      document.getElementById('errFlavour').classList.remove('show');
    });

    slot.append(emo, lbl, sel);
    container.appendChild(slot);
  }
}

// ── ORDER SUMMARY (Step 4) ──

function buildSummary() {
  const counts = {};
  state.flavours.forEach(f => counts[f] = (counts[f] || 0) + 1);
  const flavourLines = Object.entries(counts).map(([f, c]) => `<li>${c}× ${f}</li>`).join('');

  document.getElementById('summaryBox').innerHTML = `
    <div class="summary-row"><span class="summary-label">Name</span><span class="summary-value">${state.name}</span></div>
    <div class="summary-row"><span class="summary-label">Email</span><span class="summary-value">${state.email}</span></div>
    <div class="summary-row"><span class="summary-label">Quantity</span><span class="summary-value">${state.qty} cookies</span></div>
    <div class="summary-row" style="flex-direction:column;align-items:flex-start;gap:8px;">
      <span class="summary-label">Flavours</span>
      <ul class="flavours-list">${flavourLines}</ul>
    </div>
    ${state.notes ? `<div class="summary-row"><span class="summary-label">Notes</span><span class="summary-value">${state.notes}</span></div>` : ''}
    <div class="summary-row"><span class="summary-label">Total</span><span class="summary-value summary-total">${state.price === 0 ? 'To be confirmed by Glo' : '$' + state.price + ' CAD'}</span></div>
    <div class="summary-row" style="font-size:.85rem;"><span class="summary-label">📅 Pickup</span><span class="summary-value">Saturday · Scarborough/Markham</span></div>
    <div class="summary-row" style="font-size:.85rem;"><span class="summary-label">💸 Payment</span><span class="summary-value">E-transfer after confirmation</span></div>
  `;
}

// ── SUBMIT ORDER ──

function submitOrder() {
  let ok = true;
  if (!document.getElementById('chkAllergy').checked) {
    document.getElementById('errAllergy').classList.add('show'); ok = false;
  } else {
    document.getElementById('errAllergy').classList.remove('show');
  }
  if (!document.getElementById('chkPolicy').checked) {
    document.getElementById('errPolicy').classList.add('show'); ok = false;
  } else {
    document.getElementById('errPolicy').classList.remove('show');
  }
  if (!ok) return;

  const counts      = {};
  state.flavours.forEach(f => counts[f] = (counts[f] || 0) + 1);
  const flavourText = Object.entries(counts).map(([f, c]) => `  - ${c}x ${f}`).join('\n');
  const totalText   = state.price === 0 ? 'To be confirmed' : `$${state.price} CAD`;
  const body        = `Hi Glo! I'd like to place a cookie order 🍪\n\nName: ${state.name}\nEmail: ${state.email}\nQuantity: ${state.qty} cookies\nTotal: ${totalText}\n\nFlavours:\n${flavourText}${state.notes ? '\n\nSpecial Notes: ' + state.notes : ''}\n\nI have acknowledged the allergy notice and agreed to the order policies.\n\nPlease confirm my order and send payment details. Thank you! 😊`;
  const subject     = `🍪 Cookie Order – ${state.name} – ${state.qty} cookies`;

  document.getElementById('emailLink').href =
    `mailto:${GLO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  for (let i = 1; i <= 5; i++) {
    const sf = document.getElementById('sf' + i);
    if (sf) sf.classList.toggle('active', i === 5);
  }
  for (let i = 1; i <= 4; i++) {
    const pd = document.getElementById('pd' + i);
    const ps = document.getElementById('ps' + i);
    const pl = document.getElementById('pl' + i);
    if (pd) {
      pd.classList.add('done'); pd.classList.remove('active'); pd.textContent = '✓';
      if (ps) { ps.classList.add('done-step'); ps.classList.remove('active-step'); }
      if (pl) pl.classList.add('done');
    }
  }

  spawnBurst(innerWidth / 2, innerHeight / 2, 24);
  document.getElementById('order').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── RESET ORDER ──

function resetOrder() {
  state = { name: '', email: '', notes: '', qty: 0, price: 0, flavours: [] };
  ['inputName', 'inputEmail', 'inputNotes'].forEach(id => document.getElementById(id).value = '');
  ['chkAllergy', 'chkPolicy'].forEach(id => document.getElementById(id).checked = false);
  document.querySelectorAll('.qty-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('customQtyBox').style.display = 'none';
  document.getElementById('customQtyInput').value = '';
  setStep(1);
}