/* ==============================
   THEME SWITCHER
============================== */
const html = document.documentElement;
const themeBtns = document.querySelectorAll('.theme-btn');

// Load saved theme
const savedTheme = localStorage.getItem('np-theme') || 'light';
applyTheme(savedTheme);

themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    applyTheme(theme);
    localStorage.setItem('np-theme', theme);
  });
});

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
}


/* ==============================
   CURSOR SPLASH EFFECT
============================== */
const splashColors = {
  light: ['rgba(26,26,46,0.12)', 'rgba(255,107,107,0.2)', 'rgba(78,205,196,0.2)', 'rgba(245,200,66,0.25)'],
  dark:  ['rgba(245,200,66,0.2)', 'rgba(255,107,107,0.2)', 'rgba(78,205,196,0.2)', 'rgba(167,139,250,0.2)'],
  rgb:   ['rgba(0,255,255,0.4)',  'rgba(255,0,255,0.4)',   'rgba(0,255,136,0.4)', 'rgba(255,100,0,0.35)'],
};

// Mouse move — trailing dots
let lastMove = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastMove < 60) return; // throttle
  lastMove = now;
  createTrail(e.clientX, e.clientY);
});

// Click — ripple splash
document.addEventListener('click', (e) => {
  createSplash(e.clientX, e.clientY, true);
});

// Touch support
document.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  createSplash(t.clientX, t.clientY, true);
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  const t = e.touches[0];
  createTrail(t.clientX, t.clientY);
}, { passive: true });

function getColor() {
  const theme = html.getAttribute('data-theme') || 'light';
  const palette = splashColors[theme] || splashColors.light;
  return palette[Math.floor(Math.random() * palette.length)];
}

function createSplash(x, y, big) {
  const el = document.createElement('div');
  const size = big ? (60 + Math.random() * 60) : (20 + Math.random() * 20);
  el.className = 'splash';
  el.style.cssText = `
    left: ${x - size / 2}px;
    top: ${y - size / 2}px;
    width: ${size}px;
    height: ${size}px;
    background: ${getColor()};
  `;
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

function createTrail(x, y) {
  const el = document.createElement('div');
  el.className = 'splash-move';
  el.style.cssText = `
    left: ${x}px;
    top: ${y}px;
    background: ${getColor()};
  `;
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}


/* ==============================
   SCROLL REVEAL
============================== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));


/* ==============================
   POSTER MODAL
============================== */
const modal      = document.getElementById('posterModal');
const modalImg   = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');
const posters    = document.querySelectorAll('.poster-item');
const tracks     = document.querySelectorAll('.marquee-track');

posters.forEach(img => {
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


/* ==============================
   MOBILE NAV TOGGLE
============================== */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});
