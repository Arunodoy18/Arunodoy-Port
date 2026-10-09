import { useEffect, useRef } from 'react'

// Fog over the wallpaper. The pointer wipes a clear trail; the fog slowly returns.
// Rendered as: pristine fog layer minus a "wipe mask" that fades out over time,
// so the fog always returns to exactly its starting density.
const RADIUS = 70
const TICK_MS = 120
// Fraction of each wipe that heals per tick. Kept well above 1/255 so 8-bit
// alpha rounding can't leave faint wipes stuck forever.
const FADE = 0.06

function frostTile(size = 320) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  for (let i = 0; i < 44; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = 20 + Math.random() * 70
    const a = 0.05 + Math.random() * 0.14
    // Draw wrapped copies so the tile repeats seamlessly
    for (const ox of [-size, 0, size]) for (const oy of [-size, 0, size]) {
      const g = ctx.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, r)
      g.addColorStop(0, `rgba(230,240,255,${a})`)
      g.addColorStop(1, 'rgba(230,240,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(x + ox - r, y + oy - r, r * 2, r * 2)
    }
  }
  return c
}

export default function FrostOverlay() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const fog = document.createElement('canvas')
    const mask = document.createElement('canvas')
    const fctx = fog.getContext('2d')
    const mctx = mask.getContext('2d')
    const tile = frostTile()
    let last = null

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      for (const c of [canvas, fog, mask]) {
        c.width = innerWidth * dpr
        c.height = innerHeight * dpr
      }
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      fctx.fillStyle = 'rgba(230,240,255,0.14)'
      fctx.fillRect(0, 0, fog.width, fog.height)
      fctx.fillStyle = fctx.createPattern(tile, 'repeat')
      fctx.fillRect(0, 0, fog.width, fog.height)
    }

    const render = () => {
      ctx.globalCompositeOperation = 'copy'
      ctx.drawImage(fog, 0, 0)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.drawImage(mask, 0, 0)
    }

    const wipe = (x, y, r) => {
      const g = mctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, 'rgba(0,0,0,1)')
      g.addColorStop(0.55, 'rgba(0,0,0,0.95)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      mctx.fillStyle = g
      mctx.beginPath()
      mctx.arc(x, y, r, 0, Math.PI * 2)
      mctx.fill()
    }

    let frame = 0
    const onMove = (e) => {
      const r = e.pointerType === 'touch' ? RADIUS * 1.35 : RADIUS
      const { clientX: x, clientY: y } = e
      // Interpolate so fast swipes leave a continuous trail
      const steps = last ? Math.max(1, Math.ceil(Math.hypot(x - last.x, y - last.y) / 10)) : 1
      for (let i = 1; i <= steps; i++) {
        const t = i / steps
        wipe(last ? last.x + (x - last.x) * t : x, last ? last.y + (y - last.y) * t : y, r)
      }
      last = { x, y }
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; render() })
    }
    const onLeave = () => (last = null)

    // Heal: fade the mask a little each tick
    const heal = setInterval(() => {
      mctx.save()
      mctx.setTransform(1, 0, 0, 1, 0, 0)
      mctx.globalCompositeOperation = 'destination-out'
      mctx.fillStyle = `rgba(0,0,0,${FADE})`
      mctx.fillRect(0, 0, mask.width, mask.height)
      mctx.restore()
      render()
    }, TICK_MS)

    resize()
    render()
    addEventListener('resize', resize)
    addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      clearInterval(heal)
      cancelAnimationFrame(frame)
      removeEventListener('resize', resize)
      removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="frost" />
}
