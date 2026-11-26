// Markup shared by every page: loader, header, footer, contact overlay, small helpers.
import { brand, contact, waLink, mailLink, footer } from './data/site.js'
import * as art from './art.js'

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
export const ext = (href) => `href="${href}" target="_blank" rel="noreferrer"`
export const pill = (text, cls) => `<div class="pill ${cls}"><div class="pill-text">${esc(text)}</div></div>`
export const cta = (text, cls = '') =>
  `<a href="#contact" class="cta-btn ${cls}" data-contact-trigger><span class="cta-text">${esc(text)}</span><span class="cta-arrow">${art.arrow}</span><span class="cta-fill"></span></a>`
export const secHeader = (label, heading, cls = '') =>
  `<div class="sec-header ${cls}"><div class="sec-label">${esc(label)}</div><div class="sec-heading-wrap"><h2 class="sec-heading">${heading}</h2></div></div>`

const NAV = [['Work', '/#work'], ['Services', '/#services'], ['Offers', '/#offers'], ['About us', '/about'], ['Blog', '/blog']]

export const layout = (main) => `
<div class="loader"><div class="loader-bg">${art.loaderBg}</div><div class="loader-inner">${art.loaderLogo}</div></div>

<header class="header"><nav class="nav">
  <div class="nav-links">
    ${NAV.map(([l, h]) => `<a href="${h}" class="nav-btn"><span class="nav-text">${l}</span><span class="nav-fill">${art.navBrush}</span></a>`).join('')}
  </div>
  <a href="/" class="nav-logo">${brand.name}</a>
  <div class="nav-right"><div class="nav-timing">${brand.hours.join('<br>')}</div>${cta("Let's Talk")}</div>
</nav></header>

<main id="top">${main}</main>

<footer class="footer">
  <div class="footer-overlay"></div>
  <div class="footer-wrap">
    <div class="footer-top">
      <div class="footer-top-left"><h2 class="footer-heading">${esc(footer.heading)}</h2>${cta("Let's Talk", 'light')}</div>
      <div class="footer-top-right">
        <div class="footer-cols">
          <div class="footer-col"><div class="footer-col-h">Email us</div><a class="footer-link" href="${mailLink()}">${esc(contact.email)}</a>
            <div class="footer-col-h gap">WhatsApp</div><a class="footer-link" ${ext(waLink())}>${esc(contact.whatsappLabel)}</a></div>
          <div class="footer-col"><div class="footer-col-h">Main Menu</div>${NAV.map(([l, h]) => `<a class="footer-link" href="${h}">${l}</a>`).join('')}</div>
          <div class="footer-col"><div class="footer-col-h">Socials</div><a class="footer-link" ${ext(contact.linkedin)}>LinkedIn</a><a class="footer-link" ${ext(waLink())}>WhatsApp</a></div>
        </div>
        <div class="footer-addr"><span>${esc(footer.tagline)}</span><span>${brand.location.join('<br>')}</span></div>
      </div>
    </div>
    <div class="footer-btm">${art.footerMark(brand.name)}<div class="footer-rights"><span>© Copyright ${new Date().getFullYear()} · ${brand.name}</span><span class="footer-legal"><a href="/contact">Contact</a><a href="/privacy">Privacy policy</a><a href="/terms">Terms of use</a></span></div></div>
  </div>
</footer>

<div class="contact-page" aria-hidden="true">
  <div class="contact-strokes">${art.contactStrokes}</div>
  <div class="contact-nav"><a href="/" class="contact-logo">${brand.name}</a><button class="close-btn"><span class="close-text">Close ✕</span></button></div>
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

// Designed tiles for the showcase strips.
export const tiles = {
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
