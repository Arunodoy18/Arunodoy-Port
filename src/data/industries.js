// Industry landing pages (/for/<slug>): used as the link in cold outreach for each niche.
// Honest copy only: what we would build and how a pilot works. No invented results or clients.

export const industries = [
  {
    slug: 'uk-accountancy-firms',
    name: 'UK accountancy firms',
    seoTitle: 'AI Automation for UK Accountancy Firms | C3 Studio',
    description:
      'C3 Studio automates client chasing, onboarding and admin for UK accountancy firms, so your team spends Making Tax Digital season on billable work.',
    title: ['AI automation for', 'UK accountancy firms'],
    pills: ['For practices with 20 to 200 staff', 'We work UK hours'],
    lead: "You're turning work away because there aren't enough people. We automate the chasing, onboarding and admin, so your team spends its time on billable work.",
    why: {
      heading: 'Why now',
      points: [
        ['Quarterly, not yearly', 'Making Tax Digital for Income Tax started on 6 April 2026. The same clients now need chasing for records four times a year.'],
        ['Not enough people', 'Most UK practices report turning work away because they cannot hire enough qualified staff.'],
        ['The work is repetitive', 'Reminders, follow-ups, onboarding forms and "where is my return?" emails follow the same pattern every time. That is exactly what automation is good at.'],
      ],
    },
    pains: {
      heading: 'Where your team’s time goes',
      items: [
        ['Chasing clients for records', 'Emails, calls and reminders, client by client, every quarter.'],
        ['Onboarding new clients', 'Forms, ID and anti-money-laundering checks, engagement letters and setup.'],
        ['The same questions, again', 'Deadlines, what to send, how to upload, where things stand.'],
        ['Tracking it all', 'Spreadsheets, inboxes and sticky notes to see who is late.'],
      ],
    },
    build: {
      heading: 'What we automate',
      items: [
        ['Client chasing', 'Personalised reminders by email that keep going until records arrive, and stop once they do.'],
        ['A simple upload link', 'Clients send documents in one place. Files are sorted and anything missing is flagged.'],
        ['One dashboard', 'Who has sent everything, who is late and who needs a call from your team.'],
        ['Client onboarding', 'Forms, checks and engagement letters collected in one guided flow.'],
        ['An assistant on your own guidance', 'Answers routine client and staff questions from your firm’s documents.'],
        ['Fits your tools', 'We work around the email, storage and practice software you already use.'],
      ],
    },
    pilot: {
      heading: 'How the pilot works',
      intro: 'We’re taking on 2 UK practices at a reduced price, in return for a case study.',
      steps: [
        ['A 45-minute call', 'We map how your team chases clients and onboards them today.'],
        ['Built in 3 weeks', 'We automate one admin job end to end, usually client chasing.'],
        ['30 days of tuning', 'We adjust it with your team until it runs smoothly.'],
      ],
    },
    faqs: [
      ['Is client data safe?', 'We build around UK GDPR: data stays in your systems or in services you approve, access is limited to what the job needs, and we sign a data processing agreement before we start.'],
      ['Do we have to change our software?', 'No. We work around the tools you already use and only add what is missing.'],
      ['You’re based in India. How does that work?', 'We work UK hours for calls and support, and everything is done remotely. Our clients already include a consulting firm with branches in 11 countries.'],
      ['What does it cost?', 'The pilot is a fixed, reduced price agreed before we start. After that, you choose whether to keep going.'],
    ],
    proof: ['manufacturing-crm', 'blackmont-academy'],
    cta: 'Book a 15-minute call',
    bookSubject: 'Book a call: UK accountancy pilot',
  },
  {
    slug: 'us-home-services',
    name: 'US home services companies',
    seoTitle: 'AI Receptionist for Home Services Companies | C3 Studio',
    description:
      'C3 Studio builds AI voice agents for US HVAC, plumbing, roofing and solar companies that answer every missed call, qualify the job and book it in, 24/7.',
    title: ['Never miss', 'another job call'],
    pills: ['For HVAC, plumbing, roofing and solar', 'We work US hours'],
    lead: 'An AI voice agent that answers every call your team can’t: after hours, on weekends and when everyone is out on a job. It qualifies the job and books it in.',
    why: {
      heading: 'Why it matters',
      points: [
        ['Missed calls are lost jobs', 'A caller who reaches voicemail usually rings the next company on the list.'],
        ['Peak season overflows', 'Heatwaves, cold snaps and storms bring more calls than any office can pick up.'],
        ['Your techs are on jobs', 'The people who know the work are the ones least able to answer the phone.'],
      ],
    },
    pains: {
      heading: 'Where jobs slip away',
      items: [
        ['After hours', 'Evenings and weekends go to voicemail.'],
        ['Busy lines', 'Two calls at once means one caller gets nothing.'],
        ['Answering services', 'They take a message. Nobody books the job.'],
        ['Slow callbacks', 'By the next morning, the customer has hired someone else.'],
      ],
    },
    build: {
      heading: 'What the voice agent does',
      items: [
        ['Answers in your name', 'Every call, 24/7, with your greeting and your services.'],
        ['Qualifies the job', 'What the problem is, where, and how urgent.'],
        ['Books it in', 'Into your calendar, or straight to your dispatcher.'],
        ['Handles emergencies', 'Urgent calls are passed to your on-call tech right away.'],
        ['Sends you everything', 'A summary and the recording of every call.'],
        ['Fits your tools', 'We connect it to the scheduling software or CRM you already use.'],
      ],
    },
    pilot: {
      heading: 'How the pilot works',
      intro: 'We’re taking on 2 companies at a reduced price, in return for a case study.',
      steps: [
        ['A 30-minute call', 'Your services, service area, prices you’re happy to share and how you book jobs.'],
        ['Live in 2 weeks', 'We set up the agent on your missed and after-hours calls.'],
        ['30 days of tuning', 'We listen to the calls and improve it with you.'],
      ],
    },
    faqs: [
      ['Will callers know it’s AI?', 'It sounds natural, and it tells callers they’re speaking with your virtual assistant. Calls are disclosed as recorded, as US law requires in some states.'],
      ['What if it can’t handle a call?', 'It takes the details and passes the caller to your team, or flags the call for a callback straight away.'],
      ['Do we have to change our software?', 'No. Bookings go into the calendar or scheduling tool you already use, or to your dispatcher.'],
      ['You’re based in India. How does that work?', 'We work US hours for calls and support, and everything is done remotely. Our clients already include a restaurant in Sydney and a consulting firm in Spain.'],
    ],
    proof: ['manufacturing-crm', 'blackmont-academy'],
    cta: 'Book a 15-minute call',
    bookSubject: 'Book a call: home services voice agent pilot',
  },
]
