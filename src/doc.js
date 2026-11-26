import './style.css'
import { docHtml } from './pages/doc.js'
import { initAnimations } from './anim.js'

// Contact / privacy / terms / 404 share this entry; <body data-page> says which one.
const app = document.querySelector('#app')
if (!app.firstElementChild) app.innerHTML = docHtml(document.body.dataset.page)
initAnimations('doc')
