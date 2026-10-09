# ArunodoyOS — Portfolio

My portfolio, built as a small desktop operating system in the browser: draggable windows, a taskbar, genie animations and a frosted-glass desktop you can wipe clear with your cursor.

**Live:** https://arunodoy-os.netlify.app

## Apps

| App | What it does |
| --- | --- |
| Projects | Finder-style browser for my projects, with search, categories and grid/list views. Live projects open in a built-in browser window. |
| About Me | Bio, experience, skills, education and achievements |
| Resume | My resume PDF, with a download button |
| Mail | Writes an email to me in your own mail client |
| Settings | Wallpaper picker and frost toggle (saved in your browser) |
| GitHub / BuildC3 | Desktop shortcuts to my GitHub profile and buildc3.tech |

## Wallpapers

- **Smash** (default): original animated anime illustration of a jump smash on a sunset rooftop court, `public/wallpapers/anime-smash.svg`.
- **Spider-Man**: one-click swap with the button in the top-right corner (click again to go back), `public/wallpapers/spiderman.jpg`.
- Radiant Grid, Aurora, Midnight Dunes and Terminal are CSS-only and selectable in Settings.

Wallpapers are defined in `src/os/wallpapers.js`. The visitor's choice is saved in their browser; bump the storage key in `src/os/SettingsContext.jsx` when you change the default so returning visitors see it.

## Editing content

All personal details live in two files:

- `src/data/profile.js`: name, bio, links, skills, experience
- `src/data/projects.js`: projects (description, stack, live link, repo, icon, colours)

To replace the resume, swap `public/Arunodoy_Banerjee_Resume.pdf`.

## Run locally

```bash
npm install
npm run dev
```

## Deploy (Netlify)

`netlify.toml` already sets the build: `npm run build` → publish `dist`. Connect this repo in Netlify ("Add new site → Import an existing project") and deploy.

Built with React 19, Vite and lucide-react. The desktop-OS concept is inspired by [Om's portfolio](https://github.com/Omzee15/Maccy-Portfolio).
