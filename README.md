# ArunodoyOS — Portfolio

My portfolio, built as a small desktop operating system in the browser: draggable windows, a taskbar, genie animations and a frosted-glass desktop you can wipe clear with your cursor.

**Live:** _add Netlify URL here_

## Apps

| App | What it does |
| --- | --- |
| Projects | Finder-style browser for my projects, with search, categories and grid/list views. Live projects open in a built-in browser window. |
| About Me | Bio, experience, skills, education and achievements |
| Resume | My resume PDF, with a download button |
| Mail | Writes an email to me in your own mail client |
| Settings | Wallpaper picker and frost toggle (saved in your browser) |

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

Default wallpaper adapted from ["Prepare To Smash!"](https://commons.wikimedia.org/wiki/File:Lee_Chong_Wei_Prepares_To_Smash.jpg) by Antony Stanley, licensed [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) (extended to widescreen with a blurred fill).

Built with React 19, Vite and lucide-react. The desktop-OS concept is inspired by [Om's portfolio](https://github.com/Omzee15/Maccy-Portfolio).
