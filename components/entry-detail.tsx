import { EntryMedia } from "./entry-media";
import type { ProjectEntry, WorkEntry } from "@/content/types";

export function EntryDetail({ entry }: { entry: WorkEntry | ProjectEntry }) {
  const confidentialityNote =
    "confidentialityNote" in entry ? entry.confidentialityNote : undefined;

  return (
    <>
      <header className="detail-hero">
        <p className="eyebrow">{entry.status}</p>
        <h1>{entry.title}</h1>
        <p className="lede">{entry.summary}</p>
        <dl className="detail-facts">
          {"role" in entry && (
            <div>
              <dt>My role</dt>
              <dd>{entry.role}</dd>
            </div>
          )}
          <div>
            <dt>Evidence</dt>
            <dd>{entry.evidenceLevel}</dd>
          </div>
          <div>
            <dt>AI involvement</dt>
            <dd>{entry.aiInvolvement}</dd>
          </div>
        </dl>
      </header>

      {entry.media && <EntryMedia media={entry.media} />}

      <div className="detail-body">
        {entry.sections.map((section, index) => (
          <section key={`${section.heading ?? "introduction"}-${index}`}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.questions && (
              <ul className="question-list">
                {section.questions.map((question) => <li key={question}>{question}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>

      {(confidentialityNote || entry.currentLimits || entry.nextTest) && (
        <aside className="limits-panel">
          {confidentialityNote && <p>{confidentialityNote}</p>}
          {entry.currentLimits && <p><strong>Current limits:</strong> {entry.currentLimits}</p>}
          {entry.nextTest && <p><strong>Next test:</strong> {entry.nextTest}</p>}
        </aside>
      )}

      {"repository" in entry && entry.repository && (
        <p className="detail-action">
          <a href={entry.repository} target="_blank" rel="noreferrer">View the public repository ↗</a>
        </p>
      )}
    </>
  );
}
