import './style.css'
import { industryHtml } from './pages/industry.js'
import { initAnimations } from './anim.js'

// /for/<slug> industry landing pages; <body data-page="industry:<slug>"> says which one.
const app = document.querySelector('#app')
if (!app.firstElementChild) app.innerHTML = industryHtml(document.body.dataset.page.slice(9))
initAnimations('doc')
