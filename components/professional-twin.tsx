import { twinStarterQuestions } from "@/content/twin";
import { twinAssistantLinks, twinPrompt } from "@/lib/twin-links";

export function ProfessionalTwin() {
  return (
    <section className="page-section twin-section" id="professional-twin" aria-labelledby="twin-heading">
      <p className="eyebrow">Professional profile</p>
      <h2 id="twin-heading">Explore my work and approach with your AI.</h2>
      <p className="lede">Ask about my professional experience, how I approach problems, and the evidence behind the work shown here. Explore how that experience relates to a role, including areas I am developing.</p>
      <div className="button-row">
        {twinAssistantLinks.map(({ label, href }) => (
          <a className="button button-secondary" key={label} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>
        ))}
      </div>
      <p className="twin-note">You need to be signed in with web access enabled; the assistant is an AI representation, not Alen.</p>
      <p>Review and send the prompt in your assistant. You can ask:</p>
      <ul className="twin-questions">{twinStarterQuestions.map((question) => <li key={question}>{question}</li>)}</ul>
      <details className="twin-prompt">
        <summary>Read the prompt and source profile</summary>
        <p>{twinPrompt}</p>
        <a className="text-link" href="/twin.md">Read the source profile →</a>
        <p>If the prompt does not prefill, copy the text above. If your assistant cannot read the link, paste the source profile into the conversation.</p>
      </details>
    </section>
  );
}
