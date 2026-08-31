import Link from "next/link";

export function EntryCard({
  href,
  eyebrow,
  title,
  summary,
  topics,
  note,
}: {
  href?: string;
  eyebrow: string;
  title: string;
  summary: string;
  topics: string[];
  note?: string;
}) {
  const content = (
    <>
      <p className="card-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{summary}</p>
      {note && <p className="card-note">{note}</p>}
      <ul className="topic-list" aria-label="Topics">
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      {href && <span className="card-link">Read more →</span>}
    </>
  );

  return href ? (
    <Link className="entry-card" href={href}>
      {content}
    </Link>
  ) : (
    <article className="entry-card entry-card-static">{content}</article>
  );
}
