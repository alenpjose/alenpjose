import { mkdir, writeFile } from "node:fs/promises";
import { projectEntries } from "../content/projects.ts";
import { workEntries } from "../content/work.ts";
import { renderLlms, renderTwin } from "./render-twin.ts";

const publicDirectory = new URL("../public/", import.meta.url);
const markdown = renderTwin(new Date().toISOString().slice(0, 10));
await mkdir(publicDirectory, { recursive: true });
await writeFile(new URL("twin.md", publicDirectory), markdown, "utf8");
await writeFile(new URL("llms.txt", publicDirectory), renderLlms(), "utf8");
await writeFile(new URL("robots.txt", publicDirectory), [
  "User-agent: OAI-SearchBot", "Allow: /", "", "User-agent: ChatGPT-User", "Allow: /", "",
  "User-agent: ClaudeBot", "Allow: /", "", "User-agent: Claude-User", "Allow: /", "",
  "User-agent: *", "Allow: /", "", "Sitemap: https://alenpjose.ca/sitemap.xml", "",
].join("\n"), "utf8");
const routes = ["", "about", "work", ...workEntries.map(({ slug }) => `work/${slug}`), "projects", ...projectEntries.filter(({ hasDetailPage }) => hasDetailPage).map(({ slug }) => `projects/${slug}`), "twin.md", "llms.txt"];
await writeFile(new URL("sitemap.xml", publicDirectory), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>https://alenpjose.ca/${route}</loc></url>`).join("\n")}\n</urlset>\n`, "utf8");
console.log(`Generated twin.md (${markdown.trim().split(/\s+/u).length} words), llms.txt, robots.txt, and sitemap.xml.`);
