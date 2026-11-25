// Everything a client reads lives here. Edit this file, not the components.

export const brand = {
  name: 'BUILDC3',
  tagline: 'AI, automation & product studio',
  hours: 'Mon – Sat · 10:00 – 20:00 IST',
  location: 'Sikkim, India · working worldwide',
}

// The three ways clients reach us. Every "Let's talk" button points at these.
export const contact = {
  whatsapp: '919864446805', // international format, digits only
  whatsappText: "Hi! I saw your portfolio and I'd like to build something.",
  email: 'arunodoy630@gmail.com',
  emailSubject: 'New project enquiry',
  linkedin: '', // TODO: paste your LinkedIn URL. The button stays hidden until you do.
}

export const waLink = (text = contact.whatsappText) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`
export const mailLink = (subject = contact.emailSubject) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`

export const marquee = ['WhatsApp bots', 'AI agents', 'SaaS products', 'Call automation', 'LinkedIn outreach', 'Websites that sell', 'Management systems', 'Custom AI models']

export const manifesto =
  "Most businesses don't need more software. They need the boring work to disappear. We build the bots, the agents and the products that do it, and we ship them in weeks, not quarters."

// Project cards. `cover` is a screenshot in /public/work. `stat` is optional.
export const projects = [
  {
    id: 'neurodb',
    title: 'NeuroDB',
    tags: ['Web apps', 'AI/ML'],
    year: '2026',
    stat: null,
    description: 'An AI-powered PostgreSQL tool that lets you query and explore databases using natural language.',
    link: 'https://neurodb.buildc3.tech/',
    cover: '/work/neurodb.jpg',
    color: '#ec4524',
  },
  {
    id: 'dbviz',
    title: 'DB-Viz',
    tags: ['Web apps', 'Dev tools'],
    year: '2026',
    stat: '6k+ users',
    description: 'A database schema visualiser that shows every table structure and how the tables connect.',
    link: 'https://dbviz.buildc3.tech/',
    cover: '/work/dbviz.jpg',
    color: '#1a1a1a',
  },
]

// What we build. `items` are the concrete things a client can buy.
export const services = [
  {
    title: 'AI automations',
    line: 'Bots that do the repetitive work for you, around the clock.',
    items: ['WhatsApp automation & chatbots', 'LinkedIn outreach automation', 'AI call agents (inbound & outbound)', 'Lead capture & follow-up flows'],
  },
  {
    title: 'AI agents & models',
    line: 'AI trained on your business, wired into your tools.',
    items: ['RAG agents on your own documents', 'Custom & fine-tuned models', 'AI inside your existing product', 'Chrome extensions with AI'],
  },
  {
    title: 'SaaS products',
    line: 'From idea to paying users: auth, billing, dashboards, the lot.',
    items: ['MVPs in weeks', 'Course platforms (Udemy-style)', 'Multi-tenant B2B SaaS', 'Subscriptions & payments'],
  },
  {
    title: 'Websites',
    line: 'Fast, good-looking sites built to turn visitors into clients.',
    items: ['Business & landing pages', 'Portfolios', 'E-commerce', 'SEO & performance'],
  },
  {
    title: 'Management systems',
    line: 'One place to run the business instead of ten spreadsheets.',
    items: ['CRM & lead management', 'School, clinic & inventory systems', 'Internal dashboards', 'Admin panels'],
  },
  {
    title: 'Full-stack engineering',
    line: 'Front end, back end, cloud. We take the whole thing.',
    items: ['React / Next.js front ends', 'APIs & databases', 'Cloud deploys & CI/CD', 'Rescue & scale existing apps'],
  },
]

// Offers. Set `price` to a string like '₹25,000' or 'From $499' when it's decided;
// left as null it shows "Custom quote".
export const offers = [
  {
    name: 'Launch',
    for: 'Get online and look serious',
    price: null,
    timeline: '1 – 2 weeks',
    includes: ['Website or portfolio, up to 6 pages', 'Mobile-first, fast, SEO-ready', 'WhatsApp & contact buttons wired in', 'Domain & hosting set up'],
  },
  {
    name: 'Automate',
    for: 'Stop doing the same task twice',
    price: null,
    timeline: '1 – 3 weeks',
    featured: true,
    includes: ['One WhatsApp, LinkedIn or call bot', 'AI replies trained on your business', 'Leads synced to your sheet or CRM', '30 days of tuning after launch'],
  },
  {
    name: 'Build',
    for: 'Turn the idea into a product',
    price: null,
    timeline: '4 – 8 weeks',
    includes: ['Full SaaS MVP or management system', 'Login, payments & admin dashboard', 'AI features where they pay off', 'Deployed, monitored, handed over'],
  },
  {
    name: 'Scale',
    for: 'A team on call, every month',
    price: null,
    timeline: 'Monthly',
    includes: ['Dedicated hours every month', 'New features & automations', 'Maintenance & uptime', 'Priority WhatsApp support'],
  },
]

export const process = [
  { step: 'Say hi', text: 'Message us on WhatsApp, email or LinkedIn with what you need. Rough is fine.' },
  { step: 'Scope call', text: 'A 20-minute call. You get a fixed scope, a timeline and a price.' },
  { step: 'We build', text: 'Weekly demos on a live link. You see progress, not promises.' },
  { step: 'Launch', text: 'We ship it, hand it over and stay on for support.' },
]

export const faqs = [
  { q: 'How much does a project cost?', a: 'It depends on scope. After a short call you get a fixed price, so there are no surprises later.' },
  { q: 'How fast can you deliver?', a: 'Websites in 1 – 2 weeks, automations in 1 – 3 weeks, SaaS MVPs in 4 – 8 weeks.' },
  { q: 'Can you add AI to something I already have?', a: 'Yes. We plug AI into existing websites, CRMs, WhatsApp numbers and internal tools.' },
  { q: 'Do you work with clients outside India?', a: 'Yes. We work remotely with clients anywhere and keep to your time zone for calls.' },
  { q: 'What happens after launch?', a: 'Every project comes with support after launch, and you can move to a monthly plan to keep building.' },
  { q: 'Do I own the code?', a: 'Yes. Once the project is paid for, the code, data and accounts are yours.' },
]
