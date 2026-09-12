import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readdir } from "node:fs/promises";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";

const host = "127.0.0.1";
const port = 43117;
const baseUrl = `http://${host}:${port}`;

async function waitForServer(server, logs) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`next start exited before becoming ready:\n${logs()}`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await delay(250);
  }

  throw new Error(`next start did not become ready:\n${logs()}`);
}

test("static Next.js portfolio routes", { timeout: 90_000 }, async () => {
  let output = "";
  const nextBin = fileURLToPath(
    new URL("../scripts/serve-export.mjs", import.meta.url),
  );
  const server = spawn(
    process.execPath,
    [nextBin],
    {
      cwd: new URL("..", import.meta.url),
      env: { ...process.env, NODE_ENV: "production", PORT: String(port) },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  server.stdout.on("data", (chunk) => {
    output += chunk;
  });
  server.stderr.on("data", (chunk) => {
    output += chunk;
  });

  try {
    await waitForServer(server, () => output);

    const routes = new Map([
      ["/", "Additive manufacturing leadership"],
      ["/work", "Work shaped by what production required"],
      ["/work/additive-application-judgment", "The printer alone does not determine"],
      ["/work/production-workflow-control", "selected Phasio"],
      ["/work/maintenance-error-traceability", "QR-linked entry"],
      ["/work/slip-maker", "Llama 3.2"],
      ["/projects", "Projects used to test ideas"],
      ["/projects/utilityops-readiness", "synthetic work-order examples"],
      ["/projects/rolodex", "record text, links, PDFs"],
      ["/about", "For the love of learning"],
      ["/twin.md", "This is an AI representation"],
      ["/llms.txt", "Professional profile"],
    ]);

    const pages = (await readdir(new URL("../out/", import.meta.url), { recursive: true }))
      .map((path) => path.replaceAll("\\", "/"))
      .filter((path) => path.endsWith(".html") && !["404.html", "_not-found.html"].includes(path))
      .map((path) => path === "index.html" ? "/" : `/${path.slice(0, -5)}`);
    assert.deepEqual(new Set(pages), new Set([...routes.keys()].filter((route) => !route.includes("."))), "Every exported HTML route must be registered");

    for (const [route, expectedText] of routes) {
      const response = await fetch(`${baseUrl}${route}`);
      assert.equal(response.status, 200, route);
      const expectedType = route === "/twin.md" ? /^text\/markdown\b/i : route === "/llms.txt" ? /^text\/plain\b/i : /^text\/html\b/i;
      assert.match(response.headers.get("content-type") ?? "", expectedType);
      const html = await response.text();
      assert.match(html, new RegExp(expectedText, "i"), route);
      assert.doesNotMatch(html, /href=["']\/settings["']/i);
      assert.doesNotMatch(html, /four production staff/i);
    }

    const resume = await fetch(`${baseUrl}/resume.pdf`);
    assert.equal(resume.status, 200);
    assert.match(resume.headers.get("content-type") ?? "", /^application\/pdf\b/i);
    const resumeHeader = Buffer.from(await resume.arrayBuffer()).subarray(0, 5).toString();
    assert.equal(resumeHeader, "%PDF-");

    const settings = await fetch(`${baseUrl}/settings`);
    assert.equal(settings.status, 404);

    const invalidWork = await fetch(`${baseUrl}/work/not-a-public-entry`);
    assert.equal(invalidWork.status, 404);

    const conceptDetail = await fetch(`${baseUrl}/projects/present`);
    assert.equal(conceptDetail.status, 404);
  } finally {
    server.kill();
  }
});
