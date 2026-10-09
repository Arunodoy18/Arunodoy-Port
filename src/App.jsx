import { SettingsProvider } from './os/SettingsContext'
import { WindowProvider } from './os/WindowContext'
import Desktop from './os/Desktop'

export default function App() {
  return (
    <SettingsProvider>
      <WindowProvider>
        <Desktop />
      </WindowProvider>
    </SettingsProvider>
  )
}
