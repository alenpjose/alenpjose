"use client";

import { useState } from "react";
import { twinStarterQuestions } from "@/content/twin";
import { twinAssistantLinks, twinPrompt } from "@/lib/twin-links";

export function ProfessionalTwin() {
  const [copyStatus, setCopyStatus] = useState("");

  async function copyText(value: string, success: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(success);
    } catch {
      setCopyStatus("Copy failed. Open the source profile below and copy it manually.");
    }
  }

  async function copyPromptAndProfile() {
    try {
      const response = await fetch("/twin.md");
      if (!response.ok) throw new Error("Profile unavailable");
      const profile = await response.text();
      await copyText(`${twinPrompt}\n\n--- BEGIN SOURCE PROFILE ---\n\n${profile}\n--- END SOURCE PROFILE ---`, "Prompt and profile copied. Open an assistant, paste, and send.");
    } catch {
      setCopyStatus("The full profile could not be copied. Open the source profile below and copy it manually.");
    }
  }

  return (
    <section className="page-section twin-section" id="professional-twin" aria-labelledby="twin-heading">
      <p className="eyebrow">Professional profile · Beta</p>
      <h2 id="twin-heading">Explore my work and approach with your AI.</h2>
      <p className="lede">Ask about my professional experience, how I approach problems, and the evidence behind the work shown here. Explore how that experience relates to a role, including areas I am developing.</p>
      <p>This is a beta feature. For ChatGPT, copy the full profile, open the assistant, then paste and send it. Claude opens with the prompt prefilled; use the full-copy option if it cannot read the website.</p>
      <div className="twin-copy-actions" aria-label="Copy options">
        <button className="button button-primary" type="button" onClick={copyPromptAndProfile}>Copy prompt + profile</button>
        <button className="button button-secondary" type="button" onClick={() => copyText(twinPrompt, "Prompt copied. Web access is required for the assistant to read the profile.")}>Copy prompt only</button>
      </div>
      <p className="twin-note">“Prompt only” depends on the assistant being able to access alenpjose.ca and may not work reliably.</p>
      <div className="button-row" aria-label="Open an AI assistant">
        {twinAssistantLinks.map(({ label, href }) => (
          <a className="button button-secondary" key={label} href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a>
        ))}
      </div>
      <p className="twin-copy-status" role="status" aria-live="polite">{copyStatus}</p>
      <p className="twin-note">You may need to sign in. The assistant is an AI representation, not Alen.</p>
      <p>You can ask:</p>
      <ul className="twin-questions">{twinStarterQuestions.map((question) => <li key={question}>{question}</li>)}</ul>
      <details className="twin-prompt">
        <summary>Read the prompt and source profile</summary>
        <p>{twinPrompt}</p>
        <a className="text-link" href="/twin.md">Read the source profile →</a>
        <p>The full-copy option includes this prompt and the generated source profile in one paste.</p>
      </details>
    </section>
  );
}
