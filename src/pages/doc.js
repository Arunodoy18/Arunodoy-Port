// Contact, Privacy, Terms and 404 pages. Pure strings: rendered at build time (prerender) and in the browser.
import { brand, contact, waLink, mailLink, projects } from '../data/site.js'
import { esc, ext, pill, cta, layout } from '../shared.js'
import * as art from '../art.js'

const UPDATED = '27 November 2026'

const shell = ({ title, pills = [], body, art: side = '' }) => `
  <section class="doc"><div class="doc-wrap">
    <div class="doc-head">
      <h1 class="doc-title">${title}</h1>
      ${pills.map((p, i) => pill(p, `doc-pill p${i}`)).join('')}
    </div>
    <div class="doc-grid">
      <div class="doc-body">${body}</div>
      ${side ? `<div class="doc-art">${side}</div>` : ''}
    </div>
  </div></section>`

const docs = {
  contact: () =>
    shell({
      title: "Let's talk",
      pills: ['We reply within a few hours', 'Mon–Sat'],
      art: art.bot,
      body: `
        <p class="doc-lead">Tell us what you want to build or automate. Rough ideas are fine: we'll come back with a scope, a timeline and a fixed price.</p>
        <div class="doc-contact">
          <div><div class="doc-k">WhatsApp</div><a class="doc-v" ${ext(waLink())}>${esc(contact.whatsappLabel)}</a></div>
          <div><div class="doc-k">Email</div><a class="doc-v" href="${mailLink()}">${esc(contact.email)}</a></div>
          <div><div class="doc-k">LinkedIn</div><a class="doc-v" ${ext(contact.linkedin)}>Arunodoy Banerjee</a></div>
          <div><div class="doc-k">Hours</div><div class="doc-v small">${brand.hours.join(', ')}</div></div>
          <div><div class="doc-k">Location</div><div class="doc-v small">${brand.location.join(' · ')}</div></div>
        </div>
        <address class="doc-nap"><strong>C3 Studio</strong> · ${esc(brand.location[0])} · <a href="tel:+${contact.whatsapp}">${esc(contact.whatsappLabel)}</a> · <a href="${mailLink()}">${esc(contact.email)}</a></address>
        <div class="doc-ctas">${cta('Open the contact panel')}<a class="doc-wa" ${ext(waLink())}>Chat on WhatsApp ${art.arrow}</a></div>`,
    }),

  privacy: () =>
    shell({
      title: 'Privacy policy',
      pills: [`Updated ${UPDATED}`],
      body: `
        <p class="doc-lead">Short version: this website doesn't track you, doesn't use cookies and doesn't sell anything about you. If you contact us, we use your details only to reply and to work with you.</p>
        <h2>Who we are</h2>
        <p>C3 Studio is an AI and automation studio based in ${esc(brand.location[0])}. You can reach us at <a href="${mailLink('Privacy question')}">${esc(contact.email)}</a> or on WhatsApp at ${esc(contact.whatsappLabel)}.</p>
        <h2>What this website collects</h2>
        <p>Very little. There are no accounts, cookies or advertising trackers on this site. Fonts and images are served from our own hosting.</p>
        <p>Our hosting provider, Netlify, keeps standard server logs (such as IP address, browser type and the page requested) to run and secure the service. We use Netlify Analytics, which counts visits from those server logs without cookies or tracking scripts, to see which pages are read. See <a ${ext('https://www.netlify.com/privacy/')}>Netlify's privacy policy</a>.</p>
        <h2>Client reviews</h2>
        <p>Clients we've worked with can send us a review through a private form. It collects the name, role, company, project, rating and review they enter, stored with Netlify Forms. We publish a review only if the client ticks the consent box, and we take it down on request.</p>
        <h2>When you contact us</h2>
        <p>If you email us, message us on WhatsApp or connect on LinkedIn, we receive what you choose to send, such as your name, contact details and project information. We use it only to reply, prepare proposals and deliver work you've asked for. Those platforms also process your messages under their own privacy policies. If you book a call, Calendly handles the booking and the details you enter, under <a ${ext('https://calendly.com/privacy')}>its own privacy policy</a>.</p>
        <h2>Sharing and storage</h2>
        <p>We don't sell or rent personal information. We share it only with tools we need to do the work (for example email and project tools), or when the law requires it. We keep project correspondence for as long as the working relationship needs it, then delete it on request.</p>
        <h2>Your choices</h2>
        <p>You can ask us what information we hold about you, ask us to correct it, or ask us to delete it, by writing to <a href="${mailLink('Privacy request')}">${esc(contact.email)}</a>. This includes your rights under India's Digital Personal Data Protection Act, 2023, and, if you're in the EU or UK, the GDPR.</p>
        <h2>Changes</h2>
        <p>If this policy changes, we'll update this page and the date at the top.</p>`,
    }),

  terms: () =>
    shell({
      title: 'Terms of use',
      pills: [`Updated ${UPDATED}`],
      body: `
        <p class="doc-lead">These terms cover your use of this website. Client projects are covered by the written proposal or agreement we sign with you, which takes priority over anything here.</p>
        <h2>Using this website</h2>
        <p>You're welcome to browse, share and link to this site. Please don't copy its design, artwork or text for your own commercial use, or try to disrupt or misuse the site.</p>
        <h2>Our content</h2>
        <p>The C3 Studio name, logo, illustrations and copy on this site belong to C3 Studio. Project screenshots and names belong to their respective owners and are shown with permission as examples of our work.</p>
        <h2>Information on this site</h2>
        <p>We keep the information here accurate and up to date, but it's general and can change. Offers, timelines and prices are confirmed only in a written proposal.</p>
        <h2>Links to other sites</h2>
        <p>We link to live projects and to platforms like WhatsApp and LinkedIn. We aren't responsible for the content or policies of sites we don't run.</p>
        <h2>Liability</h2>
        <p>This website is provided as it is. To the extent the law allows, C3 Studio isn't liable for losses caused by using or relying on this website.</p>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India.</p>
        <h2>Contact</h2>
        <p>Questions about these terms: <a href="${mailLink('Terms question')}">${esc(contact.email)}</a>.</p>`,
    }),

  // Private page: only reachable from the link we send clients (not in nav, noindex, not in sitemap).
  // Submissions go to Netlify Forms (form name "testimonial"); approved ones are added to testimonials in src/data/site.js.
  review: () =>
    shell({
      title: 'How did<br>we do?',
      pills: ['Takes 2 minutes', 'Thank you!'],
      art: art.bot,
      body: `
        <p class="doc-lead">Thanks for building with us. A few honest lines about working with C3 Studio help the next client decide, and help us get better.</p>
        <form class="rv-form" name="testimonial" method="POST" action="/review?sent=1" data-netlify="true" netlify-honeypot="company-website">
          <input type="hidden" name="form-name" value="testimonial">
          <p class="rv-hp"><label>Leave this empty <input name="company-website" tabindex="-1" autocomplete="off"></label></p>
          <div class="rv-row">
            <label class="rv-f"><span>Your name *</span><input name="name" required autocomplete="name" maxlength="80"></label>
            <label class="rv-f"><span>Your role</span><input name="role" placeholder="Founder, Manager…" autocomplete="organization-title" maxlength="80"></label>
          </div>
          <div class="rv-row">
            <label class="rv-f"><span>Company *</span><input name="company" required autocomplete="organization" maxlength="100"></label>
            <label class="rv-f"><span>Project *</span><select name="project" required>
              <option value="">Choose one</option>
              ${projects.map((p) => `<option>${esc(p.title)}</option>`).join('')}
              <option>Something else</option>
            </select></label>
          </div>
          <fieldset class="rv-f rv-stars"><legend>Your rating *</legend>
            <div class="rv-star-row">${[5, 4, 3, 2, 1].map((n) => `<input type="radio" id="rv-s${n}" name="rating" value="${n}" required${n === 5 ? ' checked' : ''}><label for="rv-s${n}" title="${n} star${n > 1 ? 's' : ''}">★</label>`).join('')}</div>
          </fieldset>
          <label class="rv-f"><span>Your review *</span><textarea name="quote" required rows="6" minlength="20" maxlength="800" placeholder="What did we build, how was working with us, and what changed for your business?"></textarea></label>
          <label class="rv-check"><input type="checkbox" name="consent" value="yes" required><span>I agree that C3 Studio can show my review, name, role and company on its website and social pages.</span></label>
          <button class="cta-btn rv-submit" type="submit"><span class="cta-text">Send my review</span><span class="cta-arrow">${art.arrow}</span><span class="cta-fill"></span></button>
          <p class="rv-error" hidden>Something went wrong. Please try again, or send your review on <a ${ext(waLink('Hi! Here is my review for C3 Studio:'))}>WhatsApp</a>.</p>
        </form>
        <div class="rv-done" hidden>
          <h2>Thank you!</h2>
          <p>Your review is with us. We'll let you know when it's live on the site.</p>
          <div class="doc-links"><a class="doc-link" href="/">Visit C3 Studio</a></div>
        </div>`,
    }),

  404: () =>
    shell({
      title: 'This page<br>went for chai',
      pills: ['Error 404', 'Not our finest bot'],
      art: art.bot,
      body: `
        <p class="doc-lead">The page you're looking for doesn't exist, or it moved. Everything we build is one click away:</p>
        <div class="doc-links">
          <a class="doc-link" href="/">Home</a><a class="doc-link" href="/#work">Work</a><a class="doc-link" href="/#services">Services</a>
          <a class="doc-link" href="/#offers">Offers</a><a class="doc-link" href="/about">About us</a><a class="doc-link" href="/contact">Contact</a>
        </div>
        <div class="doc-ctas">${cta("Let's Talk")}</div>`,
    }),
}

export const docHtml = (page) => layout(docs[page]())
export const docPages = Object.keys(docs)
