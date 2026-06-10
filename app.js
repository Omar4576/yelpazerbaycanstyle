bash

cat > /home/claude/yelp-az/app.js << 'JSEOF'
/* =============================================
   KƏŞF v2 — Buttery smooth. Everything clickable.
   Performance: single rAF loop, GPU-only transforms,
   no layout thrash, passive listeners everywhere.
   ============================================= */

// ─── DATA ────────────────────────────────────────
const CATEGORIES = [
  { icon:'🍽', name:'Restaurants', count:'3,240+', id:'restaurants' },
  { icon:'☕', name:'Cafes & Tea',  count:'1,180+', id:'cafes' },
  { icon:'💨', name:'Shisha Bars', count:'420+',   id:'shisha' },
  { icon:'🌙', name:'Nightlife',   count:'310+',   id:'nightlife' },
  { icon:'🏨', name:'Hotels',      count:'890+',   id:'hotels' },
  { icon:'🎭', name:'Experiences', count:'560+',   id:'experiences' },
];

const LISTINGS = [
  { id:1,  name:'Firuze Restaurant',   category:'Fine Dining',         emoji:'🍷', rating:4.9, reviews:1240, tags:['Azerbaijani','Sea View','Romantic'],      location:'Baku Boulevard',  price:'$$$', badge:'Top Pick',    badgeType:'gold',  bg:'#2D1525', desc:'Perched above the Caspian shoreline, Firuze redefines Azerbaijani fine dining. The tasting menu changes seasonally and every dish tells a story rooted in the region\'s spice-road history. Expect pomegranate-glazed lamb, saffron risotto and views that will stop your conversation mid-sentence.', hours:'12:00 – 00:00', phone:'+994 12 555 0101' },
  { id:2,  name:'Çay Evi 145',         category:'Traditional Tea House',emoji:'🫖', rating:4.8, reviews:876,  tags:['Traditional','Cosy','Heritage'],          location:'İçərişəhər',      price:'$',   badge:'Hidden Gem', badgeType:'flame', bg:'#1A2010', desc:'Tucked behind the Palace of the Shirvanshahs, this 19th-century caravanserai serves tea the old way — loose leaf, copper samovar, sugar cube between the teeth. The baklava is made fresh each morning by the owner\'s family. No Wi-Fi. Intentionally.', hours:'08:00 – 22:00', phone:'+994 50 123 4567' },
  { id:3,  name:'Nargile Lounge',      category:'Shisha & Cocktails',   emoji:'💨', rating:4.7, reviews:543,  tags:['Rooftop','Views','Nightlife'],             location:'Fountain Square', price:'$$',  badge:'Trending',   badgeType:'flame', bg:'#1A1030', desc:'Six floors up, open to the sky — Nargile Lounge is where Baku\'s creative crowd gathers after dark. Choose from 40 shisha blends, a full cocktail menu with Azerbaijani twists, and a playlist that never repeats. The view of the Flame Towers from the terrace is unbeatable.', hours:'18:00 – 04:00', phone:'+994 70 987 6543' },
  { id:4,  name:'Palıd Brasserie',     category:'European Fusion',      emoji:'🥩', rating:4.8, reviews:2100, tags:['Fusion','Award Winning','Business'],       location:'Nizami Street',   price:'$$$', badge:null,         badgeType:null,    bg:'#251510', desc:'A Baku institution since 2011. Chef Rashad Hasanov trained in Lyon and came home to merge French technique with Azerbaijani ingredients — the result is extraordinary. The oak-aged beef and wild herb jus alone justify a visit. Private dining room available for groups.', hours:'12:00 – 23:30', phone:'+994 12 498 7700' },
  { id:5,  name:'Karvan Coffee',       category:'Specialty Coffee',     emoji:'☕', rating:4.9, reviews:1680, tags:['Specialty','Work-Friendly','Brunch'],      location:'Sahil Metro',     price:'$$',  badge:'Best Coffee', badgeType:'gold',  bg:'#1E1505', desc:'The first third-wave coffee shop in Baku, sourcing single-origin beans from Ethiopia and Colombia. Baristas compete nationally. The all-day brunch menu is a serious commitment. Grab a window seat, order the smashed avo on sourdough, and settle in.', hours:'07:30 – 22:00', phone:'+994 55 210 0012' },
  { id:6,  name:'Sea Breeze Resort',   category:'Beach Restaurant',     emoji:'🌊', rating:4.6, reviews:987,  tags:['Beach','Seafood','Sunset'],               location:'Novkhani',        price:'$$$', badge:null,         badgeType:null,    bg:'#0D1A2D', desc:'Drive 25 km north of Baku and you arrive at this Caspian beach club. Grilled sturgeon, tiger prawns and chilled white wine on the sand at golden hour. The resort also offers bungalow stays if you want to make a weekend of it.', hours:'11:00 – 23:00', phone:'+994 12 440 5566' },
  { id:7,  name:'Mugham Club',         category:'Music & Dining',       emoji:'🎵', rating:5.0, reviews:3200, tags:['Live Music','Traditional','Cultural'],     location:'Old City',        price:'$$$', badge:'Iconic',     badgeType:'gold',  bg:'#1A0D2E', desc:'There is nowhere else like this in the Caucasus. Arrive before 21:00 to watch the mugham masters perform. The music is living heritage — modal scales, improvisation, raw emotion. The food is secondary, but still exceptional. Book at least two weeks ahead.', hours:'19:00 – 02:00', phone:'+994 12 492 0062' },
  { id:8,  name:'Sumakh Art Café',     category:'Art & Coffee',         emoji:'🎨', rating:4.7, reviews:412,  tags:['Art','Brunch','Instagrammable'],          location:'Yasamal',         price:'$$',  badge:null,         badgeType:null,    bg:'#1E1020', desc:'Part gallery, part café. The walls rotate monthly with work by Azerbaijani artists and the menu does the same — seasonal, locally sourced, plated like a canvas. The pomegranate pavlova is legendary. There is usually a waiting list on weekends.', hours:'09:00 – 21:00', phone:'+994 77 345 9988' },
  { id:9,  name:'Şirvanşah Museum Rest.', category:'Historical Dining', emoji:'🏰', rating:4.9, reviews:2800, tags:['Heritage','Azerbaijani','Unique'],        location:'İçərişəhər',      price:'$$$', badge:'Must Visit',  badgeType:'gold',  bg:'#251500', desc:'Dine inside a restored 15th-century hammam within the Palace of the Shirvanshahs complex. The atmosphere is unlike anything else — stone arches, candlelight, traditional music drifting through the courtyard. The lamb piti is slow-cooked for eight hours. Worth every manat.', hours:'12:00 – 23:00', phone:'+994 12 437 1742' },
];

const TOP_REVIEWED = [
  { name:'Şirvanşah Museum Restaurant', cat:'Historical Dining', emoji:'🏰', stars:5, review:'"Dining in the 15th century. Unreal atmosphere and the lamb was perfect."' },
  { name:'Kafe Literaturnıy',           cat:'Cafe & Books',      emoji:'📚', stars:5, review:'"Best espresso in Baku. Staff know every book on every shelf."' },
  { name:'Mugham Club',                 cat:'Music & Dinner',    emoji:'🎵', stars:5, review:'"Live mugham music + traditional food = goosebumps all night."' },
  { name:'Dolma Restaurant',            cat:'Azerbaijani',       emoji:'🫙', stars:5, review:'"My grandmother could not make it better. This is what home tastes like."' },
  { name:'Park Inn Rooftop',            cat:'Cocktail Bar',      emoji:'🍸', stars:5, review:'"The Flame Towers view at night is worth every manat."' },
  { name:'Sumakh Art Café',             cat:'Art & Coffee',      emoji:'🎨', stars:5, review:'"Half gallery half café. The pomegranate dessert changed my life."' },
];

const FILTERS = ['All','Restaurants','Cafes','Shisha','Nightlife','Hotels','Experiences'];
const ROTATE_WORDS = ['favourite spot','next adventure','hidden gem','best meal','perfect café','new obsession'];

// ─── GLOBAL STATE ────────────────────────────────
const state = {
  mouseX:0, mouseY:0,
  cursorX:0, cursorY:0,
  ringX:0,   ringY:0,
  scrollY:0,
  ticking:false,
  rotateIdx:0,
  savedListings: new Set(),
  activeFilter:'All',
  visibleCount:9,
  modalOpen:false,
  trails:[],
  frame:0,
};

// ─── UNIFIED rAF LOOP ────────────────────────────
// Single loop handles cursor, trails, canvas — zero redundant frames
function masterLoop() {
  // Cursor lerp (GPU transform only)
  state.cursorX += (state.mouseX - state.cursorX) * 0.85;
  state.cursorY += (state.mouseY - state.cursorY) * 0.85;
  state.ringX   += (state.mouseX - state.ringX)   * 0.10;
  state.ringY   += (state.mouseY - state.ringY)   * 0.10;

  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (cursor) cursor.style.transform = `translate(${state.cursorX}px,${state.cursorY}px) translate(-50%,-50%)`;
  if (ring)   ring.style.transform   = `translate(${state.ringX}px,${state.ringY}px) translate(-50%,-50%)`;

  // Trail particles
  updateTrails();

  // Canvas tile animation
  tickCanvas();

  state.frame++;
  requestAnimationFrame(masterLoop);
}

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
  initModal();
  requestAnimationFrame(masterLoop);
});

// ─── CURSOR + LIQUID TRAILS ──────────────────────
let trailCanvas, trailCtx;

function initCursor() {
  // Liquid metal trail canvas — fullscreen, above everything
  trailCanvas = document.createElement('canvas');
  trailCanvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9990;';
  document.body.appendChild(trailCanvas);
  trailCtx = trailCanvas.getContext('2d');
  resizeTrailCanvas();
  window.addEventListener('resize', resizeTrailCanvas, { passive:true });

  document.addEventListener('mousemove', e => {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
    spawnTrail(e.clientX, e.clientY);
  }, { passive:true });

  // Hover states
  document.body.addEventListener('mouseover', e => {
    const el = e.target.closest('a,button,.tag,.cat-card,.listing-card,.hcard,.filter-pill,.listing-save');
    if (el) document.body.classList.add('cursor-hover');
    else document.body.classList.remove('cursor-hover');
  }, { passive:true });
}

function resizeTrailCanvas() {
  trailCanvas.width  = window.innerWidth;
  trailCanvas.height = window.innerHeight;
}

function spawnTrail(x, y) {
  // Gold liquid droplet
  state.trails.push({
    x, y,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2,
    r: Math.random() * 5 + 2,
    alpha: 0.7 + Math.random() * 0.3,
    life: 1,
    hue: Math.random() > 0.7 ? 'flame' : 'gold',
  });
  // Keep it light
  if (state.trails.length > 60) state.trails.splice(0, state.trails.length - 60);
}

function updateTrails() {
  if (!trailCtx) return;
  trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

  for (let i = state.trails.length - 1; i >= 0; i--) {
    const t = state.trails[i];
    t.life -= 0.045;
    t.x += t.vx;
    t.y += t.vy;
    t.r  *= 0.97;
    if (t.life <= 0 || t.r < 0.3) { state.trails.splice(i, 1); continue; }

    const grad = trailCtx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.r);
    if (t.hue === 'gold') {
      grad.addColorStop(0, `rgba(255,215,100,${t.alpha * t.life})`);
      grad.addColorStop(0.5, `rgba(212,168,67,${t.alpha * t.life * 0.6})`);
      grad.addColorStop(1, `rgba(212,168,67,0)`);
    } else {
      grad.addColorStop(0, `rgba(255,100,80,${t.alpha * t.life})`);
      grad.addColorStop(0.5, `rgba(200,57,45,${t.alpha * t.life * 0.5})`);
      grad.addColorStop(1, `rgba(200,57,45,0)`);
    }
    trailCtx.beginPath();
    trailCtx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
    trailCtx.fillStyle = grad;
    trailCtx.fill();
  }
}

// ─── TILE CANVAS ────────────────────────────────
let tileCanvas, tileCtx, tiles = [], tileW, tileH;

function initCanvas() {
  tileCanvas = document.getElementById('tile-canvas');
  if (!tileCanvas) return;
  tileCtx = tileCanvas.getContext('2d');
  resizeTileCanvas();
  window.addEventListener('resize', resizeTileCanvas, { passive:true });
}

function resizeTileCanvas() {
  tileW = tileCanvas.width  = tileCanvas.offsetWidth;
  tileH = tileCanvas.height = tileCanvas.offsetHeight;
  buildTiles();
}

function buildTiles() {
  tiles = [];
  const size = 72;
  const cols = Math.ceil(tileW / size) + 2;
  const rows = Math.ceil(tileH / size) + 2;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      tiles.push({ x: c*size - size/2, y: r*size - size/2, size, phase:(r+c)*0.28, type:(r+c)%3 });
}

function tickCanvas() {
  if (!tileCtx) return;
  const time = state.frame * 0.014;
  tileCtx.clearRect(0, 0, tileW, tileH);
  // batch by type for fewer state changes
  [0,1,2].forEach(type => {
    tileCtx.beginPath();
    tiles.filter(t => t.type === type).forEach(t => {
      const pulse = Math.sin(time * 0.55 + t.phase) * 0.5 + 0.5;
      const alpha = 0.08 + pulse * 0.18;
      const cx = t.x + t.size/2, cy = t.y + t.size/2, s = t.size/2 - 6;
      // draw but don't set stroke per-tile — we'll set once per type batch
      traceTile(tileCtx, type, cx, cy, s);
    });
    tileCtx.strokeStyle = 'rgba(212,168,67,0.18)';
    tileCtx.lineWidth = 0.7;
    tileCtx.stroke();
  });
}

function traceTile(ctx, type, cx, cy, s) {
  if (type === 0) {
    ctx.moveTo(cx, cy-s); ctx.lineTo(cx+s, cy);
    ctx.lineTo(cx, cy+s); ctx.lineTo(cx-s, cy); ctx.closePath();
  } else if (type === 1) {
    for (let i=0;i<8;i++) {
      const a=(i/8)*Math.PI*2, r=i%2===0?s:s*0.42;
      const px=cx+Math.cos(a)*r, py=cy+Math.sin(a)*r;
      i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    }
    ctx.closePath();
  } else {
    ctx.moveTo(cx,cy-s); ctx.lineTo(cx+s*0.28,cy-s*0.28);
    ctx.lineTo(cx+s,cy); ctx.lineTo(cx+s*0.28,cy+s*0.28);
    ctx.lineTo(cx,cy+s); ctx.lineTo(cx-s*0.28,cy+s*0.28);
    ctx.lineTo(cx-s,cy); ctx.lineTo(cx-s*0.28,cy-s*0.28);
    ctx.closePath();
  }
}

// ─── NAV ────────────────────────────────────────
function initNav() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    if (!state.ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        state.scrollY = window.scrollY;
        state.ticking = false;
      });
      state.ticking = true;
    }
  }, { passive:true });
}

// ─── ROTATING WORD ───────────────────────────────
function initRotatingWord() {
  const el = document.getElementById('rotating-word');
  if (!el) return;
  el.style.cssText += 'display:inline-block;transition:opacity 0.45s cubic-bezier(0.4,0,0.2,1),transform 0.45s cubic-bezier(0.4,0,0.2,1)';
  setInterval(() => {
    el.style.opacity='0'; el.style.transform='translateY(10px) rotateX(20deg)';
    setTimeout(() => {
      state.rotateIdx = (state.rotateIdx+1) % ROTATE_WORDS.length;
      el.textContent = ROTATE_WORDS[state.rotateIdx];
      el.style.opacity='1'; el.style.transform='translateY(0) rotateX(0deg)';
    }, 360);
  }, 2800);
}

// ─── CATEGORIES ──────────────────────────────────
function initCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  const frag = document.createDocumentFragment();
  CATEGORIES.forEach((cat, i) => {
    const card = document.createElement('div');
    card.className = `cat-card reveal reveal-delay-${Math.min(i+1,5)}`;
    card.innerHTML = `<div class="cat-icon">${cat.icon}</div><div class="cat-name">${cat.name}</div><div class="cat-count">${cat.count}</div>`;
    card.addEventListener('click', () => {
      ripple(card);
      document.querySelectorAll('.tag').forEach(t => t.classList.toggle('active', t.dataset.cat===cat.id));
      filterListings(cat.name);
      setTimeout(() => document.getElementById('featured-section')?.scrollIntoView({behavior:'smooth',block:'start'}),200);
    });
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

// ─── FILTER PILLS ────────────────────────────────
function initFilterPills() {
  const wrap = document.getElementById('filter-pills');
  if (!wrap) return;
  FILTERS.forEach(f => {
    const pill = document.createElement('button');
    pill.className = 'filter-pill' + (f==='All'?' active':'');
    pill.textContent = f;
    pill.addEventListener('click', () => {
      ripple(pill);
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterListings(f);
    });
    wrap.appendChild(pill);
  });
}

function filterListings(filter) {
  state.activeFilter = filter;
  renderListings();
}

// ─── LISTINGS ────────────────────────────────────
function initListings() {
  renderListings();
  document.getElementById('load-more-btn')?.addEventListener('click', e => {
    ripple(e.currentTarget);
    state.visibleCount += 3;
    renderListings();
  });
}

function renderListings() {
  const grid = document.getElementById('listings-grid');
  if (!grid) return;
  let filtered = LISTINGS;
  if (state.activeFilter !== 'All')
    filtered = LISTINGS.filter(l =>
      l.category.toLowerCase().includes(state.activeFilter.toLowerCase()) ||
      l.tags.some(t => t.toLowerCase().includes(state.activeFilter.toLowerCase()))
    );
  const toShow = filtered.slice(0, state.visibleCount);
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  toShow.forEach((listing, i) => {
    const card = document.createElement('div');
    card.className = `listing-card reveal reveal-delay-${(i%3)+1}`;
    const isSaved = state.savedListings.has(listing.id);
    const stars = '★'.repeat(Math.floor(listing.rating)) + (listing.rating%1>=0.5?'½':'');
    card.innerHTML = `
      <div class="listing-img" style="background:${listing.bg}">
        <div class="listing-img-inner">${listing.emoji}</div>
        ${listing.badge?`<div class="listing-badge ${listing.badgeType==='gold'?'gold':''}">${listing.badge}</div>`:''}
        <div class="listing-save" data-id="${listing.id}">${isSaved?'❤️':'🤍'}</div>
      </div>
      <div class="listing-body">
        <div class="listing-cat">${listing.category}</div>
        <div class="listing-name">${listing.name}</div>
        <div class="listing-meta">
          <span class="stars">${stars}</span>
          <span class="rating-num">${listing.rating}</span>
          <span class="review-count">(${listing.reviews.toLocaleString()})</span>
        </div>
        <div class="listing-tags">${listing.tags.map(t=>`<span class="ltag">${t}</span>`).join('')}</div>
      </div>
      <div class="listing-footer">
        <span class="listing-location"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>${listing.location}</span>
        <span class="listing-price">${listing.price}</span>
      </div>`;
    card.querySelector('.listing-save').addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(e.currentTarget.dataset.id);
      const saved = state.savedListings.has(id);
      saved ? state.savedListings.delete(id) : state.savedListings.add(id);
      e.currentTarget.textContent = saved ? '🤍' : '❤️';
      if (!saved) heartBurst(e.currentTarget);
    });
    card.addEventListener('click', e => {
      if (e.target.closest('.listing-save')) return;
      openModal(listing);
    });
    frag.appendChild(card);
  });
  grid.appendChild(frag);
  observeReveal();
  const btn = document.getElementById('load-more-btn');
  if (btn) btn.style.display = state.visibleCount >= filtered.length ? 'none' : 'inline-block';
}

// ─── MODAL ───────────────────────────────────────
function initModal() {
  // Build modal scaffold once
  const modal = document.createElement('div');
  modal.id = 'listing-modal';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-sheet">
      <button class="modal-close" id="modal-close">✕</button>
      <div class="modal-hero-img" id="modal-emoji"></div>
      <div class="modal-body">
        <div class="modal-cat" id="modal-cat"></div>
        <h2 class="modal-name" id="modal-name"></h2>
        <div class="modal-meta" id="modal-meta"></div>
        <p class="modal-desc" id="modal-desc"></p>
        <div class="modal-info-row">
          <div class="modal-info-item" id="modal-hours"></div>
          <div class="modal-info-item" id="modal-phone"></div>
        </div>
        <div class="modal-actions">
          <button class="btn-primary modal-btn" id="modal-save-btn">🤍 Save</button>
          <button class="btn-gold modal-btn" id="modal-directions-btn">Get Directions →</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key==='Escape') closeModal(); });
}

function openModal(listing) {
  const modal = document.getElementById('listing-modal');
  if (!modal) return;
  state.modalOpen = true;
  document.body.style.overflow = 'hidden';

  document.getElementById('modal-emoji').style.background = listing.bg;
  document.getElementById('modal-emoji').innerHTML = `<span style="font-size:5rem">${listing.emoji}</span>`;
  document.getElementById('modal-cat').textContent   = listing.category;
  document.getElementById('modal-name').textContent  = listing.name;
  document.getElementById('modal-desc').textContent  = listing.desc || '';
  document.getElementById('modal-hours').innerHTML   = `<span class="info-label">⏰ Hours</span><span>${listing.hours}</span>`;
  document.getElementById('modal-phone').innerHTML   = `<span class="info-label">📞 Phone</span><span>${listing.phone}</span>`;

  const stars = '★'.repeat(Math.floor(listing.rating)) + (listing.rating%1>=0.5?'½':'');
  document.getElementById('modal-meta').innerHTML = `
    <span class="stars">${stars}</span>
    <span class="rating-num">${listing.rating}</span>
    <span class="review-count">(${listing.reviews.toLocaleString()} reviews)</span>
    ${listing.badge?`<span class="listing-badge ${listing.badgeType==='gold'?'gold':''}" style="position:static;margin-left:8px">${listing.badge}</span>`:''}`;

  const saveBtn = document.getElementById('modal-save-btn');
  const isSaved = state.savedListings.has(listing.id);
  saveBtn.textContent = isSaved ? '❤️ Saved' : '🤍 Save';
  saveBtn.onclick = () => {
    const saved = state.savedListings.has(listing.id);
    saved ? state.savedListings.delete(listing.id) : state.savedListings.add(listing.id);
    saveBtn.textContent = saved ? '🤍 Save' : '❤️ Saved';
    if (!saved) heartBurst(saveBtn);
    renderListings();
  };

  document.getElementById('modal-directions-btn').onclick = () => {
    showToast(`📍 Opening directions to ${listing.name}`);
  };

  modal.classList.add('open');
  requestAnimationFrame(() => modal.querySelector('.modal-sheet').classList.add('visible'));
}

function closeModal() {
  const modal = document.getElementById('listing-modal');
  if (!modal) return;
  modal.querySelector('.modal-sheet').classList.remove('visible');
  setTimeout(() => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    state.modalOpen = false;
  }, 380);
}

// ─── HORIZONTAL SCROLL (drag) ────────────────────
function initHorizontalScroll() {
  const wrap = document.getElementById('horizontal-scroll');
  if (!wrap) return;
  const frag = document.createDocumentFragment();
  TOP_REVIEWED.forEach(item => {
    const card = document.createElement('div');
    card.className = 'hcard';
    card.innerHTML = `
      <div class="hcard-img">${item.emoji}</div>
      <div class="hcard-body">
        <div class="hcard-cat">${item.cat}</div>
        <div class="hcard-name">${item.name}</div>
        <div class="hcard-stars">${'★'.repeat(item.stars)}</div>
        <div class="hcard-review">${item.review}</div>
      </div>`;
    frag.appendChild(card);
  });
  wrap.appendChild(frag);

  let isDown=false, startX, scrollLeft, vel=0, lastX=0;
  wrap.addEventListener('mousedown', e => {
    isDown=true; startX=e.pageX-wrap.offsetLeft;
    scrollLeft=wrap.scrollLeft; lastX=e.pageX; vel=0;
    wrap.style.cursor='grabbing';
  });
  document.addEventListener('mouseup', () => { isDown=false; wrap.style.cursor=''; momentumScroll(wrap, vel); });
  wrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    vel = e.pageX - lastX; lastX = e.pageX;
    wrap.scrollLeft = scrollLeft - (e.pageX - wrap.offsetLeft - startX) * 1.6;
  });
}

function momentumScroll(el, vel) {
  if (Math.abs(vel) < 0.5) return;
  el.scrollLeft -= vel;
  vel *= 0.92;
  requestAnimationFrame(() => momentumScroll(el, vel));
}

// ─── BIZ MOCKUP ─────────────────────────────────
function initBizMockup() {
  const mockup = document.getElementById('biz-mockup');
  if (!mockup) return;
  mockup.innerHTML = `
    <div style="padding:24px;height:100%;display:flex;flex-direction:column;gap:14px;position:relative;z-index:1">
      <div style="font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:rgba(245,240,232,0.9);font-weight:700">📊 Business Dashboard</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="background:rgba(212,168,67,0.08);border:1px solid rgba(212,168,67,0.2);border-radius:10px;padding:14px">
          <div style="font-size:0.68rem;color:#D4A843;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:5px">Views Today</div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:1.7rem;color:#F5F0E8;font-weight:700" id="mock-views">0</div>
        </div>
        <div style="background:rgba(200,57,45,0.08);border:1px solid rgba(200,57,45,0.2);border-radius:10px;padding:14px">
          <div style="font-size:0.68rem;color:#C8392D;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:5px">New Reviews</div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:1.7rem;color:#F5F0E8;font-weight:700" id="mock-reviews">0</div>
        </div>
      </div>
      <div style="flex:1;background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid rgba(255,255,255,0.06);padding:14px;overflow:hidden">
        <div style="font-size:0.68rem;color:rgba(245,240,232,0.35);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.12em">Weekly Traffic</div>
        <canvas id="mini-chart" style="width:100%;height:80px"></canvas>
      </div>
      <div style="background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid rgba(255,255,255,0.06);padding:12px">
        <div style="font-size:0.68rem;color:rgba(245,240,232,0.35);margin-bottom:8px">Latest Review</div>
        <div style="font-size:0.8rem;color:rgba(245,240,232,0.7);font-style:italic">"Absolutely stunning. Will be back next week!"</div>
        <div style="font-size:0.7rem;color:#D4A843;margin-top:5px">★★★★★ — Leyla A.</div>
      </div>
    </div>`;
  animateNum(document.getElementById('mock-views'),   1847, 2000);
  animateNum(document.getElementById('mock-reviews'), 14,   2200);
  setTimeout(drawMiniChart, 400);
}

function drawMiniChart() {
  const canvas = document.getElementById('mini-chart');
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.offsetWidth, H = 80;
  canvas.width = W * dpr; canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const data=[42,68,55,80,95,72,110], days=['M','T','W','T','F','S','S'];
  const max=Math.max(...data), barW=(W/data.length)*0.55, gap=(W/data.length)*0.45;
  data.forEach((val,i) => {
    const bh=(val/max)*(H-18), x=i*(barW+gap)+gap/2, y=H-bh-14;
    const g=ctx.createLinearGradient(0,y,0,y+bh);
    g.addColorStop(0,'rgba(212,168,67,0.95)'); g.addColorStop(1,'rgba(200,57,45,0.3)');
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.roundRect(x,y,barW,bh,3); ctx.fill();
    ctx.fillStyle='rgba(245,240,232,0.3)';
    ctx.font=`${8*dpr/dpr}px Inter`; ctx.textAlign='center';
    ctx.fillText(days[i], x+barW/2, H-2);
  });
}

// ─── STATS ───────────────────────────────────────
function initStats() {
  const nums=[...document.querySelectorAll('.stat-num')];
  let done=false;
  const obs=new IntersectionObserver(entries=>{
    if (done) return;
    if (entries.some(e=>e.isIntersecting)) {
      done=true;
      nums.forEach(el=>animateNum(el, parseInt(el.dataset.target), 1800, true));
    }
  },{threshold:0.4});
  nums.forEach(n=>obs.observe(n));
}

function animateNum(el, target, dur=1500, plus=false) {
  if (!el) return;
  const t0=performance.now();
  const run=now=>{
    const p=Math.min((now-t0)/dur,1);
    const e=1-Math.pow(1-p,3);
    el.textContent=Math.floor(e*target).toLocaleString()+(plus&&p>=1?'+':'');
    if (p<1) requestAnimationFrame(run);
    else el.textContent=target.toLocaleString()+(plus?'+':'');
  };
  requestAnimationFrame(run);
}

// ─── STICKY SEARCH ───────────────────────────────
function initStickySearch() {
  const sticky=document.getElementById('sticky-search');
  const hero=document.getElementById('hero');
  if (!sticky||!hero) return;
  sticky.classList.remove('hidden');
  const catsWrap=document.getElementById('sticky-cats');
  if (catsWrap) CATEGORIES.slice(0,4).forEach(cat=>{
    const p=document.createElement('button');
    p.style.cssText='background:rgba(255,255,255,0.05);border:1px solid rgba(212,168,67,0.15);color:rgba(245,240,232,0.6);padding:5px 14px;border-radius:20px;font-size:0.78rem;cursor:pointer;font-family:inherit;transition:all 0.2s;';
    p.textContent=cat.icon+' '+cat.name;
    p.addEventListener('click',()=>{ filterListings(cat.name); document.getElementById('featured-section')?.scrollIntoView({behavior:'smooth'}); });
    catsWrap.appendChild(p);
  });
  let heroH=hero.offsetHeight;
  window.addEventListener('resize',()=>{ heroH=hero.offsetHeight; },{passive:true});
  window.addEventListener('scroll',()=>{ sticky.classList.toggle('visible', window.scrollY>heroH-80); },{passive:true});
}

// ─── PARALLAX ────────────────────────────────────
function initParallax() {
  const bg=document.getElementById('parallax-bg');
  if (!bg) return;
  const section=document.getElementById('parallax-banner');
  window.addEventListener('scroll',()=>{
    const rect=section.getBoundingClientRect();
    if (rect.bottom>0 && rect.top<window.innerHeight) {
      const offset=((window.innerHeight/2)-rect.top-rect.height/2)*0.38;
      bg.style.transform=`translateY(${offset}px)`;
    }
  },{passive:true});
}

// ─── SCROLL EFFECTS ──────────────────────────────
function initScrollEffects() {
  const heroContent=document.querySelector('.hero-content');
  if (!heroContent) return;
  const vh=window.innerHeight;
  window.addEventListener('scroll',()=>{
    if (window.scrollY>vh) return;
    const p=window.scrollY/vh;
    heroContent.style.transform=`translateY(${p*80}px)`;
    heroContent.style.opacity=Math.max(0,1-p*1.5);
  },{passive:true});
}

// ─── REVEAL OBSERVER ─────────────────────────────
let revealObs;
function initRevealObserver() {
  revealObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if (e.isIntersecting){ e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  },{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
  observeReveal();
}
function observeReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el=>revealObs?.observe(el));
}

// ─── SEARCH ──────────────────────────────────────
function initSearchInteractions() {
  const btn=document.getElementById('search-btn');
  const input=document.getElementById('search-input');
  const loc=document.getElementById('location-input');
  const suggestions=['Restaurants','Coffee Shops','Shisha Bars','Rooftop Bars','Traditional Food','Sea View Dining','Family Friendly','Late Night','Breakfast & Brunch','Fine Dining'];
  let box=null;

  const doSearch=()=>{
    const q=input?.value?.trim();
    if (q) showToast(`🔍 Searching for "${q}" in ${loc?.value||'Baku'}`);
    hideSug();
  };
  btn?.addEventListener('click',()=>{ ripple(btn); doSearch(); });
  input?.addEventListener('keydown',e=>{ if(e.key==='Enter') doSearch(); });

  input?.addEventListener('input',e=>{
    const v=e.target.value.toLowerCase();
    if (!v){ hideSug(); return; }
    const m=suggestions.filter(s=>s.toLowerCase().includes(v));
    m.length?showSug(m):hideSug();
  });

  function showSug(items) {
    if (!box){ box=document.createElement('div'); box.className='sug-box'; document.querySelector('.search-bar')?.appendChild(box); }
    box.innerHTML=items.map(s=>`<div class="sug-item"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(212,168,67,0.6)" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>${s}</div>`).join('');
    box.querySelectorAll('.sug-item').forEach(el=>{
      el.addEventListener('mouseenter',()=>el.classList.add('active'));
      el.addEventListener('mouseleave',()=>el.classList.remove('active'));
      el.addEventListener('click',()=>{ input.value=el.textContent.trim(); hideSug(); doSearch(); });
    });
  }
  function hideSug(){ if(box) box.innerHTML=''; }
  document.addEventListener('click',e=>{ if(!e.target.closest('.search-bar')) hideSug(); });
}

// ─── TAGS ────────────────────────────────────────
function initTagInteraction() {
  document.querySelectorAll('.tag').forEach(tag=>{
    tag.addEventListener('click',()=>{
      document.querySelectorAll('.tag').forEach(t=>t.classList.remove('active'));
      tag.classList.add('active');
      const map={restaurants:'Restaurants',cafes:'Cafes',shisha:'Shisha',nightlife:'Nightlife',hotels:'Hotels',experiences:'Experiences'};
      filterListings(map[tag.dataset.cat]||'All');
      setTimeout(()=>document.getElementById('featured-section')?.scrollIntoView({behavior:'smooth',block:'start'}),200);
    });
  });
}

// ─── MICRO FX ────────────────────────────────────
function ripple(el) {
  const r=document.createElement('span');
  const rect=el.getBoundingClientRect();
  const size=Math.max(rect.width,rect.height)*2;
  r.style.cssText=`position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,0.15);top:50%;left:50%;transform:translate(-50%,-50%) scale(0);animation:rippleAnim 0.5s ease-out forwards;pointer-events:none;`;
  el.style.position='relative'; el.style.overflow='hidden';
  el.appendChild(r);
  setTimeout(()=>r.remove(),500);
}

function heartBurst(el) {
  el.style.transform='scale(1.5)';
  setTimeout(()=>{ el.style.transition='transform 0.3s cubic-bezier(0.34,1.56,0.64,1)'; el.style.transform='scale(1)'; },50);
}

function showToast(msg) {
  document.getElementById('toast')?.remove();
  const t=document.createElement('div');
  t.id='toast';
  t.className='toast';
  t.textContent=msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),350); },3000);
}
JSEOF
echo "done"
