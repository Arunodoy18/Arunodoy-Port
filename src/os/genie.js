// Genie-style open/close/minimize: the element squeezes toward (or grows out of)
// a target rect, pinching the side nearest to it via clip-path.
const side = (r, t) => {
  if (t.right < r.left) return 'left'
  if (t.left > r.right) return 'right'
  return t.top + t.height / 2 > r.top + r.height / 2 ? 'bottom' : 'top'
}

const ORIGIN = { bottom: [0.5, 1], top: [0.5, 0], left: [0, 0.5], right: [1, 0.5] }

// Polygon whose far edge narrows as k goes 0 -> 1.
const pinch = (k, s) => {
  const n = 40 * k // how far each side is pulled in, in %
  const mid = 18 * k
  const pts = {
    bottom: [[0, 0], [100, 0], [100 - mid, 60], [100 - n, 100], [n, 100], [mid, 60]],
    top: [[n, 0], [100 - n, 0], [100 - mid, 40], [100, 100], [0, 100], [mid, 40]],
    left: [[0, n], [40, mid], [100, 0], [100, 100], [40, 100 - mid], [0, 100 - n]],
    right: [[0, 0], [60, mid], [100, n], [100, 100 - n], [60, 100 - mid], [0, 100]],
  }[s]
  return `polygon(${pts.map(([x, y]) => `${x}% ${y}%`).join(',')})`
}

export function runGenie(el, target, direction, { duration = 480, onDone } = {}) {
  if (!el?.animate || !target) {
    onDone?.()
    return
  }
  el.getAnimations().forEach((a) => a.cancel())
  const r = el.getBoundingClientRect()
  const s = side(r, target)
  const [ox, oy] = ORIGIN[s]
  const dx = target.left + target.width / 2 - (r.left + r.width * ox)
  const dy = target.top + target.height / 2 - (r.top + r.height * oy)

  const steps = [
    [0, 'translate(0px,0px) scale(1)', 0, 1],
    [0.35, `translate(${dx * 0.1}px,${dy * 0.12}px) scale(0.92)`, 0.55, 1],
    [0.7, `translate(${dx * 0.55}px,${dy * 0.55}px) scale(0.45)`, 0.9, 1],
    [1, `translate(${dx}px,${dy}px) scale(0.05)`, 1, 0],
  ]
  // 'out' plays the same path backwards
  const ordered = direction === 'out' ? steps.map(([o, ...rest]) => [1 - o, ...rest]).reverse() : steps
  const frames = ordered.map(([offset, transform, k, opacity]) => ({ offset, transform, clipPath: pinch(k, s), opacity }))

  el.style.transformOrigin = `${ox * 100}% ${oy * 100}%`
  const anim = el.animate(frames, {
    duration,
    easing: direction === 'in' ? 'cubic-bezier(0.55,0,0.8,0.4)' : 'cubic-bezier(0.2,0.6,0.3,1)',
    fill: 'both',
  })
  anim.onfinish = () => {
    onDone?.()
    if (direction === 'out') anim.cancel()
  }
}

export const taskbarRect = (id) =>
  document.querySelector(`[data-taskbar-id="${id}"]`)?.getBoundingClientRect() ?? null
