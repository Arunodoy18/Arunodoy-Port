// Original artwork: the studio's bot mascot and the decorative swirl.

export function Bot() {
  return (
    <div className="bot" aria-hidden="true">
      <span className="bubble b1">New lead → replied in 2s</span>
      <span className="bubble b2">Invoice sent ✓</span>
      <span className="bubble b3">Call booked for 4 pm</span>
      <svg viewBox="0 0 220 240" className="bot-svg">
        {/* antenna */}
        <line x1="110" y1="44" x2="110" y2="18" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
        <circle className="bot-bulb" cx="110" cy="14" r="10" fill="#ec4524" stroke="#1a1a1a" strokeWidth="5" />
        {/* head */}
        <rect x="30" y="44" width="160" height="120" rx="36" fill="#ec4524" stroke="#1a1a1a" strokeWidth="6" />
        <rect x="52" y="64" width="116" height="78" rx="24" fill="#f6f1ea" stroke="#1a1a1a" strokeWidth="5" />
        {/* eyes */}
        <g className="bot-eyes">
          <ellipse cx="88" cy="100" rx="9" ry="13" fill="#1a1a1a" />
          <ellipse cx="132" cy="100" rx="9" ry="13" fill="#1a1a1a" />
          <circle cx="91" cy="95" r="3" fill="#fff" />
          <circle cx="135" cy="95" r="3" fill="#fff" />
        </g>
        <path d="M98 122 Q110 132 122 122" fill="none" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
        {/* ears */}
        <rect x="16" y="84" width="16" height="40" rx="8" fill="#1a1a1a" />
        <rect x="188" y="84" width="16" height="40" rx="8" fill="#1a1a1a" />
        {/* body */}
        <path d="M62 172 h96 a14 14 0 0 1 14 14 v40 h-124 v-40 a14 14 0 0 1 14 -14 Z" fill="#1a1a1a" />
        <rect x="88" y="186" width="44" height="26" rx="8" fill="#f6f1ea" />
        <text x="110" y="205" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="16" fill="#ec4524">AI</text>
        {/* waving arm */}
        <g className="bot-arm">
          <path d="M172 192 q30 -10 34 -44" fill="none" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" />
          <circle cx="206" cy="144" r="10" fill="#ec4524" stroke="#1a1a1a" strokeWidth="5" />
        </g>
      </svg>
    </div>
  )
}

export function Squiggle({ className }) {
  return (
    <svg className={className} viewBox="0 0 300 300" aria-hidden="true">
      <path
        d="M150 30 C 240 30, 280 110, 240 170 C 200 230, 110 230, 90 170 C 70 110, 150 80, 190 120 C 230 160, 200 260, 120 280"
        fill="none"
        stroke="#ec4524"
        strokeWidth="34"
        strokeLinecap="round"
        pathLength="1"
      />
    </svg>
  )
}
