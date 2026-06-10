/* =============================================
   KƏŞF — Azerbaijan Discovery Platform
   app.js — All interactivity, animation, data
   ============================================= */

// ─── DATA ───────────────────────────────────────
const CATEGORIES = [
  { icon: '🍽', name: 'Restaurants', count: '3,240+', id: 'restaurants' },
  { icon: '☕', name: 'Cafes & Tea', count: '1,180+', id: 'cafes' },
  { icon: '💨', name: 'Shisha Bars', count: '420+', id: 'shisha' },
  { icon: '🌙', name: 'Nightlife', count: '310+', id: 'nightlife' },
  { icon: '🏨', name: 'Hotels', count: '890+', id: 'hotels' },
  { icon: '🎭', name: 'Experiences', count: '560+', id: 'experiences' },
];

const LISTINGS = [
  {
    id: 1,
    name: 'Firuze Restaurant',
    category: 'Fine Dining',
    emoji: '🍷',
    rating: 4.9,
    reviews: 1240,
    tags: ['Azerbaijani', 'Sea View', 'Romantic'],
    location: 'Baku Boulevard',
    price: '$$$',
    badge: 'Top Pick',
    badgeType: 'gold',
    bg: '#2D1525',
  },
  {
    id: 2,
    name: 'Çay Evi 145',
    category: 'Traditional Tea House',
    emoji: '🫖',
    rating: 4.8,
    reviews: 876,
    tags: ['Traditional', 'Cosy', 'Heritage'],
    location: 'İçərişəhər',
    price: '$',
    badge: 'Hidden Gem',
    badgeType: 'flame',
    bg: '#1A2010',
  },
  {
    id: 3,
    name: 'Nargile Lounge',
    category: 'Shisha & Cocktails',
    emoji: '💨',
    rating: 4.7,
    reviews: 543,
    tags: ['Rooftop', 'Views', 'Nightlife'],
    location: 'Fountain Square',
    price: '$$',
    badge: 'Trending',
    badgeType: 'flame',
    bg: '#1A1030',
  },
  {
    id: 4,
    name: 'Palıd Brasserie',
    category: 'European Fusion',
    emoji: '🥩',
    rating: 4.8,
    reviews: 2100,
    tags: ['Fusion', 'Award Winning', 'Business'],
    location: 'Nizami Street',
    price: '$$$',
    badge: null,
    bg: '#251510',
  },
  {
    id: 5,
    name: 'Karvan Coffee',
    category: 'Specialty Coffee',
    emoji: '☕',
    rating: 4.9,
    reviews: 1680,
    tags: ['Specialty', 'Work-Friendly', 'Brunch'],
    location: 'Sahil Metro',
    price: '$$',
    badge: 'Best Coffee',
    badgeType: 'gold',
    bg: '#1E1505',
  },
  {
    id: 6,
    name: 'Sea Breeze Resort',
    category: 'Beach Restaurant',
    emoji: '🌊',
    rating: 4.6,
    reviews: 987,
    tags: ['Beach', 'Seafood', 'Sunset'],
    location: 'Novkhani',
    price: '$$$',
    badge: null,
    bg: '#0D1A2D',
  },
];

const TOP_REVIEWED = [
  { name: 'Şirvanşah Museum Restaurant', cat: 'Historical Dining', emoji: '🏰', stars: 5, review: '"You feel like you are eating in the 15th century. Unreal atmosphere and the lamb was perfect."' },
  { name: 'Kafe Literaturnıy', cat: 'Cafe & Books', emoji: '📚', stars: 5, review: '"The best espresso in all of Baku. Staff know every book on the shelf."' },
  { name: 'Mugham Club', cat: 'Music & Dinner', emoji: '🎵', stars: 5, review: '"Live mugham music + traditional food = goosebumps all night. 10/10."' },
  { name: 'Dolma Restaurant', cat: 'Azerbaijani', emoji: '🫙', stars: 5, review: '"My grandmother could not make it better. This is what home tastes like."' },
  { name: 'Park Inn Rooftop', cat: 'Cocktail Bar', emoji: '🍸', stars: 5, review: '"The view of the flame towers at night is worth every manat."' },
  { name: 'Sumakh Art Café', cat: 'Art & Coffee', emoji: '🎨', stars: 5, review: '"Half gallery half café. The pomegranate dessert changed my life."' },
];

const FILTERS = ['All', 'Restaurants', 'Cafes', 'Shisha', 'Nightlife', 'Hotels', 'Experiences'];

const ROTATE_WORDS = ['favourite spot', 'next adventure', 'hidden gem', 'best meal', 'perfect café', 'new obsession'];

// ─── STATE ──────────────────────────────────────
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let ringX = 0, ringY = 0;
let rotateIdx = 0;
let savedListings = new Set();
let activeFilter = 'All';
let visibleCount = 6;
let scrollY = 0;

// ─── INIT ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initCanvas();
  initNav();
  initRotatingWord();
  initCategories();
  initFilterPills();
  initListings();
  initHorizontalScroll();
  initBizMockup();
  initStats();
  initScrollEffects();
  initSearchInteractions();
  initStickySearch();
  initParallax();
  initRevealObserver();
  initTagInteraction();
});

// ─── CURSOR ─────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.9;
    cursorY += (mouseY - cursorY) * 0.9;
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .tag, .cat-card, .listing-card, .hcard, .filter-pill, input').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ─── TILE CANVAS ────────────────────────────────
function initCanvas() {
  const canvas = document.getElementById('tile-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, tiles = [], frame = 0;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    buildTiles();
  }

  function buildTiles() {
    tiles = [];
    const size = 60;
    const cols = Math.ceil(w / size) + 2;
    const rows = Math.ceil(h / size) + 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        tiles.push({
          x: c * size - size / 2,
          y: r * size - size / 2,
          size,
          phase: (r + c) * 0.3,
          type: (r + c) % 3,
        });
      }
    }
  }

  function drawTile(t, time) {
    const pulse = Math.sin(time * 0.6 + t.phase) * 0.5 + 0.5;
    const alpha = 0.15 + pulse * 0.25;
    ctx.strokeStyle = `rgba(212, 168, 67, ${alpha})`;
    ctx.lineWidth = 0.8;

    const cx = t.x + t.size / 2;
    const cy = t.y + t.size / 2;
    const s = t.size / 2 - 4;

    ctx.beginPath();
    if (t.type === 0) {
      // Diamond
      ctx.moveTo(cx, cy - s);
      ctx.lineTo(cx + s, cy);
      ctx.lineTo(cx, cy + s);
      ctx.lineTo(cx - s, cy);
      ctx.closePath();
    } else if (t.type === 1) {
      // 8-pointed star (simplified)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const r = i % 2 === 0 ? s : s * 0.45;
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
    } else {
      // Cross / plus
      ctx.moveTo(cx, cy - s);
      ctx.lineTo(cx + s * 0.3, cy - s * 0.3);
      ctx.lineTo(cx + s, cy);
      ctx.lineTo(cx + s * 0.3, cy + s * 0.3);
      ctx.lineTo(cx, cy + s);
      ctx.lineTo(cx - s * 0.3, cy + s * 0.3);
      ctx.lineTo(cx - s, cy);
      ctx.lineTo(cx - s * 0.3, cy - s * 0.3);
      ctx.closePath();
    }
    ctx.stroke();
  }

  function animate() {
    frame++;
    const time = frame * 0.016;
    ctx.clearRect(0, 0, w, h);
    tiles.forEach(t => drawTile(t, time));
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
}

// ─── NAV SCROLL ─────────────────────────────────
function initNav() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    scrollY = window.scrollY;
  }, { passive: true });
}

// ─── ROTATING WORD ───────────────────────────────
function initRotatingWord() {
  const el = document.getElementById('rotating-word');
  if (!el) return;

  function rotate() {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    setTimeout(() => {
      rotateIdx = (rotateIdx + 1) % ROTATE_WORDS.length;
      el.textContent = ROTATE_WORDS[rotateIdx];
      el.style.transition = 'opacity 0.5s, transform 0.5s';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 350);
  }

  el.style.transition = 'opacity 0.5s, transform 0.5s';
  setInterval(rotate, 2800);
}

// ─── CATEGORIES ──────────────────────────────────
function initCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;

  CATEGORIES.forEach((cat, i) => {
    const card = document.createElement('div');
    card.className = `cat-card reveal reveal-delay-${Math.min(i + 1, 5)}`;
    card.innerHTML = `
      <div class="cat-icon">${cat.icon}</div>
      <div class="cat-name">${cat.name}</div>
      <div class="cat-count">${cat.count}</div>
    `;
    card.addEventListener('click', () => {
      document.querySelectorAll('.tag').forEach(t => {
        if (t.dataset.cat === cat.id) t.classList.add('active');
        else t.classList.remove('active');
      });
      filterListings(cat.name);
    });
    grid.appendChild(card);
  });
}

// ─── FILTER PILLS ────────────────────────────────
function initFilterPills() {
  const wrap = document.getElementById('filter-pills');
  if (!wrap) return;

  FILTERS.forEach(f => {
    const pill = document.createElement('button');
    pill.className = 'filter-pill' + (f === 'All' ? ' active' : '');
    pill.textContent = f;
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = f;
      filterListings(f);
    });
    wrap.appendChild(pill);
  });
}

function filterListings(filter) {
  activeFilter = filter;
  renderListings();
}

// ─── LISTINGS ────────────────────────────────────
function initListings() {
  renderListings();
  document.getElementById('load-more-btn')?.addEventListener('click', () => {
    visibleCount += 3;
    renderListings();
  });
}

function renderListings() {
  const grid = document.getElementById('listings-grid');
  if (!grid) return;

  let filtered = LISTINGS;
  if (activeFilter !== 'All') {
    filtered = LISTINGS.filter(l =>
      l.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
      l.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()))
    );
  }

  const toShow = filtered.slice(0, visibleCount);
  grid.innerHTML = '';

  toShow.forEach((listing, i) => {
    const card = document.createElement('div');
    card.className = `listing-card reveal reveal-delay-${(i % 3) + 1}`;
    const isSaved = savedListings.has(listing.id);
    const starsHtml = '★'.repeat(Math.floor(listing.rating)) + (listing.rating % 1 >= 0.5 ? '½' : '');

    card.innerHTML = `
      <div class="listing-img" style="background:${listing.bg}">
        <div class="listing-img-inner">${listing.emoji}</div>
        ${listing.badge ? `<div class="listing-badge ${listing.badgeType === 'gold' ? 'gold' : ''}">${listing.badge}</div>` : ''}
        <div class="listing-save" data-id="${listing.id}">${isSaved ? '❤️' : '🤍'}</div>
      </div>
      <div class="listing-body">
        <div class="listing-cat">${listing.category}</div>
        <div class="listing-name">${listing.name}</div>
        <div class="listing-meta">
          <span class="stars">${starsHtml}</span>
          <span class="rating-num">${listing.rating}</span>
          <span class="review-count">(${listing.reviews.toLocaleString()})</span>
        </div>
        <div class="listing-tags">
          ${listing.tags.map(t => `<span class="ltag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="listing-footer">
        <span class="listing-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          ${listing.location}
        </span>
        <span class="listing-price">${listing.price}</span>
      </div>
    `;

    card.querySelector('.listing-save').addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(e.currentTarget.dataset.id);
      if (savedListings.has(id)) {
        savedListings.delete(id);
        e.currentTarget.textContent = '🤍';
      } else {
        savedListings.add(id);
        e.currentTarget.textContent = '❤️';
        pulseHeart(e.currentTarget);
      }
    });

    grid.appendChild(card);
  });

  // re-observe new cards
  observeReveal();

  const btn = document.getElementById('load-more-btn');
  if (btn) btn.style.display = visibleCount >= filtered.length ? 'none' : 'inline-block';
}

function pulseHeart(el) {
  el.style.transform = 'scale(1.4)';
  el.style.transition = 'transform 0.2s';
  setTimeout(() => {
    el.style.transform = 'scale(1)';
  }, 200);
}

// ─── HORIZONTAL SCROLL ───────────────────────────
function initHorizontalScroll() {
  const wrap = document.getElementById('horizontal-scroll');
  if (!wrap) return;

  TOP_REVIEWED.forEach(item => {
    const card = document.createElement('div');
    card.className = 'hcard';
    const stars = '★'.repeat(item.stars);
    card.innerHTML = `
      <div class="hcard-img">${item.emoji}</div>
      <div class="hcard-body">
        <div class="hcard-cat">${item.cat}</div>
        <div class="hcard-name">${item.name}</div>
        <div class="hcard-stars">${stars}</div>
        <div class="hcard-review">${item.review}</div>
      </div>
    `;
    wrap.appendChild(card);
  });

  // Drag to scroll
  let isDown = false, startX, scrollLeft;
  wrap.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
    wrap.style.cursor = 'grabbing';
  });
  wrap.addEventListener('mouseleave', () => { isDown = false; wrap.style.cursor = 'default'; });
  wrap.addEventListener('mouseup', () => { isDown = false; wrap.style.cursor = 'default'; });
  wrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrap.scrollLeft = scrollLeft - walk;
  });
}

// ─── BIZ MOCKUP CANVAS ───────────────────────────
function initBizMockup() {
  const mockup = document.getElementById('biz-mockup');
  if (!mockup) return;

  // Build a fake analytics dashboard inside the mockup
  mockup.innerHTML = `
    <div style="padding:24px;height:100%;display:flex;flex-direction:column;gap:16px;position:relative;z-index:1">
      <div style="font-family:'Playfair Display',serif;font-size:1rem;color:rgba(245,240,232,0.9);font-weight:700">📊 Business Dashboard</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div style="background:rgba(212,168,67,0.08);border:1px solid rgba(212,168,67,0.2);border-radius:10px;padding:14px">
          <div style="font-size:0.7rem;color:#D4A843;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">Views Today</div>
          <div style="font-family:'Playfair Display',serif;font-size:1.6rem;color:#F5F0E8;font-weight:700" id="mock-views">0</div>
        </div>
        <div style="background:rgba(200,57,45,0.08);border:1px solid rgba(200,57,45,0.2);border-radius:10px;padding:14px">
          <div style="font-size:0.7rem;color:#C8392D;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">New Reviews</div>
          <div style="font-family:'Playfair Display',serif;font-size:1.6rem;color:#F5F0E8;font-weight:700" id="mock-reviews">0</div>
        </div>
      </div>
      <div style="flex:1;background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid rgba(255,255,255,0.07);padding:16px;overflow:hidden">
        <div style="font-size:0.72rem;color:rgba(245,240,232,0.4);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em">Weekly Traffic</div>
        <canvas id="mini-chart" style="width:100%;height:80px"></canvas>
      </div>
      <div style="background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid rgba(255,255,255,0.07);padding:14px">
        <div style="font-size:0.72rem;color:rgba(245,240,232,0.4);margin-bottom:10px">Latest Review</div>
        <div style="font-size:0.82rem;color:rgba(245,240,232,0.7);font-style:italic;">"Absolutely stunning views, will be back next week!"</div>
        <div style="font-size:0.72rem;color:#D4A843;margin-top:6px">★★★★★ — Leyla A.</div>
      </div>
    </div>
  `;

  // Animate numbers
  animateNum(document.getElementById('mock-views'), 1847, 2000);
  animateNum(document.getElementById('mock-reviews'), 14, 2200);

  // Mini bar chart
  setTimeout(() => {
    const canvas = document.getElementById('mini-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = [42, 68, 55, 80, 95, 72, 110];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 160;
    ctx.scale(2, 2);
    const w = canvas.offsetWidth / 2;
    const h = 80;
    const max = Math.max(...data);
    const barW = (w / data.length) * 0.6;
    const gap = (w / data.length) * 0.4;

    data.forEach((val, i) => {
      const barH = (val / max) * (h - 20);
      const x = i * (barW + gap) + gap / 2;
      const y = h - barH - 10;
      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      grad.addColorStop(0, 'rgba(212,168,67,0.9)');
      grad.addColorStop(1, 'rgba(200,57,45,0.4)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, 3);
      ctx.fill();
      ctx.fillStyle = 'rgba(245,240,232,0.35)';
      ctx.font = '9px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(days[i], x + barW / 2, h - 1);
    });
  }, 300);
}

// ─── STATS COUNTER ───────────────────────────────
function initStats() {
  const nums = document.querySelectorAll('.stat-num');
  let triggered = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        nums.forEach(el => {
          const target = parseInt(el.dataset.target);
          animateNum(el, target, 1800, true);
        });
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
}

function animateNum(el, target, duration = 1500, addPlus = false) {
  if (!el) return;
  const start = performance.now();
  function update(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.floor(eased * target);
    el.textContent = val.toLocaleString() + (addPlus && t >= 1 ? '+' : '');
    if (t < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString() + (addPlus ? '+' : '');
  }
  requestAnimationFrame(update);
}

// ─── STICKY SEARCH ───────────────────────────────
function initStickySearch() {
  const sticky = document.getElementById('sticky-search');
  const hero = document.getElementById('hero');
  if (!sticky || !hero) return;

  sticky.classList.remove('hidden');
  sticky.classList.remove('visible');

  const catsWrap = document.getElementById('sticky-cats');
  if (catsWrap) {
    CATEGORIES.slice(0, 4).forEach(cat => {
      const pill = document.createElement('button');
      pill.style.cssText = 'background:rgba(255,255,255,0.05);border:1px solid rgba(212,168,67,0.15);color:rgba(245,240,232,0.6);padding:5px 14px;border-radius:20px;font-size:0.78rem;cursor:pointer;font-family:Inter,sans-serif;transition:all 0.2s;';
      pill.textContent = cat.icon + ' ' + cat.name;
      catsWrap.appendChild(pill);
    });
  }

  window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetHeight;
    sticky.classList.toggle('visible', window.scrollY > heroBottom - 80);
  }, { passive: true });
}

// ─── PARALLAX ────────────────────────────────────
function initParallax() {
  const bg = document.getElementById('parallax-bg');
  if (!bg) return;

  window.addEventListener('scroll', () => {
    const section = bg.closest('#parallax-banner');
    const rect = section.getBoundingClientRect();
    const speed = 0.4;
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
      bg.style.transform = `translateY(${offset}px)`;
    }
  }, { passive: true });
}

// ─── SCROLL REVEAL ───────────────────────────────
let revealObserver;

function initRevealObserver() {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  observeReveal();
}

function observeReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    revealObserver?.observe(el);
  });
}

// ─── SCROLL EFFECTS ──────────────────────────────
function initScrollEffects() {
  window.addEventListener('scroll', () => {
    // hero parallax content
    const hero = document.getElementById('hero');
    const heroContent = hero?.querySelector('.hero-content');
    if (heroContent && window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.3;
      heroContent.style.transform = `translateY(${offset}px)`;
      heroContent.style.opacity = 1 - (window.scrollY / (window.innerHeight * 0.7));
    }
  }, { passive: true });
}

// ─── SEARCH INTERACTIONS ─────────────────────────
function initSearchInteractions() {
  const btn = document.getElementById('search-btn');
  const input = document.getElementById('search-input');
  const locInput = document.getElementById('location-input');

  function doSearch() {
    const q = input?.value?.trim();
    const loc = locInput?.value?.trim();
    if (q) {
      showSearchToast(`Searching for "${q}" in ${loc || 'Baku'}`);
    }
  }

  btn?.addEventListener('click', doSearch);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  // Autocomplete simulation
  const suggestions = ['Restaurants', 'Coffee Shops', 'Shisha Bars', 'Rooftop Bars', 'Traditional Food', 'Sea View', 'Family Friendly'];
  let suggestionBox;

  input?.addEventListener('input', e => {
    const val = e.target.value.toLowerCase();
    if (!val) { hideSuggestions(); return; }
    const matches = suggestions.filter(s => s.toLowerCase().includes(val));
    if (matches.length) showSuggestions(matches, input);
    else hideSuggestions();
  });

  function showSuggestions(items, anchor) {
    if (!suggestionBox) {
      suggestionBox = document.createElement('div');
      suggestionBox.style.cssText = `
        position:absolute;top:calc(100% + 8px);left:0;right:0;
        background:rgba(30,16,20,0.98);
        border:1px solid rgba(212,168,67,0.25);
        border-radius:12px;
        overflow:hidden;
        z-index:200;
        backdrop-filter:blur(20px);
        box-shadow:0 20px 40px rgba(0,0,0,0.5);
      `;
      const searchBar = document.querySelector('.search-bar');
      if (searchBar) {
        searchBar.style.position = 'relative';
        searchBar.appendChild(suggestionBox);
      }
    }
    suggestionBox.innerHTML = items.map(item => `
      <div class="sugg-item" style="padding:12px 20px;font-size:0.875rem;color:rgba(245,240,232,0.8);cursor:pointer;transition:background 0.15s;display:flex;align-items:center;gap:10px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(212,168,67,0.6)" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        ${item}
      </div>
    `).join('');
    suggestionBox.querySelectorAll('.sugg-item').forEach(el => {
      el.addEventListener('mouseenter', () => el.style.background = 'rgba(212,168,67,0.08)');
      el.addEventListener('mouseleave', () => el.style.background = '');
      el.addEventListener('click', () => {
        input.value = el.textContent.trim();
        hideSuggestions();
        doSearch();
      });
    });
  }

  function hideSuggestions() {
    if (suggestionBox) { suggestionBox.innerHTML = ''; }
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-bar')) hideSuggestions();
  });
}

// ─── TOAST ───────────────────────────────────────
function showSearchToast(msg) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.style.cssText = `
    position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(20px);
    background:rgba(30,16,20,0.96);
    border:1px solid rgba(212,168,67,0.3);
    color:#F5F0E8;
    padding:14px 28px;
    border-radius:12px;
    font-size:0.875rem;
    font-family:Inter,sans-serif;
    z-index:9999;
    backdrop-filter:blur(20px);
    box-shadow:0 20px 40px rgba(0,0,0,0.4);
    opacity:0;
    transition:opacity 0.3s, transform 0.3s;
  `;
  toast.innerHTML = `<span style="color:#D4A843">🔍</span> ${msg}`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── TAG INTERACTION ─────────────────────────────
function initTagInteraction() {
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
      document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      const cat = tag.dataset.cat;
      const catMap = {
        restaurants: 'Restaurants', cafes: 'Cafes',
        shisha: 'Shisha', nightlife: 'Nightlife',
        hotels: 'Hotels', experiences: 'Experiences',
      };
      filterListings(catMap[cat] || 'All');

      // Smooth scroll to listings
      setTimeout(() => {
        document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    });
  });
}
