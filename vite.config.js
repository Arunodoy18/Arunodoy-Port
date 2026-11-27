import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { posts } from './src/data/posts.js'

const root = dirname(fileURLToPath(import.meta.url))

// Blog pages: write one HTML entry per post (blog/<slug>.html) from the index.html shell.
// These files are generated (gitignored); add posts in src/data/posts.js.
function writeBlogEntries() {
  const shell = readFileSync(resolve(root, 'index.html'), 'utf8').replace('/src/main.js', '/src/blog.js')
  mkdirSync(resolve(root, 'blog'), { recursive: true })
  // /blog is served from blog.html (no trailing-slash redirect); posts from blog/<slug>.html
  writeFileSync(resolve(root, 'blog.html'), shell.replace('<body>', '<body data-page="blog">'))
  for (const p of posts) writeFileSync(resolve(root, 'blog', `${p.slug}.html`), shell.replace('<body>', `<body data-page="post:${p.slug}">`))
  return [['blog', resolve(root, 'blog.html')], ...posts.map((p) => [`blog-${p.slug}`, resolve(root, 'blog', `${p.slug}.html`)])]
}
const blogInputs = writeBlogEntries()

// Prerender: put each page's full markup + SEO head tags into the HTML at build time,
// so search engines, AI crawlers and link previews see real content without running JS.
function prerender() {
  let server
  const load = (p) => (server ? server.ssrLoadModule(p) : import(pathToFileURL(resolve(root, '.' + p)).href))
  return {
    name: 'c3-prerender',
    configureServer(s) { server = s },
    async transformIndexHtml(html, ctx) {
      const name = ctx.path.replace(/^\//, '').replace(/\.html$/, '').replace(/\/$/, '/index') || 'index'
      const page = name === 'index' ? 'home' : name === 'blog/index' || name === 'blog' ? 'blog' : name.startsWith('blog/') ? `post:${name.slice(5)}` : name
      const seo = await load('/src/seo.js')
      let body
      if (page === 'home') body = (await load('/src/pages/home.js')).homeHtml()
      else if (page === 'about') body = (await load('/src/pages/about.js')).aboutHtml()
      else if (page === 'blog') body = (await load('/src/pages/blog.js')).blogIndexHtml()
      else if (page.startsWith('post:')) body = (await load('/src/pages/blog.js')).postHtml(page.slice(5))
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
      input: {
        ...Object.fromEntries(['index', 'about', 'contact', 'privacy', 'terms', 'review', '404'].map((n) => [n === 'index' ? 'main' : n, resolve(root, `${n}.html`)])),
        ...Object.fromEntries(blogInputs),
      },
    },
  },
})
