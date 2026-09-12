# Alen P. Jose

I am an additive manufacturing production leader who translates shop-floor constraints and customer requirements into clear system needs. My work connects operating judgment with process improvement, software, automation, and a developing practical knowledge of AI systems.

My experience spans additive application discovery, DFAM, equipment service, production planning, quality, maintenance, post-processing, and the systems used to control work on the floor. I learn by building and testing, with an emphasis on understanding where a tool is useful, where it fails, and what should remain deterministic or human-reviewed.

[Portfolio](https://alenpjose.ca) · [Selected work](https://alenpjose.ca/work) · [Projects](https://alenpjose.ca/projects) · [Résumé](https://alenpjose.ca/resume.pdf) · [LinkedIn](https://www.linkedin.com/in/alenpjose)

## About this repository

This repository contains the source for [alenpjose.ca](https://alenpjose.ca). It is a statically generated Next.js App Router site deployed to Vercel from `main`, with Vercel Web Analytics enabled.

Builds use Next.js static export (`out/`). `npm start` serves that export locally for preview; it is not a deployed backend. Images are served as static assets.

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

## Professional twin

The home-page section opens the visitor's own ChatGPT or Claude with a visible prompt. Assistant behaviour varies: in the 2026-09-12 browser check, Claude prefilled the composer while ChatGPT immediately began a response. The section explains this before the links and exposes the exact prompt for review. There is no client-side auto-submit code, model API call, key, added dependency, or new third-party script. The existing Vercel Analytics integration is unchanged.

`scripts/build-twin.ts` runs during `prebuild` and `predev` using Node 22's type stripping. It generates `public/twin.md` and `public/llms.txt`, which are ignored by Git and copied into the export. It reads only `content/work.ts`, `content/projects.ts`, and `content/twin.ts`; no résumé extraction or component parsing occurs at build time.

The home intro and progression paragraphs originally lived in `app/page.tsx`; the role history in `app/work/page.tsx`; and the About prose and credentials in `app/about/page.tsx`. They now live, unchanged, in `twinIdentity` in `content/twin.ts`, shared by those pages and the generator. Work and project prose remains in its original typed modules. Alen separately approved correcting Odoo to Phasio in the workflow case study and updating its revision date.

Alen approved all six reasoning heuristics after the extract/interview review in this task: all six have extract support, five were refined through the interview, and one is extract-only. He separately approved the coding-development statement and requested evidence-grounded recruiter role-fit answers. Source identifiers and interview dates are recorded in comments; the raw extract is not stored here. The source extract's creation date was not supplied, so the comment records its receipt date instead. The renderer also supports an empty heuristic array.

The profile is 3,568 whitespace-delimited words at introduction. Tests check disclosure, rules, every entry heading, full prose and evidence boundaries, project maturity, the empty-heuristic case, generated/exported agreement, and exact visible deep-link prompts. The route suite requires every exported HTML page to be registered and checks `/twin.md` and `/llms.txt` over HTTP.

`lib/twin-links.ts` owns the exact prompt and a single `claudePromptBase` constant. Claude's `q` parameter is undocumented; replace that constant or set it to `null` to hide the Claude link. The section exposes the full prompt and profile as a manual fallback. Link prefilling and web retrieval depend on the visitor's assistant, account, and web access.

Preview validation must distinguish opening/prefilling from fetching the canonical profile: before this PR is merged, `https://alenpjose.ca/twin.md` may not exist. A preview URL can verify the generated artifact, but cannot establish that an assistant fetched the production URL. Record the actual browser outcomes and test date in the PR; do not mark blocked checks as passed.

## Content, résumé, and deployment

Edit approved work and project content in the `content` directory rather than duplicating substantive copy inside route components. Public media belongs in `public/assets` and must be employer-approved or sanitized.

The approved résumé is stored at `public/resume.pdf` and served directly from `/resume.pdf`. Replace that file with an approved PDF using the same repository filename, then verify the route and the visible download links on desktop and mobile.

Pull requests receive Vercel preview deployments. Merges to `main` create production deployments for `alenpjose.ca`; `www.alenpjose.ca` redirects to the canonical hostname.
