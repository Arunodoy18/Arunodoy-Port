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
  { img: '/work/blackmont-sq.jpg' },
  { tile: 'whatsapp' },
  { img: '/work/neurodb-sq.jpg' },
  { img: '/work/dietbyrd-sq.jpg' },
  { tile: 'call' },
  { img: '/work/dbviz-sq.jpg' },
  { img: '/work/mfg-sq.jpg' },
  { img: '/work/neurodb-sq2.jpg' },
  { tile: 'dashboard' },
  { img: '/work/dbviz-sq2.jpg' },
  { img: '/work/mfg-sq2.jpg' },
  { tile: 'code' },
]

// Project cards. `cover` + `hover` are portrait screenshots; `brush` is the hover paint colour.
export const projects = [
  {
    title: 'Blackmont Academy',
    category: 'Edtech • Spain · 11 countries',
    year: '2026',
    description: 'Training platform for Blackmont Consulting: one system replacing branch-led training across 23 branches in 11 countries. Built with Axon Studio.',
    link: 'https://blackmontacademy.com/',
    cover: '/work/blackmont-tall.jpg',
    hover: '/work/blackmont-tall2.jpg',
    brush: '#7b5cf5',
    logo: 'B',
  },
  {
    title: 'Diet By RD',
    category: 'Health-tech • India',
    year: '2026',
    description: "India's first clinical nutrition platform where every consultation is with a Registered Dietitian. Built for a client in Bihar.",
    link: 'https://dietbyrd.buildc3.tech/',
    cover: '/work/dietbyrd-tall.jpg',
    hover: '/work/dietbyrd-tall2.jpg',
    brush: '#1f7a55',
    logo: 'RD',
  },
  {
    title: 'Manufacturing CRM & Supply Chain Suite',
    category: 'Manufacturing • CRM & ERP',
    year: '2026',
    description: 'Custom-built CRM and supply chain platform enabling manufacturers to manage leads, vendor coordination, procurement cycles, inventory movement, and order fulfillment within a structured operational workflow.',
    link: null, // private client system: the card opens the contact overlay
    cover: '/work/mfg-tall.jpg',
    hover: '/work/mfg-tall2.jpg',
    brush: '#b4232a',
    logo: 'M',
  },
  {
    title: 'NeuroDB',
    category: 'Web apps • AI/ML · 70k+ users',
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

/* ------------------------------------------------------------ about page */
export const aboutPage = {
  heading: ['Small studio,', 'big AI energy'],
  pills: ['AI & automation studio', 'Independent'],
  intro: 'Founded in Sikkim by two builders, C3 Studio brings together AI engineering, product thinking and full-stack development.',
  story: [
    {
      label: 'How we started',
      heading: 'Two builders, one itch to automate everything.',
      para: "We were already shipping SaaS products, AI agents and Chrome extensions for others. So we put that experience into something of our own: a studio where we question the brief, sweat the details and build the kind of software that quietly does the boring work for you.",
      art: 'bot',
    },
    {
      label: "Now we're here",
      heading: 'Less size, more scope',
      para: "C3 Studio is a two-founder core team, backed by trusted collaborators whenever a project needs it. That means we stay hands-on, move fast and build the right team around every problem. We like projects with a real challenge and people who care about getting it right.",
      art: 'laptop',
    },
  ],
  teamLabel: 'The team',
  teamHeading: 'This is pretty much everyone',
  behind: 'Behind the work',
}

// Team cards. Clicking a card opens a popup with `bio` and `socials`.
export const team = [
  {
    name: 'Arunodoy Banerjee',
    role: 'Founder & CTO',
    photo: '/team/arunodoy.jpg',
    bio: [
      'Full-stack and AI engineer who leads the tech at C3. He has shipped multi-tenant SaaS, RAG agents, WhatsApp bots and LLM-powered Chrome extensions used by thousands of people.',
      'Hackathon winner, open-source contributor and the one who will happily automate the thing you do every Monday.',
    ],
    socials: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/arunodoy-banerjee/' },
      { name: 'GitHub', url: 'https://github.com/Arunodoy18' },
    ],
  },
  {
    name: 'Om Gupta',
    role: 'Founder & CEO',
    photo: '/team/ceo.jpg',
    bio: [
      'Runs the business side of C3: clients, strategy and making sure every project ships on time and actually moves the numbers.',
    ],
    socials: [],
  },
  {
    name: 'Our collaborators',
    role: 'On call when a project needs it',
    photo: null, // shows the C3 bot illustration
    bio: [
      'Designers, ML engineers and specialists we trust, brought in when a project demands it. You get a small team that can still go big.',
    ],
    socials: [],
  },
]
