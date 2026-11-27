import './style.css'
import { casesIndexHtml, caseHtml } from './pages/case.js'
import { initAnimations } from './anim.js'

// /case-studies and /case-studies/<slug> share this entry; <body data-page="cases" | "case:<slug>"> says which one.
const app = document.querySelector('#app')
const page = document.body.dataset.page
if (!app.firstElementChild) app.innerHTML = page === 'cases' ? casesIndexHtml() : caseHtml(page.slice(5))
initAnimations('doc')
