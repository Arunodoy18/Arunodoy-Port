import './style.css'
import { docHtml } from './pages/doc.js'
import { initAnimations } from './anim.js'

// Contact / privacy / terms / 404 share this entry; <body data-page> says which one.
const app = document.querySelector('#app')
if (!app.firstElementChild) app.innerHTML = docHtml(document.body.dataset.page)
initAnimations('doc')

// Review page: submit to Netlify Forms without leaving the page, then show the thank-you panel.
const form = document.querySelector('.rv-form')
if (form) {
  const done = () => { form.hidden = true; document.querySelector('.rv-done').hidden = false; scrollTo({ top: 0, behavior: 'smooth' }) }
  if (new URLSearchParams(location.search).has('sent')) done()
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const btn = form.querySelector('.rv-submit'), err = form.querySelector('.rv-error')
    btn.disabled = true; err.hidden = true
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() })
      if (!res.ok) throw new Error(res.status)
      done()
    } catch {
      err.hidden = false; btn.disabled = false
    }
  })
}
