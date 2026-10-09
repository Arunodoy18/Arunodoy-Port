import { useRef, useState } from 'react'
import { Layers, Search, ExternalLink, Github, LayoutGrid, List } from 'lucide-react'
import { useWindows } from '../os/WindowContext'
import { AppIcon } from '../os/Icons'
import BrowserApp from './BrowserApp'
import { projects, categories } from '../data/projects'

export default function FinderApp() {
  const { open } = useWindows()
  const [place, setPlace] = useState('all')
  const [view, setView] = useState('grid')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(projects[0]?.id)
  const root = useRef(null)

  const q = query.trim().toLowerCase()
  const visible = projects.filter(
    (p) =>
      (place === 'all' || p.category === place) &&
      (!q || `${p.title} ${p.description} ${p.stack.join(' ')}`.toLowerCase().includes(q)),
  )
  const selected = visible.find((p) => p.id === selectedId) ?? visible[0]

  // Live sites open in the in-OS browser (genie-ing out of their tile); repo-only projects open GitHub.
  const launch = (p) => {
    if (!p.link) return p.repo && window.open(p.repo, '_blank', 'noopener,noreferrer')
    const tile = root.current?.querySelector(`[data-project-id="${p.id}"]`)
    open('browser', {
      title: p.title,
      icon: Layers,
      content: <BrowserApp key={p.id} url={p.link} />,
      origin: tile?.getBoundingClientRect(),
      size: { width: 1040, height: 680 },
    })
  }

  const side = (key, label, count) => (
    <button key={key} className={`side-item${place === key ? ' active' : ''}`} onClick={() => setPlace(key)}>
      <span>{label}</span>
      <span className="muted">{count}</span>
    </button>
  )

  return (
    <div ref={root} className="finder">
      <aside className="finder-side">
        <div className="side-heading">Favorites</div>
        {side('all', 'All Projects', projects.length)}
        <div className="side-heading">Categories</div>
        {categories.map((c) => side(c, c, projects.filter((p) => p.category === c).length))}
      </aside>

      <section className="finder-main">
        <div className="toolbar">
          <strong>{place === 'all' ? 'Projects' : place}</strong>
          <div className="spacer" />
          <div className="segmented">
            {[['grid', LayoutGrid], ['list', List]].map(([v, Icon]) => (
              <button key={v} aria-label={`${v} view`} className={view === v ? 'on' : ''} onClick={() => setView(v)}>
                <Icon size={14} />
              </button>
            ))}
          </div>
          <label className="search">
            <Search size={13} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
          </label>
        </div>

        <div className="finder-content">
          {visible.length === 0 && <p className="empty">No projects found</p>}
          <div className={view === 'grid' ? 'tile-grid' : 'tile-list'}>
            {visible.map((p) => (
              <button
                key={p.id}
                data-project-id={p.id}
                className={`tile${selected?.id === p.id ? ' selected' : ''}`}
                onClick={() => setSelectedId(p.id)}
                onDoubleClick={() => launch(p)}
              >
                <AppIcon icon={p.icon} colors={p.colors} size={view === 'grid' ? 60 : 30} />
                <span className="tile-title">{p.title}</span>
                {view === 'list' && <span className="muted tile-desc">{p.highlight}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="statusbar muted">{visible.length} item{visible.length === 1 ? '' : 's'} · double-click to open</div>
      </section>

      {selected && (
        <aside className="finder-info">
          <div className="info-head">
            <AppIcon icon={selected.icon} colors={selected.colors} size={48} />
            <div>
              <div className="info-title">{selected.title}</div>
              <div className="muted small">{selected.category}</div>
            </div>
          </div>
          <dl className="info-rows">
            <div><dt>When</dt><dd>{selected.period}</dd></div>
            <div><dt>Highlight</dt><dd>{selected.highlight}</dd></div>
            {selected.link && <div><dt>Live</dt><dd>{selected.link.replace(/^https?:\/\//, '')}</dd></div>}
          </dl>
          <p className="info-desc">{selected.description}</p>
          <div className="chips">{selected.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
          <div className="info-actions">
            {selected.link && (
              <button className="btn primary" onClick={() => launch(selected)}><ExternalLink size={13} /> Open</button>
            )}
            {selected.repo && (
              <a className="btn" href={selected.repo} target="_blank" rel="noreferrer"><Github size={13} /> Code</a>
            )}
          </div>
        </aside>
      )}
    </div>
  )
}
