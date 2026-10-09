import { createContext, useCallback, useContext, useRef, useState } from 'react'

const Ctx = createContext(null)
export const useWindows = () => useContext(Ctx)

const isSmallScreen = () => window.innerWidth < 768

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState([])
  const [activeId, setActiveId] = useState(null)
  const z = useRef(10)
  const patch = (id, fn) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...fn(w) } : w)))

  // origin: DOMRect the window animates out of / back into. size: preferred { width, height }.
  const open = useCallback((id, { title, icon, content, origin = null, size = null }) => {
    setWindows((ws) =>
      ws.some((w) => w.id === id)
        ? ws.map((w) =>
            w.id === id
              ? { ...w, title, icon, content, zIndex: ++z.current, minimized: false, closing: false }
              : w,
          )
        : [
            ...ws,
            {
              id, title, icon, content, origin, size,
              minimized: false,
              maximized: isSmallScreen(),
              closing: false,
              zIndex: ++z.current,
              slot: ws.length,
            },
          ],
    )
    setActiveId(id)
  }, [])

  const focus = useCallback((id) => {
    patch(id, () => ({ zIndex: ++z.current, minimized: false }))
    setActiveId(id)
  }, [])

  const minimize = useCallback((id) => {
    patch(id, () => ({ minimized: true }))
    setActiveId((cur) => (cur === id ? null : cur))
  }, [])

  const toggleMaximize = useCallback((id) => {
    patch(id, (w) => ({ maximized: !w.maximized }))
    setActiveId(id)
  }, [])

  // Window plays its close animation, then calls remove().
  const close = useCallback((id) => {
    patch(id, () => ({ closing: true }))
    setActiveId((cur) => (cur === id ? null : cur))
  }, [])

  const remove = useCallback((id) => {
    setWindows((ws) => ws.filter((w) => !(w.id === id && w.closing)))
  }, [])

  return (
    <Ctx.Provider value={{ windows, activeId, open, focus, minimize, toggleMaximize, close, remove }}>
      {children}
    </Ctx.Provider>
  )
}
