import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Minus, Square, Copy, X } from 'lucide-react'
import { useWindows } from './WindowContext'
import { runGenie, taskbarRect } from './genie'

export default function Window({ win }) {
  const { focus, minimize, toggleMaximize, close, remove } = useWindows()
  // Cascade new windows so they don't stack exactly on top of each other
  const [pos, setPos] = useState(() => ({ x: 120 + (win.slot % 6) * 32, y: 40 + (win.slot % 6) * 28 }))
  const [hidden, setHidden] = useState(false)
  const drag = useRef(null)
  const ref = useRef(null)

  // Open: grow out of the launching icon
  useLayoutEffect(() => {
    if (win.origin) runGenie(ref.current, win.origin, 'out')
    else ref.current.animate([{ opacity: 0, transform: 'scale(0.96)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 180, easing: 'ease-out' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Minimize into / restore out of the taskbar button
  const wasMin = useRef(win.minimized)
  useLayoutEffect(() => {
    if (wasMin.current === win.minimized) return
    wasMin.current = win.minimized
    const el = ref.current
    if (win.minimized) {
      runGenie(el, taskbarRect(win.id), 'in', { onDone: () => setHidden(true) })
    } else {
      el.style.display = 'flex'
      setHidden(false)
      runGenie(el, taskbarRect(win.id), 'out')
    }
  }, [win.minimized, win.id])

  // Close: shrink back into the icon it came from, then unmount
  useLayoutEffect(() => {
    if (win.closing) runGenie(ref.current, win.origin ?? taskbarRect(win.id), 'in', { onDone: () => remove(win.id) })
  }, [win.closing, win.origin, win.id, remove])

  const startDrag = (e) => {
    if (win.maximized || e.button !== 0 || e.target.closest('button')) return
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onDrag = (e) => {
    if (!drag.current) return
    const x = Math.min(Math.max(e.clientX - drag.current.dx, -200), innerWidth - 120)
    const y = Math.min(Math.max(e.clientY - drag.current.dy, 0), innerHeight - 90)
    setPos({ x, y })
  }
  const endDrag = () => (drag.current = null)

  // Keep a dragged window reachable after the viewport shrinks
  useEffect(() => {
    const onResize = () => setPos((p) => ({ x: Math.min(p.x, innerWidth - 120), y: Math.min(p.y, innerHeight - 90) }))
    addEventListener('resize', onResize)
    return () => removeEventListener('resize', onResize)
  }, [])

  const frame = win.maximized
    ? { top: 0, left: 0, width: '100vw', height: 'calc(100dvh - var(--taskbar-h))', borderRadius: 0 }
    : {
        top: pos.y,
        left: pos.x,
        width: `min(${win.size?.width ?? 820}px, 94vw)`,
        height: `min(${win.size?.height ?? 580}px, calc(100dvh - var(--taskbar-h) - 24px))`,
      }

  return (
    <div
      ref={ref}
      className="window glass"
      style={{ zIndex: win.zIndex, display: hidden ? 'none' : 'flex', pointerEvents: win.closing ? 'none' : 'auto', ...frame }}
      onPointerDown={() => focus(win.id)}
    >
      <div
        className="titlebar"
        style={{ cursor: win.maximized ? 'default' : 'grab' }}
        onPointerDown={startDrag}
        onPointerMove={onDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={(e) => !e.target.closest('button') && toggleMaximize(win.id)}
      >
        <div className="titlebar-title">
          {win.icon && <win.icon size={15} />}
          <span>{win.title}</span>
        </div>
        <div className="titlebar-controls">
          <button aria-label="Minimize" onClick={() => minimize(win.id)}><Minus size={15} /></button>
          <button aria-label={win.maximized ? 'Restore' : 'Maximize'} onClick={() => toggleMaximize(win.id)}>
            {win.maximized ? <Copy size={13} /> : <Square size={13} />}
          </button>
          <button aria-label="Close" className="close" onClick={() => close(win.id)}><X size={15} /></button>
        </div>
      </div>
      <div className="window-body">{win.content}</div>
    </div>
  )
}
