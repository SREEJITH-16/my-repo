# Sreejith S — Portfolio

A personal portfolio site for **Sreejith S**, an aspiring Software Engineer &
Full-Stack Developer. Dark, red-and-black themed, with a hero, skills,
projects, certifications, and a working contact form.

**Sections:** Hero · About · Skills · Projects · Certifications & Achievements · Contact

## Tech stack

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) (React, SSR, file-based routing)
- [Tailwind CSS v4](https://tailwindcss.com/) with a small custom design-token system (see `src/styles.css`)
- [shadcn/ui](https://ui.shadcn.com/) components on top of [Radix UI](https://www.radix-ui.com/)
- [EmailJS](https://www.emailjs.com/) for the contact form
- Deploys as a [Cloudflare](https://developers.cloudflare.com/) worker via [Nitro](https://nitro.build/)

## Development

You'll need Node.js 20+.

```sh
npm install
npm run dev
```

The dev server runs at `http://localhost:8080`.

## Building

```sh
npm run build      # production build, output in .output/
npm run preview    # preview the production build locally
```

## Project structure

```
src/
  routes/        # pages (file-based routing) — index.tsx is the whole one-page site
  components/    # Nav, Reveal/Parallax/ScrollProgress animation helpers, CursorGlow, shadcn/ui primitives
  lib/           # small utilities (cn helper, error page/capture helpers)
  styles.css     # theme tokens (colors, fonts, custom animation utilities)
public/
  sreejith.png   # portrait used in the hero section
```

## Deployment

The build targets Cloudflare (via the `cloudflare-module` Nitro preset). To
deploy elsewhere, adjust the `nitro({ ... })` preset in `vite.config.ts` — see
the [Nitro deployment docs](https://nitro.build/deploy) for other targets
(Node, Vercel, Netlify, etc.).
"# Sreejith-Portfolio" 
