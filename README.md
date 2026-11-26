# C3 Studio: sales portfolio

The client-facing site for C3 Studio: AI automations, WhatsApp/LinkedIn/call bots, AI agents, SaaS products, websites and management systems. Every call to action goes to WhatsApp, email or LinkedIn.

**Live:** https://arunodoy-os.netlify.app (auto-deploys from `main` on Netlify)

## Editing content

All of the copy is in `src/data/site.js`: hero, about, showcase strip, projects, services, offers (`price: null` shows "Custom quote"), FAQ, footer and contact details.

- Artwork (loader logo, walking characters, cats, swirls, service icons, mascot) is original SVG in `src/art.js`.
- Motion lives in `src/anim.js`, built on GSAP (ScrollTrigger, SplitText, DrawSVG) and Lenis smooth scrolling.
- Project screenshots are in `public/work/` (portrait `*-tall.jpg` for cards, `*-sq.jpg` for the showcase strip).

## Run locally

```bash
npm install
npm run dev
```

## Deploy

`netlify.toml` builds with `npm run build` and publishes `dist`. Pushing to `main` deploys.

Built with Vite, GSAP and Lenis.
