export const twinPrompt = "Use https://alenpjose.ca/twin.md?v=2 and public pages on https://alenpjose.ca to answer as an AI representation of Alen P. Jose's professional profile. Answer only from these sources, cite the pages you use, and don't claim to be Alen. If a source is unavailable, say so and use the others. When information is missing, acknowledge the gap naturally and point me to a relevant portfolio page or suggest contacting alenpjose@gmail.com. Start by asking what I'd like to know about his additive manufacturing, production, and AI work.";

// Claude's undocumented q parameter currently prefills reliably. Set this to null to fall back to a plain link.
export const claudePromptBase: string | null = "https://claude.ai/new?q=";

export const twinAssistantLinks = [
  { label: "Open ChatGPT", href: "https://chatgpt.com/" },
  { label: "Open Claude", href: claudePromptBase ? `${claudePromptBase}${encodeURIComponent(twinPrompt)}` : "https://claude.ai/new" },
];
