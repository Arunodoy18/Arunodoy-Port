import { createContext, useContext, useState } from 'react'

// v2: earlier builds saved untouched defaults, which pinned old visitors to an old wallpaper.
const KEY = 'arunodoy-os:settings:v2'
const defaults = { wallpaper: 'smash-photo', frost: true }
const Ctx = createContext(null)

export const useSettings = () => useContext(Ctx)

const load = () => {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }
  } catch {
    return defaults
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(load)

  // Persist only what the visitor actually changed, so new defaults still reach them.
  const update = (patch) => {
    setSettings((s) => ({ ...s, ...patch }))
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}')
      localStorage.setItem(KEY, JSON.stringify({ ...saved, ...patch }))
    } catch {
      /* storage unavailable: settings just won't persist */
    }
  }

  return <Ctx.Provider value={{ settings, update }}>{children}</Ctx.Provider>
}
