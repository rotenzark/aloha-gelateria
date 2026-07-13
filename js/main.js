/* ===== ALOHA GELATERIA · main.js ===== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.getElementById('intro');
  function closeIntro() { if (intro) { intro.classList.add('done'); setTimeout(function () { intro.style.display = 'none'; }, 800); } }
  if (intro) { if (reduce) intro.style.display = 'none'; else { document.getElementById('intro-skip').addEventListener('click', closeIntro); setTimeout(closeIntro, 2800); } }

  var header = document.getElementById('site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger'), nav = document.querySelector('.nav');
  burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = ''; }); });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
    setTimeout(function () { reveals.forEach(function (r) { if (r.getBoundingClientRect().top < window.innerHeight) r.classList.add('in'); }); }, 1500);
  } else reveals.forEach(function (r) { r.classList.add('in'); });

  function romeNow() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' })); }
  function openTime(day) { return day === 6 ? 11 : 11.5; }
  function isOpen(d) { var h = d.getHours() + d.getMinutes() / 60; return h >= openTime(d.getDay()) && h < 23.5; }
  function updateLive() {
    var d = romeNow(), open = isOpen(d), dot = document.getElementById('live-dot'), txt = document.getElementById('live-text');
    if (!dot) return; var en = LANG === 'en', h = d.getHours() + d.getMinutes() / 60;
    if (open) { dot.className = 'open'; txt.textContent = en ? 'Open now · closes at 23:30' : 'Aperto ora · chiude alle 23:30'; }
    else if (h < openTime(d.getDay())) { dot.className = 'closed'; txt.textContent = en ? 'Closed · opens today at 11:30' : 'Chiuso · apre oggi alle 11:30'; }
    else { dot.className = 'closed'; txt.textContent = en ? 'Closed · opens tomorrow at 11:30' : 'Chiuso · apre domani alle 11:30'; }
  }

  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lb-img');
  document.querySelectorAll('.g-item').forEach(function (fig) { fig.addEventListener('click', function () { lbImg.src = fig.getAttribute('data-full'); lbImg.alt = (fig.querySelector('img') || {}).alt || ''; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }); });
  function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); setTimeout(function () { lbImg.src = ''; }, 300); }
  document.getElementById('lb-close').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  var LANG = 'it';
  var EN = {
    'intro.txt': 'Aloha', 'intro.skip': 'Enter →', 'brand.sub': 'Sicilian gelateria · Città Studi',
    'nav.gusti': 'Flavours', 'nav.bottega': 'The shop', 'nav.gallery': 'Gallery', 'nav.dove': 'Find us', 'cta.hi': 'Say hi',
    'hero.eyebrow': 'Gelato · Sicilian granita · Almond milk', 'hero.h1b': 'The gelato of Città Studi.',
    'hero.sub': "A Sicilian gelateria on Via Vallazze, for a lifetime. Fruit flavours that taste «like eating the fruit», granita and almond milk. Some call it the best gelato in Milan.",
    'hero.cta1': 'See the flavours', 'hero.cta2': 'Get directions', 'hero.live': 'Checking hours…',
    'gusti.kicker': 'Flavours', 'gusti.h2': 'Choose. Then choose again.', 'gusti.lead': 'Many flavours, all artisanal. The fruit ones really taste like the fruit.',
    'g.1': 'Pistachio', 'g.2': 'Lemon', 'g.3': 'Almond milk', 'g.4': 'Strawberry', 'g.5': 'Chocolate', 'g.6': 'Coffee', 'g.7': 'Hazelnut', 'g.8': 'Stracciatella', 'g.9': '…and many more',
    'gp.1': '2 flavours', 'gp.2': '3 flavours', 'gp.3t': 'The specialty', 'gp.3': 'Sicilian granita & almond milk',
    'bottega.kicker': 'The shop', 'bottega.h2': 'Sicily, in Città Studi.',
    'bottega.p1': "Aloha is a Sicilian gelateria on Via Vallazze: almond milk, granita and artisanal gelato, with a care that hasn't changed over the years. «I've eaten this gelato since I was born and the quality has stayed insane», writes someone who's been coming forever.",
    'bottega.p2': "Many flavours, great value for money, and a kind, sociable owner who lets you taste before you choose. The sun does the rest.",
    'gallery.kicker': 'Gallery', 'gallery.h2': 'A taste',
    'rev.kicker': 'Voices', 'rev.h2': '838 reviews, 4.6★',
    'dove.kicker': 'Find us', 'dove.h2': 'In Città Studi,<br>on Via Vallazze.',
    'dove.addr': 'Address', 'dove.hours': 'Hours', 'dove.hoursv': 'Every day 11:30–23:30 (Sat from 11)', 'dove.wa': 'Phone / WhatsApp', 'dove.route': 'Get directions', 'dove.wa2': 'Message us on WhatsApp',
    'faq.h2': 'Frequently asked',
    'faq.q1': 'Where are you?', 'faq.a1': 'At Via Vallazze 102, in Città Studi, Milan.',
    'faq.q2': 'When are you open?', 'faq.a2': 'Every day, 11:30 to 23:30 (Saturdays from 11).',
    'faq.q3': 'How much is it?', 'faq.a3': '2 flavours € 2.70, 3 flavours € 3.50. Great value for money.',
    'faq.q4': 'Do you make granita?', 'faq.a4': 'Yes, it\'s our specialty: Sicilian granita and almond milk.',
    'foot.sub': 'Sicilian gelateria · Città Studi', 'foot.where': 'Where', 'foot.hours': 'Hours', 'foot.hoursv': 'Every day', 'foot.contact': 'Contact',
    'foot.disclaimer': 'Demo website. Content, photos and prices gathered from public sources (Google Maps); hours and prices are indicative, to be confirmed with the gelateria.',
    'ab.route': 'Directions', 'ab.wa': 'WhatsApp'
  };
  var IT = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { IT[el.getAttribute('data-i18n')] = el.innerHTML; });
  function setLang(lang) {
    LANG = lang; var dict = lang === 'en' ? EN : IT;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'), v = dict[k]; if (v == null && lang === 'en') v = IT[k]; if (v != null) el.innerHTML = v; });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });
  updateLive(); setInterval(updateLive, 60000);
})();
