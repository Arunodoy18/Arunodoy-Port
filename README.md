# BuildC3: sales portfolio

The client-facing site for BuildC3: AI automations, WhatsApp/LinkedIn/call bots, AI agents, SaaS products, websites and management systems. Every call to action goes to WhatsApp, email or LinkedIn.

**Live:** https://arunodoy-os.netlify.app (auto-deploys from `main` on Netlify)

## Editing content

All of the copy is in one file, `src/data/site.js`:

| Export | What it controls |
| --- | --- |
| `brand` | Studio name, hours, location |
| `contact` | WhatsApp number, email, LinkedIn URL (the LinkedIn button is hidden while it's empty) |
| `projects` | Work cards: title, tags, year, stat, description, live link, cover image |
| `services` | The "This is what we build" cards |
| `offers` | Packages. Set `price` to a string such as `'₹25,000'`; `null` shows "Custom quote" |
| `process`, `faqs`, `marquee`, `manifesto` | The remaining sections |

Project covers go in `public/work/` (1440×900 screenshots work well).

Links like `/#offers` or `/#work` open straight at that section.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

`netlify.toml` builds with `npm run build` and publishes `dist`. Pushing to `main` deploys.

Built with React 19 and Vite.
