import { useSettings } from '../os/SettingsContext'
import { wallpapers, getWallpaper } from '../os/wallpapers'

export default function SettingsApp() {
  const { settings, update } = useSettings()
  const current = getWallpaper(settings.wallpaper)
  return (
    <div className="settings">
      <h2>Wallpaper</h2>
      <div className="wallpaper-grid">
        {wallpapers.map((w) => (
          <button
            key={w.id}
            className={`wallpaper${settings.wallpaper === w.id ? ' on' : ''}`}
            onClick={() => update({ wallpaper: w.id })}
          >
            <span className="wallpaper-swatch" style={{ background: w.css }} />
            <span>{w.name}</span>
          </button>
        ))}
      </div>
      {current.credit && (
        <a className="wallpaper-credit" href={current.credit.href} target="_blank" rel="noreferrer">
          {current.credit.text}
        </a>
      )}
      <h2>Effects</h2>
      <label className="toggle">
        <input type="checkbox" checked={settings.frost} onChange={(e) => update({ frost: e.target.checked })} />
        <span>Frosted glass — wipe it clear with your cursor</span>
      </label>
    </div>
  )
}
