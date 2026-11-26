// Home page markup. Pure strings: runs in the browser and at build time (prerender).
import { waLink, hero, about, showcase, projects, projectsEnd, services, offers, faqs } from '../data/site.js'
import { esc, ext, pill, cta, secHeader as header, layout, tiles } from '../shared.js'
import * as art from '../art.js'


const cardHtml = (p) => `
  <a class="project-card" ${p.link ? ext(p.link) : 'href="#contact" data-contact-trigger'}>
    <div class="card-img">
      ${p.coverArt ? `<div class="card-cover art-cover">${art.covers[p.coverArt].cover}</div>` : `<img class="card-cover" src="${p.cover}" alt="${esc(p.title)}: ${esc(p.category)}" width="728" height="1020" loading="lazy" decoding="async">`}
      ${art.cardBrush(p.brush)}
      ${p.coverArt ? `<div class="card-hover art-hover">${art.covers[p.coverArt].hover}</div>` : `<img class="card-hover" src="${p.hover}" alt="${esc(p.title)}: another screen" width="728" height="1020" loading="lazy" decoding="async">`}
    </div>
    <div class="card-detail">
      <div class="card-logo" style="background:${p.brush}">${p.logo}</div>
      <div class="card-head"><div class="card-name">${esc(p.title)}</div><div class="card-cat">${esc(p.category)}</div></div>
      <div class="card-arrow">${art.arrow}</div>
    </div>
  </a>`

const yoursCard = `
  <a class="project-card yours" href="#contact" data-contact-trigger>
    <div class="card-img">
      <div class="card-cover yours-cover"><div class="yours-text">Your<br>project<br>here</div>${art.bot}</div>
      ${art.cardBrush('#111')}
      <div class="card-hover yours-hover"><div class="yours-text">Let's<br>build<br>it</div></div>
    </div>
    <div class="card-detail">
      <div class="card-logo" style="background:#ff5400">?</div>
      <div class="card-head"><div class="card-name">Your idea</div><div class="card-cat">Anything with AI in it</div></div>
      <div class="card-arrow">${art.arrow}</div>
    </div>
  </a>`

const offerCard = (o) => `
  <div class="offer-item"><div class="offer-card">
    <div class="offer-top"><div class="offer-name">${esc(o.name)}</div><div class="offer-for">${esc(o.for)}</div></div>
    <ul class="offer-includes">${o.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    <div class="offer-btm">
      <div><div class="offer-price">${esc(o.price ?? 'Custom quote')}</div><div class="offer-time">${esc(o.timeline)}</div></div>
      <a class="offer-wa" ${ext(waLink(`Hi! I'm interested in the ${o.name} offer.`))}>Ask on WhatsApp ${art.arrow}</a>
    </div>
  </div></div>`

export const homeHtml = () => layout(`
  <section class="hero"><div class="hero-wrap">
    <div class="hero-text">
      ${pill(hero.pills[0], 'hero-pill two')}
      <h1 class="hero-heading">${esc(hero.heading)}</h1>
      ${pill(hero.pills[1], 'hero-pill one')}
      ${pill(hero.pills[2], 'hero-pill three')}
    </div>
    <div class="hero-walkers">${art.walkers}</div>
    <div class="swirl swirl-left">${art.swirlLeft}</div>
    <div class="swirl swirl-right">${art.swirlRight}</div>
    <div class="hero-marquee">${art.heroMarquee(hero.marquee)}</div>
  </div></section>

  <section class="about" id="about"><div class="about-wrap"><div class="about-pinned">
    <div class="about-label">${esc(about.label)}</div>
    <p class="about-para">${esc(about.para)}</p>
    ${pill(about.pills[0], 'about-pill second')}${pill(about.pills[1], 'about-pill first')}${pill(about.pills[2], 'about-pill third')}
  </div></div></section>

  <section class="showcase"><div class="showcase-wrap"><div class="showcase-track">
    ${showcase.map((s) => `<div class="showcase-slide">${s.img ? `<img src="${s.img}" alt="${esc(s.alt || '')}" width="1000" height="1000" loading="lazy" decoding="async">` : tiles[s.tile]}</div>`).join('')}
  </div></div></section>

  <section class="projects" id="work">
    ${header('Featured Projects', 'Selected Works')}
    <div class="projects-list">${projects.map(cardHtml).join('')}${yoursCard}</div>
    <div class="projects-end"><div class="pe-inner">
      <p class="pe-para">${esc(projectsEnd.para)}</p>
      ${pill(projectsEnd.pills[0], 'pe-pill p1')}${pill(projectsEnd.pills[1], 'pe-pill p2')}${pill(projectsEnd.pills[2], 'pe-pill p3')}
      ${cta(projectsEnd.cta, 'pe-btn')}
    </div></div>
  </section>

  <section class="services" id="services">
    ${header('Our Services', 'This is what we build')}
    <div class="services-body">
      <svg class="svc-path light" fill="none"><path/></svg>
      <svg class="svc-path dark" fill="none"><path/></svg>
      <div class="services-layers">
        ${services.map((s, i) => `<div class="svc-layer"><div class="svc-block b${i % 4}">
          <div class="svc-text">${esc(s.a)}</div><div class="svc-icon">${art.serviceIcons[s.icon]}</div><div class="svc-text">${esc(s.b)}</div>
          <div class="svc-para-wrap"><p class="svc-para">${esc(s.para)}</p></div>
        </div></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="offers" id="offers">
    ${header('Offers', 'Pick your starting point')}
    <div class="offers-body"><div class="offers-bg">
      <div class="offer-list">${offers.map(offerCard).join('')}</div>
      <div class="side-bar"></div>
      <div class="nav-arrow"><svg viewBox="0 0 24 24" fill="none" width="40%"><path d="M12 19V5M12 5L5 12M12 5l7 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    </div></div>
  </section>

  <section class="faq" id="faq"><div class="faq-wrap">
    <div class="faq-left">
      <div class="faq-header"><div class="sec-label static">Frequently Asked Questions</div><h2 class="sec-heading">Things you might ask</h2></div>
      <div class="faq-art">${art.bot}</div>
    </div>
    <div class="faq-right"><div class="faq-list">
      ${faqs.map((f) => `<div class="faq-item">
        <div class="q-block"><div class="faq-q">${esc(f.q)}</div></div>
        <div class="a-wrap"><div class="a-block"><p class="faq-a">${esc(f.a)}</p></div><div class="faq-logo">C3</div></div>
      </div>`).join('')}
    </div></div>
  </div></section>
`)

