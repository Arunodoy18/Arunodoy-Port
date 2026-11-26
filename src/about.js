import './style.css'
import { aboutHtml } from './pages/about.js'
import { team } from './data/site.js'
import { initAnimations } from './anim.js'

const app = document.querySelector('#app')
if (!app.firstElementChild) app.innerHTML = aboutHtml()
window.__team = team
initAnimations('about')
