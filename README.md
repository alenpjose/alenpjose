# Alen P. Jose Portfolio

Portfolio website for Alen P. Jose. The application runs as a native Next.js App Router project and is deployed to Vercel.

## Requirements

- Node.js 22.x
- npm (included with Node.js)

## Local development

Install the exact dependency versions recorded in `package-lock.json`:

```bash
npm ci --ignore-scripts
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Verification

Run the checks independently:

```bash
npm run typecheck
npm run lint
npm run build
```

The smoke test builds and starts the production application, then checks every public route, invalid slugs, the résumé, and the removed Settings route:

```bash
npm test
```

To run the production server after a successful build:

```bash
npm run start
```

## Vercel deployment

Import this GitHub repository into Vercel and keep the framework preset set to Next.js. Vercel detects the build and output settings automatically.

The project is pinned to Node.js 22.x through `package.json`. Preview deployments are created from pull requests and production deployments are created from the configured production branch.

Do not attach or change the `alenpjose.ca` custom domain until the generated Vercel production URL has been opened and verified.

## Web Analytics

The root layout includes Vercel Web Analytics through `@vercel/analytics`. After creating the Vercel project:

1. Open the project in Vercel.
2. Open **Analytics**.
3. Enable Web Analytics.
4. Redeploy the project.
5. Confirm a request to Vercel's Analytics endpoint appears on the deployed site.

The former Cloudflare Worker, D1 visitor database, private Settings page, and ChatGPT Sites authentication are not part of this application.

## Résumé

The public résumé is stored at `public/resume.pdf` and is served directly at `/resume.pdf`.

To replace it, export the approved résumé as a PDF, keep the repository filename as `public/resume.pdf`, and verify the route on desktop and mobile. The download link can present a more descriptive filename to visitors without changing the public route.

The repository intentionally stores only the approved PDF. Résumé generation is kept outside the website build so Vercel does not require document-generation dependencies.

## Portfolio content

Professional case studies are stored as typed entries in `content/work.ts`. Independent projects and explorations are stored in `content/projects.ts`.

Each entry records its maturity, evidence boundary, AI involvement, revision date, and optional limits or next test. Edit these source entries rather than duplicating substantive copy inside route components. Work and project detail routes are statically generated from entries that have approved public detail pages.

The repository-based MDX writing system and the “Observations and Opinions” navigation item are planned as a separate change.
