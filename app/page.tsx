import { twinIdentity } from "@/content/twin";
import { ProfessionalTwin } from "@/components/professional-twin";
import Link from "next/link";
import { EntryCard } from "@/components/entry-card";
import { ResumeLink } from "@/components/resume-link";
import { projectEntries } from "@/content/projects";
import { workEntries } from "@/content/work";

export default function Home() {
  const featuredWork = workEntries.find((entry) => entry.featured)!;
  const featuredProject = projectEntries.find((entry) => entry.featured)!;

  return (
    <>
      <section className="home-hero page-section">
        <p className="eyebrow">Toronto, Canada · Production Manager</p>
        <h1>Additive manufacturing leadership, built around real production.</h1>
        <div className="hero-copy">
          {twinIdentity.homeIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="button-row">
          <Link className="button button-primary" href="/about#contact">Contact</Link>
          <Link className="button button-secondary" href="/work">View selected work</Link>
        </div>
      </section>

      <section className="page-section two-column-intro">
        <div>
          <p className="eyebrow">From application to operation</p>
          <h2>Responsibility grew with the problems that needed solving.</h2>
        </div>
        <div className="prose-stack">
          {twinIdentity.homeProgression.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <Link className="text-link" href="/work">Explore my work →</Link>
        </div>
      </section>

      <section className="page-section feature-section">
        <p className="eyebrow">Featured professional work</p>
        <EntryCard href={`/work/${featuredWork.slug}`} eyebrow={featuredWork.status} title="The printer is not the starting point." summary="A successful additive application begins with the problem being addressed. Mechanical requirements, operating conditions, logistics, economics, design, material behaviour, post-processing, inspection, and quantity all influence whether an application is viable." note="Sample parts and concept validation help replace assumptions with direct evidence that can guide the design, process, and production plan." topics={featuredWork.topics} />
      </section>

      <section className="page-section feature-section project-feature">
        <p className="eyebrow">Featured independent project</p>
        <EntryCard href={`/projects/${featuredProject.slug}`} eyebrow={featuredProject.status} title={featuredProject.title} summary="UtilityOps was built to explore what AI could contribute to operational readiness decisions. It combines deterministic checks with indexed reference material and language-model interpretation to identify missing documents, blockers, and required actions in synthetic work-order packages." note="I defined the problem, data flow, examples, and test cases. AI coding assistance contributed substantially to the application architecture and code." topics={featuredProject.topics} />
      </section>

      <section className="page-section principle-section">
        <p className="eyebrow">For the love of learning</p>
        <blockquote>Questions have driven human progress and my own development. Learning begins by identifying gaps, taking apart assumptions, and rebuilding a clearer understanding of the whole.</blockquote>
        <Link className="text-link" href="/about">More about my approach →</Link>
      </section>

      <ProfessionalTwin />

      <section className="contact-band page-section" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s continue the conversation.</h2>
          <p>I am interested in conversations around additive manufacturing, production systems, technical implementation, and useful technology built around real operating problems.</p>
        </div>
        <div className="contact-links">
          <a href="mailto:alenpjose@gmail.com">alenpjose@gmail.com</a>
          <a href="https://www.linkedin.com/in/alenpjose" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/alenpjose" target="_blank" rel="noreferrer">GitHub ↗</a>
          <ResumeLink>Résumé ↓</ResumeLink>
        </div>
      </section>
    </>
  );
}
