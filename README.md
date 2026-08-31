# Alen P. Jose

I am an additive manufacturing production leader who translates shop-floor constraints and customer requirements into clear system needs. My work connects operating judgment with process improvement, software, automation, and a developing practical knowledge of AI systems.

My experience spans additive application discovery, DFAM, equipment service, production planning, quality, maintenance, post-processing, and the systems used to control work on the floor. I learn by building and testing, with an emphasis on understanding where a tool is useful, where it fails, and what should remain deterministic or human-reviewed.

[Portfolio](https://alenpjose.ca) · [Selected work](https://alenpjose.ca/work) · [Projects](https://alenpjose.ca/projects) · [Résumé](https://alenpjose.ca/resume.pdf) · [LinkedIn](https://www.linkedin.com/in/alenpjose)

## About this repository

This repository contains the source for [alenpjose.ca](https://alenpjose.ca). It is a statically generated Next.js App Router site deployed to Vercel from `main`, with Vercel Web Analytics enabled.

Professional case studies are maintained as typed entries in `content/work.ts`. Independent projects and explorations are maintained in `content/projects.ts`. These entries record maturity, evidence boundaries, AI involvement, revision dates, and current limits without forcing every field onto the public page.

## Development

The project requires Node.js 22.x and npm. Install the reviewed lockfile with lifecycle scripts disabled, then start the development server:

```bash
npm ci --ignore-scripts
npm run dev
```

Run the verification suite before opening a pull request:

```bash
npm run typecheck
npm run lint
npm test
```

`npm test` creates a production build and checks every public route, invalid slugs, the résumé, and removed legacy routes.

## Content, résumé, and deployment

Edit approved work and project content in the `content` directory rather than duplicating substantive copy inside route components. Public media belongs in `public/assets` and must be employer-approved or sanitized.

The approved résumé is stored at `public/resume.pdf` and served directly from `/resume.pdf`. Replace that file with an approved PDF using the same repository filename, then verify the route and the visible download links on desktop and mobile.

Pull requests receive Vercel preview deployments. Merges to `main` create production deployments for `alenpjose.ca`; `www.alenpjose.ca` redirects to the canonical hostname.
