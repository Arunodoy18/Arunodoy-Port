import { useEffect, useState } from 'react'
import { Wifi, Volume2, BatteryFull } from 'lucide-react'
import { useWindows } from './WindowContext'
import { profile } from '../data/profile'

export default function Taskbar({ onBrand }) {
  const { windows, activeId, focus, minimize } = useWindows()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="taskbar glass">
      <button className="brand" onClick={onBrand}>
        <span className="brand-dot">{profile.initials[0]}</span>
        <span className="hide-sm">{profile.name.split(' ')[0]}OS</span>
      </button>

      <div className="taskbar-windows">
        {windows.filter((w) => !w.closing).map((w) => {
          const active = activeId === w.id && !w.minimized
          return (
            <button
              key={w.id}
              data-taskbar-id={w.id}
              className={`taskbar-item${active ? ' active' : ''}`}
              onClick={() => (active ? minimize(w.id) : focus(w.id))}
              title={w.title}
            >
              {w.icon && <w.icon size={14} />}
              <span className="hide-sm">{w.title}</span>
            </button>
          )
        })}
      </div>

      <div className="tray">
        <span className="tray-icons hide-sm"><Wifi size={14} /><Volume2 size={14} /><BatteryFull size={14} /></span>
        <div className="clock">
          <div>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="clock-date">{now.toLocaleDateString([], { day: 'numeric', month: 'short' })}</div>
        </div>
      </div>
    </div>
  )
}
