/* ══════════════════════════════════════════════════════
   script-anime.js  —  Nendar Pramelda Portfolio
   All JS features combined: Loader, Theme, Lang, Cursor,
   Scroll reveal, Modal, Navbar, Disqus
══════════════════════════════════════════════════════ */

/* ── 1. LOADER (first visit only) ── */
(function() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const visited = sessionStorage.getItem('np_visited');
  if (visited) {
    loader.style.display = 'none';
    return;
  }

  sessionStorage.setItem('np_visited', '1');

  // Hide after 1.9s max
  setTimeout(() => {
    loader.classList.add('done');
    setTimeout(() => { loader.style.display = 'none'; }, 520);
  }, 1900);
})();


/* ── 2. NAVBAR scroll & mobile toggle ── */
const nav       = document.getElementById('mainNav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});


/* ── 3. THEME SWITCHER ── */
const html      = document.documentElement;
const themeBtns = document.querySelectorAll('.theme-btn');

const savedTheme = localStorage.getItem('np-theme') || 'dark';
applyTheme(savedTheme);

themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    applyTheme(btn.dataset.theme);
    localStorage.setItem('np-theme', btn.dataset.theme);
  });
});

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
}


/* ── 4. LANGUAGE TOGGLE ── */
const langBtns = document.querySelectorAll('.lang-btn');

function applyLang(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null) el.innerHTML = text;
  });
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    const ph = el.getAttribute('data-' + lang + '-placeholder');
    if (ph !== null) el.placeholder = ph;
  });
  langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  document.documentElement.lang = lang === 'id' ? 'id' : 'en';
  localStorage.setItem('np_lang', lang);
}

langBtns.forEach(btn => btn.addEventListener('click', () => applyLang(btn.dataset.lang)));
const savedLang = localStorage.getItem('np_lang') || 'en';
applyLang(savedLang);


/* ── 5. CURSOR SPLASH EFFECTS ── */
const splashPalette = {
  dark:  ['rgba(192,132,252,0.4)', 'rgba(34,211,238,0.3)', 'rgba(248,113,113,0.3)', 'rgba(245,200,66,0.25)'],
  light: ['rgba(130,80,220,0.25)', 'rgba(8,145,178,0.2)', 'rgba(220,38,38,0.2)', 'rgba(217,119,6,0.2)'],
  rgb:   ['rgba(255,0,255,0.5)', 'rgba(0,255,255,0.5)', 'rgba(0,255,136,0.4)', 'rgba(255,100,0,0.4)'],
};

function getColor() {
  const theme = html.getAttribute('data-theme') || 'dark';
  const p = splashPalette[theme] || splashPalette.dark;
  return p[Math.floor(Math.random() * p.length)];
}

function createSplash(x, y) {
  const el = document.createElement('div');
  const size = 50 + Math.random() * 60;
  el.className = 'splash';
  el.style.cssText = `left:${x - size/2}px;top:${y - size/2}px;width:${size}px;height:${size}px;background:${getColor()};`;
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

let lastTrail = 0;
function createTrail(x, y) {
  const now = Date.now();
  if (now - lastTrail < 55) return;
  lastTrail = now;
  const el = document.createElement('div');
  el.className = 'splash-trail';
  el.style.cssText = `left:${x}px;top:${y}px;background:${getColor()};`;
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

document.addEventListener('click', e => createSplash(e.clientX, e.clientY));
document.addEventListener('mousemove', e => createTrail(e.clientX, e.clientY));
document.addEventListener('touchstart', e => {
  const t = e.touches[0];
  createSplash(t.clientX, t.clientY);
}, { passive: true });
document.addEventListener('touchmove', e => {
  const t = e.touches[0];
  createTrail(t.clientX, t.clientY);
}, { passive: true });


/* ── 6. SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── 7. POSTER MODAL ── */
const modal      = document.getElementById('posterModal');
const modalImg   = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');
const tracks     = document.querySelectorAll('.marquee-track');

document.querySelectorAll('.poster-item').forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modal.classList.add('open');
    tracks.forEach(t => t.style.animationPlayState = 'paused');
  });
});

function closeModal() {
  modal.classList.remove('open');
  tracks.forEach(t => t.style.animationPlayState = 'running');
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


/* ── 8. DISQUS COMMENTS ── */
(function() {
  // ← Replace YOUR_SHORTNAME_HERE with your Disqus shortname
  var disqus_shortname = 'YOUR_SHORTNAME_HERE';

  var disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = 'nendar-pramelda-portfolio';
  };

  var d = document, s = d.createElement('script');
  s.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();
