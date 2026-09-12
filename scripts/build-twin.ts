import { mkdir, writeFile } from "node:fs/promises";
import { renderLlms, renderTwin } from "./render-twin.ts";

const publicDirectory = new URL("../public/", import.meta.url);
const markdown = renderTwin(new Date().toISOString().slice(0, 10));
await mkdir(publicDirectory, { recursive: true });
await writeFile(new URL("twin.md", publicDirectory), markdown, "utf8");
await writeFile(new URL("llms.txt", publicDirectory), renderLlms(), "utf8");
console.log(`Generated twin.md (${markdown.trim().split(/\s+/u).length} words) and llms.txt.`);
