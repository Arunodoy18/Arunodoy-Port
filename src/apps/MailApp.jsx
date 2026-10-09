import { useState } from 'react'
import { Send, Copy, Check } from 'lucide-react'
import { profile } from '../data/profile'

// Composes a message and hands it to the visitor's mail client via mailto:.
export default function MailApp() {
  const [form, setForm] = useState({ name: '', subject: '', body: '' })
  const [copied, setCopied] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const send = (e) => {
    e.preventDefault()
    const body = form.name ? `${form.body}\n\n— ${form.name}` : form.body
    location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard blocked; the address is visible anyway */
    }
  }

  return (
    <form className="mail" onSubmit={send}>
      <h2>New Message</h2>
      <div className="mail-to">
        <span className="muted">To</span>
        <span>{profile.email}</span>
        <button type="button" className="icon-btn" onClick={copy} aria-label="Copy address">
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <input placeholder="Your name" value={form.name} onChange={set('name')} />
      <input placeholder="Subject" value={form.subject} onChange={set('subject')} required />
      <textarea placeholder="Hi Arunodoy, …" value={form.body} onChange={set('body')} required />
      <div className="mail-actions">
        <button type="submit" className="btn primary"><Send size={14} /> Send</button>
      </div>
    </form>
  )
}
