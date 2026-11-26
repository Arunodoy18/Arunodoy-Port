import './style.css'
import { brand, contact, waLink, mailLink, hero, about, showcase, projects, projectsEnd, services, offers, faqs, footer } from './data/site'
import * as art from './art'
import { initAnimations } from './anim'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
const pill = (text, cls) => `<div class="pill ${cls}"><div class="pill-text">${esc(text)}</div></div>`
const cta = (text, cls = '') =>
  `<a href="#contact" class="cta-btn ${cls}" data-contact-trigger><span class="cta-text">${esc(text)}</span><span class="cta-arrow">${art.arrow}</span><span class="cta-fill"></span></a>`
const ext = (href) => `href="${href}" target="_blank" rel="noreferrer"`
const header = (label, heading, id = '') =>
  `<div class="sec-header"${id}><div class="sec-label">${esc(label)}</div><div class="sec-heading-wrap"><h2 class="sec-heading">${heading}</h2></div></div>`

const tiles = {
  whatsapp: `<div class="tile tile-wa"><div class="wa-head"><span class="wa-av">C3</span><span><b>C3 Bot</b><small>online</small></span></div>
    <div class="wa-msg in">Hi! Do you have slots this week?</div><div class="wa-msg out">Yes 🙌 Thu 4 pm or Fri 11 am?</div>
    <div class="wa-msg in">Thu 4 pm</div><div class="wa-msg out">Booked ✓ See you Thursday!</div></div>`,
  call: `<div class="tile tile-call"><div class="call-label">AI call agent · live</div><div class="call-wave">${'<i></i>'.repeat(28)}</div>
    <div class="call-line">“…sure, I've booked the demo and sent the invite.”</div><div class="call-meta"><span>02:14</span><span>Lead qualified ✓</span></div></div>`,
  dashboard: `<div class="tile tile-dash"><div class="dash-k">Leads this week</div><div class="dash-v">1,284</div><div class="dash-up">+38% since the bot went live</div>
    <div class="dash-bars">${[40, 55, 48, 70, 62, 88, 96].map((h) => `<i style="height:${h}%"></i>`).join('')}</div></div>`,
  code: `<div class="tile tile-code"><pre><span class="c-k">const</span> agent = <span class="c-f">createAgent</span>({
  model: <span class="c-s">'claude'</span>,
  tools: [whatsapp, crm, calendar],
  knowledge: <span class="c-s">'./your-docs'</span>,
})

<span class="c-k">await</span> agent.<span class="c-f">deploy</span>() <span class="c-c">// live in weeks</span></pre></div>`,
}

const cardHtml = (p) => `
  <a class="project-card" ${ext(p.link)}>
    <div class="card-img">
      <img class="card-cover" src="${p.cover}" alt="${esc(p.title)}" loading="lazy">
      ${art.cardBrush(p.brush)}
      <img class="card-hover" src="${p.hover}" alt="" loading="lazy">
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

document.querySelector('#app').innerHTML = `
<div class="loader"><div class="loader-bg">${art.loaderBg}</div><div class="loader-inner">${art.loaderLogo}</div></div>

<header class="header"><nav class="nav">
  <div class="nav-links">
    ${[['Work', '#work'], ['Services', '#services'], ['Offers', '#offers']].map(([l, h]) => `<a href="${h}" class="nav-btn"><span class="nav-text">${l}</span><span class="nav-fill">${art.navBrush}</span></a>`).join('')}
  </div>
  <a href="#top" class="nav-logo">${brand.name}</a>
  <div class="nav-right"><div class="nav-timing">${brand.hours.join('<br>')}</div>${cta("Let's Talk")}</div>
</nav></header>

<main id="top">
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
    ${showcase.map((s) => `<div class="showcase-slide">${s.img ? `<img src="${s.img}" alt="" loading="lazy">` : tiles[s.tile]}</div>`).join('')}
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
</main>

<footer class="footer">
  <div class="footer-overlay"></div>
  <div class="footer-wrap">
    <div class="footer-top">
      <div class="footer-top-left"><h2 class="footer-heading">${esc(footer.heading)}</h2>${cta("Let's Talk", 'light')}</div>
      <div class="footer-top-right">
        <div class="footer-cols">
          <div class="footer-col"><div class="footer-col-h">Email us</div><a class="footer-link" href="${mailLink()}">${esc(contact.email)}</a>
            <div class="footer-col-h gap">WhatsApp</div><a class="footer-link" ${ext(waLink())}>${esc(contact.whatsappLabel)}</a></div>
          <div class="footer-col"><div class="footer-col-h">Main Menu</div><a class="footer-link" href="#work">Work</a><a class="footer-link" href="#services">Services</a><a class="footer-link" href="#offers">Offers</a></div>
          <div class="footer-col"><div class="footer-col-h">Socials</div><a class="footer-link" ${ext(contact.linkedin)}>LinkedIn</a><a class="footer-link" ${ext(waLink())}>WhatsApp</a></div>
        </div>
        <div class="footer-addr"><span>${esc(footer.tagline)}</span><span>${brand.location.join('<br>')}</span></div>
      </div>
    </div>
    <div class="footer-btm">${art.footerMark(brand.name)}<div class="footer-rights">© Copyright ${new Date().getFullYear()} · ${brand.name}</div></div>
  </div>
</footer>

<div class="contact-page" aria-hidden="true">
  <div class="contact-strokes">${art.contactStrokes}</div>
  <div class="contact-nav"><a href="#top" class="contact-logo">${brand.name}</a><button class="close-btn"><span class="close-text">Close ✕</span></button></div>
  <div class="contact-content">
    <div class="contact-left"><h2 class="contact-heading">want to start a new project?</h2><p class="contact-para">or just say hello! We reply within a few hours.</p></div>
    <div class="contact-right">
      <div class="email-heading">Projects &amp; enquiries</div><a class="email-link" href="${mailLink()}">${esc(contact.email)}</a>
      <div class="email-heading">WhatsApp us</div><a class="email-link" ${ext(waLink())}>${esc(contact.whatsappLabel)}</a>
      <div class="contact-socials"><a class="contact-social" ${ext(contact.linkedin)}><span>LinkedIn</span></a><a class="contact-social" ${ext(waLink())}><span>WhatsApp</span></a><a class="contact-social" href="${mailLink()}"><span>Email</span></a></div>
    </div>
  </div>
  <div class="contact-img">${art.bot}</div>
</div>`

initAnimations()
