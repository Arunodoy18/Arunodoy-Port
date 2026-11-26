import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const root = dirname(fileURLToPath(import.meta.url))

// Prerender: put each page's full markup + SEO head tags into the HTML at build time,
// so search engines, AI crawlers and link previews see real content without running JS.
function prerender() {
  let server
  const load = (p) => (server ? server.ssrLoadModule(p) : import(pathToFileURL(resolve(root, '.' + p)).href))
  return {
    name: 'c3-prerender',
    configureServer(s) { server = s },
    async transformIndexHtml(html, ctx) {
      const name = ctx.path.replace(/^\//, '').replace(/\.html$/, '') || 'index'
      const page = name === 'index' ? 'home' : name
      const seo = await load('/src/seo.js')
      let body
      if (page === 'home') body = (await load('/src/pages/home.js')).homeHtml()
      else if (page === 'about') body = (await load('/src/pages/about.js')).aboutHtml()
      else body = (await load('/src/pages/doc.js')).docHtml(page)
      return html.replace('<!--seo-->', seo.headTags(page)).replace('<div id="app"></div>', `<div id="app">${body}</div>`)
    },
    async generateBundle() {
      const seo = await load('/src/seo.js')
      for (const [fileName, source] of [['robots.txt', seo.robotsTxt()], ['sitemap.xml', seo.sitemapXml()], ['llms.txt', seo.llmsTxt()]])
        this.emitFile({ type: 'asset', fileName, source })
    },
  }
}

export default defineConfig({
  plugins: [prerender()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(['index', 'about', 'contact', 'privacy', 'terms', '404'].map((n) => [n === 'index' ? 'main' : n, resolve(root, `${n}.html`)])),
    },
  },
})
