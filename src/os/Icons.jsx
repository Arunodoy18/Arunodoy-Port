// Rounded "squircle" app icon: gradient body, gloss highlight, white glyph.
export const AppIcon = ({ icon: Icon, colors = ['#2dd4bf', '#6366f1'], size = 60 }) => (
  <div
    className="app-icon"
    style={{ width: size, height: size, borderRadius: size * 0.26, background: `linear-gradient(145deg, ${colors[0]}, ${colors[1]})` }}
  >
    <div className="app-icon-gloss" />
    <Icon size={size * 0.5} color="white" strokeWidth={1.8} className="app-icon-glyph" />
  </div>
)

// Logo/artwork in the same squircle shape, on a white tile.
export const ImageIcon = ({ src, alt = '', size = 60 }) => (
  <div className="app-icon" style={{ width: size, height: size, borderRadius: size * 0.26, background: '#fff' }}>
    <img src={src} alt={alt} draggable={false} style={{ width: '88%', height: '88%', objectFit: 'contain' }} />
    <div className="app-icon-gloss" style={{ opacity: 0.35 }} />
  </div>
)

export const FolderIcon = ({ size = 64 }) => (
  <svg width={size} height={size * 0.82} viewBox="0 0 100 82" className="folder-icon" aria-hidden="true">
    <defs>
      <linearGradient id="fb" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2dd4bf" />
        <stop offset="1" stopColor="#0f766e" />
      </linearGradient>
      <linearGradient id="ff" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5eead4" />
        <stop offset="1" stopColor="#14b8a6" />
      </linearGradient>
    </defs>
    <path d="M6 10a6 6 0 0 1 6-6h24l8 8h44a6 6 0 0 1 6 6v54a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6Z" fill="url(#fb)" />
    <rect x="10" y="20" width="80" height="12" rx="3" fill="#fff" opacity="0.85" />
    <rect x="6" y="26" width="88" height="52" rx="7" fill="url(#ff)" />
  </svg>
)
