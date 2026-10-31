# Thithiksha A — Portfolio

Personal portfolio built with React, Vite and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

## Edit content

All text, links, projects, skills and achievements are in [`src/data/portfolio.js`](src/data/portfolio.js).
The profile photo is `public/images/profile.jpg` and the resume is `public/Thithiksha_A_Resume.pdf` — replace those files to update them.

## Deploy (Render)

The repo includes a [`render.yaml`](render.yaml) Blueprint for a static site.

1. Push this folder to a GitHub repository.
2. In the Render dashboard choose **New → Blueprint**, connect the repository and apply it.

Render runs `npm ci && npm run build` and serves `dist/`. Every push to the main branch redeploys automatically.

The contact form uses FormSubmit: after the first deploy, send one message from the live site and click **Activate Form** in the email that arrives.
