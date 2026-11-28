// Case study index + detail pages. Pure strings: rendered at build time (prerender) and in the browser.
import { cases } from '../data/cases.js'
import { waLink } from '../data/site.js'
import { esc, ext, pill, cta, layout } from '../shared.js'
import * as art from '../art.js'

const card = (c) => `
  <a class="cs-card" href="/case-studies/${c.slug}">
    <div class="cs-card-img">${c.art ? `<div class="cs-art">${art.covers[c.art].cover}</div>` : `<img src="${c.images[0][0]}" alt="${esc(c.images[0][1])}" width="${c.images[0][2]}" height="${c.images[0][3]}" loading="lazy" decoding="async">`}</div>
    <div class="cs-card-text">
      <div class="post-meta">${c.tags.map((t) => `<span class="post-tag">${esc(t)}</span>`).join('')}</div>
      <h2 class="post-card-title">${esc(c.title)}</h2>
      <p class="post-card-desc">${esc(c.headline)}</p>
      <span class="post-read">Read the case study ${art.arrow}</span>
    </div>
  </a>`

export const casesIndexHtml = () =>
  layout(`
  <section class="doc cs-index"><div class="doc-wrap">
    <div class="doc-head">
      <h1 class="doc-title">Case<br>studies</h1>
      ${pill('Real clients, real systems', 'doc-pill p0')}
    </div>
    <div class="doc-body cs-list">
      <p class="doc-lead">What we built, who we built it for and what changed. Every project here is real client work.</p>
      ${cases.map(card).join('')}
    </div>
  </div></section>`)

export const caseHtml = (slug) => {
  const c = cases.find((x) => x.slug === slug)
  const more = cases.filter((x) => x.slug !== slug)
  return layout(`
  <article class="doc post cs"><div class="doc-wrap">
    <nav class="post-crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/case-studies">Case studies</a> / <span>${esc(c.title)}</span></nav>
    <div class="doc-head">
      <h1 class="doc-title post-title">${esc(c.title)}</h1>
      ${pill(c.tags[0], 'doc-pill p0')}
    </div>
    <div class="doc-body cs-body">
      <p class="doc-lead">${esc(c.headline)}</p>
      <dl class="cs-facts">${c.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      <div class="cs-stats">${c.stats.map(([n, l]) => `<div class="cs-stat"><div class="cs-stat-n">${esc(n)}</div><div class="cs-stat-l">${esc(l)}</div></div>`).join('')}</div>
      ${c.art ? `<div class="cs-gallery cs-gallery-art"><figure><div class="cs-art">${art.covers[c.art].cover}</div></figure><figure><div class="cs-art">${art.covers[c.art].hover}</div></figure></div>` : ''}
      <div class="cs-gallery n${c.images.length}"${c.images.length ? '' : ' hidden'}>${c.images.map(([src, alt, w, h]) => `<figure><img src="${src}" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"><figcaption>${esc(alt)}</figcaption></figure>`).join('')}</div>

      <h2>The challenge</h2>
      ${c.challenge.map((p) => `<p>${esc(p)}</p>`).join('')}

      <h2>What we built</h2>
      <div class="cs-built">${c.built.map(([h, p]) => `<div class="cs-feature"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>

      <h2>Where it is now</h2>
      ${c.outcome.map((p) => `<p>${esc(p)}</p>`).join('')}

      <div class="doc-ctas">
        ${c.link ? `<a class="doc-link" ${ext(c.link)}>Visit the live site</a>` : ''}
        <a class="doc-wa" ${ext(waLink(`Hi! I read the ${c.title} case study and want something similar.`))}>Want something like this? ${art.arrow}</a>
      </div>

      <div class="post-cta"><h2>Want this built for you?</h2><p>Tell us what you want to build or automate. We reply within a few hours with a scope and a fixed quote.</p>${cta("Let's Talk")}</div>
      ${more.length ? `<div class="post-more"><div class="doc-k">More case studies</div>${more.map(card).join('')}</div>` : ''}
    </div>
  </div></article>`)
}
