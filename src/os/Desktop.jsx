import { FolderOpen, User, FileText, Mail, Github, Globe, Settings } from 'lucide-react'
import { useWindows } from './WindowContext'
import { useSettings } from './SettingsContext'
import { getWallpaper } from './wallpapers'
import Window from './Window'
import Taskbar from './Taskbar'
import FrostOverlay from './FrostOverlay'
import { AppIcon, FolderIcon } from './Icons'
import FinderApp from '../apps/FinderApp'
import AboutApp from '../apps/AboutApp'
import ResumeApp from '../apps/ResumeApp'
import MailApp from '../apps/MailApp'
import SettingsApp from '../apps/SettingsApp'
import { profile } from '../data/profile'

const openExternal = (url) => window.open(url, '_blank', 'noopener,noreferrer')

// Launchable apps. `size` is the preferred window size.
const apps = [
  { id: 'projects', label: 'Projects', title: 'Projects', icon: FolderOpen, graphic: <FolderIcon />, content: <FinderApp />, size: { width: 980, height: 620 } },
  { id: 'about', label: 'About Me', title: 'About Me', icon: User, graphic: <AppIcon icon={User} colors={['#2dd4bf', '#6366f1']} />, content: <AboutApp /> },
  { id: 'resume', label: 'Resume', title: profile.resumeName, icon: FileText, graphic: <AppIcon icon={FileText} colors={['#f87171', '#b91c1c']} />, content: <ResumeApp />, size: { width: 860, height: 680 } },
  { id: 'mail', label: 'Mail', title: 'Mail', icon: Mail, graphic: <AppIcon icon={Mail} colors={['#60a5fa', '#1d4ed8']} />, content: <MailApp />, size: { width: 720, height: 540 } },
  { id: 'github', label: 'GitHub', graphic: <AppIcon icon={Github} colors={['#3f3f46', '#09090b']} />, href: profile.github },
  { id: 'buildc3', label: 'buildc3', graphic: <AppIcon icon={Globe} colors={['#a78bfa', '#6d28d9']} />, href: profile.company },
  { id: 'settings', label: 'Settings', title: 'Settings', icon: Settings, graphic: <AppIcon icon={Settings} colors={['#94a3b8', '#475569']} />, content: <SettingsApp />, size: { width: 640, height: 500 } },
]

export default function Desktop() {
  const { windows, open } = useWindows()
  const { settings } = useSettings()

  const launch = (app, origin) => {
    if (app.href) return openExternal(app.href)
    open(app.id, { title: app.title, icon: app.icon, content: app.content, origin, size: app.size })
  }
  // The window genies out of the icon graphic, not the whole tile
  const fromIcon = (e) => e.currentTarget.firstElementChild.getBoundingClientRect()

  return (
    <div className="desktop" style={{ background: getWallpaper(settings.wallpaper).css }}>
      {settings.frost && <FrostOverlay />}

      <div className="desktop-grid">
        {apps.map((app) => (
          <button key={app.id} className="desktop-icon" onClick={(e) => launch(app, fromIcon(e))}>
            <span className="desktop-icon-graphic">{app.graphic}</span>
            <span>{app.label}</span>
          </button>
        ))}
      </div>

      <div className="hello">
        <h1>{profile.name}</h1>
      </div>

      {windows.map((w) => <Window key={w.id} win={w} />)}

      <Taskbar onBrand={() => launch(apps[1], null)} />
    </div>
  )
}
