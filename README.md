# Sadaf Iqbal — Portfolio (React)

A premium, interactive rebuild of Sadaf Iqbal's web developer portfolio.
Built with **React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion**.

All real content (projects, skills, bio, journey, credentials, contact info)
was carried over as-is — only the UI/UX and interactions are new:

- Animated hero with text reveal, mouse-parallax floating elements
- Scroll-triggered reveals across every section
- Interactive project cards (hover scale, reveal buttons) + one large featured card
- A pinned, scroll-scrubbed "In focus" walkthrough for the flagship project
- Flip-card About section (click the code icon to flip)
- Journey timeline with a hover-to-reveal illustrated path
- Hoverable, color-coded Skills grid
- Sticky/blurred navbar with an animated active-section indicator and mobile menu
- Fully responsive (mobile, tablet, desktop)

## Run it locally

```bash
npm install
npm run dev
```

Open the printed `http://localhost:5173` URL.

## Build for production

```bash
npm run build
npm run preview   # to sanity-check the production build locally
```

The production files land in `dist/`.

## Deploy (VSCode → GitHub → Vercel)

1. Open this folder in VSCode.
2. Initialize git and push to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com) → **New Project** → import that GitHub repo.
4. Vercel auto-detects Vite — leave the defaults (Build command `npm run build`,
   Output directory `dist`) and click **Deploy**.

## Project structure

```
src/
  assets/projects/   real project screenshots
  data/content.ts    all real content in one typed file (edit text/links here)
  components/        one component per section
  App.tsx            assembles the page
  index.css          theme tokens + Tailwind
```

To change any text, project, skill or link, edit `src/data/content.ts` —
nothing else needs to change.
