import type { Metadata } from "next";
import { EntryCard } from "@/components/entry-card";
import { workEntries } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Additive manufacturing leadership, application judgment, and production systems developed through operating experience.",
  openGraph: { title: "Work | Alen P. Jose", description: "Additive applications, production leadership, and operational systems." },
};

const progression = [
  { date: "July 2026 to present", title: "Production Manager", place: "Designfusion Inc.", paragraphs: ["The title is recent, but the responsibility developed over the preceding three years. I control production priorities and scheduling, staffing and shift planning, training, quality acceptance, maintenance and downtime, materials and inventory, and customer recovery or delivery commitments. Equipment and software purchases are recommended based on operating needs and approved by senior management.", "The operation produces more than 50,000 parts in a typical year under my control across multiple additive technologies. My responsibility is to put production plans in place, make sure they are followed, respond when conditions change, and improve the system when recurring problems expose a weakness."] },
  { date: "January 2021 to June 2026", title: "Applications Specialist", place: "Designfusion Inc.", paragraphs: ["I began with customer applications and quickly took on equipment troubleshooting and upkeep. Approximately six months into the role, I began handling nesting and end-to-end production work. About one year in, I received HP MJF field-service training and began supporting installations and on-site equipment recovery.", "The role included application evaluation, DFAM, slicing, printing, washing, sintering, troubleshooting, customer training, and installation for Markforged Metal X, along with experience across HP MJF, Markforged CFR, Formlabs resin and SLS, and Bambu FDM."] },
  { date: "January to April 2020", title: "Student Researcher", place: "ARIES Lab, Centennial College", paragraphs: ["At ARIES, I contributed to an aerospace-related DMLS research project using Altair Inspire. The work included technical documentation, topology-optimization support, checking FEA results against calculations, validation planning, and fixture or jig support.", "This introduced me to how software, engineering analysis, physical validation, and metal additive manufacturing come together in advanced applications."] },
];

export default function WorkPage() {
  return <>
    <header className="index-hero page-section"><p className="eyebrow">Professional work</p><h1>Work shaped by what production required.</h1><p className="lede">My experience developed through additive applications, equipment service, customer support, and the operation of a growing production floor. The work shown here focuses on the decisions, systems, and technical judgment that developed along that path.</p><p className="disclosure">Professional examples are generalized to protect customer, employer, and operating information.</p></header>
    <section className="page-section progression-section" aria-labelledby="progression-heading"><p className="eyebrow">Progression</p><h2 id="progression-heading">Responsibility widened with the work.</h2><div className="timeline">{progression.map((item) => <article key={item.title}><div><span>{item.date}</span><h3>{item.title}</h3><p>{item.place}</p></div><div>{item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>)}</div></section>
    <section className="page-section" aria-labelledby="case-studies-heading"><p className="eyebrow">Selected work</p><h2 id="case-studies-heading">Application and operating decisions in context.</h2><div className="card-grid">{workEntries.map((entry) => <EntryCard key={entry.slug} href={`/work/${entry.slug}`} eyebrow={entry.status} title={entry.title} summary={entry.summary} topics={entry.topics} />)}</div></section>
  </>;
}
