// About page markup. Pure strings: runs in the browser and at build time (prerender).
import { aboutPage as A, team, showcase } from '../data/site.js'
import { esc, ext, pill, secHeader, layout, tiles } from '../shared.js'
import * as art from '../art.js'

const storyArt = { bot: art.bot, laptop: art.laptop }

const storySection = (s, i) => {
  const media = `<div class="story-art">${storyArt[s.art]}</div>`
  const text = `<div class="story-right"><div class="story-label">${esc(s.label)}</div><h2 class="story-heading">${esc(s.heading)}</h2><p class="story-para">${esc(s.para)}</p></div>`
  return `<div class="story-section">${i % 2 ? text + media : media + text}</div>`
}

const teamCard = (m, i) => `
  <button class="team-card" data-i="${i}">
    <div class="team-img">${m.photo ? `<img src="${m.photo}" alt="${esc(m.name)}, ${esc(m.role)} at C3 Studio" width="900" height="1080" loading="lazy" decoding="async">` : `<div class="team-img-art">${art.bot}</div>`}</div>
    <div class="team-name">${esc(m.name)}</div>
    <div class="team-sub">${esc(m.role)}</div>
  </button>`

export const aboutHtml = () => layout(`
  <section class="about-hero"><div class="about-hero-wrap">
    <div class="about-hero-text">
      <h1 class="ah-h1"><span class="ah-heading left">${esc(A.heading[0])}</span> <span class="ah-heading right">${esc(A.heading[1])}</span></h1>
      ${pill(A.pills[0], 'ah-pill two')}
      ${pill(A.pills[1], 'ah-pill one')}
    </div>
    <div class="ah-swirl">${art.aboutSwirl}</div>
    <div class="ah-btm">
      <div class="ah-art">${art.walkers}</div>
      <div class="ah-para-wrap"><p class="ah-para">${esc(A.intro)}</p></div>
    </div>

    <div class="story-team"><div class="story-team-wrap">
      <div class="story">${A.story.map(storySection).join('')}</div>
      <div class="team">
        ${secHeader(A.teamLabel, A.teamHeading, 'white')}
        <div class="team-btm">${team.map(teamCard).join('')}</div>
      </div>
      <div class="story-path">${art.storyPath}</div>
    </div></div>
  </div></section>

  <section class="showcase behind">
    ${secHeader(A.behind, 'Built, shipped, live', '')}
    <div class="showcase-wrap"><div class="showcase-track">
      ${showcase.map((s) => `<div class="showcase-slide">${s.img ? `<img src="${s.img}" alt="${esc(s.alt || '')}" width="1000" height="1000" loading="lazy" decoding="async">` : tiles[s.tile]}</div>`).join('')}
    </div></div>
  </section>

  <div class="team-popup" aria-hidden="true"><div class="tp-card">
    <button class="tp-close" aria-label="Close">✕</button>
    <div class="tp-img"></div>
    <div class="tp-body"><div class="tp-name"></div><div class="tp-role"></div><div class="tp-bio"></div><div class="tp-socials"></div></div>
  </div></div>
`)

