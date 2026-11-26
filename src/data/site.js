// Everything a client reads lives here. Edit this file, not the components.

export const brand = {
  name: 'C3 STUDIO',
  hours: ['Monday–Saturday', '10:00 – 20:00 IST'],
  location: ['Sikkim, India', 'Working worldwide'],
}

// The three ways clients reach us. Every "Let's talk" button points at these.
export const contact = {
  whatsapp: '918812078591', // international format, digits only
  whatsappLabel: '+91 88120 78591',
  whatsappText: "Hi! I saw your portfolio and I'd like to build something.",
  email: 'arunodoy630@gmail.com',
  emailSubject: 'New project enquiry',
  linkedin: 'https://www.linkedin.com/in/arunodoy-banerjee/',
}

export const waLink = (text = contact.whatsappText) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`
export const mailLink = (subject = contact.emailSubject) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`

export const hero = {
  heading: 'We put AI in everything',
  pills: ['AI & automation studio', 'Websites to SaaS', 'No fluff, just shipping'],
  marquee: "LET'S AUTOMATE THE BORING STUFF  •  AI IN EVERYTHING  •  ",
}

export const about = {
  label: 'A bit about us',
  para: "Most businesses don't need more software. They need the boring work to disappear. We build the bots, agents and products that do it, and ship them in weeks.",
  pills: ['Obsessed with shipping', 'AI-first, always', 'Allergic to templates'],
}

// Showcase strip: images in /public/work or designed tiles ({ tile: 'whatsapp' | 'call' | 'dashboard' | 'code' }).
export const showcase = [
  { img: '/work/neurodb-sq.jpg' },
  { tile: 'whatsapp' },
  { img: '/work/dbviz-sq.jpg' },
  { tile: 'call' },
  { img: '/work/neurodb-sq2.jpg' },
  { tile: 'dashboard' },
  { img: '/work/dbviz-sq2.jpg' },
  { tile: 'code' },
]

// Project cards. `cover` + `hover` are portrait screenshots; `brush` is the hover paint colour.
export const projects = [
  {
    title: 'NeuroDB',
    category: 'Web apps • AI/ML',
    year: '2026',
    description: 'AI-powered PostgreSQL tool that lets you query and explore databases in natural language.',
    link: 'https://neurodb.buildc3.tech/',
    cover: '/work/neurodb-tall.jpg',
    hover: '/work/neurodb-tall2.jpg',
    brush: '#2a9df4',
    logo: 'N',
  },
  {
    title: 'DB-Viz',
    category: 'Web apps • Dev tools · 6k+ users',
    year: '2026',
    description: 'Database schema visualiser that shows every table and how they connect.',
    link: 'https://dbviz.buildc3.tech/',
    cover: '/work/dbviz-tall.jpg',
    hover: '/work/dbviz-tall2.jpg',
    brush: '#9a8a52',
    logo: 'D',
  },
]

export const projectsEnd = {
  para: 'More projects are cooking. Yours could be next.',
  pills: ['The plot thickens', 'AI inside', 'Built in weeks'],
  cta: 'Start a project',
}

// Services: each reads "<a> [animated icon] <b>". icon: whatsapp | linkedin | call | agent | saas | web | system | code
export const services = [
  { a: 'WhatsApp', b: 'Bots', icon: 'whatsapp', para: 'Chatbots that reply, qualify and book on WhatsApp, 24/7.' },
  { a: 'LinkedIn', b: 'Outreach', icon: 'linkedin', para: 'Automated prospecting and follow-ups that sound like you.' },
  { a: 'AI', b: 'Calling', icon: 'call', para: 'Voice agents that take and make calls, then log everything.' },
  { a: 'AI', b: 'Agents', icon: 'agent', para: 'Agents trained on your docs and wired into your tools.' },
  { a: 'SaaS', b: 'Products', icon: 'saas', para: 'From idea to paying users: auth, billing, dashboards. Even Udemy-style course platforms.' },
  { a: 'Web', b: 'Design', icon: 'web', para: 'Websites and portfolios that look sharp and turn visitors into clients.' },
  { a: 'Management', b: 'Systems', icon: 'system', para: 'CRMs, school, clinic and inventory systems: one place to run it all.' },
  { a: 'Full', b: 'Stack', icon: 'code', para: 'Front end, back end, cloud. We take the whole thing.' },
]

// Offers shown as the rotating card stack. Set `price` to a string like '₹25,000' when decided.
export const offers = [
  { name: 'Launch', for: 'Get online and look serious', price: null, timeline: '1 – 2 weeks', includes: ['Website or portfolio, up to 6 pages', 'Mobile-first, fast, SEO-ready', 'WhatsApp & contact buttons wired in', 'Domain & hosting set up'] },
  { name: 'Automate', for: 'Stop doing the same task twice', price: null, timeline: '1 – 3 weeks', includes: ['One WhatsApp, LinkedIn or call bot', 'AI replies trained on your business', 'Leads synced to your sheet or CRM', '30 days of tuning after launch'] },
  { name: 'Build', for: 'Turn the idea into a product', price: null, timeline: '4 – 8 weeks', includes: ['Full SaaS MVP or management system', 'Login, payments & admin dashboard', 'AI features where they pay off', 'Deployed, monitored, handed over'] },
  { name: 'Scale', for: 'A team on call, every month', price: null, timeline: 'Monthly', includes: ['Dedicated hours every month', 'New features & automations', 'Maintenance & uptime', 'Priority WhatsApp support'] },
]

export const faqs = [
  { q: 'What kind of projects do you take on?', a: 'Anything where software or AI can save you time or make you money: WhatsApp, LinkedIn and call automations, AI agents, SaaS products, websites and management systems.' },
  { q: 'How much does a project cost?', a: 'It depends on scope. After a short call you get a fixed price, so there are no surprises later.' },
  { q: 'How fast can you deliver?', a: 'Websites in 1 – 2 weeks, automations in 1 – 3 weeks, SaaS MVPs in 4 – 8 weeks.' },
  { q: 'Can you add AI to something I already have?', a: 'Yes. We plug AI into existing websites, CRMs, WhatsApp numbers and internal tools.' },
  { q: 'Do you work with clients outside India?', a: 'Yes. We work remotely with clients anywhere and keep to your time zone for calls.' },
  { q: 'What happens after launch?', a: 'Every project comes with support after launch, and you can move to a monthly plan to keep building.' },
  { q: 'Do I own the code?', a: 'Yes. Once the project is paid for, the code, data and accounts are yours.' },
]

export const footer = {
  heading: "Okay, that's enough website",
  tagline: 'Built by humans. Powered by AI.',
}
