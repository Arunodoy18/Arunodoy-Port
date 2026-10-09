import { createContext, useContext, useState } from 'react'

// Bump the version when defaults change so returning visitors pick them up.
const KEY = 'arunodoy-os:settings:v3'
const defaults = { wallpaper: 'anime-smash', frost: true }
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
