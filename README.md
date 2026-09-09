# RAW Holdings website

A multi-route editorial website redesign for RAW Holdings LLC, built to explain the firm’s public-sector infrastructure support clearly and support procurement review.

## Design direction

“RAW / Coordinated Delivery” pairs restrained public-infrastructure photography, technical linework, strong typography and structured chapter navigation. The experience is deliberately professional and readable with motion disabled; it uses no WebGL or 3D libraries.

## Stack

- Vinext / Next.js App Router, React and TypeScript
- Tailwind CSS plus custom responsive styling
- GSAP ScrollTrigger for the desktop capability chapter stage
- Base UI/shadcn tabs for the accessible audience selector
- Zod for contact-form validation

## Setup

```bash
npm install
npm run dev
```

Validation: `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.

## Content and media

Business facts live in `src/content`. Replace media through `src/content/media.ts` without redesigning components. The generated hero is demo editorial imagery; the project use is explicitly labeled pending client approval. See `MEDIA_REPLACEMENT_GUIDE.md` and `MEDIA_PROVENANCE.md`.

## Form, accessibility, SEO and deployment

The contact form runs in demo mode: it validates locally and does not claim delivery. The site includes semantic landmarks, a skip link, visible focus, keyboard-operable tabs, reduced-motion support, metadata, sitemap, robots, Organization-oriented copy and print CSS for the capability statement. Sites deployment configuration is in `.openai/hosting.json`.
