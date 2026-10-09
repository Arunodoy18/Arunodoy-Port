import { useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCw, ExternalLink, Lock } from 'lucide-react'

const normalize = (u) => (/^https?:\/\//.test(u) ? u : `https://${u}`)

// Minimal browser around an iframe. Some sites refuse to be framed, so there's
// always a one-click way out to a real tab.
export default function BrowserApp({ url }) {
  const [history, setHistory] = useState([url])
  const [i, setI] = useState(0)
  const [input, setInput] = useState(url)
  const [reloads, setReloads] = useState(0)
  const current = history[i]

  const go = (next) => {
    setI(next)
    setInput(history[next])
  }
  const navigate = (e) => {
    e.preventDefault()
    const target = normalize(input.trim())
    setHistory([...history.slice(0, i + 1), target])
    setI(i + 1)
    setInput(target)
  }

  return (
    <div className="browser">
      <div className="browser-bar">
        <button aria-label="Back" disabled={i === 0} onClick={() => go(i - 1)}><ArrowLeft size={15} /></button>
        <button aria-label="Forward" disabled={i === history.length - 1} onClick={() => go(i + 1)}><ArrowRight size={15} /></button>
        <button aria-label="Reload" onClick={() => setReloads((n) => n + 1)}><RotateCw size={14} /></button>
        <form onSubmit={navigate} className="address">
          <Lock size={12} />
          <input value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </form>
        <a aria-label="Open in new tab" title="Open in new tab" href={current} target="_blank" rel="noreferrer"><ExternalLink size={15} /></a>
      </div>
      <iframe key={`${current}#${reloads}`} src={current} title={current} />
    </div>
  )
}
