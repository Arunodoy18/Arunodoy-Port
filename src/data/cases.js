// Case studies: one page each at /case-studies/<slug>. Only facts we can stand behind: no invented numbers.
// The matching project card on the home page links here (set `caseStudy: '<slug>'` on the project in site.js).

export const cases = [
  {
    slug: 'blackmont-academy',
    title: 'Blackmont Academy',
    headline: 'One training platform for 23 branches in 11 countries',
    seoTitle: 'Blackmont Academy case study | Training platform | C3 Studio',
    description:
      'How we replaced branch-led training at Blackmont Consulting with one platform and academy site, standardising employee training across 23 branches in 11 countries.',
    tags: ['Edtech', 'Training platform', 'Web app'],
    facts: [
      ['Client', 'Blackmont Consulting'],
      ['Industry', 'Consulting & education'],
      ['Where', 'Spain · 23 branches in 11 countries'],
      ['Timeline', '2 months, ongoing'],
      ['Partner', 'Built with Axon Studio'],
    ],
    stats: [['23', 'branches on one platform'], ['11', 'countries'], ['2 months', 'to launch, still growing']],
    link: 'https://blackmontacademy.com/',
    images: [
      ['/work/blackmont-tall.jpg', 'Blackmont Academy home page: Developing next generation consulting leaders', 728, 1020],
      ['/work/blackmont-tall2.jpg', 'Blackmont Academy programme page', 728, 1020],
    ],
    challenge: [
      'Blackmont Consulting trains the consultants it puts in front of clients. With 23 branches across 11 countries, every office had been running training its own way: its own material, its own standard and no shared view of who was ready for real client work.',
      'They wanted one programme, one standard and one place to run it, plus a public academy that could attract and filter new talent.',
    ],
    built: [
      ['One platform for every branch', 'A single training system that replaces branch-by-branch training, so every consultant follows the same programme to the same standard.'],
      ['A structured pathway', 'Participants move through the programme stage by stage, from learning frameworks to real case work.'],
      ['Merit-based progression', 'Progress is based on measurable performance: examinations, case work, participation and final assessments.'],
      ['Member portal', 'A private area where participants work through the programme.'],
      ['The academy website', 'blackmontacademy.com: the public face of the programme, with the mission, programme overview, Base Camp, partnerships, FAQ and applications.'],
    ],
    outcome: [
      'Blackmont now runs standardised employee training across all 23 branches in 11 countries from one platform instead of a patchwork of branch-led programmes.',
      'The work is ongoing: we keep extending the platform as the academy grows.',
    ],
  },
  {
    slug: 'diet-by-rd',
    title: 'Diet By RD',
    headline: "India's first clinical nutrition platform where every consult is with a Registered Dietitian",
    seoTitle: 'Diet By RD case study | Health-tech platform | C3 Studio',
    description:
      'How we built Diet By RD: bookings, payments, six role-based dashboards, a diet-plan builder, doctor referrals and reminders for an RD-only nutrition platform in India.',
    tags: ['Health-tech', 'SaaS platform', 'Payments'],
    facts: [
      ['Client', 'Diet By RD Private Limited'],
      ['Industry', 'Health-tech · clinical nutrition'],
      ['Where', 'India'],
      ['Scope', 'Product, design, full-stack build'],
      ['Stack', 'React, TypeScript, Node.js, PostgreSQL, Razorpay'],
    ],
    stats: [['6', 'role-based dashboards'], ['₹999', 'consultations booked and paid online'], ['1', 'platform for patients, dietitians and doctors']],
    link: 'https://dietbyrd.buildc3.tech/',
    images: [
      ['/work/dietbyrd-tall.jpg', 'Diet By RD home page: your health deserves a Registered Dietitian', 728, 1020],
      ['/work/dietbyrd-tall2.jpg', 'Diet By RD consultation booking', 728, 1020],
    ],
    challenge: [
      "Most nutrition advice in India comes from influencers, not qualified professionals. Diet By RD's founders wanted a platform where every single consultation is with a Registered Dietitian.",
      'That meant much more than a landing page. Patients needed to book and pay, dietitians needed tools to plan diets and follow up, doctors needed to refer patients, and the team needed to run support, payments and quality checks, all in one product.',
    ],
    built: [
      ['Booking and payments', 'Patients book a ₹999 consultation and pay online with Razorpay. Coupons, and a gift flow so people can gift a consultation to family and friends.'],
      ['Six dashboards, one product', 'Separate, role-based workspaces for patients, dietitians, doctors, admins, the support team and interns.'],
      ['Dietitian tools', 'Schedules and bookable slots, patient records, a diet-plan builder backed by a food library, and diet charts exported as PDFs.'],
      ['Doctor referrals', 'Doctors refer patients, follow their progress and see their own analytics, with collaboration fees tracked by the platform.'],
      ['Smart matching', 'Patients are matched to dietitians by language first, including regional languages, and can be re-matched when preferences change.'],
      ['Reminders and support', 'Automated reminders, email and calling integrations, a support desk, reviews and full legal pages.'],
    ],
    outcome: [
      'Diet By RD is live as one platform for patients, dietitians, doctors and the team behind them.',
      'We keep shipping in rounds with the client: each round of feedback becomes new features, from bookable slots and regional languages to admin tools for moving sessions between dietitians.',
    ],
  },
  {
    slug: 'manufacturing-crm',
    title: 'Manufacturing CRM & Supply Chain Suite',
    headline: 'From lead to delivery in one system for a growing manufacturer',
    seoTitle: 'Manufacturing CRM & supply chain case study | C3 Studio',
    description:
      'A custom CRM and supply chain platform for an FMCG food manufacturer: leads, vendors, purchase orders with approvals, inventory and dispatch tracking in one workflow.',
    tags: ['Manufacturing', 'CRM & ERP', 'Workflow automation'],
    facts: [
      ['Client', 'FMCG food manufacturer (private)'],
      ['Industry', 'Manufacturing · snacks & packaged food'],
      ['Where', 'India'],
      ['Scope', 'Custom CRM, procurement, inventory and logistics'],
      ['Access', 'Private internal system'],
    ],
    stats: [['4', 'core modules: sales, procurement, stock, dispatch'], ['1', 'place to approve every purchase order'], ['Live', 'stock levels and delivery tracking']],
    link: null,
    images: [
      ['/work/mfg-tall.jpg', 'Sales and customer CRM: pipeline value, active deals and recent account activity', 728, 1020],
      ['/work/mfg-tall2.jpg', 'Inventory and stock management: real-time stock levels and low-stock alerts', 728, 1020],
      ['/work/mfg-sq.jpg', 'Procurement and vendor management: purchase orders moving through approval stages', 1000, 1000],
      ['/work/mfg-sq2.jpg', 'Logistics and dispatch: drivers, ETAs and delivery status', 1000, 1000],
    ],
    challenge: [
      'A growing food manufacturer was running sales, purchasing, stock and dispatch as separate jobs, tracked in separate places. Purchase orders waited on approvals, and nobody had one view of an order from the first lead to the final delivery.',
      'They needed a system built around how their business actually works, not a generic CRM they would have to bend their process to fit.',
    ],
    built: [
      ['Sales and customer CRM', 'Accounts and clients, a sales pipeline with deal stages and total pipeline value, and an activity log of calls, emails and meetings with retail chains and distributors.'],
      ['Procurement and vendors', 'A vendor directory and purchase orders that move through clear stages: pending approval, sent to vendor, material received, completed.'],
      ['Approvals built in', 'Purchase orders wait for manager sign-off inside the system, so nothing is chased over calls.'],
      ['Inventory and stock', 'Real-time stock levels for raw materials, packaging and finished goods across warehouses, with SKU search and low-stock alerts that flag what to reorder.'],
      ['Logistics and dispatch', 'Schedule dispatches, assign drivers, track ETAs and status from processing to delivered, with deliveries per day and average delivery time across regions.'],
      ['Automated workflows', 'Alerts for delayed deliveries and flags for invoices that need attention.'],
    ],
    outcome: [
      'The team now runs the whole cycle, from a lead to a delivered order, in one structured workflow, with approvals, stock and dispatch visible in one place.',
      "It's a private system, so there's no public link. Message us and we'll walk you through a demo.",
    ],
  },
]
