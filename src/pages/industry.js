// Industry landing pages (/for/<slug>). Pure strings: rendered at build time (prerender) and in the browser.
import { industries } from '../data/industries.js'
import { cases } from '../data/cases.js'
import { contact, bookLink, mailLink } from '../data/site.js'
import { esc, ext, pill, layout } from '../shared.js'
import * as art from '../art.js'

const bookAttrs = (subject) => (contact.bookingUrl ? ext(bookLink(subject)) : `href="${bookLink(subject)}"`)

const proofCard = (slug) => {
  const c = cases.find((x) => x.slug === slug)
  if (!c) return ''
  const thumb = c.art ? `<div class="cs-art">${art.covers[c.art].cover}</div>` : `<img src="${c.images[0][0]}" alt="${esc(c.images[0][1])}" width="${c.images[0][2]}" height="${c.images[0][3]}" loading="lazy" decoding="async">`
  return `<a class="cs-card" href="/case-studies/${c.slug}"><div class="cs-card-img">${thumb}</div>
    <div class="cs-card-text"><h3 class="post-card-title">${esc(c.title)}</h3><p class="post-card-desc">${esc(c.headline)}</p><span class="post-read">Read the case study ${art.arrow}</span></div></a>`
}

export const industryHtml = (slug) => {
  const d = industries.find((x) => x.slug === slug)
  const book = `<a class="ind-book" ${bookAttrs(d.bookSubject)}>${esc(d.cta)} ${art.arrow}</a>`
  return layout(`
  <article class="doc ind"><div class="doc-wrap">
    <div class="doc-head">
      <h1 class="doc-title">${esc(d.title[0])}<br>${esc(d.title[1])}</h1>
      ${d.pills.map((p, i) => pill(p, `doc-pill p${i}`)).join('')}
    </div>
    <div class="doc-body ind-body">
      <p class="doc-lead">${esc(d.lead)}</p>
      <div class="ind-ctas">${book}<a class="doc-wa" href="${mailLink(d.bookSubject)}">Or email us ${art.arrow}</a></div>

      <h2>${esc(d.why.heading)}</h2>
      <div class="ind-why">${d.why.points.map(([h, p], i) => `<div class="ind-why-item n${i}"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>

      <h2>${esc(d.pains.heading)}</h2>
      <div class="ind-pains">${d.pains.items.map(([h, p]) => `<div class="ind-pain"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>

      <h2>${esc(d.build.heading)}</h2>
      <div class="cs-built">${d.build.items.map(([h, p]) => `<div class="cs-feature"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>

      <h2>${esc(d.pilot.heading)}</h2>
      <p>${esc(d.pilot.intro)}</p>
      <div class="ind-steps">${d.pilot.steps.map(([h, p], i) => `<div class="ind-step"><span>${i + 1}</span><div><h3>${esc(h)}</h3><p>${esc(p)}</p></div></div>`).join('')}</div>

      <h2>Work we've shipped</h2>
      <div class="ind-proof">${d.proof.map(proofCard).join('')}</div>

      <h2>Questions</h2>
      <div class="ind-faq">${d.faqs.map(([q, a]) => `<details class="ind-q"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>

      <div class="post-cta"><h2>See if it fits your ${d.slug.startsWith('uk') ? 'practice' : 'company'}</h2>
        <p>15 minutes, no slides. We'll tell you honestly whether automation will save your team time.</p>
        <div class="ind-ctas">${book.replace('ind-book', 'ind-book light')}<a class="doc-wa light" href="${mailLink(d.bookSubject)}">${esc(contact.email)}</a></div></div>
    </div>
  </div></article>`)
}

export const industrySlugs = industries.map((d) => d.slug)
