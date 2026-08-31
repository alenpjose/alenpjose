import type { Metadata } from "next";
import { ResumeLink } from "@/components/resume-link";

export const metadata: Metadata = { title: "About", description: "Alen P. Jose's engineering background, learning philosophy, leadership approach, and credentials.", openGraph: { title: "About | Alen P. Jose", description: "Engineering background, learning philosophy, and leadership approach." } };

const credentials = [
  ["Bachelor of Engineering, Mechanical Engineering", "MG University · WES Canadian equivalency"],
  ["Mechanical Engineering Technology: Design", "Centennial College · High Honours"],
  ["HP Multi Jet Fusion Field Service Engineer", "Equipment service and installation"],
  ["Certified SolidWorks Associate", "Mechanical design foundation"],
  ["Data Science Foundations", "DSI, University of Toronto"],
  ["SPIN Selling", "Formal training through Huthwaite"],
];

export default function AboutPage() {
  return <>
    <article className="about-page page-section"><header><p className="eyebrow">About</p><h1>For the love of learning.</h1></header><div className="about-prose"><p>Questions have driven humanity toward progress, and they have had the same effect on me as an individual. Learning, whether it is needed to adapt, improve, correct, or absorb something unfamiliar, remains a basic driver of progress.</p><p>When I encounter something I do not understand, I begin by identifying the gaps. This often means taking apart assumptions, understanding what is missing, and rebuilding the pieces into a clearer view of the whole. Making a tool run is useful, but understanding why it works, where it fails, and when it should not be used matters more.</p><p>My mechanical-engineering background shaped how I approach physical systems and technical requirements. Additive manufacturing connected that foundation with design, materials, equipment, post-processing, production planning, customer education, and operating judgment. Software and AI are becoming additional ways to work on those systems, not replacements for understanding them.</p><p>It is easy for a documented process to drift away from the way work is actually performed. I try to identify those points through observation and introspection, then improve the system recursively until it reflects the real flow. That approach applies to machines, workflows, people, and organizations.</p></div></article>
    <section className="page-section" aria-labelledby="credentials-heading"><p className="eyebrow">Background</p><h2 id="credentials-heading">Education and professional development.</h2><div className="credentials-grid">{credentials.map(([title, note]) => <div key={title}><strong>{title}</strong><span>{note}</span></div>)}</div></section>
    <section className="contact-band page-section" id="contact"><div><p className="eyebrow">Contact</p><h2>Let&apos;s continue the conversation.</h2><p>I am interested in conversations around additive manufacturing, production systems, technical implementation, and useful technology built around real operating problems.</p></div><div className="contact-links"><a href="mailto:alenpjose@gmail.com">alenpjose@gmail.com</a><a href="https://www.linkedin.com/in/alenpjose" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/alenpjose" target="_blank" rel="noreferrer">GitHub ↗</a><ResumeLink>Résumé ↓</ResumeLink></div></section>
  </>;
}
