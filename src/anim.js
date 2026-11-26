// Motion system. Each block mirrors one component of the reference: same plugins, eases, timings.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)

const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s))
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const isTouch = () => matchMedia('(pointer: coarse)').matches || innerWidth < 992
const OUTLINE = (c) => `0.5px 0.5px 0 ${c}, -0.5px -0.5px 0 ${c}, 0.5px -0.5px 0 ${c}, -0.5px 0.5px 0 ${c}`
let lenis

export async function initAnimations(page = 'home') {
  // Smooth scroll, synced with ScrollTrigger
  lenis = new Lenis({ lerp: 0.1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]:not([data-contact-trigger])')
    if (!a || a.target === '_blank') return
    let href = a.getAttribute('href')
    if (href.startsWith('/#') && location.pathname === '/') href = href.slice(1)
    if (href.startsWith('#')) {
      if (href.length > 1 && $(href)) { e.preventDefault(); lenis.scrollTo(href === '#top' ? 0 : href, { duration: 1.4 }) }
    } else if (href.startsWith('/')) sessionStorage.setItem('c3nav', '1')
  })

  await document.fonts.ready
  if (page === 'home') {
    walkers(); hero(); heroMarquee(); about(); showcase(); projects(); cardHover(); services(); offersStack(); faq()
  } else {
    walkers(); aboutHero(); story(); showcase(); teamPopup()
  }
  footer()
  navButtons()
  ctaButtons()
  contactModal()
  charWobble('.footer-link, .email-link')
  loader()
}

/* ------------------------------------------------------------------ loader */
function loader() {
  const el = $('.loader')
  const done = () => {
    el.style.display = 'none'
    lenis.start()
    ScrollTrigger.refresh()
    if (location.hash && $(location.hash)) lenis.scrollTo(location.hash, { immediate: true })
  }
  lenis.stop()
  // Like the reference: the full loader plays on first visit / reload, not when moving between pages.
  const nav = performance.getEntriesByType('navigation')[0]
  const internal = sessionStorage.getItem('c3nav') === '1' && nav?.type !== 'reload'
  sessionStorage.setItem('c3nav', '0')
  if (reduced || internal) { done(); document.dispatchEvent(new CustomEvent('c3:reveal')); return }

  const [orange, pink] = $$('.loader-bg path')
  gsap.set([orange, pink], { drawSVG: '0% 100%', strokeWidth: 3000 })
  const logo = $('.loader-logo')
  const ribbon = $('.ribbon', logo)
  const cStroke = $('.c-stroke', logo)
  const letters = $$('.pop', logo)
  gsap.set(ribbon, { drawSVG: '0% 0%', strokeWidth: 0 })
  gsap.set(cStroke, { drawSVG: '0%' })
  letters.forEach((l) => {
    const b = l.getBBox()
    gsap.set(l, { scale: 0, rotation: gsap.utils.random(-25, 25), svgOrigin: `${b.x + b.width / 2} ${b.y + b.height / 2}`, stroke: '#ff5400', strokeWidth: 6 })
  })
  logo.style.visibility = 'visible'

  const tl = gsap.timeline({ delay: 0.25 }).timeScale(1.25)
  tl.to(ribbon, { strokeWidth: 19, duration: 1, ease: 'power2.in' }, 0)
    .to(ribbon, { drawSVG: '0% 9%', duration: 0.7, ease: 'power2.in' }, 0)
    .to(ribbon, { drawSVG: '55% 64%', duration: 1.2, ease: 'none' }, 0.7)
    .to(cStroke, { drawSVG: '100%', duration: 1.1, ease: 'power2.out' }, '-=0.4')
    .to(ribbon, { drawSVG: '100% 100%', duration: 1.1, ease: 'power2.inOut' }, '-=0.5')
    .to(ribbon, { strokeWidth: 0, duration: 0.5, ease: 'power2.in' }, '-=0.55')
    .to(letters, { scale: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(3)' }, '-=0.3')
    .to(letters, { strokeWidth: 0, duration: 0.6, stagger: 0.08, ease: 'power1.in' }, '<')

  tl.eventCallback('onComplete', () => {
    const SWEEP = 0.65
    gsap.timeline({ onComplete: done })
      .to({}, { duration: 0.2 })
      .to(pink, { drawSVG: '50% 100%', strokeWidth: 1000, y: 1800, x: 900, duration: SWEEP, ease: 'power2.inOut' }, 'p')
      .to('.loader-inner', { opacity: 0, duration: 0.15 }, `p+=${SWEEP * 0.2}`)
      .to(orange, { drawSVG: '50% 100%', strokeWidth: 1000, y: 1800, x: -900, duration: SWEEP, ease: 'power2.inOut' }, `p+=${SWEEP * 0.25}`)
      .add(() => document.dispatchEvent(new CustomEvent('c3:reveal')), `p+=${SWEEP * 0.35}`)
  })
}
const onReveal = (fn) => document.addEventListener('c3:reveal', fn, { once: true })

/* -------------------------------------------- split helpers (lines in masks) */
const splitLines = (el) => new SplitText(el, { type: 'lines', linesClass: 'line', mask: 'lines' }).lines
function popPills(tl, pills, start, total) {
  pills.forEach((pill, i) => {
    const t = start + (i / Math.max(1, pills.length)) * total * 0.7
    const txt = pill.firstElementChild
    tl.to(pill, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(2.5)' }, t)
    if (txt) tl.to(txt, { y: '0%', opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, t + 0.15)
  })
}
function prepPills(pills) {
  gsap.set(pills, { opacity: 0, scale: 0.4, y: 20, transformOrigin: 'center center' })
  pills.forEach((p) => p.firstElementChild && gsap.set(p.firstElementChild, { y: '105%', opacity: 0 }))
}

/* ------------------------------------------------------------------- hero */
function hero() {
  const lines = splitLines($('.hero-heading'))
  gsap.set(lines, { y: '115%', opacity: 0 })
  const pills = $$('.hero-pill')
  prepPills(pills)
  const paths = $$('.swirl path')
  paths.forEach((p) => gsap.set(p, { drawSVG: '0%', strokeWidth: 0 }))
  gsap.set('.hero-walkers', { opacity: 0, y: 40 })

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } }).timeScale(0.75)
  tl.to(lines, { y: '0%', opacity: 1, duration: 0.85, stagger: 0.12, ease: 'back.out(1.4)' }, 0)
  const total = lines.length * 0.12 + 0.5
  popPills(tl, pills, 0.2, total)
  paths.forEach((p, i) => {
    const t = total * 0.4 + i * 0.15
    tl.to(p, { drawSVG: '100%', duration: 0.9 }, t).to(p, { strokeWidth: 30, duration: 0.9 }, t)
  })
  tl.to('.hero-walkers', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.1)
  onReveal(() => tl.play())
}

/* --------------------------------------- walkers: stepped 12fps walk cycle */
function walkers() {
  const svg = $('.walkers')
  const people = $$('.walker', svg).map((w, k) => ({
    legs: $$('.leg', w).map((g) => ({ g, shin: $('.shin', g), base: g.getAttribute('transform') })),
    bob: $('.bob', w),
    sign: $('.sign', w), signBase: $('.sign', w).getAttribute('transform'),
    off: k * 1.7,
  }))
  const cats = $$('.cat', svg).map((c, k) => ({ legs: $$('.cat-leg', c), tail: $('.cat-tail', c), inner: $('.cat-in', c), off: k * 2.1 }))
  const looks = ['a', 'b', 'c', 'd']
  let look = 0, f = 0, acc = 0, lookAcc = 0
  const FPS = 12, STRIDE = 11

  const draw = () => {
    for (const p of people) {
      const ph = (f / STRIDE) * Math.PI * 2 + p.off
      const s = Math.sin(ph), c = Math.cos(ph)
      const ang = [22 * s, -22 * s]
      const bend = [40 * Math.max(0, -c), 40 * Math.max(0, c)]
      p.legs.forEach((l, i) => {
        l.g.setAttribute('transform', `${l.base} rotate(${ang[i].toFixed(1)})`)
        l.shin.setAttribute('transform', `translate(0 95) rotate(${bend[i].toFixed(1)})`)
      })
      const by = -Math.abs(Math.cos(ph)) * 7
      p.bob.setAttribute('transform', `translate(0 ${by.toFixed(1)})`)
      p.sign.setAttribute('transform', `${p.signBase} rotate(${(1.6 * Math.sin(ph * 2)).toFixed(2)})`)
    }
    for (const c of cats) {
      const ph = (f / 8) * Math.PI * 2 + c.off
      c.legs.forEach((l, i) => {
        const [x] = l.getAttribute('d').match(/-?\d+/)
        const a = 22 * Math.sin(ph + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI / 2 : 0))
        l.setAttribute('transform', `rotate(${a.toFixed(1)} ${x} -34)`)
      })
      c.tail.setAttribute('transform', `rotate(${(8 * Math.sin(ph)).toFixed(1)} -44 -52)`)
    }
  }
  draw()
  if (reduced) return
  gsap.ticker.add((_, dt) => {
    acc += dt; lookAcc += dt
    if (acc < 1000 / FPS) return
    acc = 0; f++
    if (lookAcc > 1450) { lookAcc = 0; look = (look + 1) % looks.length; svg.dataset.look = looks[look] }
    draw()
  })
  // cats stroll in after the reveal
  gsap.set(cats.map((c) => c.inner), { x: -260, opacity: 0 })
  onReveal(() => gsap.to(cats.map((c) => c.inner), { x: 0, opacity: 1, duration: 2.6, stagger: 0.5, ease: 'power1.out', delay: 0.6 }))
}

/* --------------------------------------------------- curved hero marquee */
function heroMarquee() {
  const bg = $('.hm-bg'), mask = $('.hm-mask-path'), tp = $('.hm-tp'), unit = $('.hm-unit'), group = $('.hm-text-group')
  gsap.set([bg, mask], { drawSVG: '100% 100%' })
  const len = unit.getComputedTextLength() || 1600
  gsap.to(tp, { attr: { startOffset: -len }, duration: len / 75, ease: 'none', repeat: -1 })
  onReveal(() =>
    gsap.to([bg, mask], {
      drawSVG: '0% 100%', duration: 1.3, ease: 'power2.out', delay: 0.5,
      scrollTrigger: { trigger: '.hero-marquee', start: 'top 105%', once: true },
      onComplete: () => group.removeAttribute('mask'),
    }),
  )
}

/* ------------------------------------------- about: pinned letter scrub */
function about() {
  const section = $('.about')
  const chars = new SplitText($('.about-para'), { type: 'chars,words', charsClass: 'about-char' }).chars
  const pills = $$('.about-pill')
  gsap.set(chars, { color: 'rgba(255,84,0,0.45)' })
  gsap.set(pills, { opacity: 0, scale: 0.6, y: 24 })
  const dist = () => (innerWidth < 480 ? 1150 : innerWidth < 992 ? 1550 : 2200)
  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: innerWidth < 992 ? 0.6 : 0.8, anticipatePin: 1, invalidateOnRefresh: true },
  })
  chars.forEach((c, i) => {
    const t = (i / chars.length) * 85
    tl.to(c, { color: '#FF5400', scale: 1.12, rotation: () => gsap.utils.random(-4, 4), textShadow: OUTLINE('#FF5400'), duration: 3.5, ease: 'power1.out' }, t)
    tl.to(c, { color: '#000', scale: 1, rotation: 0, textShadow: '0 0 0 rgba(0,0,0,0)', duration: 3.5, ease: 'power1.inOut' }, t + 3.5)
  })
  ;[35, 72, 96].forEach((t, i) => pills[i] && tl.to(pills[i], { opacity: 1, scale: 1, y: 0, duration: 6, ease: 'back.out(2)' }, t))
}

/* ------------------------- showcase: infinite marquee, scroll-direction aware */
function showcase() {
  const wrap = $('.showcase-wrap'), track = $('.showcase-track')
  const originals = $$('.showcase-slide', track)
  const sets = Math.max(3, Math.ceil((innerWidth * 3.5) / (originals[0].offsetWidth * originals.length || 1000)))
  for (let s = 1; s < sets; s++) originals.forEach((o) => track.appendChild(o.cloneNode(true)))
  const slides = $$('.showcase-slide', track)
  let setW = 0
  const measure = () => { setW = slides[originals.length].offsetLeft - slides[0].offsetLeft }
  measure(); addEventListener('resize', measure); addEventListener('load', measure)
  let x = 0, dir = -1, cur = -1, boost = 0
  const BASE = 1.5 * (1 + 2 * 0.3)
  ScrollTrigger.create({
    trigger: document.body, start: 'top top', end: 'bottom bottom',
    onUpdate: (self) => { const d = self.direction === 1 ? -1 : 1; dir = d; boost = Math.min(Math.abs(self.getVelocity()) / 220, 10 * 1.6) * d },
  })
  gsap.ticker.add(() => {
    cur += (dir - cur) * 0.06; boost *= 0.92
    x += BASE * cur + boost
    if (setW > 0) { while (x <= -setW) x += setW; while (x > 0) x -= setW }
    gsap.set(track, { x, force3D: true })
    const r = wrap.getBoundingClientRect(), mid = r.left + r.width / 2, half = r.width * 0.45 || 400
    for (const s of slides) {
      const b = s.getBoundingClientRect()
      const n = Math.min(1, Math.abs(b.left + b.width / 2 - mid) / half)
      s.style.transform = `scale(${0.95 + 0.05 * n})`
    }
  })
}

/* -------------------------------------------- projects: 3D clip reveal */
function projects() {
  $$('.project-card').forEach((card, i) => {
    const mask = document.createElement('div')
    mask.className = 'card-clip'
    card.parentNode.insertBefore(mask, card); mask.appendChild(card)
    gsap.set(mask, { clipPath: 'inset(42.5% 42.5% 42.5% 42.5%)', borderRadius: '36px' })
    gsap.set(card, { scale: 1.45, rotationX: 25, rotationY: i % 2 ? 16 : -16, rotation: i % 2 ? 4 : -4, transformPerspective: 800 })
    gsap.timeline({ scrollTrigger: { trigger: mask, start: 'top 85%', toggleActions: 'play none none reverse', invalidateOnRefresh: true } })
      .to(mask, { clipPath: 'inset(0% 0% 0% 0%)', borderRadius: '0px', duration: 1.25, ease: 'power3.out' }, 0)
      .to(card, { scale: 1, rotationX: 0, rotationY: 0, rotation: 0, duration: 1.25, ease: 'power3.out' }, 0)
  })
  const end = $('.pe-inner')
  const lines = splitLines($('.pe-para', end))
  gsap.set(lines, { y: '115%', opacity: 0 })
  const pills = $$('.pe-pill', end), btn = $('.pe-btn', end)
  prepPills(pills)
  gsap.set(btn, { opacity: 0, scale: 0.4, y: 20 })
  const tl = gsap.timeline({ paused: true }).timeScale(0.75)
  tl.to(lines, { y: '0%', opacity: 1, duration: 0.85, stagger: 0.12, ease: 'back.out(1.4)' }, 0)
  const total = lines.length * 0.12 + 0.5
  popPills(tl, pills, 0.2, total)
  tl.to(btn, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(2.5)' }, total + 0.15)
  ScrollTrigger.create({ trigger: end, start: 'top 80%', once: true, onEnter: () => tl.play() })
}

/* ---------------------------- card hover: dual paintbrush stroke reveal */
function cardHover() {
  const D = $('.card-brush path').getAttribute('d')
  $$('.project-card').forEach((card, i) => {
    const wrap = $('.card-img', card)
    const fg = $('.card-brush path', wrap)
    const hover = $('.card-hover', wrap)
    let maskPath = null
    if (hover.tagName === 'IMG') {
      const ns = 'http://www.w3.org/2000/svg'
      const svg = document.createElementNS(ns, 'svg')
      svg.setAttribute('class', 'card-mask'); svg.setAttribute('viewBox', '0 0 709 1012'); svg.setAttribute('preserveAspectRatio', 'xMidYMid slice')
      svg.innerHTML = `<defs><mask id="cm${i}" maskUnits="userSpaceOnUse" x="-200" y="-200" width="1109" height="1412"><path d="${D}" stroke="#fff" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" fill="none"/></mask></defs>
        <image href="${hover.getAttribute('src')}" x="0" y="0" width="709" height="1012" preserveAspectRatio="xMidYMin slice" mask="url(#cm${i})"/>`
      wrap.appendChild(svg)
      maskPath = $('mask path', svg)
      gsap.set(maskPath, { drawSVG: '100% 100%', strokeWidth: 0 })
    } else {
      gsap.set(hover, { display: 'flex', position: 'absolute', inset: 0, zIndex: 3, opacity: 0, scale: 0.9 })
    }
    gsap.set(fg, { drawSVG: '100% 100%', strokeWidth: 0 })
    const arrowEl = $('.card-arrow svg', card)
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power1.inOut' } })
      .to(fg, { drawSVG: '0% 100%', strokeWidth: 1200, duration: 0.95 }, 0)
    if (maskPath) tl.to(maskPath, { drawSVG: '0% 100%', strokeWidth: 1200, duration: 1.05 }, 0.35)
    else tl.to(hover, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }, 0.55)
    tl.to(arrowEl, { rotation: -45, duration: 0.28, ease: 'power2.out' }, 0).to(arrowEl, { rotation: 0, duration: 0.65, ease: 'elastic.out(1.15, 0.35)' }, 0.28)
    card.addEventListener('mouseenter', () => tl.timeScale(1).play())
    card.addEventListener('mouseleave', () => tl.timeScale(1.3).reverse())
  })
}

/* ---------------------- services: path draw + icon expansion on scrub */
function services() {
  const body = $('.services-body')
  const blocks = $$('.svc-block', body)
  const light = $('.svc-path.light'), dark = $('.svc-path.dark')
  const lightP = $('path', light), darkP = $('path', dark)
  const icons = blocks.map((b) => $('.svc-icon', b))
  const paras = blocks.map((b) => $('.svc-para-wrap', b))

  const buildPath = () => {
    gsap.set(icons, { clearProps: 'width,scale,opacity' })
    const br = body.getBoundingClientRect()
    const pts = [[br.width / 2, 0]]
    blocks.forEach((b, i) => {
      const r = $('.svc-icon', b).getBoundingClientRect()
      pts.push([r.left - br.left + r.width / 2 + (i % 2 ? 60 : -60), r.top - br.top + r.height / 2])
    })
    pts.push([br.width / 2, br.height])
    let d = `M${pts[0][0]} ${pts[0][1]}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2
      const c1 = [p1[0] + (p2[0] - p0[0]) / 4, p1[1] + (p2[1] - p0[1]) / 4]
      const c2 = [p2[0] - (p3[0] - p1[0]) / 4, p2[1] - (p3[1] - p1[1]) / 4]
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
    }
    ;[light, dark].forEach((s) => s.setAttribute('viewBox', `0 0 ${br.width} ${br.height}`))
    lightP.setAttribute('d', d); darkP.setAttribute('d', d)
    icons.forEach((ic) => { ic.dataset.w = ic.getBoundingClientRect().width })
    gsap.set(icons, { width: 0, scale: 0, opacity: 0 })
  }
  buildPath()
  gsap.set(paras, { scale: 0, opacity: 0 })
  gsap.set(darkP, { drawSVG: '0%' })

  const tl = gsap.timeline({ scrollTrigger: { trigger: body, start: 'top 70%', end: 'bottom 70%', scrub: 1.2, invalidateOnRefresh: true } })
  tl.to(darkP, { drawSVG: '100%', ease: 'none', duration: 1 }, 0)
  blocks.forEach((b, i) => {
    const t = Math.max(0, i / (blocks.length - 1) - 0.04)
    tl.to(icons[i], { width: () => +icons[i].dataset.w, scale: 1, opacity: 1, duration: 0.1, ease: 'back.out(3.5)' }, t)
    tl.to(paras[i], { scale: 1, rotation: -5, opacity: 1, duration: 0.1, ease: 'back.out(3.5)' }, t + 0.02)
  })
  ScrollTrigger.addEventListener('refreshInit', () => { const p = tl.progress(); buildPath(); tl.invalidate().progress(p) })
}

/* ---------------------------- offers: rotating card stack + arrow cursor */
function offersStack() {
  const bg = $('.offers-bg')
  const cards = $$('.offer-item', bg)
  const n = cards.length
  const angles = [-7.5, 6.8, -5.5, 8.2, -8.5, 6.2, -7, 7.8].slice(0, n)
  let cur = 0, busy = false
  const reorder = (animate) => cards.forEach((c, i) => {
    c.style.zIndex = n - ((i - cur + n) % n)
    const v = { rotation: i === cur ? 0 : angles[i], yPercent: 0 }
    animate && i !== cur ? gsap.to(c, { ...v, duration: 0.35, ease: 'power2.out' }) : gsap.set(c, v)
  })
  reorder(false)

  const bar = $('.side-bar', bg)
  const ticks = cards.map(() => { const t = document.createElement('div'); t.style.cssText = 'height:2px;border-radius:2px;background:#fff;'; bar.appendChild(t); return t })
  const updateBar = (a, anim = true) => ticks.forEach((t, i) => gsap[anim ? 'to' : 'set'](t, { width: i === a ? 34 : 14, opacity: i === a ? 1 : 0.35, duration: 0.35 }))
  updateBar(0, false)

  const next = () => {
    if (busy) return; busy = true
    const out = cards[cur], ni = (cur + 1) % n
    gsap.to(cards[ni], { rotation: 0, duration: 0.35, ease: 'power2.out' })
    gsap.to(out, { yPercent: -140, rotation: angles[cur] + (cur % 2 ? -9 : 9), duration: 0.38, ease: 'power2.inOut', onComplete: () => {
      const oi = cur; cur = ni; reorder(true); out.style.zIndex = 1
      gsap.to(out, { yPercent: 0, rotation: angles[oi], duration: 0.38, ease: 'power2.out', onComplete: () => { reorder(true); busy = false } })
    } })
    updateBar(ni)
  }
  const prev = () => {
    if (busy) return; busy = true
    const pi = (cur - 1 + n) % n, inc = cards[pi]
    gsap.to(cards[cur], { rotation: angles[cur], duration: 0.35, ease: 'power2.out' })
    gsap.to(inc, { yPercent: 120, rotation: angles[pi] + (pi % 2 ? -8 : 8), duration: 0.38, ease: 'power2.inOut', onComplete: () => {
      cur = pi; reorder(true); inc.style.zIndex = n + 10
      gsap.to(inc, { yPercent: 0, rotation: 0, duration: 0.38, ease: 'power2.out', onComplete: () => { reorder(true); busy = false } })
    } })
    updateBar(pi)
  }

  bg.addEventListener('click', (e) => {
    if (e.target.closest('a')) return
    const r = bg.getBoundingClientRect()
    e.clientY - r.top < r.height / 2 ? next() : prev()
  })
  let ty = 0
  bg.addEventListener('touchstart', (e) => { ty = e.touches[0].clientY }, { passive: true })
  bg.addEventListener('touchend', (e) => { const d = e.changedTouches[0].clientY - ty; if (Math.abs(d) > 40) d < 0 ? next() : prev() }, { passive: true })

  const arrowEl = $('.nav-arrow', bg)
  if (isTouch()) { arrowEl.style.display = 'none'; bg.style.cursor = 'pointer'; return }
  gsap.set(arrowEl, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 })
  const qx = gsap.quickTo(arrowEl, 'x', { duration: 0.15, ease: 'power2.out' })
  const qy = gsap.quickTo(arrowEl, 'y', { duration: 0.15, ease: 'power2.out' })
  let dirRot = 0
  const pos = (e) => { const r = bg.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top, r.height] }
  bg.addEventListener('mouseenter', (e) => {
    const [x, y, h] = pos(e); gsap.set(arrowEl, { x, y, rotation: (dirRot = y < h / 2 ? 0 : 180) })
    gsap.to(arrowEl, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' })
  })
  bg.addEventListener('mousemove', (e) => {
    const [x, y, h] = pos(e); qx(x); qy(y)
    const overLink = !!e.target.closest('a')
    gsap.to(arrowEl, { scale: overLink ? 0 : 1, duration: 0.2, overwrite: 'auto' })
    const want = y < h / 2 ? 0 : 180
    if (want !== dirRot) { dirRot = want; gsap.to(arrowEl, { rotation: want, duration: 0.25, ease: 'power2.out' }) }
  })
  bg.addEventListener('mouseleave', () => gsap.to(arrowEl, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in' }))
}

/* -------------------------------------------------------- faq bubbles */
function faq() {
  const items = $$('.faq-item')
  const openW = () => (innerWidth < 768 ? '88%' : '62%')
  let active = null
  const parts = (it) => ({ q: $('.q-block', it), a: $('.a-wrap', it), logo: $('.faq-logo', it), txt: $('.faq-a', it) })
  const setOpen = (it, open) => {
    const { q, a, logo, txt } = parts(it)
    gsap.set(q, { width: open ? openW() : '100%', borderWidth: open ? 1 : 0 })
    gsap.set(a, { display: open ? 'flex' : 'none', height: open ? 'auto' : 0, scale: open ? 1 : 0 })
    gsap.set(logo, { scale: open ? 1 : 0 }); gsap.set(txt, { opacity: open ? 1 : 0, y: open ? 0 : 20 })
  }
  const open = (it) => {
    const { q, a, logo, txt } = parts(it)
    gsap.timeline({ defaults: { ease: 'power2.out' } })
      .to(q, { width: openW(), borderWidth: 1, duration: 0.45 }, 0)
      .set(a, { display: 'flex', overflow: 'hidden' }, 0)
      .fromTo(a, { height: 0, scale: 0 }, { height: 'auto', scale: 1, duration: 0.5, ease: 'back.out(1.6)', onComplete: () => gsap.set(a, { overflow: 'visible' }) }, 0.05)
      .to(logo, { scale: 1, duration: 0.45, ease: 'back.out(2)' }, 0.15)
      .to(txt, { opacity: 1, y: 0, duration: 0.4 }, 0.35)
      .add(() => ScrollTrigger.refresh(), 0.6)
  }
  const close = (it) => {
    const { q, a, logo, txt } = parts(it)
    gsap.timeline({ defaults: { ease: 'power2.inOut' } })
      .to(txt, { opacity: 0, y: 15, duration: 0.22, ease: 'power2.in' }, 0)
      .to(logo, { scale: 0, duration: 0.25, ease: 'power2.in' }, 0.12)
      .set(a, { overflow: 'hidden' }, 0.15)
      .to(a, { scale: 0, height: 0, duration: 0.4, onComplete: () => gsap.set(a, { display: 'none' }) }, 0.15)
      .to(q, { width: '100%', borderWidth: 0, duration: 0.45, ease: 'power2.out' }, 0.18)
  }
  items.forEach((it, i) => setOpen(it, i === 0))
  active = items[0]
  items.forEach((it) => $('.q-block', it).addEventListener('click', () => {
    if (it === active) { close(it); active = null; return }
    if (active) close(active)
    open(it); active = it
  }))
  addEventListener('resize', () => active && gsap.set($('.q-block', active), { width: openW() }))
}

/* --------------------------------------- footer: stretch + elastic settle */
function footer() {
  const f = $('.footer')
  const lines = splitLines($('.footer-heading', f))
  gsap.set(lines, { y: '115%', opacity: 0 })
  gsap.to(lines, { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.6)', scrollTrigger: { trigger: f, start: 'top 80%' } })
  const btm = $('.footer-btm', f)
  gsap.set(btm, { scaleY: 0.15, transformOrigin: 'bottom center' })
  let bounced = false
  const settle = () => { if (bounced) return; bounced = true; gsap.killTweensOf(btm); gsap.to(btm, { scaleY: 1, duration: 1.4, ease: 'elastic.out(1.2, 0.35)' }) }
  ScrollTrigger.create({
    trigger: f, start: 'top bottom', end: 'bottom bottom', invalidateOnRefresh: true,
    onUpdate: (self) => {
      if (self.progress >= 0.9) return settle()
      bounced = false
      const vel = Math.min(Math.abs(self.getVelocity()) / 1500, 0.25)
      const target = self.direction === 1 ? 0.15 + self.progress * 1.15 + vel : 0.15 + self.progress * 0.95
      gsap.to(btm, { scaleY: Math.max(0.15, Math.min(target, 1.4)), duration: 0.1, ease: 'power1.out', overwrite: 'auto' })
    },
    onLeave: settle,
    onLeaveBack: () => { bounced = false; gsap.killTweensOf(btm); gsap.to(btm, { scaleY: 0.15, duration: 0.25 }) },
  })
}

/* ------------------------------------------ char wobble on link hover */
function charWobble(sel) {
  $$(sel).forEach((link) => {
    const chars = new SplitText(link, { type: 'chars', charsClass: 'footer-link-char' }).chars
    link.addEventListener('mouseenter', () => chars.forEach((c, i) =>
      gsap.to(c, { scale: 1.14, rotation: gsap.utils.random(-7, 7), textShadow: OUTLINE('currentColor'), duration: 0.38, delay: i * 0.035, ease: 'back.out(1.8)', overwrite: 'auto',
        onComplete: () => gsap.to(c, { scale: 1, rotation: 0, textShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.5, ease: 'power2.out' }) })))
    link.addEventListener('mouseleave', () => gsap.to(chars, { scale: 1, rotation: 0, textShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.35, stagger: 0.018, ease: 'power2.out', overwrite: 'auto' }))
  })
}

/* ---------------------------------------- nav buttons: brush fill hover */
function navButtons() {
  $$('.nav-btn').forEach((btn) => {
    const p = $('.nav-fill path', btn)
    gsap.set(p, { drawSVG: '0%', strokeWidth: 0 })
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power1.inOut' } }).to(p, { drawSVG: '100%', strokeWidth: 36, duration: 0.5 })
    btn.addEventListener('mouseenter', () => tl.timeScale(1).play())
    btn.addEventListener('mouseleave', () => tl.timeScale(1.4).reverse())
  })
}

/* ------------------------------- cta: magnetic pull, fill, wiggling arrow */
function ctaButtons() {
  $$('.cta-btn').forEach((btn) => {
    const txt = $('.cta-text', btn), arr = $('.cta-arrow', btn), fill = $('.cta-fill', btn)
    let loop
    btn.addEventListener('mouseenter', () => {
      gsap.to(fill, { scale: 10, duration: 0.55, ease: 'power2.out', overwrite: 'auto' })
      loop?.kill()
      loop = gsap.timeline({ repeat: -1, repeatDelay: 0.2 }).to(arr, { rotation: -25, duration: 0.22, ease: 'power2.out' }).to(arr, { rotation: 0, duration: 0.4, ease: 'back.out(2.5)' })
    })
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect()
      const cx = r.left - (gsap.getProperty(btn, 'x') || 0) + r.width / 2, cy = r.top - (gsap.getProperty(btn, 'y') || 0) + r.height / 2
      const dx = e.clientX - cx, dy = e.clientY - cy
      gsap.to(btn, { x: dx * 0.35, y: dy * 0.35, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
      gsap.to([txt, arr], { x: dx * 0.15, y: dy * 0.15, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    })
    btn.addEventListener('mouseleave', () => {
      loop?.kill(); loop = null
      gsap.to(arr, { rotation: 0, duration: 0.35 })
      gsap.to([btn, txt, arr], { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1.1, 0.4)', overwrite: 'auto' })
      gsap.to(fill, { scale: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
    })
  })
}

/* ----------------------------------------------------- contact overlay */
function contactModal() {
  const page = $('.contact-page')
  const strokes = $$('.contact-strokes path', page)
  const logo = $('.contact-logo', page), closeBtn = $('.close-btn', page), closeTxt = $('.close-text', page)
  const headChars = new SplitText($('.contact-heading', page), { type: 'chars,words', charsClass: 'contact-heading-char' }).chars
  const paraLines = splitLines($('.contact-para', page))
  const headWords = $$('.email-heading', page).flatMap((h) => new SplitText(h, { type: 'words', mask: 'words' }).words)
  const links = $$('.email-link', page), socials = $$('.contact-social', page), img = $('.contact-img', page)
  let isOpen = false, openTl

  const reset = () => {
    openTl?.kill()
    gsap.set(['.contact-content', '.contact-nav'], { opacity: 1, y: 0 })
    gsap.set(logo, { scale: 0, opacity: 0 })
    gsap.set(closeBtn, { opacity: 0, scale: 0.4, y: 20 }); gsap.set(closeTxt, { opacity: 0, y: 15, display: 'inline-block' })
    strokes.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L, strokeWidth: 0 }) })
    gsap.set(headChars, { opacity: 0, scale: 0.4, y: 30 })
    gsap.set(paraLines, { y: '115%', opacity: 0 })
    gsap.set(headWords, { y: '110%', opacity: 0 })
    gsap.set(links, { y: 30, opacity: 0 })
    gsap.set(socials, { opacity: 0, scale: 0.4, y: 20 })
    gsap.set(img, { opacity: 0, scale: 0.8, rotation: gsap.utils.random(-3, 3) })
  }
  reset()

  const open = () => {
    if (isOpen) return; isOpen = true
    reset(); page.classList.add('is-active'); page.setAttribute('aria-hidden', 'false'); lenis.stop()
    openTl = gsap.timeline()
    strokes.forEach((p, i) => openTl.to(p, { strokeDashoffset: 0, strokeWidth: 1600, duration: 0.9, ease: 'power2.inOut' }, i * 0.1))
    const s = 0.45
    openTl.to(logo, { scale: 1, opacity: 1, duration: 0.65, ease: 'back.out(2.2)' }, s)
      .to(closeBtn, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(2.5)' }, s + 0.1)
      .to(closeTxt, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' }, s + 0.22)
    headChars.forEach((c, i) => {
      const t = s + 0.15 + i * 0.022
      openTl.to(c, { opacity: 1, scale: 1.1, y: 0, rotation: gsap.utils.random(-6, 6), textShadow: OUTLINE('currentColor'), duration: 0.45, ease: 'back.out(2)' }, t)
        .to(c, { scale: 1, rotation: 0, textShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.6, ease: 'power2.out' }, t + 0.45)
    })
    openTl.to(paraLines, { y: '0%', opacity: 1, duration: 0.85, stagger: 0.1, ease: 'back.out(1.4)' }, s + 0.3)
      .to(headWords, { y: '0%', opacity: 1, duration: 0.7, stagger: 0.06, ease: 'back.out(1.5)' }, s + 0.25)
      .to(links, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(1.5)' }, s + 0.35)
      .to(socials, { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(2.5)' }, s + 0.45)
      .to(img, { opacity: 1, scale: 1, rotation: 0, duration: 0.75, ease: 'back.out(1.8)' }, s + 0.4)
  }
  const close = () => {
    if (!isOpen) return
    openTl?.kill()
    gsap.timeline({ onComplete: () => { page.classList.remove('is-active'); page.setAttribute('aria-hidden', 'true'); isOpen = false; lenis.start(); reset() } })
      .to([closeBtn, '.contact-content', socials], { opacity: 0, y: -15, duration: 0.3, ease: 'power2.in' }, 0)
      .to([logo, img], { opacity: 0, scale: 0.85, duration: 0.3, ease: 'power2.in' }, 0)
      .to(strokes, { strokeDashoffset: (i, p) => p.getTotalLength(), strokeWidth: 0, duration: 0.45, ease: 'power2.in' }, 0.1)
  }
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-contact-trigger]')) { e.preventDefault(); open() }
    else if (e.target.closest('.close-btn') || (e.target.closest('.contact-logo') && isOpen)) { e.preventDefault(); close() }
  })
  addEventListener('keydown', (e) => e.key === 'Escape' && close())
}

/* ================================================================ about page */
function aboutHero() {
  const lines = $$('.ah-heading').flatMap(splitLines)
  gsap.set(lines, { y: '115%', opacity: 0 })
  const pills = $$('.ah-pill'); prepPills(pills)
  const p = $('.ah-swirl path'); gsap.set(p, { drawSVG: '0%', strokeWidth: 0 })
  const paraLines = splitLines($('.ah-para')); gsap.set(paraLines, { y: '115%', opacity: 0 })
  gsap.set('.ah-art', { opacity: 0, y: 40 })
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } }).timeScale(0.75)
  tl.to(lines, { y: '0%', opacity: 1, duration: 0.85, stagger: 0.12, ease: 'back.out(1.4)' }, 0)
  const total = lines.length * 0.12 + 0.5
  popPills(tl, pills, 0.2, total)
  tl.to(p, { drawSVG: '100%', duration: 0.9 }, total * 0.4).to(p, { strokeWidth: 30, duration: 0.9 }, total * 0.4)
  tl.to('.ah-art', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.2)
  tl.to(paraLines, { y: '0%', opacity: 1, duration: 0.85, stagger: 0.1, ease: 'back.out(1.4)' }, 0.4)
  onReveal(() => tl.play())
}

// One stroke draws through the story in three stages, then floods into the orange team panel.
function story() {
  const container = $('.story-team'), wrap = $('.story-team-wrap'), path = $('.story-path path')
  const mobile = innerWidth < 768
  const base = innerWidth < 768 ? 50 : innerWidth < 992 ? 75 : 100
  gsap.set(path, { drawSVG: '0% 0.1%', strokeWidth: base, opacity: 0 })
  const st = () => ({ trigger: container, start: 'top 80%', end: 'bottom bottom', scrub: 0.8, onUpdate: (s) => gsap.set(path, { opacity: s.progress > 0.002 ? 1 : 0 }) })
  const keys = mobile
    ? [{ drawSVG: '0% 55%', duration: 0.05, ease: 'power1.out' }, { drawSVG: '0% 90%', duration: 0.07, ease: 'power1.inOut' }, { drawSVG: '0% 100%', duration: 0.03, ease: 'power1.out' }]
    : [{ drawSVG: '0% 25%', duration: 0.08, ease: 'power1.out' }, { drawSVG: '0% 88%', duration: 0.12, ease: 'power2.in' }, { drawSVG: '0% 100%', duration: 0.05, ease: 'power1.out' }]
  gsap.timeline({ scrollTrigger: st() }).to(path, { keyframes: keys }, 0).to({}, { duration: mobile ? 0.17 : 0.07 }, mobile ? 0.15 : 0.25)
  const fs = mobile ? 0.1 : 0.2, fd = mobile ? 0.03 : 0.05, bd = mobile ? 0.06 : 0.1
  gsap.timeline({ scrollTrigger: st() })
    .to(path, { strokeWidth: 2500, duration: fd, ease: 'power2.inOut' }, fs)
    .fromTo(wrap, { backgroundColor: 'rgba(255,84,0,0)' }, { backgroundColor: 'rgba(255,84,0,1)', duration: bd, ease: 'power2.inOut' }, fs)
    .to({}, { duration: 0.32 - (fs + bd) }, fs + bd)

  $$('.story-section').forEach((sec, i) => {
    const art = $('.story-art', sec), label = $('.story-label', sec)
    const h = splitLines($('.story-heading', sec)), p = splitLines($('.story-para', sec))
    gsap.set(art, { opacity: 0, scale: 0.65, rotation: i % 2 ? 6 : -6 })
    gsap.set(label, { opacity: 0, y: 20 })
    gsap.set([...h, ...p], { y: '115%', opacity: 0 })
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 75%' } })
      .to(art, { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.8)' }, 0)
      .to(label, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.1)
      .to(h, { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)' }, 0.15)
      .to(p, { y: '0%', opacity: 1, duration: 0.8, stagger: 0.06, ease: 'back.out(1.4)' }, 0.3)
  })
  gsap.from('.team-card', { y: 60, opacity: 0, rotation: (i) => [-4, 3, -2][i % 3], duration: 0.9, stagger: 0.12, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.team-btm', start: 'top 85%' } })
  addEventListener('load', () => ScrollTrigger.refresh())
}

// A team card expands into a popup with bio + socials.
function teamPopup() {
  const team = window.__team || []
  const overlay = $('.team-popup'), card = $('.tp-card', overlay)
  const imgEl = $('.tp-img', overlay), nameEl = $('.tp-name', overlay), roleEl = $('.tp-role', overlay)
  const bioEl = $('.tp-bio', overlay), socialsEl = $('.tp-socials', overlay), closeBtn = $('.tp-close', overlay)
  let isOpen = false, tl
  const open = (src, m) => {
    if (isOpen) return
    isOpen = true; tl?.kill()
    imgEl.innerHTML = src.querySelector('.team-img').innerHTML
    nameEl.textContent = m.name; roleEl.textContent = m.role
    bioEl.innerHTML = m.bio.map((b) => `<p>${b}</p>`).join('')
    socialsEl.innerHTML = m.socials.map((x) => `<a class="team-popup-pill" href="${x.url}" target="_blank" rel="noreferrer">${x.name}</a>`).join('')
    socialsEl.style.display = m.socials.length ? 'flex' : 'none'
    overlay.classList.add('is-active'); lenis.stop()
    const s = src.getBoundingClientRect(), c = card.getBoundingClientRect()
    tl = gsap.timeline()
      .fromTo(card,
        { x: s.left + s.width / 2 - (c.left + c.width / 2), y: s.top + s.height / 2 - (c.top + c.height / 2), scaleX: Math.max(s.width / c.width, 0.25), scaleY: Math.max(s.height / c.height, 0.25), opacity: 0.6, borderRadius: '16px' },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, borderRadius: '1.5em', duration: 0.65, ease: 'back.out(1.4)' }, 0)
      .fromTo([nameEl, roleEl, ...bioEl.children, ...socialsEl.children], { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' }, 0.18)
      .fromTo(closeBtn, { scale: 0, opacity: 0, rotation: -90 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: 'back.out(2.5)' }, 0.3)
  }
  const close = () => {
    if (!isOpen) return
    tl?.kill()
    tl = gsap.timeline({ onComplete: () => { overlay.classList.remove('is-active'); isOpen = false; lenis.start(); gsap.set(card, { clearProps: 'all' }) } })
      .to(card, { scale: 0.88, opacity: 0, duration: 0.28, ease: 'power2.inOut' })
  }
  $$('.team-card').forEach((c) => c.addEventListener('click', () => open(c, team[+c.dataset.i])))
  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close() })
  overlay.addEventListener('click', (e) => e.target === overlay && close())
  addEventListener('keydown', (e) => e.key === 'Escape' && close())
}
