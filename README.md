# C3 Studio: sales portfolio

The client-facing site for C3 Studio: AI automations, WhatsApp/LinkedIn/call bots, AI agents, SaaS products, websites and management systems. Every call to action goes to WhatsApp, email or LinkedIn.

**Live:** https://c3studio.buildc3.tech (official domain; the old arunodoy-os.netlify.app address 301-redirects here). Auto-deploys from `main` on Netlify.

## Editing content

All of the copy is in `src/data/site.js`: hero, about, showcase strip, projects, services, offers (`price: null` shows "Custom quote"), FAQ, footer and contact details.

- Artwork (loader logo, walking characters, cats, swirls, service icons, mascot) is original SVG in `src/art.js`.
- Motion lives in `src/anim.js`, built on GSAP (ScrollTrigger, SplitText, DrawSVG) and Lenis smooth scrolling.
- Project screenshots are in `public/work/` (portrait `*-tall.jpg` for cards, `*-sq.jpg` for the showcase strip).

## SEO, AEO and GEO

- Pages are **prerendered at build time** (`vite.config.js`): the full markup from `src/pages/*.js` goes into the HTML, so search engines, AI crawlers and link previews see the real content.
- `src/seo.js` generates each page's title, description, canonical URL, Open Graph/Twitter tags and schema.org JSON-LD (ProfessionalService, services and offers, founders, FAQPage, work list), plus `robots.txt`, `sitemap.xml` and `llms.txt`. All of it is built from `src/data/site.js`.
- **Moving to a custom domain:** change `SITE_URL` in `src/seo.js` (or set the `SITE_URL` env var in Netlify) so canonical URLs, the sitemap and structured data use it.
- The share image is `public/og.png` (1200×630).

## Run locally

```bash
npm install
npm run dev
```

## Deploy

`netlify.toml` builds with `npm run build` and publishes `dist`. Pushing to `main` deploys.

Built with Vite, GSAP and Lenis.
