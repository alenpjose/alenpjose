import { twinIdentity } from "@/content/twin";
import type { Metadata } from "next";
import { EntryCard } from "@/components/entry-card";
import { workEntries } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Additive manufacturing leadership, application judgment, and production systems developed through operating experience.",
  openGraph: { title: "Work | Alen P. Jose", description: "Additive applications, production leadership, and operational systems." },
};

export default function WorkPage() {
  return <>
    <header className="index-hero page-section"><p className="eyebrow">Professional work</p><h1>Work shaped by what production required.</h1><p className="lede">My experience developed through additive applications, equipment service, customer support, and the operation of a growing production floor. The work shown here focuses on the decisions, systems, and technical judgment that developed along that path.</p><p className="disclosure">Professional examples are generalized to protect customer, employer, and operating information.</p></header>
    <section className="page-section progression-section" aria-labelledby="progression-heading"><p className="eyebrow">Progression</p><h2 id="progression-heading">Responsibility widened with the work.</h2><div className="timeline">{twinIdentity.progression.map((item) => <article key={item.title}><div><span>{item.date}</span><h3>{item.title}</h3><p>{item.place}</p></div><div>{item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}</div></section>
    <section className="page-section" aria-labelledby="case-studies-heading"><p className="eyebrow">Selected work</p><h2 id="case-studies-heading">Application and operating decisions in context.</h2><div className="card-grid">{workEntries.map((entry) => <EntryCard key={entry.slug} href={`/work/${entry.slug}`} eyebrow={entry.status} title={entry.title} summary={entry.summary} topics={entry.topics} />)}</div></section>
  </>;
}
