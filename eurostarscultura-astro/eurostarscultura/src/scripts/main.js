import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const $ = (s) => document.querySelector(s);
const isMobile = () => window.matchMedia('(max-width: 1024px)').matches;
const isTouch = 'ontouchstart' in window;

/* ── HERO GALLERY (scroll horizontal) ──
   Se crea PRIMERO: el pin añade un pin-spacer y los ScrollTrigger creados
   después ya calculan su posición teniéndolo en cuenta. */
function initHeroGallery() {
  const strip = $('#hero-gallery .horiz-gallery-strip');
  if (!strip) return;

  const getX = () => {
    const totalW = strip.scrollWidth;
    const viewW = window.innerWidth;
    const firstWrap = strip.querySelector('.project-wrap');
    const cs = getComputedStyle(firstWrap);
    const padding = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const imgW = firstWrap.offsetWidth - padding;

    const currentX = gsap.getProperty(strip, 'x') || 0;
    const naturalLeft = strip.getBoundingClientRect().left - currentX;

    const startX = (viewW - imgW) / 2 - naturalLeft;
    const endX = startX - (totalW - imgW - padding);
    return { startX, travelX: endX - startX };
  };

  gsap.set(strip, { x: getX().startX, transformOrigin: '0 0', opacity: 1 });

  ScrollTrigger.create({
    trigger: '#hero-gallery',
    start: 'top top',
    end: () => `+=${Math.abs(getX().travelX)}`,
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const { startX, travelX } = getX();
      gsap.set(strip, { x: startX + travelX * self.progress, transformOrigin: '0 0' });
    },
  });
}
initHeroGallery();

/* ── CURSOR (solo desktop) ── */
if (!isTouch) {
  const dot = $('#cursorDot');
  const ring = $('#cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    gsap.to(dot, { x: mouseX - 4, y: mouseY - 4, duration: 0.1, ease: 'power2.out', opacity: 1 });
  });
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    gsap.set(ring, { x: ringX, y: ringY, opacity: 1 });
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, .section-card, .expo-item, .social-btn, .section-card-cta').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
    });
  });
}

/* ── MENÚ MÓVIL ── */
const burger = $('#navBurger');
const drawer = $('#navDrawer');
const drawerLinks = drawer.querySelectorAll('a');
let drawerOpen = false;

function openDrawer() {
  drawerOpen = true;
  burger.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  drawer.classList.add('visible');
  gsap.fromTo(drawer, { yPercent: -100 }, { yPercent: 0, duration: 0.5, ease: 'power3.out' });
  gsap.fromTo(drawerLinks, { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.07, delay: 0.2, duration: 0.5, ease: 'power2.out' });
}

function closeDrawer() {
  drawerOpen = false;
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  gsap.to(drawer, {
    yPercent: -100, duration: 0.4, ease: 'power3.in',
    onComplete: () => drawer.classList.remove('visible'),
  });
}

burger.addEventListener('click', () => (drawerOpen ? closeDrawer() : openDrawer()));
drawerLinks.forEach((l) => l.addEventListener('click', closeDrawer));

if (isMobile()) {
  gsap.set(drawerLinks, { opacity: 0 });
  gsap.set(drawer, { yPercent: -100 });
}

/* ── CARGA DE PÁGINA ── */
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.from('.hero-h1 span', { yPercent: 110, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0.3);
tl.from('.hero-eyebrow span', { yPercent: 100, duration: 0.8, ease: 'power3.out' }, 0.5);
tl.to('.nav-logo', { opacity: 1, duration: 0.6 }, 0.8);
tl.to('.nav-links a', { opacity: 1, duration: 0.5, stagger: 0.08 }, 0.9);

/* ── PARALLAX (no en táctil) ── */
if (!isTouch) {
  gsap.utils.toArray('.mission-img img').forEach((img) => {
    gsap.to(img, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, scrub: true } });
  });
}

/* ── ANIMACIONES DE SCROLL ── */
if ($('.mission')) {
  gsap.from('.mission-title span span', {
    yPercent: 105, duration: 1, stagger: 0.1, ease: 'power4.out',
    scrollTrigger: { trigger: '.mission', start: 'top 75%' },
  });
  gsap.from('.mission-body p', {
    opacity: 0, y: 24, duration: 0.9, stagger: 0.15, ease: 'power2.out',
    scrollTrigger: { trigger: '.mission-body', start: 'top 80%' },
  });
  gsap.from('.section-number span', {
    yPercent: 100, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.mission-left', start: 'top 75%' },
  });
  gsap.utils.toArray('.mission-img').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 40, duration: 1.1, delay: i * 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.mission-right', start: 'top 70%' },
    });
  });
}

if ($('#sectionsGrid')) {
  gsap.from('.section-card', {
    opacity: 0, y: 60, duration: 1, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '#sectionsGrid', start: 'top 75%' },
  });
}

// Una animación por sección (antes el selector global solo enlazaba con la primera)
gsap.utils.toArray('.exposiciones').forEach((sec) => {
  gsap.from(sec.querySelectorAll('.expo-title span span'), {
    yPercent: 105, duration: 1, stagger: 0.1, ease: 'power4.out',
    scrollTrigger: { trigger: sec, start: 'top 75%' },
  });
});

gsap.utils.toArray('.expo-item').forEach((item, i) => {
  gsap.from(item, {
    opacity: 0, x: isMobile() ? 0 : -30, y: isMobile() ? 20 : 0,
    duration: 0.8, delay: (i % 5) * 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: item, start: 'top 85%' },
  });
});

gsap.from('.footer-top > div', {
  opacity: 0, y: 30, duration: 0.9, stagger: 0.12, ease: 'power2.out',
  scrollTrigger: { trigger: 'footer', start: 'top 80%' },
});

/* ── NAV AL HACER SCROLL ── */
ScrollTrigger.create({
  start: 'top -90',
  onEnter: () => gsap.to('nav', { background: 'transparent', backdropFilter: 'blur(12px)', padding: '0.85rem var(--px)', duration: 0.4 }),
  onLeaveBack: () => gsap.to('nav', { background: 'transparent', backdropFilter: 'blur(0px)', padding: '1.25rem var(--px)', duration: 0.4 }),
});

// Las imágenes externas cargan tarde: recalcular posiciones al terminar
window.addEventListener('load', () => ScrollTrigger.refresh());
