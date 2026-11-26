// Blog index + post pages. Pure strings: rendered at build time (prerender) and in the browser.
import { posts } from '../data/posts.js'
import { team } from '../data/site.js'
import { esc, pill, cta, layout } from '../shared.js'
import * as art from '../art.js'

export const fmtDate = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

const card = (p) => `
  <a class="post-card" href="/blog/${p.slug}">
    <div class="post-meta">${p.tags.map((t) => `<span class="post-tag">${esc(t)}</span>`).join('')}<span>${fmtDate(p.date)} · ${p.readMins} min read</span></div>
    <h2 class="post-card-title">${esc(p.title)}</h2>
    <p class="post-card-desc">${esc(p.description)}</p>
    <span class="post-read">Read the post ${art.arrow}</span>
  </a>`

export const blogIndexHtml = () =>
  layout(`
  <section class="doc"><div class="doc-wrap">
    <div class="doc-head">
      <h1 class="doc-title">Notes from<br>the studio</h1>
      ${pill('AI, automation & building products', 'doc-pill p0')}
    </div>
    <div class="doc-body blog-list">
      <p class="doc-lead">Practical guides on WhatsApp bots, AI agents, SaaS and custom software, written by the people who build them.</p>
      ${[...posts].sort((a, b) => b.date.localeCompare(a.date)).map(card).join('')}
    </div>
  </div></section>`)

export const postHtml = (slug) => {
  const p = posts.find((x) => x.slug === slug)
  const author = team.find((m) => m.name === p.author)
  const more = posts.filter((x) => x.slug !== slug).slice(0, 2)
  return layout(`
  <article class="doc post"><div class="doc-wrap">
    <nav class="post-crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog">Blog</a> / <span>${esc(p.title)}</span></nav>
    <div class="doc-head">
      <h1 class="doc-title post-title">${esc(p.title)}</h1>
    </div>
    <div class="doc-body post-body">
      <div class="post-meta big">${p.tags.map((t) => `<span class="post-tag">${esc(t)}</span>`).join('')}<span>By <a href="/about">${esc(p.author)}</a> · <time datetime="${p.date}">${fmtDate(p.date)}</time> · ${p.readMins} min read</span></div>
      ${p.body}
      <aside class="post-author">
        ${author?.photo ? `<img src="${author.photo}" alt="${esc(author.name)}" width="900" height="1080" loading="lazy" decoding="async">` : ''}
        <div><div class="post-author-name">${esc(p.author)}</div><div class="post-author-role">${esc(author?.role || '')}, C3 Studio</div>
        <p>${esc(author?.bio?.[0] || '')}</p></div>
      </aside>
      <div class="post-cta"><h2>Want this built for you?</h2><p>Tell us what you want to automate. We reply within a few hours.</p>${cta("Let's Talk")}</div>
      ${more.length ? `<div class="post-more"><div class="doc-k">Keep reading</div>${more.map(card).join('')}</div>` : ''}
    </div>
  </div></article>`)
}

export const postSlugs = posts.map((p) => p.slug)
