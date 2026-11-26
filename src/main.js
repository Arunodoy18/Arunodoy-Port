import './style.css'
import { homeHtml } from './pages/home.js'
import { initAnimations } from './anim.js'

// The build prerenders this markup into index.html (see vite.config.js); fall back to rendering it here.
const app = document.querySelector('#app')
if (!app.firstElementChild) app.innerHTML = homeHtml()
initAnimations('home')
