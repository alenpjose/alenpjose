import { workEntries } from "../content/work.ts";
import { projectEntries } from "../content/projects.ts";
import { twinIdentity, twinHeuristics } from "../content/twin.ts";
import type { ContentSection, WorkEntry, ProjectEntry } from "../content/types.ts";

// Sources are plain text today. Keep future inline HTML out of the public Markdown.
function plain(value: string): string {
  return value.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#(?:39|x27);/g, "'").trim();
}

function sections(body: ContentSection[]): string[] {
  return body.flatMap((section) => [
    ...(section.heading ? [`#### ${plain(section.heading)}`] : []),
    ...(section.paragraphs ?? []).map(plain),
    ...(section.questions?.length ? [section.questions.map((question) => `- ${plain(question)}`).join("\n")] : []),
  ]);
}

function entryBody(entry: WorkEntry | ProjectEntry): string[] {
  return [
    plain(entry.summary),
    ...("role" in entry ? [`**My role:** ${plain(entry.role)}`] : []),
    `**Evidence:** ${plain(entry.evidenceLevel)}`,
    ...("confidentialityNote" in entry && entry.confidentialityNote ? [`**Evidence boundary:** ${plain(entry.confidentialityNote)}`] : []),
    `**AI involvement:** ${plain(entry.aiInvolvement)}`,
    `**Revision date:** ${entry.revisionDate}`,
    ...sections(entry.sections),
    ...(entry.currentLimits ? [`**Current limits:** ${plain(entry.currentLimits)}`] : []),
    ...(entry.nextTest ? [`**Next test:** ${plain(entry.nextTest)}`] : []),
    ...("repository" in entry && entry.repository ? [`**Repository:** ${entry.repository}`] : []),
    `**Tags:** ${entry.topics.map(plain).join(", ")}`,
  ];
}

export function renderTwin(date: string, heuristics = twinHeuristics): string {
  const identity = twinIdentity;
  return [
    `# ${identity.name} — Professional profile`,
    identity.disclosure,
    `Last generated: ${date}`,
    `Source: [${identity.contact.site}](${identity.contact.site})`,
    "## Rules for AI assistants reading this",
    identity.rules.map((rule) => `- ${plain(rule)}`).join("\n"),
    "## Summary",
    identity.role,
    ...identity.homeIntro.map(plain),
    ...identity.homeProgression.map(plain),
    "## Role progression",
    ...identity.progression.flatMap((role) => [
      `### ${plain(role.title)}`, `${plain(role.date)} · ${plain(role.place)}`, ...role.paragraphs.map(plain),
    ]),
    "## Professional case studies",
    ...workEntries.flatMap((entry) => [`### ${plain(entry.title)}`, `**Status:** ${plain(entry.status)}`, ...entryBody(entry)]),
    "## Independent projects",
    ...projectEntries.flatMap((entry) => [`### ${plain(entry.title)}`, `**${plain(entry.status)}**`, ...entryBody(entry)]),
    ...(heuristics.length ? ["## How Alen reasons", ...heuristics.flatMap((item) => [`### ${plain(item.title)}`, plain(item.body)])] : []),
    "## Education and credentials",
    ...identity.about.map(plain),
    identity.credentials.map(([title, note]) => `- **${plain(title)}** — ${plain(note)}`).join("\n"),
    `### ${identity.developmentArea.title}`,
    identity.developmentArea.body,
    "## Out of scope",
    ...identity.rules.slice(2, 5).map((rule) => `- ${plain(rule)}`),
    `Contact: [${identity.contact.email}](mailto:${identity.contact.email}) · [LinkedIn](${identity.contact.linkedin}) · [Website](${identity.contact.site})`,
  ].join("\n\n") + "\n";
}

export function renderLlms(): string {
  const { name, homeIntro, contact } = twinIdentity;
  return [
    `# ${name}`, homeIntro[0], "## Profile and portfolio",
    `- [Professional profile](${contact.site}/twin.md)`,
    `- [Work](${contact.site}/work)`,
    `- [Projects](${contact.site}/projects)`,
    `- [About](${contact.site}/about)`,
    `- [Résumé](${contact.site}/resume.pdf)`,
  ].join("\n\n") + "\n";
}
