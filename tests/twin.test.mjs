import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { workEntries } from "../content/work.ts";
import { projectEntries } from "../content/projects.ts";
import { twinHeuristics, twinIdentity } from "../content/twin.ts";
import { twinAssistantLinks, twinPrompt } from "../lib/twin-links.ts";
import { renderTwin, renderLlms } from "../scripts/render-twin.ts";

test("generated profile preserves approved evidence, boundaries, and all entries", async () => {
  const markdown = await readFile(new URL("../public/twin.md", import.meta.url), "utf8");
  const date = markdown.match(/^Last generated: (\d{4}-\d{2}-\d{2})$/m)?.[1];
  assert.ok(date);
  assert.equal(markdown, renderTwin(date));
  assert.ok(markdown.includes(twinIdentity.disclosure));
  assert.match(markdown, /^## Rules for AI assistants reading this$/m);
  for (const rule of twinIdentity.rules) assert.ok(markdown.includes(`- ${rule}`));
  for (const entry of [...workEntries, ...projectEntries]) {
    assert.equal(markdown.split(`\n### ${entry.title}\n`).length - 1, 1, entry.slug);
    for (const field of [entry.summary, entry.evidenceLevel, entry.aiInvolvement, entry.currentLimits, entry.nextTest, entry.confidentialityNote, entry.role].filter(Boolean)) assert.ok(markdown.includes(field), entry.slug);
    for (const section of entry.sections) {
      for (const paragraph of [...(section.paragraphs ?? []), ...(section.questions ?? [])]) assert.ok(markdown.includes(paragraph));
    }
  }
  for (const project of projectEntries) assert.ok(markdown.includes(`### ${project.title}\n\n**${project.status}**`));
  for (const heuristic of twinHeuristics) assert.ok(markdown.includes(heuristic.body));
  assert.ok(markdown.includes(twinIdentity.developmentArea.body));
  assert.doesNotMatch(markdown, /<\/?[a-z][^>]*>|\bOdoo\b/iu);
  const words = markdown.trim().split(/\s+/u).length;
  assert.ok(words >= 3000 && words <= 6000, `Profile target: 3–6k words; actual ${words}`);
  assert.equal(await readFile(new URL("../public/llms.txt", import.meta.url), "utf8"), renderLlms());
});

test("an empty heuristic array omits only the reasoning section", () => {
  const markdown = renderTwin("2026-09-12", []);
  assert.doesNotMatch(markdown, /^## How Alen reasons$/m);
  assert.ok(markdown.includes(twinIdentity.disclosure));
  assert.ok(markdown.includes(twinIdentity.developmentArea.body));
  assert.match(markdown, /^## Out of scope$/m);
});

test("buttons disclose the exact prompt and exports match generated sources", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.ok(html.includes(twinPrompt.replaceAll("'", "&#x27;")));
  for (const link of twinAssistantLinks) {
    const url = new URL(link.href);
    assert.equal(url.searchParams.get("q"), twinPrompt);
    assert.deepEqual([...url.searchParams.keys()], url.hostname === "chatgpt.com" ? ["hints", "q"] : ["q"]);
    const anchor = [...html.matchAll(/<a\s[^>]*>/g)].find(([tag]) => tag.includes(`href="${link.href.replaceAll("&", "&amp;").replaceAll("'", "&#x27;")}"`))?.[0];
    assert.ok(anchor, link.label);
    assert.match(anchor, /target="_blank"/);
    assert.match(anchor, /rel="noopener noreferrer"/);
  }
  for (const file of ["twin.md", "llms.txt"]) assert.equal(await readFile(new URL(`../out/${file}`, import.meta.url), "utf8"), await readFile(new URL(`../public/${file}`, import.meta.url), "utf8"));
});
