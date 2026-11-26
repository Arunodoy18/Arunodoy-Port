import './style.css'
import { blogIndexHtml, postHtml } from './pages/blog.js'
import { initAnimations } from './anim.js'

// /blog and /blog/<slug> share this entry; <body data-page="blog" | "post:<slug>"> says which one.
const app = document.querySelector('#app')
const page = document.body.dataset.page
if (!app.firstElementChild) app.innerHTML = page === 'blog' ? blogIndexHtml() : postHtml(page.slice(5))
initAnimations('doc')
