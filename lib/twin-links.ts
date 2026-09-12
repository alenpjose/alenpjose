export const twinPrompt = "Read https://alenpjose.ca/twin.md and act as an AI representation of Alen P. Jose's professional profile. Answer only from that document, tell me when something isn't covered, and don't claim to be Alen. Start by asking me what I'd like to know about his additive manufacturing, production, and AI work.";

// Claude's undocumented q parameter may change. Set this to null to hide the link.
export const claudePromptBase: string | null = "https://claude.ai/new?q=";

export const twinAssistantLinks = [
  { label: "Open in ChatGPT", href: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(twinPrompt)}` },
  ...(claudePromptBase ? [{ label: "Open in Claude", href: `${claudePromptBase}${encodeURIComponent(twinPrompt)}` }] : []),
];
