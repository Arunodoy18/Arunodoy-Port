import { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'arunodoy-os:settings'
const defaults = { wallpaper: 'radiant', frost: true }
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

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings))
    } catch {
      /* storage unavailable: settings just won't persist */
    }
  }, [settings])

  const update = (patch) => setSettings((s) => ({ ...s, ...patch }))
  return <Ctx.Provider value={{ settings, update }}>{children}</Ctx.Provider>
}
