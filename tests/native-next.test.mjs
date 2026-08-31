import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
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

test("native Next.js portfolio routes", { timeout: 90_000 }, async () => {
  let output = "";
  const nextBin = fileURLToPath(
    new URL("../node_modules/next/dist/bin/next", import.meta.url),
  );
  const server = spawn(
    process.execPath,
    [nextBin, "start", "--hostname", host, "--port", String(port)],
    {
      cwd: new URL("..", import.meta.url),
      env: { ...process.env, NODE_ENV: "production" },
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
      ["/work/production-workflow-control", "selected Odoo"],
      ["/work/maintenance-error-traceability", "QR-linked entry"],
      ["/work/slip-maker", "Llama 3.2"],
      ["/projects", "Projects used to test ideas"],
      ["/projects/utilityops-readiness", "synthetic work-order examples"],
      ["/projects/rolodex", "record text, links, PDFs"],
      ["/about", "For the love of learning"],
    ]);

    for (const [route, expectedText] of routes) {
      const response = await fetch(`${baseUrl}${route}`);
      assert.equal(response.status, 200, route);
      assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
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
