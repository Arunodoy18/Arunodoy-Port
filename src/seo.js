// SEO / AEO / GEO: head tags, schema.org JSON-LD, robots.txt, sitemap.xml and llms.txt.
// Everything is generated at build time from src/data/site.js (see vite.config.js).
import { brand, contact, hero, about, services, offers, projects, faqs, team, aboutPage } from './data/site.js'
import { posts } from './data/posts.js'

// Change this when the site moves to its own domain.
export const SITE_URL = (process.env.SITE_URL || 'https://c3studio.buildc3.tech').replace(/\/$/, '')

// Search Console / Bing verification tokens (public by design; Google reads them from each page).
// The Google token can be overridden with the GOOGLE_SITE_VERIFICATION env var.
const GSC_TOKEN = process.env.GOOGLE_SITE_VERIFICATION || 'S2mFQRe62roIki_4vRx8SpJuTx_CoiLfkQ5CtYJRteQ'
const BING_TOKEN = process.env.BING_SITE_VERIFICATION || ''

const NAME = 'C3 Studio'
const OG_IMAGE = `${SITE_URL}/og.png`
const PHONE = '+' + contact.whatsapp
const SUMMARY =
  'C3 Studio is an AI and automation studio in Sikkim, India, working with clients worldwide. We build WhatsApp, LinkedIn and AI call automations, AI agents, SaaS products, websites and management systems, end to end.'

export const pages = {
  home: {
    path: '/',
    title: 'C3 Studio | AI Automation, Bots & SaaS Development',
    description:
      'C3 Studio builds WhatsApp, LinkedIn and AI call automations, AI agents, SaaS products and websites. Based in Sikkim, India, working with clients worldwide.',
  },
  about: {
    path: '/about',
    title: 'About C3 Studio | Small studio, big AI energy',
    description:
      'Meet C3 Studio, the AI and automation studio founded by Arunodoy Banerjee (CTO) and Om Gupta (CEO): a small, hands-on team building AI products and SaaS.',
  },
  contact: {
    path: '/contact',
    title: 'Contact C3 Studio | WhatsApp, Email & LinkedIn',
    description: 'Start a project with C3 Studio. WhatsApp +91 88120 78591 or email us for AI automation, AI agents, SaaS and websites. We reply within a few hours.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy | C3 Studio',
    description: 'How C3 Studio handles your information: no cookies, no tracking, and contact details used only to reply and work with you.',
  },
  terms: {
    path: '/terms',
    title: 'Terms of Use | C3 Studio',
    description: 'The terms for using the C3 Studio website. Client projects are covered by a separate written proposal or agreement.',
  },
  404: {
    path: '/404',
    title: 'Page not found | C3 Studio',
    description: 'This page does not exist. Head back to C3 Studio for AI automation, AI agents, SaaS and websites.',
    noindex: true,
  },
}

pages.blog = {
  path: '/blog',
  title: 'Blog | C3 Studio: AI, Automation & SaaS Guides',
  description: 'Practical guides on WhatsApp bots, AI agents, SaaS and custom software from the C3 Studio team.',
}
for (const p of posts)
  pages[`post:${p.slug}`] = { path: `/blog/${p.slug}`, title: p.seoTitle || p.title, description: p.description, post: p }

const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const people = team.filter((m) => m.photo)

const orgId = `${SITE_URL}/#org`
const personNode = (m) => ({
  '@type': 'Person',
  '@id': `${SITE_URL}/about#${m.name.toLowerCase().replace(/\W+/g, '-')}`,
  name: m.name,
  jobTitle: m.role,
  image: `${SITE_URL}${m.photo}`,
  worksFor: { '@id': orgId },
  description: m.bio.join(' '),
  ...(m.socials.length ? { sameAs: m.socials.map((s) => s.url) } : {}),
})

const organization = {
  '@type': 'ProfessionalService',
  '@id': orgId,
  name: NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  image: OG_IMAGE,
  description: SUMMARY,
  slogan: hero.heading,
  email: contact.email,
  telephone: PHONE,
  address: { '@type': 'PostalAddress', addressRegion: 'Sikkim', addressCountry: 'IN' },
  areaServed: 'Worldwide',
  openingHours: 'Mo-Sa 10:00-20:00',
  founder: people.map((m) => ({ '@id': personNode(m)['@id'] })),
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'sales', email: contact.email, telephone: PHONE, availableLanguage: ['English', 'Hindi'] },
  ],
  knowsAbout: ['AI automation', 'WhatsApp chatbots', 'LinkedIn automation', 'AI voice agents', 'AI agents', 'RAG', 'SaaS development', 'Web design', 'CRM development', 'Full-stack development'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: `${s.a} ${s.b}`, description: s.para, provider: { '@id': orgId } },
    })),
  },
  makesOffer: offers.map((o) => ({
    '@type': 'Offer',
    name: `${o.name}: ${o.for}`,
    description: `${o.includes.join('. ')}. Timeline: ${o.timeline}.`,
    ...(o.price ? { price: o.price } : {}),
  })),
}

const website = { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: NAME, inLanguage: 'en', publisher: { '@id': orgId } }

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const work = {
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#work`,
  name: 'Selected work by C3 Studio',
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: { '@type': 'CreativeWork', name: p.title, description: p.description, genre: p.category, creator: { '@id': orgId }, ...(p.link ? { url: p.link } : {}) },
  })),
}

export function jsonLd(page) {
  if (page === 'blog') {
    const blog = { '@type': 'Blog', '@id': `${SITE_URL}/blog#blog`, url: `${SITE_URL}/blog`, name: pages.blog.title, publisher: { '@id': orgId },
      blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.date })) }
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': [organization, website, blog] }).replace(/</g, '\\u003c')
  }
  if (page.startsWith('post:')) {
    const p = pages[page].post
    const author = people.find((m) => m.name === p.author)
    const url = `${SITE_URL}/blog/${p.slug}`
    const article = { '@type': 'BlogPosting', '@id': `${url}#article`, mainEntityOfPage: url, url, headline: p.title, description: p.description,
      datePublished: p.date, dateModified: p.modified || p.date, inLanguage: 'en', keywords: p.tags.join(', '), image: OG_IMAGE,
      author: author ? { '@id': personNode(author)['@id'], '@type': 'Person', name: author.name, url: `${SITE_URL}/about` } : { '@type': 'Person', name: p.author },
      publisher: { '@id': orgId }, isPartOf: { '@id': `${SITE_URL}/blog#blog` } }
    const crumbs = { '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ['Blog', '/blog'], [p.title, `/blog/${p.slug}`]].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE_URL + path })) }
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': [organization, ...(author ? [personNode(author)] : []), article, crumbs] }).replace(/</g, '\\u003c')
  }
  if (!['home', 'about'].includes(page)) {
    const type = page === 'contact' ? 'ContactPage' : 'WebPage'
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': [organization, website, { '@type': type, '@id': `${SITE_URL}${pages[page].path}#page`, url: `${SITE_URL}${pages[page].path}`, name: pages[page].title, about: { '@id': orgId } }] }).replace(/</g, '\\u003c')
  }
  const graph =
    page === 'about'
      ? [organization, website, ...people.map(personNode), { '@type': 'AboutPage', '@id': `${SITE_URL}/about#page`, url: `${SITE_URL}/about`, name: pages.about.title, about: { '@id': orgId }, mainEntity: { '@id': orgId } }]
      : [organization, website, faqPage, work, { '@type': 'WebPage', '@id': `${SITE_URL}/#page`, url: `${SITE_URL}/`, name: pages.home.title, about: { '@id': orgId } }]
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
}

export function headTags(page) {
  const p = pages[page]
  const url = SITE_URL + p.path
  return [
    `<title>${escAttr(p.title)}</title>`,
    ...(GSC_TOKEN ? [`<meta name="google-site-verification" content="${escAttr(GSC_TOKEN)}" />`] : []),
    ...(BING_TOKEN ? [`<meta name="msvalidate.01" content="${escAttr(BING_TOKEN)}" />`] : []),
    `<meta name="description" content="${escAttr(p.description)}" />`,
    ...(p.noindex
      ? [`<meta name="robots" content="noindex, follow" />`]
      : [
          `<link rel="canonical" href="${url}" />`,
          `<link rel="alternate" hreflang="en" href="${url}" />`,
          `<link rel="alternate" hreflang="x-default" href="${url}" />`,
          `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
        ]),
    `<meta name="author" content="${NAME}" />`,
    `<meta name="geo.region" content="IN-SK" />`,
    `<meta name="geo.placename" content="Sikkim, India" />`,
    ...(p.post
      ? [`<meta property="og:type" content="article" />`, `<meta property="article:published_time" content="${p.post.date}" />`, `<meta property="article:author" content="${escAttr(p.post.author)}" />`]
      : [`<meta property="og:type" content="website" />`]),
    `<meta property="og:site_name" content="${NAME}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escAttr(p.title)}" />`,
    `<meta property="og:description" content="${escAttr(p.description)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="C3 Studio: we put AI in everything" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escAttr(p.title)}" />`,
    `<meta name="twitter:description" content="${escAttr(p.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${jsonLd(page)}</script>`,
  ].join('\n    ')
}

// AI crawlers are explicitly welcome: being quoted by answer engines is the point.
export const robotsTxt = () => `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

export const sitemapXml = () => {
  const today = new Date().toISOString().slice(0, 10)
  const urls = Object.values(pages)
    .filter((p) => !p.noindex)
    .map((p, i) => `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${p.post ? p.post.modified || p.post.date : today}</lastmod><changefreq>monthly</changefreq><priority>${i ? '0.8' : '1.0'}</priority></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

// llms.txt: a plain-language summary for AI answer engines (https://llmstxt.org).
export const llmsTxt = () => `# ${NAME}

> ${SUMMARY}

- Website: ${SITE_URL}
- Email: ${contact.email}
- WhatsApp: ${contact.whatsappLabel}
- LinkedIn: ${contact.linkedin}
- Location: ${brand.location.join(', ')}
- Hours: ${brand.hours.join(', ')}

## About

${about.para}

${aboutPage.story.map((s) => `${s.heading} ${s.para}`).join('\n\n')}

## Team

${team.filter((m) => m.photo).map((m) => `- ${m.name}, ${m.role}: ${m.bio.join(' ')}`).join('\n')}

## Services

${services.map((s) => `- ${s.a} ${s.b}: ${s.para}`).join('\n')}

## Offers

${offers.map((o) => `- ${o.name} (${o.for}; ${o.timeline}; ${o.price ?? 'custom quote'}): ${o.includes.join(', ')}.`).join('\n')}

## Selected work

${projects.map((p) => `- ${p.title} (${p.category})${p.link ? ` ${p.link}` : ''}: ${p.description}`).join('\n')}

## FAQ

${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Blog

${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`).join('\n')}

## Pages

- [Home](${SITE_URL}/): services, work, offers, FAQ
- [About](${SITE_URL}/about): story and team
- [Blog](${SITE_URL}/blog): guides on WhatsApp bots, AI agents, SaaS and CRMs
- [Contact](${SITE_URL}/contact): WhatsApp, email, LinkedIn
- [Privacy policy](${SITE_URL}/privacy)
- [Terms of use](${SITE_URL}/terms)
`
