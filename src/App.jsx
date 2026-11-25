import { useEffect, useRef, useState } from 'react'
import { brand, contact, waLink, mailLink, marquee, manifesto, projects, services, offers, process, faqs } from './data/site'
import { Bot, Squiggle } from './Art'

// Adds .in to elements with [data-reveal] once they scroll into view.
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
      { threshold: 0.15 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// 0 → 1 as the element travels through the viewport.
function useScrollProgress(ref) {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      const vh = window.innerHeight
      setP(Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35))))
    }
    const on = () => raf || (raf = requestAnimationFrame(tick))
    tick()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => (window.removeEventListener('scroll', on), window.removeEventListener('resize', on))
  }, [ref])
  return p
}

const Arrow = () => <span className="arrow" aria-hidden="true">→</span>

function ContactLinks({ big }) {
  return (
    <div className={big ? 'contact-links big' : 'contact-links'}>
      <a className="pill green" href={waLink()} target="_blank" rel="noreferrer">WhatsApp <Arrow /></a>
      <a className="pill" href={mailLink()}>Email <Arrow /></a>
      {contact.linkedin && <a className="pill blue" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>}
    </div>
  )
}

function Header({ onTalk }) {
  return (
    <header className="header">
      <nav className="nav-left">
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#offers">Offers</a>
      </nav>
      <a href="#top" className="logo">{brand.name}</a>
      <div className="nav-right">
        <span className="hours">{brand.hours}</span>
        <button className="btn-dark" onClick={onTalk}>Let's talk <span className="dot" /></button>
      </div>
    </header>
  )
}

function ContactOverlay({ open, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <div className={`overlay${open ? ' open' : ''}`} aria-hidden={!open}>
      <button className="close" onClick={onClose}>Close ✕</button>
      <div className="overlay-inner">
        <h2 className="display stack">
          <span>got an</span><span>idea?</span><span>let's</span><span>build it.</span>
        </h2>
        <div>
          <p className="overlay-lead">Pick whatever's easiest. We reply within a few hours.</p>
          <ContactLinks big />
          <p className="overlay-mail">{contact.email}</p>
        </div>
      </div>
    </div>
  )
}

function Hero({ onTalk }) {
  return (
    <section className="hero" id="top">
      <h1 className="display hero-title">
        <span className="line">We put AI <span className="sticker s1">AI studio</span></span>
        <span className="line">in everything<span className="sticker s2">no fluff</span></span>
      </h1>
      <div className="hero-row">
        <p className="hero-sub">
          Automations, AI agents, SaaS products and websites, <b>built end to end</b> by a small team that ships fast.
        </p>
        <Bot />
        <div className="hero-cta">
          <button className="btn-red" onClick={onTalk}>Start a project <Arrow /></button>
          <a className="link-under" href="#offers">See offers</a>
        </div>
      </div>
      <Squiggle className="hero-squiggle" />
    </section>
  )
}

function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-label={marquee.join(', ')}>
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <span key={k} aria-hidden="true">
            {row.map((t, i) => <span key={i}>{t} <i>✺</i> </span>)}
          </span>
        ))}
      </div>
    </div>
  )
}

function Manifesto() {
  const ref = useRef(null)
  const p = useScrollProgress(ref)
  const words = manifesto.split(' ')
  const lit = Math.round(p * words.length * 1.15)
  return (
    <section className="manifesto" id="about" ref={ref}>
      <p className="eyebrow">A bit about us</p>
      <p className="manifesto-text">
        {words.map((w, i) => <span key={i} className={i < lit ? 'lit' : ''}>{w} </span>)}
      </p>
      <div className="tags" data-reveal>
        <span className="sticker">Obsessed with shipping</span>
        <span className="sticker dark">AI-first, always</span>
        <span className="sticker">Allergic to templates</span>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="work" id="work">
      <div className="section-head">
        <p className="eyebrow">Featured projects</p>
        <h2 className="display">Selected<br />works</h2>
      </div>
      <div className="work-grid">
        {projects.map((p, i) => (
          <a key={p.id} href={p.link} target="_blank" rel="noreferrer" className="card" data-reveal style={{ '--d': `${i * 90}ms`, '--c': p.color }}>
            <div className="card-media">
              <img src={p.cover} alt={`${p.title} screenshot`} loading="lazy" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <span className="card-fallback display">{p.title}</span>
              {p.stat && <span className="sticker card-stat">{p.stat}</span>}
              <span className="card-visit">Visit site <Arrow /></span>
            </div>
            <div className="card-meta">
              <span>{p.tags.join(' • ')}</span>
              <span>{p.year}</span>
            </div>
            <h3 className="display card-title">{p.title}</h3>
            <p className="card-desc">{p.description}</p>
          </a>
        ))}
        <div className="card card-more" data-reveal>
          <h3 className="display">Yours<br />next?</h3>
          <p>More projects are on the way. Yours could be one of them.</p>
          <ContactLinks />
        </div>
      </div>
    </section>
  )
}

function Services() {
  const ref = useRef(null)
  const p = useScrollProgress(ref)
  return (
    <section className="services" id="services" ref={ref}>
      <div className="section-head center">
        <p className="eyebrow">Our services</p>
        <h2 className="display">This is<br />what we build</h2>
      </div>
      <div className="services-body">
        <svg className="services-path" viewBox="0 0 100 600" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M50 0 C 95 50, 95 100, 50 100 S 5 150, 50 200 S 95 250, 50 300 S 5 350, 50 400 S 95 450, 50 500 S 5 550, 50 600"
            pathLength="1"
            style={{ strokeDashoffset: 1 - p * 1.1 }}
          />
        </svg>
      <ol className="services-list">
        {services.map((s, i) => (
          <li key={s.title} className={i % 2 ? 'right' : 'left'} data-reveal>
            <span className="svc-num">0{i + 1}</span>
            <h3 className="display">{s.title}</h3>
            <p>{s.line}</p>
            <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </li>
        ))}
      </ol>
      </div>
    </section>
  )
}

function Offers() {
  return (
    <section className="offers" id="offers">
      <div className="section-head">
        <p className="eyebrow light">Offers</p>
        <h2 className="display">Pick a<br />starting point</h2>
        <p className="section-note">Every project is quoted on scope. These are where most clients start.</p>
      </div>
      <div className="offer-grid">
        {offers.map((o, i) => (
          <div key={o.name} className={`offer${o.featured ? ' featured' : ''}`} data-reveal style={{ '--d': `${i * 80}ms` }}>
            {o.featured && <span className="sticker offer-flag">Most asked</span>}
            <h3 className="display">{o.name}</h3>
            <p className="offer-for">{o.for}</p>
            <p className="offer-price">{o.price ?? 'Custom quote'}</p>
            <p className="offer-time">{o.timeline}</p>
            <ul>{o.includes.map((x) => <li key={x}>{x}</li>)}</ul>
            <a className="btn-dark full" href={waLink(`Hi! I'm interested in the ${o.name} offer.`)} target="_blank" rel="noreferrer">
              Ask on WhatsApp <Arrow />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="process" id="process">
      <div className="section-head">
        <p className="eyebrow">How it works</p>
        <h2 className="display">Idea to live<br />in four steps</h2>
      </div>
      <div className="steps">
        {process.map((s, i) => (
          <div key={s.step} className="step" data-reveal style={{ '--d': `${i * 90}ms` }}>
            <span className="step-num display">{i + 1}</span>
            <h3>{s.step}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq" id="faq">
      <div className="section-head">
        <p className="eyebrow">Frequently asked</p>
        <h2 className="display">Things you<br />might ask</h2>
      </div>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <div key={f.q} className={`faq-item${open === i ? ' open' : ''}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{f.q}</span><span className="plus">+</span>
            </button>
            <div className="faq-a"><p>{f.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer({ onTalk }) {
  return (
    <footer className="footer" id="contact">
      <div className="footer-top">
        <div>
          <h2 className="display footer-title">Okay, that's<br />enough<br />scrolling</h2>
          <button className="btn-cream" onClick={onTalk}>Let's talk <Arrow /></button>
        </div>
        <div className="footer-cols">
          <div>
            <p className="eyebrow light">Reach us</p>
            <a href={waLink()} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={mailLink()}>{contact.email}</a>
            {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          </div>
          <div>
            <p className="eyebrow light">Menu</p>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#offers">Offers</a>
          </div>
          <div>
            <p className="eyebrow light">Based in</p>
            <span>{brand.location}</span>
            <span>{brand.hours}</span>
          </div>
        </div>
      </div>
      <div className="footer-mark display" aria-hidden="true">{brand.name}</div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {brand.name}</span>
        <span>Built by humans, powered by AI</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [talk, setTalk] = useState(false)
  const openTalk = () => setTalk(true)
  useReveal()
  // Shared links like /#offers land on their section.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" })
  }, [])
  return (
    <>
      <Header onTalk={openTalk} />
      <main>
        <Hero onTalk={openTalk} />
        <Marquee />
        <Manifesto />
        <Work />
        <Services />
        <Offers />
        <Process />
        <Faq />
      </main>
      <Footer onTalk={openTalk} />
      <ContactOverlay open={talk} onClose={() => setTalk(false)} />
      <a className="wa-float" href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" /></svg>
      </a>
    </>
  )
}
