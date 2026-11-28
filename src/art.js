// Original artwork for C3 Studio, as SVG strings. Animated by src/anim/*.js.
const O = '#ff5400'
const K = '#111'

/* ------------------------------------------------------------------ loader */
// Two giant brush strokes that cover the screen, then sweep away.
export const loaderBg = `
<svg viewBox="0 0 1500 1093" preserveAspectRatio="xMidYMid slice" fill="none">
  <path d="M1500 0C700 40 760 1060 0 1093" stroke="${O}" stroke-width="1000" stroke-linecap="round"/>
  <path d="M0 0C800 40 740 1060 1500 1093" stroke="#F9E2E1" stroke-width="3000" stroke-linecap="round"/>
</svg>`

// Logo: a ribbon traces in and draws the C, then 3 + STUDIO pop in.
const C_ARC = 'M537 263A95 95 0 1 0 537 397'
export const loaderLogo = `
<svg class="loader-logo" viewBox="0 0 1000 700" fill="none">
  <path class="ribbon" d="M-40 470C90 400 160 410 260 470C370 535 520 500 545 395C565 310 470 240 400 270C330 300 300 380 350 430C400 480 500 450 537 397" stroke="${O}" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="c-stroke" d="${C_ARC}" stroke="${O}" stroke-width="19"/>
  <text class="pop" x="660" y="420" text-anchor="middle" font-size="250">3</text>
  ${'STUDIO'.split('').map((c, i) => `<text class="pop" x="${330 + i * 68}" y="590" text-anchor="middle" font-size="110">${c}</text>`).join('')}
</svg>`

/* -------------------------------------------------------------- hero walkers */
const leg = (cls, thigh, shin, shoe, x) => `
  <g class="leg ${cls}" transform="translate(${x} -190)">
    <path class="pants" d="${thigh}"/>
    <g class="shin" transform="translate(0 95)">
      <path class="pants" d="${shin}"/>
      <path class="shoe" d="${shoe}"/>
    </g>
  </g>`

const GUY_THIGH = 'M-15 -6Q-18 50 -12 98L13 98Q18 50 15 -6Z'
const GUY_SHIN = 'M-12 -2L-10 88L12 88L13 -2Z'
const GUY_SHOE = 'M-13 84Q-14 99 -8 101L31 101Q35 92 22 86L12 84Z'
const GAL_THIGH = 'M-17 -6Q-21 50 -15 98L17 98Q22 50 17 -6Z'
const GAL_SHIN = 'M-15 -2L-27 90L31 90L17 -2Z'
const GAL_SHOE = 'M-6 88L-4 99L27 99Q29 90 18 88Z'

const guy = `
<g class="walker guy" transform="translate(600 548)">
 <g class="bob">
  ${leg('l1', GUY_THIGH, GUY_SHIN, GUY_SHOE, -4)}
  <path class="top" d="M-34 -196C-40 -250 -42 -300 -28 -332Q0 -344 28 -332C42 -300 40 -250 34 -196Z"/>
  ${leg('l2', GUY_THIGH, GUY_SHIN, GUY_SHOE, 4)}
  <path class="top" d="M-10 -330Q-30 -300 -40 -262" stroke-width="22" fill="none" stroke-linecap="round"/>
  <g class="sign" transform="translate(8 -262) rotate(-3)">
    <rect x="-82" y="-54" width="164" height="108" rx="3" class="board"/>
    <text x="0" y="30" text-anchor="middle" font-size="84" class="sign-text">C3</text>
  </g>
  <path class="arm" d="M18 -330Q56 -338 82 -318" stroke-width="26" fill="none" stroke-linecap="round"/>
  <path class="arm-fill top-stroke" d="M18 -330Q56 -338 82 -318" stroke-width="19" fill="none" stroke-linecap="round"/>
  <circle class="skin" cx="86" cy="-316" r="10"/>
  <g class="head" transform="translate(6 -372)">
    <path class="skin" d="M-8 22L-8 40L12 40L12 22Z"/>
    <ellipse class="skin" cx="0" cy="0" rx="25" ry="30"/>
    <path class="skin" d="M24 -2L32 8L24 12"/>
    <circle class="skin" cx="-14" cy="2" r="6"/>
    <path class="cap" d="M-27 -6Q-26 -38 3 -40Q29 -38 29 -10L60 -8Q63 -1 53 1L-27 2Z"/>
    <rect x="6" y="-4" width="24" height="11" rx="4" fill="${K}"/>
    <path d="M6 0L-12 -2" stroke="${K}" stroke-width="3"/>
    <path d="M10 18Q16 21 22 18" stroke="${K}" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
 </g>
</g>`

const gal = `
<g class="walker gal" transform="translate(860 548)">
 <g class="bob">
  ${leg('l1', GAL_THIGH, GAL_SHIN, GAL_SHOE, -4)}
  <path class="hair" d="M-20 -372Q-46 -330 -40 -290Q-36 -262 -50 -238Q-30 -230 -18 -260Q-8 -300 -12 -340Z"/>
  <path class="top2" d="M-26 -196C-30 -246 -28 -296 -20 -324Q0 -336 22 -324C30 -296 30 -246 26 -196Z"/>
  ${leg('l2', GAL_THIGH, GAL_SHIN, GAL_SHOE, 4)}
  <g class="sign" transform="translate(10 -262) rotate(2)">
    <rect x="-112" y="-52" width="224" height="104" rx="3" class="board"/>
    <text x="0" y="22" text-anchor="middle" font-size="62" class="sign-text">STUDIO</text>
  </g>
  <path class="arm" d="M14 -322Q64 -334 110 -316" stroke-width="22" fill="none" stroke-linecap="round"/>
  <path class="arm-fill top2-stroke" d="M14 -322Q64 -334 110 -316" stroke-width="15" fill="none" stroke-linecap="round"/>
  <circle class="skin" cx="114" cy="-314" r="9"/>
  <g class="head" transform="translate(4 -362)">
    <path class="skin" d="M-7 20L-7 36L10 36L10 20Z"/>
    <ellipse class="skin" cx="0" cy="0" rx="22" ry="27"/>
    <path class="skin" d="M21 -2L28 7L21 10"/>
    <path class="hair" d="M-24 6Q-30 -30 0 -32Q26 -32 24 -12Q12 -22 -2 -16Q-10 -2 -24 6Z"/>
    <path d="M8 16Q14 19 19 15" stroke="${K}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="13" cy="-2" r="3" fill="${K}"/>
  </g>
 </g>
</g>`

const cat = (cls, x) => `
<g class="cat ${cls}" transform="translate(${x} 548)">
 <g class="cat-in">
  <g class="cat-legs">
    ${[-30, -16, 20, 34].map((lx, i) => `<path class="cat-leg" data-i="${i}" d="M${lx} -34L${lx} 0" stroke-width="7" stroke-linecap="round"/>`).join('')}
  </g>
  <path class="cat-tail" d="M-44 -52Q-84 -64 -74 -108" fill="none" stroke-width="9" stroke-linecap="round"/>
  <ellipse class="cat-body" cx="0" cy="-48" rx="48" ry="20"/>
  <g transform="translate(50 -66)">
    <path class="cat-body" d="M-8 -12L-4 -30L6 -16L14 -30L18 -10Z"/>
    <circle class="cat-body" cx="4" cy="0" r="18"/>
    <circle cx="11" cy="-2" r="2.6" fill="${K}"/>
  </g>
  <ellipse class="cat-spot" cx="-12" cy="-54" rx="16" ry="9"/>
 </g>
</g>`

export const walkers = `
<svg class="walkers" viewBox="170 110 1100 450" fill="none">
  <defs>
    <pattern id="chk" width="14" height="14" patternUnits="userSpaceOnUse">
      <rect width="14" height="14" fill="${K}"/>
      <path d="M0 0L7 7L0 14M7 0L14 7L7 14" stroke="#fff" stroke-width="2"/>
    </pattern>
    <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect width="12" height="12" fill="#fff"/><circle cx="6" cy="6" r="2.2" fill="${O}"/>
    </pattern>
  </defs>
  ${cat('cat-a', 300)}
  ${cat('cat-b', 1140)}
  ${guy}
  ${gal}
</svg>`

/* ---------------------------------------------------------------- hero art */
export const swirlLeft = `
<svg viewBox="0 0 229 599" fill="none"><path d="M-12 40C120 58 206 160 152 262C112 338 22 300 62 230C104 158 206 242 192 362C180 470 62 524 -20 580" stroke="${O}" stroke-width="30"/></svg>`
export const swirlRight = `
<svg viewBox="0 0 354 487" fill="none"><path d="M372 24C206 30 118 136 186 220C246 292 322 212 262 160C190 98 88 200 140 300C190 398 300 420 380 466" stroke="${O}" stroke-width="30"/></svg>`

export const heroMarquee = (text) => {
  const unit = text.replace(/ /g, ' ')
  return `
<svg viewBox="0 0 1440 370" preserveAspectRatio="xMidYMid meet">
  <defs>
    <path id="hm-curve" d="M-80 300C300 340 520 150 760 168C1020 188 1200 92 1540 30" fill="none"/>
    <mask id="hm-mask" maskUnits="userSpaceOnUse">
      <path class="hm-mask-path" d="M-80 300C300 340 520 150 760 168C1020 188 1200 92 1540 30" stroke="#fff" stroke-width="220" stroke-linecap="round" fill="none"/>
    </mask>
  </defs>
  <path class="hm-bg" d="M-80 300C300 340 520 150 760 168C1020 188 1200 92 1540 30" stroke="${O}" stroke-width="154" stroke-linecap="round" fill="none"/>
  <g class="hm-text-group" mask="url(#hm-mask)">
    <text class="hm-text" fill="#F8EEE8" font-size="80" dominant-baseline="central">
      <textPath href="#hm-curve" class="hm-tp" startOffset="0"><tspan class="hm-unit">${unit}</tspan>${`<tspan>${unit}</tspan>`.repeat(7)}</textPath>
    </text>
  </g>
</svg>`
}

/* ----------------------------------------------------------- nav brush fill */
export const navBrush = `<svg viewBox="0 0 75 36" fill="none" preserveAspectRatio="none"><path d="M-6 26C12 6 22 34 38 16C52 2 60 30 82 10" stroke="currentColor" stroke-width="24" stroke-linecap="round"/></svg>`

export const arrow = `<svg viewBox="0 0 10 10" fill="none"><path d="M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`

/* ------------------------------------------------------- project card brush */
export const BRUSH_D = 'M30 760C30 760 150 1060 300 960C520 820 -150 190 100 50C330 -70 470 560 620 510C770 460 610 30 610 30'
export const cardBrush = (color) => `
<svg class="card-brush" viewBox="0 0 709 1012" preserveAspectRatio="xMidYMid slice" fill="none" style="color:${color}">
  <path d="${BRUSH_D}" stroke="currentColor" stroke-width="50" stroke-linecap="round"/>
</svg>`

/* ------------------------------------------------------------ service icons */
const ic = (inner) => `<svg viewBox="0 0 116 80" fill="none" class="svc-ic">${inner}</svg>`
export const serviceIcons = {
  whatsapp: ic(`<rect x="10" y="10" width="78" height="50" rx="22" fill="${O}"/><path d="M26 58L18 72L40 60Z" fill="${O}"/>
    <circle class="ic-dot d1" cx="34" cy="35" r="6" fill="#fff"/><circle class="ic-dot d2" cx="49" cy="35" r="6" fill="#fff"/><circle class="ic-dot d3" cx="64" cy="35" r="6" fill="#fff"/>
    <circle class="ic-pop" cx="96" cy="14" r="10" fill="${K}"/><text x="96" y="18.5" font-size="13" fill="#fff" text-anchor="middle" font-family="var(--font-body)" font-weight="700">1</text>`),
  linkedin: ic(`<g class="ic-bounce"><rect x="30" y="8" width="56" height="56" rx="12" fill="${K}"/><text x="58" y="50" font-size="34" fill="#fff" text-anchor="middle" font-family="var(--font-body)" font-weight="800">in</text></g>
    <path class="ic-send" d="M8 40L24 34L18 50Z" fill="${O}"/><path class="ic-send s2" d="M92 22L108 16L102 32Z" fill="${O}"/>`),
  call: ic(`<path class="ic-ring" d="M30 14C24 14 18 20 20 28C24 46 38 60 56 64C64 66 70 60 70 54L70 48L58 44L52 50C44 46 38 40 34 32L40 26L36 14Z" fill="${O}"/>
    <path class="ic-wave w1" d="M78 24Q88 34 78 44" stroke="${K}" stroke-width="5" stroke-linecap="round"/><path class="ic-wave w2" d="M88 16Q104 34 88 52" stroke="${K}" stroke-width="5" stroke-linecap="round"/>`),
  agent: ic(`<line x1="58" y1="6" x2="58" y2="16" stroke="${K}" stroke-width="4"/><circle class="ic-blink-bulb" cx="58" cy="6" r="5" fill="${O}"/>
    <rect x="26" y="16" width="64" height="50" rx="16" fill="${O}" stroke="${K}" stroke-width="4"/><rect x="36" y="26" width="44" height="30" rx="10" fill="#fdf8f5"/>
    <g class="ic-eyes"><circle cx="49" cy="41" r="5" fill="${K}"/><circle cx="67" cy="41" r="5" fill="${K}"/></g>`),
  saas: ic(`<rect x="12" y="8" width="92" height="64" rx="8" fill="#fdf8f5" stroke="${K}" stroke-width="4"/><path d="M12 22H104" stroke="${K}" stroke-width="4"/>
    <circle cx="22" cy="15" r="2.5" fill="${O}"/><circle cx="30" cy="15" r="2.5" fill="${K}"/>
    <rect class="ic-bar b1" x="28" y="36" width="12" height="28" fill="${O}"/><rect class="ic-bar b2" x="48" y="36" width="12" height="28" fill="${K}"/><rect class="ic-bar b3" x="68" y="36" width="12" height="28" fill="${O}"/>`),
  web: ic(`<rect x="8" y="8" width="84" height="56" rx="8" fill="${O}"/><rect x="18" y="20" width="40" height="8" rx="4" fill="#fff"/><rect x="18" y="34" width="28" height="8" rx="4" fill="#fff" opacity=".6"/>
    <path class="ic-cursor" d="M70 40L70 72L78 64L86 78L92 75L85 61L96 60Z" fill="${K}" stroke="#fff" stroke-width="2"/>`),
  system: ic(`${[0, 1, 2].map((c) => `<rect x="${12 + c * 32}" y="10" width="26" height="60" rx="6" fill="#fdf8f5" stroke="${K}" stroke-width="3"/>`).join('')}
    <rect class="ic-card k1" x="16" y="16" width="18" height="12" rx="3" fill="${O}"/><rect x="16" y="32" width="18" height="12" rx="3" fill="${K}"/><rect x="48" y="16" width="18" height="12" rx="3" fill="${K}"/><rect class="ic-card k2" x="80" y="16" width="18" height="12" rx="3" fill="${O}"/>`),
  code: ic(`<path class="ic-br l" d="M38 16L16 40L38 64" stroke="${O}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="ic-br r" d="M78 16L100 40L78 64" stroke="${O}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="ic-slash" d="M66 12L50 68" stroke="${K}" stroke-width="7" stroke-linecap="round"/>`),
}

/* ------------------------------------------------- mascot (faq / contact) */
export const bot = `
<svg viewBox="0 0 220 250" class="bot" fill="none">
  <line x1="110" y1="44" x2="110" y2="18" stroke="${K}" stroke-width="5" stroke-linecap="round"/>
  <circle class="bot-bulb" cx="110" cy="14" r="10" fill="${O}" stroke="${K}" stroke-width="5"/>
  <rect x="30" y="44" width="160" height="120" rx="36" fill="${O}" stroke="${K}" stroke-width="6"/>
  <rect x="52" y="64" width="116" height="78" rx="24" fill="#fdf8f5" stroke="${K}" stroke-width="5"/>
  <g class="bot-eyes"><ellipse cx="88" cy="100" rx="9" ry="13" fill="${K}"/><ellipse cx="132" cy="100" rx="9" ry="13" fill="${K}"/>
  <circle cx="91" cy="95" r="3" fill="#fff"/><circle cx="135" cy="95" r="3" fill="#fff"/></g>
  <path d="M98 122Q110 132 122 122" stroke="${K}" stroke-width="5" stroke-linecap="round"/>
  <rect x="16" y="84" width="16" height="40" rx="8" fill="${K}"/><rect x="188" y="84" width="16" height="40" rx="8" fill="${K}"/>
  <path d="M62 172h96a14 14 0 0 1 14 14v58h-124v-58a14 14 0 0 1 14-14Z" fill="${K}"/>
  <text x="110" y="216" text-anchor="middle" font-size="34" fill="${O}" class="display-svg">C3</text>
  <g class="bot-arm"><path d="M172 192q30-10 34-44" stroke="${K}" stroke-width="10" stroke-linecap="round"/><circle cx="206" cy="144" r="10" fill="${O}" stroke="${K}" stroke-width="5"/></g>
</svg>`

/* ------------------------------------------------------- contact transition */
export const contactStrokes = `
<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
  <path d="M-200 700C200 300 500 1000 900 500C1200 120 1400 500 1700 200" stroke="#F9E2E1" stroke-linecap="round"/>
  <path d="M1700 900C1200 600 900 1100 500 600C200 220 0 400 -260 100" stroke="#F9E2E1" stroke-linecap="round"/>
</svg>`

export const footerMark = (name) =>
  `<svg viewBox="0 0 1440 290" preserveAspectRatio="none" class="footer-mark"><text x="0" y="282" textLength="1440" lengthAdjust="spacingAndGlyphs" font-size="370" fill="#fdf8f5" class="display-svg">${name}</text></svg>`

/* ------------------------------------------------------------- about page */
export const aboutSwirl = `
<svg viewBox="0 0 492 789" fill="none"><path d="M520 40C330 30 200 150 260 270C310 370 430 300 390 220C340 120 170 200 190 360C210 520 420 520 400 640C385 730 250 760 120 780" stroke="${O}" stroke-width="30"/></svg>`

// One long stroke that winds through the story, then floods into the team panel.
export const storyPath = `
<svg viewBox="0 0 1440 3400" preserveAspectRatio="none" fill="none">
  <path d="M720 40C650 170 840 260 826 410C800 730 100 600 112 950C124 1290 1120 1140 1156 1700C1180 2080 760 2140 650 2330C560 2490 770 2610 840 2480C900 2360 720 2290 650 2470C590 2640 720 2900 720 3380" stroke="${O}" stroke-width="100" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
</svg>`

export const laptop = `
<svg viewBox="0 0 420 320" fill="none" class="laptop">
  <rect x="70" y="40" width="280" height="180" rx="14" fill="#fdf8f5" stroke="${K}" stroke-width="6"/>
  <rect x="88" y="58" width="244" height="144" rx="6" fill="${O}"/>
  <rect class="lp-line l1" x="108" y="80" width="120" height="12" rx="6" fill="#fdf8f5"/>
  <rect class="lp-line l2" x="108" y="104" width="170" height="12" rx="6" fill="#fdf8f5" opacity=".7"/>
  <rect class="lp-line l3" x="108" y="128" width="90" height="12" rx="6" fill="#fdf8f5" opacity=".7"/>
  <rect x="108" y="160" width="70" height="24" rx="12" fill="${K}"/>
  <path d="M30 226h360l-26 40H56Z" fill="#fdf8f5" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M180 240h60" stroke="${K}" stroke-width="5" stroke-linecap="round"/>
  <g class="lp-bubble b1"><rect x="300" y="6" width="104" height="46" rx="20" fill="#fff" stroke="${K}" stroke-width="5"/><text x="352" y="38" text-anchor="middle" font-size="22" fill="${O}">AI ✓</text></g>
  <g class="lp-bubble b2"><rect x="6" y="20" width="96" height="46" rx="20" fill="${K}"/><text x="54" y="52" text-anchor="middle" font-size="22" fill="#fdf8f5">BOT</text></g>
</svg>`

/* ------------------------------------------- designed project-card covers */
const cup = `
<svg viewBox="0 0 240 240" fill="none" class="cup">
  <path class="steam s1" d="M92 70C80 54 104 44 92 26" stroke="#fdf8f5" stroke-width="7" stroke-linecap="round"/>
  <path class="steam s2" d="M122 70C110 54 134 44 122 26" stroke="#fdf8f5" stroke-width="7" stroke-linecap="round"/>
  <path class="steam s3" d="M152 70C140 54 164 44 152 26" stroke="#fdf8f5" stroke-width="7" stroke-linecap="round"/>
  <path d="M52 92h140v44a62 62 0 0 1-62 62h-16a62 62 0 0 1-62-62Z" fill="${O}" stroke="${K}" stroke-width="6"/>
  <path d="M192 108h10a24 24 0 0 1 0 48h-16" stroke="${K}" stroke-width="10" stroke-linecap="round"/>
  <path d="M30 210h184" stroke="${K}" stroke-width="8" stroke-linecap="round"/>
  <text x="122" y="158" text-anchor="middle" font-size="44" fill="#fdf8f5">58</text>
</svg>`

// Diet By RD: a nutrition bowl with swaying leaves and a heartbeat line (no client screenshots: not public yet).
const bowl = `
<svg viewBox="0 0 260 240" fill="none" class="bowl">
  <path class="pulse" d="M14 40h56l12-22 16 44 14-30 10 8h124" stroke="#fdf8f5" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <g class="leaf l1"><path d="M96 126C74 104 80 76 108 70c10 26 6 44-12 56Z" fill="#8fd18a" stroke="${K}" stroke-width="5"/></g>
  <g class="leaf l2"><path d="M140 122c-6-30 12-52 40-48 2 28-12 44-40 48Z" fill="#5fb85a" stroke="${K}" stroke-width="5"/></g>
  <g class="leaf l3"><path d="M118 120c-8-24 2-46 22-56 10 22 4 42-22 56Z" fill="#b9e6a8" stroke="${K}" stroke-width="5"/></g>
  <circle cx="176" cy="112" r="16" fill="${O}" stroke="${K}" stroke-width="5"/>
  <circle cx="78" cy="116" r="12" fill="#ffd166" stroke="${K}" stroke-width="5"/>
  <path d="M40 120h180a8 8 0 0 1 8 9 98 98 0 0 1-98 81 98 98 0 0 1-98-81 8 8 0 0 1 8-9Z" fill="#fdf8f5" stroke="${K}" stroke-width="6"/>
  <text x="130" y="178" text-anchor="middle" font-size="40" fill="#1f7a55" class="display-svg">RD</text>
  <path d="M70 226h120" stroke="${K}" stroke-width="8" stroke-linecap="round"/>
</svg>`

const dashTiles = ['Patient', 'Dietitian', 'Doctor', 'Admin', 'Support', 'Intern']
  .map((t, i) => `<div class="ac-tile${i === 1 ? ' on' : ''}"><span></span>${t}</div>`).join('')

export const covers = {
  dietbyrd: {
    cover: `<div class="ac ac-rd"><div class="ac-top">Clinical nutrition<br>Health-tech · India</div>${bowl}<div class="ac-big">Diet By RD</div></div>`,
    hover: `<div class="ac ac-rd-h"><div class="ac-big">6 dashboards,<br>1 platform</div><div class="ac-tiles">${dashTiles}</div></div>`,
  },
  cnr58: {
    cover: `<div class="ac ac-cnr"><div class="ac-top">Cafe &amp; Restaurant<br>Concord · Sydney</div>${cup}<div class="ac-big">CNR58</div></div>`,
    hover: `<div class="ac ac-cnr-h"><div class="ac-big">Hospitality<br>CRM</div><div class="ac-top">Built for a Sydney café</div></div>`,
  },
}
