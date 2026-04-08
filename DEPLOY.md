# Deployment Guide

## Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to Vercel at vercel.com
3. Vercel auto-detects Next.js — deploy with one click

## Option 2: GitHub Pages

1. Push to `main` branch
2. Go to repo Settings → Pages → Source: GitHub Actions
3. The workflow at `.github/workflows/deploy.yml` runs automatically

## Before Deploying

Fill in these placeholders:

### Contact info
Edit `src/app/[locale]/contact/page.tsx`:
```
const CONTACT = {
  email: 'YOUR_REAL_EMAIL',
  wechat: 'YOUR_WECHAT_ID',
  github: 'https://github.com/YOUR_USERNAME',
}
```

### Resume PDFs
Add to `public/assets/`:
- `resume-zh.pdf` — Chinese resume
- `resume-en.pdf` — English resume

### NPC Images (AI-generated)
Add to `public/assets/npc/`:
- `ringbell.png` — Cat NPC for home page
- `duoduo.png` — Parrot NPC for resume page
- `xiaoke.png` — Parrot NPC for projects page
- `beer.png` — Parrot NPC for portfolio page

### Hero Avatar
Add `public/assets/images/hero-avatar.png`

### Portfolio Works
Add images/videos to `public/assets/portfolio/`
Then edit `src/app/[locale]/portfolio/page.tsx`:
```
const portfolioItems: GalleryItem[] = [
  { type: 'image', src: '/assets/portfolio/work1.jpg', alt: 'AI art 1' },
  { type: 'video', src: '/assets/portfolio/video1.mp4', alt: 'Video 1' },
]
```

### Work Experience
Edit `src/components/sections/resume/TimelineSection.tsx` with real company names and experience.

### Projects
Edit `src/app/[locale]/projects/page.tsx` with real project details and links.
