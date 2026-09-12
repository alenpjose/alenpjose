import { twinIdentity } from "@/content/twin";
import type { Metadata } from "next";
import { ResumeLink } from "@/components/resume-link";

export const metadata: Metadata = { title: "About", description: "Alen P. Jose's engineering background, learning philosophy, leadership approach, and credentials.", openGraph: { title: "About | Alen P. Jose", description: "Engineering background, learning philosophy, and leadership approach." } };

export default function AboutPage() {
  return <>
    <article className="about-page page-section"><header><p className="eyebrow">About</p><h1>For the love of learning.</h1></header><div className="about-prose">{twinIdentity.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>
    <section className="page-section" aria-labelledby="credentials-heading"><p className="eyebrow">Background</p><h2 id="credentials-heading">Education and professional development.</h2><div className="credentials-grid">{twinIdentity.credentials.map(([title, note]) => <div key={title}><strong>{title}</strong><span>{note}</span></div>)}</div></section>
    <section className="contact-band page-section" id="contact"><div><p className="eyebrow">Contact</p><h2>Let&apos;s continue the conversation.</h2><p>I am interested in conversations around additive manufacturing, production systems, technical implementation, and useful technology built around real operating problems.</p></div><div className="contact-links"><a href="mailto:alenpjose@gmail.com">alenpjose@gmail.com</a><a href="https://www.linkedin.com/in/alenpjose" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/alenpjose" target="_blank" rel="noreferrer">GitHub ↗</a><ResumeLink>Résumé ↓</ResumeLink></div></section>
  </>;
}
