# Portfolio — CLAUDE.md

## Project Overview

Personal portfolio website for Md Raihanul Islam Bhuiyan. Bold, creative design aesthetic.

- **Stack:** React 19 + Vite 8, JavaScript (no TypeScript)
- **Deploy target:** Vercel
- **Package manager:** npm

## Dev Commands

```bash
npm run dev       # Start local dev server (HMR)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

## Project Structure

```
src/
  App.jsx         # Root component
  App.css         # Component styles
  index.css       # Global styles / design tokens
  main.jsx        # React entry point
  assets/         # Images, SVGs
public/           # Static assets served at root (icons.svg, etc.)
```

## Design Principles

- Bold, creative, visually expressive — lean into strong typography, color, and motion
- Avoid generic/templated portfolio looks; prioritize personality and originality
- CSS is co-located: component styles in `App.css`, global tokens/resets in `index.css`

## Architecture Notes

- Single-page app, no router yet — add react-router-dom if multi-page routing is needed
- No state management library — keep component state local unless complexity demands more
- Assets imported directly in JSX (Vite handles hashing/optimization at build time)
- SVG icons served from `public/icons.svg` as a sprite sheet, referenced via `<use href="/icons.svg#icon-id">`

## Deployment (Vercel)

- Push to `main` triggers automatic Vercel deployment
- Build command: `npm run build`
- Output directory: `dist`
- No environment variables required currently
- If adding client-side routing later, add a `vercel.json` rewrite rule:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```

## Code Conventions

- Functional components only, hooks for state/effects
- Component files: PascalCase `.jsx`
- No PropTypes or TypeScript — keep it lightweight
- Inline styles only for truly dynamic values; prefer CSS classes otherwise


Resume is given below:

## About Me
- **Name:** Md Raihanul Islam Bhuiyan
- **Role:** AI Engineer
- **Tagline:** Building AI systems that work reliably in the real world
- **Location:** Sydney, NSW, Australia
- **Email:** raihanrifat222@gmail.com
- **Phone:** +61 419 113 835
- **LinkedIn:** https://linkedin.com/in/raihanrifat222
- **GitHub:** https://github.com/RaihanRifat222

## My Skills
- **Frontend:** React.js, TypeScript, JavaScript, HTML/CSS
- **Backend:** Python, FastAPI, REST APIs
- **AI & ML:** LLMs, RAG, agentic workflows, prompt engineering, model evaluation, NLP, OCR
- **Engineering:** NumPy, Pandas, Scikit-learn, PyTorch, SQL, data pipelines
- **Tools & Cloud:** Git, GitHub, CI/CD, AWS, Azure, Vercel, Hugging Face, VS Code

## My Projects
- **SmartCourse** — Agentic AI curriculum builder. Full-stack (FastAPI + React/TS), deployed on Vercel. https://smart-course-i378.vercel.app/
- **Agentic IT Support System** — Modular agentic AI system automating IT support workflows. Reduced steps to resolution by 35%. https://github.com/RaihanRifat222/Agentic_IT_Support
- **SpiritHelp** — Production RAG system deployed on Hugging Face. Zero out-of-scope responses across all test queries. https://huggingface.co/spaces/RaihanRifat222/SpiritHelp

## Work Experience
- **AI Engineer Intern @ Truuth Pty Ltd** (Jul–Nov 2025) — Built AI pipelines for identity verification, reduced processing time by 40%, cut error rates by 15% over 8 weeks
- **After School Facilitator @ CodeCamp** (May 2024–Present) — Teaching coding to students, 40+ sessions, 95%+ attendance

## Education
- Master of IT (Artificial Intelligence) — Macquarie University, Sydney (Feb 2024 – Nov 2025)
- BSc Computer Science — BRAC University, Dhaka (2020–2023)

## Research
- Published: *Segmentation of Bangla Compound Characters using YOLOv8* on ResearchGate