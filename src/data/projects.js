import { Sparkles, Radar, Briefcase, Apple, Puzzle, Cat } from 'lucide-react'

export const projects = [
  {
    id: 'cadence',
    title: 'Cadence',
    category: 'AI Products',
    period: 'Jun 2025 – Present',
    highlight: '200+ active users',
    description:
      'Conversational language-learning platform focused on spoken fluency. A speech-to-feedback loop scores pronunciation and grammar with LLM APIs and returns sentence-level corrections, with spaced-repetition progression.',
    stack: ['Next.js', 'TypeScript', 'LLM APIs', 'Speech Recognition', 'PostgreSQL', 'Supabase'],
    link: 'https://cadence.buildc3.tech',
    repo: 'https://github.com/Arunodoy18/Cadence',
    icon: Sparkles,
    colors: ['#38bdf8', '#2563eb'],
  },
  {
    id: 'leadradar',
    title: 'LeadRadar',
    category: 'SaaS',
    period: '2025 – Present',
    highlight: 'Multi-tenant, Stripe billing',
    description:
      'Multi-tenant B2B outreach SaaS with per-tenant isolation via PostgreSQL Row-Level Security. Apollo.io lead sourcing, a scheduled outreach engine that classifies replies with an LLM, and Stripe billing with a live MRR/churn dashboard.',
    stack: ['Next.js', 'PostgreSQL', 'Supabase', 'Apollo.io', 'Stripe', 'OpenAI'],
    icon: Radar,
    colors: ['#fb923c', '#e11d48'],
  },
  {
    id: 'talentsync',
    title: 'TalentSync',
    category: 'AI Products',
    period: 'Aug 2025 – Present',
    highlight: '60% fewer irrelevant matches',
    description:
      'AI career platform: LLM resume parsing, ATS scoring and semantic job matching with embeddings. Redis caching and rate limiting cut database load by 45% at peak traffic.',
    stack: ['Next.js', 'OpenAI', 'Groq', 'PostgreSQL', 'Redis', 'Supabase', 'Razorpay'],
    link: 'https://talentsync.buildc3.tech',
    repo: 'https://github.com/Arunodoy18/TalentSync',
    icon: Briefcase,
    colors: ['#4ade80', '#0d9488'],
  },
  {
    id: 'dietbuddy',
    title: 'DietBuddy',
    category: 'AI Products',
    period: 'Atal Incubation Centre',
    highlight: 'AIC incubated',
    description:
      'AI-powered nutrition assistant that analyses food for macro and micro nutrients with personalised recommendations. Founded during the Atal Incubation Centre program.',
    stack: ['TypeScript', 'LLMs', 'AI'],
    link: 'https://dietbudy.buildc3.tech',
    icon: Apple,
    colors: ['#a78bfa', '#6d28d9'],
  },
  {
    id: 'meow-ai',
    title: 'Meow AI',
    category: 'Extensions',
    period: '2025',
    highlight: 'Chrome extension',
    description: 'LLM-powered Chrome extension that brings AI assistance directly into developer workflows via the Chrome Extension APIs.',
    stack: ['JavaScript', 'Chrome Extension APIs', 'LLMs'],
    repo: 'https://github.com/Arunodoy18/Meow',
    icon: Cat,
    colors: ['#f472b6', '#7c3aed'],
  },
  {
    id: 'nakung-ai',
    title: 'Nakung AI',
    category: 'Extensions',
    period: '2025',
    highlight: 'Chrome extension',
    description: 'Second LLM-powered browser extension from buildc3.tech, with a hosted backend and Chrome Extension API integration.',
    stack: ['JavaScript', 'Chrome Extension APIs', 'Node.js', 'LLMs'],
    repo: 'https://github.com/Arunodoy18/Nakung',
    icon: Puzzle,
    colors: ['#facc15', '#ea580c'],
  },
]

export const categories = [...new Set(projects.map((p) => p.category))]
