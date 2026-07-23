# Personal Portfolio

My personal portfolio site — experience, projects, and how I think about
building software. Built with Next.js and deployed on Vercel.

**Live:** https://my-portfolio-chuyu-yans-projects.vercel.app

## Highlights

- **Server-rendered** with the Next.js App Router (React + TypeScript).
- **Light / dark mode** with a class-based theme provider and toggle.
- **Custom architecture diagrams** (multi-agent, code-search) rendered as
  React components, not static images.
- **Scroll-driven animations** — reveal-on-scroll and a reading-progress bar.
- **Responsive** down to mobile, with a hamburger nav.
- Content (experience, projects) is **data-driven** from typed sources in
  `data/`, so the site is easy to keep current.

## Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Vercel

## Structure

```
app/          # Routes: home, experience, projects, contact
components/    # UI, layout, theme, and diagram components
data/          # Typed experience + project content
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

`npm run build` produces the production build; the site auto-deploys from
`main` via Vercel.
