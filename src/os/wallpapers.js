// Wallpapers: an illustrated default plus procedural CSS ones.
const grid = (a) =>
  `linear-gradient(rgba(255,255,255,${a}) 1px, transparent 1px) 0 0 / 48px 48px, linear-gradient(90deg, rgba(255,255,255,${a}) 1px, transparent 1px) 0 0 / 48px 48px`

export const wallpapers = [
  {
    id: 'badminton',
    name: 'Smash',
    css: '#3b5bdb url(/wallpapers/badminton.svg) center / cover no-repeat',
  },
  {
    id: 'radiant',
    name: 'Radiant Grid',
    css: `radial-gradient(60% 55% at 82% 8%, rgba(255,70,85,0.38), transparent 70%), radial-gradient(55% 50% at 8% 92%, rgba(45,212,191,0.28), transparent 70%), ${grid(0.04)}, #0b0f17`,
  },
  {
    id: 'aurora',
    name: 'Aurora',
    css: 'radial-gradient(70% 60% at 20% 15%, rgba(45,212,191,0.45), transparent 70%), radial-gradient(60% 60% at 85% 30%, rgba(129,140,248,0.5), transparent 70%), radial-gradient(70% 60% at 50% 100%, rgba(236,72,153,0.35), transparent 70%), #070b1a',
  },
  {
    id: 'dunes',
    name: 'Midnight Dunes',
    css: 'linear-gradient(180deg, #1b1038 0%, #4a1d6b 38%, #c2410c 78%, #fb923c 100%)',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    css: `radial-gradient(50% 50% at 50% 40%, rgba(34,197,94,0.18), transparent 75%), ${grid(0.05)}, #030a06`,
  },
]

export const getWallpaper = (id) => wallpapers.find((w) => w.id === id) ?? wallpapers[0]
